goog.provide('ngeo.filterComponent');

goog.require('ngeo');
/** @suppress {extraRequire} */
goog.require('ngeo.ruleComponent');
goog.require('ngeo.RuleHelper');


ngeo.FilterController = class {

  /**
   * @param {!angularGettext.Catalog} gettextCatalog Gettext service.
   * @param {!angular.$timeout} $timeout Angular timeout service.
   * @param {!ngeo.RuleHelper} ngeoRuleHelper Ngeo rule helper service.
   * @private
   * @ngInject
   * @ngdoc controller
   * @ngname NgeoFilterController
   */
  constructor(gettextCatalog, $timeout, ngeoRuleHelper) {

    // Binding properties

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
     * @type {!ol.Map}
     * @export
     */
    this.map;

    /**
     * @type {string}
     * @export
     */
    this.toolGroup;

    // Injected properties

    /**
     * @type {!angularGettext.Catalog}
     * @private
     */
    this.gettextCatalog_ = gettextCatalog;

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

    // Inner properties

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
     * Flag that is set after initialization of the filter directive. Before
     * the initialization is completed, rules are created with the `active`
     * property set to `false`. After that, newly created rules are created
     * with the `active` property set to `true`.
     * @type {boolean}
     * @export
     */
    this.initialized = false;

    /**
     * List of other attribute names.
     * @type {Array.<!ngeox.Attribute>}
     * @export
     */
    this.otherAttributes = [];
  }


  /**
   * Called on initialization of the controller.
   *
   * Loop through the attributes of the data source and separated them in 2
   * lists: geometry and the others. Then, apply the filters to the data source.
   */
  $onInit() {
    const attributes = goog.asserts.assert(this.datasource.attributes);
    for (const attribute of attributes) {
      if (attribute.type === ngeo.AttributeType.GEOMETRY) {
        this.geometryAttributes.push(attribute);
      } else {
        this.otherAttributes.push(attribute);
      }
    }

    this.apply();

    this.timeout_(() => {
      this.initialized = true;
    });
  }


  /**
   * Called on destruction of the controller.
   *
   * Reset the `filterRules` of the data source back to `null`.
   */
  $onDestroy() {
    if (this.datasource.filterRules !== null) {
      this.datasource.filterRules = null;
    }
  }


  /**
   * Loop in all directed and custom rules. Apply the rules that have a proper
   * value inside the data source, in the `filterRules` property.
   * @export
   */
  apply() {
    const filterRules = [];
    const rules = [].concat(this.customRules, this.directedRules);
    for (const rule of rules) {
      if (rule.value) {
        filterRules.push(rule);
      }
    }
    this.datasource.filterRules = filterRules.length ? filterRules : null;
  }


  /**
   * @param {!ngeox.Attribute} attribute Attribute to use to create the custom
   * rule.
   * @export
   */
  createAndAddCustomRule(attribute) {
    this.customRules.push(
      this.ngeoRuleHelper_.createRule(attribute, true)
    );
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
   * @param {!ngeo.rule.Rule} rule Custom rule to remove.
   * @export
   */
  removeCustomRule(rule) {
    ol.array.remove(this.customRules, rule);
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
    customRules: '<',
    // It's 'datasource' instead of 'dataSource', because that would require
    // the attribute to be 'data-source', and Angular strips the 'data-'.
    datasource: '<',
    directedRules: '<',
    map: '<',
    toolGroup: '<'
  },
  controller: ngeo.FilterController,
  controllerAs: 'filterCtrl',
  templateUrl: () => `${ngeo.baseTemplateUrl}/filter.html`
});
