const Result = require('./result');

// 1
// const res1 = new Result(() => 42);

// res1.then((data) => {
//   console.log(data);
// });

// const res2 = new Result(() => { throw 'Boom!'; });

// res2.then((data) => {
//   // Этот callback не вызовется
//   console.log(data);

// // А этот вызовется
// }).catch((err) => {
//   console.error(err);
// });


// 2
function exec(genFn) {
  const iter = genFn();

  return process();

  function process(data) {
    const chunk = iter.next(data);

    if (chunk.done) {
      return new Result(() => chunk.value);
    }

    const value = new Result(() => chunk.value);

    return value
      .then((val) => {
        return process(val);
      })
      .catch((err) => {
        const chunk = iter.throw(err);

        if (chunk.done) {
          return new Result(() => chunk.value);
        }

        return process(chunk.value);
      });
  }
}

exec(function* () {
  const a = yield new Result(() => 42);
  const b = yield new Result(() => 10);

  return a * b;
}).then(console.log);


exec(function* main() {
  const res1 = new Result(() => 42);
  console.log(yield res1);

  try {
    const res2 = yield new Result(() => { throw 'Boom!'; });

  } catch (err) {
    console.error(err);
  }
});