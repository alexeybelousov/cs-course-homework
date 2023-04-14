const createBitAccessor = require('../../libs/bitAccessor');

const assertValidationDecodeType = (data, schema) => {
  if (!data || !schema || !schema.length) {
    throw new Error(`Arrgs are not valid`);
  }
  if (!data.buffer instanceof ArrayBuffer || data.byteLength === undefined) {
    throw new Error(`ArrayBuffer data is not valid`);
  }
}

const binaryToText = (binary) => {
  return binary.replace(/[01]{8}/g, (v) => {
    return String.fromCharCode(parseInt(v, 2));
  });
}

const getDataByType = (binary, type) => {
  switch(type) {
    case 'number':
      return parseInt(binary, 2);
    case 'boolean':
      return binary === '1';
    default:
      return binary;
    case 'ascii':
      return binaryToText(binary);
  }
}

const decode = (buffer, schema) => {
  assertValidationDecodeType(buffer, schema);

  const uint8Array = new Uint8Array(buffer);
  const bitAccessor = createBitAccessor(uint8Array);

  let count = 0;
  let result = [];

  for (let i = 0; i < schema.length; i++) {
    const encodeSize = schema[i][0];
    const encodeType = schema[i][1];
    let binaryData = '';

    for (let j = 0; j < encodeSize; j++) {
      const bytesIndex = Math.floor(count/8);
      const bitsIndex = count % 8;

      binaryData += `${bitAccessor.get(bytesIndex, bitsIndex)}`;
      count++;
    }

    const decodeData = getDataByType(binaryData, encodeType);

    result.push(decodeData);
  }

  return result;
}

module.exports = decode;
