let tree;

const renderTraverse = (node, x, y, prevX, prevY, svgTree, level, xMiddle) => {
  if (node) {
    svgTree.renderVertex(x, y);
    svgTree.renderText(x, y, node.value);

    if (x !== prevX) {
      svgTree.renderEdge(prevX, prevY, x, y);
    }

    const countInRow = 2 ** level;
    const countInMiddleRows = countInRow / 2;
    const space = xMiddle / countInMiddleRows / 2;

    renderTraverse(node.left, x - space, y + 60, x, y, svgTree, level + 1, xMiddle);
    renderTraverse(node.right, x + space, y + 60, x, y, svgTree, level + 1, xMiddle);
  }
}

const renderBinaryTree = (tree) => {
  const target = document.getElementById("target");
  const svgTree = new SvgRenderGraph(800, 600, target);

  renderTraverse(tree.root, 400, 100, 400, 100, svgTree, 1, 400);
}

const renderClear = () => {
  tree.clear();

  renderBinaryTree(tree);
}

const renderAddValue = () => {
  const value = parseInt(document.getElementById("add-value").value);

  tree.add(value);

  renderBinaryTree(tree);
}

const renderRemoveValue = () => {
  const value = parseInt(document.getElementById("remove-value").value);

  tree.remove(value);

  renderBinaryTree(tree);
}

window.onload = () => {
  tree = new BinaryTree();

  for (let i = 0; i < 20; i++) {
    const value = Math.ceil(Math.random() * 100);

    tree.add(value);

    renderBinaryTree(tree);
  }
};