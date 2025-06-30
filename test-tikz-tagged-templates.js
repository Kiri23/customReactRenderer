const {
  TikZCircle,
  TikZRectangle,
  TikZLine,
  TikZArrow,
  TikZNode,
  TikZGrid,
  TikZAxis,
} = require("./components/TikZComponents");

// Test function to verify TikZ components produce valid LaTeX
function testTikZComponents() {
  console.log("=== Testing TikZ Components with Tagged Templates ===\n");

  // Test TikZCircle
  console.log("1. Testing TikZCircle:");
  const circleProps = {
    x: 2,
    y: 3,
    radius: 1.5,
    options: "fill=blue!20, draw=blue, thick",
  };

  console.log("Props:", circleProps);
  console.log("LaTeX Output:");
  console.log(TikZCircle.__latexTemplate(circleProps));
  console.log("\n" + "=".repeat(50) + "\n");

  // Test TikZRectangle
  console.log("2. Testing TikZRectangle:");
  const rectProps = {
    x: 1,
    y: 1,
    width: 3,
    height: 2,
    options: "fill=red!20, draw=red",
  };

  console.log("Props:", rectProps);
  console.log("LaTeX Output:");
  console.log(TikZRectangle.__latexTemplate(rectProps));
  console.log("\n" + "=".repeat(50) + "\n");

  // Test TikZLine
  console.log("3. Testing TikZLine:");
  const lineProps = {
    from: [0, 0],
    to: [4, 4],
    options: "thick, green",
  };

  console.log("Props:", lineProps);
  console.log("LaTeX Output:");
  console.log(TikZLine.__latexTemplate(lineProps));
  console.log("\n" + "=".repeat(50) + "\n");

  // Test TikZArrow
  console.log("4. Testing TikZArrow:");
  const arrowProps = {
    from: [1, 5],
    to: [5, 1],
    options: "->, thick, purple",
  };

  console.log("Props:", arrowProps);
  console.log("LaTeX Output:");
  console.log(TikZArrow.__latexTemplate(arrowProps));
  console.log("\n" + "=".repeat(50) + "\n");

  // Test TikZNode
  console.log("5. Testing TikZNode:");
  const nodeProps = {
    x: 2,
    y: 3.5,
    text: "Test Node",
    options: "above",
  };

  console.log("Props:", nodeProps);
  console.log("LaTeX Output:");
  console.log(TikZNode.__latexTemplate(nodeProps));
  console.log("\n" + "=".repeat(50) + "\n");

  // Test TikZGrid
  console.log("6. Testing TikZGrid:");
  const gridProps = {
    xmin: 0,
    ymin: 0,
    xmax: 6,
    ymax: 6,
    step: 1,
    options: "gray!30",
  };

  console.log("Props:", gridProps);
  console.log("LaTeX Output:");
  console.log(TikZGrid.__latexTemplate(gridProps));
  console.log("\n" + "=".repeat(50) + "\n");

  // Test TikZAxis
  console.log("7. Testing TikZAxis:");
  const axisProps = {
    xmin: -3,
    ymin: -3,
    xmax: 3,
    ymax: 3,
    options: "thick",
  };

  console.log("Props:", axisProps);
  console.log("LaTeX Output:");
  console.log(TikZAxis.__latexTemplate(axisProps));
  console.log("\n" + "=".repeat(50) + "\n");

  // Test complete diagram
  console.log("8. Testing Complete Diagram:");
  const diagramProps = {
    children: [
      TikZGrid.__latexTemplate(gridProps),
      TikZCircle.__latexTemplate(circleProps),
      TikZRectangle.__latexTemplate(rectProps),
      TikZLine.__latexTemplate(lineProps),
      TikZArrow.__latexTemplate(arrowProps),
      TikZNode.__latexTemplate({ ...nodeProps, text: "Circle" }),
      TikZNode.__latexTemplate({
        x: 2.5,
        y: 2,
        text: "Rectangle",
        options: "above",
      }),
    ].join(""),
  };

  console.log("Complete Diagram LaTeX:");
  console.log("\\begin{tikzpicture}[scale=1]");
  console.log(diagramProps.children);
  console.log("\\end{tikzpicture}");
}

// Run the test
testTikZComponents();
