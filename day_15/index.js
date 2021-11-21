const input = '12,1,16,3,11,0';
const inputArray = input.split(',');

const numberTable = {};

let lastNumber;

// reading input

function addToTable(table, number, value) {
  if (!table[number]) {
    table[number] = [value];
  } else {
    table[number].push(value);
    if (table[number].length > 2) {
      table[number].shift();
    }
  }
}

inputArray.forEach((number, index) => {
  addToTable(numberTable, number, index + 1);
});
lastNumber = inputArray[inputArray.length - 1];

// new numbers

const start = inputArray.length + 1;
const end = 30000000;

for (let i = start; i <= end; i++) {
  if (numberTable[lastNumber].length === 1) { // new number is 0
    addToTable(numberTable, 0, i);
    lastNumber = 0;
  } else {
    const newNumber = numberTable[lastNumber][1] - numberTable[lastNumber][0];
    addToTable(numberTable, newNumber, i);
    lastNumber = newNumber;
  }
}

console.log(lastNumber);