const fs = require('fs');
let routes = [];

const addXCoordinates = (positionLeftX, positionRightX, positionLeftY, positionRightY) => {
  let newPositionLeftX = positionLeftX;
  let newPositionLeftY = positionLeftY;

  let newPositionRightX = positionRightX;
  let newPositionRightY = positionRightY;
  if (positionRightY === positionLeftY) {
    if (positionLeftX < positionRightX) {
      routes.push(`${positionLeftX},${positionLeftY}`);
      newPositionLeftX++;
    } else if (positionRightX < positionLeftX) {
      routes.push(`${positionLeftX},${positionLeftY}`);
      newPositionLeftX--;
    }
  }

  if (positionLeftX === positionRightX) {
    if (positionLeftY < positionRightY) {
      routes.push(`${positionLeftX},${positionLeftY}`);
      newPositionLeftY++;
    } else if (positionRightY < positionLeftY) {
      routes.push(`${positionLeftX},${positionLeftY}`);
      newPositionLeftY--;
    }
  }

  if (positionLeftX !== positionRightX && positionLeftY !== positionRightY) {
    if (positionLeftX < positionRightX) {
      routes.push(`${positionLeftX},${positionLeftY}`);
      newPositionLeftX++;
    } else if (positionLeftX > positionRightX) {
      routes.push(`${positionLeftX},${positionLeftY}`);
      newPositionLeftX--
    }

    if (positionLeftY < positionRightY) {
      newPositionLeftY++;
    } else if (positionLeftY > positionRightY) {
      newPositionLeftY--;
    }
  }



  if ((newPositionLeftX !== positionLeftX) || (newPositionLeftY !== positionLeftY)) {
    addXCoordinates(newPositionLeftX, positionRightX, newPositionLeftY, positionRightY);
  } else if (positionLeftX === positionRightX || positionLeftY === positionRightY) {
    routes.push(`${positionLeftX},${positionLeftY}`);
  }


}

const onWithGridding = (newPositionLeftX, positionRightX, newPositionLeftY, positionRightY, positionLeftX, positionLeftY) => {

}

const createGrid = () => {
  fs.readFile('data.txt', 'utf-8', (err, data) => {
    const lines = data.split('\n');
    lines.forEach(line => {
      const coordinates = line.split(' -> ');
      const left = coordinates[0];
      const right = coordinates[1];
      const leftCoordinate = left.split(',');
      const rightCoordinate = right.split(',');
      const leftX = parseInt(leftCoordinate[0]);
      const leftY = parseInt(leftCoordinate[1]);
      const rightX = parseInt(rightCoordinate[0]);
      const rightY = parseInt(rightCoordinate[1]);
      addXCoordinates(leftX, rightX, leftY, rightY);
    });
    const grid = {};
    routes.forEach(route => {
      const split = route.split(',');
      if (grid[split[0]]) {
        let hasValue = grid[split[0]][split[1]] !== undefined;
        let newValue = hasValue && parseInt(grid[split[0]][split[1]]) + 1;
        grid[split[0]][split[1]] = hasValue ? newValue : 1;
      } else {
        grid[split[0]] = {};
        grid[split[0]][split[1]] = 1;
      }
    })
    let count2 = 0;

    Object.keys(grid).forEach(key => {
      Object.keys(grid[key]).forEach(key2 => {
        if (grid[key][key2] > 1) {
          count2++;
        }
      });
    });
    console.log(count2);

  });
}

createGrid();