# React-to-LaTeX Renderer

A custom React renderer that converts React components to LaTeX code using React Reconciler. This project demonstrates how to create a custom renderer that supports all React features including hooks, context, and conditional rendering. Created by Cursor.

## 🚀 Features

- **Full React Support**: Use `useState`, `useEffect`, `useContext`, and all other React hooks
- **Global Configuration**: Manage document settings with React Context
- **Conditional Rendering**: Show/hide content based on configuration
- **Modular Components**: Reusable LaTeX components
- **Dynamic Content**: Generate different LaTeX outputs based on state
- **TikZ Support**: Ready for diagrams and graphics
- **Production Ready**: Modular architecture with clean separation of concerns

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd customReactRenderer

# Install dependencies
yarn install
```

## 🎯 Quick Start

### Basic Usage

```jsx
const React = require("react");
const { renderToLatex } = require("./latexRenderer");
const { Document, Section, Paragraph, Bold } = require("./components/LatexComponents");

const MyDocument = () => (
  <Document>
    <Section title="Hello World">
      <Paragraph>
        This is a <Bold>bold text</Bold> in LaTeX.
      </Paragraph>
    </Section>
  </Document>
);

const latexOutput = renderToLatex(<MyDocument />);
console.log(latexOutput);
```

### With Global Configuration

```jsx
const React = require("react");
const { LatexConfigProvider } = require("./contexts/LatexConfigContext");
const { ConditionalMath, ConditionalTable } = require("./components/ConditionalSection");
const { Document, Section, Math, Table } = require("./components/LatexComponents");

const DynamicDocument = () => {
  const config = {
    showMath: true,
    showTables: false,
    showAbstract: true
  };

  return (
    <LatexConfigProvider config={config}>
      <Document>
        <ConditionalMath>
          <Section title="Mathematics">
            <Math>E = mc^2</Math>
          </Section>
        </ConditionalMath>
        
        <ConditionalTable>
          <Section title="Data">
            <Table>...</Table>
          </Section>
        </ConditionalTable>
      </Document>
    </LatexConfigProvider>
  );
};

const output = renderToLatex(<DynamicDocument />);
```

## 🧩 Available Components

### Basic Components
- `<Document>` - Main document container
- `<Section>` - Document section
- `<Subsection>` - Document subsection
- `<Paragraph>` - Text paragraph
- `<Bold>` - Bold text
- `<Italic>` - Italic text
- `<Underline>` - Underlined text

### Math Components
- `<Math>` - Inline math
- `<DisplayMath>` - Display math
- `<Equation>` - Numbered equation
- `<ConditionalMath>` - Math with conditional rendering

### List Components
- `<Itemize>` - Unordered list
- `<Enumerate>` - Ordered list
- `<Item>` - List item
- `<ConditionalList>` - List with conditional rendering

### Table Components
- `<Table>` - Table container
- `<Tabular>` - Table content
- `<TableRow>` - Table row
- `<TableCell>` - Table cell
- `<ConditionalTable>` - Table with conditional rendering

### Document Structure
- `<Abstract>` - Document abstract
- `<Keywords>` - Document keywords
- `<References>` - References section
- `<Appendix>` - Appendix section

### Conditional Components
- `<ConditionalSection>` - Generic conditional component
- `<ConditionalExamples>` - Examples with conditional rendering
- `<ConditionalProofs>` - Proofs with conditional rendering
- `<ConditionalNotes>` - Notes with conditional rendering

## ⚙️ Configuration Options

The global configuration supports these options:

```jsx
const config = {
  // Document settings
  language: "english",
  theme: "default",
  
  // Content visibility
  showMath: true,
  showDiagrams: true,
  showTables: true,
  showLists: true,
  showCode: false,
  showReferences: true,
  showAppendix: false,
  showAbstract: true,
  showKeywords: true,
  
  // Section visibility
  showIntroduction: true,
  showMethods: true,
  showResults: true,
  showDiscussion: true,
  showConclusion: true,
  
  // Content settings
  includeExamples: true,
  includeProofs: false,
  includeNotes: false
};
```

## 🔧 Usage Examples

### Example 1: Simple Document

```jsx
const SimpleDocument = () => (
  <Document>
    <Section title="Introduction">
      <Paragraph>
        This is a simple LaTeX document generated with React.
      </Paragraph>
    </Section>
    
    <Section title="Mathematics">
      <Equation label="eq:gaussian">
        {"\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}"}
      </Equation>
    </Section>
  </Document>
);
```

### Example 2: Dynamic Content with Hooks

```jsx
const DynamicDocument = () => {
  const [data, setData] = React.useState([]);
  
  React.useEffect(() => {
    // Load data dynamically
    setData(['Item 1', 'Item 2', 'Item 3']);
  }, []);

  return (
    <Document>
      <Section title="Dynamic Content">
        <Itemize>
          {data.map(item => (
            <Item key={item}>{item}</Item>
          ))}
        </Itemize>
      </Section>
    </Document>
  );
};
```

### Example 3: Configuration-Based Rendering

```jsx
const ConfigurableDocument = () => {
  const { config, updateConfig } = useLatexConfig();
  
  return (
    <Document>
      <ConditionalMath>
        <Section title="Mathematics">
          <Math>f(x) = x^2 + 2x + 1</Math>
        </Section>
      </ConditionalMath>
      
      <ConditionalTable>
        <Section title="Data">
          <Table caption="Results">
            <Tabular align="lcc">
              <TableRow>
                <TableCell>Parameter</TableCell>
                <TableCell>Value</TableCell>
                <TableCell>Unit</TableCell>
              </TableRow>
            </Tabular>
          </Table>
        </Section>
      </ConditionalTable>
    </Document>
  );
};
```

## 🚀 Running the Examples

```bash
# Run the basic renderer
yarn start

# Run the LaTeX renderer with different configurations
yarn latex
```

This will generate three files:
- `output-full.tex` - Complete document with all features
- `output-minimal.tex` - Minimal document with basic content
- `output-math.tex` - Math-focused document

## 🏗️ Architecture

```
customReactRenderer/
├── contexts/
│   └── LatexConfigContext.js    # Global configuration context
├── components/
│   ├── LatexComponents.js       # Basic LaTeX components
│   └── ConditionalSection.js    # Conditional rendering components
├── examples/
│   └── DynamicDocument.jsx      # Example usage
├── latexRenderer.js             # Main renderer
├── index.js                     # Basic text renderer
└── index.jsx                    # JSX version
```

## 🔍 How It Works

1. **React Reconciler**: Uses React's reconciliation algorithm to manage component updates
2. **Custom Host Config**: Defines how React elements are converted to LaTeX
3. **Context API**: Manages global configuration state
4. **Conditional Rendering**: Components show/hide based on configuration
5. **Modular Components**: Reusable LaTeX building blocks

## 🎯 Key Benefits

- **Full React Ecosystem**: Use all React features and patterns
- **Dynamic Content**: Generate different documents based on state
- **Reusable Components**: Build a library of LaTeX components
- **Configuration Driven**: Control document structure with configuration
- **Extensible**: Easy to add new LaTeX features and components

## 🔮 Future Enhancements

- [ ] TikZ diagram components
- [ ] More LaTeX packages support
- [ ] PDF generation
- [ ] Live preview
- [ ] Component library
- [ ] TypeScript support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- React Reconciler for enabling custom renderers
- LaTeX community for documentation
- React team for the amazing framework

---

**Note**: This project demonstrates advanced React concepts and is perfect for learning about custom renderers, React Reconciler, and building domain-specific component libraries. 