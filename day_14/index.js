const fs = require('fs');
const input = fs.readFileSync('input.txt').toString();

const inputArray = input.split('\n').map(string => string.split(' = '));

// Part 1
function initializeMem(array) {
  let mask = '';
  const memory = {};
  for (const instruction of array) {
    if (instruction[0] === 'mask') {
      mask = instruction[1];
    } else {
      const adress = instruction[0].slice(4, -1);
      const binaryValue = Number(instruction[1]).toString(2).padStart(36, '0');
      const resultArray = [];
      for (let i = 0; i <= 36; i++) {
        if (mask[i] !== 'X') {
          resultArray.push(mask[i]);
        } else {
          resultArray.push(binaryValue[i])
        }
      }
      memory[adress] = resultArray.join('');
    }
  }
  return memory;
}

const sumMemValues = memoryObj => Object.values(memoryObj).reduce((sum, binary) => sum + parseInt(binary, 2), 0);
const sumMemValues2 = memoryObj => Object.values(memoryObj).reduce((sum, value) => sum + value);

/* const smallSample = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`.split('\n').map(string => string.split(' = '));

const initializedMem = initializeMem(inputArray);

const sum = sumMemValues(initializedMem);

console.log(sum); */

// Part 2

function initializeMem2(array) {
  let mask = '';
  const memory = {};
  for (const instruction of array) {
    if (instruction[0] === 'mask') {
      mask = instruction[1];
    } else {
      const value = +instruction[1];
      const address = instruction[0].slice(4, -1);
      const maskedAddress = maskAddress(address, mask);
      const addressArray = convertMaskedAddToArray(maskedAddress);
      addressArray.forEach(item => memory[item] = value);
    }
  }
  return memory;
}

function maskAddress(address, mask) {
  const addressBinary = Number(address).toString(2).padStart(36, '0');
  const addressMaskedArray = addressBinary.split('').reduce((acc, char, index) => {
    if (mask[index] === '0') {
      acc.push(char);
    } else {
      acc.push(mask[index]);
    }
    return acc;
  }, []);
  return addressMaskedArray.join('');
}

function convertMaskedAddToArray(address, index = 0) {
  if (index === address.length) {
    return [address];
  }
  for (let i = index; i < address.length; i++) {
    if (address[i] === 'X') {
      const address0 = address.slice(0, i) + '0' + address.slice(i + 1);
      const address1 = address.slice(0, i) + '1' + address.slice(i + 1);
      return [...convertMaskedAddToArray(address0, i + 1), ...convertMaskedAddToArray(address1, index + 1)];
    } 
  }
  return [address];
}

const initializedMem2 = initializeMem2(inputArray);
console.log(initializedMem2);
const sum2 = sumMemValues2(initializedMem2);
console.log(sum2);