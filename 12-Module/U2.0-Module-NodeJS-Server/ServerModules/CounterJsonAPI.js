function newCounterJSON({ count=7, step=3 } = {}) {
  return { count, step };
}

function countUp(counterJSON) {
  counterJSON.count += counterJSON.step;
}

function countDown(counterJSON) {
  counterJSON.count -= counterJSON.step;
}

console.log('done CounterJsonAPI');

module.exports = { newCounterJSON, countUp, countDown };
