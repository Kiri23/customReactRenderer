const React = require("react");
const { useLatexConfig } = require("../contexts/LatexConfigContext");

// Basic TikZ shapes
const TikZCircle = ({ x = 0, y = 0, radius = 1, options = "", ...props }) => {
  const tikzOptions = options ? `[${options}]` : "";
  return React.createElement("tikzcircle", {
    x,
    y,
    radius,
    options: tikzOptions,
    ...props,
  });
};

const TikZRectangle = ({
  x = 0,
  y = 0,
  width = 2,
  height = 1,
  options = "",
  ...props
}) => {
  const tikzOptions = options ? `[${options}]` : "";
  return React.createElement("tikzrectangle", {
    x,
    y,
    width,
    height,
    options: tikzOptions,
    ...props,
  });
};

const TikZLine = ({ from = [0, 0], to = [2, 0], options = "", ...props }) => {
  const tikzOptions = options ? `[${options}]` : "";
  return React.createElement("tikzline", {
    from,
    to,
    options: tikzOptions,
    ...props,
  });
};

const TikZArrow = ({
  from = [0, 0],
  to = [2, 0],
  options = "->",
  ...props
}) => {
  const tikzOptions = options ? `[${options}]` : "";
  return React.createElement("tikzarrow", {
    from,
    to,
    options: tikzOptions,
    ...props,
  });
};

const TikZNode = ({ x = 0, y = 0, text = "", options = "", ...props }) => {
  const tikzOptions = options ? `[${options}]` : "";
  return React.createElement("tikznode", {
    x,
    y,
    text,
    options: tikzOptions,
    ...props,
  });
};

const TikZGrid = ({
  xmin = 0,
  ymin = 0,
  xmax = 4,
  ymax = 4,
  step = 1,
  options = "",
  ...props
}) => {
  const tikzOptions = options ? `[${options}]` : "";
  return React.createElement("tikzgrid", {
    xmin,
    ymin,
    xmax,
    ymax,
    step,
    options: tikzOptions,
    ...props,
  });
};

const TikZAxis = ({
  xmin = 0,
  ymin = 0,
  xmax = 4,
  ymax = 4,
  options = "",
  ...props
}) => {
  const tikzOptions = options ? `[${options}]` : "";
  return React.createElement("tikzaxis", {
    xmin,
    ymin,
    xmax,
    ymax,
    options: tikzOptions,
    ...props,
  });
};

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
}) => {
  const tikzOptions = options ? `[${options}]` : "";
  return React.createElement("tikzflowchartnode", {
    x,
    y,
    text,
    shape,
    options: tikzOptions,
    ...props,
  });
};

const TikZFlowchartArrow = ({
  from = [0, 0],
  to = [2, 0],
  options = "->",
  ...props
}) => {
  const tikzOptions = options ? `[${options}]` : "";
  return React.createElement("tikzflowchartarrow", {
    from,
    to,
    options: tikzOptions,
    ...props,
  });
};

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
