const React = require("react");
const {
  TikZDiagram,
  TikZCircle,
  TikZRectangle,
  TikZLine,
  TikZArrow,
  TikZNode,
  TikZGrid,
  TikZAxis
} = require("./simple-tikz-components");
const {
  Document,
  Section,
  Paragraph,
  Bold
} = require("./simple-latex-components");
const { ReactLatexVisitor } = require("../src/renderers/ReactLatex");

// Ejemplo usando JSX directamente con tagged templates
const TikZExample = (
  <Document>
    <Section title="TikZ Examples with JSX and Tagged Templates">
      <Paragraph>
        This document demonstrates TikZ components using JSX with tagged templates.
      </Paragraph>
      
      <Paragraph>
        <Bold>Geometric Shapes:</Bold> Circles, rectangles, lines, and arrows.
      </Paragraph>
      
      <TikZDiagram width="10cm" height="8cm">
        <TikZGrid xmin={0} ymin={0} xmax={6} ymax={6} step={1} options="gray!30" />
        <TikZCircle x={2} y={2} radius={1} options="fill=blue!20, draw=blue" />
        <TikZRectangle x={4} y={4} width={1.5} height={1} options="fill=red!20, draw=red" />
        <TikZLine from={[1, 1]} to={[5, 5]} options="thick, green" />
        <TikZArrow from={[1, 5]} to={[5, 1]} options="->, thick, purple" />
        <TikZNode x={2} y={3.5} text="Circle" options="above" />
        <TikZNode x={4.75} y={4.5} text="Rectangle" options="above" />
        <TikZNode x={3} y={3} text="Line" options="above" />
        <TikZNode x={3} y={3} text="Arrow" options="below" />
      </TikZDiagram>
      
      <Paragraph>
        <Bold>Mathematical Diagram:</Bold> Axes and coordinate system.
      </Paragraph>
      
      <TikZDiagram width="8cm" height="6cm">
        <TikZAxis xmin={-3} ymin={-3} xmax={3} ymax={3} />
        <TikZGrid xmin={-3} ymin={-3} xmax={3} ymax={3} step={0.5} options="gray!20" />
        <TikZCircle x={0} y={0} radius={0.05} options="fill=red" />
        <TikZCircle x={1} y={1} radius={0.05} options="fill=red" />
        <TikZCircle x={-1} y={1} radius={0.05} options="fill=red" />
        <TikZNode x={2.5} y={2.5} text="$f(x) = x^2$" options="blue" />
        <TikZNode x={0.2} y={0.2} text="$(0,0)$" options="red" />
        <TikZNode x={1.2} y={1.2} text="$(1,1)$" options="red" />
        <TikZNode x={-1.2} y={1.2} text="$(-1,1)$" options="red" />
      </TikZDiagram>
    </Section>
  </Document>
);

// Renderizar el documento
const latexOutput = ReactLatexVisitor(TikZExample);
console.log("TikZ LaTeX Output with JSX:");
console.log(latexOutput);

// Guardar en archivo
const fs = require('fs');
fs.writeFileSync("output-tikz-jsx.tex", latexOutput);
console.log("TikZ LaTeX document written to output-tikz-jsx.tex");

module.exports = { TikZExample, latexOutput }; 