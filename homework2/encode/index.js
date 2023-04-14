const encode = require("./encode");
const decode = require("./decode");


const schema = [
  [16, 'ascii'],
  [3, 'number'],
  [3, 'number'],
  [1, 'boolean'],
  [1, 'boolean'],
  [24, 'ascii'],
  [16, 'number']
];

const data = ['w', 1, 3, false, true, 'ab.', 2555];

const buffer = encode(data, schema);

console.log(decode(buffer, schema)); // ['w', 1, 3, false, true, 'ab.', 2555]

console.log(decode('8786786567', schema)); // not valid

