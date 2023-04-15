const ENCODING_TYPES = {
  UTF16: 'utf16',
  U16: 'u16',
};

const strToUtf16 = (string, uint16Array, offset, length) => {
  for (let i = offset, j = 0; i < offset + length; i++, j++) {
    uint16Array[i] = string.charCodeAt(j);
  }

  return uint16Array;
}

const getEncodingDataByKey = (k, scheme) => {
  let offset = 0;
  let length = 0;
  let format = '';

  for (let i = 0; i < scheme.length; i++) {
    const [key, f, size] = scheme[i];
    const encodeLength = f === ENCODING_TYPES.UTF16 ? size : 1;

    if (key === k) {
      length = encodeLength;
      format = f;
      break;
    }

    offset += encodeLength;
  }

  return [offset, length, format];
}

const Structure = (scheme) => {
  const bytesLength = scheme.reduce((acc, [k, f, bytesLength]) => {
    return bytesLength ? acc += bytesLength : acc += 1;
  }, 0);
  let uint16Array = new Uint16Array(bytesLength);

  return {
    get(key) {
      const [offset, length, format] = getEncodingDataByKey(key, scheme);

      if (format === ENCODING_TYPES.UTF16) {
        return String.fromCharCode.apply(null, uint16Array.slice(offset, offset + length));
      } else {
        return uint16Array[offset];
      }
    },
    set(key, value) {
      const [offset, length, format] = getEncodingDataByKey(key, scheme);
      
      if (format === ENCODING_TYPES.UTF16) {
        uint16Array = strToUtf16(value, uint16Array, offset, length);
      } else {
        uint16Array[offset] = value;
      }
    }
  }
}

const jackBlack = Structure([
  ['name', ENCODING_TYPES.UTF16, 10],
  ['lastName', ENCODING_TYPES.UTF16, 10],
  ['age', ENCODING_TYPES.U16],
  ['profession', ENCODING_TYPES.UTF16, 10],
]);

jackBlack.set('name', 'Jack');
jackBlack.set('lastName', 'Black');
jackBlack.set('age', 53);
jackBlack.set('profession', 'engineer');

console.log(jackBlack.get('age')); // 53
console.log(jackBlack.get('name')); // 'Jack'
console.log(jackBlack.get('lastName')); // 'Black'
console.log(jackBlack.get('profession')); // 'engineer'
