const React = require("react");
const Reconciler = require("react-reconciler");
const fs = require("fs");

// Host config for a text renderer
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
    // Not needed for text renderer
  },
  hideTextInstance(textInstance) {
    // Not needed for text renderer
  },
  unhideInstance(instance, props) {
    // Not needed for text renderer
  },
  unhideTextInstance(textInstance, text) {
    // Not needed for text renderer
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

const TextRenderer = Reconciler(hostConfig);

function renderToText(element) {
  const container = { children: [] };
  const node = TextRenderer.createContainer(container, 0, false, null);
  TextRenderer.updateContainer(element, node, null, null);
  return containerToString(container);
}

function containerToString(container) {
  console.log(container);
  function walk(node) {
    if (typeof node === "string") return node;
    let children = node.children.map(walk).join("");
    return children;
  }
  return container.children.map(walk).join("");
}

// Example usage
const App = () =>
  React.createElement(
    "div",
    null,
    "Hello, ",
    React.createElement("span", null, "world!"),
    "\nThis is a custom renderer.",
  );

const output = renderToText(React.createElement(App));
fs.writeFileSync("output.txt", output);
console.log("Rendered output written to output.txt:");
console.log(output);
