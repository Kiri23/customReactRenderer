# API Usage Examples

This directory contains various examples and tests demonstrating how to use the JSX LaTeX Renderer API.

## Test Files

### Basic Usage
- `test-jsx-simple.js` - Simple JSX to LaTeX rendering
- `test-jsx-renderer.js` - Basic renderer functionality
- `test-latex-components.js` - LaTeX component definitions with tagged templates
- `test-latex-pure.js` - Pure LaTeX generation without JSX

### TikZ Examples
- `test-tikz-direct.js` - Direct TikZ generation
- `test-tikz-tagged-templates.js` - TikZ with tagged templates
- `test-tikz-simple.js` - Simple TikZ diagrams
- `testTikZ.js` - Comprehensive TikZ examples

### JSX Examples
- `jsx-tagged-template.jsx` - JSX with tagged templates demonstration

## Running Examples

```bash
# Run a specific test
node "API Usage/test-jsx-simple.js"

# Run all tests
npm run test:api-usage
```

## Output

Most examples generate `.tex` files in the root directory or `test-output/` directory. Check the individual files for specific output locations.

## Learning Path

1. Start with `test-jsx-simple.js` for basic understanding
2. Move to `test-latex-components.js` for component definitions
3. Explore `test-tikz-simple.js` for TikZ diagrams
4. Try `jsx-tagged-template.jsx` for advanced usage 