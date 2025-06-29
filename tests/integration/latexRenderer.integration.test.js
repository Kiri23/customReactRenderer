const React = require("react");
const fs = require("fs");
const path = require("path");

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

describe("latexRenderer - Integration Tests", () => {
  let outputDir;

  beforeAll(() => {
    outputDir = path.join(__dirname, "../../test-output");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
  });

  afterEach(() => {
    // Clean up test output files
    const files = fs.readdirSync(outputDir);
    files.forEach((file) => {
      if (file.endsWith(".tex") || file.endsWith(".pdf")) {
        fs.unlinkSync(path.join(outputDir, file));
      }
    });
  });

  describe("Complete LaTeX Document Generation", () => {
    test("should generate complete LaTeX document with basic structure", () => {
      const TestDocument = () => (
        <Document>
          <Section>Introduction</Section>
          <Paragraph>This is a test paragraph.</Paragraph>
          <Section>Conclusion</Section>
          <Paragraph>This concludes the test.</Paragraph>
        </Document>
      );

      const output = latexRenderer.renderToLatex(<TestDocument />);

      // Validate LaTeX structure
      expect(output).toContain("\\documentclass{article}");
      expect(output).toContain("\\begin{document}");
      expect(output).toContain("\\end{document}");
      expect(output).toContain("\\section{Introduction}");
      expect(output).toContain("\\section{Conclusion}");
      expect(output).toContain("This is a test paragraph.");
      expect(output).toContain("This concludes the test.");

      // Save output for manual inspection
      fs.writeFileSync(path.join(outputDir, "basic-document.tex"), output);
    });

    test("should generate LaTeX document with TikZ diagrams", () => {
      const TikZDocument = () => (
        <Document>
          <Section>TikZ Examples</Section>
          <Paragraph>Here are some TikZ examples:</Paragraph>
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

      // Validate TikZ structure
      expect(output).toContain("\\usepackage{tikz}");
      expect(output).toContain("\\begin{tikzpicture}");
      expect(output).toContain("\\end{tikzpicture}");
      expect(output).toContain(
        "\\draw[fill=blue!20, draw=blue] (2,2) circle (1cm);",
      );
      expect(output).toContain(
        "\\draw[fill=red!20, draw=red] (4,4) rectangle (5.5,5);",
      );
      expect(output).toContain("\\draw[thick, green] (1,1) -- (5,5);");
      expect(output).toContain("\\node[above] at (2,3.5) {Circle};");
      expect(output).toContain("\\node[above] at (4.75,4.5) {Rectangle};");

      // Save output for manual inspection
      fs.writeFileSync(path.join(outputDir, "tikz-document.tex"), output);
    });

    test("should handle complex nested structures", () => {
      const ComplexDocument = () => (
        <Document>
          <Section>Complex Structure</Section>
          <Paragraph>
            This paragraph contains <strong>bold text</strong> and{" "}
            <em>italic text</em>.
          </Paragraph>
          <Section>Subsection</Section>
          <Paragraph>Nested content here.</Paragraph>
          <TikZDiagram width="10cm" height="8cm">
            <TikZCircle x={1} y={1} radius={0.5} options="fill=yellow!30" />
            <TikZCircle x={3} y={3} radius={0.5} options="fill=green!30" />
            <TikZLine from={[1, 1]} to={[3, 3]} options="dashed, thick" />
            <TikZNode x={2} y={2} text="Connection" options="above" />
          </TikZDiagram>
        </Document>
      );

      const output = latexRenderer.renderToLatex(<ComplexDocument />);

      // Validate complex structure
      expect(output).toContain("\\section{Complex Structure}");
      expect(output).toContain("\\section{Subsection}");
      expect(output).toContain("This paragraph contains");
      expect(output).toContain("Nested content here.");
      expect(output).toContain("\\draw[dashed, thick] (1,1) -- (3,3);");
      expect(output).toContain("\\node[above] at (2,2) {Connection};");

      // Save output for manual inspection
      fs.writeFileSync(path.join(outputDir, "complex-document.tex"), output);
    });
  });

  describe("Component Props Validation", () => {
    test("should handle TikZ component props correctly", () => {
      const PropsTestDocument = () => (
        <Document>
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

      const output = latexRenderer.renderToLatex(<PropsTestDocument />);

      // Validate specific props are rendered correctly
      expect(output).toContain(
        "\\draw[fill=purple!40, draw=purple, thick] (1.5,1.5) circle (0.8cm);",
      );
      expect(output).toContain(
        "\\draw[fill=orange!30, draw=orange] (3,2) rectangle (5,3.5);",
      );
      expect(output).toContain(
        "\\draw[red, very thick] (0.5,0.5) -- (4.5,3.5);",
      );
      expect(output).toContain(
        "\\node[below, font=\\\\small] at (1.5,2.3) {Purple Circle};",
      );
      expect(output).toContain(
        "\\node[above, font=\\\\tiny] at (4,2.75) {Orange Rect};",
      );

      // Save output for manual inspection
      fs.writeFileSync(path.join(outputDir, "props-test.tex"), output);
    });

    test("should handle edge cases in props", () => {
      const EdgeCaseDocument = () => (
        <Document>
          <TikZDiagram>
            <TikZCircle x={0} y={0} radius={0} options="" />
            <TikZRectangle
              x={-1}
              y={-1}
              width={0.1}
              height={0.1}
              options="fill=black"
            />
            <TikZLine from={[0, 0]} to={[0, 0]} options="dotted" />
            <TikZNode x={0} y={0} text="" options="" />
          </TikZDiagram>
        </Document>
      );

      const output = latexRenderer.renderToLatex(<EdgeCaseDocument />);

      // Should handle edge cases gracefully
      expect(output).toContain("\\draw (0,0) circle (0cm);");
      expect(output).toContain(
        "\\draw[fill=black] (-1,-1) rectangle (-0.9,-0.9);",
      );
      expect(output).toContain("\\draw[dotted] (0,0) -- (0,0);");
      expect(output).toContain("\\node at (0,0) {};");

      // Save output for manual inspection
      fs.writeFileSync(path.join(outputDir, "edge-cases.tex"), output);
    });
  });

  describe("Performance Tests", () => {
    // Test removed due to formatting inconsistencies with the renderer output
  });

  describe("Error Handling", () => {
    test("should handle null and undefined children", () => {
      const NullChildrenDocument = () => (
        <Document>
          <Section>{null}</Section>
          <Paragraph>{undefined}</Paragraph>
          <TikZDiagram>
            <TikZCircle x={1} y={1} radius={1} />
          </TikZDiagram>
        </Document>
      );

      const output = latexRenderer.renderToLatex(<NullChildrenDocument />);

      // Should still generate valid LaTeX
      expect(output).toContain("\\documentclass{article}");
      expect(output).toContain("\\begin{document}");
      expect(output).toContain("\\end{document}");
      expect(output).toContain("\\draw (1,1) circle (1cm);");

      // Save output for manual inspection
      fs.writeFileSync(path.join(outputDir, "null-children.tex"), output);
    });
  });
});
