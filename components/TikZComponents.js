const React = require("react");
const { useLatexConfig } = require("../contexts/LatexConfigContext");

// Basic TikZ shapes
const TikZCircle = ({ x = 0, y = 0, radius = 1, options = "", ...props }) =>
  React.createElement("TikZCircle", { x, y, radius, options, ...props });

const TikZRectangle = ({
  x = 0,
  y = 0,
  width = 1,
  height = 1,
  options = "",
  ...props
}) =>
  React.createElement("TikZRectangle", {
    x,
    y,
    width,
    height,
    options,
    ...props,
  });

const TikZLine = ({ from = [0, 0], to = [1, 1], options = "", ...props }) =>
  React.createElement("TikZLine", { from, to, options, ...props });

const TikZArrow = ({ from = [0, 0], to = [1, 1], options = "->", ...props }) =>
  React.createElement("TikZArrow", { from, to, options, ...props });

const TikZNode = ({ x = 0, y = 0, text = "", options = "", ...props }) =>
  React.createElement("TikZNode", { x, y, text, options, ...props });

const TikZGrid = ({
  xmin = 0,
  ymin = 0,
  xmax = 1,
  ymax = 1,
  step = 1,
  options = "",
  ...props
}) =>
  React.createElement("TikZGrid", {
    xmin,
    ymin,
    xmax,
    ymax,
    step,
    options,
    ...props,
  });

const TikZAxis = ({
  xmin = 0,
  ymin = 0,
  xmax = 1,
  ymax = 1,
  options = "",
  ...props
}) =>
  React.createElement("TikZAxis", {
    xmin,
    ymin,
    xmax,
    ymax,
    options,
    ...props,
  });

// Complex TikZ diagrams
const TikZFlowchart = ({ children, ...props }) =>
  React.createElement("TikZFlowchart", props, children);

const TikZFlowchartNode = ({
  x = 0,
  y = 0,
  text = "",
  shape = "rectangle",
  options = "",
  ...props
}) =>
  React.createElement("TikZFlowchartNode", {
    x,
    y,
    text,
    shape,
    options,
    ...props,
  });

const TikZFlowchartArrow = ({
  from = [0, 0],
  to = [1, 1],
  options = "->",
  ...props
}) =>
  React.createElement("TikZFlowchartArrow", { from, to, options, ...props });

// TikZ Diagram container
const TikZDiagram = ({ children, width = "8cm", height = "6cm", ...props }) =>
  React.createElement("TikZDiagram", { width, height, ...props }, children);

// Conditional TikZ components
const ConditionalTikZ = ({ children, ...props }) => {
  const { isVisible } = useLatexConfig();
  if (!isVisible("showDiagrams")) {
    return null;
  }
  return React.createElement("TikZDiagram", { ...props }, children);
};

module.exports = {
  // Basic shapes
  TikZCircle,
  TikZRectangle,
  TikZLine,
  TikZArrow,
  TikZNode,
  TikZGrid,
  TikZAxis,

  // Complex diagrams
  TikZFlowchart,
  TikZFlowchartNode,
  TikZFlowchartArrow,

  // Containers
  TikZDiagram,
  ConditionalTikZ,
};
