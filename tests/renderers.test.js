const React = require("react");
const { ReactLatex, ReactMarkdown, ReactCustom } = require("../src");
const {
  Document,
  Section,
  Subsection,
  Paragraph,
  Bold,
  Italic,
  Underline,
  Math,
  DisplayMath,
  Equation,
  Itemize,
  Enumerate,
  Item,
  Table,
  Tabular,
  Tr,
  Td,
  P,
  Div,
  Span,
  CustomSection,
  UnknownElement,
} = require("./test-helpers");

describe("ReactLatex", () => {
  test("should render basic LaTeX document", () => {
    const MyDocument = () => (
      <Document>
        <Section>Test Section</Section>
        <Paragraph>
          Test paragraph with <Bold>bold text</Bold>.
        </Paragraph>
      </Document>
    );

    const result = ReactLatex.render(<MyDocument />);

    expect(result).toContain("\\documentclass{article}");
    expect(result).toContain("\\section{Test Section}");
    expect(result).toContain("\\textbf{bold text}");
  });

  test("should handle custom mapping", () => {
    const MyDocument = () => (
      <Document>
        <CustomSection>Custom Section</CustomSection>
      </Document>
    );

    const result = ReactLatex.render(<MyDocument />, "basic", {
      CustomSection: "section",
    });

    expect(result).toContain("\\section{Custom Section}");
  });
});

describe("ReactMarkdown", () => {
  test("should render basic Markdown document", () => {
    const MyDocument = () => (
      <Document>
        <Section>Test Section</Section>
        <Paragraph>
          Test paragraph with <Bold>bold text</Bold>.
        </Paragraph>
      </Document>
    );

    const result = ReactMarkdown.render(<MyDocument />);

    expect(result).toContain("# Test Section");
    expect(result).toContain("**bold text**");
  });

  test("should handle custom mapping", () => {
    const MyDocument = () => (
      <Document>
        <CustomSection>Custom Section</CustomSection>
      </Document>
    );

    const result = ReactMarkdown.render(<MyDocument />, "basic", {
      CustomSection: "section",
    });

    expect(result).toContain("# Custom Section");
  });
});

describe("ReactCustom", () => {
  test("should render with custom templates", () => {
    const MyDocument = () => (
      <Document>
        <Section>Test Section</Section>
        <Paragraph>Test paragraph</Paragraph>
      </Document>
    );

    const result = ReactCustom.render(<MyDocument />, {
      templates: {
        document: (props, children) => `DOCUMENT: ${children.join("")}`,
        section: (props, children) => `SECTION: ${children[0]}`,
        paragraph: (props, children) => `PARAGRAPH: ${children.join("")}`,
      },
      mapping: {
        Document: "document",
        Section: "section",
        Paragraph: "paragraph",
      },
    });

    expect(result).toContain("DOCUMENT:");
    expect(result).toContain("SECTION: Test Section");
    expect(result).toContain("PARAGRAPH: Test paragraph");
  });

  test("should warn for missing mapping", () => {
    const consoleSpy = jest.spyOn(console, "warn").mockImplementation();

    const MyDocument = () => (
      <Document>
        <UnknownElement>Test</UnknownElement>
      </Document>
    );

    ReactCustom.render(<MyDocument />, {
      templates: {
        document: (props, children) => children.join(""),
      },
      mapping: {
        Document: "document",
      },
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      "No mapping found for element type: UnknownElement",
    );
    consoleSpy.mockRestore();
  });

  test("should warn for missing template", () => {
    const consoleSpy = jest.spyOn(console, "warn").mockImplementation();

    const MyDocument = () => (
      <Document>
        <Section>Test</Section>
      </Document>
    );

    ReactCustom.render(<MyDocument />, {
      templates: {
        document: (props, children) => children.join(""),
      },
      mapping: {
        Document: "document",
        Section: "missing-template",
      },
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      "No template found for: missing-template",
    );
    consoleSpy.mockRestore();
  });
});
