const React = require("react");
const Reconciler = require("react-reconciler");

// Host config for the custom renderer
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
    // Not needed for custom renderer
  },
  hideTextInstance(textInstance) {
    // Not needed for custom renderer
  },
  unhideInstance(instance, props) {
    // Not needed for custom renderer
  },
  unhideTextInstance(textInstance, text) {
    // Not needed for custom renderer
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

const CustomRenderer = Reconciler(hostConfig);

/**
 * Core renderer that abstracts the visitor pattern
 * This is the main API for rendering JSX to custom output formats
 */
class RendererCore {
  constructor() {
    this.renderer = CustomRenderer;
  }

  /**
   * Create a container for the renderer
   * @returns {Object} Container object
   */
  createContainer() {
    return { children: [] };
  }

  /**
   * Create a fiber node for the container
   * @param {Object} container - Container object
   * @returns {Object} Fiber node
   */
  createFiberNode(container) {
    return this.renderer.createContainer(container, 0, false, null);
  }

  /**
   * Update the container with new element
   * @param {ReactElement} element - React element to render
   * @param {Object} container - Container object
   * @param {Object} fiberNode - Fiber node
   */
  updateContainer(element, container, fiberNode) {
    this.renderer.updateContainer(element, fiberNode, null, null);
  }

  /**
   * Render element to custom output using a visitor
   * @param {ReactElement} element - React element to render
   * @param {Object} visitor - Visitor object with visit method
   * @param {Object} options - Additional options
   * @returns {string} Rendered output
   */
  renderWithVisitor(element, visitor, options = {}) {
    const container = this.createContainer();
    const fiberNode = this.createFiberNode(container);

    this.updateContainer(element, container, fiberNode);

    // Apply middleware if available
    if (options.middleware) {
      const enhancedVisitor = {
        ...visitor,
        visit: function (node, context = {}) {
          const { node: processedNode, context: processedContext } =
            options.middleware(node, context);
          return visitor.visit.call(visitor, processedNode, processedContext);
        },
      };
      return enhancedVisitor.visit(container);
    }

    return visitor.visit(container);
  }

  /**
   * Get the tree structure from a React element
   * @param {ReactElement} element - React element
   * @returns {Object} Tree structure
   */
  getTreeStructure(element) {
    const container = this.createContainer();
    const fiberNode = this.createFiberNode(container);
    this.updateContainer(element, container, fiberNode);
    return container;
  }
}

module.exports = RendererCore;
