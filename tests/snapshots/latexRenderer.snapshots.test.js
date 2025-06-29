const React = require("react");

// Import existing components
const {
  TikZDiagram,
  TikZCircle,
  TikZRectangle,
  TikZLine,
  TikZNode,
} = require("../../components/TikZComponents");
const {
  Document,
  Section,
  Paragraph,
} = require("../../components/LatexComponents");

// Import the existing latexRenderer
const latexRenderer = require("../../latexRenderer");

describe("latexRenderer - Snapshot Tests", () => {
  describe("Basic Document Snapshots", () => {
    test("should generate consistent basic document", () => {
      const BasicDocument = () => (
        <Document>
          <Section>Introduction</Section>
          <Paragraph>This is a basic test document.</Paragraph>
          <Section>Conclusion</Section>
          <Paragraph>This concludes the basic test.</Paragraph>
        </Document>
      );

      const output = latexRenderer.renderToLatex(<BasicDocument />);
      expect(output).toMatchSnapshot();
    });

    test("should generate consistent document with math", () => {
      const MathDocument = () => (
        <Document>
          <Section>Mathematical Content</Section>
          <Paragraph>
            The quadratic formula is: x = (-b ± √(b² - 4ac)) / 2a
          </Paragraph>
          <Paragraph>The area of a circle is: A = πr²</Paragraph>
        </Document>
      );

      const output = latexRenderer.renderToLatex(<MathDocument />);
      expect(output).toMatchSnapshot();
    });
  });

  describe("TikZ Component Snapshots", () => {
    test("should generate consistent TikZ diagram", () => {
      const TikZDocument = () => (
        <Document>
          <Section>TikZ Diagram</Section>
          <TikZDiagram width="8cm" height="6cm">
            <TikZCircle
              x={2}
              y={2}
              radius={1}
              options="fill=blue!20, draw=blue"
            />
            <TikZRectangle
              x={4}
              y={4}
              width={1.5}
              height={1}
              options="fill=red!20, draw=red"
            />
            <TikZLine from={[1, 1]} to={[5, 5]} options="thick, green" />
            <TikZNode x={2} y={3.5} text="Circle" options="above" />
            <TikZNode x={4.75} y={4.5} text="Rectangle" options="above" />
          </TikZDiagram>
        </Document>
      );

      const output = latexRenderer.renderToLatex(<TikZDocument />);
      expect(output).toMatchSnapshot();
    });

    test("should generate consistent complex TikZ diagram", () => {
      const ComplexTikZDocument = () => (
        <Document>
          <Section>Complex TikZ Diagram</Section>
          <TikZDiagram width="10cm" height="8cm">
            <TikZCircle x={1} y={1} radius={0.5} options="fill=yellow!30" />
            <TikZCircle x={3} y={3} radius={0.5} options="fill=green!30" />
            <TikZCircle x={5} y={5} radius={0.5} options="fill=purple!30" />
            <TikZLine from={[1, 1]} to={[3, 3]} options="dashed, thick" />
            <TikZLine from={[3, 3]} to={[5, 5]} options="dotted, thick" />
            <TikZRectangle
              x={0.5}
              y={0.5}
              width={1}
              height={1}
              options="fill=red!20"
            />
            <TikZNode x={2} y={2} text="Connection" options="above" />
            <TikZNode x={4} y={4} text="Connection" options="below" />
          </TikZDiagram>
        </Document>
      );

      const output = latexRenderer.renderToLatex(<ComplexTikZDocument />);
      expect(output).toMatchSnapshot();
    });

    test("should generate consistent TikZ with specific props", () => {
      const SpecificPropsDocument = () => (
        <Document>
          <Section>Specific Props Test</Section>
          <TikZDiagram width="6cm" height="4cm">
            <TikZCircle
              x={1.5}
              y={1.5}
              radius={0.8}
              options="fill=purple!40, draw=purple, thick"
            />
            <TikZRectangle
              x={3}
              y={2}
              width={2}
              height={1.5}
              options="fill=orange!30, draw=orange"
            />
            <TikZLine
              from={[0.5, 0.5]}
              to={[4.5, 3.5]}
              options="red, very thick"
            />
            <TikZNode
              x={1.5}
              y={2.3}
              text="Purple Circle"
              options="below, font=\\small"
            />
            <TikZNode
              x={4}
              y={2.75}
              text="Orange Rect"
              options="above, font=\\tiny"
            />
          </TikZDiagram>
        </Document>
      );

      const output = latexRenderer.renderToLatex(<SpecificPropsDocument />);
      expect(output).toMatchSnapshot();
    });
  });

  describe("Edge Cases Snapshots", () => {
    test("should generate consistent output for empty components", () => {
      const EmptyDocument = () => (
        <Document>
          <Section></Section>
          <Paragraph></Paragraph>
          <TikZDiagram>
            <TikZCircle x={0} y={0} radius={0} />
            <TikZRectangle x={0} y={0} width={0} height={0} />
            <TikZNode x={0} y={0} text="" />
          </TikZDiagram>
        </Document>
      );

      const output = latexRenderer.renderToLatex(<EmptyDocument />);
      expect(output).toMatchSnapshot();
    });

    test("should generate consistent output for extreme values", () => {
      const ExtremeValuesDocument = () => (
        <Document>
          <Section>Extreme Values</Section>
          <TikZDiagram width="1cm" height="1cm">
            <TikZCircle
              x={-1000}
              y={-1000}
              radius={1000}
              options="fill=black"
            />
            <TikZRectangle
              x={1000}
              y={1000}
              width={1000}
              height={1000}
              options="fill=white"
            />
            <TikZLine from={[-1000, -1000]} to={[1000, 1000]} options="thick" />
            <TikZNode x={0} y={0} text="Center" options="above" />
          </TikZDiagram>
        </Document>
      );

      const output = latexRenderer.renderToLatex(<ExtremeValuesDocument />);
      expect(output).toMatchSnapshot();
    });
  });

  describe("Nested Structure Snapshots", () => {
    test("should generate consistent deeply nested structure", () => {
      const DeepNestedDocument = () => (
        <Document>
          <Section>
            Level 1
            <Section>
              Level 2
              <Section>
                Level 3<Paragraph>Deep content</Paragraph>
                <TikZDiagram>
                  <TikZCircle x={1} y={1} radius={1} />
                  <TikZDiagram>
                    <TikZCircle x={2} y={2} radius={0.5} />
                  </TikZDiagram>
                </TikZDiagram>
              </Section>
            </Section>
          </Section>
        </Document>
      );

      const output = latexRenderer.renderToLatex(<DeepNestedDocument />);
      expect(output).toMatchSnapshot();
    });

    test("should generate consistent mixed content structure", () => {
      const MixedContentDocument = () => (
        <Document>
          <Section>Mixed Content Section</Section>
          <Paragraph>Regular paragraph text.</Paragraph>
          <TikZDiagram width="8cm" height="6cm">
            <TikZCircle x={2} y={2} radius={1} options="fill=blue!20" />
            <TikZNode x={2} y={3.5} text="Circle Label" options="above" />
          </TikZDiagram>
          <Paragraph>Another paragraph after diagram.</Paragraph>
          <Section>Another Section</Section>
          <Paragraph>Final paragraph.</Paragraph>
        </Document>
      );

      const output = latexRenderer.renderToLatex(<MixedContentDocument />);
      expect(output).toMatchSnapshot();
    });
  });

  describe("Multiple Format Snapshots", () => {
    test("should generate consistent enhanced LaTeX output", () => {
      const TestDocument = () => (
        <Document>
          <Section>Enhanced LaTeX Snapshot Test</Section>
          <Paragraph>This is an enhanced LaTeX snapshot test.</Paragraph>
          <TikZDiagram width="5cm" height="5cm">
            <TikZCircle x={2} y={2} radius={1} options="fill=green!20" />
          </TikZDiagram>
        </Document>
      );

      const output = latexRenderer.renderToEnhancedLatex(<TestDocument />);
      expect(output).toMatchSnapshot();
    });
  });

  describe("Performance Snapshot Tests", () => {
    test("should generate consistent large document", () => {
      const LargeDocument = () => {
        const sections = [];
        for (let i = 1; i <= 5; i++) {
          sections.push(<Section key={i}>Section {i}</Section>);
        }

        const tikzElements = [];
        for (let i = 0; i < 10; i++) {
          tikzElements.push(
            <TikZCircle
              key={i}
              x={i % 3}
              y={Math.floor(i / 3)}
              radius={0.2}
              options="fill=blue!20"
            />,
          );
        }

        return (
          <Document>
            {sections}
            <TikZDiagram width="6cm" height="6cm">
              {tikzElements}
            </TikZDiagram>
          </Document>
        );
      };

      const output = latexRenderer.renderToLatex(<LargeDocument />);
      expect(output).toMatchSnapshot();
    });
  });
});
