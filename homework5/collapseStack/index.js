const collapse = (obj) => {
  let stack = [{ prefix: '', obj }];
  let result = {};

  while (stack.length) {
    const { obj, prefix } = stack.pop();

    if (typeof obj !== 'object') {
      result[prefix] = obj;
    }

    const keysArr = Object.keys(obj);

    for (let i = keysArr.length - 1; i >= 0; i--) {
      stack.push({ prefix: `${prefix && prefix + '.'}${keysArr[i]}`, obj: obj[keysArr[i]] });
    }
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