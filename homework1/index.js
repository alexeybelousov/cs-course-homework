const createBitAccessor = require('../libs/bitAccessor');

const bitAccessor = createBitAccessor(new Uint8Array([0b1110, 0b1101]));

// valid get
console.log(bitAccessor.get(0, 1)); // 1
console.log(bitAccessor.get(1, 1)); // 0

// valid set
console.log(bitAccessor.set(0, 1, 0)); // undefined
console.log(bitAccessor.get(0, 1)); // 0
console.log(bitAccessor.set(1, 1, 1)); // undefined
console.log(bitAccessor.get(1, 1)); // 1

// not valid get
console.log(bitAccessor.get(3, 10)); // error
console.log(bitAccessor.get(-1, 1)); // error
console.log(bitAccessor.get(0, -1)); // error
console.log(bitAccessor.get(1, 8)); // error

// no valid set
console.log(bitAccessor.set(0, 1, -3)); // error
console.log(bitAccessor.set(0, 1, 2)); // error