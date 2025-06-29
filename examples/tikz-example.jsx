const React = require('react');
const { ReactLatex } = require('../src');
const TikZExamplesDocument = require('./TikZExamples');

// Example using the existing TikZExamplesDocument with the new API
console.log('=== TikZ Examples with ReactLatex.render() ===');
const tikzOutput = ReactLatex.render(<TikZExamplesDocument />);
console.log(tikzOutput);

// You can also save to file like the original latexRenderer.js
const fs = require('fs');
fs.writeFileSync("output-tikz-new2.tex", tikzOutput);
console.log("TikZ LaTeX document written to output-tikz-new.tex"); 