const openBrackets = ['{', '[', '('];
const closeBrackets = ['}', ']', ')'];
const mapOpenToCloseBrackets = {
  '{': '}',
  '(': ')',
  '[': ']',
};

const isValid = (stringToValid) => {
  let stack = [];

  for (let i = 0; i < stringToValid.length; i++) {
    const char = stringToValid[i];

    if (openBrackets.includes(char)) {
      stack.push(char);
    }

    if (closeBrackets.includes(char)) {
      const lastOpenedInStack = stack.pop();

      if (mapOpenToCloseBrackets[lastOpenedInStack] !== char) {
        return false;
      }
    }
  }

  return !stack.length;
}


console.log(isValid('(hello{world} and [me])'));  // true
console.log(isValid('(hello{world)} and [me])')); // false
console.log(isValid(')')); // false
