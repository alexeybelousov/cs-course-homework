const zip = (...iteratorsList) => {
  let cursor = 0;
  let cursorIter = iteratorsList[0][Symbol.iterator]();

  return {
    [Symbol.iterator]() {
      return this;
    },

    next: () => {
      let next = cursorIter.next();

      const res = {
        ...next,
        value: iteratorsList.reduce((acc, obj) => [...acc, [...obj][cursor]], []),
      }

      cursor++;

      return res;
    },
  }
}

console.log(...zip([1, 2], new Set([3, 4]), 'bl')); // [[1, 3, b], [2, 4, 'l']]
