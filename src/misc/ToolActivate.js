/**
 * @module ngeo.misc.ToolActivate
 */
/**
 * A simple object that can be managed by `ngeo.misc.ToolActivateMgr`.
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
 * @ngname ngeoToolActivate
 * @export
 */
const exports = function(toolContext, activePropertyName) {

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


export default exports;
