
const fs = require('fs')

let oxygenGenerator = "";
let co2Level = "";

const getOxygen = (data, index) => {
  const ones = data.filter(line => line.charAt(index) === '1');
  const zeros = data.filter(line => line.charAt(index) === '0');
  if (ones.length > zeros.length) {
    getOxygen(ones, index + 1);
  } else if (zeros.length > ones.length) {
    getOxygen(zeros, index + 1);
  } else if (ones.length) {
    getOxygen(ones, index + 1);
  } else {
    oxygenGenerator = data[0]
  }
}

const getCo2Level = (data, index) => {
  const ones = data.filter(line => line.charAt(index) === '1');
  const zeros = data.filter(line => line.charAt(index) === '0');
  if (ones.length && ones.length < zeros.length) {
    getCo2Level(ones, index + 1);
  } else if (zeros.length && zeros.length < ones.length) {
    getCo2Level(zeros, index + 1);
  } else if (zeros.length) {
    getCo2Level(zeros, index + 1);
  } else {
    co2Level = data[0]
  }
}

const bitReader = () => {
  fs.readFile('data.txt', 'utf-8', (err, data) => {
    const dataArray = data.split('\n');
    getOxygen(dataArray, 0);
    getCo2Level(dataArray, 0);
    const oxygenGeneratorInt = parseInt(oxygenGenerator, 2);
    const co2LevelInt = parseInt(co2Level, 2);
    console.log(oxygenGeneratorInt * co2LevelInt);
  });
}

bitReader();