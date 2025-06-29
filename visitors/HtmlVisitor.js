const BaseElementVisitor = require("./BaseVisitor");

// Concrete visitor for HTML generation - shows the power of the visitor pattern
class HtmlVisitor extends BaseElementVisitor {
  visitText(text, context) {
    // HTML escape special characters
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  visitDocument(props, childResults, context) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Document</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .math { font-family: 'Times New Roman', serif; }
        .tikz-diagram { border: 1px solid #ccc; padding: 20px; margin: 20px 0; }
    </style>
</head>
<body>
    ${childResults.join("")}
</body>
</html>`;
  }

  visitSection(props, childResults, context) {
    let title = "";
    let content = "";
    if (childResults.length > 0) {
      title = childResults[0];
      content = childResults.slice(1).join("");
    } else {
      title = childResults.join("");
    }
    return `<section>
    <h1>${title}</h1>
    ${content}
</section>`;
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
    return `<section>
    <h2>${title}</h2>
    ${content}
</section>`;
  }

  visitParagraph(props, childResults, context) {
    return `<p>${childResults.join("")}</p>`;
  }

  visitBold(props, childResults, context) {
    return `<strong>${childResults.join("")}</strong>`;
  }

  visitItalic(props, childResults, context) {
    return `<em>${childResults.join("")}</em>`;
  }

  visitUnderline(props, childResults, context) {
    return `<u>${childResults.join("")}</u>`;
  }

  visitMath(props, childResults, context) {
    return `<span class="math">$${childResults.join("")}$</span>`;
  }

  visitDisplaymath(props, childResults, context) {
    return `<div class="math" style="text-align: center; margin: 20px 0;">
    $${childResults.join("")}$
</div>`;
  }

  visitEquation(props, childResults, context) {
    const label = props?.label ? ` id="${props.label}"` : "";
    return `<div class="math" style="text-align: center; margin: 20px 0;"${label}>
    $${childResults.join("")}$
</div>`;
  }

  visitItemize(props, childResults, context) {
    return `<ul>
    ${childResults.join("")}
</ul>`;
  }

  visitEnumerate(props, childResults, context) {
    return `<ol>
    ${childResults.join("")}
</ol>`;
  }

  visitItem(props, childResults, context) {
    return `<li>${childResults.join("")}</li>`;
  }

  visitTable(props, childResults, context) {
    const caption = props?.caption ? `<caption>${props.caption}</caption>` : "";
    return `<table style="border-collapse: collapse; margin: 20px 0;">
    ${caption}
    ${childResults.join("")}
</table>`;
  }

  visitTabular(props, childResults, context) {
    return `<tbody>
    ${childResults.join("")}
</tbody>`;
  }

  visitTr(props, childResults, context) {
    return `<tr>
    ${childResults.join("")}
</tr>`;
  }

  visitTd(props, childResults, context) {
    return `<td style="border: 1px solid #ccc; padding: 8px;">${childResults.join(
      "",
    )}</td>`;
  }

  visitP(props, childResults, context) {
    return `<p>${childResults.join("")}</p>`;
  }

  visitDiv(props, childResults, context) {
    return `<div>${childResults.join("")}</div>`;
  }

  visitSpan(props, childResults, context) {
    return `<span>${childResults.join("")}</span>`;
  }

  // TikZ Components - convert to HTML/CSS or SVG
  visitTikzdiagram(props, childResults, context) {
    return `<div class="tikz-diagram">
    <h3>TikZ Diagram</h3>
    <div class="tikz-content">
        ${childResults.join("")}
    </div>
</div>`;
  }

  visitTikzcircle(props, childResults, context) {
    const { x, y, radius, options } = props;
    const style = `position: absolute; left: ${x * 20}px; top: ${
      y * 20
    }px; width: ${radius * 40}px; height: ${
      radius * 40
    }px; border: 2px solid black; border-radius: 50%;`;
    return `<div style="${style}"></div>`;
  }

  visitTikzrectangle(props, childResults, context) {
    const { x, y, width: rectWidth, height: rectHeight, options } = props;
    const style = `position: absolute; left: ${x * 20}px; top: ${
      y * 20
    }px; width: ${rectWidth * 20}px; height: ${
      rectHeight * 20
    }px; border: 2px solid black;`;
    return `<div style="${style}"></div>`;
  }

  visitTikzline(props, childResults, context) {
    const { from, to, options } = props;
    const x1 = from[0] * 20;
    const y1 = from[1] * 20;
    const x2 = to[0] * 20;
    const y2 = to[1] * 20;
    return `<svg style="position: absolute; width: 100%; height: 100%;">
    <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="black" stroke-width="2"/>
</svg>`;
  }

  visitTikzarrow(props, childResults, context) {
    const { from: arrowFrom, to: arrowTo, options } = props;
    const x1 = arrowFrom[0] * 20;
    const y1 = arrowFrom[1] * 20;
    const x2 = arrowTo[0] * 20;
    const y2 = arrowTo[1] * 20;
    return `<svg style="position: absolute; width: 100%; height: 100%;">
    <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="black"/>
        </marker>
    </defs>
    <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="black" stroke-width="2" marker-end="url(#arrowhead)"/>
</svg>`;
  }

  visitTikznode(props, childResults, context) {
    const { x, y, text, options } = props;
    const style = `position: absolute; left: ${x * 20}px; top: ${
      y * 20
    }px; transform: translate(-50%, -50%);`;
    return `<div style="${style}">${text}</div>`;
  }

  visitTikzgrid(props, childResults, context) {
    const { xmin, ymin, xmax, ymax, step, options } = props;
    return `<div style="position: relative; width: ${
      (xmax - xmin) * 20
    }px; height: ${
      (ymax - ymin) * 20
    }px; background-image: linear-gradient(#ccc 1px, transparent 1px), linear-gradient(90deg, #ccc 1px, transparent 1px); background-size: ${
      step * 20
    }px ${step * 20}px;">
    ${childResults.join("")}
</div>`;
  }

  visitTikzaxis(props, childResults, context) {
    const {
      xmin: axmin,
      ymin: aymin,
      xmax: axmax,
      ymax: aymax,
      options,
    } = props;
    return `<div style="position: relative; width: ${
      (axmax - axmin) * 20
    }px; height: ${(aymax - aymin) * 20}px;">
    <svg style="position: absolute; width: 100%; height: 100%;">
        <line x1="0" y1="${(aymax - aymin) * 10}" x2="${
      (axmax - axmin) * 20
    }" y2="${(aymax - aymin) * 10}" stroke="black" stroke-width="2"/>
        <line x1="${(axmax - axmin) * 10}" y1="0" x2="${
      (axmax - axmin) * 10
    }" y2="${(aymax - aymin) * 20}" stroke="black" stroke-width="2"/>
        <text x="${(axmax - axmin) * 20 - 10}" y="${
      (aymax - aymin) * 10 - 5
    }">x</text>
        <text x="${(axmax - axmin) * 10 + 5}" y="15">y</text>
    </svg>
