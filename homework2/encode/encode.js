const createBitAccessor = require('../../libs/bitAccessor');

const assertValidationEncodeType = (data, schema) => {
  if (!data || !schema || data.length !== schema.length) {
    throw new Error(`Arrgs are not valid`);
  }

  for (let i = 0; i < schema.length; i++) {
    if (typeof data[i] === 'string') {
      if (schema[i][1] !== 'ascii') {
        throw new Error(`Data ${data[i]} does not match the validation scheme ascii`);
      }
    } else {
      if (typeof data[i] !== 'string' && typeof data[i] !== schema[i][1]) {
        throw new Error(`Data ${data[i]} does not match the validation scheme`);
      }
    }
  }
}

const assertValidationEncodeData = (offset, encodeData) => {
  if (offset < 0) {
    throw new Error(`Encoding size is smaller than data ${encodeData}`);
  }
}

const textToBinary = (string) => {
    const pad = '00000000';

    return string.replace(/./g, (c) => {
        const bin = c.charCodeAt(0).toString(2);
        return pad.substring(bin.length) + bin;
    });
}

const getBinaryByType = (binaryStr, type) => {
  switch(type) {
    case 'number':
      return binaryStr.toString(2);
    case 'boolean':
      return binaryStr ? '1' : '0';
    case 'ascii':
      return textToBinary(binaryStr);
  }
}

const encode = (data, schema) => {
  assertValidationEncodeType(data, schema);

  const bitsLength = schema.reduce((acc, el) => (acc += el[0]), 0);
  const bytesLength = Math.ceil(bitsLength/8);

  let buffer = new ArrayBuffer(bytesLength);
  let uint8Array = new Uint8Array(buffer).fill(0b00000000);

  const bitAccessor = createBitAccessor(uint8Array);

  let count = 0;

  for (let i = 0; i < data.length; i++) {
    const encodeSize = schema[i][0];
    const encodeType = schema[i][1];

    const encodeData = getBinaryByType(data[i], encodeType);
    const offset = encodeSize - encodeData.length;

    assertValidationEncodeData(offset, data[i]);

    for (let j = 0; j < encodeSize; j++) {
      if (j >= offset) {
        const bytesIndex = Math.floor(count/8);
        const bitsIndex = count % 8;

        bitAccessor.set(bytesIndex, bitsIndex, +encodeData[j - offset])
      } 
      count++;
    }
  }

  return buffer;
}

module.exports = encode;
