const React = require("react");
const {
  Document,
  Section,
  Subsection,
  Paragraph,
  Bold,
  Italic,
  TikZDiagram,
  TikZCircle,
  TikZRectangle,
  TikZLine,
  TikZArrow,
  TikZNode,
  TikZGrid,
  TikZAxis
} = require("./components/LatexComponents");

// JSX LaTeX Document Example
const TikZJSXExample = () => (
  <Document>
    <Section title="TikZ Examples with JSX and Tagged Templates">
      <Paragraph>
        This document demonstrates TikZ components using JSX with tagged templates.
        The components are created using the latex tagged template function and can be
        used naturally with JSX syntax.
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
    </Section>

    <Section title="Mathematical Diagram">
      <Paragraph>
        This section shows a mathematical diagram with axes and a function plot.
      </Paragraph>
      
      <TikZDiagram width="10cm" height="8cm">
        <TikZAxis xmin={-3} ymin={-3} xmax={3} ymax={3} />
        <TikZGrid xmin={-3} ymin={-3} xmax={3} ymax={3} step={0.5} options="gray!20" />
        <TikZLine from={[-2, 4]} to={[-1.5, 2.25]} options="thick, blue" />
        <TikZLine from={[-1.5, 2.25]} to={[-1, 1]} options="thick, blue" />
        <TikZLine from={[-1, 1]} to={[-0.5, 0.25]} options="thick, blue" />
        <TikZLine from={[-0.5, 0.25]} to={[0, 0]} options="thick, blue" />
        <TikZLine from={[0, 0]} to={[0.5, 0.25]} options="thick, blue" />
        <TikZLine from={[0.5, 0.25]} to={[1, 1]} options="thick, blue" />
        <TikZLine from={[1, 1]} to={[1.5, 2.25]} options="thick, blue" />
        <TikZLine from={[1.5, 2.25]} to={[2, 4]} options="thick, blue" />
        <TikZCircle x={0} y={0} radius={0.05} options="fill=red" />
        <TikZCircle x={1} y={1} radius={0.05} options="fill=red" />
        <TikZCircle x={-1} y={1} radius={0.05} options="fill=red" />
        <TikZNode x={2.5} y={3.5} text="$f(x) = x^2$" options="blue" />
        <TikZNode x={0.2} y={0.2} text="$(0,0)$" options="red" />
        <TikZNode x={1.2} y={1.2} text="$(1,1)$" options="red" />
        <TikZNode x={-1.2} y={1.2} text="$(-1,1)$" options="red" />
      </TikZDiagram>
    </Section>

    <Section title="Text Formatting Examples">
      <Paragraph>
        This section demonstrates various text formatting options available in LaTeX.
      </Paragraph>
      
      <Paragraph>
        <Bold>Bold text</Bold> and <Italic>italic text</Italic> can be combined.
        You can also use mathematical expressions like <Bold>$E = mc^2$</Bold>.
      </Paragraph>
      
      <Paragraph>
        The components support nested structures and can handle complex LaTeX expressions
        while maintaining the familiar JSX syntax.
      </Paragraph>
    </Section>
  </Document>
);

module.exports = TikZJSXExample; 