class Matrix3D {
  constructor({ x, y, z }) {
    this.cols = y;
    this.buffer = new Array(x * y * z);
  }

  get({ x, y, z }) {
    return this.buffer[this.getIndex(x, y, z)];
  }

  set({ x, y, z }, value) {
    this.buffer[this.getIndex(x, y, z)] = value;
  }

  getIndex(x, y, z) {
    return x * this.cols + z * this.cols + y;
  }
}

const matrix = new Matrix3D({x: 10, y: 10, z: 10});

matrix.set({x: 1, y: 3, z: 2}, 10);
matrix.set({x: 0, y: 6, z: 2}, 16);
matrix.set({x: 9, y: 8, z: 5}, 22);

console.log(matrix.get({x: 1, y: 3, z: 2})); // 10
console.log(matrix.get({x: 0, y: 6, z: 2})); // 16
console.log(matrix.get({x: 9, y: 8, z: 5})); // 22