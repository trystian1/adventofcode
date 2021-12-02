const data = require('./data');

const sumThree = (index) => {
  const sum = data[index] + data[index + 1] + data[index + 2]
  return !isNaN(sum) ? sum : -1;
}

const findIncreases = () => {
  let increases = 0;
  data.forEach((point, index) => {
    if (sumThree(index + 1) > sumThree(index)) {
      increases++;
    }
  });

  console.log(increases);

}

findIncreases();