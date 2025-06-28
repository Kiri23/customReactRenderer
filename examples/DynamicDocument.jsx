const React = require("react");
const { LatexConfigProvider, useLatexConfig } = require("../contexts/LatexConfigContext");
const { ConditionalMath, ConditionalTable, ConditionalList, ConditionalExamples } = require("../components/ConditionalSection");
const {
  Document,
  Section,
  Subsection,
  Paragraph,
  Bold,
  Italic,
  Math,
  Equation,
  Itemize,
  Item,
  Table,
  Tabular,
  TableRow,
  TableCell,
  Abstract,
  Keywords,
  References
} = require("../components/LatexComponents");

// Component that demonstrates dynamic content based on config
const DynamicContent = () => {
  const { config, updateConfig } = useLatexConfig();
  
  React.useEffect(() => {
    // Simulate loading configuration from external source
    console.log("Document configuration loaded:", config);
  }, [config]);

  return (
    <Document>
      <Abstract>
        This document demonstrates dynamic LaTeX generation using React with global configuration context.
        The content adapts based on the current configuration settings.
      </Abstract>

      <Keywords>
        React, LaTeX, Dynamic Generation, Context API, Conditional Rendering
      </Keywords>

      <Section title="Introduction">
        <Paragraph>
          This is a <Bold>dynamic document</Bold> that shows how React can be used to generate LaTeX content
          with <Italic>conditional rendering</Italic> based on global configuration.
        </Paragraph>

        <ConditionalMath>
          <Paragraph>
            Here's an inline math expression: <Math>E = mc^2</Math>
          </Paragraph>
        </ConditionalMath>
      </Section>

      <ConditionalMath>
        <Section title="Mathematical Content">
          <Subsection title="Equations">
            <Equation label="eq:gaussian">
              {"\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}"}
            </Equation>
            
            <Paragraph>
              The Gaussian integral shown above is a fundamental result in mathematics.
            </Paragraph>
          </Subsection>
        </Section>
      </ConditionalMath>

      <ConditionalTable>
        <Section title="Data Tables">
          <Subsection title="Sample Data">
            <Table caption="Experimental Results">
              <Tabular align="lcc">
                <TableRow>
                  <TableCell><Bold>Parameter</Bold></TableCell>
                  <TableCell><Bold>Value</Bold></TableCell>
                  <TableCell><Bold>Unit</Bold></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Temperature</TableCell>
                  <TableCell>25</TableCell>
                  <TableCell>°C</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Pressure</TableCell>
                  <TableCell>1.013</TableCell>
                  <TableCell>bar</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Humidity</TableCell>
                  <TableCell>60</TableCell>
                  <TableCell>%</TableCell>
                </TableRow>
              </Tabular>
            </Table>
          </Subsection>
        </Section>
      </ConditionalTable>

      <ConditionalList>
        <Section title="Lists and Enumerations">
          <Subsection title="Key Features">
            <Itemize>
              <Item>Dynamic content generation</Item>
              <Item>Global configuration management</Item>
              <Item>Conditional rendering</Item>
              <Item>Modular component architecture</Item>
            </Itemize>
          </Subsection>
        </Section>
      </ConditionalList>

      <ConditionalExamples>
        <Section title="Examples">
          <Subsection title="Code Examples">
            <Paragraph>
              This section shows how code examples can be conditionally included.
            </Paragraph>
            
            <ConditionalMath>
              <Paragraph>
                Example calculation: <Math>f(x) = x^2 + 2x + 1</Math>
              </Paragraph>
            </ConditionalMath>
          </Subsection>
        </Section>
      </ConditionalExamples>

      <References>
        <Itemize>
          <Item>React Documentation - Context API</Item>
          <Item>LaTeX Documentation - Mathematical Typesetting</Item>
          <Item>React Reconciler - Custom Renderers</Item>
        </Itemize>
      </References>
    </Document>
  );
};

// Main component that wraps everything with the provider
const DynamicDocumentExample = ({ initialConfig = {} }) => {
  return (
    <LatexConfigProvider config={initialConfig}>
      <DynamicContent />
    </LatexConfigProvider>
  );
};

module.exports = DynamicDocumentExample; 