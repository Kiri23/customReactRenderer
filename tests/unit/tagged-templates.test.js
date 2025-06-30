const React = require("react");
const {
  Document,
  Section,
  Paragraph,
  Bold,
  Italic,
  Math,
  TikZCircle,
  latex,
} = require("../../components/LatexComponents");
const { renderToLatex } = require("../../latexRenderer");

describe("Tagged Templates LaTeX Components", () => {
  test("should create components as functions", () => {
    expect(typeof Document).toBe("function");
    expect(typeof Section).toBe("function");
  });

  test("should render basic components correctly", () => {
    const element = React.createElement(Bold, null, "Hello World");
    const result = renderToLatex(element);
    expect(result).toBe("\\textbf{Hello World}");
  });

  test("should render nested components correctly", () => {
    const element = React.createElement(
      Paragraph,
      null,
      "This is ",
      React.createElement(Bold, null, "bold"),
      " and ",
      React.createElement(Italic, null, "italic"),
      " text.",
    );
    const result = renderToLatex(element);
    expect(result).toContain("\\textbf{bold}");
    expect(result).toContain("\\textit{italic}");
  });

  test("should render TikZ components with props", () => {
    const element = React.createElement(TikZCircle, {
      x: 2,
      y: 3,
      radius: 1.5,
      options: "fill=blue",
    });
    const result = renderToLatex(element);
    expect(result).toBe("\\draw[fill=blue] (2,3) circle (1.5cm);\n");
  });

  test("should render complex document structure", () => {
    const element = React.createElement(
      Document,
      null,
      React.createElement(
        Section,
        { title: "Test Section" },
        React.createElement(
          Paragraph,
          null,
          "This is a test with ",
          React.createElement(Math, null, "E = mc^2"),
          " equation.",
        ),
      ),
    );
    const result = renderToLatex(element);
    expect(result).toContain("\\documentclass{article}");
    expect(result).toContain("\\section{Test Section}");
    expect(result).toContain("$E = mc^2$");
  });

  test("should handle custom latex tagged template", () => {
    const CustomComponent = latex`
      \\customcommand{${(props) => props.value}}
      ${(props) => props.children}
    `;

    const element = React.createElement(
      CustomComponent,
      { value: "test" },
      "content",
    );

    expect(typeof CustomComponent).toBe("function");

    const result = renderToLatex(element);
    expect(result).toContain("\\customcommand{test}");
    expect(result).toContain("content");
  });

  test("should handle optional props correctly", () => {
    const element = React.createElement(TikZCircle, {
      x: 1,
      y: 1,
      radius: 1,
      // options is optional
    });
    const result = renderToLatex(element);
    expect(result).toBe("\\draw (1,1) circle (1cm);\n");
  });

  test("should handle empty children", () => {
    const element = React.createElement(Bold, null);
    const result = renderToLatex(element);
    expect(result).toBe("\\textbf{}");
  });
});
