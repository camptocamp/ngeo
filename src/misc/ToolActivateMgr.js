/**
 * @module ngeo.misc.ToolActivateMgr
 */
import googAsserts from 'goog/asserts.js';

/**
 * Provides a service to manage the activation of `ngeo.misc.ToolActivate` objects.
 *
 * Example:
 *
 * Each tool must be registered before using it.
 *
 *     let tool = new ngeo.misc.ToolActivate(interaction, 'active');
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
const exports = function($rootScope) {

  /**
   * @type {!Object.<string, Array.<ngeox.miscToolActivateMgrEntry>>}
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
 * @param {ngeo.misc.ToolActivate} tool Tool to register.
 * @param {boolean=} opt_defaultActivate If true, this tool will be activated
 *     when all other tools in the group are deactivated.
 * @export
 */
exports.prototype.registerTool = function(groupName, tool,
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
    tool: tool,
    defaultTool: opt_defaultActivate || false,
    unlisten: unlisten
  });

  if (googAsserts.ENABLE_ASSERTS) {
    // check that only one default tool per group exists
    let defaultTools = 0;
    entries.forEach((entry) => {
      if (entry.defaultTool) {
        defaultTools++;
      }
    });
    googAsserts.assert(
      defaultTools <= 1, `more than one default tool in group ${groupName}`);
  }
};


/**
 * Unregister a tool from a group.
 * @param {string} groupName Name of the group of this tool.
 * @param {ngeo.misc.ToolActivate} tool Tool to unregister.
 * @export
 */
exports.prototype.unregisterTool = function(groupName, tool) {
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
exports.prototype.unregisterGroup = function(groupName) {
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
 * @param {ngeo.misc.ToolActivate} tool Tool to activate.
 * @export
 */
exports.prototype.activateTool = function(tool) {
  tool.setActive(true);
};


/**
 * Deactivate a tool.
 * @param {ngeo.misc.ToolActivate} tool Tool to deactivate.
 * @export
 */
exports.prototype.deactivateTool = function(tool) {
  tool.setActive(false);
};


/**
 * Deactivate all tools except the given one.
 *
 * @param {string} groupName Name of the group.
 * @param {ngeo.misc.ToolActivate} tool Tool to activate.
 * @private
 */
exports.prototype.deactivateTools_ = function(groupName, tool) {
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
exports.prototype.activateDefault_ = function(groupName) {
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


exports.module = angular.module('ngeoToolActivateMgr', []);
exports.module.service('ngeoToolActivateMgr', exports);


export default exports;
