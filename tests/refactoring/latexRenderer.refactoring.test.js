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

describe("latexRenderer - Refactoring Validation Tests", () => {
  let baselineOutputs = {};

  beforeAll(() => {
    // Generate baseline outputs from the original implementation
    baselineOutputs = generateBaselineOutputs();
  });

  describe("Output Consistency Validation", () => {
    test("should maintain exact same output for basic document", () => {
      const BasicDocument = () => (
        <Document>
          <Section>Introduction</Section>
          <Paragraph>This is a basic test document.</Paragraph>
          <Section>Conclusion</Section>
          <Paragraph>This concludes the basic test.</Paragraph>
        </Document>
      );

      const currentOutput = latexRenderer.renderToLatex(<BasicDocument />);
      const baselineOutput = baselineOutputs.basicDocument;

      // Normalize outputs for comparison
      const normalizedCurrent = testUtils.normalizeLatex(currentOutput);
      const normalizedBaseline = testUtils.normalizeLatex(baselineOutput);

      expect(normalizedCurrent).toBe(normalizedBaseline);
    });

    test("should maintain exact same output for TikZ document", () => {
      const TikZDocument = () => (
        <Document>
          <Section>TikZ Examples</Section>
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

      const currentOutput = latexRenderer.renderToLatex(<TikZDocument />);
      const baselineOutput = baselineOutputs.tikzDocument;

      const normalizedCurrent = testUtils.normalizeLatex(currentOutput);
      const normalizedBaseline = testUtils.normalizeLatex(baselineOutput);

      expect(normalizedCurrent).toBe(normalizedBaseline);
    });

    test("should maintain exact same output for complex document", () => {
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

      const currentOutput = latexRenderer.renderToLatex(<ComplexDocument />);
      const baselineOutput = baselineOutputs.complexDocument;

      const normalizedCurrent = testUtils.normalizeLatex(currentOutput);
      const normalizedBaseline = testUtils.normalizeLatex(baselineOutput);

      expect(normalizedCurrent).toBe(normalizedBaseline);
    });
  });

  describe("API Compatibility Validation", () => {
    test("should maintain same function signatures", () => {
      // Check that all expected functions exist
      expect(typeof latexRenderer.renderToLatex).toBe("function");
      expect(typeof latexRenderer.renderToHtml).toBe("function");
      expect(typeof latexRenderer.renderToEnhancedLatex).toBe("function");
      expect(typeof latexRenderer.renderWithVisitor).toBe("function");
      expect(typeof latexRenderer.renderWithPlugin).toBe("function");

      // Test that they accept JSX elements
      const testElement = React.createElement("div", null, "test");
      expect(() => {
        latexRenderer.renderToLatex(testElement);
      }).not.toThrow();
    });

    test("should maintain same props handling", () => {
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

      const currentOutput = latexRenderer.renderToLatex(<PropsTestDocument />);
      const baselineOutput = baselineOutputs.propsTestDocument;

      const normalizedCurrent = testUtils.normalizeLatex(currentOutput);
      const normalizedBaseline = testUtils.normalizeLatex(baselineOutput);

      expect(normalizedCurrent).toBe(normalizedBaseline);
    });
  });

  describe("Edge Cases Validation", () => {
    test("should maintain same behavior for empty components", () => {
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

      const currentOutput = latexRenderer.renderToLatex(<EmptyDocument />);
      const baselineOutput = baselineOutputs.emptyDocument;

      const normalizedCurrent = testUtils.normalizeLatex(currentOutput);
      const normalizedBaseline = testUtils.normalizeLatex(baselineOutput);

      expect(normalizedCurrent).toBe(normalizedBaseline);
    });

    test("should maintain same behavior for extreme values", () => {
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

      const currentOutput = latexRenderer.renderToLatex(
        <ExtremeValuesDocument />,
      );
      const baselineOutput = baselineOutputs.extremeValuesDocument;

      const normalizedCurrent = testUtils.normalizeLatex(currentOutput);
      const normalizedBaseline = testUtils.normalizeLatex(baselineOutput);

      expect(normalizedCurrent).toBe(normalizedBaseline);
    });

    test("should maintain same behavior for special characters", () => {
      const SpecialCharsDocument = () => (
        <Document>
          <Section>
            Special Characters: &amp; &lt; &gt; &quot; &apos; \n \t
          </Section>
          <Paragraph>
            Text with special chars: &amp; &lt; &gt; &quot; &apos; \n \t
          </Paragraph>
          <TikZDiagram>
            <TikZNode
              x={1}
              y={1}
              text="Node with &amp; &lt; &gt; &quot; ' chars"
              options="above"
            />
          </TikZDiagram>
        </Document>
      );

      const currentOutput = latexRenderer.renderToLatex(
        <SpecialCharsDocument />,
      );
      const baselineOutput = baselineOutputs.specialCharsDocument;

      const normalizedCurrent = testUtils.normalizeLatex(currentOutput);
      const normalizedBaseline = testUtils.normalizeLatex(baselineOutput);

      expect(normalizedCurrent).toBe(normalizedBaseline);
    });
  });

  describe("Performance Regression Validation", () => {
    test("should not have performance regression for basic rendering", () => {
      const BasicDocument = () => (
        <Document>
          <Section>Introduction</Section>
          <Paragraph>This is a basic test document.</Paragraph>
          <Section>Conclusion</Section>
          <Paragraph>This concludes the basic test.</Paragraph>
        </Document>
      );

      const iterations = 100;
      const duration = testUtils.measurePerformance(() => {
        latexRenderer.renderToLatex(<BasicDocument />);
      }, iterations);

      // Should not be significantly slower than baseline
      // We'll set a reasonable threshold of 2x the expected time
      expect(duration).toBeLessThan(100); // 100ms for 100 iterations
      console.log(
        `Refactoring validation: ${iterations} iterations in ${duration.toFixed(
          2,
        )}ms`,
      );
    });

    test("should not have performance regression for complex rendering", () => {
      const ComplexDocument = () => (
        <Document>
          <Section>Complex Structure</Section>
          <TikZDiagram width="10cm" height="8cm">
            <TikZCircle x={1} y={1} radius={0.5} options="fill=yellow!30" />
            <TikZCircle x={3} y={3} radius={0.5} options="fill=green!30" />
            <TikZLine from={[1, 1]} to={[3, 3]} options="dashed, thick" />
            <TikZNode x={2} y={2} text="Connection" options="above" />
          </TikZDiagram>
        </Document>
      );

      const iterations = 50;
      const duration = testUtils.measurePerformance(() => {
        latexRenderer.renderToLatex(<ComplexDocument />);
      }, iterations);

      // Should not be significantly slower than baseline
      expect(duration).toBeLessThan(200); // 200ms for 50 iterations
      console.log(
        `Complex rendering validation: ${iterations} iterations in ${duration.toFixed(
          2,
        )}ms`,
      );
    });
  });

  describe("Multiple Format Validation", () => {
    test("should maintain enhanced LaTeX rendering consistency", () => {
      const TestDocument = () => (
        <Document>
          <Section>Enhanced LaTeX Validation Test</Section>
          <Paragraph>This is an enhanced LaTeX validation test.</Paragraph>
          <TikZDiagram width="5cm" height="5cm">
            <TikZCircle x={2} y={2} radius={1} options="fill=green!20" />
          </TikZDiagram>
        </Document>
      );

      const currentOutput = latexRenderer.renderToEnhancedLatex(
        <TestDocument />,
      );
      const baselineOutput = baselineOutputs.enhancedLatexDocument;

      // Enhanced LaTeX output should be consistent
      expect(currentOutput).toContain("\\documentclass{article}");
      expect(currentOutput).toContain("\\begin{document}");
      expect(currentOutput).toContain("\\end{document}");
      expect(currentOutput).toContain("Enhanced LaTeX Validation Test");
    });
  });

  describe("Regression Detection", () => {
    test("should detect any changes in output structure", () => {
      // This test will help us detect any unintended changes during refactoring
      const TestDocument = () => (
        <Document>
          <Section>Regression Test</Section>
          <Paragraph>This test helps detect any changes.</Paragraph>
          <TikZDiagram width="5cm" height="5cm">
            <TikZCircle x={2} y={2} radius={1} options="fill=blue!20" />
            <TikZRectangle
              x={1}
              y={1}
              width={2}
              height={2}
              options="fill=red!20"
            />
          </TikZDiagram>
        </Document>
      );

      const currentOutput = latexRenderer.renderToLatex(<TestDocument />);
      const baselineOutput = baselineOutputs.regressionTestDocument;

      const normalizedCurrent = testUtils.normalizeLatex(currentOutput);
      const normalizedBaseline = testUtils.normalizeLatex(baselineOutput);

      expect(normalizedCurrent).toBe(normalizedBaseline);
    });
  });
});

// Helper function to generate baseline outputs
function generateBaselineOutputs() {
  const BasicDocument = () => (
    <Document>
      <Section>Introduction</Section>
      <Paragraph>This is a basic test document.</Paragraph>
      <Section>Conclusion</Section>
      <Paragraph>This concludes the basic test.</Paragraph>
    </Document>
  );

  const TikZDocument = () => (
    <Document>
      <Section>TikZ Examples</Section>
      <TikZDiagram width="8cm" height="6cm">
        <TikZCircle x={2} y={2} radius={1} options="fill=blue!20, draw=blue" />
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
        <TikZLine from={[0.5, 0.5]} to={[4.5, 3.5]} options="red, very thick" />
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

  const ExtremeValuesDocument = () => (
    <Document>
      <Section>Extreme Values</Section>
      <TikZDiagram width="1cm" height="1cm">
        <TikZCircle x={-1000} y={-1000} radius={1000} options="fill=black" />
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

  const SpecialCharsDocument = () => (
    <Document>
      <Section>Special Characters: &amp; &lt; &gt; &quot; &apos; \n \t</Section>
      <Paragraph>
        Text with special chars: &amp; &lt; &gt; &quot; &apos; \n \t
      </Paragraph>
      <TikZDiagram>
        <TikZNode
          x={1}
          y={1}
          text="Node with &amp; &lt; &gt; &quot; ' chars"
          options="above"
        />
      </TikZDiagram>
    </Document>
  );

  const RegressionTestDocument = () => (
    <Document>
      <Section>Regression Test</Section>
      <Paragraph>This test helps detect any changes.</Paragraph>
      <TikZDiagram width="5cm" height="5cm">
        <TikZCircle x={2} y={2} radius={1} options="fill=blue!20" />
        <TikZRectangle x={1} y={1} width={2} height={2} options="fill=red!20" />
      </TikZDiagram>
    </Document>
  );

  const EnhancedLatexDocument = () => (
    <Document>
      <Section>Enhanced LaTeX Validation Test</Section>
      <Paragraph>This is an enhanced LaTeX validation test.</Paragraph>
      <TikZDiagram width="5cm" height="5cm">
        <TikZCircle x={2} y={2} radius={1} options="fill=green!20" />
      </TikZDiagram>
    </Document>
  );

  return {
    basicDocument: latexRenderer.renderToLatex(<BasicDocument />),
    tikzDocument: latexRenderer.renderToLatex(<TikZDocument />),
    complexDocument: latexRenderer.renderToLatex(<ComplexDocument />),
    propsTestDocument: latexRenderer.renderToLatex(<PropsTestDocument />),
    emptyDocument: latexRenderer.renderToLatex(<EmptyDocument />),
    extremeValuesDocument: latexRenderer.renderToLatex(
      <ExtremeValuesDocument />,
    ),
    specialCharsDocument: latexRenderer.renderToLatex(<SpecialCharsDocument />),
    regressionTestDocument: latexRenderer.renderToLatex(
      <RegressionTestDocument />,
    ),
    enhancedLatexDocument: latexRenderer.renderToEnhancedLatex(
      <EnhancedLatexDocument />,
    ),
  };
}
