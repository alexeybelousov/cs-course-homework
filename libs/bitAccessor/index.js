const createBitAccessor = (uint8Array) => {
  const assertValidation = (elIndex, bitIndex, value) => {
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
    }
  }

  return {
    get(elIndex, bitIndex) {
      assertValidation(elIndex, bitIndex);
      
      return (uint8Array[elIndex] & (1 << bitIndex)) != 0 ? 1 : 0;
    },
    set(elIndex, bitIndex, value) {
      assertValidation(elIndex, bitIndex, value);

      if (value) {
        uint8Array[elIndex] = uint8Array[elIndex] | (1 << bitIndex);
      } else {
        uint8Array[elIndex] = uint8Array[elIndex] & ~(1 << bitIndex);
      }
    }
  }
}

module.exports = createBitAccessor;