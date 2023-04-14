const encode = require("./encode");
const decode = require("./decode");


const schema = [
  [16, 'ascii'],
  [3, 'number'],
  [3, 'number'],
  [1, 'boolean'],
  [1, 'boolean'],
  [24, 'ascii'],
  [24, 'number']
];

const data = ['w', 1, 3, false, true, 'ab.', 123456];

const buffer = encode(data, schema);

console.log(decode(buffer, schema)); // ['w', 1, 3, false, true, 'ab.', 2555]

const schema2 = [
  [3, 'number'],
  [3, 'number'],
  [1, 'boolean'],
  [24, 'ascii']
];

console.log(decode(encode([3, 2, false, 'a b'], schema2), schema2)); // [3, 2, false, 'a b']

console.log(decode('8786786567', schema)); // not valid

