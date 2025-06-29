const React = require("react");

// Define JSX elements for testing
const Document = ({ children }) =>
  React.createElement("Document", null, children);
const Section = ({ children }) =>
  React.createElement("Section", null, children);
const Subsection = ({ children }) =>
  React.createElement("Subsection", null, children);
const Paragraph = ({ children }) =>
  React.createElement("Paragraph", null, children);
const Bold = ({ children }) => React.createElement("Bold", null, children);
const Italic = ({ children }) => React.createElement("Italic", null, children);
const Underline = ({ children }) =>
  React.createElement("Underline", null, children);
const Math = ({ children }) => React.createElement("Math", null, children);
const DisplayMath = ({ children }) =>
  React.createElement("DisplayMath", null, children);
const Equation = ({ children }) =>
  React.createElement("Equation", null, children);
const Itemize = ({ children }) =>
  React.createElement("Itemize", null, children);
const Enumerate = ({ children }) =>
  React.createElement("Enumerate", null, children);
const Item = ({ children }) => React.createElement("Item", null, children);
const Table = ({ children }) => React.createElement("Table", null, children);
const Tabular = ({ children }) =>
  React.createElement("Tabular", null, children);
const Tr = ({ children }) => React.createElement("Tr", null, children);
const Td = ({ children }) => React.createElement("Td", null, children);
const P = ({ children }) => React.createElement("P", null, children);
const Div = ({ children }) => React.createElement("Div", null, children);
const Span = ({ children }) => React.createElement("Span", null, children);
const CustomSection = ({ children }) =>
  React.createElement("CustomSection", null, children);
const UnknownElement = ({ children }) =>
  React.createElement("UnknownElement", null, children);

module.exports = {
  Document,
  Section,
  Subsection,
  Paragraph,
  Bold,
  Italic,
  Underline,
  Math,
  DisplayMath,
  Equation,
  Itemize,
  Enumerate,
  Item,
  Table,
  Tabular,
  Tr,
  Td,
  P,
  Div,
  Span,
  CustomSection,
  UnknownElement,
};
