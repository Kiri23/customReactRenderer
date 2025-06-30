# API Usage Examples

This directory contains examples demonstrating how to use the JSX LaTeX Renderer API with the new simplified architecture.

## Overview

The API now uses a simplified architecture with:
- **RendererCore + React Reconciler**: Robust JSX processing
- **Simple Visitor Pattern**: Extracts LaTeX from `latex-text` components
- **Tagged Templates**: JSX components that generate LaTeX directly
- **Single API**: `renderToLatex()` function for all rendering needs

## Test Files

### Core Examples
- `test-jsx-simple.js` - Simple JSX to LaTeX rendering with TikZ diagrams
- `test-jsx-renderer.js` - Basic renderer functionality demonstration
- `jsx-tagged-template.jsx` - Complete JSX document with TikZ components

### What Each Example Demonstrates

#### `test-jsx-simple.js`
- Basic JSX to LaTeX conversion
- TikZ diagram generation with geometric shapes
- Mathematical diagrams with axes and functions
- Text formatting (bold, italic, math expressions)
- Output saved to `test-output/jsx-simple.tex`

#### `test-jsx-renderer.js`
- Core renderer functionality
- Same content as simple test but different output file
- Output saved to `test-output/output-jsx-latex.tex`

#### `jsx-tagged-template.jsx`
- Complete LaTeX document structure
- Multiple TikZ diagrams with different complexity
- Nested JSX components
- Mathematical expressions and text formatting
- Demonstrates the full power of the tagged templates approach

## Running Examples

```bash
# Run the simple JSX example
yarn test:jsx-simple

# Run the basic renderer example
yarn test:jsx-latex

# Run with babel-node directly
yarn babel-node API-Usage/test-jsx-simple.js
yarn babel-node API-Usage/test-jsx-renderer.js
```

## Available Scripts

The following scripts are available in `package.json`:

```bash
# Test scripts
yarn test:jsx-simple    # Run simple JSX example
yarn test:jsx-latex     # Run basic renderer example

# Development scripts
yarn test               # Run all tests
yarn test:watch         # Run tests in watch mode
yarn test:coverage      # Run tests with coverage
```

## Output

Examples generate `.tex` files in the `test-output/` directory:
- `test-output/jsx-simple.tex` - Output from simple example
- `test-output/output-jsx-latex.tex` - Output from renderer example

## Architecture

### New Simplified Flow
1. **JSX Components**: Created using tagged templates from `LatexComponents.js`
2. **React Reconciler**: Processes JSX tree using `RendererCore`
3. **Simple Visitor**: Extracts LaTeX content from `latex-text` components
4. **Output**: Clean LaTeX code ready for compilation

### Key Components
- `latexRenderer.js` - Main API entry point
- `src/core/RendererCore.js` - React Reconciler integration
- `components/LatexComponents.js` - Tagged template components
- `components/TikZComponents.js` - TikZ-specific components

## Learning Path

1. **Start with `test-jsx-simple.js`** - Basic understanding of JSX to LaTeX conversion
2. **Examine `jsx-tagged-template.jsx`** - See how components are structured
3. **Try `test-jsx-renderer.js`** - Understand the renderer functionality
4. **Explore the components** - Check `LatexComponents.js` and `TikZComponents.js`

## Requirements

- Node.js 14+
- Yarn package manager
- Babel for JSX transformation

## Installation

```bash
# Install dependencies
yarn install

# Run examples
yarn test:jsx-simple
``` 