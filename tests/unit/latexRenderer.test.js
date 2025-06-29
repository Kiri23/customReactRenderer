const React = require("react");
const Reconciler = require("react-reconciler");

// Import existing components
const {
  TikZDiagram,
  TikZCircle,
  TikZRectangle,
} = require("../../components/TikZComponents");
const {
  Document,
  Section,
  Paragraph,
} = require("../../components/LatexComponents");

// Import the existing latexRenderer
const latexRenderer = require("../../latexRenderer");

describe("latexRenderer - Unit Tests", () => {
  let hostConfig;
  let LatexRenderer;

  beforeEach(() => {
    // Extract hostConfig from the existing latexRenderer
    hostConfig = {
      now: Date.now,
      getRootHostContext: () => ({}),
      getChildHostContext: () => ({}),
      prepareForCommit: () => {},
      resetAfterCommit: () => {},
      createInstance(type, props) {
        return { type, props, children: [] };
      },
      appendInitialChild(parent, child) {
        parent.children.push(child);
      },
      appendChild(parent, child) {
        parent.children.push(child);
      },
      appendChildToContainer(container, child) {
        container.children.push(child);
      },
      createTextInstance(text) {
        return text;
      },
      finalizeInitialChildren() {
        return false;
      },
      supportsMutation: true,
      prepareUpdate() {
        return true;
      },
      commitUpdate(instance, updatePayload, type, oldProps, newProps) {
        instance.props = newProps;
      },
      commitTextUpdate(textInstance, oldText, newText) {
        // Not needed for this simple renderer
      },
      removeChild(parentInstance, child) {
        parentInstance.children = parentInstance.children.filter(
          (c) => c !== child,
        );
      },
      removeChildFromContainer(container, child) {
        container.children = container.children.filter((c) => c !== child);
      },
      shouldSetTextContent(type, props) {
        return false;
      },
      getPublicInstance(instance) {
        return instance;
      },
      clearContainer(container) {
        container.children = [];
      },
      insertBefore(parentInstance, child, beforeChild) {
        const index = parentInstance.children.indexOf(beforeChild);
        parentInstance.children.splice(index, 0, child);
      },
      insertInContainerBefore(container, child, beforeChild) {
        const index = container.children.indexOf(beforeChild);
        container.children.splice(index, 0, child);
      },
      hideInstance(instance) {
        // Not needed for LaTeX renderer
      },
      hideTextInstance(textInstance) {
        // Not needed for LaTeX renderer
      },
      unhideInstance(instance, props) {
        // Not needed for LaTeX renderer
      },
      unhideTextInstance(textInstance, text) {
        // Not needed for LaTeX renderer
      },
      scheduleTimeout: setTimeout,
      cancelTimeout: clearTimeout,
      noTimeout: -1,
      isPrimaryRenderer: true,
      supportsPersistence: false,
      supportsHydration: false,
      getCurrentEventPriority: () => 0,
      getInstanceFromNode: () => null,
      beforeActiveInstanceBlur: () => {},
      afterActiveInstanceBlur: () => {},
      preparePortalMount: () => {},
      scheduleMicrotask: queueMicrotask,
      supportsMicrotasks: true,
    };

    LatexRenderer = Reconciler(hostConfig);
  });

  describe("API Exports", () => {
    test("should export renderToLatex function", () => {
      expect(typeof latexRenderer.renderToLatex).toBe("function");
    });

    test("should export renderToHtml function", () => {
      expect(typeof latexRenderer.renderToHtml).toBe("function");
    });

    test("should export renderToEnhancedLatex function", () => {
      expect(typeof latexRenderer.renderToEnhancedLatex).toBe("function");
    });

    test("should export renderWithVisitor function", () => {
      expect(typeof latexRenderer.renderWithVisitor).toBe("function");
    });

    test("should export renderWithPlugin function", () => {
      expect(typeof latexRenderer.renderWithPlugin).toBe("function");
    });

    test("should export plugin management functions", () => {
      expect(typeof latexRenderer.registerPlugin).toBe("function");
      expect(typeof latexRenderer.getAvailableVisitors).toBe("function");
      expect(typeof latexRenderer.listPlugins).toBe("function");
    });
  });

  describe("Host Config", () => {
    test("should create instances correctly", () => {
      const instance = hostConfig.createInstance("test", { prop: "value" });
      expect(instance).toEqual({
        type: "test",
        props: { prop: "value" },
        children: [],
      });
    });

    test("should append children correctly", () => {
      const parent = { children: [] };
      const child = { type: "child" };
      hostConfig.appendChild(parent, child);
      expect(parent.children).toContain(child);
    });

    test("should create text instances", () => {
      const text = hostConfig.createTextInstance("Hello World");
      expect(text).toBe("Hello World");
    });
  });

  describe("Container Operations", () => {
    test("should create and update container", () => {
      const container = { children: [] };
      const node = LatexRenderer.createContainer(container, 0, false, null);

      const testElement = React.createElement("div", null, "Hello");
      LatexRenderer.updateContainer(testElement, node, null, null);

      expect(container.children).toHaveLength(1);
    });

    test("should handle empty elements", () => {
      const container = { children: [] };
      const node = LatexRenderer.createContainer(container, 0, false, null);

      const emptyElement = React.createElement("div", null);
      LatexRenderer.updateContainer(emptyElement, node, null, null);

      expect(container.children).toHaveLength(1);
    });
  });

  describe("LaTeX Rendering", () => {
    test("should render basic document structure", () => {
      const element = React.createElement(
        Document,
        null,
        React.createElement(Section, null, "Test Section"),
        React.createElement(Paragraph, null, "Test paragraph"),
      );

      const output = latexRenderer.renderToLatex(element);

      // Validate LaTeX structure
      expect(output).toContain("\\documentclass{article}");
      expect(output).toContain("\\begin{document}");
      expect(output).toContain("\\end{document}");
    });

    test("should render TikZ components", () => {
      const element = React.createElement(
        TikZDiagram,
        null,
        React.createElement(TikZCircle, {
          x: 2,
          y: 2,
          radius: 1,
          options: "fill=blue!20, draw=blue",
        }),
        React.createElement(TikZRectangle, {
          x: 4,
          y: 4,
          width: 1.5,
          height: 1,
          options: "fill=red!20, draw=red",
        }),
      );

      const output = latexRenderer.renderToLatex(element);

      // Validate only the TikZ diagram content
      expect(output).toContain("\\begin{tikzpicture}");
      expect(output).toContain(
        "\\draw[fill=blue!20, draw=blue] (2,2) circle (1cm);",
      );
      expect(output).toContain(
        "\\draw[fill=red!20, draw=red] (4,4) rectangle (5.5,5);",
      );
      expect(output).toContain("\\end{tikzpicture}");
    });
  });

  describe("Enhanced LaTeX Rendering", () => {
    test("should render enhanced LaTeX format", () => {
      const element = React.createElement(
        Document,
        null,
        React.createElement(Section, null, "Test Section"),
        React.createElement(Paragraph, null, "Test paragraph"),
      );

      const output = latexRenderer.renderToEnhancedLatex(element);

      // Validate enhanced LaTeX structure
      expect(output).toContain("\\documentclass{article}");
      expect(output).toContain("\\begin{document}");
      expect(output).toContain("\\end{document}");
    });
  });

  describe("Component Props", () => {
    test("should preserve component props", () => {
      const props = { x: 10, y: 20, radius: 5, options: "fill=red" };
      const element = React.createElement(TikZCircle, props);

      const output = latexRenderer.renderToLatex(element);

      // Should contain the props in the output
      expect(output).toContain("\\draw[fill=red] (10,20) circle (5cm);");
    });
  });

  describe("Text Handling", () => {
    test("should handle text nodes", () => {
      const element = React.createElement("div", null, "Hello World");

      const output = latexRenderer.renderToLatex(element);

      // Should contain the text content
      expect(output).toContain("Hello World");
    });

    test("should handle multiple text nodes", () => {
      const element = React.createElement("div", null, "Hello", " ", "World");

      const output = latexRenderer.renderToLatex(element);

      // Should contain all text content
      expect(output).toContain("Hello World");
    });
  });

  describe("Nested Components", () => {
    test("should handle deeply nested components", () => {
      const element = React.createElement(
        Document,
        null,
        React.createElement(
          Section,
          null,
          "Section 1",
          React.createElement(
            Paragraph,
            null,
            "Paragraph 1",
            React.createElement("span", null, "Nested text"),
          ),
        ),
      );

      const output = latexRenderer.renderToLatex(element);

      // Should generate valid LaTeX
      expect(output).toContain("\\documentclass{article}");
      expect(output).toContain("\\begin{document}");
      expect(output).toContain("\\end{document}");
      expect(output).toContain("Section 1");
      expect(output).toContain("Paragraph 1");
      expect(output).toContain("Nested text");
    });
  });

  describe("Plugin System", () => {
    test("should have plugin manager available", () => {
      expect(latexRenderer.pluginManager).toBeDefined();
      expect(typeof latexRenderer.pluginManager.registerPlugin).toBe(
        "function",
      );
    });

    test("should list available visitors", () => {
      const visitors = latexRenderer.getAvailableVisitors();
      expect(Array.isArray(visitors)).toBe(true);
    });

    test("should list plugins", () => {
      const plugins = latexRenderer.listPlugins();
      expect(Array.isArray(plugins)).toBe(true);
    });
  });

  describe("TikZExamplesDocument Content Validation", () => {
    test("should render GeometricShapesExample with correct TikZ commands", () => {
      const TikZExamplesDocument = require("../../examples/TikZExamples");
      const output = latexRenderer.renderToLatex(<TikZExamplesDocument />);

      // Validate Geometric Shapes section
      expect(output).toContain("\\section{Geometric Shapes}");
      expect(output).toContain(
        "This section demonstrates basic TikZ geometric shapes.",
      );

      // Validate TikZ commands for geometric shapes
      expect(output).toContain("\\draw[gray!30][step=1cm] (0,0) grid (6,6);");
      expect(output).toContain(
        "\\draw[fill=blue!20, draw=blue] (2,2) circle (1cm);",
      );
      expect(output).toContain(
        "\\draw[fill=red!20, draw=red] (4,4) rectangle (5.5,5);",
      );
      expect(output).toContain("\\draw[thick, green] (1,1) -- (5,5);");
      expect(output).toContain("\\draw[->, thick, purple] (1,5) -- (5,1);");

      // Validate node labels
      expect(output).toContain("\\node[above] at (2,3.5) {Circle};");
      expect(output).toContain("\\node[above] at (4.75,4.5) {Rectangle};");
      expect(output).toContain("\\node[above] at (3,3) {Line};");
      expect(output).toContain("\\node[below] at (3,3) {Arrow};");
    });

    test("should render FlowchartExample with correct flowchart elements", () => {
      const TikZExamplesDocument = require("../../examples/TikZExamples");
      const output = latexRenderer.renderToLatex(<TikZExamplesDocument />);

      // Validate Flowchart section
      expect(output).toContain("\\section{Flowchart Example}");
      expect(output).toContain(
        "This section shows a simple flowchart created with TikZ.",
      );

      // Validate flowchart nodes
      expect(output).toContain(
        "\\node[fill=green!20][circle, draw] at (0,0) {Start};",
      );
      expect(output).toContain(
        "\\node[fill=blue!20][rectangle, draw] at (0,-2) {Process};",
      );
      expect(output).toContain(
        "\\node[fill=yellow!20][diamond, draw] at (0,-4) {Decision};",
      );
      expect(output).toContain(
        "\\node[fill=green!20][rectangle, draw] at (3,-4) {Yes};",
      );
      expect(output).toContain(
        "\\node[fill=red!20][rectangle, draw] at (-3,-4) {No};",
      );
      expect(output).toContain(
        "\\node[fill=red!20][circle, draw] at (0,-6) {End};",
      );

      // Validate flowchart arrows
      expect(output).toContain("\\draw[->] (0,-0.5) -- (0,-1.5);");
      expect(output).toContain("\\draw[->] (0,-2.5) -- (0,-3.5);");
      expect(output).toContain("\\draw[->] (0.5,-4) -- (2.5,-4);");
      expect(output).toContain("\\draw[->] (-0.5,-4) -- (-2.5,-4);");
      expect(output).toContain("\\draw[->] (0,-4.5) -- (0,-5.5);");
    });

    test("should render MathematicalDiagramExample with correct mathematical elements", () => {
      const TikZExamplesDocument = require("../../examples/TikZExamples");
      const output = latexRenderer.renderToLatex(<TikZExamplesDocument />);

      // Validate Mathematical Diagram section
      expect(output).toContain("\\section{Mathematical Diagram}");
      expect(output).toContain(
        "This section demonstrates a mathematical diagram with axes and functions.",
      );

      // Validate axes
      expect(output).toContain(
        "\\draw [->] (-3,0) -- (3,0) node[right] {$x$};",
      );
      expect(output).toContain(
        "\\draw [->] (0,-3) -- (0,3) node[above] {$y$};",
      );

      // Validate grid
      expect(output).toContain(
        "\\draw[gray!20][step=0.5cm] (-3,-3) grid (3,3);",
      );

      // Validate function lines (parabola segments)
      expect(output).toContain("\\draw[thick, blue] (-2,4) -- (-1.5,2.25);");
      expect(output).toContain("\\draw[thick, blue] (-1.5,2.25) -- (-1,1);");
      expect(output).toContain("\\draw[thick, blue] (-1,1) -- (-0.5,0.25);");
      expect(output).toContain("\\draw[thick, blue] (-0.5,0.25) -- (0,0);");
      expect(output).toContain("\\draw[thick, blue] (0,0) -- (0.5,0.25);");
      expect(output).toContain("\\draw[thick, blue] (0.5,0.25) -- (1,1);");
      expect(output).toContain("\\draw[thick, blue] (1,1) -- (1.5,2.25);");
      expect(output).toContain("\\draw[thick, blue] (1.5,2.25) -- (2,4);");

      // Validate points
      expect(output).toContain("\\draw[fill=red] (0,0) circle (0.05cm);");
      expect(output).toContain("\\draw[fill=red] (1,1) circle (0.05cm);");
      expect(output).toContain("\\draw[fill=red] (-1,1) circle (0.05cm);");

      // Validate mathematical labels
      expect(output).toContain("\\node[blue] at (2.5,3.5) {$f(x) = x^2$};");
      expect(output).toContain("\\node[red] at (0.2,0.2) {$(0,0)$};");
      expect(output).toContain("\\node[red] at (1.2,1.2) {$(1,1)$};");
      expect(output).toContain("\\node[red] at (-1.2,1.2) {$(-1,1)$};");
    });

    test("should render CircuitDiagramExample with correct circuit elements", () => {
      const TikZExamplesDocument = require("../../examples/TikZExamples");
      const output = latexRenderer.renderToLatex(<TikZExamplesDocument />);

      // Validate Circuit Diagram section
      expect(output).toContain("\\section{Simple Circuit Diagram}");
      expect(output).toContain(
        "This section shows a simple electrical circuit diagram.",
      );

      // Validate circuit components
      expect(output).toContain("\\draw[thick] (0,0) -- (0,1);");
      expect(output).toContain("\\draw[thick] (0.5,0) -- (0.5,1);");
      expect(output).toContain("\\draw[thick] (0,0.5) -- (0.5,0.5);");

      // Validate resistor (zigzag pattern)
      expect(output).toContain("\\draw[thick] (1,0.5) -- (1.5,0.5);");
      expect(output).toContain("\\draw[thick] (1.5,0.5) -- (1.5,0.3);");
      expect(output).toContain("\\draw[thick] (1.5,0.3) -- (2,0.3);");
      expect(output).toContain("\\draw[thick] (2,0.3) -- (2,0.5);");
      expect(output).toContain("\\draw[thick] (2,0.5) -- (2.5,0.5);");

      // Validate LED
      expect(output).toContain(
        "\\draw[fill=yellow!20, draw=black] (3,0.5) circle (0.3cm);",
      );

      // Validate circuit completion
      expect(output).toContain("\\draw[thick] (2.5,0.5) -- (2.7,0.5);");
      expect(output).toContain("\\draw[thick] (3.3,0.5) -- (3.5,0.5);");
      expect(output).toContain("\\draw[thick] (3.5,0.5) -- (4,0.5);");
      expect(output).toContain("\\draw[thick] (4,0.5) -- (4,0);");
      expect(output).toContain("\\draw[thick] (4,0) -- (0,0);");

      // Validate component labels
      expect(output).toContain("\\node[above] at (0.25,1.5) {Battery};");
      expect(output).toContain("\\node[above] at (1.75,1.5) {Resistor};");
      expect(output).toContain("\\node[above] at (3,1.5) {LED};");
    });

    test("should render complete document structure with all sections", () => {
      const TikZExamplesDocument = require("../../examples/TikZExamples");
      const output = latexRenderer.renderToLatex(<TikZExamplesDocument />);

      // Validate document structure
      expect(output).toContain("\\documentclass{article}");
      expect(output).toContain("\\usepackage{amsmath}");
      expect(output).toContain("\\usepackage{amsfonts}");
      expect(output).toContain("\\usepackage{amssymb}");
      expect(output).toContain("\\usepackage{graphicx}");
      expect(output).toContain("\\usepackage{tikz}");
      expect(output).toContain("\\usepackage{pgfplots}");
      expect(output).toContain("\\pgfplotsset{compat=1.18}");
      expect(output).toContain("\\begin{document}");
      expect(output).toContain("\\end{document}");

      // Validate main title
      expect(output).toContain("\\section{TikZ Diagrams Examples}");
      expect(output).toContain(
        "This document demonstrates various TikZ diagrams that can be rendered in Overleaf.",
      );

      // Validate all sections are present
      expect(output).toContain("\\section{Geometric Shapes}");
      expect(output).toContain("\\section{Flowchart Example}");
      expect(output).toContain("\\section{Mathematical Diagram}");
      expect(output).toContain("\\section{Simple Circuit Diagram}");
    });
  });
});
