// Importar la función latex directamente
const { latex } = require("./components/LatexComponents");

// Crear componentes con tagged templates
const Document = latex`
\\documentclass{article}
\\usepackage{tikz}
\\usepackage{amsmath}
\\usepackage{amsfonts}
\\usepackage{amssymb}
\\begin{document}

${(props) => props.children}

\\end{document}`;

const Section = latex`
\\section{${(props) => props.title}}
${(props) => props.children}`;

const Paragraph = latex`
${(props) => props.children}

`;

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

const TikZDiagram = latex`
\\begin{figure}[h]
\\centering
\\begin{tikzpicture}[scale=1]
${(props) => props.children}
\\end{tikzpicture}
\\caption{${(props) => props.caption || "TikZ Diagram"}}
\\end{figure}

`;

// Función para generar el documento completo usando los componentes
function generateDocument() {
  console.log("=== Generando documento con componentes latex ===\n");

  // Crear el contenido del diagrama TikZ
  const tikzContent = [
    TikZCircle.__latexTemplate({
      x: 2,
      y: 3,
      radius: 1.5,
      options: "fill=blue!20, draw=blue, thick",
    }),
    TikZRectangle.__latexTemplate({
      x: 1,
      y: 1,
      width: 3,
      height: 2,
      options: "fill=red!20, draw=red",
    }),
    TikZLine.__latexTemplate({
      from: [0, 0],
      to: [4, 4],
      options: "thick, green",
    }),
    TikZNode.__latexTemplate({
      x: 2,
      y: 3.5,
      text: "Test Circle",
      options: "above",
    }),
    TikZNode.__latexTemplate({
      x: 2.5,
      y: 2,
      text: "Rectangle",
      options: "above",
    }),
  ].join("");

  // Crear la sección con el diagrama
  const sectionContent = Section.__latexTemplate({
    title: "TikZ Diagram Test",
    children: [
      Paragraph.__latexTemplate({
        children: "This is a test paragraph with a TikZ diagram below.",
      }),
      TikZDiagram.__latexTemplate({
        children: tikzContent,
        caption: "Test diagram created with tagged templates",
      }),
    ].join(""),
  });

  // Crear el documento completo
  const fullDocument = Document.__latexTemplate({
    children: sectionContent,
  });

  console.log("✅ Documento LaTeX generado desde tagged templates:");
  console.log("=".repeat(60));
  console.log(fullDocument);
  console.log("=".repeat(60));

  return fullDocument;
}

// Ejecutar y guardar en archivo
const fs = require("fs");
const latexContent = generateDocument();

// Guardar en archivo físico
fs.writeFileSync("output-latex-components.tex", latexContent);
console.log("\n✅ Archivo LaTeX guardado como: output-latex-components.tex");

// Verificar que el archivo se creó correctamente
if (fs.existsSync("output-latex-components.tex")) {
  console.log("✅ Archivo creado exitosamente!");
  console.log(
    "📄 Tamaño del archivo:",
    fs.statSync("output-latex-components.tex").size,
    "bytes",
  );
} else {
  console.log("❌ Error: No se pudo crear el archivo");
}
