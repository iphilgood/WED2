let a = true;
let nb = false;
let b = false;
let n = 2;
let nai = [3, 7, 9];
let ni;
let t = [42, false];
var Decision;
(function (Decision) {
    Decision[Decision["yes"] = 0] = "yes";
    Decision[Decision["no"] = 1] = "no";
})(Decision || (Decision = {}));
;
let y = Decision.no;
// CHECK
nb = 'aaa'; // error
nb = nb || b;
nb = nb || 0;
b = b || nb; // error
n = a;
n = nb; // error
nai[5] = 3;
nai[6] = nb; // error
nai[7] = true; // error
t = [n, b];
t = [nb, true]; // error
t = [b, b]; // error
t = [b, a]; // error
a = y;
t = [n, y]; // error
t = [n, a || y]; // NOT AN ERROR -> attention
nb = y; // NOT AN ERROR -> attention
n = y; // NOT AN ERROR -> attention
y = n; // NOT AN ERROR -> attention
m = nb; // NOT AN ERROR -> attention
n = m;
m = b; // error
