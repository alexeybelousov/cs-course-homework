class LinkedListItem {
  constructor(value, prev) {
    this.value = value;
    this.prev = prev;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.first = null;
    this.last = null;
  }

  add(value) {
    const newItem = new LinkedListItem(value, this.last);
  
    if (!this.first || !this.last) {
      this.first = newItem;
      this.last = newItem;
  
      return this;
    }
  
    this.last.next = newItem;
    this.last = newItem;
  
    return this;
  }

  *[Symbol.iterator]() {
    for (var current = this.first; current !== null; current = current.next) {
      yield current.value;
    }
  }
}

const list = new LinkedList();

list.add(1);
list.add(2);
list.add(3);

console.log(list.first.value);           // 1
console.log(list.last.value);            // 3
console.log(list.first.next.value);      // 2
console.log(list.first.next.prev.value); // 1
console.log(list.last.prev.value);       // 2

for (const value of list) {
  console.log(value);
}