goog.provide('ngeo.ruleComponent');

goog.require('ngeo');
goog.require('ngeo.RuleHelper');
goog.require('ngeo.ToolActivate');
goog.require('ngeo.ToolActivateMgr');
goog.require('ngeo.rule.Select');


ngeo.RuleController = class {

  /**
   * @param {!angular.$timeout} $timeout Angular timeout service.
   * @param {!ngeo.RuleHelper} ngeoRuleHelper Ngeo rule helper service.
   * @param {!ngeo.ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate
   *     manager service.
   * @private
   * @ngInject
   * @ngdoc controller
   * @ngname NgeoRuleController
   */
  constructor($timeout, ngeoRuleHelper, ngeoToolActivateMgr) {

    // Binding properties

    /**
     * Determines whether the component is active or not. When active, the
     * dropdown menu is shown and the tool activate manager activates it
     * as a tool.
     * @type {boolean}
     * @export
     */
    this.active;

    /**
     * @type {!ol.Map}
     * @export
     */
    this.map;

    /**
     * The original rule.
     * @type {!ngeo.rule.Rule}
     * @export
     */
    this.rule;

    /**
     * @type {string}
     * @export
     */
    this.toolGroup;

    // Injected properties

    /**
     * @type {!angular.$timeout}
     * @private
     */
    this.timeout_ = $timeout;

    /**
     * @type {!ngeo.RuleHelper}
     * @private
     */
    this.ngeoRuleHelper_ = ngeoRuleHelper;

    /**
     * @type {!ngeo.ToolActivateMgr}
     * @private
     */
    this.ngeoToolActivateMgr_ = ngeoToolActivateMgr;

    // Inner properties

    /**
     * The cloned rule. Changes in the UI are applied to the clone 'on-the-fly'.
     * Changes in the clone are applied back in the original rule when the
     * apply button is clicked.
     * @type {!ngeo.rule.Rule}
     * @export
     */
    this.clone;

    /**
     * @type {!ngeo.ToolActivate}
     * @private
     */
    this.toolActivate_ = new ngeo.ToolActivate(this, 'active');

  }

  /**
   * Called on initialization of the controller.
   *
   * Clone the rule to be able to work with the clone directly.
   */
  $onInit() {
    this.clone = this.ngeoRuleHelper_.cloneRule(this.rule);

    this.ngeoToolActivateMgr_.registerTool(
      this.toolGroup, this.toolActivate_);

    // In order to let the tool activate manager do its magic, the setting of
    // of the `active` property must be reset to true if it's true upon
    // initialization.
    if (this.active) {
      this.active = false;
      this.timeout_(() => {
        this.active = true;
      });
    }
  }

  /**
   * Called on destruction of the controller.
   */
  $onDestroy() {
    this.active = false;
    this.ngeoToolActivateMgr_.unregisterTool(
      this.toolGroup, this.toolActivate_);
  }

  /**
   * @export
   */
  toggle() {
    if (this.active) {
      this.cancel();
    } else {
      this.active = true;
    }
  }

  /**
   * Apply the changes that were made in the original rule.
   * @export
   */
  apply() {
    this.ngeoRuleHelper_.extendRule(this.clone, this.rule);
    this.active = false;
  }

  /**
   * Revert the changes that were made in the clone rule.
   * @export
   */
  cancel() {
    this.ngeoRuleHelper_.extendRule(this.rule, this.clone);
    this.active = false;
  }

  /**
   * Reset both original and clone rules.
   * @export
   */
  reset() {
    this.clone.reset();
    this.rule.reset();
  }

  /**
   * Called when a choice is clicked, when using a `ngeo.rule.Select` rule type.
   * Add/remove the choice to/from the `expression` of the rule.
   * @param {string|number} choice Choice that has been clicked.
   * @export
   */
  toggleChoiceSelection(choice) {
    const rule = goog.asserts.assertInstanceof(this.clone, ngeo.rule.Select);
    const choices = rule.expression ? rule.expression.split(',') : [];
    const idx = choices.indexOf(choice);
    if (idx > -1) {
      choices.splice(idx, 1);
    } else {
      choices.push(choice);
    }
    rule.expression = choices.length ? choices.join(',') : null;
  }

};


/**
 * The rule component is bound to a `ngeo.rule.Rule` object and shows UI
 * components to be able to edit its properties, such as: operator, expression,
 * etc. The actual properties depend on the type of rule.
 *
 * Also, changes are not made on-the-fly. A button must be clicked for the
 * changes to be applied to the rule.
 */
ngeo.module.component('ngeoRule', {
  bindings: {
    active: '<',
    map: '<',
    rule: '<',
    toolGroup: '<'
  },
  controller: ngeo.RuleController,
  controllerAs: 'ruleCtrl',
  templateUrl: () => `${ngeo.baseTemplateUrl}/rule.html`
});
