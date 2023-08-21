//画面コントローラー
var uiController = (function () {})();

//家計簿関係のコントローラー
var financeController = (function () {})();

//中間コントローラー
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    console.log("Delgetsees ugugdul avlaa");
  };

  document.querySelector(".add__btn").addEventListener("click", function () {
    ctrlAddItem();
  });

  document.addEventListener("keypress", function (event) {
    if (event.key === "Enter") ctrlAddItem();
  });
})(uiController, financeController);
