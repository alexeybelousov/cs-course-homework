class Stack {
  constructor(TypedArray, length) {
    this.stack = new TypedArray(length);
    this.size = 0;
    this.head = null;
  }

  push(value) {
    this.head = value;
    this.stack[this.size] = value;
    this.size += 1;
  }

  pop() {
    if (this.size === 0) {
      throw new Error('Stack is empty');
    }

    this.size = this.size - 1;
    const value = this.stack[this.size];
    this.stack[this.size] = 0;

    this.head = this.stack[this.size - 1];

    return value;
  }
};

const stack = new Stack(Int32Array, 10);

stack.push(10);
stack.push(11);
stack.push(12);

console.log(stack.head);  // 12

console.log(stack.pop()); // 12

console.log(stack.head);  // 11

console.log(stack.pop()); // 11
console.log(stack.pop()); // 10
console.log(stack.pop()); // Exception