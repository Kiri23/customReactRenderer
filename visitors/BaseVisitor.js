// Base class for element visitors - can be extended for different output formats
class BaseElementVisitor {
  visit(node, context = {}) {
    if (typeof node === "string") {
      return this.visitText(node, context);
    }

    // Handle React elements (function components)
    if (node && node.$$typeof && node.type) {
      if (typeof node.type === "function") {
        const rendered = node.type(node.props);
        return this.visit(rendered, context);
      }
      if (node.type === React.Fragment) {
        const fragChildren = node.props.children || [];
        return Array.isArray(fragChildren)
          ? fragChildren.map((child) => this.visit(child, context)).join("")
          : this.visit(fragChildren, context);
      }
    }

    const { type, props, children } = node;
    const childContext = { ...context, parent: type };

    // DFS: Process children first (way down)
    const childResults = (children || []).map((child) =>
      this.visit(child, childContext),
    );

    // Then process current node (way up)
    return this.visitElement(type, props, childResults, context);
  }

  visitText(text, context) {
    return text;
  }

  visitElement(type, props, childResults, context) {
    // Default behavior - delegate to specific visitor methods
    const visitorMethod = `visit${this.capitalizeFirst(type)}`;
    if (this[visitorMethod]) {
      return this[visitorMethod](props, childResults, context);
    }
    return childResults.join("");
  }

  capitalizeFirst(str) {
    if (!str || typeof str !== "string") {
      return "Unknown";
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

module.exports = BaseElementVisitor;
