const BaseElementVisitor = require("./BaseVisitor");

// Concrete visitor for LaTeX generation
class LatexVisitor extends BaseElementVisitor {
  visitText(text, context) {
    // Escape LaTeX special characters
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

  visitDocument(props, childResults, context) {
    return `\\documentclass{article}
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
    // Expect children: [title, ...content]
    let title = "";
    let content = "";
    if (childResults.length > 0) {
      title = childResults[0];
      content = childResults.slice(1).join("");
    } else {
      title = childResults.join("");
    }
    return `\\section{${title}}
${content}
`;
  }

  visitSubsection(props, childResults, context) {
    let title = "";
    let content = "";
    if (childResults.length > 0) {
      title = childResults[0];
      content = childResults.slice(1).join("");
    } else {
      title = childResults.join("");
    }
    return `\\subsection{${title}}
${content}
`;
  }

  visitParagraph(props, childResults, context) {
    return `${childResults.join("")}

`;
  }

  visitBold(props, childResults, context) {
    return `\\textbf{${childResults.join("")}}`;
  }

  visitItalic(props, childResults, context) {
    return `\\textit{${childResults.join("")}}`;
  }

  visitUnderline(props, childResults, context) {
    return `\\underline{${childResults.join("")}}`;
  }

  visitMath(props, childResults, context) {
    return `$${childResults.join("")}$`;
  }

  visitDisplaymath(props, childResults, context) {
    return `\\[${childResults.join("")}\\]`;
  }

  visitEquation(props, childResults, context) {
    const label = props?.label ? `\\label{${props.label}}` : "";
    return `\\begin{equation}${label}
${childResults.join("")}
\\end{equation}

`;
  }

  visitItemize(props, childResults, context) {
    return `\\begin{itemize}
${childResults.join("")}\\end{itemize}

`;
  }

  visitEnumerate(props, childResults, context) {
    return `\\begin{enumerate}
${childResults.join("")}\\end{enumerate}

`;
  }

  visitItem(props, childResults, context) {
    return `\\item ${childResults.join("")}
`;
  }

  visitTable(props, childResults, context) {
    const caption = props?.caption ? `\\caption{${props.caption}}` : "";
    return `\\begin{table}[h]
\\centering
${caption}
${childResults.join("")}\\end{table}

`;
  }

  visitTabular(props, childResults, context) {
    return `\\begin{tabular}{${props?.align || "l"}}
${childResults.join("")}\\end{tabular}`;
  }

  visitTr(props, childResults, context) {
    return `${childResults.join("")} \\\\
`;
  }

  visitTd(props, childResults, context) {
    return `${childResults.join("")} & `;
  }

  visitP(props, childResults, context) {
    return `${childResults.join("")}

`;
  }

  visitDiv(props, childResults, context) {
    return `${childResults.join("")}
`;
  }

  visitSpan(props, childResults, context) {
    return childResults.join("");
  }

  // TikZ Components
  visitTikzdiagram(props, childResults, context) {
    return `\\begin{figure}[h]
\\centering
\\begin{tikzpicture}[scale=1]
${childResults.join("")}
\\end{tikzpicture}
\\end{figure}

`;
  }

  visitTikzcircle(props, childResults, context) {
    const { x, y, radius, options } = props;
    const opt = options && options.trim() ? `[${options}]` : "";
    return `\\draw${opt} (${x},${y}) circle (${radius}cm);
`;
  }

  visitTikzrectangle(props, childResults, context) {
    const { x, y, width: rectWidth, height: rectHeight, options } = props;
    const opt = options && options.trim() ? `[${options}]` : "";
    return `\\draw${opt} (${x},${y}) rectangle (${x + rectWidth},${
      y + rectHeight
    });
`;
  }

  visitTikzline(props, childResults, context) {
    const { from, to, options } = props;
    const opt = options && options.trim() ? `[${options}]` : "";
    return `\\draw${opt} (${from[0]},${from[1]}) -- (${to[0]},${to[1]});
`;
  }

  visitTikzarrow(props, childResults, context) {
    const { from: arrowFrom, to: arrowTo, options } = props;
    const opt = options && options.trim() ? `[${options}]` : "";
    return `\\draw${opt} (${arrowFrom[0]},${arrowFrom[1]}) -- (${arrowTo[0]},${arrowTo[1]});
`;
  }

  visitTikznode(props, childResults, context) {
    const { x, y, text, options } = props;
    const opt = options && options.trim() ? `[${options}]` : "";
    return `\\node${opt} at (${x},${y}) {${text}};
`;
  }

  visitTikzgrid(props, childResults, context) {
    const { xmin, ymin, xmax, ymax, step, options } = props;
    const opt = options && options.trim() ? `[${options}]` : "";
    return `\\draw${opt}[step=${step}cm] (${xmin},${ymin}) grid (${xmax},${ymax});
`;
  }

  visitTikzaxis(props, childResults, context) {
    const {
      xmin: axmin,
      ymin: aymin,
      xmax: axmax,
      ymax: aymax,
      options,
    } = props;
    const opt = options && options.trim() ? `[${options}]` : "";
    return `\\draw${opt} [->] (${axmin},0) -- (${axmax},0) node[right] {$x$};
\\draw${opt} [->] (0,${aymin}) -- (0,${aymax}) node[above] {$y$};
`;
  }

  visitTikzflowchart(props, childResults, context) {
    return `\\begin{tikzpicture}[node distance=2cm]
${childResults.join("")}
\\end{tikzpicture}

`;
  }

  visitTikzflowchartnode(props, childResults, context) {
    const { x, y, text: nodeText, shape: nodeShape, options } = props;
    const shapeCmd =
      nodeShape === "circle"
        ? "circle"
        : nodeShape === "diamond"
        ? "diamond"
        : "rectangle";
    const opt = options && options.trim() ? `[${options}]` : "";
    return `\\node${opt}[${shapeCmd}, draw] at (${x},${y}) {${nodeText}};
`;
  }

  visitTikzflowchartarrow(props, childResults, context) {
    const { from: flowFrom, to: flowTo, options } = props;
    const opt = options && options.trim() ? `[${options}]` : "";
    return `\\draw${opt} (${flowFrom[0]},${flowFrom[1]}) -- (${flowTo[0]},${flowTo[1]});
`;
  }

  visitElement(type, props, childResults, context) {
    // Handle latex-component type for JSX support
    if (type === "latex-component") {
      return props.__latexTemplate({
        ...props,
        children: childResults.join(""),
      });
    }

    // Default behavior - delegate to specific visitor methods
    const visitorMethod = `visit${this.capitalizeFirst(type)}`;
    if (this[visitorMethod]) {
      return this[visitorMethod](props, childResults, context);
    }
    return childResults.join("");
  }
}

module.exports = LatexVisitor;
