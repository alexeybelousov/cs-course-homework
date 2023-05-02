class Matrix2D {
  constructor(rows, cols, array) {
    this.rows = rows;
    this.cols = cols;
    this.buffer = array && array.length && array.length === rows * cols
      ? array
      : new Array(rows * cols);
  }

  #getIndex(row, col) {
    return row * this.cols + col;
  }

  set(row, col, value) {
    this.buffer[this.#getIndex(row, col)] = value;
  }

  get(row, col) {
    return this.buffer[this.#getIndex(row, col)];
  }
}