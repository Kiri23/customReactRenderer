const React = require("react");
const {
  TikZDiagram,
  TikZCircle,
  TikZRectangle,
  TikZLine,
  TikZArrow,
  TikZNode,
  TikZGrid,
  TikZAxis,
} = require("./simple-tikz-components");
const {
  Document,
  Section,
  Paragraph,
  Bold,
} = require("./simple-latex-components");
const { ReactLatexVisitor } = require("../src/renderers/ReactLatex");

// Ejemplo simple de TikZ usando tagged templates
const TikZExample = React.createElement(
  Document,
  null,
  React.createElement(
    Section,
    { title: "TikZ Examples with Tagged Templates" },
    React.createElement(
      Paragraph,
      null,
      "This document demonstrates TikZ components using the new tagged templates implementation.",
    ),
    React.createElement(
      Paragraph,
      null,
      React.createElement(Bold, null, "Geometric Shapes:"),
      " Circles, rectangles, lines, and arrows.",
    ),
    React.createElement(
      TikZDiagram,
      { width: "10cm", height: "8cm" },
      React.createElement(TikZGrid, {
        xmin: 0,
        ymin: 0,
        xmax: 6,
        ymax: 6,
        step: 1,
        options: "gray!30",
      }),
      React.createElement(TikZCircle, {
        x: 2,
        y: 2,
        radius: 1,
        options: "fill=blue!20, draw=blue",
      }),
      React.createElement(TikZRectangle, {
        x: 4,
        y: 4,
        width: 1.5,
        height: 1,
        options: "fill=red!20, draw=red",
      }),
      React.createElement(TikZLine, {
        from: [1, 1],
        to: [5, 5],
        options: "thick, green",
      }),
      React.createElement(TikZArrow, {
        from: [1, 5],
        to: [5, 1],
        options: "->, thick, purple",
      }),
      React.createElement(TikZNode, {
        x: 2,
        y: 3.5,
        text: "Circle",
        options: "above",
      }),
      React.createElement(TikZNode, {
        x: 4.75,
        y: 4.5,
        text: "Rectangle",
        options: "above",
      }),
      React.createElement(TikZNode, {
        x: 3,
        y: 3,
        text: "Line",
        options: "above",
      }),
      React.createElement(TikZNode, {
        x: 3,
        y: 3,
        text: "Arrow",
        options: "below",
      }),
    ),
    React.createElement(
      Paragraph,
      null,
      React.createElement(Bold, null, "Mathematical Diagram:"),
      " Axes and coordinate system.",
    ),
    React.createElement(
      TikZDiagram,
      { width: "8cm", height: "6cm" },
      React.createElement(TikZAxis, { xmin: -3, ymin: -3, xmax: 3, ymax: 3 }),
      React.createElement(TikZGrid, {
        xmin: -3,
        ymin: -3,
        xmax: 3,
        ymax: 3,
        step: 0.5,
        options: "gray!20",
      }),
      React.createElement(TikZCircle, {
        x: 0,
        y: 0,
        radius: 0.05,
        options: "fill=red",
      }),
      React.createElement(TikZCircle, {
        x: 1,
        y: 1,
        radius: 0.05,
        options: "fill=red",
      }),
      React.createElement(TikZCircle, {
        x: -1,
        y: 1,
        radius: 0.05,
        options: "fill=red",
      }),
      React.createElement(TikZNode, {
        x: 2.5,
        y: 2.5,
        text: "$f(x) = x^2$",
        options: "blue",
      }),
      React.createElement(TikZNode, {
        x: 0.2,
        y: 0.2,
        text: "$(0,0)$",
        options: "red",
      }),
      React.createElement(TikZNode, {
        x: 1.2,
        y: 1.2,
        text: "$(1,1)$",
        options: "red",
      }),
      React.createElement(TikZNode, {
        x: -1.2,
        y: 1.2,
        text: "$(-1,1)$",
        options: "red",
      }),
    ),
  ),
);

// Renderizar el documento
const latexOutput = ReactLatexVisitor(TikZExample);
console.log("TikZ LaTeX Output:");
console.log(latexOutput);

// Guardar en archivo
const fs = require("fs");
fs.writeFileSync("output-tikz-tagged-templates.tex", latexOutput);
console.log("TikZ LaTeX document written to output-tikz-tagged-templates.tex");

module.exports = { TikZExample, latexOutput };
