const React = require("react");
const { useLatexConfig } = require("../contexts/LatexConfigContext");

// Basic LaTeX components
const Document = ({ children, ...props }) =>
  React.createElement("Document", props, children);

const Section = ({ title, children }) =>
  React.createElement("Section", null, [title, children]);

const Subsection = ({ children, title, ...props }) =>
  React.createElement("Subsection", props, title || children);

const Paragraph = ({ children, ...props }) =>
  React.createElement("Paragraph", props, children);

const Bold = ({ children, ...props }) =>
  React.createElement("Bold", props, children);

const Italic = ({ children, ...props }) =>
  React.createElement("Italic", props, children);

const Underline = ({ children, ...props }) =>
  React.createElement("Underline", props, children);

// Math components
const Math = ({ children, ...props }) =>
  React.createElement("Math", props, children);

const DisplayMath = ({ children, ...props }) =>
  React.createElement("DisplayMath", props, children);

const Equation = ({ children, label, ...props }) =>
  React.createElement("Equation", { ...props, label }, children);

// List components
const Itemize = ({ children, ...props }) =>
  React.createElement("Itemize", props, children);

const Enumerate = ({ children, ...props }) =>
  React.createElement("Enumerate", props, children);

const Item = ({ children, ...props }) =>
  React.createElement("Item", props, children);

// Table components
const Table = ({ children, caption, ...props }) =>
  React.createElement("Table", { ...props, caption }, children);

const Tabular = ({ children, align = "l", ...props }) =>
  React.createElement("Tabular", { ...props, align }, children);

const TableRow = ({ children, ...props }) =>
  React.createElement("Tr", props, children);

const TableCell = ({ children, ...props }) =>
  React.createElement("Td", props, children);

// Special components that use context
const ConfigurableMath = ({ children, ...props }) => {
  const { isVisible } = useLatexConfig();

  if (!isVisible("showMath")) {
    return null;
  }

  return React.createElement("Math", props, children);
};

const ConfigurableTable = ({ children, ...props }) => {
  const { isVisible } = useLatexConfig();

  if (!isVisible("showTables")) {
    return null;
  }

  return React.createElement("Table", props, children);
};

const ConfigurableList = ({ children, ...props }) => {
  const { isVisible } = useLatexConfig();

  if (!isVisible("showLists")) {
    return null;
  }

  return React.createElement("Itemize", props, children);
};

// Document structure components
const Abstract = ({ children, ...props }) => {
  const { isVisible } = useLatexConfig();

  if (!isVisible("showAbstract")) {
    return null;
  }

  return React.createElement(
    "Paragraph",
    props,
    React.createElement("Bold", null, "Abstract:"),
    " ",
    children,
  );
};

const Keywords = ({ children, ...props }) => {
  const { isVisible } = useLatexConfig();

  if (!isVisible("showKeywords")) {
    return null;
  }

  return React.createElement(
    "Paragraph",
    props,
    React.createElement("Bold", null, "Keywords:"),
    " ",
    children,
  );
};

const References = ({ children, ...props }) => {
  const { isVisible } = useLatexConfig();

  if (!isVisible("showReferences")) {
    return null;
  }

  return React.createElement(
    "Section",
    { title: "References", ...props },
    children,
  );
};

const Appendix = ({ children, ...props }) => {
  const { isVisible } = useLatexConfig();

  if (!isVisible("showAppendix")) {
    return null;
  }

  return React.createElement(
    "Section",
    { title: "Appendix", ...props },
    children,
  );
};

module.exports = {
  // Basic components
  Document,
  Section,
  Subsection,
  Paragraph,
  Bold,
  Italic,
  Underline,

  // Math components
  Math,
  DisplayMath,
  Equation,
  ConfigurableMath,

  // List components
  Itemize,
  Enumerate,
  Item,
  ConfigurableList,

  // Table components
  Table,
  Tabular,
  TableRow,
  TableCell,
  ConfigurableTable,

  // Document structure
  Abstract,
  Keywords,
  References,
  Appendix,
};
