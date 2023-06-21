class Result {
  #data;
  #state;
  #error = null;

  constructor(fn) {
    try {
      const data = fn();

      if (data instanceof Result) {
        data
          .then((data) => {
            this.#state = 'ok';
            this.#data = data;
          })
          .catch((e) => {
            this.#state = 'err';
            this.#error = e;
          });
      } else {
        this.#state = 'ok';
        this.#data = data;
      }

    } catch (e) {
      this.#state = 'err';
      this.#error = e;
    }
  }

  then(cb) {
    if (this.#state === 'ok') {
      return new Result(() => cb(this.#data));
    }

    return this;
  }

  catch(cb) {
    if (this.#state === 'err') {
      return new Result(() => cb(this.#error));
    }

    return this;
  }
}

module.exports = Result;