function initPage () {
  define(['./game/Counter'], function (Counter) {
    const counter = new Counter();

    // view-refs
    const countDisplay = document.getElementById("countDisplay");
    const btnUp = document.getElementById("btnUp");
    const btnDown = document.getElementById("btnDown");

    // viewUpdate
    function updateView() {
      countDisplay.innerHTML = counter.count;
    }

    // controller / EventListener
    btnUp.addEventListener("click", function () {
      counter.countUp();
      updateView()
    });
    btnDown.addEventListener("click", function () {
      counter.countDown();
      updateView()
    });

    // init
    updateView();
  });
}

if (document.readyState === 'complete') {
  initPage();
}else{
  window.addEventListener('load', initPage);
}
