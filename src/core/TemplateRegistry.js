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
