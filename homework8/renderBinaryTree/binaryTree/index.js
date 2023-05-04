class BinaryNode {
  constructor(value, { parent, left, right } = {}) {
    this.value = value;
    this.parent = parent ?? null;
    this.left = left ?? null;
    this.right = right ?? null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  min() {
    let min = this.root.value;

    const findMin = (node) => {
      if (node === null) {
        return null;
      }

      if (node.value < min) {
        min = node.value;
      }

      return findMin(node.left);
    }

    findMin(this.root);

    return min;
  }

  max() {
    let max = this.root.value;

    const findMax = (node) => {
      if (node === null) {
        return null;
      }

      if (node.value > max) {
        max = node.value;
      }

      return findMax(node.right);
    }

    findMax(this.root);

    return max;
  }

  find(value) {
    const findNode = (node) => {
      if (node === null) {
        return null;
      }

      if (value === node.value) {
        return node;
      }

      if (value < node.value) {
        return findNode(node.left);
      }

      return findNode(node.right);
    }

    return findNode(this.root);
  }

  add(value) {
    if (!value) {
      return;
    }

    const newNode = new BinaryNode(value);

    const findPosition = (node, newNode) => {
      if (node.value > newNode.value) {
        if (node.left === null) {
          node.left = newNode;
        } else {
          findPosition(node.left, newNode);
        }
      }

      if (node.value < newNode.value ) {
        if (node.right === null) {
          node.right = newNode;
        } else {
          findPosition(node.right, newNode);
        }
      }
    }

    if (!this.root) {
      this.root = newNode;
    } else {
      return findPosition(this.root, newNode);
    }
  }

  findLeftMinNode(node) {
    if (node.left) {
      return this.findLeftMinNode(node.left);
    } else {
      return node;
    }
  }

  remove(val) {
    const findPosition = (node, value) => {
      if (!node) {
        return null;
      } else if (node.value > value) {
        node.left = findPosition(node.left, value);

        return node;
      } else if (node.value < value) {
        node.right = findPosition(node.right, value);

        return node;
      } else {
        if (!node.left && !node.right) {
          node = null;

          return node;
        } else if (!node.left) {
          node = node.right;

          return node;
        } else if (!node.right) {
          node = node.left;

          return node;
        } else {
          const minNode = this.findLeftMinNode(node.right);
          node.value = minNode.value;
  
          node.right = findPosition(node.right, minNode.value);

          return node;
        }
      }
    }

    return findPosition(this.root, val);
  }

  directTraverse() {
    const visited = [];
    let levels = 0;

    const innerTraverse = (node, lev) => {
      if (node) {
        visited.push(node.value);
  
        innerTraverse(node.left, lev + 1);
        innerTraverse(node.right, lev + 1);
      } else {
        if (levels < lev) {
          levels = lev;
        }
      }
    }

    innerTraverse(this.root, 0);

    return [visited, levels];
  }

  clear() {
    this.root = null;
  }
}

// const tree = new BinaryTree(10, {
//   left: new BinaryNode(7, {
//     left: new BinaryNode(3),
//     right: new BinaryNode(8),
//   }),
//   right: new BinaryNode(15, {
//     left: new BinaryNode(13),
//     right: new BinaryNode(18),
//   }),
// });

// console.log('min - ', tree.min());
// console.log('max - ', tree.max());
// tree.add(16);
// tree.add(22);
// console.log('find(22) - ', tree.find(22));
// tree.add(2);
// console.log('min - ', tree.min());
// console.log('max - ', tree.max());

// tree.directTraverse(tree.root, console.log);
