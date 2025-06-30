const React = require("react");
const { renderToLatex } = require("../../latexRenderer");

// Crear componentes básicos sin contexto
function latex(strings, ...interpolations) {
  const Component = (props) => {
    return null;
  };

  Component.__latexTemplate = (props) => {
    return strings.reduce((acc, str, i) => {
      let value = interpolations[i];
      let evaluated = typeof value === "function" ? value(props) : value;
      return acc + str + (evaluated ?? "");
    }, "");
  };

  return Component;
}

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

const Italic = latex`\\textit{${(props) => props.children}}`;

const Math = latex`$${(props) => props.children}$`;

const TikZCircle = latex`\\draw${(props) =>
  props.options && props.options.trim() ? `[${props.options}]` : ""} (${(
  props,
) => props.x},${(props) => props.y}) circle (${(props) => props.radius}cm);
`;

// Ejemplo usando componentes con tagged templates
const LatexDocument = React.createElement(
  Document,
  null,
  React.createElement(
    Section,
    { title: "Introducción a LaTeX" },
    React.createElement(
      Paragraph,
      null,
      "Este es un ",
      React.createElement(Bold, null, "documento de ejemplo"),
      " que demuestra el uso de ",
      React.createElement(Italic, null, "tagged templates"),
      " para evitar la recursión infinita.",
    ),
    React.createElement(
      Paragraph,
      null,
      "Podemos usar matemáticas inline como ",
      React.createElement(Math, null, "E = mc^2"),
      " en el texto.",
    ),
    React.createElement(
      Paragraph,
      null,
      "Y también diagramas TikZ como ",
      React.createElement(TikZCircle, {
        x: 2,
        y: 2,
        radius: 1,
        options: "fill=blue!20",
      }),
    ),
  ),
);

// Renderizar el documento usando el nuevo sistema
const latexOutput = renderToLatex(LatexDocument);
console.log("LaTeX Output:");
console.log(latexOutput);
