const fs = require('fs');


function start() {
  fs.readFile('data.txt', 'utf-8', (err, data) => {
    let splitData = data.split(',').map(i => parseInt(i, 10));
    let max = Math.max.apply(null, splitData);
    const positions = Array.from(Array(max + 1).keys())
    calculateLowestFuel(splitData, positions);
  });
}


function calculateLowestFuel(data, positions) {
  let usageArray = [];
  positions.forEach(point => {
    let fuelSpentLocal = 0;
    data .forEach(subPoint => {
      let steps = Math.abs(point - subPoint);
      for (i = 1; i < steps + 1; i ++) {
        fuelSpentLocal += i;
      }
    });
    usageArray.push({ point, fuel: fuelSpentLocal});
  });
  const result = usageArray.reduce(function(prev, curr) {
    return prev.fuel < curr.fuel ? prev : curr;
  });
  console.log(result);
}

start();
