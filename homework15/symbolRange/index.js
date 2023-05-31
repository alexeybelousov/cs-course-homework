class Range {
  constructor(start, end) {
    this.kind = typeof start === 'number' && typeof end === 'number' ? 'number' : 'symbol';

    if (this.kind === 'number') {
      this.start = start;
      this.end = end;
    } else {
      this.start = start.charCodeAt(0);
      this.end = end.charCodeAt(0);
    }
  }

  reverse() {
    return {
      [Symbol.iterator]() {
        return this;
      },
      next: () => {
        if (this.end < this.start) {
          return {
            value: undefined,
            done: true,
          };
        }

        const res = {
          value: this.kind === 'number' ? this.end : String.fromCharCode(this.end),
          done: false,
        };
  
        this.end--;
  
        return res;
      }
    };
  }

  [Symbol.iterator]() {
    return {
      [Symbol.iterator]() {
        return this;
      },
      next: () => {
        if (this.start > this.end) {
          return {
            value: undefined,
            done: true,
          };
        }

        const res = {
          value: this.kind === 'number' ? this.start : String.fromCharCode(this.start),
          done: false,
        };
  
        this.start++;
  
        return res;
      }
    };
  }
}


const symbolRange = new Range('a', 'f');

console.log(Array.from(symbolRange)); // ['a', 'b', 'c', 'd', 'e', 'f']

const numberRange = new Range(-5, 1);

console.log(Array.from(numberRange.reverse())); // [1, 0, -1, -2, -3, -4, -5]