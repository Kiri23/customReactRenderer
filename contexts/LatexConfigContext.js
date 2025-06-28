const React = require("react");

const LatexConfigContext = React.createContext();

const LatexConfigProvider = ({ children, config = {} }) => {
  const [globalConfig, setGlobalConfig] = React.useState({
    // Document settings
    language: "english",
    theme: "default",
    showMath: true,
    showDiagrams: true,
    showTables: true,
    showLists: true,
    showCode: false,
    showReferences: true,
    showAppendix: false,
    showAbstract: true,
    showKeywords: true,
    // Section visibility
    showIntroduction: true,
    showMethods: true,
    showResults: true,
    showDiscussion: true,
    showConclusion: true,
    // Content settings
    includeExamples: true,
    includeProofs: false,
    includeNotes: false,
    // ... other config options
    ...config,
  });

  const updateConfig = React.useCallback((updates) => {
    setGlobalConfig((prev) => ({ ...prev, ...updates }));
  }, []);

  const toggleSection = React.useCallback((sectionName) => {
    setGlobalConfig((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  }, []);

  const value = React.useMemo(
    () => ({
      config: globalConfig,
      updateConfig,
      toggleSection,
      isVisible: (key) => globalConfig[key] !== false,
    }),
    [globalConfig, updateConfig, toggleSection],
  );

  return (
    <LatexConfigContext.Provider value={value}>
      {children}
    </LatexConfigContext.Provider>
  );
};

const useLatexConfig = () => {
  const context = React.useContext(LatexConfigContext);
  if (!context) {
    throw new Error("useLatexConfig must be used within a LatexConfigProvider");
  }
  return context;
};

module.exports = {
  LatexConfigContext,
  LatexConfigProvider,
  useLatexConfig,
};
