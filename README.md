# React to LaTeX/HTML Renderer with Visitor Pattern

This project demonstrates a powerful approach to rendering React JSX trees into different output formats using the **Visitor Pattern** and **DFS (Depth-First Search)** traversal.

## Architecture Overview

### Core Concepts

1. **Tree Structure**: JSX naturally creates a tree structure, just like React's Virtual DOM
2. **DFS Traversal**: We traverse the tree depth-first, collecting nodes on the way down and building output on the way up
3. **Visitor Pattern**: Each output format (LaTeX, HTML, etc.) is implemented as a separate visitor class
4. **Polymorphism**: Easy to add new output formats by creating new visitor classes

### How It Works

```
JSX Tree → React Reconciler → Container Tree → Visitor Pattern → Output Format
```

1. **JSX Tree**: Your React components create a tree structure
2. **React Reconciler**: Converts JSX to a simple tree representation
3. **DFS Traversal**: Visitor walks the tree depth-first
4. **Polymorphic Processing**: Each node type is handled by specific visitor methods
5. **Output Generation**: Final output is built from the bottom up

## File Structure

```
customReactRenderer/
├── latexRenderer.js          # Main renderer with React reconciler
├── visitors/
│   ├── BaseVisitor.js        # Abstract base visitor class
│   ├── LatexVisitor.js       # LaTeX output visitor
│   └── HtmlVisitor.js        # HTML output visitor
├── examples/
│   ├── DynamicDocument.js    # Example React components
│   └── TikZExamples.js       # TikZ diagram examples
└── README.md                 # This file
```

## Usage

### Basic Usage

```javascript
const { renderToLatex, renderToHtml } = require('./latexRenderer');

// Your JSX component
const MyComponent = () => (
  <document>
    <section>
      <bold>Hello World</bold>
    </section>
  </document>
);

// Generate LaTeX
const latex = renderToLatex(<MyComponent />);
console.log(latex);

// Generate HTML
const html = renderToHtml(<MyComponent />);
console.log(html);
```

### Advanced Usage with Custom Visitors

```javascript
const { renderWithVisitor } = require('./latexRenderer');
const MyCustomVisitor = require('./visitors/MyCustomVisitor');

const visitor = new MyCustomVisitor();
const output = renderWithVisitor(<MyComponent />, visitor);
```

## Creating New Visitors

To add a new output format, simply extend the `BaseVisitor` class:

```javascript
const BaseVisitor = require('./visitors/BaseVisitor');

class MarkdownVisitor extends BaseVisitor {
  visitDocument(props, childResults, context) {
    return childResults.join('\n\n');
  }

  visitSection(props, childResults, context) {
    const title = childResults[0] || '';
    const content = childResults.slice(1).join('');
    return `# ${title}\n\n${content}`;
  }

  visitBold(props, childResults, context) {
    return `**${childResults.join('')}**`;
  }

  // Add more visit methods for other element types...
}

module.exports = MarkdownVisitor;
```

## Supported Element Types

### Basic Elements
- `document` - Document wrapper
- `section` - Section with title and content
- `subsection` - Subsection with title and content
- `paragraph` - Paragraph text
- `bold` - Bold text
- `italic` - Italic text
- `underline` - Underlined text

### Mathematical Elements
- `math` - Inline math
- `displaymath` - Display math
- `equation` - Numbered equation

### Lists and Tables
- `itemize` - Unordered list
- `enumerate` - Ordered list
- `item` - List item
- `table` - Table with caption
- `tabular` - Table body
- `tr` - Table row
- `td` - Table cell

### TikZ Elements
- `tikzdiagram` - TikZ diagram container
- `tikzcircle` - Circle
- `tikzrectangle` - Rectangle
- `tikzline` - Line
- `tikzarrow` - Arrow
- `tikznode` - Text node
- `tikzgrid` - Grid
- `tikzaxis` - Coordinate axes
- `tikzflowchart` - Flowchart container
- `tikzflowchartnode` - Flowchart node
- `tikzflowchartarrow` - Flowchart arrow

## Why This Approach?

### Advantages

1. **Tree Structure Utilization**: Takes full advantage of JSX's natural tree structure
2. **DFS Efficiency**: Processes children before parents, perfect for building nested structures
3. **Polymorphism**: Each element type has its own processing method
4. **Extensibility**: Easy to add new output formats without modifying existing code
5. **Separation of Concerns**: Each visitor handles one output format
6. **React-like**: Follows React's rendering philosophy

### Comparison with Original Approach

**Original (Switch Statement)**:
```javascript
switch (type) {
  case "section": return `\\section{${childLatex}}`;
  case "bold": return `\\textbf{${childLatex}}`;
  // ... many more cases
}
```

**New (Visitor Pattern)**:
```javascript
visitSection(props, childResults, context) {
  return `\\section{${childResults[0]}}\n${childResults.slice(1).join('')}`;
}

visitBold(props, childResults, context) {
  return `\\textbf{${childResults.join('')}}`;
}
```

### Benefits

1. **Cleaner Code**: Each element type has its own method
2. **Better Organization**: Related functionality is grouped together
3. **Easier Testing**: Each visitor method can be tested independently
4. **Multiple Output Formats**: Same tree can generate LaTeX, HTML, Markdown, etc.
5. **Context Awareness**: Visitors can access parent context and accumulated state

## React Rendering Comparison

Yes, this approach is very similar to how React renders the DOM:

1. **Virtual DOM Tree**: React creates a tree of React elements
2. **Reconciliation**: React compares trees and determines changes
3. **Host Environment**: React delegates to host-specific renderers (DOM, React Native, etc.)

Our approach mirrors this:
1. **JSX Tree**: We create a tree of custom elements
2. **Reconciliation**: React Reconciler processes the tree
3. **Visitor Pattern**: We delegate to format-specific visitors (LaTeX, HTML, etc.)

## Future Enhancements

1. **More Output Formats**: Markdown, PDF, SVG, etc.
2. **Context Passing**: Pass accumulated context through the tree
3. **Conditional Rendering**: Support for conditional elements
4. **Error Handling**: Better error handling for malformed trees
5. **Performance Optimization**: Caching and memoization
6. **Plugin System**: Allow third-party visitors

## Conclusion

This architecture provides a clean, extensible, and efficient way to render React JSX trees into various output formats. The visitor pattern combined with DFS traversal takes full advantage of the tree structure while maintaining clean separation of concerns and easy extensibility. 