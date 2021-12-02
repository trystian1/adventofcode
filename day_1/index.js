const data = require('./data');

const findIncreases = () => {
  let increases = 0;
  console.log(data);
  data.forEach((point, index) => {
    if (data[index + 1] > point) {
      increases++;
    }
  });

  console.log(increases);

}

findIncreases();