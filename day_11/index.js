const fs = require('fs');
const input = fs.readFileSync('input.txt').toString();

const inputArray = input.split('\n');
const inputNestedArray = inputArray.map(string => string.split(''));

function getAdjacentElements(cor1, cor2, nestedArray) {
  const adjacentElements = [];
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if (!(i === 0 && j === 0) && nestedArray[cor1 + i] && nestedArray[cor1 + i][cor2 + j]) {
        adjacentElements.push(nestedArray[cor1 + i][cor2 + j]);
      }
    }
  }
  return adjacentElements;
}

// Part 2

function getFromEightDirections(cor1, cor2, nestedArray) {
  const yLength = nestedArray.length;
  const xLength = nestedArray[0].length;
  const elements = [];
  // top
  for (let i = 1; i <= cor1; i++) {
    if (nestedArray[cor1 - i][cor2] !== '.') {
      // console.log('top');
      elements.push(nestedArray[cor1 - i][cor2]);
      break;
    }
  }
  // bottom
  for (let i = 1; i <= yLength - cor1 - 1; i++) {
    if (nestedArray[cor1 + i][cor2] !== '.') {
      // console.log('bottom');
      elements.push(nestedArray[cor1 + i][cor2]);
      break;
    }
  }
  // left
  for (let i = 1; i <= cor2; i++) {
    if (nestedArray[cor1][cor2 - i] !== '.') {
      // console.log('left');
      elements.push(nestedArray[cor1][cor2 - i]);
      break;
    }
  }
  // right
  for (let i = 1; i <= xLength - cor2 - 1; i++) {
    if (nestedArray[cor1][cor2 + i] !== '.') {
      // console.log('right');
      elements.push(nestedArray[cor1][cor2 + i]);
      break;
    }
  }
  // diagonal top left
  for (let i = 1; i <= cor1 && i <= cor2; i++) {
    if (nestedArray[cor1 - i][cor2 - i] !== '.') {
      // console.log('top left');
      elements.push(nestedArray[cor1 - i][cor2 - i]);
      break;
    } 
  }
  // diagonal top right
  for (let i = 1; i <= cor1 && i <= xLength - cor2 - 1; i++) {
    if (nestedArray[cor1 - i][cor2 + i] !== '.') {
      // console.log('top right');
      elements.push(nestedArray[cor1 - i][cor2 + i]);
      break;
    }
  }
  // diagonal bottom right
  for (let i = 1; i <= yLength - cor1 - 1 && i <= xLength - cor2 - 1; i++) {
    if (nestedArray[cor1 + i][cor2 + i] !== '.') {
      // console.log('bottom right');
      elements.push(nestedArray[cor1 + i][cor2 + i]);
      break;
    }
  }
  // diagonal bottom left
  for (let i = 1; i <= yLength - cor1 - 1 && i <= cor2; i++) {
    if (nestedArray[cor1 + i][cor2 - i] !== '.') {
      // console.log('bottom left');
      elements.push(nestedArray[cor1 + i][cor2 - i]);
      break;
    }
  }
  return elements;
}

function applySittungRulesInPlace(nestedArray) {
  let changed = false;
  const nestedArrayCopy = [];
  nestedArray.forEach((innerArray, index) => {
    nestedArrayCopy.push([]);
    innerArray.forEach((element) => {
      nestedArrayCopy[index].push(element);
    })
  });
  for (let i = 0; i < nestedArray.length; i++) {
    for (let j = 0; j < nestedArray[i].length; j++) {
      if (nestedArrayCopy[i][j] === '.') {
        continue;
      }
      const adjacentElements = getAdjacentElements(i, j, nestedArrayCopy);
      if (nestedArrayCopy[i][j] === 'L') {
        // newNestedArray[i].push(adjacentElements.filter(element => element === '#').length === 0 ? '#' : 'L');
        if (adjacentElements.filter(element => element === '#').length === 0) {
          nestedArray[i][j] = '#'
          changed = true;
        }
      } else if (nestedArray[i][j] === '#') {
        // newNestedArray[i].push(adjacentElements.filter(element => element === '#').length >= 4 ? 'L' : '#');
        if (adjacentElements.filter(element => element === '#').length >= 4) {
          nestedArray[i][j] = 'L';
          changed = true;
        }
      }
    }
  }
  return changed;
}

const smallSample = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`.split('\n').map(string => string.split(''));

/* console.log(smallSample);

while(true) {
  const changed = applySittungRulesInPlace(smallSample);
  console.log('changed?', changed);
  if (!changed) {
    break;
  }
}
console.log(smallSample); */

/* while(true) {
  const changed = applySittungRulesInPlace(inputNestedArray);
  console.log('changed?', changed);
  if (!changed) {
    break;
  }
}

const occupied = inputNestedArray.reduce((acc, innerArray) => acc + innerArray.filter(element => element === '#').length, 0);

console.log(occupied); */

// Part 2

const smallSample2 = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`.split('\n').map(string => string.split(''));

function applySittungRulesInPlace2(nestedArray) {
  let changed = false;
  const nestedArrayCopy = [];
  nestedArray.forEach((innerArray, index) => {
    nestedArrayCopy.push([]);
    innerArray.forEach((element) => {
      nestedArrayCopy[index].push(element);
    })
  });
  for (let i = 0; i < nestedArray.length; i++) {
    for (let j = 0; j < nestedArray[i].length; j++) {
      if (nestedArrayCopy[i][j] === '.') {
        continue;
      }
      // const adjacentElements = getAdjacentElements(i, j, nestedArrayCopy);
      const seenElements = getFromEightDirections(i, j, nestedArrayCopy);
      if (nestedArrayCopy[i][j] === 'L') {
        if (seenElements.filter(element => element === '#').length === 0) {
          nestedArray[i][j] = '#'
          changed = true;
        }
      } else if (nestedArray[i][j] === '#') {
        // newNestedArray[i].push(adjacentElements.filter(element => element === '#').length >= 4 ? 'L' : '#');
        if (seenElements.filter(element => element === '#').length >= 5) {
          nestedArray[i][j] = 'L';
          changed = true;
        }
      }
    }
  }
  return changed;
}
/* console.log(smallSample2);
while(true) {
  const changed = applySittungRulesInPlace2(smallSample2);
  console.log('changed?', changed);
  if (!changed) {
    break;
  }
}
console.log(smallSample2);
const occupied = smallSample2.reduce((acc, innerArray) => acc + innerArray.filter(element => element === '#').length, 0);

console.log(occupied); */

while(true) {
  const changed = applySittungRulesInPlace2(inputNestedArray);
  console.log('changed?', changed);
  if (!changed) {
    break;
  }
}
const occupied = inputNestedArray.reduce((acc, innerArray) => acc + innerArray.filter(element => element === '#').length, 0);

console.log(occupied);