const React = require("react");
const { LatexConfigProvider } = require("../contexts/LatexConfigContext");
const { ConditionalTikZ } = require("../components/TikZComponents");
const {
  TikZDiagram,
  TikZCircle,
  TikZRectangle,
  TikZLine,
  TikZArrow,
  TikZNode,
  TikZGrid,
  TikZAxis,
  TikZFlowchartNode,
  TikZFlowchartArrow
} = require("../components/TikZComponents");
const {
  Document,
  Section,
  Subsection,
  Paragraph,
  Bold
} = require("../components/LatexComponents");

// Simple geometric shapes example
const GeometricShapesExample = () => (
  <Section title="Geometric Shapes">
    <Paragraph>
      This section demonstrates basic TikZ geometric shapes.
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
);

// Flowchart example
const FlowchartExample = () => (
  <Section title="Flowchart Example">
    <Paragraph>
      This section shows a simple flowchart created with TikZ.
    </Paragraph>
    <TikZDiagram width="12cm" height="8cm">
      <TikZFlowchartNode x={0} y={0} text="Start" shape="circle" options="fill=green!20" />
      <TikZFlowchartNode x={0} y={-2} text="Process" shape="rectangle" options="fill=blue!20" />
      <TikZFlowchartNode x={0} y={-4} text="Decision" shape="diamond" options="fill=yellow!20" />
      <TikZFlowchartNode x={3} y={-4} text="Yes" shape="rectangle" options="fill=green!20" />
      <TikZFlowchartNode x={-3} y={-4} text="No" shape="rectangle" options="fill=red!20" />
      <TikZFlowchartNode x={0} y={-6} text="End" shape="circle" options="fill=red!20" />
      <TikZFlowchartArrow from={[0, -0.5]} to={[0, -1.5]} options="->" />
      <TikZFlowchartArrow from={[0, -2.5]} to={[0, -3.5]} options="->" />
      <TikZFlowchartArrow from={[0.5, -4]} to={[2.5, -4]} options="->" />
      <TikZFlowchartArrow from={[-0.5, -4]} to={[-2.5, -4]} options="->" />
      <TikZFlowchartArrow from={[0, -4.5]} to={[0, -5.5]} options="->" />
    </TikZDiagram>
  </Section>
);

// Mathematical diagram example
const MathematicalDiagramExample = () => (
  <Section title="Mathematical Diagram">
    <Paragraph>
      This section demonstrates a mathematical diagram with axes and functions.
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
);

// Circuit diagram example
const CircuitDiagramExample = () => (
  <Section title="Simple Circuit Diagram">
    <Paragraph>
      This section shows a simple electrical circuit diagram.
    </Paragraph>
    <TikZDiagram width="10cm" height="6cm">
      <TikZLine from={[0, 0]} to={[0, 1]} options="thick" />
      <TikZLine from={[0.5, 0]} to={[0.5, 1]} options="thick" />
      <TikZLine from={[0, 0.5]} to={[0.5, 0.5]} options="thick" />
      <TikZLine from={[1, 0.5]} to={[1.5, 0.5]} options="thick" />
      <TikZLine from={[1.5, 0.5]} to={[1.5, 0.3]} options="thick" />
      <TikZLine from={[1.5, 0.3]} to={[2, 0.3]} options="thick" />
      <TikZLine from={[2, 0.3]} to={[2, 0.5]} options="thick" />
      <TikZLine from={[2, 0.5]} to={[2.5, 0.5]} options="thick" />
      <TikZCircle x={3} y={0.5} radius={0.3} options="fill=yellow!20, draw=black" />
      <TikZLine from={[2.5, 0.5]} to={[2.7, 0.5]} options="thick" />
      <TikZLine from={[3.3, 0.5]} to={[3.5, 0.5]} options="thick" />
      <TikZLine from={[3.5, 0.5]} to={[4, 0.5]} options="thick" />
      <TikZLine from={[4, 0.5]} to={[4, 0]} options="thick" />
      <TikZLine from={[4, 0]} to={[0, 0]} options="thick" />
      <TikZNode x={0.25} y={1.5} text="Battery" options="above" />
      <TikZNode x={1.75} y={1.5} text="Resistor" options="above" />
      <TikZNode x={3} y={1.5} text="LED" options="above" />
    </TikZDiagram>
  </Section>
);

// Main TikZ examples document
const TikZExamplesDocument = ({ initialConfig = {} }) => {
  const config = {
    showDiagrams: true,
    showMath: true,
    showTables: true,
    showLists: true,
    showExamples: true,
    showAbstract: true,
    showKeywords: true,
    showReferences: true,
    ...initialConfig
  };

  return (
    <LatexConfigProvider config={config}>
      <Document>
        <Section title="TikZ Diagrams Examples">
          <Paragraph>
            This document demonstrates various TikZ diagrams that can be rendered in Overleaf.
            Each section shows different types of diagrams created using React components.
          </Paragraph>
        </Section>

        <GeometricShapesExample />
        <FlowchartExample />
        <MathematicalDiagramExample />
        <CircuitDiagramExample />
      </Document>
    </LatexConfigProvider>
  );
};

module.exports = TikZExamplesDocument; 