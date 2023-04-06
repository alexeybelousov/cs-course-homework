const createBitAccessor = (uint8Array) => {
  const validate = (elIndex, bitIndex, value, callback) => {
    if (elIndex < 0) {
      throw new Error(`Element index ${elIndex} less than zero`);
    } else if (elIndex >= uint8Array.length) {
        throw new Error(`Element index ${elIndex} is greater than the length of the array`);
    } else if (bitIndex < 0) {
      throw new Error(`Bit index ${bitIndex} less than zero`);
    } else if (bitIndex > 7) {
      throw new Error(`Bit index ${bitIndex} is greater than 7`);
    } else if (typeof value !== undefined && (value < 0 || value > 1)) {
      throw new Error(`Value ${value} must be 0 or 1`);
    } else {
      return callback();
    }
  }

  return {
    get(elIndex, bitIndex) {
      return validate(elIndex, bitIndex, null, () => {
        return (uint8Array[elIndex] & (1 << bitIndex)) != 0 ? 1 : 0;
      });
    },
    set(elIndex, bitIndex, value) {
      return validate(elIndex, bitIndex, value, () => {
        if (value) {
          uint8Array[elIndex] = uint8Array[elIndex] | (1 << bitIndex);
        } else {
          uint8Array[elIndex] = uint8Array[elIndex] & ~(1 << bitIndex);
        }
      });
    }
  }
}

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