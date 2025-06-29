const BaseRenderer = require("../core/BaseRenderer");
const TemplateRegistry = require("../core/TemplateRegistry");
const CustomVisitor = require("../visitors/CustomVisitor");

class ReactMarkdown extends BaseRenderer {
  constructor(templateName = "basic", customMapping = {}) {
    const registry = new TemplateRegistry();

    // Registrar templates Markdown
    registry.register("basic", require("../templates/markdown/basic"));

    const templates = registry.get(templateName);

    // Only PascalCase (uppercase) mappings
    const defaultMapping = {
      Document: "document",
      Section: "section",
      Subsection: "subsection",
      Paragraph: "paragraph",
      Bold: "bold",
      Italic: "italic",
      Underline: "underline",
      Math: "math",
      DisplayMath: "displaymath",
      Itemize: "itemize",
      Enumerate: "enumerate",
      Item: "item",
      Table: "table",
      Tabular: "tabular",
      Tr: "tr",
      Td: "td",
      P: "p",
      Div: "div",
      Span: "span",
    };

    const mapping = { ...defaultMapping, ...customMapping };

    super(templates, mapping);
  }

  createVisitor(options) {
    return new CustomVisitor(this.templates, this.mapping, options);
  }

  static render(jsxElement, templateName = "basic", customMapping = {}) {
    const renderer = new ReactMarkdown(templateName, customMapping);
    return renderer.render(jsxElement);
  }
}

module.exports = ReactMarkdown;
