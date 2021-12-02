const fs = require('fs')

const subMarine = () => {
  let horizontal = 0;
  let depth = 0;
  let aim = 0;
  fs.readFile('data.txt', 'utf-8', (err, data) => {
    data.split('\n').map(line => {
      const split = line.split(' ');
      return {command: split[0], value: split[1]}
    }).forEach(instruction => {
      const number = parseInt(instruction.value);
      switch(instruction.command) {
        case 'forward':
          horizontal += number;
          depth += aim * number;
          break;
        case 'down':
          aim += number;
          break;
        case 'up':
          aim -= number;
          break;
      }
    });

    console.log(horizontal * depth);
  })


}

subMarine();