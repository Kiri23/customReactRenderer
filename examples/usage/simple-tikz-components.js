const React = require("react");

// Importar la función latex desde simple-latex-components
const { latex } = require("./simple-latex-components");

// Basic TikZ shapes using tagged templates
const TikZCircle = latex`\\draw${(props) =>
  props.options && props.options.trim() ? `[${props.options}]` : ""} (${(
  props,
) => props.x},${(props) => props.y}) circle (${(props) => props.radius}cm);
`;

const TikZRectangle = latex`\\draw${(props) =>
  props.options && props.options.trim() ? `[${props.options}]` : ""} (${(
  props,
) => props.x},${(props) => props.y}) rectangle (${(props) =>
  props.x + props.width},${(props) => props.y + props.height});
`;

const TikZLine = latex`\\draw${(props) =>
  props.options && props.options.trim() ? `[${props.options}]` : ""} (${(
  props,
) => props.from[0]},${(props) => props.from[1]}) -- (${(props) =>
  props.to[0]},${(props) => props.to[1]});
`;

const TikZArrow = latex`\\draw${(props) =>
  props.options && props.options.trim() ? `[${props.options}]` : ""} (${(
  props,
) => props.from[0]},${(props) => props.from[1]}) -- (${(props) =>
  props.to[0]},${(props) => props.to[1]});
`;

const TikZNode = latex`\\node${(props) =>
  props.options && props.options.trim() ? `[${props.options}]` : ""} at (${(
  props,
) => props.x},${(props) => props.y}) {${(props) => props.text}};
`;

const TikZGrid = latex`\\draw${(props) =>
  props.options && props.options.trim() ? `[${props.options}]` : ""}[step=${(
  props,
) => props.step}cm] (${(props) => props.xmin},${(props) =>
  props.ymin}) grid (${(props) => props.xmax},${(props) => props.ymax});
`;

const TikZAxis = latex`\\draw${(props) =>
  props.options && props.options.trim() ? `[${props.options}]` : ""} [->] (${(
  props,
) => props.xmin},0) -- (${(props) => props.xmax},0) node[right] {$x$};
\\draw${(props) =>
  props.options && props.options.trim() ? `[${props.options}]` : ""} [->] (0,${(
  props,
) => props.ymin}) -- (0,${(props) => props.ymax}) node[above] {$y$};
`;

// TikZ Diagram container
const TikZDiagram = latex`
\\begin{figure}[h]
\\centering
\\begin{tikzpicture}[scale=1]
${(props) => props.children}
\\end{tikzpicture}
\\end{figure}

`;

module.exports = {
  TikZCircle,
  TikZRectangle,
  TikZLine,
  TikZArrow,
  TikZNode,
  TikZGrid,
  TikZAxis,
  TikZDiagram,
};
