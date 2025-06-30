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
};
