const fs = require('fs');
const input = fs.readFileSync('input.txt').toString();
const inputArray = input.split('\n');

// Part 1
class Ship {
  constructor(facingDirection = 'E', positionY = 0, positionX = 0) {
    this.facingDirection = facingDirection;
    this.positionY = positionY;
    this.positionX = positionX;
  }
  getManhattanDistance() {
    return Math.abs(this.positionX) + Math.abs(this.positionY);
  }
  readInstruction(instruction) {
    const action = instruction[0] !== 'F' ? instruction[0] : this.facingDirection;
    const value = +instruction.slice(1);
    switch(action) {
      case 'R':
      case 'L':
        this.#turnDirection(action, value);
        break;
      case 'N':
        this.positionY += value;
        break;
      case 'S':
        this.positionY -= value;
        break;
      case 'E':
        this.positionX += value;
        break;
      case 'W':
        this.positionX -= value;
        break;
      default:
        console.log('invalid instruction:', action);
    }
  }
  #turnDirection(side, value) {
    const cardinalDirections = ['N', 'E', 'S', 'W'];
    const currentIndex = cardinalDirections.indexOf(this.facingDirection);
    if (side === 'R') {
      const newIndex = (currentIndex + value/90) % 4;
      this.facingDirection = cardinalDirections[newIndex];
    } else {
      const newIndex = (currentIndex - value/90) % 4;
      this.facingDirection = cardinalDirections[newIndex >= 0 ? newIndex : 4 + newIndex];
    }
  }
}

/* const ferry = new Ship('E');
console.log('initial ferry:', ferry);
for (instruction of inputArray) {
  ferry.readInstruction(instruction);
}
console.log('after instructions:', ferry);
console.log('Manhattan distance:', ferry.getManhattanDistance()); */

// Part 2

class Ship2 {
  constructor(waypointY = 1, waypointX = 10, positionY = 0, positionX = 0) {
    this.waypointY = waypointY;
    this.waypointX = waypointX;
    this.positionY = positionY;
    this.positionX = positionX;
  }
  getManhattanDistance() {
    return Math.abs(this.positionX) + Math.abs(this.positionY);
  }
  readInstruction(instruction) {
    const action = instruction[0];
    const value = +instruction.slice(1);
    switch(action) {
      case 'R':
      case 'L':
        this.#rotateWaypoint(action, value);
        break;
      case 'N':
        this.waypointY += value;
        break;
      case 'S':
        this.waypointY -= value;
        break;
      case 'E':
        this.waypointX += value;
        break;
      case 'W':
        this.waypointX -= value;
        break;
      case 'F':
        this.positionY += this.waypointY * value;
        this.positionX += this.waypointX * value;
        break;
      default:
        console.log('invalid instruction:', action);
    }
  }
  #rotateWaypoint(side, value) {
    const iterations = value/90;
    if (side = 'R') {
      for (let i = 0; i < iterations; i++) {
        // [this.waypointY, this.waypointX] = [-this.waypointX, this.waypointY];
        const cacheY = this.waypointY;
        this.waypointY = -this.waypointX;
        this.waypointX = cacheY;
      }
    } else {
      for (let i = 0; i < iterations; i++) {
        // [this.waypointY, this.waypointX] = [this.waypointX, -this.waypointY];
        const cacheX = this.waypointX;
        this.waypointX = -this.waypointY;
        this.waypointY = cacheX;
      }
    }
  }
}

const smallSample = `F10
N3
F7
R90
F11`.split('\n');

const ferry2 = new Ship2(1, 10);
console.log('initial ferry:', ferry2);
for (instruction of inputArray) {
  ferry2.readInstruction(instruction);
  console.log('after each instruction:', ferry2);
}
console.log('after instructions:', ferry2);
console.log('Manhattan distance:', ferry2.getManhattanDistance());