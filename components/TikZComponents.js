const React = require("react");
const { useLatexConfig } = require("../contexts/LatexConfigContext");

// Basic TikZ shapes
const TikZCircle = ({ x = 0, y = 0, radius = 1, options = "", ...props }) =>
  React.createElement("tikzcircle", { x, y, radius, options, ...props });

const TikZRectangle = ({
  x = 0,
  y = 0,
  width = 1,
  height = 1,
  options = "",
  ...props
}) =>
  React.createElement("tikzrectangle", {
    x,
    y,
    width,
    height,
    options,
    ...props,
  });

const TikZLine = ({ from = [0, 0], to = [1, 1], options = "", ...props }) =>
  React.createElement("tikzline", { from, to, options, ...props });

const TikZArrow = ({ from = [0, 0], to = [1, 1], options = "->", ...props }) =>
  React.createElement("tikzarrow", { from, to, options, ...props });

const TikZNode = ({ x = 0, y = 0, text = "", options = "", ...props }) =>
  React.createElement("tikznode", { x, y, text, options, ...props });

const TikZGrid = ({
  xmin = 0,
  ymin = 0,
  xmax = 1,
  ymax = 1,
  step = 1,
  options = "",
  ...props
}) =>
  React.createElement("tikzgrid", {
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
  React.createElement("tikzaxis", {
    xmin,
    ymin,
    xmax,
    ymax,
    options,
    ...props,
  });

// Complex TikZ diagrams
const TikZFlowchart = ({ children, ...props }) =>
  React.createElement("tikzflowchart", props, children);

const TikZFlowchartNode = ({
  x = 0,
  y = 0,
  text = "",
  shape = "rectangle",
  options = "",
  ...props
}) =>
  React.createElement("tikzflowchartnode", {
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
  React.createElement("tikzflowchartarrow", { from, to, options, ...props });

// TikZ Diagram container
const TikZDiagram = ({ children, width = "8cm", height = "6cm", ...props }) =>
  React.createElement("tikzdiagram", { width, height, ...props }, children);

// Conditional TikZ components
const ConditionalTikZ = ({ children, ...props }) => {
  const { isVisible } = useLatexConfig();
  if (!isVisible("showDiagrams")) {
    return null;
  }
  return <TikZDiagram {...props}>{children}</TikZDiagram>;
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
