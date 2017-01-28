function show (showString) {const res=eval(showString); console.log(showString, "-->", res); return res};

const counter = {
    count: 0,
};
const deltaCounter = {
    count: 0,
    delta: 1
};

// factory function using extended JSON format
function newDeltaCounter (cInit, dInit) {
    return {
        count: cInit || 0,
        delta: dInit || 1
    };
}
const deltaCounter2 = newDeltaCounter (0, 1);

show("deltaCounter2.count");
show("deltaCounter2['delta']");

deltaCounter2.count = 4;
deltaCounter2['delta'] = 7;

// alternative factory function
function newCounter (cInit) {
    const o = {};
    o.count = cInit;
    return o;
}
const counter2 = newCounter (2);
counter2.count += 3;
show("counter2.count");

// external modification
function incCounter (cntr, delta) {
    cntr.count += delta;
}
incCounter(counter2, 22);
show("counter2.count");
incCounter(deltaCounter2, 22);
show("deltaCounter2.count");

// inc Methode in Factory-Function ('this' is necessary)
function newCounterWithInc (cInit) {
    const o = {};
    o.count = cInit;
    o.inc = function (delta) {
        this.count += delta;
    };
    return o;
}

const counter3 = newCounterWithInc (7);
counter3.inc(5);
show("counter3.count");

// not working
function newCounterWithBadInc (cInit) {
    const o = {};
    o.count = cInit;
    o.inc = function (delta) {
        count += delta;
    };
    return o;
}
let count = 1111; // global

const counter4 = newCounterWithBadInc (4);
counter4.inc(4);
show("counter4.count");
show("count");

// using closure & accessors
function newCounterWithPrivateCountAndClosureInc (cInit) {
    const o = {};
    let count = cInit;
    o.inc = function (delta) {
        count += delta;
    };
    o.getCount = function () {
        return count;
    };
    return o;
}

const counter5 = newCounterWithPrivateCountAndClosureInc (5);
counter5.inc(5);
show("counter5.count");
show("counter5.getCount()");

// Reminder: Dynamic Scope not supported for regular Vars in JS
function testDynamicScope () {
    let contextVar = 7;
    tryToPrintContextVar ();
}
function tryToPrintContextVar () {
    console.log(contextVar);
}
//not working -> error
// testDynamicScope();

// Reminder: Lexical Scope (plus Closure) is the rule for regular Vars in JS
function testLexicalScopeWithClosure () {
    let closureVar = 7;
    return function () {
        console.log("closureVar:", closureVar);
    }
}
const printCloureVar = testLexicalScopeWithClosure();
printCloureVar();

// also "this" is lexically scoped
function newCounterWithWronglyDelegatedInc (cInit) {
    const o = {};
    o.count = cInit;
    o.inc = function (delta) {
        globalIncCountOfThisFn(delta);
    };
    return o;
}
function globalIncCountOfThisFn (delta) {
    this.count += delta;
}
const counter6 = newCounterWithWronglyDelegatedInc(6);
counter6.inc(6); //increments global count
show("counter6.count"); //still 6 -> did not work

function newCounterWithDelegatedInc (cInit) {
    const o = {};
    o.count = cInit;
    o.logTheCount = function () {
        console.log("log", this.count);
    };
    o.inc = function (delta) {
        globalIncCountOfThisFn.call(this, delta);
        this.logTheCount();
    };
    return o;
}
const counter7 = newCounterWithDelegatedInc(7);
counter7.inc(7); //increments count corrently
show("counter7.count"); //14 -> correct

// demo: Problem when separating Method from object
function newCounterWithInc2 (cInit) {
    const o = {};
    o.count = cInit;
    o.inc = function (delta) {
        this.count += delta;
    };
    return o;
}
const counter8 = newCounterWithInc2 (8);
const incFunction = counter8.inc;
global.count = 0;
incFunction(8); // increments the global var count
show("counter8.count"); //8 -> not incremented
show("global.count"); //8 -> incremented

// demo: Bind solving problem when separating Method from object
// binding method already in Factory function
const counter9 = newCounterWithInc2 (9);
const incFunction2 = counter9.inc.bind(counter9);
global.count = 0;
incFunction2(9); // increments this.count
show("counter9.count"); //18 ->  incremented
show("global.count"); //0 -> not incremented

