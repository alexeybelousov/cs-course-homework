const mapSeq = (iter, iteratorsFun) => {
  let cursorIter = iter[Symbol.iterator]();

  return {
    [Symbol.iterator]() {
      return this;
    },

    next: () => {
      let next = cursorIter.next();

      return {
        ...next,
        value: iteratorsFun.reduce((acc, fun) => fun(acc), next.value),
      }
    },
  }
}

console.log(...mapSeq([1, 2, 3], [(el) => el * 2, (el) => el - 1])); // [1, 3, 5]