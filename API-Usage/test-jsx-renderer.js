const React = require("react");
const { renderToLatex } = require("../latexRenderer.js");
const TikZJSXExample = require("./jsx-tagged-template.jsx");
const fs = require("fs");

console.log("=== Testing JSX LaTeX Renderer ===\n");

try {
  // Render the JSX component to LaTeX
  console.log("Rendering JSX component to LaTeX...");
  const latexOutput = renderToLatex(<TikZJSXExample />);

  console.log("✅ LaTeX generated successfully!");
  console.log("=".repeat(60));
  console.log(latexOutput);
  console.log("=".repeat(60));

  // Save to file
  fs.writeFileSync("test-output/output-jsx-latex.tex", latexOutput);
  console.log("\n✅ LaTeX saved to: test-output/output-jsx-latex.tex");
  console.log(
    "📄 File size:",
    fs.statSync("test-output/output-jsx-latex.tex").size,
    "bytes",
  );
} catch (error) {
  console.error("❌ Error rendering JSX to LaTeX:", error.message);
  console.error("Stack trace:", error.stack);
}
