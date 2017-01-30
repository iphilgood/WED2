define(function () {

    class Counter {
      constructor( { start = 0, step = 1 } ={} ) {
        this.count = start;
        this.step = step;
      }
      countUp () {
        this.count += this.step;
      }
      countDown () {
        this.count -= this.step;
      }
    }

    return Counter;
});
