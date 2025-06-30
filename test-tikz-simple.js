// Implementación directa de la función latex sin dependencias
function latex(strings, ...interpolations) {
  const Component = (props) => {
    return null; // No necesitamos retornar nada para el test
  };

  // Agregar el template LaTeX como propiedad del componente
  Component.__latexTemplate = (props) => {
    return strings.reduce((acc, str, i) => {
      let value = interpolations[i];
      let evaluated = typeof value === "function" ? value(props) : value;
      evaluated = evaluated != null ? String(evaluated) : "";
      return acc + str + evaluated;
    }, "");
  };

  return Component;
}

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

const TikZArrow = latex`\\draw${(p) =>
  p.options && p.options.trim() ? `[${p.options}]` : ""} (${(p) =>
  p.from[0]},${(p) => p.from[1]}) -- (${(p) => p.to[0]},${(p) => p.to[1]});`;

const TikZNode = latex`\\node${(p) =>
  p.options && p.options.trim() ? `[${p.options}]` : ""} at (${(p) => p.x},${(
  p,
) => p.y}) {${(p) => p.text}};`;

const TikZGrid = latex`\\draw${(p) =>
  p.options && p.options.trim() ? `[${p.options}]` : ""}[step=${(p) =>
  p.step}cm] (${(p) => p.xmin},${(p) => p.ymin}) grid (${(p) => p.xmax},${(p) =>
  p.ymax});`;

// Función para generar LaTeX completo
function generateTikZLaTeX() {
  console.log(
    "=== Generando LaTeX con TikZ Components (Tagged Templates) ===\n",
  );

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

  const arrowProps = {
    from: [1, 5],
    to: [5, 1],
    options: "->, thick, purple",
  };

  const nodeProps = {
    x: 2,
    y: 3.5,
    text: "Test Circle",
    options: "above",
  };

  const gridProps = {
    xmin: 0,
    ymin: 0,
    xmax: 6,
    ymax: 6,
    step: 1,
    options: "gray!30",
  };

  // Generar LaTeX usando los templates
  console.log("1. TikZCircle:");
  const circleLaTeX = TikZCircle.__latexTemplate(circleProps);
  console.log("Props:", circleProps);
  console.log("LaTeX:", circleLaTeX);
  console.log();

  console.log("2. TikZRectangle:");
  const rectLaTeX = TikZRectangle.__latexTemplate(rectProps);
  console.log("Props:", rectProps);
  console.log("LaTeX:", rectLaTeX);
  console.log();

  console.log("3. TikZLine:");
  const lineLaTeX = TikZLine.__latexTemplate(lineProps);
  console.log("Props:", lineProps);
  console.log("LaTeX:", lineLaTeX);
  console.log();

  console.log("4. TikZArrow:");
  const arrowLaTeX = TikZArrow.__latexTemplate(arrowProps);
  console.log("Props:", arrowProps);
  console.log("LaTeX:", arrowLaTeX);
  console.log();

  console.log("5. TikZNode:");
  const nodeLaTeX = TikZNode.__latexTemplate(nodeProps);
  console.log("Props:", nodeProps);
  console.log("LaTeX:", nodeLaTeX);
  console.log();

  console.log("6. TikZGrid:");
  const gridLaTeX = TikZGrid.__latexTemplate(gridProps);
  console.log("Props:", gridProps);
  console.log("LaTeX:", gridLaTeX);
  console.log();

  // Documento LaTeX completo
  const fullLaTeX = `\\documentclass{article}
\\usepackage{tikz}
\\usepackage{amsmath}
\\usepackage{amsfonts}
\\usepackage{amssymb}

\\begin{document}

\\section{TikZ Diagram Test - Tagged Templates}

\\begin{figure}[h]
\\centering
\\begin{tikzpicture}[scale=1]
${gridLaTeX}
${circleLaTeX}
${rectLaTeX}
${lineLaTeX}
${arrowLaTeX}
${nodeLaTeX}
\\node[above] at (2.5, 2) {Rectangle};
\\node[below] at (3, 3) {Line};
\\end{tikzpicture}
\\caption{Test diagram with TikZ components created using tagged templates}
\\end{figure}

\\end{document}`;

  console.log("✅ LaTeX completo generado:");
  console.log("=".repeat(60));
  console.log(fullLaTeX);
  console.log("=".repeat(60));

  return fullLaTeX;
}

// Ejecutar y guardar en archivo
const fs = require("fs");
const latexContent = generateTikZLaTeX();

// Guardar en archivo físico
fs.writeFileSync("output-tikz-tagged-templates.tex", latexContent);
console.log(
  "\n✅ Archivo LaTeX guardado como: output-tikz-tagged-templates.tex",
);

// Verificar que el archivo se creó correctamente
if (fs.existsSync("output-tikz-tagged-templates.tex")) {
  console.log("✅ Archivo creado exitosamente!");
  console.log(
    "📄 Tamaño del archivo:",
    fs.statSync("output-tikz-tagged-templates.tex").size,
    "bytes",
  );
} else {
  console.log("❌ Error: No se pudo crear el archivo");
}
