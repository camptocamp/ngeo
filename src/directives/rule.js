goog.provide('ngeo.ruleComponent');

goog.require('ngeo');
/** @suppress {extraRequire} */
goog.require('ngeo.DatePickerDirective');
goog.require('ngeo.RuleHelper');
goog.require('ngeo.ToolActivate');
goog.require('ngeo.ToolActivateMgr');
goog.require('ngeo.rule.Select');


ngeo.RuleController = class {

  /**
   * @param {!angularGettext.Catalog} gettextCatalog Gettext service.
   * @param {!angular.Scope} $scope Angular scope.
   * @param {!angular.$timeout} $timeout Angular timeout service.
   * @param {!ngeo.RuleHelper} ngeoRuleHelper Ngeo rule helper service.
   * @param {!ngeo.ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate
   *     manager service.
   * @private
   * @ngInject
   * @ngdoc controller
   * @ngname NgeoRuleController
   */
  constructor(gettextCatalog, $scope, $timeout, ngeoRuleHelper,
      ngeoToolActivateMgr
  ) {

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
     * @type {!angular.Scope}
     * @private
     */
    this.scope_ = $scope;

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

    const ot = ngeo.rule.Rule.OperatorType;

    /**
     * @type {Object.<string, string>}
     * @export
     */
    this.operators = {
      [ot.EQUAL_TO]: gettextCatalog.getString('Is equal to'),
      [ot.GREATER_THAN]: gettextCatalog.getString('Is greater than'),
      [ot.GREATER_THAN_OR_EQUAL_TO]: gettextCatalog.getString(
        'Is greater than or equal to'),
      [ot.LESSER_THAN]: gettextCatalog.getString('Is lesser than'),
      [ot.LESSER_THAN_OR_EQUAL_TO]: gettextCatalog.getString(
        'Is lesser than or equal to'),
      [ot.NOT_EQUAL_TO]: gettextCatalog.getString('Is not equal to'),
      [ot.LIKE]: gettextCatalog.getString('Contains')
    };

    /**
     * Time property used when the rule is of type 'date|datetime' and uses
     * a range of date.
     * @type {ngeox.TimeProperty}
     * @export
     */
    this.timeRangeMode = {
      widget: /** @type {ngeox.TimePropertyWidgetEnum} */ ('datepicker'),
      maxValue: this.createDate_(),
      minValue: this.createWeekAgoDate_(),
      maxDefValue: null,
      minDefValue: null,
      mode: /** @type {ngeox.TimePropertyModeEnum} */ ('range'),
      interval: [0, 1, 0, 0]
    };

    /**
     * Time property used when the rule is of type 'date|datetime' and uses
     * a single date.
     * @type {ngeox.TimeProperty}
     * @export
     */
    this.timeValueMode = {
      widget: /** @type {ngeox.TimePropertyWidgetEnum} */ ('datepicker'),
      maxValue: this.createDate_(),
      minValue: this.createDate_(),
      maxDefValue: null,
      minDefValue: null,
      mode: /** @type {ngeox.TimePropertyModeEnum} */ ('value'),
      interval: [0, 1, 0, 0]
    };

    /**
     * @type {!ngeo.ToolActivate}
     * @private
     */
    this.toolActivate_ = new ngeo.ToolActivate(this, 'active');

    /**
     * @type {Array.<function()>}
     * @private
     */
    this.unlisteners_ = [];

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

    // If the rule is a DATE or DATETIME, then a datepicker directive is used.
    // It is not possible to set the current values to the datepicker, but you
    // can set the initial values. This is why it is created when the rule
    // becomes active (see the partials/rule.html).
    //
    // This chunk of code ensures that the rule properties are synchronized
    // with the TimeProperty objects required to build the datepickers.
    if (this.clone.type === ngeo.AttributeType.DATE ||
        this.clone.type === ngeo.AttributeType.DATETIME
    ) {
      // Watch 'expression'
      this.unlisteners_.push(this.scope_.$watch(
        () => this.clone.expression,
        (newVal) => {
          const value = (newVal === null) ? this.createDate_() : newVal;
          this.timeValueMode.minValue = value;
        }
      ));
      // Watch 'lowerBoundary'
      this.unlisteners_.push(this.scope_.$watch(
        () => this.clone.lowerBoundary,
        (newVal) => {
          const value = newVal === null ? this.createWeekAgoDate_() : newVal;
          this.timeRangeMode.minValue = value;
        }
      ));
      // Watch 'upperBoundary'
      this.unlisteners_.push(this.scope_.$watch(
        () => this.clone.upperBoundary,
        (newVal) => {
          const value = newVal === null ? this.createDate_() : newVal;
          this.timeRangeMode.maxValue = value;
        }
      ));
    }

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
    for (const unlistener of this.unlisteners_) {
      unlistener();
    }
    this.unlisteners_.length = 0;
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


  /**
   * @param {Object} date Date FIXME
   * @export
   */
  onDateSelected(date) {
    this.clone.expression = date['start'];
  }

  /**
   * @param {Object} date Date FIXME
   * @export
   */
  onDateRangeSelected(date) {
    this.clone.lowerBoundary = date['start'];
    this.clone.upperBoundary = date['end'];
  }

  /**
   * @param {number=} opt_timeDelta Time delta to go back in the past.
   * @return {string} ISO string of the date
   * @private
   */
  createDate_(opt_timeDelta) {

    const date = new Date();

    if (opt_timeDelta !== undefined) {
      const time = date.getTime() - opt_timeDelta;
      date.setTime(time);
    }

    return date.toISOString();
  }

  /**
   * @return {string} ISO string of the date
   * @private
   */
  createWeekAgoDate_() {
    return this.createDate_(1000 * 60 * 60 * 24 * 7); // A week ago date
  }

  /**
   * @param {number} time Time.
   * @return {string} Date
   * @export
   */
  timeToDate(time) {
    const date = new Date(time);
    return date.toLocaleDateString();
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
