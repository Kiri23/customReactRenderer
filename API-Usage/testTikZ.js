const React = require("react");
const Reconciler = require("react-reconciler");
const fs = require("fs");
const {
  TikZDiagram,
  TikZCircle,
  TikZRectangle,
  TikZLine,
  TikZNode,
} = require("./components/TikZComponents");
const {
  Document,
  Section,
  Paragraph,
} = require("./components/LatexComponents");

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
    if (!node) return "";
    const { type, props, children } = node;
    const childLatex = children.map(walk).join("");
    console.log("[DEBUG] walk node type:", type, "props:", props);

    // Convert React elements to LaTeX commands
    switch (type) {
      case "document":
        return `\\documentclass{article}\n\\usepackage{amsmath}\n\\usepackage{amsfonts}\n\\usepackage{amssymb}\n\\usepackage{graphicx}\n\\usepackage{tikz}\n\\usepackage{pgfplots}\n\\pgfplotsset{compat=1.18}\n\\begin{document}\n\n${childLatex}\n\n\\end{document}`;
      case "section":
        return `\\section{${childLatex}}\n\n`;
      case "paragraph":
        return `${childLatex}\n\n`;

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

      case "tikznode":
        return `\\node${props.options} at (${props.x},${props.y}) {${props.text}};\n`;

      default:
        return childLatex;
    }
  }

  return container.children.map(walk).join("");
}

const SimpleTikZExample = () => (
  <Document>
    <Section title="Simple TikZ Example">
      <Paragraph>This is a simple TikZ diagram example.</Paragraph>
      <TikZDiagram width="8cm" height="6cm">
        <TikZCircle x={2} y={2} radius={1} options="fill=blue!20, draw=blue" />
        <TikZRectangle
          x={4}
          y={4}
          width={1.5}
          height={1}
          options="fill=red!20, draw=red"
        />
        <TikZLine from={[1, 1]} to={[5, 5]} options="thick, green" />
        <TikZNode x={2} y={3.5} text="Circle" options="above" />
        <TikZNode x={4.75} y={4.5} text="Rectangle" options="above" />
      </TikZDiagram>
    </Section>
  </Document>
);

// Test the simple TikZ example
const output = renderToLatex(<SimpleTikZExample />);
fs.writeFileSync("simple-tikz.tex", output);
console.log("Simple TikZ example written to simple-tikz.tex");
console.log("\n=== Output ===");
console.log(output);
