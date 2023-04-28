const getHash = (key) => {
  if (typeof key === 'string' || typeof key === 'number') {

    let hash = 0;

    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i) * 10 ** i;
    }

    return hash;
  }
  
  if (typeof key === 'object') {
    return getHash(JSON.stringify(key));
  }
}

class HashMap {
  #capacity;
  #hashFunction;
  #buffer;

  constructor(hashFunction, capacity) {
    this.#capacity = capacity;
    this.#hashFunction = hashFunction;
    this.#buffer = new Array(this.#capacity).fill(null);
    this.length = 0;
  }

  #getIndex(key) {
    return this.#hashFunction(key) % this.#capacity;
  }

  #probing(index, buffer) {
    while (buffer[index]) {
      index++;
    }

    return index;
  }

  #findIndexByKey(index, key) {
    for (let i = index; i < this.#capacity; i++) {
      const item = this.#buffer[i];
      
      if (!item) return -1;
      
      if (item.key === key) {
        return i;
      }
    }
  }

  #bufferExtension(capacity) {
    const newBuffer = new Array(capacity).fill(null);

    for (let i = 0; i < this.#buffer.length; i++) {
      const item = this.#buffer[i];

      if (item) {
        const index = this.#hashFunction(item.key) % capacity;
        let newItem = newBuffer[index];
      
        if (!newItem) {
          newItem = item;
        }
    
        const newIndex = this.#probing(index, newBuffer);
    
        newBuffer[newIndex] = item;
      }
    }

    this.#buffer = newBuffer;
    this.#capacity = capacity;
  }

  set(key, value) {
    if ( (this.length + 1) / this.#capacity > 0.75) {
      this.#bufferExtension(this.#capacity * 2);
    }    

    const index = this.#getIndex(key);
    const item = this.#buffer[index];

    this.length++;

    if (!item) {
      return this.#buffer[index] = { key, value };
    }

    const newIndex = this.#probing(index, this.#buffer);

    this.#buffer[newIndex] = { key, value };
  }

  get(key) {
    const index = this.#getIndex(key);

    if (!this.#buffer[index]) {
      return null;
    }

    const itemIndex = this.#findIndexByKey(index, key);

    return itemIndex > -1 ? this.#buffer[itemIndex].value : null;
  }

  has(key) {
    return !!this.get(key);
  }

  delete(key) {
    const index = this.#getIndex(key);

    if (!this.#buffer[index]) {
      return null;
    }

    const itemIndex = this.#findIndexByKey(index, key);
    let value = null;

    if (itemIndex > -1) {
      value = this.#buffer[itemIndex].value;
      this.#buffer[itemIndex] = null;
      this.length--;
    }

    return value;
  }
}

const map = new HashMap(getHash, 10);

map.set('foo', 1);
console.log(map.get('foo')); // 1

map.set(43, 22);
console.log(map.get(43));    // 22

map.set('523', 23);
console.log(map.get('523'));    // 23

map.set("{ a: 556, b: '88' }", 100);
console.log(map.get("{ a: 556, b: '88' }"));    // 100
console.log(map.has("{ a: 556, b: '88' }"));    // true
console.log(map.delete("{ a: 556, b: '88' }")); // 24
console.log(map.has("{ a: 556, b: '88' }"));    // false
console.log(map.delete("{ a: 556, b: '88' }")); // null

console.log(map.get(44));    // null

map.set(464, 2);
map.set('467', 4);
map.set('65', 26);
map.set(429, 6);
map.set(4296, 67); // extension buffer

console.log(map.get(43));    // 22
console.log(map.get('523')); // 23