const BaseRenderer = require("../core/BaseRenderer");
const TemplateRegistry = require("../core/TemplateRegistry");
const CustomVisitor = require("../visitors/CustomVisitor");

class ReactLatex extends BaseRenderer {
  constructor(templateName = "basic", customMapping = {}) {
    const registry = new TemplateRegistry();

    // Registrar templates LaTeX
    registry.register("basic", require("../templates/latex/basic"));

    const templates = registry.get(templateName);

    // Mapping para componentes que no usan tagged templates
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
      // TikZ components
      TikZDiagram: "tikzdiagram",
      TikZCircle: "tikzcircle",
      TikZRectangle: "tikzrectangle",
      TikZLine: "tikzline",
      TikZArrow: "tikzarrow",
      TikZNode: "tikznode",
      TikZGrid: "tikzgrid",
      TikZAxis: "tikzaxis",
      TikZFlowchart: "tikzflowchart",
      TikZFlowchartNode: "tikzflowchartnode",
      TikZFlowchartArrow: "tikzflowchartarrow",
    };

    const mapping = { ...defaultMapping, ...customMapping };

    super(templates, mapping);
  }

  createVisitor(options) {
    return new CustomVisitor(this.templates, this.mapping, options);
  }

  // Método para renderizar elementos React con tagged templates
  renderElement(element) {
    if (!element || typeof element.type !== "function") {
      return this.render(element);
    }

    // Verificar si el componente tiene __latexTemplate
    if (element.type.__latexTemplate) {
      return element.type.__latexTemplate(element.props);
    }

    // Fallback al renderizado tradicional
    return this.render(element);
  }

  static render(jsxElement, templateName = "basic", customMapping = {}) {
    const renderer = new ReactLatex(templateName, customMapping);

    // Si el elemento tiene __latexTemplate, usarlo directamente
    if (
      jsxElement &&
      typeof jsxElement.type === "function" &&
      jsxElement.type.__latexTemplate
    ) {
      return jsxElement.type.__latexTemplate(jsxElement.props);
    }

    return renderer.render(jsxElement);
  }
}

exports.ReactLatex = ReactLatex;
exports.ReactLatexVisitor = function (element) {
  const renderer = new ReactLatex();
  const visitor = renderer.createVisitor();
  return visitor.visit(element);
};
