const React = require("react");
const { useLatexConfig } = require("../contexts/LatexConfigContext");

// Basic LaTeX components
const Document = ({ children, ...props }) =>
  React.createElement("document", props, children);

const Section = ({ title, children }) =>
  React.createElement("section", null, [title, children]);

const Subsection = ({ children, title, ...props }) =>
  React.createElement("subsection", props, title || children);

const Paragraph = ({ children, ...props }) =>
  React.createElement("paragraph", props, children);

const Bold = ({ children, ...props }) =>
  React.createElement("bold", props, children);

const Italic = ({ children, ...props }) =>
  React.createElement("italic", props, children);

const Underline = ({ children, ...props }) =>
  React.createElement("underline", props, children);

// Math components
const Math = ({ children, ...props }) =>
  React.createElement("math", props, children);

const DisplayMath = ({ children, ...props }) =>
  React.createElement("displaymath", props, children);

const Equation = ({ children, label, ...props }) =>
  React.createElement("equation", { ...props, label }, children);

// List components
const Itemize = ({ children, ...props }) =>
  React.createElement("itemize", props, children);

const Enumerate = ({ children, ...props }) =>
  React.createElement("enumerate", props, children);

const Item = ({ children, ...props }) =>
  React.createElement("item", props, children);

// Table components
const Table = ({ children, caption, ...props }) =>
  React.createElement("table", { ...props, caption }, children);

const Tabular = ({ children, align = "l", ...props }) =>
  React.createElement("tabular", { ...props, align }, children);

const TableRow = ({ children, ...props }) =>
  React.createElement("tr", props, children);

const TableCell = ({ children, ...props }) =>
  React.createElement("td", props, children);

// Special components that use context
const ConfigurableMath = ({ children, ...props }) => {
  const { isVisible } = useLatexConfig();

  if (!isVisible("showMath")) {
    return null;
  }

  return <Math {...props}>{children}</Math>;
};

const ConfigurableTable = ({ children, ...props }) => {
  const { isVisible } = useLatexConfig();

  if (!isVisible("showTables")) {
    return null;
  }

  return <Table {...props}>{children}</Table>;
};

const ConfigurableList = ({ children, ...props }) => {
  const { isVisible } = useLatexConfig();

  if (!isVisible("showLists")) {
    return null;
  }

  return <Itemize {...props}>{children}</Itemize>;
};

// Document structure components
const Abstract = ({ children, ...props }) => {
  const { isVisible } = useLatexConfig();

  if (!isVisible("showAbstract")) {
    return null;
  }

  return (
    <Paragraph {...props}>
      <Bold>Abstract:</Bold> {children}
    </Paragraph>
  );
};

const Keywords = ({ children, ...props }) => {
  const { isVisible } = useLatexConfig();

  if (!isVisible("showKeywords")) {
    return null;
  }

  return (
    <Paragraph {...props}>
      <Bold>Keywords:</Bold> {children}
    </Paragraph>
  );
};

const References = ({ children, ...props }) => {
  const { isVisible } = useLatexConfig();

  if (!isVisible("showReferences")) {
    return null;
  }

  return (
    <Section title="References" {...props}>
      {children}
    </Section>
  );
};

const Appendix = ({ children, ...props }) => {
  const { isVisible } = useLatexConfig();

  if (!isVisible("showAppendix")) {
    return null;
  }

  return (
    <Section title="Appendix" {...props}>
      {children}
    </Section>
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
