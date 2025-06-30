const React = require("react");
const BaseVisitor = require("../../visitors/BaseVisitor");

class CustomVisitor extends BaseVisitor {
  constructor(templates, mapping, options = {}) {
    super();
    this.templates = templates;
    this.mapping = mapping;
    this.options = options;
  }

  visitElement(type, props, childResults, context) {
    // Verificar si el tipo es una función (componente React) con __latexTemplate
    if (typeof type === "function" && type.__latexTemplate) {
      // Crear props combinando las props originales con children procesados
      const combinedProps = {
        ...props,
        children: childResults.join(""),
      };

      // Usar directamente el template LaTeX del componente
      return type.__latexTemplate(combinedProps);
    }

    // USAR EL MAPPING para encontrar el template correcto (fallback)
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

  // Override visit method to handle React elements with tagged templates
  visit(node, context = {}) {
    if (typeof node === "string") {
      return this.visitText(node, context);
    }

    // Handle React elements (function components)
    if (node && node.$$typeof && node.type) {
      if (typeof node.type === "function") {
        // Check if it's a tagged template component
        if (node.type.__latexTemplate) {
          // Process children first
          const children = node.props.children || [];
          const childResults = Array.isArray(children)
            ? children.map((child) => this.visit(child, context))
            : [this.visit(children, context)];

          // Then process the component
          return this.visitElement(
            node.type,
            node.props,
            childResults,
            context,
          );
        }

        // For regular function components, render them first
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

    // Fall back to parent implementation for other cases
    return super.visit(node, context);
  }
}

module.exports = CustomVisitor;
