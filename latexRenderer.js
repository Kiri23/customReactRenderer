const React = require("react");
const PluginManager = require("./plugins/PluginManager");
const RendererCore = require("./src/core/RendererCore");

// Initialize core renderer and plugin manager
const rendererCore = new RendererCore();
const pluginManager = new PluginManager();

/**
 * Simple LaTeX visitor that extracts LaTeX content from JSX
 */
const latexVisitor = {
  visit(node, context = {}) {
    if (!node) {
      return "";
    }

    // Handle text nodes
    if (typeof node === "string") {
      return node;
    }

    // Handle arrays
    if (Array.isArray(node)) {
      return node.map((child) => this.visit(child, context)).join("");
    }

    // Handle objects with children (from React Reconciler)
    if (node && typeof node === "object" && node.children) {
      // Process all children recursively
      return node.children.map((child) => this.visit(child, context)).join("");
    }

    // Handle React elements that might have been processed by the reconciler
    if (node && node.type) {
      // If it's a latex-text component, extract the content
      if (node.type === "latex-text") {
        return this.visit(node.children || node.props?.children, context);
      }

      // For other components, process their children
      if (node.children) {
        return this.visit(node.children, context);
      }
    }

    return "";
  },
};

/**
 * Process JSX to LaTeX using the RendererCore
 * @param {Object} element - JSX element to process
 * @returns {string} - LaTeX content
 */
function processJSXToLatex(element) {
  return rendererCore.renderWithVisitor(element, latexVisitor);
}

/**
 * Helper function to visualize JSX tree structure by following type property
 * @param {Object} element - JSX element to visualize
 * @param {number} depth - Current depth in the tree (for indentation)
 * @param {Set} visited - Set to prevent infinite recursion
 * @returns {string} - String representation of the tree
 */
function visualizeJSXTree(element, depth = 0, visited = new Set()) {
  if (!element || visited.has(element)) {
    return "  ".repeat(depth) + "↻ (circular reference)\n";
  }

  visited.add(element);
  const indent = "  ".repeat(depth);

  // Extract component type name
  let typeName = "Unknown";
  if (element.type) {
    if (typeof element.type === "function") {
      typeName = element.type.name || "AnonymousComponent";
    } else if (typeof element.type === "string") {
      typeName = element.type;
    }
  }

  // Check for special properties
  const hasLatexTemplate =
    element.type && element.type.__latexTemplate
      ? " (has __latexTemplate)"
      : "";

  let result = `${indent}${typeName}${hasLatexTemplate}\n`;

  // If type is a function, try to execute it to see what it generates
  if (element.type && typeof element.type === "function" && element.props) {
    try {
      // Execute the function to see what JSX it generates
      const generatedJSX = element.type(element.props);

      if (generatedJSX && typeof generatedJSX === "object") {
        // Recursively explore the generated JSX
        result += visualizeJSXTree(generatedJSX, depth + 1, visited);
      } else if (generatedJSX) {
        // If it returns a string or other value
        result += `${indent}  └─ Generated: ${String(generatedJSX).substring(
          0,
          50,
        )}${String(generatedJSX).length > 50 ? "..." : ""}\n`;
      }
    } catch (error) {
      result += `${indent}  └─ Error executing type: ${error.message}\n`;
    }
  }

  // Also explore children if they exist
  if (element.props && element.props.children) {
    const children = Array.isArray(element.props.children)
      ? element.props.children
      : [element.props.children];

    children.forEach((child, index) => {
      if (child && typeof child === "object") {
        result += visualizeJSXTree(child, depth + 1, visited);
      } else if (child) {
        result += `${indent}  └─ Text: "${String(child).substring(0, 50)}${
          String(child).length > 50 ? "..." : ""
        }"\n`;
      }
    });
  }

  return result;
}

// Convenience functions for different output formats
function renderToLatex(element) {
  // console.log("Rendering to LaTeX", element);
  // console.log("JSX Tree Structure:");
  // console.log(visualizeJSXTree(element));

  return processJSXToLatex(element);
}


module.exports = {
  renderToLatex,
  visualizeJSXTree,
  processJSXToLatex,
};
