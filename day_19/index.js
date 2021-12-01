const fs = require('fs');
const input = fs.readFileSync('input.txt').toString();

const ruleString = input.split('\n\n')[0];
const messageString = input.split('\n\n')[1];

const messageArray = messageString.split('\n');

const rulesArray = ruleString.split('\n');
const rulesArray_2 = rulesArray.map(rule => rule.split(': '));
rulesArray_2.sort((a, b) => a[0] - b[0])
const rulesArray_3 = rulesArray_2.map(rule => rule[1]);
const rules = rulesArray_3.map(rule => {
    if (rule === '"a"' || rule === '"b"') {
      return rule[1];
    }
  if (rule.includes('|')) {
    return rule.split(' | ').map(item => item.split(' '));
  }
  return [rule.split(' ')];
});
// console.log(rules);

function generateValidMessages(rules, index = 0) {
/*   console.log('index', index);
  console.log('rules[index]', rules[index]); */
  if (rules[index] === 'a' || rules[index] === 'b') {
    return rules[index];
  }
  const array = [];
  rules[index].forEach(subRule => {
/*     console.log('subRule', subRule);
    console.log('subRule[0]', subRule[0]);
    console.log('subRule[0]', subRule[0]);
    console.log('subRule[1]', subRule[1]); */
    const subarray = [];
    subRule.forEach(subSubRule => subarray.push(...generateValidMessages(rules, subSubRule)));
    array.push(subarray);
    // array.push(...generateValidMessages(rules, subRule[0]), ...generateValidMessages(subRule[1]))
  });
  return array;
}

const result = generateValidMessages(rules);
console.log(result);

// Idee: Statt mit einem Array aus gültigen Messages zu arbeiten, mit einem Baum.