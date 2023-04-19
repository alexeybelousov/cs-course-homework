class QueueItem {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.head = null;
  }

  push(value) {
    const newItem = new QueueItem(value, this.last);
  
    if (!this.first || !this.last) {
      this.first = newItem;
      this.last = newItem;
      this.head = value;
  
      return this;
    }
  
    this.last.next = newItem;
    this.last = newItem;
  
    return this;
  }

  pop() {
    if (!this.first) {
      throw new Error('Queue is empty');
    }
    const temp = this.first;

    this.head = this.first.next ? this.first.next.value : null;
    this.first = this.first.next;

    return temp.value;
  }
}

const queue = new Queue();

queue.push(10);
queue.push(11);
queue.push(12);

console.log(queue.head);  // 10

console.log(queue.pop()); // 10

console.log(queue.head);  // 11

console.log(queue.pop()); // 11
console.log(queue.pop()); // 12
console.log(queue.pop()); // Exception