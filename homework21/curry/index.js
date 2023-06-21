function curry(fn) {
  const countArgs = fn.length;

  return function curried(...args) {
    if (args.length >= countArgs) {
      return fn.apply(null, args);
    }

    return function(...args2) {
      return curried.apply(null, [...args, ...args2]);
    }
  }
}

const diff = curry((a, b, c) => a - b - c);

console.log(diff(22)()()(16, 1)); // 5

// console.log(diff(curry._, 10)(15)); // 5