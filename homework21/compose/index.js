const compose = (...args) => {
  return (arg) => {
    return args
      .reverse()
      .reduce((acc, fn) => fn(acc), arg);
  }
}

const f = compose(
  (a) => a ** 2,
  (a) => a * 10,
  (a) => Math.sqrt(a) // Первая
);

console.log(f(16)); // 1600