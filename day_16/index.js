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

console.log(nearbyTickets.length);
console.log(allTickets.length);
discardInvalidTickets(allTickets, fieldsArray);
console.log(allTickets.length);