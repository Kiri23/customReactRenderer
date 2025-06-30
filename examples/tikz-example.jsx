const React = require('react');
const { ReactLatexVisitor } = require('../src/renderers/ReactLatex');
const TikZExamplesDocument = require('./TikZExamples');

// Example using the existing TikZExamplesDocument with the new API
console.log('=== TikZ Examples with ReactLatexVisitor() ===');
const tikzOutput = ReactLatexVisitor(<TikZExamplesDocument />);
console.log(tikzOutput);

// You can also save to file like the original latexRenderer.js
const fs = require('fs');
fs.writeFileSync("output-tikz-newYaggedTemplates.tex", tikzOutput);
console.log("TikZ LaTeX document written to output-tikz-new2.tex"); 