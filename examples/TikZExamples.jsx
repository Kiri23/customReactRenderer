const React = require("react");
const { LatexConfigProvider } = require("../contexts/LatexConfigContext");
const { ConditionalTikZ } = require("../components/TikZComponents");
const {
  TikZDiagram,
  TikZCircle,
  TikZRectangle,
  TikZLine,
  TikZArrow,
  TikZNode,
  TikZGrid,
  TikZAxis,
  TikZFlowchartNode,
  TikZFlowchartArrow
} = require("../components/TikZComponents");
const {
  Document,
  Section,
  Subsection,
  Paragraph,
  Bold
} = require("../components/LatexComponents");

// Simple geometric shapes example
const GeometricShapesExample = () => React.createElement(
  Section,
  { title: "Geometric Shapes" },
  React.createElement(
    Paragraph,
    null,
    "This section demonstrates basic TikZ geometric shapes."
  ),
  React.createElement(
    TikZDiagram,
    { width: "10cm", height: "8cm" },
    React.createElement(TikZGrid, { xmin: 0, ymin: 0, xmax: 6, ymax: 6, step: 1, options: "gray!30" }),
    React.createElement(TikZCircle, { x: 2, y: 2, radius: 1, options: "fill=blue!20, draw=blue" }),
    React.createElement(TikZRectangle, { x: 4, y: 4, width: 1.5, height: 1, options: "fill=red!20, draw=red" }),
    React.createElement(TikZLine, { from: [1, 1], to: [5, 5], options: "thick, green" }),
    React.createElement(TikZArrow, { from: [1, 5], to: [5, 1], options: "->, thick, purple" }),
    React.createElement(TikZNode, { x: 2, y: 3.5, text: "Circle", options: "above" }),
    React.createElement(TikZNode, { x: 4.75, y: 4.5, text: "Rectangle", options: "above" }),
    React.createElement(TikZNode, { x: 3, y: 3, text: "Line", options: "above" }),
    React.createElement(TikZNode, { x: 3, y: 3, text: "Arrow", options: "below" })
  )
);

// Flowchart example
const FlowchartExample = () => React.createElement(
  Section,
  { title: "Flowchart Example" },
  React.createElement(
    Paragraph,
    null,
    "This section shows a simple flowchart created with TikZ."
  ),
  React.createElement(
    TikZDiagram,
    { width: "12cm", height: "8cm" },
    React.createElement(TikZFlowchartNode, { x: 0, y: 0, text: "Start", shape: "circle", options: "fill=green!20" }),
    React.createElement(TikZFlowchartNode, { x: 0, y: -2, text: "Process", shape: "rectangle", options: "fill=blue!20" }),
    React.createElement(TikZFlowchartNode, { x: 0, y: -4, text: "Decision", shape: "diamond", options: "fill=yellow!20" }),
    React.createElement(TikZFlowchartNode, { x: 3, y: -4, text: "Yes", shape: "rectangle", options: "fill=green!20" }),
    React.createElement(TikZFlowchartNode, { x: -3, y: -4, text: "No", shape: "rectangle", options: "fill=red!20" }),
    React.createElement(TikZFlowchartNode, { x: 0, y: -6, text: "End", shape: "circle", options: "fill=red!20" }),
    React.createElement(TikZFlowchartArrow, { from: [0, -0.5], to: [0, -1.5], options: "->" }),
    React.createElement(TikZFlowchartArrow, { from: [0, -2.5], to: [0, -3.5], options: "->" }),
    React.createElement(TikZFlowchartArrow, { from: [0.5, -4], to: [2.5, -4], options: "->" }),
    React.createElement(TikZFlowchartArrow, { from: [-0.5, -4], to: [-2.5, -4], options: "->" }),
    React.createElement(TikZFlowchartArrow, { from: [0, -4.5], to: [0, -5.5], options: "->" })
  )
);

