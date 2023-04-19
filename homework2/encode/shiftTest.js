// encode
const num1 = 105, num2 = 100, num3 = 101;
const size = 10;

const allOne = 2 ** 32 - 1; // 11111111111111111111111111111111

const mask = allOne >>> 32 - size; // 11111111111

const cut1 = num1 & (mask);
const cut2 = num2 & (mask);
const cut3 = num3 & (mask);

const encode = (cut1 | (cut2 << size) | (cut3 << (size * 2)));

// decode
console.log(((encode & mask)));
console.log(((encode & (mask << size)) >> size));
console.log(((encode & (mask << (size * 2))) >> (size * 2)));

