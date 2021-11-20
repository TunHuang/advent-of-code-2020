const { count } = require('console');
const fs = require('fs');
const input = fs.readFileSync('input.txt').toString();

// Part 1

const inputArray = input.split('\n');
inputArray.sort((a, b) => a - b);
console.log(inputArray);

const arrayAdded = ['0', ...inputArray, +inputArray[inputArray.length - 1] + 3];
console.log(arrayAdded);

function countArrayDiff(array) {
  const diffTable = {};
  for (let i = 0; i < array.length - 1; i++) {
    const diff = array[i + 1] - array[i];
    if (!diffTable[diff]) {
      diffTable[diff] = 1;
    } else {
      diffTable[diff]++;
    }
  }
  return diffTable;
}

const result = countArrayDiff(arrayAdded);
console.log(result);
console.log(65 * 26);

// Part 2

function countArrangements(array, memo = new Map()) {
  counter++;
  if (memo.has(array[0])) {
    return memo.get(array[0]);
  }
  if (array.length === 1) {
    return 1;
  }
  let arrangements = 0;
  for (let i = 1; i < 4; i++) {
    if (array[i] && array[i] - array[0] < 4) {
      arrangements += countArrangements(array.slice(i), memo);
    }
  }
  memo.set(array[0], arrangements);
  return arrangements;
}
let counter = 0;
const result4 = countArrangements(arrayAdded);
console.log(result4);
console.log('counter:', counter);