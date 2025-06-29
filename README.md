# React Universal Renderer

A powerful system for converting JSX to multiple output formats using React Reconciler and flexible templates. **The main purpose is to allow developers to create their own custom renderers using templates and flexible mapping.**

## Features

- **ReactLatex.render()** - Render JSX to LaTeX/PDF
- **ReactMarkdown.render()** - Render JSX to Markdown  
- **ReactCustom.render()** - **MAIN**: Create custom renderers with your own templates and mapping
- **Template System** - Modular, reusable templates with inheritance support
- **Flexible Mapping** - No forced naming conventions
- **Community Ecosystem** - Share and reuse templates
- **React DOM Integration** - Leverages existing React DOM for HTML

## Installation

```bash
yarn add custom-react-renderer
```

## Quick Start

### Basic Usage

```javascript
const React = require('react');
const { ReactLatex, ReactMarkdown } = require('custom-react-renderer');

const MyDocument = () => (
  <Document>
    <Section>Introduction</Section>
    <Paragraph>This is a paragraph with <Bold>important text</Bold>.</Paragraph>
    <Subsection>Math Example</Subsection>
    <Math>E = mc^2</Math>
  </Document>
);

// Render to different formats
const latex = ReactLatex.render(<MyDocument />);
const markdown = ReactMarkdown.render(<MyDocument />);
const html = ReactDOM.renderToString(<MyDocument />); // React DOM
```

### Custom Renderer (MAIN FEATURE)

```javascript
const { ReactCustom } = require('custom-react-renderer');

// Create your own YAML renderer
const yamlRenderer = ReactCustom.render(
  <MyDocument />,
  {
    templates: {
      document: (props, children) => `document:\n  ${children.join('\n  ')}`,
      section: (props, children) => `section:\n    title: ${children[0]}\n    content: ${children.slice(1).join('')}`,
      bold: (props, children) => `bold: ${children.join('')}`
    },
    mapping: {
      'Document': 'document',
      'Section': 'section', 
      'Bold': 'bold'
    }
  }
);

console.log(yamlRenderer);
// Output:
// document:
//   section:
//     title: Introduction
//     content: 
//   bold: Important text
```

## API Reference

### ReactLatex.render(jsxElement, templateName?, customMapping?)

Renders JSX to LaTeX format.

```javascript
// Basic usage
const latex = ReactLatex.render(<MyDocument />);

// With custom template
const latex = ReactLatex.render(<MyDocument />, 'basic');

// With custom mapping
const latex = ReactLatex.render(<MyDocument />, 'basic', {
  'MyCustomElement': 'custom',
  'SpecialSection': 'section'
});
```

### ReactMarkdown.render(jsxElement, templateName?, customMapping?)

Renders JSX to Markdown format.

```javascript
const markdown = ReactMarkdown.render(<MyDocument />);
```

### ReactCustom.render(jsxElement, config)

Renders JSX using custom templates and mapping.

```javascript
const output = ReactCustom.render(<MyDocument />, {
  templates: {
    // Template functions that receive (props, children, context)
    document: (props, children) => `...`,
    section: (props, children) => `...`,
    // ...
  },
  mapping: {
    // Maps JSX element names to template names
    'Document': 'document',
    'Section': 'section',
    // ...
  }
});
```

## Creating Custom Templates

Templates are functions that receive props, children, and context:

```javascript
const templates = {
  // Basic template
  section: (props, children) => {
    const title = children[0] || '';
    const content = children.slice(1).join('');
    return `# ${title}\n\n${content}`;
  },
  
  // Template with props
  math: (props, children) => {
    const display = props.display ? '$$' : '$';
    return `${display}${children.join('')}${display}`;
  },
  
  // Template with context
  item: (props, children, context) => {
    const bullet = context.isFirst ? '•' : '  •';
    return `${bullet} ${children.join('')}\n`;
  }
};
```

## Template Inheritance

Templates can inherit from other templates:

```javascript
const registry = new TemplateRegistry();

