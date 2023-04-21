const collapse = (obj, result = {}, prefix = '') => {
  const keysArr = Object.keys(obj);

  for (let i = 0; i < keysArr.length; i++) {
    if (typeof obj[keysArr[i]] !== 'object') {
      result[`${prefix}${keysArr[i]}`] = obj[keysArr[i]];
    }

    collapse(obj[keysArr[i]], result, `${prefix}${keysArr[i]}.`)
  }

  return result;
}


const obj = {
  a: {
    b: [1, 2],
    '': {
      c: 2,
    }
  }
};

/* {'a.b.0': 1, 'a.b.1': 2, 'a..c': 2} */
console.log(collapse(obj));