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
        // Process children first
        const children = node.props.children || [];
        const childResults = Array.isArray(children)
          ? children.map((child) => this.visit(child, context))
          : [this.visit(children, context)];

        // Create props with processed children
        const processedProps = {
          ...node.props,
          children: childResults.join(""),
        };

        // Now execute the component with processed props
        const result = node.type(processedProps);

        // If it returns a string, it's a tagged template component
        if (typeof result === "string") {
          return result;
        }

        // If it returns a React element, process it
        if (result && result.$$typeof) {
          return this.visit(result, context);
        }

        // For other return types, process as before
        return this.visit(result, context);
      }

      if (node.type === React.Fragment) {
        const fragChildren = node.props.children || [];
        return Array.isArray(fragChildren)
          ? fragChildren.map((child) => this.visit(child, context)).join("")
          : this.visit(fragChildren, context);
      }

      // For other element types, use the mapping
      const children = node.props.children || [];
      const childResults = Array.isArray(children)
        ? children.map((child) => this.visit(child, context))
        : [this.visit(children, context)];

      return this.visitElement(node.type, node.props, childResults, context);
    }

    // Fall back to parent implementation for other cases
    return super.visit(node, context);
  }
}

module.exports = CustomVisitor;
