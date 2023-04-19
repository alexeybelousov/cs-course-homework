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
    const newItem = new QueueItem(value);
  
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

  unshift(value) {
    const newItem = new QueueItem(value);
    this.head = value;

    if (this.first) {
      newItem.next = this.first;
      this.first = newItem;

      return this;
    }
  
    this.first = this.last = newItem;

    return this;
  }

  shift() {
    if (!this.first) {
      throw new Error('Queue is empty');
    }
    const temp = this.first;

    this.head = this.first.next ? this.first.next.value : null;
    this.first = this.first.next;

    return temp.value;
  }

  pop() {
    if (!this.last || !this.first) {
      throw new Error('Queue is empty');
    }

    let current = this.first;
    let newTail = current;

    while (current.next) {
        newTail = current;
        current = current.next;
    }

    this.last = newTail
    this.last.next = null;

    if (!this.first.next) {
        this.first = null
        this.last = null
    }

    return current.value;
  }
}


const dequeue = new Queue();

dequeue.push(10);
dequeue.unshift(11);
dequeue.push(12);

console.log(dequeue.pop());   // 12 - удаляем последний
console.log(dequeue.shift()); // 11 - удаляем первый
console.log(dequeue.pop());   // 10 - удаляем последний
console.log(dequeue.pop());   // Exception