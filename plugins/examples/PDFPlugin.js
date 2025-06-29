const BaseVisitor = require("../../visitors/BaseVisitor");

// Example PDF Visitor Plugin (simplified - would use a real PDF library)
class PDFVisitor extends BaseVisitor {
  constructor() {
    super();
    this.pdfContent = [];
    this.currentPage = 1;
    this.fontSize = 12;
    this.lineHeight = 1.2;
  }

  visitDocument(props, childResults, context) {
    const stats = this.getAccumulatedStats(context);

    // PDF header
    this.pdfContent.push("%PDF-1.4");
    this.pdfContent.push("1 0 obj");
    this.pdfContent.push("<<");
    this.pdfContent.push("/Type /Catalog");
    this.pdfContent.push("/Pages 2 0 R");
    this.pdfContent.push(">>");
    this.pdfContent.push("endobj");

    // Add content
    this.pdfContent.push(childResults.join("\n"));

    // PDF footer
    this.pdfContent.push("xref");
    this.pdfContent.push("0 3");
    this.pdfContent.push("0000000000 65535 f");
    this.pdfContent.push("trailer");
    this.pdfContent.push("<<");
    this.pdfContent.push("/Size 3");
    this.pdfContent.push("/Root 1 0 R");
    this.pdfContent.push(">>");
    this.pdfContent.push("startxref");
    this.pdfContent.push("%%EOF");

    return this.pdfContent.join("\n");
  }

  visitSection(props, childResults, context) {
    const contextInfo = this.getContextInfo(context);
    const level = contextInfo.depth;

    let title = "";
    let content = "";
    if (childResults.length > 0) {
      title = childResults[0];
      content = childResults.slice(1).join("\n");
    } else {
      title = childResults.join("");
    }

    // PDF section formatting
    const fontSize = Math.max(16 - level * 2, 10);
    const output = [
      `BT`,
      `/F1 ${fontSize} Tf`,
      `50 ${750 - this.currentPage * 50} Td`,
      `(${title}) Tj`,
      `ET`,
      content,
    ];

    this.currentPage++;
    return output.join("\n");
  }

  visitParagraph(props, childResults, context) {
    const text = childResults.join("");
    return [
      `BT`,
      `/F1 ${this.fontSize} Tf`,
      `50 ${750 - this.currentPage * 20} Td`,
      `(${text}) Tj`,
      `ET`,
    ].join("\n");
  }

  visitBold(props, childResults, context) {
    const text = childResults.join("");
    return [
      `BT`,
      `/F2 ${this.fontSize} Tf`, // Bold font
      `(${text}) Tj`,
      `ET`,
    ].join("\n");
  }

  visitMath(props, childResults, context) {
    const math = childResults.join("");
    // In a real implementation, this would use a math rendering library
    return `[Math: ${math}]`;
  }

  visitTable(props, childResults, context) {
    const caption = props?.caption ? `\nCaption: ${props.caption}` : "";
    return childResults.join("\n") + caption;
  }

  visitTr(props, childResults, context) {
    return `| ${childResults.join(" | ")} |`;
  }

  visitTd(props, childResults, context) {
    return childResults.join("");
  }

  // Custom PDF-specific node types
  visitPagebreak(props, childResults, context) {
    this.currentPage++;
    return `\n--- Page ${this.currentPage} ---\n`;
  }

  visitHeader(props, childResults, context) {
    const text = childResults.join("");
    return [`BT`, `/F1 14 Tf`, `50 750 Td`, `(${text}) Tj`, `ET`].join("\n");
  }

  visitFooter(props, childResults, context) {
    const text = childResults.join("");
    return [`BT`, `/F1 10 Tf`, `50 50 Td`, `(${text}) Tj`, `ET`].join("\n");
  }

  visitWatermark(props, childResults, context) {
    const text = props?.text || "DRAFT";
    return [
      `BT`,
      `/F1 48 Tf`,
      `0.5 g`, // Gray color
      `200 400 Td`,
      `(${text}) Tj`,
      `ET`,
      `0 g`, // Reset color
    ].join("\n");
  }
}

// Plugin definition
const PDFPlugin = {
  name: "pdf-renderer",
  version: "1.0.0",
  description: "PDF output format for React JSX trees",
  author: "Example Developer",

  // Register visitors
  visitors: {
    pdf: PDFVisitor,
  },

  // Register new node types
  nodeTypes: ["pagebreak", "header", "footer", "watermark"],

  // Middleware for PDF-specific processing
  middleware: [
    // Middleware to handle page breaks
    (node, context) => {
      if (node.type === "section" && context.depth === 1) {
        // Add page break before main sections
        const pagebreakNode = {
          type: "pagebreak",
          props: {},
          children: [],
        };
        // In a real implementation, you'd insert this before the section
      }
      return { node, context };
    },

    // Middleware to add headers and footers
    (node, context) => {
      if (node.type === "document") {
        // Add header and footer to document
        const headerNode = {
          type: "header",
          props: { text: "Generated Document" },
          children: [],
        };
        const footerNode = {
          type: "footer",
          props: { text: `Page ${context.accumulated?.nodeCount || 1}` },
          children: [],
        };
      }
      return { node, context };
    },

    // Middleware to add watermarks for drafts
    (node, context) => {
      if (node.type === "document" && process.env.NODE_ENV === "development") {
        const watermarkNode = {
          type: "watermark",
          props: { text: "DRAFT" },
          children: [],
        };
      }
      return { node, context };
    },
  ],

  // Plugin configuration
  config: {
    defaultFontSize: 12,
    pageMargins: { top: 50, bottom: 50, left: 50, right: 50 },
    enableWatermarks: true,
    enablePageNumbers: true,
  },

  // Plugin lifecycle hooks
  onRegister: (pluginManager) => {
    console.log("PDF plugin registered successfully");
    console.log(
      "Available PDF features: page breaks, headers, footers, watermarks",
    );
  },

  onUnregister: (pluginManager) => {
    console.log("PDF plugin unregistered");
  },
};

module.exports = PDFPlugin;
