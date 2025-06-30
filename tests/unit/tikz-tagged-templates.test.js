const React = require("react");
const {
  TikZCircle,
  TikZRectangle,
  TikZLine,
  TikZArrow,
  TikZNode,
  TikZGrid,
  TikZAxis,
  TikZDiagram,
  TikZFlowchartNode,
  TikZFlowchartArrow,
} = require("../../components/TikZComponents");
const { ReactLatexVisitor } = require("../../src/renderers/ReactLatex");

describe("TikZ Components with Tagged Templates", () => {
  test("should render TikZCircle correctly", () => {
    const element = React.createElement(TikZCircle, {
      x: 2,
      y: 3,
      radius: 1.5,
      options: "fill=blue",
    });
    const result = ReactLatexVisitor(element);
    expect(result).toBe("\\draw[fill=blue] (2,3) circle (1.5cm);\n");
  });

  test("should render TikZRectangle correctly", () => {
    const element = React.createElement(TikZRectangle, {
      x: 1,
      y: 1,
      width: 2,
      height: 1,
      options: "fill=red!20",
    });
    const result = ReactLatexVisitor(element);
    expect(result).toBe("\\draw[fill=red!20] (1,1) rectangle (3,2);\n");
  });

  test("should render TikZLine correctly", () => {
    const element = React.createElement(TikZLine, {
      from: [0, 0],
      to: [3, 4],
      options: "thick, blue",
    });
    const result = ReactLatexVisitor(element);
    expect(result).toBe("\\draw[thick, blue] (0,0) -- (3,4);\n");
  });

  test("should render TikZArrow correctly", () => {
    const element = React.createElement(TikZArrow, {
      from: [1, 1],
      to: [4, 4],
      options: "->, thick",
    });
    const result = ReactLatexVisitor(element);
    expect(result).toBe("\\draw[->, thick] (1,1) -- (4,4);\n");
  });

  test("should render TikZNode correctly", () => {
    const element = React.createElement(TikZNode, {
      x: 2,
      y: 3,
      text: "Test Node",
      options: "above",
    });
    const result = ReactLatexVisitor(element);
    expect(result).toBe("\\node[above] at (2,3) {Test Node};\n");
  });

  test("should render TikZGrid correctly", () => {
    const element = React.createElement(TikZGrid, {
      xmin: 0,
      ymin: 0,
      xmax: 5,
      ymax: 5,
      step: 1,
      options: "gray!30",
    });
    const result = ReactLatexVisitor(element);
    expect(result).toBe("\\draw[gray!30][step=1cm] (0,0) grid (5,5);\n");
  });

  test("should render TikZAxis correctly", () => {
    const element = React.createElement(TikZAxis, {
      xmin: -3,
      ymin: -3,
      xmax: 3,
      ymax: 3,
    });
    const result = ReactLatexVisitor(element);
    expect(result).toContain("\\draw [->] (-3,0) -- (3,0) node[right] {$x$};");
    expect(result).toContain("\\draw [->] (0,-3) -- (0,3) node[above] {$y$};");
  });

  test("should render TikZDiagram with children", () => {
    const element = React.createElement(
      TikZDiagram,
      { width: "10cm", height: "8cm" },
      React.createElement(TikZCircle, { x: 2, y: 2, radius: 1 }),
      React.createElement(TikZLine, { from: [0, 0], to: [4, 4] }),
    );
    const result = ReactLatexVisitor(element);
    expect(result).toContain("\\begin{figure}[h]");
    expect(result).toContain("\\begin{tikzpicture}[scale=1]");
    expect(result).toContain("\\draw (2,2) circle (1cm);");
    expect(result).toContain("\\draw (0,0) -- (4,4);");
    expect(result).toContain("\\end{tikzpicture}");
    expect(result).toContain("\\end{figure}");
  });

  test("should render TikZFlowchartNode with different shapes", () => {
    const circleElement = React.createElement(TikZFlowchartNode, {
      x: 0,
      y: 0,
      text: "Start",
      shape: "circle",
      options: "fill=green!20",
    });
    const circleResult = ReactLatexVisitor(circleElement);
    expect(circleResult).toBe(
      "\\node[fill=green!20][circle, draw] at (0,0) {Start};\n",
    );

    const diamondElement = React.createElement(TikZFlowchartNode, {
      x: 2,
      y: 2,
      text: "Decision",
      shape: "diamond",
      options: "fill=yellow!20",
    });
    const diamondResult = ReactLatexVisitor(diamondElement);
    expect(diamondResult).toBe(
      "\\node[fill=yellow!20][diamond, draw] at (2,2) {Decision};\n",
    );
  });

  test("should render TikZFlowchartArrow correctly", () => {
    const element = React.createElement(TikZFlowchartArrow, {
      from: [0, 0],
      to: [2, 2],
      options: "->, thick",
    });
    const result = ReactLatexVisitor(element);
    expect(result).toBe("\\draw[->, thick] (0,0) -- (2,2);\n");
  });

  test("should handle optional props correctly", () => {
    const element = React.createElement(TikZCircle, {
      x: 1,
      y: 1,
      radius: 1,
      // options is optional
    });
    const result = ReactLatexVisitor(element);
    expect(result).toBe("\\draw (1,1) circle (1cm);\n");
  });

  test("should render complex TikZ diagram with multiple elements", () => {
    const element = React.createElement(
      TikZDiagram,
      null,
      React.createElement(TikZGrid, {
        xmin: 0,
        ymin: 0,
        xmax: 4,
        ymax: 4,
        step: 1,
        options: "gray!20",
      }),
      React.createElement(TikZCircle, {
        x: 2,
        y: 2,
        radius: 1,
        options: "fill=blue!20",
      }),
      React.createElement(TikZRectangle, {
        x: 1,
        y: 1,
        width: 1,
        height: 1,
        options: "fill=red!20",
      }),
      React.createElement(TikZLine, {
        from: [0, 0],
        to: [4, 4],
        options: "thick",
      }),
      React.createElement(TikZNode, {
        x: 2,
        y: 3,
        text: "Center",
        options: "above",
      }),
    );
    const result = ReactLatexVisitor(element);

    expect(result).toContain("\\begin{figure}[h]");
    expect(result).toContain("\\begin{tikzpicture}[scale=1]");
    expect(result).toContain("\\draw[gray!20][step=1cm] (0,0) grid (4,4);");
    expect(result).toContain("\\draw[fill=blue!20] (2,2) circle (1cm);");
    expect(result).toContain("\\draw[fill=red!20] (1,1) rectangle (2,2);");
    expect(result).toContain("\\draw[thick] (0,0) -- (4,4);");
    expect(result).toContain("\\node[above] at (2,3) {Center};");
    expect(result).toContain("\\end{tikzpicture}");
    expect(result).toContain("\\end{figure}");
  });
});
