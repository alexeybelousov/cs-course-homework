const createTransitiveClosureMatrix = (matrix) => {
  for (let k = 0; k < matrix.rows; k++) {
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.rows; j++) {
        const currentValue = matrix.get(i, j);
        const pathThroughK = matrix.get(i, k) && matrix.get(k, j);

        matrix.set(i, j, currentValue || pathThroughK);
      }
    }
  }

  return matrix;
}

const createMatrix = (data) => {
  const array = data.replace(/\n/g, ' ').trim().split(' ').map((d) => parseInt(d));
  const totalCircles = Math.sqrt(array.length);

  return new Matrix2D(totalCircles, totalCircles, array); 
}

const createPathByType = (matrix, type, start = 0) => {
  const graph = new Graph();

  graph.fillByMatrix(matrix, matrix.rows);

  const startNode = graph.nodes.get(start);
  
  return [graph, graph[type](startNode)];
}

const renderGraph = (graph, path, delay = 200, edgeColor) => {
  const target = document.getElementById("target");
  const svgGraph = new svgRenderGraph(600, 600, target);
  const coordinates = generateCoordinates(graph.nodes.size);

  for (let i = 0; i < path.length; i++) {
    const [x, y] = coordinates[path[i]];

    svgGraph.renderVertex(x, y);
    svgGraph.renderText(x, y, path[i] + 1);
  }

  (async function() {
    for (let i = 0; i < path.length; i++) {
      const adjacents = graph.nodes.get(path[i]).getAdjacents();

      for (let j = 0; j < adjacents.length; j++) {
        const [x1, y1] = coordinates[path[i]];
        const [x2, y2] = coordinates[adjacents[j].value];
    
        await new Promise(resolve => setTimeout(resolve, delay));

        svgGraph.renderEdge(x1, y1, x2, y2, edgeColor);
      }
    }
  })();

  return [svgGraph, coordinates];
}

const setDefaultData = () => {
const data = `0 0 1 0 1 0 0 0 0 0
1 0 0 1 0 0 0 0 0 0
0 0 0 0 0 1 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 1 1
0 0 0 1 0 0 0 0 0 0
0 0 0 0 0 0 0 0 1 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0`;

  document.getElementById("textareabox").value = data;
}

const printGraph = () => {
  const data = document.getElementById("textareabox").value;
  const matrix = createMatrix(data);
  const graph = new Graph();

  graph.fillByMatrix(matrix, matrix.rows);

  const path = [...graph.nodes.values()].map((node) => node.value)
  
  renderGraph(graph, path);
}

const renderDepth = () => {
  const data = document.getElementById("textareabox").value;
  const matrix = createMatrix(data);
  const [graph, path] = createPathByType(matrix, 'depthTraverse');

  renderGraph(graph, path);
}

const renderBreadth = () => {
  const data = document.getElementById("textareabox").value;
  const matrix = createMatrix(data);
  const [graph, path] = createPathByType(matrix, 'breadthTraverse');

  renderGraph(graph, path);
}

const renderTransitiveClosure = async () => {
  const data = document.getElementById("textareabox").value;
  const matrix = createMatrix(data);
  const transitiveMatrix = createTransitiveClosureMatrix(createMatrix(data));

  const [graph, path] = createPathByType(matrix, 'depthTraverse');
  const [svgGraph, coordinates] = renderGraph(graph, path);

  await new Promise(resolve => setTimeout(resolve, 200 * (path.length)));

  graph.fillByMatrix(transitiveMatrix, transitiveMatrix.rows);

  const transitivePath = graph.depthTraverse(graph.nodes.get(0));

  (async function() {
    for (let i = 0; i < transitivePath.length; i++) {
      const adjacents = graph.nodes.get(transitivePath[i]).getAdjacents();

      for (let j = 0; j < adjacents.length; j++) {
        const [x1, y1] = coordinates[transitivePath[i]];
        const [x2, y2] = coordinates[adjacents[j].value];
    
        await new Promise(resolve => setTimeout(resolve, 100));

        svgGraph.renderEdge(x1, y1, x2, y2, 'blue', '1');
      }
    }
  })();
}

const renderFindPath = async () => {
  const dataToSearch = document.getElementById("find").value;
  const [start, end] = dataToSearch.split(' ').map((d) => parseInt(d));

  const data = document.getElementById("textareabox").value;
  const matrix = createMatrix(data);

  const [graph, path] = createPathByType(matrix, 'breadthTraverse', start - 1);
  const [svgGraph, coordinates] = renderGraph(graph, path, 0);

  const startNode = graph.nodes.get(start - 1);
  const endNode = graph.nodes.get(end - 1);

  if (startNode && endNode) {
    await new Promise(resolve => setTimeout(resolve, 500));

    const transitivePath = graph.findPath(graph.nodes.get(start - 1), graph.nodes.get(end - 1));
    
    if (transitivePath) {
      const [x1, y1] = coordinates[start - 1];
      const [x2, y2] = coordinates[end - 1];

      svgGraph.renderEdge(x1, y1, x2, y2, 'blue', '1');
    } else {
      alert('Path has been not found');
    }
  }
}

const sortGraph = async () => {
  const data = document.getElementById("textareabox").value;
  const matrix = createMatrix(data);
  const graph = new Graph();

  graph.fillByMatrix(matrix, matrix.rows);

  const path = graph.topologicalSorting();

  renderGraph(graph, path);

  await new Promise(resolve => setTimeout(resolve, 200 * (path.length)));
}

window.onload = setDefaultData;