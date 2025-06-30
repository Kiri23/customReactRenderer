// Importar directamente la función latex sin depender del contexto
const { latex } = require("./components/LatexComponents");

// Crear componentes TikZ directamente con tagged templates
const TikZCircle = latex`\\draw${(p) =>
  p.options && p.options.trim() ? `[${p.options}]` : ""} (${(p) => p.x},${(p) =>
  p.y}) circle (${(p) => p.radius}cm);`;

const TikZRectangle = latex`\\draw${(p) =>
  p.options && p.options.trim() ? `[${p.options}]` : ""} (${(p) => p.x},${(p) =>
  p.y}) rectangle (${(p) => p.x + p.width},${(p) => p.y + p.height});`;

const TikZLine = latex`\\draw${(p) =>
  p.options && p.options.trim() ? `[${p.options}]` : ""} (${(p) =>
  p.from[0]},${(p) => p.from[1]}) -- (${(p) => p.to[0]},${(p) => p.to[1]});`;

const TikZNode = latex`\\node${(p) =>
  p.options && p.options.trim() ? `[${p.options}]` : ""} at (${(p) => p.x},${(
  p,
) => p.y}) {${(p) => p.text}};`;

// Función para generar LaTeX completo
function generateTikZLaTeX() {
  console.log("=== Generando LaTeX con TikZ Components ===\n");

  // Props para los componentes
  const circleProps = {
    x: 2,
    y: 3,
    radius: 1.5,
    options: "fill=blue!20, draw=blue, thick",
  };

  const rectProps = {
    x: 1,
    y: 1,
    width: 3,
    height: 2,
    options: "fill=red!20, draw=red",
  };

  const lineProps = {
    from: [0, 0],
    to: [4, 4],
    options: "thick, green",
  };

  const nodeProps = {
    x: 2,
    y: 3.5,
    text: "Test Circle",
    options: "above",
  };

  // Generar LaTeX usando los templates
  const circleLaTeX = TikZCircle.__latexTemplate(circleProps);
  const rectLaTeX = TikZRectangle.__latexTemplate(rectProps);
  const lineLaTeX = TikZLine.__latexTemplate(lineProps);
  const nodeLaTeX = TikZNode.__latexTemplate(nodeProps);

  // Documento LaTeX completo
  const fullLaTeX = `\\documentclass{article}
\\usepackage{tikz}
\\usepackage{amsmath}
\\usepackage{amsfonts}
\\usepackage{amssymb}

\\begin{document}

\\section{TikZ Diagram Test}

\\begin{figure}[h]
\\centering
\\begin{tikzpicture}[scale=1]
${circleLaTeX}
${rectLaTeX}
${lineLaTeX}
${nodeLaTeX}
\\end{tikzpicture}
\\caption{Test diagram with TikZ components}
\\end{figure}

\\end{document}`;

  console.log("LaTeX generado:");
  console.log(fullLaTeX);

  return fullLaTeX;
}

// Ejecutar y guardar en archivo
const fs = require("fs");
const latexContent = generateTikZLaTeX();

// Guardar en archivo físico
fs.writeFileSync("output-tikz-test.tex", latexContent);
console.log("\n✅ Archivo LaTeX guardado como: output-tikz-test.tex");

// Mostrar el contenido del archivo
console.log("\n📄 Contenido del archivo generado:");
console.log("=".repeat(50));
console.log(fs.readFileSync("output-tikz-test.tex", "utf8"));
