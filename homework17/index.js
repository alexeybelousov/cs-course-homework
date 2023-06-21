const tag = (target) => {
  const reg = new RegExp(target, 'g');

  return function* (str) {
    return str.match(reg)
      ? { type: 'TAG', value: target }
      : new Error('TAG exeption');
  }
}

const fnTag = tag('function ')('function foo() {}');

console.log(fnTag.next()); // {done: true, value: {type: 'TAG', value: 'function'}}

const take = (reg) => {
  return function* (str, { max } = {}) {
    const res = str.match(reg);

    return res && res.length
      ? { type: 'TAKE', value: res[0] }
      : new Error('TAKE exeption');
  }
}

const takeNumber = take(/\d/)('1234 foo');

console.log(takeNumber.next()); // {done: true, value: {type: 'TAKE', value: '1234'}}

const takeNumber2 = take(/\d/)('1234 foo', {max: 2});

console.log(takeNumber.next()); // {done: true, value: {type: 'TAKE', value: '12'}}