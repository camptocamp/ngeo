goog.provide('ngeo.ToolActivate');
goog.provide('ngeo.ToolActivateMgr');

goog.require('ngeo');
goog.require('goog.asserts');


/**
 * A simple object that can be managed by `ngeo.ToolActivateMgr`.
 *
 * See our live examples:
 * [../examples/mapquery.html](../examples/mapquery.html)
 * [../examples/toolActivate.html](../examples/toolActivate.html)
 *
 * @param {Object} toolContext An object which acts as the context for the tool.
 * @param {string} activePropertyName The name of a boolean property on
 *      `toolContext` which represents the active state of the tool.
 * @constructor
 * @struct
 * @ngdoc value
 * @ngname ngeoToolActivate
 * @export
 */
ngeo.ToolActivate = function(toolContext, activePropertyName) {

  /**
   * A getter function to get the active state of the tool.
   * @return {boolean} Is active.
   * @export
   */
  this.getActive = function() {
    return toolContext[activePropertyName];
  };

  /**
   * A setter function to set the active state of the tool.
   * @param {boolean} newVal New active state.
   * @export
   */
  this.setActive = function(newVal) {
    toolContext[activePropertyName] = newVal;
  };
};


ngeo.module.value('ngeoToolActivate', ngeo.ToolActivate);


/**
 * An entry for a tool in a `ngeo.ToolActivateMgr` group.
 * @typedef {{
 *    tool: (ngeo.ToolActivate),
 *    defaultTool: boolean,
 *    unlisten: (function(): void)}}
 */
ngeo.ToolMgrEntry;


/**
 * Provides a service to manage the activation of `ngeo.toolActivate` objects.
 *
 * Example:
 *
 * Each tool must be registered before using it.
 *
 *     let tool = new ngeo.ToolActivate(interaction, 'active');
 *     ngeoToolActivateMgr.registerTool('mapTools', tool);
 *
 * A tool will be registered in a group identified by a group name.
 * Once registered a tool can be activated and deactivated. When activating a
 * tool, all others tools in the same group will be deactivated.
 *
 *     ngeoToolActivateMgr.activateTool(tool);
 *     ngeoToolActivateMgr.deactivateTool(tool);
 *
 * See our live examples:
 * [../examples/mapquery.html](../examples/mapquery.html)
 * [../examples/toolActivate.html](../examples/toolActivate.html)
 *
 * @param {angular.Scope} $rootScope The rootScope provider.
 * @constructor
 * @struct
 * @ngdoc service
 * @ngname ngeoToolActivateMgr
 * @ngInject
 */
ngeo.ToolActivateMgr = function($rootScope) {

  /**
   * @type {!Object.<string, Array.<ngeo.ToolMgrEntry>>}
   * @private
   */
  this.groups_ = {};

  /**
   * The scope.
   * @type {angular.Scope}
   * @private
   */
  this.scope_ = $rootScope;
};


/**
 * Register a tool.
 * @param {string} groupName Name of the group of this tool.
 * @param {ngeo.ToolActivate} tool Tool to register.
 * @param {boolean=} opt_defaultActivate If true, this tool will be activated
 *     when all other tools in the group are deactivated.
 * @export
 */
ngeo.ToolActivateMgr.prototype.registerTool = function(groupName, tool,
    opt_defaultActivate) {
  let entries = this.groups_[groupName];
  if (!entries) {
    entries = this.groups_[groupName] = [];
  }

  const unlisten = this.scope_.$watch(
      tool.getActive,
      (newVal, oldVal) => {
        if (newVal === oldVal) {
          return;
        }
        if (newVal) {
          this.deactivateTools_(groupName, tool);
        } else {
          this.activateDefault_(groupName);
        }
      });

  entries.push({
    tool,
    defaultTool: opt_defaultActivate || false,
    unlisten
  });

  if (goog.asserts.ENABLE_ASSERTS) {
    // check that only one default tool per group exists
    let defaultTools = 0;
    entries.forEach((entry) => {
      if (entry.defaultTool) {
        defaultTools++;
      }
    });
    goog.asserts.assert(
        defaultTools <= 1, `more than one default tool in group ${groupName}`);
  }
};


/**
 * Unregister a tool from a group.
 * @param {string} groupName Name of the group of this tool.
 * @param {ngeo.ToolActivate} tool Tool to unregister.
 * @export
 */
ngeo.ToolActivateMgr.prototype.unregisterTool = function(groupName, tool) {
  const entries = this.groups_[groupName];
  if (entries) {
    for (let i = 0; i < entries.length; i++) {
      if (entries[i].tool == tool) {
        entries[i].unlisten();
        entries.splice(i, 1);
        break;
      }
    }
  }
};


/**
 * Unregister each tool from a group.
 * @param {string} groupName Name of the group of tools to unregister.
 * @export
 */
ngeo.ToolActivateMgr.prototype.unregisterGroup = function(groupName) {
  const entries = this.groups_[groupName];
  if (entries) {
    for (let i = 0; i < entries.length; i++) {
      entries[i].unlisten();
    }
    delete this.groups_[groupName];
  }
};


/**
 * Activate a tool.
 * @param {ngeo.ToolActivate} tool Tool to activate.
 * @export
 */
ngeo.ToolActivateMgr.prototype.activateTool = function(tool) {
  tool.setActive(true);
};


/**
 * Deactivate a tool.
 * @param {ngeo.ToolActivate} tool Tool to deactivate.
 * @export
 */
ngeo.ToolActivateMgr.prototype.deactivateTool = function(tool) {
  tool.setActive(false);
};


/**
 * Deactivate all tools except the given one.
 *
 * @param {string} groupName Name of the group.
 * @param {ngeo.ToolActivate} tool Tool to activate.
 * @private
 */
ngeo.ToolActivateMgr.prototype.deactivateTools_ = function(groupName, tool) {
  const entries = this.groups_[groupName];
  for (let i = 0; i < entries.length; i++) {
    if (tool != entries[i].tool) {
      entries[i].tool.setActive(false);
    }
  }
};


/**
 * Activate the default tool in the given group if no other tool is active.
 *
 * @param {string} groupName Name of the group.
 * @private
 */
ngeo.ToolActivateMgr.prototype.activateDefault_ = function(groupName) {
  const entries = this.groups_[groupName];
  let defaultTool = null;
  let hasActiveTool = false;

  for (let i = 0; i < entries.length; i++) {
    hasActiveTool = hasActiveTool || entries[i].tool.getActive();

    if (entries[i].defaultTool) {
      defaultTool = entries[i].tool;
    }
  }

  if (!hasActiveTool && defaultTool !== null) {
    defaultTool.setActive(true);
  }
};


ngeo.module.service('ngeoToolActivateMgr', ngeo.ToolActivateMgr);
