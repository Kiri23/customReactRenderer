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
  TikZNode
} = require("../components/LatexComponents");
const { ReactLatexVisitor } = require("../src/renderers/ReactLatex");

// Ejemplo usando componentes con tagged templates
const LatexDocument = () => (
  <Document>
    <Section title="Introducción a LaTeX">
      <Paragraph>
        Este es un <Bold>documento de ejemplo</Bold> que demuestra el uso de 
        <Italic> tagged templates</Italic> para evitar la recursión infinita.
      </Paragraph>
      
      <Subsection title="Matemáticas">
        <Paragraph>
          Podemos usar matemáticas inline como <Math>E = mc^2</Math> o en display:
        </Paragraph>
        
        <Equation label="eq:quadratic">
          x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
        </Equation>
      </Subsection>
      
      <Subsection title="Listas">
        <Itemize>
          <Item>Primer elemento de la lista</Item>
          <Item>Segundo elemento con <Bold>texto en negrita</Bold></Item>
          <Item>Tercer elemento</Item>
        </Itemize>
      </Subsection>
      
      <Subsection title="Diagrama TikZ">
        <TikZDiagram>
          <TikZCircle x={2} y={2} radius={1} options="fill=blue!20" />
          <TikZLine from={[1, 1]} to={[3, 3]} options="thick, red" />
          <TikZNode x={1} y={1} text="A" options="above" />
          <TikZNode x={3} y={3} text="B" options="below" />
        </TikZDiagram>
      </Subsection>
    </Section>
  </Document>
);

// Renderizar el documento
const latexOutput = ReactLatexVisitor(<LatexDocument />);
console.log("LaTeX Output:");
console.log(latexOutput);

module.exports = { LatexDocument, latexOutput }; 