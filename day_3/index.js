
const fs = require('fs')

let binaryGamma = "";
let binaryEpsilon = "";

const getGammaRate = (data, index) => {
  let zeroCount = 0;
  let oneCount = 0;

  data.forEach(line => {
    if (line[index]) {
      line[index] === '1' ? oneCount++ : zeroCount++;
    }
  });

  if (zeroCount > oneCount) {
    binaryGamma += "0";
    binaryEpsilon += "1";
  } else {
    binaryGamma += "1";
    binaryEpsilon += "0";
  }
  console.log(data[0].length, index)
  if(data[0].length > index + 1) {
    console.log('again?')
    getGammaRate(data, index + 1);
  }

}


const bitReader = () => {
  fs.readFile('data.txt', 'utf-8', (err, data) => {
    const dataArray = data.split('\n');
    getGammaRate(dataArray, 0);
    const binaryGammaInt = parseInt(binaryGamma, 2);
    const binaryEpsilonInt = parseInt(binaryEpsilon, 2);
    console.log(binaryGammaInt * binaryEpsilonInt);
  });
}

bitReader();