const React = require('react');
const { ReactLatex, ReactMarkdown, ReactCustom } = require('../src');
const { Document, Section, Subsection, Paragraph, Bold, Math } = require('../components/LatexComponents');

const MyDocument = () => (
  <Document>
    <Section>Introduction</Section>
    <Paragraph>This is a paragraph with <Bold>important text</Bold>.</Paragraph>
    <Subsection>Math Example</Subsection>
    <Math>E = mc^2</Math>
  </Document>
);

// Render to different formats
console.log('=== LaTeX Output ===');
const latex = ReactLatex.render(<MyDocument />);
console.log(latex);

console.log('\n=== Markdown Output ===');
const markdown = ReactMarkdown.render(<MyDocument />);
console.log(markdown);

console.log('\n=== Custom YAML Output ===');
const yamlRenderer = ReactCustom.render(
  <MyDocument />,
  {
    templates: {
      document: (props, children) => `document:\n  ${children.join('\n  ')}`,
      section: (props, children) => `section:\n    title: ${children[0]}\n    content: ${children.slice(1).join('')}`,
      subsection: (props, children) => `subsection:\n    title: ${children[0]}\n    content: ${children.slice(1).join('')}`,
      paragraph: (props, children) => `paragraph: ${children.join('')}`,
      bold: (props, children) => `bold: ${children.join('')}`,
      math: (props, children) => `math: ${children.join('')}`
    },
    mapping: {
      'Document': 'document',
      'Section': 'section',
      'Subsection': 'subsection',
      'Paragraph': 'paragraph',
      'Bold': 'bold',
      'Math': 'math'
    }
  }
);
console.log(yamlRenderer); 