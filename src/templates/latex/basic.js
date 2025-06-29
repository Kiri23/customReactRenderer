module.exports = {
  document: (props, children) => {
    return `\\documentclass{article}
\\usepackage{amsmath}
\\usepackage{amsfonts}
\\usepackage{amssymb}
\\usepackage{graphicx}
\\usepackage{tikz}
\\usepackage{pgfplots}
\\pgfplotsset{compat=1.18}
\\begin{document}

${children.join("")}

\\end{document}`;
  },

  section: (props, children) => {
    // Expect children: [title, ...content]
    let title = "";
    let content = "";
    if (children.length > 0) {
      title = children[0];
      content = children.slice(1).join("");
    } else {
      title = children.join("");
    }
    return `\\section{${title}}
${content}
`;
  },

  subsection: (props, children) => {
    let title = "";
    let content = "";
    if (children.length > 0) {
      title = children[0];
      content = children.slice(1).join("");
    } else {
      title = children.join("");
    }
    return `\\subsection{${title}}
${content}
`;
  },

  paragraph: (props, children) => {
    return `${children.join("")}

`;
  },

  bold: (props, children) => {
    return `\\textbf{${children.join("")}}`;
  },

  italic: (props, children) => {
    return `\\textit{${children.join("")}}`;
  },

  underline: (props, children) => {
    return `\\underline{${children.join("")}}`;
  },

  math: (props, children) => {
    return `$${children.join("")}$`;
  },

  displaymath: (props, children) => {
    return `\\[${children.join("")}\\]`;
  },

  equation: (props, children) => {
    const label = props?.label ? `\\label{${props.label}}` : "";
    return `\\begin{equation}${label}
${children.join("")}
\\end{equation}

`;
  },

  itemize: (props, children) => {
    return `\\begin{itemize}
${children.join("")}\\end{itemize}

`;
  },

  enumerate: (props, children) => {
    return `\\begin{enumerate}
${children.join("")}\\end{enumerate}

`;
  },

  item: (props, children) => {
    return `\\item ${children.join("")}
`;
  },

  table: (props, children) => {
    const caption = props?.caption ? `\\caption{${props.caption}}` : "";
    return `\\begin{table}[h]
\\centering
${caption}
${children.join("")}\\end{table}

`;
  },

  tabular: (props, children) => {
    return `\\begin{tabular}{${props?.align || "l"}}
${children.join("")}\\end{tabular}`;
  },

  tr: (props, children) => {
    return `${children.join("")} \\\\
`;
  },

  td: (props, children) => {
    return `${children.join("")} & `;
  },

  p: (props, children) => {
    return `${children.join("")}

`;
  },

  div: (props, children) => {
    return `${children.join("")}
`;
  },

  span: (props, children) => {
    return children.join("");
  },

  // TikZ templates (extraídos del LatexVisitor existente)
  tikzdiagram: (props, children) => {
    return `\\begin{figure}[h]
\\centering
\\begin{tikzpicture}[scale=1]
${children.join("")}
\\end{tikzpicture}
\\end{figure}

`;
  },

  tikzcircle: (props, children) => {
    const { x, y, radius, options } = props;
    const opt = options && options.trim() ? `[${options}]` : "";
    return `\\draw${opt} (${x},${y}) circle (${radius}cm);
`;
  },

  tikzrectangle: (props, children) => {
    const { x, y, width: rectWidth, height: rectHeight, options } = props;
    const opt = options && options.trim() ? `[${options}]` : "";
    return `\\draw${opt} (${x},${y}) rectangle (${x + rectWidth},${
      y + rectHeight
    });
`;
  },

  tikzline: (props, children) => {
    const { from, to, options } = props;
    const opt = options && options.trim() ? `[${options}]` : "";
    return `\\draw${opt} (${from[0]},${from[1]}) -- (${to[0]},${to[1]});
`;
  },

  tikzarrow: (props, children) => {
    const { from: arrowFrom, to: arrowTo, options } = props;
    const opt = options && options.trim() ? `[${options}]` : "";
    return `\\draw${opt} (${arrowFrom[0]},${arrowFrom[1]}) -- (${arrowTo[0]},${arrowTo[1]});
`;
  },

  tikznode: (props, children) => {
    const { x, y, text, options } = props;
    const opt = options && options.trim() ? `[${options}]` : "";
    return `\\node${opt} at (${x},${y}) {${text}};
`;
  },

  tikzgrid: (props, children) => {
    const { xmin, ymin, xmax, ymax, step, options } = props;
    const opt = options && options.trim() ? `[${options}]` : "";
    return `\\draw${opt}[step=${step}cm] (${xmin},${ymin}) grid (${xmax},${ymax});
`;
  },

  tikzaxis: (props, children) => {
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
  },

  tikzflowchart: (props, children) => {
    return `\\begin{tikzpicture}[node distance=2cm]
${children.join("")}
\\end{tikzpicture}

`;
  },

  tikzflowchartnode: (props, children) => {
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
  },

  tikzflowchartarrow: (props, children) => {
    const { from: flowFrom, to: flowTo, options } = props;
    const opt = options && options.trim() ? `[${options}]` : "";
    return `\\draw${opt} (${flowFrom[0]},${flowFrom[1]}) -- (${flowTo[0]},${flowTo[1]});
`;
  },
};
