class TreeNodeDeep {
  constructor(value, siblings) {
    this.value = value;
    this.siblings = siblings;
  }

  traverse(cb) {
    cb(this.value);

    if (this.siblings) {
      this.siblings.forEach((node) => {
        node.traverse(cb);
      });
    }
  }
}

const tree = new TreeNodeDeep(1, [
  new TreeNodeDeep(2, [new TreeNodeDeep(3)]),
  new TreeNodeDeep(4, [new TreeNodeDeep(5)]),
]);

// tree.traverse(console.log);



class TreeNodeWidth {
  constructor(value, siblings) {
    this.value = value;
    this.siblings = siblings;
  }

  traverse(cb) {
    const queue = [this];

    while(queue.length > 0) {
      const head = queue.shift();

      cb(head.value);

      if (head.siblings) {
        head.siblings.forEach((node) => {
          queue.push(node);
        });
      }
    }
  }
}

const tree2 = new TreeNodeWidth(1, [
  new TreeNodeWidth(2, [new TreeNodeWidth(3)]),
  new TreeNodeWidth(4, [new TreeNodeWidth(5)]),
]);

// tree2.traverse(console.log);


class TreeNodeSort {
  constructor(value, siblings) {
    this.value = value;
    this.siblings = siblings;
  }

  traverse(cb) {
    const queue = new Set();

    const innerTraverse = (node, siblings = []) => {
      if (queue.has(node)) {
        return;
      }
        
      if (node.siblings) {
        node.siblings.forEach((child, i) => {
          innerTraverse(child, node.siblings.slice(i + 1));
        });
      }

      siblings.forEach((node) => {
        innerTraverse(node);
      });

      queue.add(node.value);
    }

    innerTraverse(this);

    queue.forEach((el) => cb(el))
  }
}

const tree3 = new TreeNodeSort(1, [
  new TreeNodeSort(2, [new TreeNodeSort(3)]),
  new TreeNodeSort(4, [new TreeNodeSort(5, [new TreeNodeSort(6)])]),
]);

tree3.traverse(console.log);
