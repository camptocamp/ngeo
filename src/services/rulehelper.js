goog.provide('ngeo.RuleHelper');

goog.require('ngeo');
goog.require('ngeo.rule.Rule');
goog.require('ngeo.rule.Select');
goog.require('ngeo.rule.Text');


ngeo.RuleHelper = class {

  /**
   * A service that provides utility methods to create `ngeo.rule.Rule`
   * objects.
   *
   * @param {!angularGettext.Catalog} gettextCatalog Gettext service.
   * @struct
   * @ngdoc service
   * @ngname ngeoRuleHelper
   * @ngInject
   */
  constructor(gettextCatalog) {

    /**
     * @type {!angularGettext.Catalog}
     * @private
     */
    this.gettextCatalog_ = gettextCatalog;
  }

  /**
   * @param {!Array.<!ngeox.Attribute>} attributes Attributes.
   * @param {boolean=} opt_isCustom Whether the created rules should be marked
   *     as custom or not. Defaults to `false`.
   * @return {Array.<!ngeo.rule.Rule>} Rules.
   * @export
   */
  createRules(attributes, opt_isCustom) {
    const rules = [];
    for (const attribute of attributes) {
      rules.push(this.createRule(attribute, opt_isCustom));
    }
    return rules;
  }

  /**
   * @param {!ngeox.Attribute} attribute Attribute.
   * @param {boolean=} opt_isCustom Whether the created rule should be marked
   *     as custom or not. Defaults to `false`.
   * @return {!ngeo.rule.Rule} Rule.
   * @export
   */
  createRule(attribute, opt_isCustom) {

    let rule;

    /**
     * @type {string}
     */
    const name = this.gettextCatalog_.getString(attribute.name);

    // Todo: support geometry

    switch (attribute.type) {
      case ngeo.AttributeType.DATE:
      case ngeo.AttributeType.DATETIME:
        rule = new ngeo.rule.Rule({
          name,
          operator: ngeo.rule.Rule.OperatorType.BETWEEN,
          propertyName: attribute.name,
          type: attribute.type
        });
        break;
      case ngeo.AttributeType.SELECT:
        rule = new ngeo.rule.Select({
          choices: goog.asserts.assert(attribute.choices),
          name,
          propertyName: attribute.name
        });
        break;
      default:
        rule = new ngeo.rule.Text({
          name,
          operator: ngeo.rule.Rule.OperatorType.LIKE,
          propertyName: attribute.name
        });
        break;
    }

    return rule;
  }

};


ngeo.module.service('ngeoRuleHelper', ngeo.RuleHelper);
