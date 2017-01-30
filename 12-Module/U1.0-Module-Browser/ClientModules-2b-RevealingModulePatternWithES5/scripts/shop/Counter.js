(function iife () {

    window.shop = window.shop || {};

    window.shop.Counter = function ({ doors = 2, wood = 'oak', basePrice = 40 } = {}) {
        this._doors = doors;
        this._wood = wood;
        this._basePrice = basePrice;
    }

    window.shop.Counter.prototype.setWood = function(newWood) {
        if (Counter.WOOD_FACTORS[newWood]) {
          this._wood = newWood;
        } else {
          throw "Counters not avaiable with wood=" + newWood;
        }
      }

    window.shop.Counter.prototype.getWood = function() {
      return this._wood;
    }

    window.shop.Counter.prototype.setDoors = function(newDoorCount) {
        if (newDoorCount >= window.shop.Counter.MIN_DOOR_COUNT && newDoorCount <= window.shop.Counter.MAX_DOOR_COUNT) {
          this._doors = newDoorCount;
        } else {
          throw `Console can only have between ${window.shop.Counter.MIN_DOOR_COUNT} and ${window.shop.Counter.MAX_DOOR_COUNT} not supported ${newDoorCount}`;
        }
    }

    window.shop.Counter.prototype.getDoors = function() {
        return this._doors;
    }

    window.shop.Counter.prototype.getPrice = function() {
        let priceFactor = window.shop.Counter.WOOD_FACTORS[this.getWood()] * window.shop.Counter.DOOR_FACTOR * this.getDoors() / 100;
        return priceFactor * this._basePrice;
    }

    window.shop.Counter.WOOD_FACTORS = {'oak': 80, 'pine': 20, 'beech': 50, 'maple': 60, 'walnut': 90, 'cherry': 100};
    window.shop.Counter.DOOR_FACTOR = 2;
    window.shop.Counter.MIN_DOOR_COUNT = 2;
    window.shop.Counter.MAX_DOOR_COUNT = 7;


    // Tests
    /*
    c = new Counter();
    console.log(c.price);
    c.wood = 'pine';
    console.log(c.price);
    //c.doors = 8;
    //c.doors = 1;
    c.doors = 3;
    console.log(c.price);
    */




})();