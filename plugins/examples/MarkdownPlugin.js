const BaseVisitor = require("../../visitors/BaseVisitor");

// Example Markdown Visitor Plugin
class MarkdownVisitor extends BaseVisitor {
  visitDocument(props, childResults, context) {
    const stats = this.getAccumulatedStats(context);
    const header = `<!-- Generated with ${stats.nodeCount} nodes -->\n\n`;
    return header + childResults.join("\n\n");
  }

  visitSection(props, childResults, context) {
    const contextInfo = this.getContextInfo(context);
    const level = Math.min(contextInfo.depth, 6); // Markdown supports up to 6 levels
    const hashes = "#".repeat(level);

    let title = "";
    let content = "";
    if (childResults.length > 0) {
      title = childResults[0];
      content = childResults.slice(1).join("\n\n");
    } else {
      title = childResults.join("");
    }

    return `${hashes} ${title}\n\n${content}`;
  }

  visitSubsection(props, childResults, context) {
    return this.visitSection(props, childResults, context);
  }

  visitParagraph(props, childResults, context) {
    return childResults.join("") + "\n\n";
  }

  visitBold(props, childResults, context) {
    return `**${childResults.join("")}**`;
  }

  visitItalic(props, childResults, context) {
    return `*${childResults.join("")}*`;
  }

  visitUnderline(props, childResults, context) {
    return `__${childResults.join("")}__`;
  }

  visitMath(props, childResults, context) {
    return `$${childResults.join("")}$`;
  }

  visitDisplaymath(props, childResults, context) {
    return `$$\n${childResults.join("")}\n$$`;
  }

  visitEquation(props, childResults, context) {
    const label = props?.label ? `\\label{${props.label}}` : "";
    return `$$\n${childResults.join("")}${label}\n$$`;
  }

  visitItemize(props, childResults, context) {
    return childResults.join("\n") + "\n\n";
  }

  visitEnumerate(props, childResults, context) {
    return childResults.join("\n") + "\n\n";
  }

  visitItem(props, childResults, context) {
    const contextInfo = this.getContextInfo(context);
    const indent = "  ".repeat(contextInfo.depth - 1);
    return `${indent}- ${childResults.join("")}`;
  }

  visitTable(props, childResults, context) {
    const caption = props?.caption ? `\n*${props.caption}*` : "";
    return childResults.join("") + caption + "\n\n";
  }

  visitTabular(props, childResults, context) {
    return childResults.join("");
  }

  visitTr(props, childResults, context) {
    return `| ${childResults.join(" | ")} |`;
  }

  visitTd(props, childResults, context) {
    return childResults.join("");
  }

  // Custom node types for Markdown-specific features
  visitCodeblock(props, childResults, context) {
    const language = props?.language || "";
    return `\`\`\`${language}\n${childResults.join("")}\n\`\`\`\n\n`;
  }

  visitInlinecode(props, childResults, context) {
    return `\`${childResults.join("")}\``;
  }

  visitLink(props, childResults, context) {
    const url = props?.href || "#";
    const text = childResults.join("");
    return `[${text}](${url})`;
  }

  visitImage(props, childResults, context) {
    const src = props?.src || "";
    const alt = props?.alt || childResults.join("");
    return `![${alt}](${src})`;
  }

  visitBlockquote(props, childResults, context) {
    const lines = childResults.join("").split("\n");
    const quotedLines = lines.map((line) => `> ${line}`).join("\n");
    return quotedLines + "\n\n";
  }

  visitHorizontalrule(props, childResults, context) {
    return "---\n\n";
  }
}

// Plugin definition
const MarkdownPlugin = {
  name: "markdown-renderer",
  version: "1.0.0",
  description: "Markdown output format for React JSX trees",
  author: "Example Developer",

  // Register visitors
  visitors: {
    markdown: MarkdownVisitor,
  },

  // Register new node types
  nodeTypes: [
    "codeblock",
    "inlinecode",
    "link",
    "image",
    "blockquote",
    "horizontalrule",
  ],

  // Middleware for processing nodes
  middleware: [
    // Middleware to add language hints to code blocks
    (node, context) => {
      if (node.type === "codeblock" && !node.props.language) {
        // Auto-detect language based on content or context
        const content = node.children?.[0] || "";
        if (content.includes("function") || content.includes("const")) {
          node.props.language = "javascript";
        } else if (content.includes("import") || content.includes("from")) {
          node.props.language = "javascript";
        } else if (content.includes("def ") || content.includes("import ")) {
          node.props.language = "python";
        }
      }
      return { node, context };
    },

    // Middleware to validate links
    (node, context) => {
      if (node.type === "link" && node.props.href) {
        const url = node.props.href;
        if (
          !url.startsWith("http") &&
          !url.startsWith("mailto:") &&
          !url.startsWith("#")
        ) {
          console.warn(`Link '${url}' might be invalid`);
        }
      }
      return { node, context };
    },
  ],

  // Plugin lifecycle hooks
  onRegister: (pluginManager) => {
    console.log("Markdown plugin registered successfully");
  },

  onUnregister: (pluginManager) => {
    console.log("Markdown plugin unregistered");
  },
};

module.exports = MarkdownPlugin;
