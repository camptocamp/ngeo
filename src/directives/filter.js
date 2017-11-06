goog.provide('ngeo.filterComponent');

goog.require('ngeo');
goog.require('ngeo.MapQuerent');
/** @suppress {extraRequire} */
goog.require('ngeo.ruleComponent');
goog.require('ngeo.RuleHelper');
goog.require('ngeo.rule.Geometry');


/**
 * @private
 */
ngeo.FilterController = class {

  /**
   * @param {!angularGettext.Catalog} gettextCatalog Gettext service.
   * @param {!angular.Scope} $scope Angular scope.
   * @param {!angular.$timeout} $timeout Angular timeout service.
   * @param {!ngeo.MapQuerent} ngeoMapQuerent The ngeo map querent service.
   * @param {!ngeo.RuleHelper} ngeoRuleHelper Ngeo rule helper service.
   * @private
   * @struct
   * @ngInject
   * @ngdoc controller
   * @ngname NgeoFilterController
   */
  constructor(gettextCatalog, $scope, $timeout, ngeoMapQuerent,
    ngeoRuleHelper) {

    // === Binding properties ===

    /**
     * @type {boolean}
     * @export
     */
    this.aRuleIsActive;

    /**
     * @type {Array.<!ngeo.rule.Rule>}
     * @export
     */
    this.customRules;

    /**
     * @type {!ngeo.DataSource}
     * @export
     */
    this.datasource;

    /**
     * @type {Array.<!ngeo.rule.Rule>}
     * @export
     */
    this.directedRules;

    /**
     * @type {!ngeo.FeatureOverlay}
     * @export
     */
    this.featureOverlay;

    /**
     * @type {!ol.Map}
     * @export
     */
    this.map;

    /**
     * @type {string}
     * @export
     */
    this.toolGroup;


    // === Injected properties ===

    /**
     * @type {!angularGettext.Catalog}
     * @private
     */
    this.gettextCatalog_ = gettextCatalog;

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
     * @type {!ngeo.MapQuerent}
     * @private
     */
    this.ngeoMapQuerent_ = ngeoMapQuerent;

    /**
     * @type {!ngeo.RuleHelper}
     * @private
     */
    this.ngeoRuleHelper_ = ngeoRuleHelper;


    // === Inner properties ===

    /**
     * @type {Array.<!ngeo.FilterController.Condition>}
     * @export
     */
    this.conditions = [
      {
        text: gettextCatalog.getString('All'),
        value: ngeo.FilterCondition.AND
      },
      {
        text: gettextCatalog.getString('At least one'),
        value: ngeo.FilterCondition.OR
      },
      {
        text: gettextCatalog.getString('None'),
        value: ngeo.FilterCondition.NOT
      }
    ];

    /**
     * List of geometry attributes.
     * @type {Array.<!ngeox.Attribute>}
     * @export
     */
    this.geometryAttributes = [];

    /**
     * List of other attribute names.
     * @type {Array.<!ngeox.Attribute>}
     * @export
     */
    this.otherAttributes = [];

    /**
     * @type {!Object.<number, Function>}
     * @private
     */
    this.ruleUnlisteners_ = {};
  }


  /**
   * Called on initialization of the controller.
   *
   * Loop through the attributes of the data source and separated them in 2
   * lists: geometry and the others. Then, apply the filters to the data source.
   */
  $onInit() {

    this.scope_.$watch(
      () => this.aRuleIsActive,
      this.handleARuleIsActiveChange_.bind(this)
    );

    // (1) Separate the attributes in 2: geometry and the others.
    const attributes = goog.asserts.assert(this.datasource.attributes);
    for (const attribute of attributes) {
      if (attribute.type === ngeo.AttributeType.GEOMETRY) {
        this.geometryAttributes.push(attribute);
      } else {
        this.otherAttributes.push(attribute);
      }
    }

    // (2) All rules that have geometry are added in the featureOverlay
    const rules = [].concat(this.customRules, this.directedRules);
    for (const rule of rules) {
      this.registerRule_(rule);
    }

    // (3) Apply the filters
    this.apply();
  }


  /**
   * Called on destruction of the controller.
   *
   * Reset the `filterRules` of the data source back to `null`.
   * Clear the feature overlay.
   */
  $onDestroy() {
    if (this.datasource.filterRules !== null) {
      this.datasource.filterRules = null;
    }
    this.featureOverlay.clear();
  }


  /**
   * Loop in all directed and custom rules. Apply the rules that have a proper
   * value inside the data source, in the `filterRules` property.
   * @export
   */
  apply() {
    // (1) Reset
    this.datasource.filterRules = null;

    // (2) Then set if there are filter rules with value.
    this.timeout_(() => {
      const filterRules = this.getRulesWithValue_();
      if (filterRules.length) {
        this.datasource.filterRules = filterRules;
        // The current query results are cleared when we apply a filter.
        this.ngeoMapQuerent_.clear();
      }
    });
  }


  /**
   * Loop in all directed and custom rules. Issue a request to obtain the data
   * and show the result.
   * @export
   */
  getData() {
    const filterRules = this.getRulesWithValue_();

    // No need to do anything if there's no rules.
    if (!filterRules.length) {
      return;
    }

    const dataSource = this.datasource;
    const limit = 1000;
    const map = this.map;
    const projCode = map.getView().getProjection().getCode();
    const filter = this.ngeoRuleHelper_.createFilter({
      dataSource,
      filterRules,
      srsName: projCode
    });
    goog.asserts.assert(filter);

    this.ngeoMapQuerent_.issue({
      dataSources: [dataSource],
      filter,
      limit,
      map
    });
  }


  /**
   * Loop in all directed and custom rules and collect those with a value.
   * @return {Array.<!ngeo.rule.Rule>} Rules with value.
   * @private
   */
  getRulesWithValue_() {
    const filterRules = [];
    const rules = [].concat(this.customRules, this.directedRules);
    for (const rule of rules) {
      if (rule.value) {
        filterRules.push(rule);
      }
    }
    return filterRules;
  }


  /**
   * Create and add a new custom rule using an attribute. The rule is activated
   * after being created.
   * @param {!ngeox.Attribute} attribute Attribute to use to create the custom
   * rule.
   * @export
   */
  createAndAddCustomRule(attribute) {
    const rule = this.ngeoRuleHelper_.createRuleFromAttribute(attribute, true);
    this.registerRule_(rule);
    this.customRules.push(rule);

    // Activate asynchronously allows the toolActivate manager to do its magic,
    this.timeout_(() => {
      rule.active = true;
    }, 1);
  }


  /**
   * @param {!ngeo.FilterController.Condition} condition Condition to set.
   * @export
   */
  setCondition(condition) {
    if (this.datasource.filterCondition !== condition.value) {
      this.datasource.filterCondition = condition.value;
    }
  }

  /**
   * Remove a custom rule. Deactivate it first, then give time to the
   * `ngeo-rule` directive to manage the deactivation of the rule.
   * @param {!ngeo.rule.Rule} rule Custom rule to remove.
   * @export
   */
  removeCustomRule(rule) {
    rule.active = false;
    this.timeout_(() => {
      ol.array.remove(this.customRules, rule);
      this.unregisterRule_(rule);
      rule.destroy();
    });
  }

  /**
   * @param {!ngeo.rule.Rule} rule Rule.
   * @export
   */
  registerRule_(rule) {
    const uid = ol.getUid(rule);
    this.ruleUnlisteners_[uid] = this.scope_.$watch(
      () => rule.active,
      this.handleRuleActiveChange_.bind(this)
    );

    if (rule instanceof ngeo.rule.Geometry) {
      this.featureOverlay.addFeature(rule.feature);
    }
  }

  /**
   * @param {!ngeo.rule.Rule} rule Rule.
   * @export
   */
  unregisterRule_(rule) {
    const uid = ol.getUid(rule);
    const unlistener = this.ruleUnlisteners_[uid];
    goog.asserts.assert(unlistener);
    unlistener();
    delete this.ruleUnlisteners_[uid];

    if (rule instanceof ngeo.rule.Geometry) {
      this.featureOverlay.removeFeature(rule.feature);
    }
  }

  /**
   * Called when the active property of a rule changes. Set the `aRuleIsActive`
   * property accordingly.
   * @private
   */
  handleRuleActiveChange_() {
    let aRuleIsActive = false;
    const rules = [].concat(this.customRules, this.directedRules);
    for (const rule of rules) {
      if (rule.active) {
        aRuleIsActive = true;
        break;
      }
    }
    this.aRuleIsActive = aRuleIsActive;
  }

  /**
   * Called when the `aRuleIsActive` property changes. Make sure that
   * no rule is still active if the property is `false`.
   * @private
   */
  handleARuleIsActiveChange_() {
    if (this.aRuleIsActive) {
      return;
    }
    const rules = [].concat(this.customRules, this.directedRules);
    for (const rule of rules) {
      if (rule.active) {
        rule.active = false;
        break;
      }
    }
  }

};


/**
 * @typedef {{
 *     text: (string),
 *     value: (string)
 * }}
 */
ngeo.FilterController.Condition;


ngeo.module.component('ngeoFilter', {
  bindings: {
    'aRuleIsActive': '=',
    'customRules': '<',
    // It's 'datasource' instead of 'dataSource', because that would require
    // the attribute to be 'data-source', and Angular strips the 'data-'.
    'datasource': '<',
    'directedRules': '<',
    'featureOverlay': '<',
    'map': '<',
    'toolGroup': '<'
  },
  controller: ngeo.FilterController,
  controllerAs: 'filterCtrl',
  templateUrl: () => `${ngeo.baseTemplateUrl}/filter.html`
});
