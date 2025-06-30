const React = require("react");

// Tagged template function para crear componentes LaTeX reales
function latex(strings, ...interpolations) {
  const Component = (props) => {
    // Retornar directamente el string LaTeX procesado
    return strings.reduce((acc, str, i) => {
      let value = interpolations[i];
      let evaluated = typeof value === "function" ? value(props) : value;
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

const Paragraph = latex`
${(props) => props.children}

`;

const Bold = latex`\\textbf{${(props) => props.children}}`;

module.exports = {
  Document,
  Section,
  Paragraph,
  Bold,
  latex,
};
