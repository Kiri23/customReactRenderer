const BaseElementVisitor = require("./BaseVisitor");

// Concrete visitor for LaTeX generation
class LatexVisitor extends BaseElementVisitor {
  visitText(text, context) {
    // Only escape LaTeX special characters for direct text content
    // This should not be called for latex-text component content
    return text
      .replace(/\\/g, "\\textbackslash{}")
      .replace(/\{/g, "\\{")
      .replace(/\}/g, "\\}")
      .replace(/\$/g, "\\$")
      .replace(/\^/g, "\\^{}")
      .replace(/_/g, "\\_")
      .replace(/~/g, "\\~{}")
      .replace(/%/g, "\\%")
      .replace(/&/g, "\\&")
      .replace(/#/g, "\\#");
  }

  visitElement(type, props, childResults, context) {
    console.log("visitElement", type, props, childResults, context);

    // Handle latex-text components - return content directly without escaping
    if (type === "latex-text") {
      // For latex-text components, the content is already LaTeX
      // We need to get the raw content from props.children, not from childResults
      if (props && props.children) {
        return String(props.children);
      }
      return childResults.join("");
    }

    // For other types, return children joined (with proper escaping)
    return childResults.join("");
  }
}

module.exports = LatexVisitor;
