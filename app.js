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
var financeController = (function () {})();

//中間コントローラー
var appController = (function (uiController, financeController) {
  var DOM = uiController.getDomstrings();
  var ctrlAddItem = function () {
    console.log(uiController.getInput());
  };

  document.querySelector(DOM.addBtn).addEventListener("click", function () {
    ctrlAddItem();
  });

  document.addEventListener("keypress", function (event) {
    if (event.key === "Enter") ctrlAddItem();
  });
})(uiController, financeController);
