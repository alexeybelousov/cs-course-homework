class Vector {
  #capacity;
  #arrayType;
  #buffer;

  constructor(TypedArray, { capacity = 10 }) {
    this.#capacity = capacity;
    this.#arrayType = TypedArray;
    this.#buffer = new TypedArray(capacity);
    this.length = 0;
  }

  #arrayExtension(capacity) {
    while (this.#capacity < capacity) {
      this.#capacity *= 2;
    }

    const newBuffer = new this.#arrayType(this.#capacity);

    for (let i = 0; i < this.#buffer.length; i++) {
      newBuffer[i] = this.#buffer[i];
    }

    this.#buffer = newBuffer;
  }

  push() {
    if (arguments.length + this.length > this.#capacity) {
      this.#arrayExtension(arguments.length + this.length);
    }

    for (let i = 0; i < arguments.length; i++) {
      this.#buffer[this.length] = arguments[i];
      this.length++;
    }
    
    return this.length;
  }

  unshift() {
    if (arguments.length + this.length > this.#capacity) {
      this.#arrayExtension(arguments.length + this.length);
    }

    this.length += arguments.length;

    for (let i = this.length - 1; i >= 0; i--) {
      if (i - arguments.length >= 0) {
        this.#buffer[i] = this.#buffer[i - arguments.length];
      } else {
        this.#buffer[i] = arguments[i];
      }
    }

    return this.length;
  }

  pop() {
    if (this.length > 0) {
      const value = this.#buffer[this.length - 1];

      this.#buffer[this.length - 1] = undefined;
      this.length -= 1;

      return value;
    } else {
      return undefined;
    }
  }

  shift() {
    if (this.length > 0) {
      const value = this.#buffer[0];

      for (let i = 0; i < this.length - 1; i++) {
        this.#buffer[i] = this.#buffer[i + 1];
      }
      
      this.#buffer[this.length - 1] = undefined;
      this.length -= 1;

      return value;
    } else {
      return undefined;
    }
  }
}


const uint8Vector = new Vector(Uint8Array, { capacity: 5 });

uint8Vector.push(100);    // 1
uint8Vector.push(20, 10); // 3

uint8Vector.pop();        // 10
uint8Vector.shift();      // 100

uint8Vector.unshift(1);          // 2
console.log(uint8Vector.length); // 2