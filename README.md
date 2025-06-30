# JSX LaTeX Renderer

A powerful system for creating LaTeX documents using familiar JSX syntax, similar to styled-components but for scientific documents. Write LaTeX documents with React components and tagged templates.

## Features

- **JSX Syntax** - Write LaTeX documents using familiar React components
- **Tagged Templates** - Components created with `latex` tagged template function
- **Nested Structure** - Natural component composition like HTML
- **TikZ Support** - Full TikZ diagram components with props
- **Mathematical Elements** - Math, equations, and scientific notation
- **Type Safety** - Props with proper typing for LaTeX elements
- **React Reconciler** - Built on React's reconciliation system

## Installation

```bash
yarn add custom-react-renderer
```

## Quick Start

### Basic JSX LaTeX Document

```jsx
const React = require('react');
const {
  Document,
  Section,
  Paragraph,
  Bold,
  TikZDiagram,
  TikZCircle,
  TikZRectangle,
  TikZLine
} = require('./components/LatexComponents');

const MyDocument = () => (
  <Document>
    <Section title="TikZ Examples with JSX">
      <Paragraph>
        This document demonstrates TikZ components using JSX with tagged templates.
      </Paragraph>
      
      <Paragraph>
        <Bold>Geometric Shapes:</Bold> Circles, rectangles, and lines.
      </Paragraph>
      
      <TikZDiagram width="10cm" height="8cm">
        <TikZCircle x={2} y={2} radius={1} options="fill=blue!20, draw=blue" />
        <TikZRectangle x={4} y={4} width={1.5} height={1} options="fill=red!20, draw=red" />
        <TikZLine from={[1, 1]} to={[5, 5]} options="thick, green" />
      </TikZDiagram>
    </Section>
  </Document>
);

// Render to LaTeX
const { renderToLatex } = require('./latexRenderer');
const latex = renderToLatex(<MyDocument />);
console.log(latex);
```

### Mathematical Document

```jsx
const MathematicalDocument = () => (
  <Document>
    <Section title="Mathematical Examples">
      <Paragraph>
        Here are some mathematical expressions:
      </Paragraph>
      
      <Paragraph>
        Einstein's famous equation: <Bold>E = mc²</Bold>
      </Paragraph>
      
      <TikZDiagram width="10cm" height="8cm">
        <TikZAxis xmin={-3} ymin={-3} xmax={3} ymax={3} />
        <TikZGrid xmin={-3} ymin={-3} xmax={3} ymax={3} step={0.5} options="gray!20" />
        <TikZLine from={[-2, 4]} to={[2, 4]} options="thick, blue" />
        <TikZNode x={2.5} y={3.5} text="$f(x) = x^2$" options="blue" />
      </TikZDiagram>
    </Section>
  </Document>
);
```

## API Reference

### Core Components

#### Document Structure
- `Document` - Main document wrapper with LaTeX preamble
- `Section` - Section with title and content
- `Subsection` - Subsection with title and content
- `Paragraph` - Paragraph text
- `Bold` - Bold text (`\textbf{}`)
- `Italic` - Italic text (`\textit{}`)
- `Underline` - Underlined text (`\underline{}`)

#### Mathematical Elements
- `Math` - Inline math (`$...$`)
- `DisplayMath` - Display math (`\[...\]`)
- `Equation` - Numbered equation (`\begin{equation}`)

#### Lists and Tables
- `Itemize` - Unordered list (`\begin{itemize}`)
- `Enumerate` - Ordered list (`\begin{enumerate}`)
- `Item` - List item (`\item`)
- `Table` - Table with caption (`\begin{table}`)
- `Tabular` - Table body (`\begin{tabular}`)
- `Tr` - Table row (`\\`)
- `Td` - Table cell (`&`)

#### TikZ Components
- `TikZDiagram` - TikZ diagram container (`\begin{tikzpicture}`)
- `TikZCircle` - Circle (`\draw ... circle`)
- `TikZRectangle` - Rectangle (`\draw ... rectangle`)
- `TikZLine` - Line (`\draw ... --`)
- `TikZArrow` - Arrow (`\draw ... --`)
- `TikZNode` - Text node (`\node`)
- `TikZGrid` - Grid (`\draw ... grid`)
- `TikZAxis` - Coordinate axes (`\draw [->]`)
- `TikZFlowchartNode` - Flowchart node with shapes
- `TikZFlowchartArrow` - Flowchart arrow

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

