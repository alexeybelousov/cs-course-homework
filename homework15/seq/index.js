const seq = (...iteratorsList) => {
  let cursor = 0;
  let cursorIter = iteratorsList[cursor][Symbol.iterator]();

  return {
    [Symbol.iterator]() {
      return this;
    },

    next: () => {
      let next = cursorIter.next();

      if (next.done) {
        cursor++;

        if (cursor === iteratorsList.length) {
          return {
            value: undefined,
            done: true,
          }
        }

        cursorIter = iteratorsList[cursor][Symbol.iterator]();
        next = cursorIter.next();
      }

      return next;
    },
  }
}

console.log(...seq([1, 2], new Set([3, 4]), 'bla')); // 1, 2, 3, 4, 'b', 'l', 'a'