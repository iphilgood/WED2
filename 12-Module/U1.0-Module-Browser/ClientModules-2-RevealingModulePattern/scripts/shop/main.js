window.addEventListener("load", function () {

  const basket = [];
  function basketPrice () {
    return basket.reduce((sum, item) => sum + item.price, 0);
  }

  // view-refs
  const basketCountDisplay = document.getElementById("basketCountDisplay");
  const basketTotalDisplay = document.getElementById("basketTotalDisplay");
  const btnBuy = document.getElementById("btnBuy");

  // viewUpdate
  function updateView() {
    basketCountDisplay.innerHTML = basket.length;
    basketTotalDisplay.innerHTML = basketPrice();
  }

  // controller / EventListener
  btnBuy.addEventListener("click", function () {
    basket.push(new window.shop.Counter());
    updateView()
  });

  // init
  updateView();
});

