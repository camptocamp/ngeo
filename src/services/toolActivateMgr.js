goog.provide('ngeo.ToolActivate');
goog.provide('ngeo.ToolActivateMgr');

goog.require('ngeo');



/**
 * A simple object that can be managed by ngeo.ToolActivateMgr
 *
 * @param {string} toolsGroupName Name of this group of tools.
 * @param {function()} activateFn function to execute when the tool is
 *     activated.
 * @param {function()} deactivateFn function to execute when the tool
 *     is deactivated.
 * @param {boolean=} opt_defaultActivate If True, this tool will be activated
 *     when all other tools in the group are deactivated.
 * @constructor
 * @ngdoc value
 * @ngname ngeoToolActivate
 */
ngeo.ToolActivate = function(toolsGroupName, activateFn, deactivateFn,
    opt_defaultActivate) {

  /**
   * @type {string}
   * @export
   */
  this.toolsGroupName = toolsGroupName;

  /**
   * @type {function()}
   * @export
   */
  this.activate = activateFn;

  /**
   * @type {function()}
   * @export
   */
  this.deactivate = deactivateFn;

  /**
   * @type {boolean}
   * @export
   */
  this.defaultActivate = opt_defaultActivate || false;
};


ngeoModule.value('ngeoToolActivate', ngeo.ToolActivate);



/**
 * Provides a service to manage the activation of a ngeo.toolActivate object.
 *
 * Example:
 *
 * Each tool must be registered before to use it.
 *
 *     ngeoToolActivateMgr.registerTool(this);
 *
 * A tool will be registered in a array identified by its 'toolsGroupName'.
 * Once registered a tool ca be activate and deactivate. When you activate it,
 * all others tools will be deactivated.
 *
 *     ngeoToolActivateMgr.activateTool(tool);
 *
 * You can also deactivate a group of tools:
 *
 *     ngeoToolActivateMgr.deactivateTool(tool);
 *
 * When you deactivate a tool (without using the param 'opt_force' to true),
 * all tool
 * @constructor
 * @ngdoc service
 * @ngname ngeoToolActivateMgr
 */
ngeo.ToolActivateMgr = function() {

  /**
   * @type {!Object.<string, Array.<ngeo.ToolActivate>>}
   * @private
   */
  this.groups_ = {};
};


/**
 * Register a tool.
 * @param {ngeo.ToolActivate} tool Tool to register.
 */
ngeo.ToolActivateMgr.prototype.registerTool = function(tool) {
  var g = this.groups_[tool.toolsGroupName];
  if (!g) {
    g = this.groups_[tool.toolsGroupName] = [];
  }
  g.push(tool);
};


/**
 * Unregister a tool.
 * @param {ngeo.ToolActivate} tool Tool to unregister.
 * @export
 */
ngeo.ToolActivateMgr.prototype.unregisterTool = function(tool) {
  var i, g = this.groups_[tool.toolsGroupName];
  if (g) {
    for (i = 0; i < g.length; ++i) {
      if (g[i] == tool) {
        g.splice(i, 1);
        break;
      }
    }
  }
};


/**
 * Unregister each tools from a same group of tools.
 * @param {string} toolsGroupName Name of the group of tools to unregister.
 * @export
 */
ngeo.ToolActivateMgr.prototype.unregisterGroup = function(toolsGroupName) {
  delete this.groups_[toolsGroupName];
};


/**
 * Deactivate all tool, then activate the given tool.
 * @param {ngeo.ToolActivate} tool Tool to activate.
 * @export
 */
ngeo.ToolActivateMgr.prototype.activateTool = function(tool) {
  this.deactivateTool(tool, true);
  tool.activate();
};


/**
 * Deactivate all tools with the same toolsGroupName excep Then those that
 * have the defaultActivate to true (activate them). You can ignore this second
 * etape with the 'opt_force' param.
 * param.
 * @param {ngeo.ToolActivate} tool Tool from the group of tools that will be
 *     deactivated.
 * @param {boolean=} opt_force
 * @export
 */
ngeo.ToolActivateMgr.prototype.deactivateTool = function(tool, opt_force) {
  var i, g = this.groups_[tool.toolsGroupName];
  for (i = 0; i < g.length; i++) {
    if (g[i].defaultActivate && !opt_force) {
      g[i].activate();
    } else {
      g[i].deactivate();
    }
  }
};


/**
 * Get all groups of tools
 * @return {Object.<string, Array.<ngeo.ToolActivate>>}
 * @export
 */
ngeo.ToolActivateMgr.prototype.getGroups = function() {
  return this.groups_;
};


ngeoModule.service('ngeoToolActivateMgr', ngeo.ToolActivateMgr);
