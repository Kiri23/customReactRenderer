# JSX LaTeX Renderer

Write LaTeX documents using familiar JSX syntax, like styled-components but for scientific documents.

## What You Get

Write this JSX:
```jsx
<Document>
  <Section title="TikZ Examples">
    <Paragraph>This is a test with <Bold>bold text</Bold>.</Paragraph>
    <TikZDiagram>
      <TikZCircle x={2} y={2} radius={1} options="fill=blue" />
      <TikZRectangle x={4} y={4} width={1.5} height={1} options="fill=red" />
    </TikZDiagram>
  </Section>
</Document>
```

Get this LaTeX:
```latex
\documentclass{article}
\usepackage{tikz}
\usepackage{amsmath}
\usepackage{amsfonts}
\usepackage{amssymb}
\usepackage{graphicx}
\usepackage{pgfplots}
\pgfplotsset{compat=1.18}
\begin{document}

\section{TikZ Examples}

This is a test with \textbf{bold text}.

\begin{figure}[h]
\centering
\begin{tikzpicture}[scale=1]
\draw[fill=blue] (2,2) circle (1cm);
\draw[fill=red] (4,4) rectangle (5.5,5);
\end{tikzpicture}
\end{figure}

\end{document}
```

## Quick Start

### Installation
```bash
yarn add custom-react-renderer
```

### Basic Example
```jsx
const React = require('react');
const {
  Document,
  Section,
  Paragraph,
  Bold,
  TikZDiagram,
  TikZCircle
} = require('./components/LatexComponents');

const MyDocument = () => (
  <Document>
    <Section title="My First LaTeX Document">
      <Paragraph>
        Hello <Bold>LaTeX</Bold> from JSX!
      </Paragraph>
      <TikZDiagram>
        <TikZCircle x={2} y={2} radius={1} options="fill=blue!20, draw=blue" />
      </TikZDiagram>
    </Section>
  </Document>
);

// Render to LaTeX
const { renderToLatex } = require('./latexRenderer');
const latex = renderToLatex(<MyDocument />);
console.log(latex);
```

## Examples

### Mathematical Document
```jsx
const MathDocument = () => (
  <Document>
    <Section title="Mathematical Examples">
      <Paragraph>
        Einstein's equation: <Bold>E = mc²</Bold>
      </Paragraph>
      <TikZDiagram>
        <TikZAxis xmin={-3} ymin={-3} xmax={3} ymax={3} />
        <TikZGrid xmin={-3} ymin={-3} xmax={3} ymax={3} step={0.5} options="gray!20" />
        <TikZLine from={[-2, 4]} to={[2, 4]} options="thick, blue" />
        <TikZNode x={2.5} y={3.5} text="$f(x) = x^2$" options="blue" />
      </TikZDiagram>
    </Section>
  </Document>
);
```

### Complex TikZ Diagram
```jsx
const ComplexDiagram = () => (
  <Document>
    <Section title="Complex TikZ Example">
      <TikZDiagram width="10cm" height="8cm">
        <TikZGrid xmin={0} ymin={0} xmax={6} ymax={6} step={1} options="gray!30" />
        <TikZCircle x={2} y={2} radius={1} options="fill=blue!20, draw=blue" />
        <TikZRectangle x={4} y={4} width={1.5} height={1} options="fill=red!20, draw=red" />
        <TikZLine from={[1, 1]} to={[5, 5]} options="thick, green" />
        <TikZArrow from={[1, 5]} to={[5, 1]} options="->, thick, purple" />
        <TikZNode x={2} y={3.5} text="Circle" options="above" />
        <TikZNode x={4.75} y={4.5} text="Rectangle" options="above" />
      </TikZDiagram>
    </Section>
  </Document>
);
```

## API Reference

### Document Structure
- `Document` - Main document wrapper
- `Section` - Section with title
- `Subsection` - Subsection with title  
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

### TikZ Components
- `TikZDiagram` - TikZ diagram container
- `TikZCircle` - Circle
- `TikZRectangle` - Rectangle
- `TikZLine` - Line
- `TikZArrow` - Arrow
- `TikZNode` - Text node
- `TikZGrid` - Grid
- `TikZAxis` - Coordinate axes

### Component Props

#### TikZ Components
```jsx
<TikZCircle 
  x={2}           // X coordinate
  y={3}           // Y coordinate
  radius={1.5}    // Circle radius
  options="fill=blue!20, draw=blue, thick"  // TikZ options
/>

<TikZRectangle 
  x={1}           // X coordinate
  y={1}           // Y coordinate
  width={3}       // Rectangle width
  height={2}      // Rectangle height
  options="fill=red!20, draw=red"
/>

<TikZLine 
  from={[0, 0]}   // Start point [x, y]
  to={[4, 4]}     // End point [x, y]
  options="thick, green"
/>

<TikZNode 
  x={2}           // X coordinate
  y={3.5}         // Y coordinate
  text="Label"    // Node text
  options="above" // Node options
/>
```

## Running Examples

```bash
# Test the JSX LaTeX renderer
yarn test:jsx-simple

# View the generated LaTeX
cat test-output/jsx-simple.tex
```

## How It Works

The system uses a simplified architecture with React Reconciler and tagged templates:

```
JSX Components → React Reconciler → Simple Visitor → LaTeX Output
```

### Core Components
- **LatexComponents** - JSX components created with `latex` tagged templates
- **RendererCore** - React Reconciler integration for robust JSX processing
- **latexRenderer** - Main API with `renderToLatex()` function
- **Simple Visitor** - Extracts LaTeX from `latex-text` components

### Architecture Benefits
- **Simplified**: Single API function instead of multiple renderers
- **Robust**: Uses React Reconciler for reliable JSX processing
- **Maintainable**: Clean separation between components and rendering
- **Extensible**: Easy to add new components with tagged templates

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add new LaTeX components to `components/LatexComponents.js`
4. Add tests in `tests/`
5. Submit a pull request

## License

MIT 