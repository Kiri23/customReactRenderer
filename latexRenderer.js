const React = require("react");
const Reconciler = require("react-reconciler");
const fs = require("fs");

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

    const { type, props, children } = node;
    const childLatex = children.map(walk).join("");

    // Convert React elements to LaTeX commands
    switch (type) {
      case "document":
        return `\\documentclass{article}\n\\begin{document}\n\n${childLatex}\n\n\\end{document}`;
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
        return `\\begin{equation}\n${childLatex}\n\\end{equation}\n\n`;
      case "itemize":
        return `\\begin{itemize}\n${childLatex}\\end{itemize}\n\n`;
      case "enumerate":
        return `\\begin{enumerate}\n${childLatex}\\end{enumerate}\n\n`;
      case "item":
        return `\\item ${childLatex}\n`;
      case "table":
        return `\\begin{table}\n${childLatex}\\end{table}\n\n`;
      case "tabular":
        return `\\begin{tabular}{${
          props.align || "l"
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
      default:
        return childLatex;
    }
  }

  return container.children.map(walk).join("");
}

// Example usage with LaTeX components
const LatexDocument = () => (
  <document>
    <section>Introduction to LaTeX</section>
    <paragraph>
      This is a <bold>bold text</bold> and this is <italic>italic text</italic>.
    </paragraph>

    <subsection>Mathematical Expressions</subsection>
    <paragraph>
      Here's an inline math expression: <math>E = mc^2</math>
    </paragraph>

    <equation>
      {"\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}"}
    </equation>

    <subsection>Lists</subsection>
    <itemize>
      <item>First item</item>
      <item>Second item</item>
      <item>Third item</item>
    </itemize>

    <enumerate>
      <item>Numbered item 1</item>
      <item>Numbered item 2</item>
    </enumerate>
  </document>
);

const output = renderToLatex(<LatexDocument />);
fs.writeFileSync("output.tex", output);
console.log("LaTeX output written to output.tex:");
console.log(output);
