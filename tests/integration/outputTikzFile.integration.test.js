const fs = require("fs");
const path = require("path");
const React = require("react");

const latexRenderer = require("../../latexRenderer");
const TikZExamplesDocument = require("../../examples/TikZExamples");

const OUTPUT_FILE = path.join(__dirname, "../../output-tikz.tex");

describe("[Integration] output-tikz.tex generation and content", () => {
  beforeAll(() => {
    // Generar el archivo output-tikz.tex
    const tikzOutput = latexRenderer.renderToLatex(<TikZExamplesDocument />);
    fs.writeFileSync(OUTPUT_FILE, tikzOutput);
  });

  afterAll(() => {
    // Limpiar el archivo generado
    if (fs.existsSync(OUTPUT_FILE)) {
      fs.unlinkSync(OUTPUT_FILE);
    }
  });

  test("El archivo output-tikz.tex se genera correctamente", () => {
    expect(fs.existsSync(OUTPUT_FILE)).toBe(true);
    const content = fs.readFileSync(OUTPUT_FILE, "utf8");
    expect(content.length).toBeGreaterThan(100);
  });

  test("Contiene la sección de Geometric Shapes y sus gráficos", () => {
    const content = fs.readFileSync(OUTPUT_FILE, "utf8");
    expect(content).toContain("\\section{Geometric Shapes}");
    expect(content).toContain(
      "This section demonstrates basic TikZ geometric shapes.",
    );
    expect(content).toContain("\\draw[gray!30][step=1cm] (0,0) grid (6,6);");
    expect(content).toContain(
      "\\draw[fill=blue!20, draw=blue] (2,2) circle (1cm);",
    );
    expect(content).toContain(
      "\\draw[fill=red!20, draw=red] (4,4) rectangle (5.5,5);",
    );
    expect(content).toContain("\\draw[thick, green] (1,1) -- (5,5);");
    expect(content).toContain("\\draw[->, thick, purple] (1,5) -- (5,1);");
  });

  test("Contiene la sección de Flowchart Example y sus nodos/aristas", () => {
    const content = fs.readFileSync(OUTPUT_FILE, "utf8");
    expect(content).toContain("\\section{Flowchart Example}");
    expect(content).toContain(
      "This section shows a simple flowchart created with TikZ.",
    );
    expect(content).toContain(
      "\\node[fill=green!20][circle, draw] at (0,0) {Start};",
    );
    expect(content).toContain(
      "\\node[fill=blue!20][rectangle, draw] at (0,-2) {Process};",
    );
    expect(content).toContain(
      "\\node[fill=yellow!20][diamond, draw] at (0,-4) {Decision};",
    );
    expect(content).toContain("\\draw[->] (0,-0.5) -- (0,-1.5);");
  });

  test("Contiene la sección de Mathematical Diagram y sus elementos", () => {
    const content = fs.readFileSync(OUTPUT_FILE, "utf8");
    expect(content).toContain("\\section{Mathematical Diagram}");
    expect(content).toContain(
      "This section demonstrates a mathematical diagram with axes and functions.",
    );
    expect(content).toContain("\\draw [->] (-3,0) -- (3,0) node[right] {$x$};");
    expect(content).toContain(
      "\\draw[gray!20][step=0.5cm] (-3,-3) grid (3,3);",
    );
    expect(content).toContain("\\draw[thick, blue] (-2,4) -- (-1.5,2.25);");
    expect(content).toContain("\\draw[fill=red] (0,0) circle (0.05cm);");
    expect(content).toContain("\\node[blue] at (2.5,3.5) {$f(x) = x^2$};");
  });

  test("Contiene la sección de Simple Circuit Diagram y sus componentes", () => {
    const content = fs.readFileSync(OUTPUT_FILE, "utf8");
    expect(content).toContain("\\section{Simple Circuit Diagram}");
    expect(content).toContain(
      "This section shows a simple electrical circuit diagram.",
    );
    expect(content).toContain("\\draw[thick] (0,0) -- (0,1);");
    expect(content).toContain("\\draw[thick] (0.5,0) -- (0.5,1);");
    expect(content).toContain(
      "\\draw[fill=yellow!20, draw=black] (3,0.5) circle (0.3cm);",
    );
    expect(content).toContain("\\node[above] at (3,1.5) {LED};");
  });

  test("Contiene la estructura general de documento LaTeX", () => {
    const content = fs.readFileSync(OUTPUT_FILE, "utf8");
    expect(content).toContain("\\documentclass{article}");
    expect(content).toContain("\\usepackage{tikz}");
    expect(content).toContain("\\begin{document}");
    expect(content).toContain("\\end{document}");
  });
});
