const BaseVisitor = require("../../visitors/BaseVisitor");

class CustomVisitor extends BaseVisitor {
  constructor(templates, mapping, options = {}) {
    super();
    this.templates = templates;
    this.mapping = mapping;
    this.options = options;
  }

  visitElement(type, props, childResults, context) {
    // USAR EL MAPPING para encontrar el template correcto
    const templateName = this.mapping[type];

    if (!templateName) {
      console.warn(`No mapping found for element type: ${type}`);
      return childResults.join("");
    }

    const template = this.templates[templateName];

    if (!template) {
      console.warn(`No template found for: ${templateName}`);
      return childResults.join("");
    }

    // EJECUTAR EL TEMPLATE con props y children
    if (typeof template === "function") {
      return template(props, childResults, context);
    }

    return childResults.join("");
  }
}

module.exports = CustomVisitor;