#### Document Components
```jsx
<Document>
  {/* Document content */}
</Document>

<Section title="Section Title">
  {/* Section content */}
</Section>

<Paragraph>
  {/* Paragraph content */}
</Paragraph>

<Bold>Bold text</Bold>
<Italic>Italic text</Italic>
```

## Examples

### Complete TikZ Document

```jsx
const TikZExamplesDocument = () => (
  <Document>
    <Section title="TikZ Examples with JSX and Tagged Templates">
      <Paragraph>
        This document demonstrates TikZ components using JSX with tagged templates.
        The components are created using the latex tagged template function and can be
        used naturally with JSX syntax.
      </Paragraph>
      
      <Paragraph>
        <Bold>Geometric Shapes:</Bold> Circles, rectangles, lines, and arrows.
      </Paragraph>
      
      <TikZDiagram width="10cm" height="8cm">
        <TikZGrid xmin={0} ymin={0} xmax={6} ymax={6} step={1} options="gray!30" />
        <TikZCircle x={2} y={2} radius={1} options="fill=blue!20, draw=blue" />
        <TikZRectangle x={4} y={4} width={1.5} height={1} options="fill=red!20, draw=red" />
        <TikZLine from={[1, 1]} to={[5, 5]} options="thick, green" />
        <TikZArrow from={[1, 5]} to={[5, 1]} options="->, thick, purple" />
        <TikZNode x={2} y={3.5} text="Circle" options="above" />
        <TikZNode x={4.75} y={4.5} text="Rectangle" options="above" />
        <TikZNode x={3} y={3} text="Line" options="above" />
        <TikZNode x={3} y={3} text="Arrow" options="below" />
      </TikZDiagram>
    </Section>

    <Section title="Mathematical Diagram">
      <Paragraph>
        This section shows a mathematical diagram with axes and a function plot.
      </Paragraph>
      
      <TikZDiagram width="10cm" height="8cm">
        <TikZAxis xmin={-3} ymin={-3} xmax={3} ymax={3} />
        <TikZGrid xmin={-3} ymin={-3} xmax={3} ymax={3} step={0.5} options="gray!20" />
        <TikZLine from={[-2, 4]} to={[-1.5, 2.25]} options="thick, blue" />
        <TikZLine from={[-1.5, 2.25]} to={[-1, 1]} options="thick, blue" />
        <TikZLine from={[-1, 1]} to={[-0.5, 0.25]} options="thick, blue" />
        <TikZLine from={[-0.5, 0.25]} to={[0, 0]} options="thick, blue" />
        <TikZLine from={[0, 0]} to={[0.5, 0.25]} options="thick, blue" />
        <TikZLine from={[0.5, 0.25]} to={[1, 1]} options="thick, blue" />
        <TikZLine from={[1, 1]} to={[1.5, 2.25]} options="thick, blue" />
        <TikZLine from={[1.5, 2.25]} to={[2, 4]} options="thick, blue" />
        <TikZCircle x={0} y={0} radius={0.05} options="fill=red" />
        <TikZCircle x={1} y={1} radius={0.05} options="fill=red" />
        <TikZCircle x={-1} y={1} radius={0.05} options="fill=red" />
        <TikZNode x={2.5} y={3.5} text="$f(x) = x^2$" options="blue" />
        <TikZNode x={0.2} y={0.2} text="$(0,0)$" options="red" />
        <TikZNode x={1.2} y={1.2} text="$(1,1)$" options="red" />
        <TikZNode x={-1.2} y={1.2} text="$(-1,1)$" options="red" />
      </TikZDiagram>
    </Section>
  </Document>
);
```

### Running Examples

```bash
# Test the JSX LaTeX renderer
npm run test:jsx-simple

# View the generated LaTeX
cat output-jsx-simple.tex
```

## Architecture

The system uses React Reconciler to parse JSX into a tree structure, then processes components with tagged templates:

```
JSX Components → React Reconciler → Tree Structure → LatexVisitor → LaTeX Output
```

### Core Components

- **LatexComponents** - JSX components created with `latex` tagged templates
- **LatexVisitor** - Processes the component tree and generates LaTeX
- **latexRenderer** - Main renderer using React Reconciler
- **Tagged Templates** - `latex` function for creating LaTeX components

### How It Works

1. **JSX Components** - Write LaTeX documents using React components
2. **Tagged Templates** - Components use `latex` function for LaTeX templates
3. **React Reconciler** - Parses JSX into a tree structure
4. **Visitor Pattern** - Traverses the tree and generates LaTeX
5. **Output** - Valid LaTeX document ready for compilation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add new LaTeX components to `components/LatexComponents.js`
4. Add tests in `tests/`
5. Submit a pull request

## License

MIT 