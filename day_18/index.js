const fs = require('fs');
const input = fs.readFileSync('input.txt').toString();
const expressions = input.split('\n');

const smallSample = `1 + 2 * 3 + 4 * 5 + 6`;

function evaluate(expression) {
  // console.log('expression', expression);
  const array = expression.split(' ')
  // console.log('array', array);
  let result = +array.shift();
  // console.log('array after shift', array);
  // console.log('result before:', result);
  while (array.length) {
    if (array[0] === '+') {
      result += +array[1];
      // console.log('result after +:', result);
    } else if (array[0] === '*') {
      result *= +array[1];
      // console.log('result after *:', result);
    }
    array.shift();
    array.shift();
    // console.log('array after shift:', array);
  }
  return result;
}

/* const result = evaluate(smallSample);
console.log(result); */

const smallSampleParatheses = `((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2`;
/* const result2 = dissolveBrackets(smallSampleParatheses);
console.log(result2); */

function dissolveBrackets(expression) {
  const array = expression.split('');
  let openBrackets = [];
  let lastBracket = 0;
  let i = 0;
  while (i < array.length) {
    if (array[i] === '(') {
      openBrackets.push(i);
      lastBracket = i;
      i++;
    } else if (array[i] === ')') {
      const partialExpression = array.slice(lastBracket + 1, i).join('');
      const result = evaluate(partialExpression);
      // console.log('before:', array);
      array.splice(lastBracket, i - lastBracket + 1, result);
      // console.log('after', array);
      i = lastBracket;
      openBrackets.pop();
      lastBracket = openBrackets[openBrackets.length - 1];
    } else {
      i++;
    }
  }
  return array.join('');
}

function calculate(expression) {
  return evaluate(dissolveBrackets(expression));
}

const resultPart1 = expressions.reduce((accu, expression) => accu + calculate(expression), 0);
console.log(resultPart1);

