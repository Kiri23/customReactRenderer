const React = require("react");
const { useLatexConfig } = require("../contexts/LatexConfigContext");

const ConditionalSection = ({
  children,
  show,
  configKey,
  fallback = null,
  ...props
}) => {
  const { isVisible } = useLatexConfig();

  // Check if section should be visible
  const shouldShow = show !== undefined ? show : isVisible(configKey);

  if (!shouldShow) {
    return fallback;
  }

  return React.createElement("div", props, children);
};

const ConditionalMath = ({ children, ...props }) => (
  <ConditionalSection configKey="showMath" {...props}>
    {children}
  </ConditionalSection>
);

const ConditionalDiagram = ({ children, ...props }) => (
  <ConditionalSection configKey="showDiagrams" {...props}>
    {children}
  </ConditionalSection>
);

const ConditionalTable = ({ children, ...props }) => (
  <ConditionalSection configKey="showTables" {...props}>
    {children}
  </ConditionalSection>
);

const ConditionalList = ({ children, ...props }) => (
  <ConditionalSection configKey="showLists" {...props}>
    {children}
  </ConditionalSection>
);

const ConditionalCode = ({ children, ...props }) => (
  <ConditionalSection configKey="showCode" {...props}>
    {children}
  </ConditionalSection>
);

const ConditionalExamples = ({ children, ...props }) => (
  <ConditionalSection configKey="includeExamples" {...props}>
    {children}
  </ConditionalSection>
);

const ConditionalProofs = ({ children, ...props }) => (
  <ConditionalSection configKey="includeProofs" {...props}>
    {children}
  </ConditionalSection>
);

const ConditionalNotes = ({ children, ...props }) => (
  <ConditionalSection configKey="includeNotes" {...props}>
    {children}
  </ConditionalSection>
);

module.exports = {
  ConditionalSection,
  ConditionalMath,
  ConditionalDiagram,
  ConditionalTable,
  ConditionalList,
  ConditionalCode,
  ConditionalExamples,
  ConditionalProofs,
  ConditionalNotes,
};
