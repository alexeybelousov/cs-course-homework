class HashMap {
  constructor(size) {
    this.size = 0;
    this.current = null;
  }

  hash(key) {
    return (typeof key) + ' ' + (key instanceof Object ?
      (key.__hash || (key.__hash = ++arguments.callee.current)) :
      key.toString());
  }

  has(key) {
    const hash = this.hash(key);

    return this[hash] !== undefined;
  }

  get(key) {
    const { value } = this[this.hash(key)];
    return value || undefined;
  }

  set(key, value) {
    const hash = this.hash(key);

    console.log(hash);

    if(this[hash] === undefined) {
        const item = { key, value };
        this[hash] = item;

        this.link(item);
        ++this.size;
    } else {
      this[hash].value = value;
    }
  }

  delete(key) {
    const hash = this.hash(key);
    const item = this[hash];

    if (item !== undefined) {
        --this.size;
        this.unlink(item);

        delete this[hash];
    }

    return this;
  }

  link(item) {
    if (this.size === 0) {
      item.prev = item;
      item.next = item;
      this.current = item;
    } else {
      item.prev = this.current.prev;
      item.prev.next = item;
      item.next = this.current;
      this.current.prev = item;
    }
  }

  unlink(item) {
    if (this.size === 0) {
        this.current = undefined;
    } else {
      item.prev.next = item.next;
      item.next.prev = item.prev;
      
      if (item === this.current) {
        this.current = item.next;
      }
    }
  }

  next() {
    this.current = this.current.next;
  }

  key() {
    return this.current.key;
  }

  value() {
    return this.current.value;
  }
}

const map = new HashMap(120);

map.set('foo', 1);
map.set(42, 10);
map.set('42', 16);
map.set('42', 22);
// map.set({}, 22);
// map.set(document, 100);

console.log(map.get(42));          // 10
console.log(map.has('foo'));       // true
// console.log(map.has(document));    // true
console.log(map.delete('foo')); // 1
// console.log(map.delete(document)); // 10
// console.log(map.has(document));    // false

for (let i = 0; i++ < map.size; map.next()) {
  console.log(map.hash(map.key()) + ': ' + map.value());
}