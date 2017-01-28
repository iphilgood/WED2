window.onload = function () {
  // model
  // const counter = {
  //   count: 0,
  //   delta: 1,
  //   countUp: function () {
  //     this.count += this.delta
  //   },
  //   countDown: function () {
  //     this.count -= this.delta
  //   }
  // };

  // Factory Method
  function newCounter(cInit, dInit) {
    const o = {};
    let count = cInit || 0;
    const delta = dInit || 1;

    o.countUp = function() {
      count += delta;
    };

    o.countDown = function() {
      count -= delta;
    };

    o.getCount = function() {
      return count;
    }

    return o;
  }

  const counter = newCounter();
  window.counter = counter;

  // view-refs
  const countDisplay = document.getElementById("countDisplay");
  const btnUp = document.getElementById("btnUp");
  const btnDown = document.getElementById("btnDown");

  // viewUpdate
  function updateView() {
    countDisplay.innerHTML = counter.getCount();
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
}
