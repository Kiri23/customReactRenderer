const React = require("react");
const Reconciler = require("react-reconciler");
const fs = require("fs");
const DynamicDocumentExample = require("./examples/DynamicDocument");
const TikZExamplesDocument = require("./examples/TikZExamples");
const LatexVisitor = require("./visitors/LatexVisitor");
const HtmlVisitor = require("./visitors/HtmlVisitor");
const EnhancedLatexVisitor = require("./visitors/EnhancedLatexVisitor");

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

// Generic render function that accepts any visitor
function renderWithVisitor(element, visitor) {
  const container = { children: [] };
  const node = LatexRenderer.createContainer(container, 0, false, null);
  LatexRenderer.updateContainer(element, node, null, null);

  return visitor.visit(container);
}

// Convenience functions for different output formats
function renderToLatex(element) {
  const visitor = new LatexVisitor();
  return renderWithVisitor(element, visitor);
}

function renderToHtml(element) {
  const visitor = new HtmlVisitor();
  return renderWithVisitor(element, visitor);
}

function renderToEnhancedLatex(element) {
  const visitor = new EnhancedLatexVisitor();
  return renderWithVisitor(element, visitor);
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

console.log("=== Generating documents with different visitors ===\n");

// Generate LaTeX documents
const fullOutput = renderToLatex(
  <DynamicDocumentExample initialConfig={configs.full} />,
);
fs.writeFileSync("output-full.tex", fullOutput);
console.log("Full LaTeX document written to output-full.tex");

const minimalOutput = renderToLatex(
  <DynamicDocumentExample initialConfig={configs.minimal} />,
);
fs.writeFileSync("output-minimal.tex", minimalOutput);
console.log("Minimal LaTeX document written to output-minimal.tex");

const mathOutput = renderToLatex(
  <DynamicDocumentExample initialConfig={configs.mathOnly} />,
);
fs.writeFileSync("output-math.tex", mathOutput);
console.log("Math-only LaTeX document written to output-math.tex");

const tikzOutput = renderToLatex(<TikZExamplesDocument />);
fs.writeFileSync("output-tikz.tex", tikzOutput);
console.log("TikZ LaTeX document written to output-tikz.tex");

// Generate enhanced LaTeX document (demonstrating context awareness)
const enhancedOutput = renderToEnhancedLatex(<TikZExamplesDocument />);
fs.writeFileSync("output-enhanced.tex", enhancedOutput);
console.log("Enhanced LaTeX document written to output-enhanced.tex");

// Generate HTML documents (showing the power of the visitor pattern)
const htmlOutput = renderToHtml(<TikZExamplesDocument />);
fs.writeFileSync("output-tikz.html", htmlOutput);
console.log("TikZ HTML document written to output-tikz.html");

const htmlFullOutput = renderToHtml(
  <DynamicDocumentExample initialConfig={configs.full} />,
);
fs.writeFileSync("output-full.html", htmlFullOutput);
console.log("Full HTML document written to output-full.html");

console.log("\n=== Sample output (Enhanced LaTeX document) ===");
console.log(enhancedOutput.substring(0, 800) + "...");

console.log("\n=== Sample output (TikZ HTML document) ===");
console.log(htmlOutput.substring(0, 500) + "...");
