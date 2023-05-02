class Vertex {
  constructor(value) {
    this.value = value;
    this.adjacents = [];
  }

  getAdjacents() {
    return this.adjacents;
  }

  addAdjacent(node) {
    this.adjacents.push(node);
  }
}

class Graph {
  constructor() {
    this.nodes = new Map();
  }
  
  addEdge(start, end) {
    const startNode = this.addVertex(start);
    const endNode = this.addVertex(end);
  
    startNode.addAdjacent(endNode);
    
    return [startNode, endNode];
  }

  addVertex(value) {
    if(this.nodes.has(value)) {
      return this.nodes.get(value);
    } else {
      const vertex = new Vertex(value);

      this.nodes.set(value, vertex);

      return vertex;
    }
  }

  #mapToValueArray(map) {
    let nodes = Array.from(map);

    return nodes.map(node => node.value);
  }

  depthTraverse(first) {
    const visited = new Set();

    const traverse = (node) => {
      visited.add(node);

      const neighbors = node.getAdjacents();

      for (let neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          traverse(neighbor);
        }
      }
    };

    traverse(first);

    return this.#mapToValueArray(visited);
  }
  
  breadthTraverse(first) {
    const visited = new Set();
    const queue = [];

    queue.push(first);

    while(queue.length > 0) {
      const node = queue.shift();

      if(node && !visited.has(node)) {
        visited.add(node);
        node.getAdjacents().forEach(neighbor => queue.push(neighbor));
      }
    }

    return this.#mapToValueArray(visited);
  }

  fillByMatrix(matrix, totalVertex) {
    for (let i = 0; i < totalVertex; i++) {    
      for (let j = 0; j < totalVertex; j++) {    
        if (matrix.get(i, j)) {
          this.addEdge(i, j);
        }
      }
    }
  }

  findPath(first, end) {
    const visited = new Set();
    const queue = [];

    queue.push(first);

    while(queue.length > 0) {
      const node = queue.shift();

      if(node && !visited.has(node)) {
        if (end.value === node.value) {
          return true;
        }

        visited.add(node);

        node.getAdjacents().forEach(neighbor => queue.push(neighbor));
      }
    }

    return false;
  }
}