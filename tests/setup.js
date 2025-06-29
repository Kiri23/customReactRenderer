// Jest setup file for custom-react-renderer tests

// Global test utilities
global.testUtils = {
  // Helper to create a simple JSX element for testing
  createTestElement: (type, props = {}, children = []) => {
    return { type, props, children };
  },

  // Helper to compare LaTeX output (ignoring whitespace differences)
  normalizeLatex: (latex) => {
    return latex.replace(/\s+/g, " ").replace(/\n\s*/g, "\n").trim();
  },

  // Helper to create test components
  createTestComponent: (name, renderFn) => {
    return { [name]: renderFn };
  },

  // Performance measurement helper
  measurePerformance: (fn, iterations = 1000) => {
    const start = process.hrtime.bigint();
    for (let i = 0; i < iterations; i++) {
      fn();
    }
    const end = process.hrtime.bigint();
    return Number(end - start) / 1000000; // Convert to milliseconds
  },
};

// Mock console.warn to avoid noise in tests
const originalWarn = console.warn;
console.warn = (...args) => {
  // Only show warnings if they're not expected test warnings
  if (
    !args[0]?.includes("No mapping found") &&
    !args[0]?.includes("No template found")
  ) {
    originalWarn(...args);
  }
};

// Global test timeout
jest.setTimeout(10000);

// Suppress React warnings in tests
const originalError = console.error;
console.error = (...args) => {
  if (
    typeof args[0] === "string" &&
    args[0].includes("Warning: ReactDOM.render is no longer supported")
  ) {
    return;
  }
  originalError.call(console, ...args);
};
const originalLog = console.log;
console.log = (...args) => {
  return;
};
