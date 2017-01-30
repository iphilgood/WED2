let b: boolean = false;
enum Decision { yes, no };
let y: Decision = Decision.no;
declare let m: number;

// functions

function prod2Function(n1: number, n2?: number) {
  console.log('n1', n1, 'n2', n2);
  if (n2 === undefined) {
    return n1;
  } else {
    return n1 * n2;
  }
}

function prodFunction(...rest: number[]) {
  console.log('rest', rest);
  return rest.reduce(prod2Function, 1);
}

function numberApplicator(
  numArray: number[],
  numFun: (prevRes: number, current: number) => number): number {

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
