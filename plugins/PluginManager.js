// Plugin Manager for extensible visitor system
class PluginManager {
  constructor() {
    this.plugins = new Map();
    this.visitors = new Map();
    this.nodeTypes = new Set();
    this.middleware = [];
  }

  // Register a plugin with its metadata and capabilities
  registerPlugin(name, plugin) {
    if (this.plugins.has(name)) {
      throw new Error(`Plugin '${name}' is already registered`);
    }

    const pluginInfo = {
      name,
      version: plugin.version || "1.0.0",
      description: plugin.description || "",
      visitors: plugin.visitors || {},
      nodeTypes: plugin.nodeTypes || [],
      middleware: plugin.middleware || [],
      dependencies: plugin.dependencies || [],
      ...plugin,
    };

    // Validate plugin
    this.validatePlugin(pluginInfo);

    // Register visitors
    Object.entries(pluginInfo.visitors).forEach(
      ([visitorName, visitorClass]) => {
        this.registerVisitor(visitorName, visitorClass, name);
      },
    );

    // Register node types
    pluginInfo.nodeTypes.forEach((nodeType) => {
      this.registerNodeType(nodeType, name);
    });

    // Register middleware
    pluginInfo.middleware.forEach((middleware) => {
      this.registerMiddleware(middleware, name);
    });

    this.plugins.set(name, pluginInfo);
    console.log(`Plugin '${name}' registered successfully`);
  }

  // Register a visitor from a plugin
  registerVisitor(name, visitorClass, pluginName) {
    if (this.visitors.has(name)) {
      throw new Error(
        `Visitor '${name}' is already registered by another plugin`,
      );
    }

    // Validate that it extends BaseVisitor
    if (!this.isValidVisitor(visitorClass)) {
      throw new Error(`Visitor '${name}' must extend BaseVisitor`);
    }

    this.visitors.set(name, {
      class: visitorClass,
      plugin: pluginName,
    });
  }

  // Register a new node type
  registerNodeType(nodeType, pluginName) {
    this.nodeTypes.add(nodeType);
  }

  // Register middleware for processing
  registerMiddleware(middleware, pluginName) {
    this.middleware.push({
      fn: middleware,
      plugin: pluginName,
    });
  }

  // Get a visitor by name
  getVisitor(name) {
    const visitor = this.visitors.get(name);
    if (!visitor) {
      throw new Error(
        `Visitor '${name}' not found. Available visitors: ${Array.from(
          this.visitors.keys(),
        ).join(", ")}`,
      );
    }
    return new visitor.class();
  }

  // Get all available visitors
  getAvailableVisitors() {
    return Array.from(this.visitors.keys());
  }

  // Get all registered node types
  getRegisteredNodeTypes() {
    return Array.from(this.nodeTypes);
  }

  // Apply middleware to a node during traversal
  applyMiddleware(node, context) {
    let processedNode = node;
    let processedContext = context;

    for (const { fn, plugin } of this.middleware) {
      try {
        const result = fn(processedNode, processedContext);
        if (result && typeof result === "object") {
          processedNode = result.node || processedNode;
          processedContext = result.context || processedContext;
        }
      } catch (error) {
        console.warn(`Middleware from plugin '${plugin}' failed:`, error);
      }
    }

    return { node: processedNode, context: processedContext };
  }

  // Validate plugin structure
  validatePlugin(plugin) {
    if (!plugin.name) {
      throw new Error("Plugin must have a name");
    }

    if (plugin.visitors && typeof plugin.visitors !== "object") {
      throw new Error("Plugin visitors must be an object");
    }

    if (plugin.nodeTypes && !Array.isArray(plugin.nodeTypes)) {
      throw new Error("Plugin nodeTypes must be an array");
    }

    if (plugin.middleware && !Array.isArray(plugin.middleware)) {
      throw new Error("Plugin middleware must be an array");
    }
  }

  // Validate visitor class
  isValidVisitor(visitorClass) {
    return (
      visitorClass &&
      typeof visitorClass === "function" &&
      visitorClass.prototype &&
      typeof visitorClass.prototype.visit === "function"
    );
  }

  // List all registered plugins
  listPlugins() {
    return Array.from(this.plugins.values()).map((plugin) => ({
      name: plugin.name,
      version: plugin.version,
      description: plugin.description,
      visitors: Object.keys(plugin.visitors || {}),
      nodeTypes: plugin.nodeTypes || [],
      middleware: plugin.middleware.length,
    }));
  }

  // Unregister a plugin
  unregisterPlugin(name) {
    const plugin = this.plugins.get(name);
    if (!plugin) {
      throw new Error(`Plugin '${name}' not found`);
    }

    // Remove visitors
    Object.keys(plugin.visitors).forEach((visitorName) => {
      this.visitors.delete(visitorName);
    });

    // Remove middleware
    this.middleware = this.middleware.filter((m) => m.plugin !== name);

    // Remove plugin
    this.plugins.delete(name);

    console.log(`Plugin '${name}' unregistered successfully`);
  }
}

module.exports = PluginManager;
