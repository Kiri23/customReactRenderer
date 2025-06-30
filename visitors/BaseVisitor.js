const React = require("react");

// Base class for element visitors - can be extended for different output formats
class BaseElementVisitor {
  visit(node, context = {}) {
    if (node == null) {
      return "";
    }
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

    // Enhanced context with accumulated state
    const childContext = {
      ...context,
      parent: type,
      depth: (context.depth || 0) + 1,
      path: [...(context.path || []), type],
      siblings: children ? children.length : 0,
      index: context.index || 0,
      isFirst: context.index === 0,
      isLast: context.index === context.siblings - 1,
      accumulated: {
        ...context.accumulated,
        nodeCount: (context.accumulated?.nodeCount || 0) + 1,
        depth: Math.max(
          context.accumulated?.depth || 0,
          (context.depth || 0) + 1,
        ),
      },
    };

    // DFS: Process children first (way down) with enhanced context
    const childResults = (children || []).map((child, index) =>
      this.visit(child, { ...childContext, index }),
    );

    // Then process current node (way up) with accumulated results
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

  // Helper methods for context-aware processing
  getContextInfo(context) {
    return {
      depth: context.depth || 0,
      path: context.path || [],
      isFirst: context.isFirst || false,
      isLast: context.isLast || false,
      siblings: context.siblings || 0,
      accumulated: context.accumulated || {},
    };
  }

  // Method to check if we're in a specific context
  isInContext(context, targetPath) {
    const currentPath = context.path || [];
    return targetPath.every((item, index) => currentPath[index] === item);
  }

  // Method to get accumulated statistics
  getAccumulatedStats(context) {
    return context.accumulated || {};
  }
}

module.exports = BaseElementVisitor;
