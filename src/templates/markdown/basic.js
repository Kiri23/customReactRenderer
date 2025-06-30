// Does not work , it need to be converted to use tagged templates
module.exports = {
  document: (props, children) => {
    return `${children.join("")}`;
  },

  section: (props, children) => {
    const title = children[0] || "";
    const content = children.slice(1).join("");
    return `# ${title}\n\n${content}`;
  },

  subsection: (props, children) => {
    const title = children[0] || "";
    const content = children.slice(1).join("");
    return `## ${title}\n\n${content}`;
  },

  paragraph: (props, children) => {
    return `${children.join("")}\n\n`;
  },

  bold: (props, children) => {
    return `**${children.join("")}**`;
  },

  italic: (props, children) => {
    return `*${children.join("")}*`;
  },

  underline: (props, children) => {
    return `__${children.join("")}__`;
  },

  math: (props, children) => {
    return `$${children.join("")}$`;
  },

  displaymath: (props, children) => {
    return `$$${children.join("")}$$`;
  },

  itemize: (props, children) => {
    return `${children.join("")}\n`;
  },

  enumerate: (props, children) => {
    return `${children.join("")}\n`;
  },

  item: (props, children) => {
    return `- ${children.join("")}\n`;
  },

  table: (props, children) => {
    return `${children.join("")}\n`;
  },

  tabular: (props, children) => {
    return `${children.join("")}`;
  },

  tr: (props, children) => {
    return `| ${children.join(" | ")} |\n`;
  },

  td: (props, children) => {
    return children.join("");
  },

  p: (props, children) => {
    return `${children.join("")}\n\n`;
  },

  div: (props, children) => {
    return `${children.join("")}\n`;
  },

  span: (props, children) => {
    return children.join("");
  },
};
