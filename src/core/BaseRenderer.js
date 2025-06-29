const React = require("react");
const Reconciler = require("react-reconciler");

class BaseRenderer {
  constructor(templates, mapping) {
    this.templates = templates;
    this.mapping = mapping;
    this.parser = this.createParser();
  }

  createParser() {
    // USAR EL MISMO hostConfig que está en latexRenderer.js existente
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
    return Reconciler(hostConfig);
  }

  render(jsxElement, options = {}) {
    const container = { children: [] };
    const node = this.parser.createContainer(container, 0, false, null);
    this.parser.updateContainer(jsxElement, node, null, null);

    return this.processTree(container, options);
  }

  processTree(container, options) {
    // USAR EL VISITOR PATTERN EXISTENTE pero con templates y mapping
    const visitor = this.createVisitor(options);
    return visitor.visit(container);
  }

  createVisitor(options) {
    // Factory method para crear visitor específico
    throw new Error("Subclasses must implement createVisitor");
  }
}

module.exports = BaseRenderer;
