let b = false;
var Decision;
(function (Decision) {
    Decision[Decision["yes"] = 0] = "yes";
    Decision[Decision["no"] = 1] = "no";
})(Decision || (Decision = {}));
;
let y = Decision.no;
// functions
function prod2Function(n1, n2) {
    console.log('n1', n1, 'n2', n2);
    if (n2 === undefined) {
        return n1;
    }
    else {
        return n1 * n2;
    }
}
function prodFunction(...rest) {
    console.log('rest', rest);
    return rest.reduce(prod2Function, 1);
}
function numberApplicator(numArray, numFun) {
    return numArray.reduce(numFun);
}
// CHECK
console.log("\nFIRST BLOCK");
console.log(prod2Function(2));
console.log(prod2Function(2, 3));
console.log(prod2Function(2, 3, 7));
console.log("\nSECOND BLOCK");
console.log(prod2Function(b, 3));
console.log(prod2Function(y, 3));
// console.log(prod2Function(m, 3));
console.log("\nTHIRD BLOCK");
console.log(prodFunction(2, 3, 7));
console.log(prodFunction(2, 3, b));
console.log('numberApplicator', numberApplicator([1, 2, 3, 4], prod2Function));
