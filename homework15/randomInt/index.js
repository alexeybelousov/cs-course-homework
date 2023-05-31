// 1
const random = (min, max) => {  
  let cursor = 0;

  return {
    [Symbol.iterator]() {
      return this;
    },
    next: () => {
      const res = {
        value: Math.floor(Math.random() * (max - min + 1)) + min,
        done: false,
      };

      cursor++;

      return res;
    }
  }
}

const randomInt = random(10, 100);

console.log(randomInt.next());
console.log(randomInt.next());
console.log(randomInt.next());
console.log(randomInt.next());


// 2
const take = (iterable, count) => {
  let limit = 0;
  const iterator = iterable[Symbol.iterator]();

  return {
    [Symbol.iterator]() {
      return this;
    },
    next: () => {
      if (limit >= count) {
        return {
          value: undefined,
          done: true,
        };
      }

      limit++;

      return iterator.next();
    }
  }
}

console.log([...take(randomInt, 15)]);


// 3
const filter = (iterable, predicate) => {
  let count = 0;
  const iterator = iterable[Symbol.iterator]();

  return {
    [Symbol.iterator]() {
      return this;
    },
    next: () => {
      for(;;) {
          let v = iterator.next();

          if (predicate(v.value)) {
            return v;
          }
      }
    }
  }
}

console.log([...take(filter(randomInt, (el) => el > 30), 15)]);


// 4
const enumerate = (iterable) => {
  let cursor = 0;
  const iterator = iterable[Symbol.iterator]();

  return {
    [Symbol.iterator]() {
      return this;
    },
    next: () => {
      let v = iterator.next();

      const res = {
        value: [cursor, v.value],
        done: false,
      }

      cursor++;

      return res;
    }
  };
}

console.log([...take(enumerate(randomInt), 3)]);