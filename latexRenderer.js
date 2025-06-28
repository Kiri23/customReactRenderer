const React = require("react");
const Reconciler = require("react-reconciler");
const fs = require("fs");
const DynamicDocumentExample = require("./examples/DynamicDocument");
const TikZExamplesDocument = require("./examples/TikZExamples");

// Host config for a LaTeX renderer
const hostConfig = {
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

const LatexRenderer = Reconciler(hostConfig);

function renderToLatex(element) {
  const container = { children: [] };
  const node = LatexRenderer.createContainer(container, 0, false, null);
  LatexRenderer.updateContainer(element, node, null, null);
  return containerToLatex(container);
}

function containerToLatex(container) {
  function walk(node) {
    if (typeof node === "string") return node;

    // Handle React elements (function components)
    if (node && node.$$typeof && node.type) {
      // If it's a function component, call it with props and walk its output
      if (typeof node.type === "function") {
        const rendered = node.type(node.props);
        return walk(rendered);
      }
      // Handle React.Fragment
      if (node.type === React.Fragment) {
        const fragChildren = node.props.children || [];
        return Array.isArray(fragChildren)
          ? fragChildren.map(walk).join("")
          : walk(fragChildren);
      }
    }

    const { type, props, children } = node;
    const childLatex = (children || []).map(walk).join("");

    // Convert React elements to LaTeX commands
    switch (type) {
      case "document":
        return `\\documentclass{article}\n\\usepackage{amsmath}\n\\usepackage{amsfonts}\n\\usepackage{amssymb}\n\\usepackage{graphicx}\n\\usepackage{tikz}\n\\usepackage{pgfplots}\n\\pgfplotsset{compat=1.18}\n\\begin{document}\n\n${childLatex}\n\n\\end{document}`;
      case "section":
        return `\\section{${childLatex}}\n\n`;
      case "subsection":
        return `\\subsection{${childLatex}}\n\n`;
      case "paragraph":
        return `${childLatex}\n\n`;
      case "bold":
        return `\\textbf{${childLatex}}`;
      case "italic":
        return `\\textit{${childLatex}}`;
      case "underline":
        return `\\underline{${childLatex}}`;
      case "math":
        return `$${childLatex}$`;
      case "displaymath":
        return `\\[${childLatex}\\]`;
      case "equation":
        const label = props?.label ? `\\label{${props.label}}` : "";
        return `\\begin{equation}${label}\n${childLatex}\n\\end{equation}\n\n`;
      case "itemize":
        return `\\begin{itemize}\n${childLatex}\\end{itemize}\n\n`;
      case "enumerate":
        return `\\begin{enumerate}\n${childLatex}\\end{enumerate}\n\n`;
      case "item":
        return `\\item ${childLatex}\n`;
      case "table":
        const caption = props?.caption ? `\\caption{${props.caption}}` : "";
        return `\\begin{table}[h]\n\\centering\n${caption}\n${childLatex}\\end{table}\n\n`;
      case "tabular":
        return `\\begin{tabular}{${
          props?.align || "l"
        }}\n${childLatex}\\end{tabular}`;
      case "tr":
        return `${childLatex} \\\\\n`;
      case "td":
        return `${childLatex} & `;
      case "p":
        return `${childLatex}\n\n`;
      case "div":
        return `${childLatex}\n`;
      case "span":
        return childLatex;

      // TikZ Components
      case "tikzdiagram":
        const width = props?.width || "8cm";
        const height = props?.height || "6cm";
        return `\\begin{figure}[h]\n\\centering\n\\begin{tikzpicture}[scale=1]\n${childLatex}\n\\end{tikzpicture}\n\\end{figure}\n\n`;

      case "tikzcircle":
        const { x, y, radius, options } = props;
        return `\\draw${options} (${x},${y}) circle (${radius}cm);\n`;

      case "tikzrectangle":
        const { width: rectWidth, height: rectHeight } = props;
        return `\\draw${props.options} (${props.x},${props.y}) rectangle (${
          props.x + rectWidth
        },${props.y + rectHeight});\n`;

      case "tikzline":
        const { from, to } = props;
        return `\\draw${props.options} (${from[0]},${from[1]}) -- (${to[0]},${to[1]});\n`;

      case "tikzarrow":
        const { from: arrowFrom, to: arrowTo } = props;
        return `\\draw${props.options} (${arrowFrom[0]},${arrowFrom[1]}) -- (${arrowTo[0]},${arrowTo[1]});\n`;

      case "tikznode":
        return `\\node${props.options} at (${props.x},${props.y}) {${props.text}};\n`;

      case "tikzgrid":
        const { xmin, ymin, xmax, ymax, step } = props;
        return `\\draw[step=${step}cm] (${xmin},${ymin}) grid (${xmax},${ymax});\n`;

      case "tikzaxis":
        const { xmin: axmin, ymin: aymin, xmax: axmax, ymax: aymax } = props;
        return `\\draw[->] (${axmin},0) -- (${axmax},0) node[right] {$x$};\n\\draw[->] (0,${aymin}) -- (0,${aymax}) node[above] {$y$};\n`;

      case "tikzflowchart":
        return `\\begin{tikzpicture}[node distance=2cm]\n${childLatex}\n\\end{tikzpicture}\n\n`;

      case "tikzflowchartnode":
        const { shape: nodeShape, text: nodeText } = props;
        const shapeCmd = nodeShape === "circle" ? "circle" : "rectangle";
        return `\\node[${shapeCmd}, draw] (${props.x},${props.y}) {${nodeText}};\n`;

      case "tikzflowchartarrow":
        const { from: flowFrom, to: flowTo } = props;
        return `\\draw${props.options} (${flowFrom[0]},${flowFrom[1]}) -- (${flowTo[0]},${flowTo[1]});\n`;

      default:
        return childLatex;
    }
  }

  return container.children.map(walk).join("");
}

// Example usage with different configurations
const configs = {
  full: {
    showMath: true,
    showTables: true,
    showLists: true,
    showExamples: true,
    showAbstract: true,
    showKeywords: true,
    showReferences: true,
  },
  minimal: {
    showMath: false,
    showTables: false,
    showLists: false,
    showExamples: false,
    showAbstract: false,
    showKeywords: false,
    showReferences: false,
  },
  mathOnly: {
    showMath: true,
    showTables: false,
    showLists: false,
    showExamples: false,
    showAbstract: true,
    showKeywords: true,
    showReferences: true,
  },
};

console.log("=== Generating LaTeX with different configurations ===\n");

// Generate full document
const fullOutput = renderToLatex(
  <DynamicDocumentExample initialConfig={configs.full} />,
);
fs.writeFileSync("output-full.tex", fullOutput);
console.log("Full document written to output-full.tex");

// Generate minimal document
const minimalOutput = renderToLatex(
  <DynamicDocumentExample initialConfig={configs.minimal} />,
);
fs.writeFileSync("output-minimal.tex", minimalOutput);
console.log("Minimal document written to output-minimal.tex");

// Generate math-only document
const mathOutput = renderToLatex(
  <DynamicDocumentExample initialConfig={configs.mathOnly} />,
);
fs.writeFileSync("output-math.tex", mathOutput);
console.log("Math-only document written to output-math.tex");

// Generate TikZ examples document
const tikzOutput = renderToLatex(<TikZExamplesDocument />);
fs.writeFileSync("output-tikz.tex", tikzOutput);
console.log("TikZ examples document written to output-tikz.tex");

console.log("\n=== Sample output (TikZ document) ===");
console.log(tikzOutput);
