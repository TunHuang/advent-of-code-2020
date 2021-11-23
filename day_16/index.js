const fs = require('fs');

const fieldsInput = fs.readFileSync('fields.txt').toString();

const fieldsArray = fieldsInput
  .split('\n')
  .map(element => element.split(': '))
  .map(element => [element[0], ...element[1].split(' or ')])
  .map(element => [element[0], element[1].split('-').map(value => +value), element[2].split('-').map(value => +value)]);

const nearbyTickets = fs.readFileSync('nearbyTickets.txt').toString().split('\n').map(ticket => ticket.split(',').map(value => +value));

function checkInRange(value, field) {
  const max1 = field[1][1];
  const min1 = field[1][0];
  const min2 = field[2][0];
  const max2 = field[2][1];
  return (value >= min1 && value <= max1) || (value >= min2 && value <= max2);
}

function calcScanningErrorRate(tickets, fields) {
  let sumInvalidNumbers = 0;
  for (const ticket of tickets) {
    for (const value of ticket) {
      let valid = false;
      for (const field of fields) {
        if (checkInRange(value, field)) {
          valid = true;
          break;
        }
      }
      if (!valid) {
        sumInvalidNumbers += value;
      }
    }
  }
  return sumInvalidNumbers;
}

const result = calcScanningErrorRate(nearbyTickets, fieldsArray);
console.log(result);

// Part 2

// would certainly be easier with filter
function discardInvalidTickets(tickets, fields) {
  goThroughTickets:
  for (let i = 0; i < tickets.length;) {
    const ticket = tickets[i];
    for (const value of ticket) {
      let validValue = false;
      for (const field of fields) {
        if (checkInRange(value, field)) {
          validValue = true;
          break;
        }
      }
      if (!validValue) {
        tickets.splice(i, 1);
        continue goThroughTickets;
      }
    }
    i++;
  }
}

const myTicket = fs.readFileSync('myTicket.txt').toString().split(',').map(value => +value);
const allTickets = [myTicket, ...nearbyTickets];

discardInvalidTickets(allTickets, fieldsArray);

console.log(allTickets);
console.log(fieldsArray);

const ticketFields = [];

for (let i = 0; i < allTickets[0].length; i++) {
  ticketFields.push([]);
  allTickets.forEach(ticket => ticketFields[i].push(ticket[i]));
}

console.log("ticketFields:", ticketFields);

const fieldMatrix = [];

for (const ticketField of ticketFields) {
  const booleanArray = [];
  for (const generalField of fieldsArray) {
    let valid = true;
    for (const value of ticketField) {
      if (!checkInRange(value, generalField)) {
        valid = false;
        break;
      }
    }
    booleanArray.push(valid);
  }
  fieldMatrix.push(booleanArray);
}

console.log("fieldMatrix", fieldMatrix);

/* 
[
ticketField1: [generalField1valid, generalField2valid...]
ticketField2: [generalField1valid, generalField2valid...]
ticketField3: [generalField1valid, generalField2valid...]
ticketField4: [generalField1valid, generalField2valid...]
]
 */
// There is probably an elegant matrix calculation that I don't know. I'll just try somehow.

const numberOfValidFields = fieldMatrix.map(array => array.reduce((acc, boolean) => acc + +boolean), 0);
console.log('numberOfValidFields', numberOfValidFields);


/* const ticketFieldIndex = numberOfValidFields.indexOf(1);
console.log(ticketFieldIndex);
console.log(fieldMatrix[ticketFieldIndex]);
const fieldIndex = fieldMatrix[ticketFieldIndex].indexOf(true);
const fieldsTable = {};
fieldsTable[fieldIndex] = ticketFieldIndex;
console.log(fieldsTable); */

function createFieldsTable(fieldMatrix, validNumberTable) {
  const fieldsTable = {};
  for (let i = 1; i <= validNumberTable.length; i++) {
    const ticketFieldIndex = validNumberTable.indexOf(i);
    const mappedFields = Object.values(fieldsTable);
    const generalFieldIndex = fieldMatrix[ticketFieldIndex].findIndex((element, index) => element && !mappedFields.includes(index));
    fieldsTable[ticketFieldIndex] = generalFieldIndex;
  }
  return fieldsTable;
}

const fieldsTable = createFieldsTable(fieldMatrix, numberOfValidFields);
console.log(fieldsTable);

const endResult = myTicket[1] * myTicket[6] * myTicket[19] * myTicket[2] * myTicket[16] * myTicket[17];
console.log('endResult:', endResult);