</div>`;
  }

  visitTikzflowchart(props, childResults, context) {
    return `<div class="tikz-diagram">
    <h3>Flowchart</h3>
    <div style="position: relative; min-height: 200px;">
        ${childResults.join("")}
    </div>
</div>`;
  }

  visitTikzflowchartnode(props, childResults, context) {
    const { x, y, text: nodeText, shape: nodeShape, options } = props;
    const shapeStyle =
      nodeShape === "circle"
        ? "border-radius: 50%"
        : nodeShape === "diamond"
        ? "transform: rotate(45deg)"
        : "";
    const style = `position: absolute; left: ${x * 20}px; top: ${
      y * 20
    }px; transform: translate(-50%, -50%) ${
      nodeShape === "diamond" ? "rotate(-45deg)" : ""
    }; width: 80px; height: 40px; border: 2px solid black; display: flex; align-items: center; justify-content: center; background: white; ${shapeStyle}`;
    return `<div style="${style}">${nodeText}</div>`;
  }

  visitTikzflowchartarrow(props, childResults, context) {
    const { from: flowFrom, to: flowTo, options } = props;
    const x1 = flowFrom[0] * 20;
    const y1 = flowFrom[1] * 20;
    const x2 = flowTo[0] * 20;
    const y2 = flowTo[1] * 20;
    return `<svg style="position: absolute; width: 100%; height: 100%;">
    <defs>
        <marker id="flowarrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="black"/>
        </marker>
    </defs>
    <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="black" stroke-width="2" marker-end="url(#flowarrow)"/>
</svg>`;
  }
}

module.exports = HtmlVisitor;
