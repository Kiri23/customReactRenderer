## PRD (Product Requirements Document)

### **React Universal Renderer - Product Requirements Document**

#### **Product Vision**
Crear un sistema de renderizado universal que permita convertir JSX a múltiples formatos de salida, aprovechando React DOM para HTML y proporcionando renderers especializados para LaTeX, Markdown y otros formatos estructurados. **El propósito principal es permitir que los desarrolladores creen sus propios renderers personalizados usando templates y mapping flexible.**

#### **Core Architecture**

**1. Sistema de Templates Registrados**
- Templates modulares y reutilizables (funciones que reciben props y children)
- Mapeo flexible entre JSX y templates (sin naming conventions forzadas)
- Community ecosystem para templates

**2. Renderers Especializados**
- `ReactLatex.render()` - Para LaTeX/PDF (usando templates existentes)
- `ReactMarkdown.render()` - Para Markdown (usando templates existentes)
- `ReactCustom.render()` - **PRINCIPAL**: Para formatos personalizados creados por el usuario

**3. Integración con React DOM**
- Delegación automática a React DOM para HTML
- No reinventar funcionalidad existente

#### **File Structure (Based on existing codebase)**

```
customReactRenderer/
├── src/
│   ├── core/
│   │   ├── BaseRenderer.js          # Clase base que usa el React Reconciler existente
│   │   ├── TemplateRegistry.js      # Sistema de registro de templates
│   │   └── MappingManager.js        # Manejo de mapeos JSX → Template
│   ├── renderers/
│   │   ├── ReactLatex.js            # ReactLatex.render() - refactor del latexRenderer.js existente
│   │   ├── ReactMarkdown.js         # ReactMarkdown.render() - nuevo
│   │   └── ReactCustom.js           # ReactCustom.render() - PRINCIPAL para usuarios
│   ├── templates/
│   │   ├── latex/
│   │   │   └── basic.js             # Template LaTeX básico (extraído del LatexVisitor existente)
│   │   └── markdown/
│   │       └── basic.js             # Template Markdown básico
│   ├── visitors/
│   │   ├── BaseVisitor.js           # Visitor pattern base (EXISTENTE - mantener)
│   │   ├── LatexVisitor.js          # Visitor LaTeX (EXISTENTE - refactorizar)
│   │   ├── HtmlVisitor.js           # Visitor HTML (EXISTENTE - mantener)
│   │   └── MarkdownVisitor.js       # Nuevo visitor Markdown
│   └── index.js                     # Entry point principal
├── examples/
│   ├── basic-usage.jsx              # Ejemplo básico
│   ├── custom-renderer.jsx          # Ejemplo ReactCustom
│   └── latex-example.jsx            # Ejemplo LaTeX
├── tests/
│   ├── renderers.test.js
│   ├── templates.test.js
│   └── integration.test.js
├── package.json                     # EXISTENTE - actualizar
├── latexRenderer.js                 # EXISTENTE - refactorizar
├── visitors/                        # EXISTENTE - mantener estructura
├── examples/                        # EXISTENTE - mantener
└── README.md                        # EXISTENTE - actualizar
```

#### **Core Implementation**

