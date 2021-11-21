const fs = require('fs');
const input = fs.readFileSync('input.txt').toString();

const inputArray = input.split('\n');
const timestamp = inputArray[0];
const busIdArray = inputArray[1].split(',');

// Part 1

/* const busIdArrayFiltered = busIdArray.filter(element => element !== 'x');

const busIdArrayAddTime = busIdArrayFiltered.map(element => [element, element - timestamp % element]);

busIdArrayAddTime.sort((a, b) => a[1] - b[1]);

console.log(busIdArrayAddTime);

console.log(busIdArrayAddTime[0][0] * busIdArrayAddTime[0][1]); */

// Part 2

console.log(busIdArray);

const busContestArray = busIdArray.map((element, index) => [element, index]).filter(array => array[0] !== 'x');

console.log(busContestArray);

function findTimestamp(contestArray) {
  const firstId = contestArray[0][0];
  let i = 1;
  while (true) {
    let valid = true;
    for (let j = 1; j < contestArray.length; j++) {
      if ((contestArray[j][0] - (firstId * i) % contestArray[j][0]) % contestArray[j][1] !== 0) {
        valid = false;
        break;
      }
    }
    if (valid) {
      return firstId * i;
    }
    i++;
  }
}

const smallSample = `7,13,x,x,59,x,31,19`.split(',').map((element, index) => [element, index]).filter(array => array[0] !== 'x');
console.log(smallSample);

const result = findTimestamp(smallSample);
console.log(result);