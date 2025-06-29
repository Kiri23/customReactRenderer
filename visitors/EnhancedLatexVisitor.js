const LatexVisitor = require("./LatexVisitor");

// Enhanced LaTeX visitor that uses context information
class EnhancedLatexVisitor extends LatexVisitor {
  visitDocument(props, childResults, context) {
    const stats = this.getAccumulatedStats(context);
    const comment = `% Generated document with ${stats.nodeCount} nodes, max depth: ${stats.depth}\n`;

    return `${comment}\\documentclass{article}
\\usepackage{amsmath}
\\usepackage{amsfonts}
\\usepackage{amssymb}
\\usepackage{graphicx}
\\usepackage{tikz}
\\usepackage{pgfplots}
\\pgfplotsset{compat=1.18}
\\begin{document}

${childResults.join("")}

\\end{document}`;
  }

  visitSection(props, childResults, context) {
    const contextInfo = this.getContextInfo(context);
    const indent = "  ".repeat(contextInfo.depth - 1); // Indent based on depth

    let title = "";
    let content = "";
    if (childResults.length > 0) {
      title = childResults[0];
      content = childResults.slice(1).join("");
    } else {
      title = childResults.join("");
    }

    // Add section numbering based on depth
    const sectionNumber = this.getSectionNumber(context);
    const sectionCommand =
      contextInfo.depth === 1 ? "\\section" : "\\subsection";

    return `${indent}${sectionCommand}{${sectionNumber} ${title}}
${indent}${content}
`;
  }

  visitSubsection(props, childResults, context) {
    const contextInfo = this.getContextInfo(context);
    const indent = "  ".repeat(contextInfo.depth - 1);

    let title = "";
    let content = "";
    if (childResults.length > 0) {
      title = childResults[0];
      content = childResults.slice(1).join("");
    } else {
      title = childResults.join("");
    }

    const sectionNumber = this.getSectionNumber(context);
    return `${indent}\\subsection{${sectionNumber} ${title}}
${indent}${content}
`;
  }

  visitItemize(props, childResults, context) {
    const contextInfo = this.getContextInfo(context);
    const indent = "  ".repeat(contextInfo.depth);

    // Add comment about list context
    const listComment = `% List with ${contextInfo.siblings} items at depth ${contextInfo.depth}\n`;

    return `${listComment}${indent}\\begin{itemize}
${childResults.join("")}${indent}\\end{itemize}

`;
  }

  visitEnumerate(props, childResults, context) {
    const contextInfo = this.getContextInfo(context);
    const indent = "  ".repeat(contextInfo.depth);

    const listComment = `% Numbered list with ${contextInfo.siblings} items at depth ${contextInfo.depth}\n`;

    return `${listComment}${indent}\\begin{enumerate}
${childResults.join("")}${indent}\\end{enumerate}

`;
  }

  visitItem(props, childResults, context) {
    const contextInfo = this.getContextInfo(context);
    const indent = "  ".repeat(contextInfo.depth + 1);

    // Add item position info as comment
    const position = contextInfo.isFirst
      ? "first"
      : contextInfo.isLast
      ? "last"
      : "middle";
    const itemComment = `% Item ${contextInfo.index + 1}/${
      contextInfo.siblings
    } (${position})\n`;

    return `${itemComment}${indent}\\item ${childResults.join("")}
`;
  }

  visitTable(props, childResults, context) {
    const contextInfo = this.getContextInfo(context);
    const caption = props?.caption ? `\\caption{${props.caption}}` : "";

    // Add table context info
    const tableComment = `% Table at depth ${contextInfo.depth} with ${contextInfo.siblings} rows\n`;

    return `${tableComment}\\begin{table}[h]
\\centering
${caption}
${childResults.join("")}\\end{table}

`;
  }

  visitTikzdiagram(props, childResults, context) {
    const contextInfo = this.getContextInfo(context);

    // Add diagram context info
    const diagramComment = `% TikZ diagram at depth ${contextInfo.depth} with ${contextInfo.siblings} elements\n`;

    return `${diagramComment}\\begin{figure}[h]
\\centering
\\begin{tikzpicture}[scale=1]
${childResults.join("")}
\\end{tikzpicture}
\\end{figure}

`;
  }

  visitMath(props, childResults, context) {
    const contextInfo = this.getContextInfo(context);

    // Add math context info if in a specific path
    if (this.isInContext(context, ["document", "section"])) {
      return `% Math expression in section context\n$${childResults.join("")}$`;
    }

    return `$${childResults.join("")}$`;
  }

  visitEquation(props, childResults, context) {
    const contextInfo = this.getContextInfo(context);
    const label = props?.label ? `\\label{${props.label}}` : "";

    // Add equation numbering based on context
    const equationNumber = this.getEquationNumber(context);
    const equationComment = `% Equation ${equationNumber} at depth ${contextInfo.depth}\n`;

    return `${equationComment}\\begin{equation}${label}
${childResults.join("")}
\\end{equation}

`;
  }

  // Helper methods for context-aware numbering
  getSectionNumber(context) {
    const path = context.path || [];
    const sectionIndices = path
      .map((item, index) => (item === "section" ? index : -1))
      .filter((index) => index !== -1);

    if (sectionIndices.length === 0) return "";

    const sectionNumber = sectionIndices.length;
    return `${sectionNumber}.`;
  }

  getEquationNumber(context) {
    // This would track equation numbers across the document
    // For now, return a simple counter
    const stats = this.getAccumulatedStats(context);
    return stats.nodeCount || 1;
  }
}

module.exports = EnhancedLatexVisitor;
