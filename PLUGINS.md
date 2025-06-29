# Plugin System Documentation

The plugin system allows third-party developers to extend the renderer with new output formats, node types, and processing capabilities without modifying the core code.

## How Plugins Work

### 1. Plugin Structure
A plugin is a JavaScript object that defines:
- **Visitors**: New output format renderers
- **Node Types**: New JSX element types
- **Middleware**: Processing functions that run during traversal
- **Metadata**: Plugin information and configuration

```javascript
const MyPlugin = {
  name: 'my-plugin',
  version: '1.0.0',
  description: 'My custom output format',
  
  // Register new visitors
  visitors: {
    'myformat': MyFormatVisitor
  },
  
  // Register new node types
  nodeTypes: ['customnode', 'specialelement'],
  
  // Register middleware
  middleware: [
    (node, context) => { /* processing logic */ }
  ],
  
  // Plugin lifecycle hooks
  onRegister: (pluginManager) => { /* initialization */ },
  onUnregister: (pluginManager) => { /* cleanup */ }
};
```

### 2. Plugin Registration
Plugins are registered with the plugin manager:

```javascript
const { registerPlugin } = require('./latexRenderer');

registerPlugin('my-plugin', MyPlugin);
```

### 3. Plugin Usage
Once registered, plugins provide new visitors and capabilities:

```javascript
const { renderWithPlugin } = require('./latexRenderer');

// Use plugin visitor
const output = renderWithPlugin(<MyComponent />, 'myformat');
```

## Creating a Plugin

### Step 1: Create a Visitor
Extend the BaseVisitor class to create your output format:

```javascript
const BaseVisitor = require('./visitors/BaseVisitor');

class MyFormatVisitor extends BaseVisitor {
  visitDocument(props, childResults, context) {
    return `My Format Document:\n${childResults.join('\n')}`;
  }
  
  visitSection(props, childResults, context) {
    const title = childResults[0] || '';
    const content = childResults.slice(1).join('');
    return `# ${title}\n${content}`;
  }
  
  visitBold(props, childResults, context) {
    return `**${childResults.join('')}**`;
  }
  
  // Handle custom node types
  visitCustomnode(props, childResults, context) {
    return `[CUSTOM: ${childResults.join('')}]`;
  }
}
```

### Step 2: Define Your Plugin
Create the plugin object with all necessary components:

```javascript
const MyPlugin = {
  name: 'my-format-plugin',
  version: '1.0.0',
  description: 'Custom output format for special needs',
  author: 'Your Name',
  
  visitors: {
    'myformat': MyFormatVisitor
  },
  
  nodeTypes: ['customnode', 'specialelement'],
  
  middleware: [
    // Auto-detect language for code blocks
    (node, context) => {
      if (node.type === 'codeblock' && !node.props.language) {
        const content = node.children?.[0] || '';
        if (content.includes('function')) {
          node.props.language = 'javascript';
        }
      }
      return { node, context };
    },
    
    // Add metadata to documents
    (node, context) => {
      if (node.type === 'document') {
        node.props.generatedAt = new Date().toISOString();
      }
      return { node, context };
    }
  ],
  
  config: {
    defaultLanguage: 'text',
    enableAutoDetection: true
  },
  
  onRegister: (pluginManager) => {
    console.log('My format plugin registered!');
  },
  
  onUnregister: (pluginManager) => {
    console.log('My format plugin unregistered');
  }
};
```

### Step 3: Register and Use
Register your plugin and use it:

```javascript
const { registerPlugin, renderWithPlugin } = require('./latexRenderer');

// Register the plugin
registerPlugin('my-format', MyPlugin);

// Use the new format
const output = renderWithPlugin(<MyComponent />, 'myformat');
```

## Plugin Capabilities

### 1. New Output Formats
Plugins can add completely new output formats:

```javascript
// JSON output format
class JSONVisitor extends BaseVisitor {
  visitDocument(props, childResults, context) {
    return JSON.stringify({
      type: 'document',
      content: childResults
    }, null, 2);
  }
}

// XML output format
class XMLVisitor extends BaseVisitor {
  visitDocument(props, childResults, context) {
    return `<?xml version="1.0"?>\n<document>${childResults.join('')}</document>`;
  }
}
```

### 2. New Node Types
Plugins can introduce new JSX element types:

```javascript
// Custom chart element
<chart type="bar" data={[1,2,3,4]} />

// Custom form element
<form action="/submit" method="post">
  <input type="text" name="username" />
</form>

// Custom diagram element
<diagram type="flowchart">
  <node id="start" label="Start" />
  <node id="end" label="End" />
  <edge from="start" to="end" />
