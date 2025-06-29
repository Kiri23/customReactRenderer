const BaseRenderer = require("../core/BaseRenderer");
const TemplateRegistry = require("../core/TemplateRegistry");
const CustomVisitor = require("../visitors/CustomVisitor");

class ReactLatex extends BaseRenderer {
  constructor(templateName = "basic", customMapping = {}) {
    const registry = new TemplateRegistry();

    // Registrar templates LaTeX
    registry.register("basic", require("../templates/latex/basic"));

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
      Equation: "equation",
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
      TikzDiagram: "tikzdiagram",
      TikzCircle: "tikzcircle",
      TikzRectangle: "tikzrectangle",
      TikzLine: "tikzline",
      TikzArrow: "tikzarrow",
      TikzNode: "tikznode",
      TikzGrid: "tikzgrid",
      TikzAxis: "tikzaxis",
      TikzFlowchart: "tikzflowchart",
      TikzFlowchartNode: "tikzflowchartnode",
      TikzFlowchartArrow: "tikzflowchartarrow",
    };

    const mapping = { ...defaultMapping, ...customMapping };

    super(templates, mapping);
  }

  createVisitor(options) {
    return new CustomVisitor(this.templates, this.mapping, options);
  }

  static render(jsxElement, templateName = "basic", customMapping = {}) {
    const renderer = new ReactLatex(templateName, customMapping);
    return renderer.render(jsxElement);
  }
}

module.exports = ReactLatex;
