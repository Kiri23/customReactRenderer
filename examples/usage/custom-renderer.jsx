const React = require('react');
const { ReactCustom } = require('../src');
const { Document, Section, Paragraph, Itemize, Item, Bold } = require('../components/LatexComponents');

const MyDocument = () => (
  <Document>
    <Section>Custom Renderer Example</Section>
    <Paragraph>This demonstrates how to create custom renderers.</Paragraph>
    <Itemize>
      <Item>First item</Item>
      <Item>Second item with <Bold>bold text</Bold></Item>
      <Item>Third item</Item>
    </Itemize>
  </Document>
);

// Example 1: JSON Renderer
console.log('=== JSON Output ===');
const jsonRenderer = ReactCustom.render(
  <MyDocument />,
  {
    templates: {
      document: (props, children) => JSON.stringify({ type: 'document', children }, null, 2),
      section: (props, children) => JSON.stringify({ type: 'section', title: children[0], content: children.slice(1) }, null, 2),
      paragraph: (props, children) => JSON.stringify({ type: 'paragraph', content: children.join('') }, null, 2),
      itemize: (props, children) => JSON.stringify({ type: 'list', items: children }, null, 2),
      item: (props, children) => JSON.stringify({ type: 'item', content: children.join('') }, null, 2),
      bold: (props, children) => JSON.stringify({ type: 'bold', content: children.join('') }, null, 2)
    },
    mapping: {
      'Document': 'document',
      'Section': 'section',
      'Paragraph': 'paragraph',
      'Itemize': 'itemize',
      'Item': 'item',
      'Bold': 'bold'
    }
  }
);
console.log(jsonRenderer);

// Example 2: HTML Renderer
console.log('\n=== HTML Output ===');
const htmlRenderer = ReactCustom.render(
  <MyDocument />,
  {
    templates: {
      document: (props, children) => `<!DOCTYPE html>\n<html>\n<body>\n${children.join('\n')}\n</body>\n</html>`,
      section: (props, children) => `<h1>${children[0]}</h1>\n${children.slice(1).join('')}`,
      paragraph: (props, children) => `<p>${children.join('')}</p>`,
      itemize: (props, children) => `<ul>\n${children.join('\n')}\n</ul>`,
      item: (props, children) => `  <li>${children.join('')}</li>`,
      bold: (props, children) => `<strong>${children.join('')}</strong>`
    },
    mapping: {
      'Document': 'document',
      'Section': 'section',
      'Paragraph': 'paragraph',
      'Itemize': 'itemize',
      'Item': 'item',
      'Bold': 'bold'
    }
  }
);
console.log(htmlRenderer);

// Example 3: CSV Renderer
console.log('\n=== CSV Output ===');
const csvRenderer = ReactCustom.render(
  <MyDocument />,
  {
    templates: {
      document: (props, children) => children.join('\n'),
      section: (props, children) => `"Section","${children[0]}"`,
      paragraph: (props, children) => `"Paragraph","${children.join('')}"`,
      itemize: (props, children) => children.map(child => `"List Item","${child}"`).join('\n'),
      item: (props, children) => children.join(''),
      bold: (props, children) => `**${children.join('')}**`
    },
    mapping: {
      'Document': 'document',
      'Section': 'section',
      'Paragraph': 'paragraph',
      'Itemize': 'itemize',
      'Item': 'item',
      'Bold': 'bold'
    }
  }
);
console.log(csvRenderer); 