**1. BaseRenderer.js (NUEVO - basado en latexRenderer.js existente) my own react reconciler**
```javascript
const React = require('react');
const Reconciler = require('react-reconciler');

class BaseRenderer {
  constructor(templates, mapping) {
    this.templates = templates;
    this.mapping = mapping;
    this.parser = this.createParser();
  }

  createParser() {
    // USAR EL MISMO hostConfig que está en latexRenderer.js existente
    const hostConfig = {
      now: Date.now,
      getRootHostContext: () => ({}),
      getChildHostContext: () => ({}),
      prepareForCommit: () => {},
      resetAfterCommit: () => {},
      createInstance(type, props) {
        return { type, props, children: [] };
      },
      appendInitialChild(parent, child) {
        parent.children.push(child);
      },
      appendChild(parent, child) {
        parent.children.push(child);
      },
      appendChildToContainer(container, child) {
        container.children.push(child);
      },
      createTextInstance(text) {
        return text;
      },
      finalizeInitialChildren() {
        return false;
      },
      supportsMutation: true,
      prepareUpdate() {
        return true;
      },
      commitUpdate(instance, updatePayload, type, oldProps, newProps) {
        instance.props = newProps;
      },
      commitTextUpdate(textInstance, oldText, newText) {
        // Not needed for this simple renderer
      },
      removeChild(parentInstance, child) {
        parentInstance.children = parentInstance.children.filter(
          (c) => c !== child,
        );
      },
      removeChildFromContainer(container, child) {
        container.children = container.children.filter((c) => c !== child);
      },
      shouldSetTextContent(type, props) {
        return false;
      },
      getPublicInstance(instance) {
        return instance;
      },
      clearContainer(container) {
        container.children = [];
      },
      insertBefore(parentInstance, child, beforeChild) {
        const index = parentInstance.children.indexOf(beforeChild);
        parentInstance.children.splice(index, 0, child);
      },
      insertInContainerBefore(container, child, beforeChild) {
        const index = container.children.indexOf(beforeChild);
        container.children.splice(index, 0, child);
      },
      hideInstance(instance) {
        // Not needed for text renderer
      },
      hideTextInstance(textInstance) {
        // Not needed for text renderer
      },
      unhideInstance(instance, props) {
        // Not needed for text renderer
      },
      unhideTextInstance(textInstance, text) {
        // Not needed for text renderer
      },
      scheduleTimeout: setTimeout,
      cancelTimeout: clearTimeout,
      noTimeout: -1,
      isPrimaryRenderer: true,
      supportsPersistence: false,
      supportsHydration: false,
      getCurrentEventPriority: () => 0,
      getInstanceFromNode: () => null,
      beforeActiveInstanceBlur: () => {},
      afterActiveInstanceBlur: () => {},
      preparePortalMount: () => {},
      scheduleMicrotask: queueMicrotask,
      supportsMicrotasks: true,
    };
    return Reconciler(hostConfig);
  }

  render(jsxElement, options = {}) {
    const container = { children: [] };
    const node = this.parser.createContainer(container, 0, false, null);
    this.parser.updateContainer(jsxElement, node, null, null);
    
    return this.processTree(container, options);
  }

  processTree(container, options) {
    // USAR EL VISITOR PATTERN EXISTENTE pero con templates y mapping
    const visitor = this.createVisitor(options);
    return visitor.visit(container);
  }

  createVisitor(options) {
    // Factory method para crear visitor específico
    throw new Error('Subclasses must implement createVisitor');
  }
}

module.exports = BaseRenderer;
```

**2. TemplateRegistry.js (NUEVO)**
```javascript
class TemplateRegistry {
  constructor() {
    this.templates = new Map();
  }

  register(name, templates, options = {}) {
    this.templates.set(name, templates);
    
    if (options.extends) {
      const baseTemplates = this.templates.get(options.extends);
      if (baseTemplates) {
        this.templates.set(name, { ...baseTemplates, ...templates });
      }
    }
  }

  get(name) {
    return this.templates.get(name);
  }

  list() {
    return Array.from(this.templates.keys());
  }
}

module.exports = TemplateRegistry;
```

**3. ReactCustom.js (PRINCIPAL - NUEVO)**
```javascript
const BaseRenderer = require('../core/BaseRenderer');
const CustomVisitor = require('../visitors/CustomVisitor');

class ReactCustom extends BaseRenderer {
  constructor(config) {
    const { templates, mapping } = config;
    
    if (!templates || !mapping) {
      throw new Error('ReactCustom requires templates and mapping configuration');
    }
    
    super(templates, mapping);
  }

  createVisitor(options) {
    return new CustomVisitor(this.templates, this.mapping, options);
  }

  static render(jsxElement, config) {
    const renderer = new ReactCustom(config);
    return renderer.render(jsxElement);
  }
}

module.exports = ReactCustom;
```

**4. CustomVisitor.js (NUEVO)**
```javascript
const BaseVisitor = require('./BaseVisitor');

class CustomVisitor extends BaseVisitor {
  constructor(templates, mapping, options = {}) {
    super();
    this.templates = templates;
    this.mapping = mapping;
    this.options = options;
  }

  visitElement(type, props, childResults, context) {
    // USAR EL MAPPING para encontrar el template correcto
    const templateName = this.mapping[type];
    
    if (!templateName) {
      console.warn(`No mapping found for element type: ${type}`);
      return childResults.join('');
    }
    
    const template = this.templates[templateName];
    
    if (!template) {
      console.warn(`No template found for: ${templateName}`);
      return childResults.join('');
    }
    
    // EJECUTAR EL TEMPLATE con props y children
    if (typeof template === 'function') {
      return template(props, childResults, context);
    }
    
    return childResults.join('');
  }
}

module.exports = CustomVisitor;
```