// Mathematical diagram example
const MathematicalDiagramExample = () => React.createElement(
  Section,
  { title: "Mathematical Diagram" },
  React.createElement(
    Paragraph,
    null,
    "This section demonstrates a mathematical diagram with axes and functions."
  ),
  React.createElement(
    TikZDiagram,
    { width: "10cm", height: "8cm" },
    React.createElement(TikZAxis, { xmin: -3, ymin: -3, xmax: 3, ymax: 3 }),
    React.createElement(TikZGrid, { xmin: -3, ymin: -3, xmax: 3, ymax: 3, step: 0.5, options: "gray!20" }),
    React.createElement(TikZLine, { from: [-2, 4], to: [-1.5, 2.25], options: "thick, blue" }),
    React.createElement(TikZLine, { from: [-1.5, 2.25], to: [-1, 1], options: "thick, blue" }),
    React.createElement(TikZLine, { from: [-1, 1], to: [-0.5, 0.25], options: "thick, blue" }),
    React.createElement(TikZLine, { from: [-0.5, 0.25], to: [0, 0], options: "thick, blue" }),
    React.createElement(TikZLine, { from: [0, 0], to: [0.5, 0.25], options: "thick, blue" }),
    React.createElement(TikZLine, { from: [0.5, 0.25], to: [1, 1], options: "thick, blue" }),
    React.createElement(TikZLine, { from: [1, 1], to: [1.5, 2.25], options: "thick, blue" }),
    React.createElement(TikZLine, { from: [1.5, 2.25], to: [2, 4], options: "thick, blue" }),
    React.createElement(TikZCircle, { x: 0, y: 0, radius: 0.05, options: "fill=red" }),
    React.createElement(TikZCircle, { x: 1, y: 1, radius: 0.05, options: "fill=red" }),
    React.createElement(TikZCircle, { x: -1, y: 1, radius: 0.05, options: "fill=red" }),
    React.createElement(TikZNode, { x: 2.5, y: 3.5, text: "$f(x) = x^2$", options: "blue" }),
    React.createElement(TikZNode, { x: 0.2, y: 0.2, text: "$(0,0)$", options: "red" }),
    React.createElement(TikZNode, { x: 1.2, y: 1.2, text: "$(1,1)$", options: "red" }),
    React.createElement(TikZNode, { x: -1.2, y: 1.2, text: "$(-1,1)$", options: "red" })
  )
);

// Circuit diagram example
const CircuitDiagramExample = () => React.createElement(
  Section,
  { title: "Simple Circuit Diagram" },
  React.createElement(
    Paragraph,
    null,
    "This section shows a simple electrical circuit diagram."
  ),
  React.createElement(
    TikZDiagram,
    { width: "10cm", height: "6cm" },
    React.createElement(TikZLine, { from: [0, 0], to: [0, 1], options: "thick" }),
    React.createElement(TikZLine, { from: [0.5, 0], to: [0.5, 1], options: "thick" }),
    React.createElement(TikZLine, { from: [0, 0.5], to: [0.5, 0.5], options: "thick" }),
    React.createElement(TikZLine, { from: [1, 0.5], to: [1.5, 0.5], options: "thick" }),
    React.createElement(TikZLine, { from: [1.5, 0.5], to: [1.5, 0.3], options: "thick" }),
    React.createElement(TikZLine, { from: [1.5, 0.3], to: [2, 0.3], options: "thick" }),
    React.createElement(TikZLine, { from: [2, 0.3], to: [2, 0.5], options: "thick" }),
    React.createElement(TikZLine, { from: [2, 0.5], to: [2.5, 0.5], options: "thick" }),
    React.createElement(TikZCircle, { x: 3, y: 0.5, radius: 0.3, options: "fill=yellow!20, draw=black" }),
    React.createElement(TikZLine, { from: [2.5, 0.5], to: [2.7, 0.5], options: "thick" }),
    React.createElement(TikZLine, { from: [3.3, 0.5], to: [3.5, 0.5], options: "thick" }),
    React.createElement(TikZLine, { from: [3.5, 0.5], to: [4, 0.5], options: "thick" }),
    React.createElement(TikZLine, { from: [4, 0.5], to: [4, 0], options: "thick" }),
    React.createElement(TikZLine, { from: [4, 0], to: [0, 0], options: "thick" }),
    React.createElement(TikZNode, { x: 0.25, y: 1.5, text: "Battery", options: "above" }),
    React.createElement(TikZNode, { x: 1.75, y: 1.5, text: "Resistor", options: "above" }),
    React.createElement(TikZNode, { x: 3, y: 1.5, text: "LED", options: "above" })
  )
);

// Main TikZ examples document
const TikZExamplesDocument = ({ initialConfig = {} }) => {
  const config = {
    showDiagrams: true,
    showMath: true,
    showTables: true,
    showLists: true,
    showExamples: true,
    showAbstract: true,
    showKeywords: true,
    showReferences: true,
    ...initialConfig
  };

  return React.createElement(
    LatexConfigProvider,
    { config },
    React.createElement(
      Document,
      null,
      React.createElement(
        Section,
        { title: "TikZ Diagrams Examples" },
        React.createElement(
          Paragraph,
          null,
          "This document demonstrates various TikZ diagrams that can be rendered in Overleaf. Each section shows different types of diagrams created using React components."
        )
      ),
      React.createElement(GeometricShapesExample),
      React.createElement(FlowchartExample),
      React.createElement(MathematicalDiagramExample),
      React.createElement(CircuitDiagramExample)
    )
  );
};

module.exports = TikZExamplesDocument; 