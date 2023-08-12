//画面コントローラー
var uiController = (function () {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
  };

  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value,
      };
    },
    getDomstrings: function () {
      return DOMstrings;
    },
  };
})();

//家計簿関係のコントローラー
var financeController = (function () {
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      inc: [],
      exp: [],
    },
    totals: {
      inc: 0,
      exp: 0,
    },
  };
})();

//中間コントローラー
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    // 1. Oruulah ugugdliig delgetsees olj avna
    console.log(uiController.getInput());
    // 2. Olj avsan ugugdluudee sanhuugiin controllert damjuulj tend hadgalna
    // 3. Olj avsan ugugdluudee web deer tohiroh hesegt gargana
    // 4. Tusuviig tootsoolno
    // 5. Etssiin uldegdeliig delgetsend gargana
  };

  var setupEventListeners = function () {
    var Dom = uiController.getDomstrings();

    document.querySelector(Dom.addBtn).addEventListener("click", function () {
      ctrlAddItem();
    });

    document.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        ctrlAddItem();
      }
    });
  };

  return {
    init: function () {
      console.log("Application started...");
      setupEventListeners();
    },
  };
})(uiController, uiController);

appController.init();
