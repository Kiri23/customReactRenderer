const React = require("react");
const {
  Document,
  Section,
  Paragraph
} = require("../components/LatexComponents");

// Simple TikZ example without conditional rendering
const SimpleTikZExample = () => (
  <Document>
    <Section title="Simple TikZ Example">
      <Paragraph>
        This is a simple TikZ diagram example.
      </Paragraph>
      
      {/* Direct TikZ diagram without conditional wrapper */}
      <tikzdiagram width="8cm" height="6cm">
        <tikzcircle x={2} y={2} radius={1} options="fill=blue!20, draw=blue" />
        <tikzrectangle x={4} y={4} width={1.5} height={1} options="fill=red!20, draw=red" />
        <tikzline from={[1, 1]} to={[5, 5]} options="thick, green" />
        <tikznode x={2} y={3.5} text="Circle" options="above" />
        <tikznode x={4.75} y={4.5} text="Rectangle" options="above" />
      </tikzdiagram>
    </Section>
  </Document>
);

module.exports = SimpleTikZExample; 