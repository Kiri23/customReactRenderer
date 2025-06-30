const React = require("react");
const LatexVisitor = require("./visitors/LatexVisitor");
const HtmlVisitor = require("./visitors/HtmlVisitor");
const EnhancedLatexVisitor = require("./visitors/EnhancedLatexVisitor");
const PluginManager = require("./plugins/PluginManager");
const RendererCore = require("./src/core/RendererCore");

// Initialize core renderer and plugin manager
const rendererCore = new RendererCore();
const pluginManager = new PluginManager();

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

/**
 * Render element to custom output using a visitor
 * This abstracts the visitor pattern implementation details
 */
function renderWithVisitor(element, visitor) {
  return rendererCore.renderWithVisitor(element, visitor, {
    middleware: pluginManager.applyMiddleware.bind(pluginManager),
  });
}

// Convenience functions for different output formats
function renderToLatex(element) {
  console.log("Rendering to LaTeX", element);
  console.log("JSX Tree Structure:");
  console.log(visualizeJSXTree(element));
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

// Plugin-aware render function
function renderWithPlugin(element, visitorName) {
  const visitor = pluginManager.getVisitor(visitorName);
  return renderWithVisitor(element, visitor);
}

// Plugin management functions
function registerPlugin(name, plugin) {
  return pluginManager.registerPlugin(name, plugin);
}

function getAvailableVisitors() {
  return pluginManager.getAvailableVisitors();
}

function listPlugins() {
  return pluginManager.listPlugins();
}

module.exports = {
  renderToLatex,
  renderToHtml,
  renderToEnhancedLatex,
  renderWithVisitor,
  renderWithPlugin,
  registerPlugin,
  getAvailableVisitors,
  listPlugins,
  pluginManager,
  rendererCore,
  visualizeJSXTree,
};