// Base templates
registry.register('base', {
  document: (props, children) => `DOCUMENT: ${children.join('')}`,
  section: (props, children) => `SECTION: ${children[0]}`
});

// Extended templates
registry.register('extended', {
  section: (props, children) => `ENHANCED: ${children[0]}`,
  paragraph: (props, children) => `PARAGRAPH: ${children.join('')}`
}, { extends: 'base' });
```

## Supported Element Types

### Basic Elements
- `Document` - Document wrapper
- `Section` - Section with title and content
- `Subsection` - Subsection with title and content
- `Paragraph` - Paragraph text
- `Bold` - Bold text
- `Italic` - Italic text
- `Underline` - Underlined text

### Mathematical Elements
- `Math` - Inline math
- `DisplayMath` - Display math
- `Equation` - Numbered equation

### Lists and Tables
- `Itemize` - Unordered list
- `Enumerate` - Ordered list
- `Item` - List item
- `Table` - Table with caption
- `Tabular` - Table body
- `Tr` - Table row
- `Td` - Table cell

### TikZ Elements
- `TikzDiagram` - TikZ diagram container
- `TikzCircle` - Circle
- `TikzRectangle` - Rectangle
- `TikzLine` - Line
- `TikzArrow` - Arrow
- `TikzNode` - Text node
- `TikzGrid` - Grid
- `TikzAxis` - Coordinate axes
- `TikzFlowchart` - Flowchart container
- `TikzFlowchartNode` - Flowchart node
- `TikzFlowchartArrow` - Flowchart arrow

## Examples

### JSON Renderer

```javascript
const jsonRenderer = ReactCustom.render(
  <MyDocument />,
  {
    templates: {
      document: (props, children) => JSON.stringify({ type: 'document', children }, null, 2),
      section: (props, children) => JSON.stringify({ type: 'section', title: children[0] }, null, 2)
    },
    mapping: {
      'Document': 'document',
      'Section': 'section'
    }
  }
);
```

### HTML Renderer

```javascript
const htmlRenderer = ReactCustom.render(
  <MyDocument />,
  {
    templates: {
      document: (props, children) => `<!DOCTYPE html>\n<html>\n<body>\n${children.join('\n')}\n</body>\n</html>`,
      section: (props, children) => `<h1>${children[0]}</h1>\n${children.slice(1).join('')}`,
      bold: (props, children) => `<strong>${children.join('')}</strong>`
    },
    mapping: {
      'Document': 'document',
      'Section': 'section',
      'Bold': 'bold'
    }
  }
);
```

### CSV Renderer

```javascript
const csvRenderer = ReactCustom.render(
  <MyDocument />,
  {
    templates: {
      document: (props, children) => children.join('\n'),
      section: (props, children) => `"Section","${children[0]}"`,
      paragraph: (props, children) => `"Paragraph","${children.join('')}"`
    },
    mapping: {
      'Document': 'document',
      'Section': 'section',
      'Paragraph': 'paragraph'
    }
  }
);
```

## Architecture

The system uses React Reconciler to parse JSX into a tree structure, then applies templates and mapping to generate output:

```
JSX → React Reconciler → Tree Structure → Templates + Mapping → Output
```

### Core Components

- **BaseRenderer** - Base class using React Reconciler
- **TemplateRegistry** - Manages template registration and inheritance
- **CustomVisitor** - Applies templates and mapping during tree traversal
- **ReactLatex** - LaTeX renderer with predefined templates
- **ReactMarkdown** - Markdown renderer with predefined templates
- **ReactCustom** - Custom renderer for user-defined templates

## Migration from Legacy API

The legacy `latexRenderer.js` is still available for backward compatibility:

```javascript
// Legacy API (still works)
const { renderToLatex } = require('./latexRenderer');
const latex = renderToLatex(<MyDocument />);

// New API (recommended)
const { ReactLatex } = require('./src');
const latex = ReactLatex.render(<MyDocument />);
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add your templates to `src/templates/`
4. Add tests in `tests/`
5. Submit a pull request

## License

MIT 