**5. ReactLatex.js (REFACTOR del latexRenderer.js existente)**
```javascript
const BaseRenderer = require('../core/BaseRenderer');
const LatexVisitor = require('../visitors/LatexVisitor');

class ReactLatex extends BaseRenderer {
  constructor(templateName = 'basic', customMapping = {}) {
    const registry = new TemplateRegistry();
    
    // Registrar templates LaTeX
    registry.register('basic', require('../templates/latex/basic'));
    
    const templates = registry.get(templateName);
    const mapping = { ...this.getDefaultMapping(), ...customMapping };
    
    super(templates, mapping);
  }

  getDefaultMapping() {
    return {
      'Document': 'document',
      'Section': 'section',
      'Subsection': 'subsection',
      'Bold': 'bold',
      'Italic': 'italic',
      'Table': 'table',
      'Math': 'math',
      'DisplayMath': 'displaymath',
      'TikzDiagram': 'tikzdiagram',
      'TikzCircle': 'tikzcircle',
      'TikzRectangle': 'tikzrectangle',
      'TikzLine': 'tikzline',
      'TikzArrow': 'tikzarrow',
      'TikzNode': 'tikznode',
      'TikzGrid': 'tikzgrid',
      'TikzAxis': 'tikzaxis',
      'TikzFlowchart': 'tikzflowchart',
      'TikzFlowchartNode': 'tikzflowchartnode',
      'TikzFlowchartArrow': 'tikzflowchartarrow'
    };
  }

  createVisitor(options) {
    return new LatexVisitor(this.templates, this.mapping, options);
  }

  static render(jsxElement, templateName = 'basic', customMapping = {}) {
    const renderer = new ReactLatex(templateName, customMapping);
    return renderer.render(jsxElement);
  }
}

module.exports = ReactLatex;
```

**6. templates/latex/basic.js (NUEVO - extraído del LatexVisitor existente)**
```javascript
// Extraer todas las funciones visit* del LatexVisitor.js existente
// y convertirlas en templates

module.exports = {
  document: (props, children) => {
    return `\\documentclass{article}\n\\begin{document}\n${children.join('')}\n\\end{document}`;
  },
  
  section: (props, children) => {
    const title = children[0] || '';
    const content = children.slice(1).join('');
    return `\\section{${title}}\n${content}`;
  },
  
  subsection: (props, children) => {
    const title = children[0] || '';
    const content = children.slice(1).join('');
    return `\\subsection{${title}}\n${content}`;
  },
  
  bold: (props, children) => {
    return `\\textbf{${children.join('')}}`;
  },
  
  italic: (props, children) => {
    return `\\textit{${children.join('')}}`;
  },
  
  math: (props, children) => {
    return `$${children.join('')}$`;
  },
  
  displaymath: (props, children) => {
    return `$$${children.join('')}$$`;
  },
  
  table: (props, children) => {
    return `\\begin{table}\n${children.join('')}\n\\end{table}`;
  },
  
  // TikZ templates (extraídos del LatexVisitor existente)
  tikzdiagram: (props, children) => {
    return `\\begin{tikzpicture}\n${children.join('')}\n\\end{tikzpicture}`;
  },
  
  tikzcircle: (props, children) => {
    const { x = 0, y = 0, radius = 1 } = props;
    return `\\draw (${x},${y}) circle (${radius});`;
  },
  
  tikzrectangle: (props, children) => {
    const { x1 = 0, y1 = 0, x2 = 1, y2 = 1 } = props;
    return `\\draw (${x1},${y1}) rectangle (${x2},${y2});`;
  },
  
  tikzline: (props, children) => {
    const { x1 = 0, y1 = 0, x2 = 1, y2 = 1 } = props;
    return `\\draw (${x1},${y1}) -- (${x2},${y2});`;
  },
  
  tikzarrow: (props, children) => {
    const { x1 = 0, y1 = 0, x2 = 1, y2 = 1 } = props;
    return `\\draw[->] (${x1},${y1}) -- (${x2},${y2});`;
  },
  
  tikznode: (props, children) => {
    const { x = 0, y = 0 } = props;
    return `\\node at (${x},${y}) {${children.join('')}};`;
  },
  
  tikzgrid: (props, children) => {
    const { xmin = 0, ymin = 0, xmax = 5, ymax = 5, step = 1 } = props;
    return `\\draw[step=${step}] (${xmin},${ymin}) grid (${xmax},${ymax});`;
  },
  
  tikzaxis: (props, children) => {
    return `\\begin{axis}\n${children.join('')}\n\\end{axis}`;
  },
  
  tikzflowchart: (props, children) => {
    return `\\begin{tikzpicture}[node distance=2cm]\n${children.join('')}\n\\end{tikzpicture}`;
  },
  
  tikzflowchartnode: (props, children) => {
    const { x = 0, y = 0, shape = 'rectangle' } = props;
    return `\\node[${shape}] at (${x},${y}) {${children.join('')}};`;
  },
  
  tikzflowchartarrow: (props, children) => {
    const { from, to } = props;
    return `\\draw[->] (${from}) -- (${to});`;
  }
};
```

