const getTotalRows = (circles) => {
  let rows = 1;

  for (let i = 0, indexInRow = 0; i < circles; i++) {
    indexInRow++;

    if (indexInRow % rows === 0) {
      if (i === circles - 1) {
        break;
      }

      rows++;
      indexInRow = 0;
    }
  }

  return rows;
}

const generateCoordinates = (vertexes) => {
  const totalRows = getTotalRows(vertexes);
  const offsetY = 600 / totalRows;

  let result = {};
  let circlesInRow = 1;


  for (let i = 0, indexInRow = 0; i < vertexes; i++) {
    indexInRow++;

    const offsetX = 600 / circlesInRow;
    const x = (offsetX / 2) + (offsetX * (indexInRow - 1));
    const y = (offsetY / 2) + (offsetY * (circlesInRow - 1));

    result[i] = [x, y];

    if (indexInRow % circlesInRow === 0) {
      circlesInRow++;
      indexInRow = 0;
    }
  }

  return result;
}

const COLOR = 'red';

class SvgRenderGraph {
  constructor(width, height, target) {
    this.#createContainer(width, height, target);
  }

  #createContainer(width, height, target) {
    const oldSvg = document.getElementById("svg");

    if (oldSvg) {
      oldSvg.remove();
    }

    const svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');

    svg.setAttribute("id", "svg");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

    const defs = `
    <defs id=""defs>
      <marker id="arrowhead-red" viewBox="0 0 10 10" refX="20" refY="5" markerWidth="6" markerHeight="6" orient="auto" fill="red">
        <path d="M 0 0 L 10 5 L 0 10 z"></path>
      </marker>
      <marker id="arrowhead-blue" viewBox="0 0 10 10" refX="34" refY="5" markerWidth="6" markerHeight="6" orient="auto" fill="blue">
        <path d="M 0 0 L 10 5 L 0 10 z"></path>
      </marker>
    </defs>`;

    svg.innerHTML = defs;

    this.svg = svg;

    target.appendChild(svg);
  }

  renderEdge(x1, y1, x2, y2, color = COLOR, width = '2') {
    const edge = document.createElementNS("http://www.w3.org/2000/svg", 'line');

    edge.setAttribute("x1", x1);
    edge.setAttribute("y1", y1);
    edge.setAttribute("x2", x2);
    edge.setAttribute("y2", y2);
    edge.setAttribute("stroke-width", width);
    edge.setAttribute("stroke", color);
    edge.setAttribute("marker-end", `url(#arrowhead-${color})`);

    const firstChild = this.svg.firstChild;

    this.svg.insertBefore(edge, firstChild);
  }

  renderVertex(x, y) {
    const vertex = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
  
    vertex.setAttribute("cx", x);
    vertex.setAttribute("cy", y);
    vertex.setAttribute("r", "15");
    vertex.setAttribute("fill", COLOR);
  
    this.svg.appendChild(vertex);
  }

  renderText(x, y, content) {
    const text = document.createElementNS("http://www.w3.org/2000/svg", 'text');
    const coorX = x - (`${content}`.length * 4);
  
    text.setAttribute("x", coorX);
    text.setAttribute("y", y + 4);
    text.setAttribute("fill", 'white');
    text.textContent = content;
  
    this.svg.appendChild(text);
  }
}