# Architecture Documentation

This document explains the technical architecture and design patterns used in the React to LaTeX/HTML renderer.

## Core Design Patterns

### 1. Visitor Pattern
The visitor pattern allows us to separate the algorithm (tree traversal) from the data structure (JSX tree). Each output format is implemented as a separate visitor class.

```javascript
// Base visitor interface
class BaseVisitor {
  visit(node, context) { /* DFS traversal logic */ }
  visitElement(type, props, childResults, context) { /* Polymorphic dispatch */ }
}

// Concrete visitors
class LatexVisitor extends BaseVisitor {
  visitSection(props, childResults, context) { /* LaTeX-specific logic */ }
  visitBold(props, childResults, context) { /* LaTeX-specific logic */ }
}

class HtmlVisitor extends BaseVisitor {
  visitSection(props, childResults, context) { /* HTML-specific logic */ }
  visitBold(props, childResults, context) { /* HTML-specific logic */ }
}
```

### 2. DFS (Depth-First Search) Traversal
We use recursive DFS to traverse the JSX tree, which is optimal for building nested output formats.

```javascript
visit(node, context) {
  // BASE CASE: Leaf nodes (strings)
  if (typeof node === "string") return node;
  
  // RECURSIVE CASE: Process children first (way down)
  const childResults = children.map(child => visit(child, childContext));
  
  // Then process current node (way up)
  return processNode(type, childResults);
}
```

**Traversal Order:**
1. Go all the way down to leaf nodes
2. Collect results from children
3. Build parent output using child results
4. Return up the tree

### 3. Context Passing
Enhanced context system that tracks tree position and accumulated state:

```javascript
const childContext = { 
  ...context, 
  parent: type,
  depth: (context.depth || 0) + 1,
  path: [...(context.path || []), type],
  siblings: children ? children.length : 0,
  index: context.index || 0,
  isFirst: context.index === 0,
  isLast: context.index === (context.siblings - 1),
  accumulated: {
    ...context.accumulated,
    nodeCount: (context.accumulated?.nodeCount || 0) + 1,
    depth: Math.max(context.accumulated?.depth || 0, (context.depth || 0) + 1)
  }
};
```

### 4. React Reconciler Integration
We use React's reconciliation algorithm to manage the JSX tree:

```javascript
const hostConfig = {
  createInstance: (type, props) => ({ type, props, children: [] }),
  appendChild: (parent, child) => parent.children.push(child),
  // ... other host config methods
};

const LatexRenderer = Reconciler(hostConfig);
```

## Architecture Components

### 1. Tree Structure
```
JSX Tree Structure:
document
├── section
│   ├── bold
│   │   └── "Hello" (string)
│   └── paragraph
│       └── "World" (string)
└── math
    └── "E = mc^2" (string)
```

### 2. Processing Pipeline
```
JSX Components → React Reconciler → Container Tree → Visitor Pattern → Output Format
```

1. **JSX Components**: React components create the initial tree
2. **React Reconciler**: Converts JSX to a simple tree representation
3. **Container Tree**: Simple object tree with type, props, and children
4. **Visitor Pattern**: DFS traversal with polymorphic processing
5. **Output Format**: Final LaTeX, HTML, or other format

### 3. Context System
The context system provides rich information during traversal:

- **depth**: Current tree depth (0-based)
- **path**: Array of node types from root to current node
- **siblings**: Number of siblings at current level
- **index**: Position among siblings (0-based)
- **isFirst/isLast**: Boolean flags for position
- **accumulated**: Statistics collected during traversal

### 4. Polymorphic Dispatch
Each node type is processed by a specific visitor method:

```javascript
visitElement(type, props, childResults, context) {
  const visitorMethod = `visit${this.capitalizeFirst(type)}`;
  if (this[visitorMethod]) {
    return this[visitorMethod](props, childResults, context);
  }
  return childResults.join("");
}
```

## Implementation Details

### 1. Two-Phase Processing
**Phase 1 (Down)**: Recursively collect all child results
**Phase 2 (Up)**: Build final output using child results

```javascript
// Phase 1: Collect child results (recursive)
const childResults = children.map(child => visit(child, childContext));

// Phase 2: Build current node output
return this.visitElement(type, props, childResults, context);
```

### 2. Context-Aware Features
The enhanced visitor can make smart decisions based on context:

```javascript
visitSection(props, childResults, context) {
  const contextInfo = this.getContextInfo(context);
  const indent = "  ".repeat(contextInfo.depth - 1);
  const sectionNumber = this.getSectionNumber(context);
  
  return `${indent}\\section{${sectionNumber} ${title}}\n${content}`;
}
```

### 3. Accumulated State
Track statistics across the entire tree:

```javascript
accumulated: {
  nodeCount: (context.accumulated?.nodeCount || 0) + 1,
  depth: Math.max(context.accumulated?.depth || 0, (context.depth || 0) + 1)
}
```

## Design Principles

### 1. Separation of Concerns
- **Tree Traversal**: Handled by BaseVisitor
- **Output Format**: Handled by concrete visitors
- **Context Management**: Shared infrastructure

### 2. Extensibility
- Add new output formats by creating new visitor classes
- Add new node types by adding visit methods
- Enhance context without changing visitor interface

### 3. React-like Philosophy
- Follow React's reconciliation patterns
- Use similar tree traversal strategies
- Maintain component-based thinking

### 4. Performance Considerations
- DFS is optimal for tree-to-string conversion
- Context passing is lightweight
- Polymorphic dispatch is efficient

## Comparison with React's Rendering

| Aspect | React DOM | Our Renderer |
|--------|-----------|--------------|
| Tree Structure | Virtual DOM | JSX Tree |
| Traversal | DFS | DFS |
| Processing | DOM mutations | String generation |
| Host Environment | Browser DOM | LaTeX/HTML |
| Reconciliation | React Reconciler | React Reconciler |

## Benefits of This Architecture

1. **Tree Structure Utilization**: Takes full advantage of JSX's natural tree structure
2. **DFS Efficiency**: Optimal for building nested output formats
3. **Polymorphism**: Each element type has its own processing method
4. **Extensibility**: Easy to add new output formats
5. **Context Awareness**: Rich context information for smart processing
6. **React-like**: Follows React's proven patterns
7. **Clean Separation**: Clear separation of concerns
8. **Testability**: Each component can be tested independently

## Future Enhancements

1. **More Output Formats**: Markdown, PDF, SVG, etc.
2. **Advanced Context**: More sophisticated context passing
3. **Conditional Rendering**: Support for conditional elements
4. **Error Handling**: Better error handling for malformed trees
5. **Performance Optimization**: Caching and memoization
6. **Plugin System**: Allow third-party visitors
7. **Type Safety**: TypeScript support
8. **Validation**: Tree structure validation

## Conclusion

This architecture provides a powerful, extensible, and efficient way to render React JSX trees into various output formats. By combining the visitor pattern with DFS traversal and rich context passing, we create a system that is both elegant and practical. 