**7. index.js (Entry Point - NUEVO)**
```javascript
const ReactLatex = require('./renderers/ReactLatex');
const ReactMarkdown = require('./renderers/ReactMarkdown');
const ReactCustom = require('./renderers/ReactCustom');

module.exports = {
  ReactLatex,
  ReactMarkdown,
  ReactCustom,
  
  // Convenience functions
  renderToLatex: ReactLatex.render,
  renderToMarkdown: ReactMarkdown.render,
  
  // Core classes for advanced usage
  BaseRenderer: require('./core/BaseRenderer'),
  TemplateRegistry: require('./core/TemplateRegistry'),
  
};
```

#### **Usage Examples**

**1. Basic Usage (Mantener compatibilidad)**
```javascript
const { ReactLatex, ReactMarkdown } = require('react-latex-renderer');

const MyDocument = () => (
  <Document>
    <Section>Introduction</Section>
    <Bold>Important text</Bold>
  </Document>
);

// Render to different formats
const latex = ReactLatex.render(<MyDocument />);
const markdown = ReactMarkdown.render(<MyDocument />);
const html = ReactDOM.renderToString(<MyDocument />); // React DOM
```

**2. Custom Renderer (PRINCIPAL)**
```javascript
const { ReactCustom } = require('react-latex-renderer');

// Usuario crea su propio renderer
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

**3. Custom Templates and Mapping for LaTeX**
```javascript
const latex = ReactLatex.render(
  <MyDocument />,
  'basic', // Template name
  {
    'MyCustomElement': 'custom', // Custom mapping
    'SpecialSection': 'section'
  }
);
```

#### **Migration Strategy**

**Phase 1: Core Infrastructure (PRINCIPAL)**
1. ✅ **Mantener** todo el código existente (visitors, latexRenderer.js)
2. ✅ **Crear** BaseRenderer.js usando el hostConfig existente
3. ✅ **Crear** TemplateRegistry.js
4. ✅ **Crear** ReactCustom.js (PRINCIPAL)
5. ✅ **Crear** CustomVisitor.js
6. ✅ **Extraer** templates del LatexVisitor.js existente
7. ✅ **Refactorizar** latexRenderer.js a ReactLatex.js

**Phase 2: Additional Renderers**
1. Implement ReactMarkdown.render()
2. Create markdown templates
3. Create markdown visitor

**Phase 3: Advanced Features**
1. Template inheritance (extends)
2. Configuration system
3. Plugin architecture

#### **Key Benefits**
- ✅ **Marketing-friendly names**: ReactLatex.render(), ReactMarkdown.render()
- ✅ **Leverages React DOM**: No reinvention for HTML
- ✅ **Flexible mapping**: No forced naming conventions
- ✅ **Community ecosystem**: Reusable templates
- ✅ **Extensible**: Easy to add new renderers
- ✅ **Backward compatible**: Can migrate existing code gradually
- ✅ **PRINCIPAL**: ReactCustom.render() allows users to create any renderer

#### **Implementation Notes for LLM**

**CRITICAL:**
1. **NO eliminar** código existente - solo refactorizar
2. **Mantener** la estructura de visitors existente
3. **Usar** el mismo hostConfig de latexRenderer.js
4. **Extraer** templates del LatexVisitor.js existente
5. **Crear** ReactCustom.js como la funcionalidad principal
6. **Mantener** compatibilidad con la API existente

**Files to modify:**
- `latexRenderer.js` → refactorizar a `ReactLatex.js`
- `visitors/LatexVisitor.js` → extraer templates a `templates/latex/basic.js`
- `package.json` → actualizar para nueva estructura
- `README.md` → actualizar con nueva API

**Files to create:**
- `src/core/BaseRenderer.js`
- `src/core/TemplateRegistry.js`
- `src/renderers/ReactCustom.js`
- `src/renderers/ReactLatex.js`
- `src/visitors/CustomVisitor.js`
- `src/templates/latex/basic.js`
- `src/index.js`