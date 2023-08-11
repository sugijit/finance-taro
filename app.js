//画面コントローラー
var uiController = (function () {})();

//家計簿関係のコントローラー
var financeController = (function () {})();

//中間コントローラー
var appController = (function (uiController, financeController) {
  ctrlAddItem = function () {
    // 1. Oruulah ugugdliig delgetsees olj avna
    console.log("delgetsees ugugdloo avah heseg");
    // 2. Olj avsan ugugdluudee sanhuugiin controllert damjuulj tend hadgalna
    // 3. Olj avsan ugugdluudee web deer tohiroh hesegt gargana
    // 4. Tusuviig tootsoolno
    // 5. Etssiin uldegdeliig delgetsend gargana
  };

  document.querySelector(".add__btn").addEventListener("click", function () {
    ctrlAddItem();
  });

  document.addEventListener("keypress", function (event) {
    if (event.key == 13) {
      ctrlAddItem();
    }
  });
})(uiController, uiController);
