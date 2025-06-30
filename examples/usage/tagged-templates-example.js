const React = require("react");
const {
  Document,
  Section,
  Subsection,
  Paragraph,
  Bold,
  Italic,
  Math,
  Equation,
  Itemize,
  Item,
  TikZDiagram,
  TikZCircle,
  TikZLine,
  TikZNode,
} = require("../components/LatexComponents");
const { renderToLatex } = require("../../latexRenderer");

// Ejemplo usando componentes con tagged templates usando React.createElement
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
      Subsection,
      { title: "Matemáticas" },
      React.createElement(
        Paragraph,
        null,
        "Podemos usar matemáticas inline como ",
        React.createElement(Math, null, "E = mc^2"),
        " o en display:",
      ),
      React.createElement(
        Equation,
        { label: "eq:quadratic" },
        "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
      ),
    ),
    React.createElement(
      Subsection,
      { title: "Listas" },
      React.createElement(
        Itemize,
        null,
        React.createElement(Item, null, "Primer elemento de la lista"),
        React.createElement(
          Item,
          null,
          "Segundo elemento con ",
          React.createElement(Bold, null, "texto en negrita"),
        ),
        React.createElement(Item, null, "Tercer elemento"),
      ),
    ),
    React.createElement(
      Subsection,
      { title: "Diagrama TikZ" },
      React.createElement(
        TikZDiagram,
        null,
        React.createElement(TikZCircle, {
          x: 2,
          y: 2,
          radius: 1,
          options: "fill=blue!20",
        }),
        React.createElement(TikZLine, {
          from: [1, 1],
          to: [3, 3],
          options: "thick, red",
        }),
        React.createElement(TikZNode, {
          x: 1,
          y: 1,
          text: "A",
          options: "above",
        }),
        React.createElement(TikZNode, {
          x: 3,
          y: 3,
          text: "B",
          options: "below",
        }),
      ),
    ),
  ),
);

// Renderizar el documento usando el nuevo sistema
const latexOutput = renderToLatex(LatexDocument);
console.log("LaTeX Output:");
console.log(latexOutput);

module.exports = { LatexDocument, latexOutput };
