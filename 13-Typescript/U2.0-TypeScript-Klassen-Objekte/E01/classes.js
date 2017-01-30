"use strict";
class Counter {
    constructor({ doors = 2, wood = 'oak', basePrice = 40 } = {}) {
        this.doors = doors;
        this.wood = wood;
        this._basePrice = basePrice;
    }
    set wood(newWood) {
        if (Counter.WOOD_FACTORS[newWood]) {
            this._wood = newWood;
        }
        else {
            throw "Counters not avaiable with wood=" + newWood;
        }
    }
    get wood() {
        return this._wood;
    }
    set doors(newDoorCount) {
        if (newDoorCount >= Counter.MIN_DOOR_COUNT && newDoorCount <= Counter.MAX_DOOR_COUNT) {
            this._doors = newDoorCount;
        }
        else {
            throw `Counter can only have between ${Counter.MIN_DOOR_COUNT} and ${Counter.MAX_DOOR_COUNT} not supported ${newDoorCount}`;
        }
    }
    get doors() {
        return this._doors;
    }
    get price() {
        let priceFactor = Counter.WOOD_FACTORS[this.wood] * Counter.DOOR_FACTOR * this.doors / 100;
        return priceFactor * this._basePrice;
    }
}
Counter.WOOD_FACTORS = {
    'oak': 80,
    'pine': 20,
    'beech': 50,
    'maple': 60,
    'walnut': 90,
    'cherry': 100
};
Counter.DOOR_FACTOR = 2;
Counter.MIN_DOOR_COUNT = 2;
Counter.MAX_DOOR_COUNT = 7;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Counter;
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
