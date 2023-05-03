class BinaryNode {
  constructor(value, { parent, left, right } = {}) {
    this.value = value;
    this.parent = parent ?? null;
    this.left = left ?? null;
    this.right = right ?? null;
  }
}

class BinaryTree {
  constructor(value, { left, right } = {}) {
    this.root = new BinaryNode(value, { left, right });
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
}

const tree = new BinaryTree(10, {
  left: new BinaryNode(7, {
    left: new BinaryNode(3),
    right: new BinaryNode(8),
  }),
  right: new BinaryNode(15, {
    left: new BinaryNode(13),
    right: new BinaryNode(18),
  }),
});

console.log(tree.find(150));
console.log(tree.min());
console.log(tree.max());