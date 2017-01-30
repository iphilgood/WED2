(function iife () {

    window.game = window.game || {};

    window.game.Counter = function ( { start = 0, step = 1 } = {} ) {
        this.count = start;
        this.step = step;
      }

    window.game.Counter.prototype.countUp = function() {
        this.count += this.step;
      }

    window.game.Counter.prototype.countDown = function() {
        this.count -= this.step;
    }


})();