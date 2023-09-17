//画面コントローラー
var uiController = (function () {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
    incomeList: ".income__list",
    expenseList: ".expenses__list",
    tusuvLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expenseLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    containerDiv: ".container",
    expensePercentageLabel: ".item__percentage",
    dateLabel: ".budget__title",
  };

  var nodeListForeach = function (list, callback) {
    for (var i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };

  var formatMoney = function (too, type) {
    too = "" + too;
    var b = too.split("").reverse().join("");
    var c = "";
    var count = 1;

    for (var i = 0; i < b.length; i++) {
      c = c + b[i];
      if (count % 3 === 0) {
        c = c + ",";
      }
      count++;
    }

    var z = c.split("").reverse().join("");

    if (z[0] === ",") {
      z = z.substring(1);
    }

    if (type === "inc") z = "+ " + z;
    else z = "- " + z;

    return z;
  };

  return {
    displayDate: function () {
      var today = new Date();
      document.querySelector(DOMstrings.dateLabel).textContent =
        today.getFullYear() + "年" + today.getMonth() + "月の家計簿";
    },

    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value, //inc, exp
        description: document.querySelector(DOMstrings.inputDescription).value, //
        value: parseInt(document.querySelector(DOMstrings.inputValue).value), //
      };
    },

    displayPercentages: function (allPercentages) {
      var elements = document.querySelectorAll(
        DOMstrings.expensePercentageLabel
      );

      nodeListForeach(elements, function (el, index) {
        el.textContent = allPercentages[index];
      });
    },

    getDomstrings: function () {
      return DOMstrings;
    },

    clearFields: function () {
      var fields = document.querySelectorAll(
        DOMstrings.inputDescription + "," + DOMstrings.inputValue
      );

      // convert list to array
      var fieldsArr = Array.prototype.slice.call(fields);
      // for (var i = 0; i < fieldsArr.length; i++) {
      //   fieldsArr[i].value = "";
      // }

      fieldsArr.forEach(function (el, index, array) {
        el.value = "";
      });

      fieldsArr[0].focus();
    },

    tusviigUzuuleh: function (tusuv) {
      var type;
      if (tusuv.tusuv > 0) type = "inc";
      else type = "exp";
      document.querySelector(DOMstrings.tusuvLabel).textContent = formatMoney(
        tusuv.tusuv,
        type
      );
      document.querySelector(DOMstrings.incomeLabel).textContent = formatMoney(
        tusuv.totalInc,
        "inc"
      );
      document.querySelector(DOMstrings.expenseLabel).textContent = formatMoney(
        tusuv.totalExp,
        "exp"
      );
      if (tusuv.huvi !== 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent =
          tusuv.huvi + "%";
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent =
          tusuv.huvi;
      }
    },

    deleteListItem: function (id) {
      var el = document.getElementById(id);
      el.parentNode.removeChild(el);
    },

    addListItem: function (item, type) {
      //Orlogo zarlagiin elementiig aguulsan html-g beltgene
      var html, list;

      if (type === "inc") {
        list = DOMstrings.incomeList;
        html =
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">%%DESCRIPTION%%</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        list = DOMstrings.expenseList;
        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">%%DESCRIPTION%%</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      //ter HTML dotroo orlogo zarlagiin utguudiig replace ashiglaj uurchilno

      html = html.replace("%id%", item.id);
      html = html.replace("%%DESCRIPTION%%", item.description);
      html = html.replace("$$VALUE$$", formatMoney(item.value, type));
      //belgtesen HTML-ee DOM ruu hiij ugnu

      document.querySelector(list).insertAdjacentHTML("beforeend", html);
    },
  };
})();

//家計簿関係のコントローラー
var financeController = (function () {
  //private function
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  //private function Baiguulagch function
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  Expense.prototype.calcPercentage = function (totalInc) {
    if (totalInc > 0) {
      this.percentage = Math.round((this.value / totalInc) * 100);
    } else {
      this.percentage = 0;
    }
  };

  Expense.prototype.getPercentage = function () {
    return this.percentage;
  };

  var calculateTotal = function (type) {
    var sum = 0;
    data.items[type].forEach(function (el) {
      sum = sum + el.value;
    });

    data.totals[type] = sum;
  };
  //private data
  var data = {
    items: {
      inc: [],
      exp: [],
    },
    totals: {
      inc: 0,
      exp: 0,
    },

    tusuv: 0,
    huvi: 0,
  };

  return {
    tusuvTootsooloh: function () {
      calculateTotal("inc");
      calculateTotal("exp");

      data.tusuv = data.totals.inc - data.totals.exp;
      if (data.totals.inc > 0) {
        data.huvi = Math.round((data.totals.exp * 100) / data.totals.inc);
      } else data.huvi = 0;
    },

    calculatePercentages: function () {
      data.items.exp.forEach(function (el) {
        el.calcPercentage(data.totals.inc);
      });
    },

    getPercentages: function () {
      var allPercentages = data.items.exp.map(function (el) {
        return el.getPercentage();
      });

      return allPercentages;
    },

    tusuviigAvah: function () {
      return {
        tusuv: data.tusuv,
        huvi: data.huvi,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
      };
    },

    deleteItem: function (type, id) {
      var ids = data.items[type].map(function (el) {
        return el.id;
      });

      var index = ids.indexOf(id);

      if (index !== -1) {
        data.items[type].splice(index, 1);
      }
    },

    addItem: function (type, desc, val) {
      var item, id;

      if (data.items[type].length === 0) id = 1;
      else {
        id = data.items[type][data.items[type].length - 1].id + 1;
      }
      if (type === "inc") {
        item = new Income(id, desc, val);
      } else {
        item = new Expense(id, desc, val);
      }
      data.items[type].push(item);

      return item;
    },

    seeData: function () {
      return data;
    },
  };
})();

//中間コントローラー
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    var input = uiController.getInput();
    if (input.description !== "" && input.value !== "") {
      var item = financeController.addItem(
        input.type,
        input.description,
        input.value
      );

      uiController.addListItem(item, input.type);
      uiController.clearFields();

      updateTusuv();
    }
  };

  var updateTusuv = function () {
    financeController.tusuvTootsooloh();
    var tusuv = financeController.tusuviigAvah();
    uiController.tusviigUzuuleh(tusuv);
    financeController.calculatePercentages();
    var allPercentages = financeController.getPercentages();
    uiController.displayPercentages(allPercentages);
  };

  var setupEventListeners = function () {
    var DOM = uiController.getDomstrings();
    document.querySelector(DOM.addBtn).addEventListener("click", function () {
      ctrlAddItem();
    });

    document.addEventListener("keypress", function (event) {
      if (event.key === "Enter") ctrlAddItem();
    });

    document
      .querySelector(DOM.containerDiv)
      .addEventListener("click", function (event) {
        var id = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if (id) {
          var arr = id.split("-");
          var type = arr[0];
          var itemId = parseInt(arr[1]);
        }
        //console.log(type + ":" + itemId);
        //1.sanhuugiin module-aas type,id ashiglan ustgana
        financeController.deleteItem(type, itemId);
        //2. delgets deerees ene elementees ustgana
        uiController.deleteListItem(id);
        //3. uldegdel tootsoog shinechilj haruulna
        updateTusuv();
      });
  };
  return {
    init: function () {
      console.log("app ehellee...");
      uiController.displayDate();
      uiController.tusviigUzuuleh({
        tusuv: 0,
        huvi: 0,
        totalInc: 0,
        totalExp: 0,
      });
      setupEventListeners();
    },
  };
})(uiController, financeController);

appController.init();
