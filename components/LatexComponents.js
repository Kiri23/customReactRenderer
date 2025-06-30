const React = require("react");
const { useLatexConfig } = require("../contexts/LatexConfigContext");

// Utilidad para convertir cualquier valor a string LaTeX
function toLatexString(value) {
  if (value == null) return "";
  if (typeof value === "string" || typeof value === "number")
    return String(value);
  if (Array.isArray(value)) return value.map(toLatexString).join("");
  if (typeof value === "object") {
    return String(value);
  }
  return String(value);
}

// Tagged template function para crear componentes LaTeX
function latex(strings, ...interpolations) {
  const Component = (props) => {
    // Retornar un elemento React válido en lugar de null
    return React.createElement("latex-component", {
      __latexTemplate: Component.__latexTemplate,
      ...props,
    });
  };

  // Agregar el template LaTeX como propiedad del componente
  Component.__latexTemplate = (props) => {
    return strings.reduce((acc, str, i) => {
      let value = interpolations[i];
      let evaluated = typeof value === "function" ? value(props) : value;
      evaluated = toLatexString(evaluated);
      return acc + str + (evaluated ?? "");
    }, "");
  };

  return Component;
}

// Componentes usando tagged templates
const Document = latex`
\\documentclass{article}
\\usepackage{amsmath}
\\usepackage{amsfonts}
\\usepackage{amssymb}
\\usepackage{graphicx}
\\usepackage{tikz}
\\usepackage{pgfplots}
\\pgfplotsset{compat=1.18}
\\begin{document}

${(props) => props.children}

\\end{document}`;

const Section = latex`
\\section{${(props) => props.title || props.children}}
${(props) => props.children}`;

const Subsection = latex`
\\subsection{${(props) => props.title || props.children}}
${(props) => props.children}`;

const Paragraph = latex`
${(props) => props.children}

`;

const Bold = latex`\\textbf{${(props) => props.children}}`;

const Italic = latex`\\textit{${(props) => props.children}}`;

const Underline = latex`\\underline{${(props) => props.children}}`;

const Math = latex`$${(props) => props.children}$`;

const DisplayMath = latex`\\[${(props) => props.children}\\]`;

const Equation = latex`
\\begin{equation}${(props) => (props.label ? `\\label{${props.label}}` : "")}
${(props) => props.children}
\\end{equation}

`;

const Itemize = latex`
\\begin{itemize}
${(props) => props.children}\\end{itemize}

`;

const Enumerate = latex`
\\begin{enumerate}
${(props) => props.children}\\end{enumerate}

`;

const Item = latex`\\item ${(props) => props.children}
`;

const Table = latex`
\\begin{table}[h]
\\centering
${(props) => (props.caption ? `\\caption{${props.caption}}` : "")}
${(props) => props.children}\\end{table}

`;

const Tabular = latex`
\\begin{tabular}{${(props) => props.align || "l"}}
${(props) => props.children}\\end{tabular}`;

const Tr = latex`${(props) => props.children} \\\\
`;

const Td = latex`${(props) => props.children} & `;

const P = latex`${(props) => props.children}

`;

const Div = latex`${(props) => props.children}
`;

const Span = latex`${(props) => props.children}`;

// TikZ Components
const TikZDiagram = latex`
\\begin{figure}[h]
\\centering
\\begin{tikzpicture}[scale=1]
${(props) => props.children}
\\end{tikzpicture}
\\end{figure}

`;

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

const TikZFlowchart = latex`
\\begin{tikzpicture}[node distance=2cm]
${(props) => props.children}
\\end{tikzpicture}

`;

const TikZFlowchartNode = latex`\\node${(props) =>
  props.options && props.options.trim() ? `[${props.options}]` : ""}[${(
  props,
) => {
  const shape = props.shape;
  return shape === "circle"
    ? "circle"
    : shape === "diamond"
    ? "diamond"
    : "rectangle";
}}, draw] at (${(props) => props.x},${(props) => props.y}) {${(props) =>
  props.text}};
`;

const TikZFlowchartArrow = latex`\\draw${(props) =>
  props.options && props.options.trim() ? `[${props.options}]` : ""} (${(
  props,
) => props.from[0]},${(props) => props.from[1]}) -- (${(props) =>
  props.to[0]},${(props) => props.to[1]});
`;

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
  Tr,
  Td,
  P,
  Div,
  Span,
  ConfigurableTable,

  // Document structure
  Abstract,
  Keywords,
  References,
  Appendix,

  // TikZ components
  TikZDiagram,
  TikZCircle,
  TikZRectangle,
  TikZLine,
  TikZArrow,
  TikZNode,
  TikZGrid,
  TikZAxis,
  TikZFlowchart,
  TikZFlowchartNode,
  TikZFlowchartArrow,

  // Exportar la función para uso personalizado
  latex,
};