</diagram>
```

### 3. Middleware Processing
Plugins can add processing logic that runs during traversal:

```javascript
middleware: [
  // Validate links
  (node, context) => {
    if (node.type === 'link' && node.props.href) {
      if (!isValidUrl(node.props.href)) {
        console.warn(`Invalid URL: ${node.props.href}`);
      }
    }
    return { node, context };
  },
  
  // Auto-number sections
  (node, context) => {
    if (node.type === 'section') {
      const sectionNumber = getNextSectionNumber();
      node.props.number = sectionNumber;
    }
    return { node, context };
  },
  
  // Add metadata
  (node, context) => {
    if (node.type === 'document') {
      node.props.metadata = {
        generatedAt: new Date(),
        version: '1.0.0',
        author: 'Plugin System'
      };
    }
    return { node, context };
  }
]
```

## Real-World Plugin Examples

### 1. Markdown Plugin
```javascript
const MarkdownPlugin = {
  name: 'markdown-renderer',
  visitors: { 'markdown': MarkdownVisitor },
  nodeTypes: ['codeblock', 'link', 'image'],
  middleware: [
    // Auto-detect code language
    (node, context) => {
      if (node.type === 'codeblock') {
        node.props.language = detectLanguage(node.children[0]);
      }
      return { node, context };
    }
  ]
};
```

### 2. PDF Plugin
```javascript
const PDFPlugin = {
  name: 'pdf-renderer',
  visitors: { 'pdf': PDFVisitor },
  nodeTypes: ['pagebreak', 'header', 'footer'],
  middleware: [
    // Add page breaks for sections
    (node, context) => {
      if (node.type === 'section' && context.depth === 1) {
        // Insert page break
      }
      return { node, context };
    }
  ]
};
```

### 3. SVG Plugin
```javascript
const SVGPlugin = {
  name: 'svg-renderer',
  visitors: { 'svg': SVGVisitor },
  nodeTypes: ['circle', 'rectangle', 'line', 'path'],
  middleware: [
    // Auto-calculate dimensions
    (node, context) => {
      if (node.type === 'svg') {
        node.props.viewBox = calculateViewBox(node.children);
      }
      return { node, context };
    }
  ]
};
```

## Plugin Management

### Available Functions
```javascript
const {
  registerPlugin,
  getAvailableVisitors,
  listPlugins,
  renderWithPlugin
} = require('./latexRenderer');

// Register a plugin
registerPlugin('my-plugin', MyPlugin);

// List all available visitors
console.log(getAvailableVisitors()); // ['latex', 'html', 'myformat']

// List all registered plugins
console.log(listPlugins());

// Use a plugin visitor
const output = renderWithPlugin(<Component />, 'myformat');
```

### Plugin Lifecycle
1. **Registration**: Plugin is registered with metadata validation
2. **Initialization**: `onRegister` hook is called
3. **Usage**: Plugin visitors and middleware are available
4. **Cleanup**: `onUnregister` hook is called when plugin is removed

## Best Practices

### 1. Plugin Design
- Keep plugins focused on a single responsibility
- Use descriptive names for visitors and node types
- Provide clear documentation for your plugin
- Handle errors gracefully in middleware

### 2. Performance
- Keep middleware lightweight
- Avoid expensive operations during traversal
- Cache expensive computations when possible

### 3. Compatibility
- Extend BaseVisitor for consistency
- Use the context system for smart processing
- Follow the established patterns for node types

### 4. Testing
- Test your visitor methods independently
- Test middleware with various node types
- Test plugin registration and unregistration

## Publishing Plugins

### 1. Package Structure
```
my-renderer-plugin/
├── package.json
├── index.js          # Plugin entry point
├── visitors/
│   └── MyVisitor.js
├── middleware/
│   └── processing.js
└── README.md
```

### 2. Package.json
```json
{
  "name": "my-renderer-plugin",
  "version": "1.0.0",
  "description": "Custom output format for React JSX renderer",
  "main": "index.js",
  "keywords": ["react", "renderer", "plugin", "output"],
  "peerDependencies": {
    "react": "^18.0.0"
  }
}
```

### 3. Plugin Entry Point
```javascript
// index.js
const MyPlugin = require('./MyPlugin');
module.exports = MyPlugin;
```

## Conclusion

The plugin system provides a powerful way to extend the renderer with new capabilities. By following the established patterns and best practices, you can create plugins that integrate seamlessly with the existing architecture while providing new output formats and processing capabilities.

The system is designed to be:
- **Extensible**: Easy to add new capabilities
- **Maintainable**: Clear separation of concerns
- **Performant**: Lightweight middleware system
- **Compatible**: Works with existing visitors and node types 