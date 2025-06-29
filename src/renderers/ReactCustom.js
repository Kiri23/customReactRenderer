const BaseRenderer = require("../core/BaseRenderer");
const CustomVisitor = require("../visitors/CustomVisitor");

class ReactCustom extends BaseRenderer {
  constructor(config) {
    const { templates, mapping } = config;

    if (!templates || !mapping) {
      throw new Error(
        "ReactCustom requires templates and mapping configuration",
      );
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
