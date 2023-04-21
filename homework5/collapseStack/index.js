const collapse = (obj) => {
  let stack = [{ prefix: undefined, obj }];
  let result = {};

  while (stack.length) {
    const { obj, prefix } = stack.pop();

    if (typeof obj !== 'object' || obj === null) {
      result[prefix] = obj;

      continue;
    }

    const keysArr = Object.keys(obj);

    for (let i = keysArr.length - 1; i >= 0; i--) {
      const key = keysArr[i];
      const prefixToUpdate = prefix === undefined
          ? key
          : `${prefix}.${key}`;

      stack.push({
        prefix: prefixToUpdate,
        obj: obj[keysArr[i]],
      });
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

const obj2 = {
  a: {
    b: null,
    c: '',
  },
};

/* {'a.b': null, 'a.c': ''} */
console.log(collapse(obj2));
