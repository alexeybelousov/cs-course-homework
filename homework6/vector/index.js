class Vector {
  constructor(TypedArray) {
    this.buffer = new TypedArray(10);
    this.length = this.buffer.length;
    this.size = 0;
  }

  push(value) {
    console.log(arguments.length);

    this.buffer[this.size] = value;
    this.size++;
    
    return this.size;
  }
}


const uint8Vector = new Vector(Uint8Array, {capacity: 100});

console.log(uint8Vector.push(100));    // 1
console.log(uint8Vector.push(20, 10)); // 3

// uint8Vector.pop();        // 10
// uint8Vector.shift();      // 100

// uint8Vector.unshift(1);          // 2
console.log(uint8Vector.length); // 2