// demo: Bind solving problem when separating Method from object
// binding method already in Factory function
function newCounterWithBoundInc (cInit) {
    const o = {};
    o.count = cInit;
    o.inc = function (delta) {
        this.count += delta;
    };
    o.inc = o.inc.bind(o);
    return o;
}
const counter9a = newCounterWithBoundInc (9);
const incFunction3 = counter9a.inc;
global.count = 0;
incFunction3(9); // increments  this.count
show("counter9a.count"); //18 ->  incremented
show("global.count"); //0 -> not incremented


// demo: Problem when calling an array function in a Method
function newCounterWithArrayInc3 (cInit) {
    const o = {};
    o.count = cInit;
    o.inc = function (deltaArray) {
        deltaArray.forEach(function (arrayDelta) {
            // here 'this' is the array (nothing happens)
            this.count += arrayDelta;
        });
    };
    return o;
}
const counter10 = newCounterWithArrayInc3 (10);
counter10.inc([5, 3, 2]);
show("counter10.count"); //10 -> not incremented


function newCounterWithArrayInc4 (cInit) {
    const o = {};
    o.count = cInit;
    o.inc = function (deltaArray) {
        deltaArray.forEach(function (arrayDelta) {
            this.count += arrayDelta;
        }, this);
    };
    return o;
}
const counter10a = newCounterWithArrayInc4 (10);
counter10a.inc([5, 3, 2]);
show("counter10a.count"); //20 ->  incremented


// ++++++++ Constructors & Inheritance

const counter11 = newCounterWithInc (11);

show("typeof counter11"); //-> object
show("counter11 instanceof Object"); //-> true
show("counter11.constructor.name"); //-> Object


// demo Constructor Function (extend type system)
global = global || window;
function Counter (cInit) {
    if (this == global)
        return new Counter(cInit);
    this.count = cInit;
    this.inc = function (delta) {
        this.count += delta;
    };
}
const counter12a = Counter(12) //not the right way, still works
const counter12 = new Counter (12);
counter12.inc(12);
show("counter12.count"); //-> 24 (expected)
show("typeof counter12"); //-> object
show("counter12 instanceof Counter"); //-> true
show("counter12.constructor.name"); //-> Counter

// demo: When Constructors are used then functions are typically attached to to the prototype
// This does not work when properties must be kept private as closures

function LeanCounter (cInit) {
    this.count = cInit;
}

LeanCounter.prototype.inc = function (delta) {
    this.count += delta;
};

const counter13 = new LeanCounter (13);
counter13.inc(13);
show("LeanCounter.prototype === counter13.__proto__"); //-> true
show("counter13.count"); //-> 26 (expected)
show("typeof counter13"); //-> object
show("counter13 instanceof LeanCounter"); //-> true
show("counter13.constructor.name"); //-> LeanCounter



function LeanCounterPrivate (cInit) {
    //private with closure
    let count = cInit;
    //functions functions accessing count must be defined in scope
    this.getCount = function () {return count};
    this.inc = function (delta) {count += delta;}
}

const counter13b = new LeanCounterPrivate (13);
counter13b.inc(13);
show("counter13b.getCount()"); //-> 26 (expected)

function LeanCounterWithAccessor (cInit) {
    //private with closure
    let count = cInit;
    //functions functions accessing count must be defined in scope
    Object.defineProperty(this, 'count', {		// property definition with accessors
        get: function() { return count; },
    });
    this.inc = function (delta) {count += delta;}
}

const counter13c = new LeanCounterWithAccessor (13);
counter13c.inc(13);
show("counter13c.count"); //-> 26 (expected)


LeanCounter.prototype.demoInherit = function () {
    console.log("Inherited from LeanCounter");
};

function DeltaLeanCounter (cInit, dInit) {
    LeanCounter.call(this, cInit);
    this.delta = dInit;
}

DeltaLeanCounter.prototype =
    Object.create(LeanCounter.prototype);

DeltaLeanCounter.prototype.inc = function (d) {
    LeanCounter.prototype.inc.call(this, d||this.delta);
};

const counter14 = new DeltaLeanCounter (14, 14);
counter14.inc();
counter14.demoInherit(); //-> Inherited from LeanCounter
show("DeltaLeanCounter.prototype === counter14.__proto__"); //-> true
show("counter14.count"); //-> 28 (expected)
show("typeof counter14"); //-> object
show("counter14 instanceof DeltaLeanCounter"); //-> true
show("counter14 instanceof LeanCounter"); //-> true
show("counter14.constructor.name"); //-> LeanCounter (known problem)

