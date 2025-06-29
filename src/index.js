const ReactLatex = require("./renderers/ReactLatex");
const ReactMarkdown = require("./renderers/ReactMarkdown");
const ReactCustom = require("./renderers/ReactCustom");

module.exports = {
  ReactLatex,
  ReactMarkdown,
  ReactCustom,

  // Convenience functions
  renderToLatex: ReactLatex.render,
  renderToMarkdown: ReactMarkdown.render,

  // Core classes for advanced usage
  BaseRenderer: require("./core/BaseRenderer"),
  TemplateRegistry: require("./core/TemplateRegistry"),
};
