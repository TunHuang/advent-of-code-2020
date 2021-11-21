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

console.log('busIdArray:', busIdArray);

const busContestArray = busIdArray.map((element, index) => [element, index]).filter(array => array[0] !== 'x');

console.log('busContestArray', busContestArray);

function findTimestamp(contestArray) {
  const firstId = contestArray[0][0];
  let i = 1;
  let counter = 0;
  while (true) {
    // console.log(i);
    let valid = true;
    for (let j = 1; j < contestArray.length; j++) {
      if ((firstId * i + contestArray[j][1]) % contestArray[j][0] !== 0) {
        valid = false;
        break;
      } else if (j === 2){
        console.log(`i=${i}, timestamp=${i * firstId}, works with ${contestArray[j][0]}`);
        counter ++;
        if (counter === 5) {
          return;
        }
      }
    }
    if (valid) {
      return firstId * i;
    }
    i++;
  }
}

const smallSample = `67,7,x,59,61`.split(',').map((element, index) => [element, index]).filter(array => array[0] !== 'x');
// console.log(smallSample);

const result = findTimestamp(busContestArray);
console.log(result);