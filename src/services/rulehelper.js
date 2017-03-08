goog.provide('ngeo.RuleHelper');

goog.require('ngeo');
goog.require('ngeo.rule.Geometry');
goog.require('ngeo.rule.Rule');
goog.require('ngeo.rule.Select');
goog.require('ngeo.rule.Text');


ngeo.RuleHelper = class {

  /**
   * A service that provides utility methods to create `ngeo.rule.Rule`
   * objects.
   *
   * @param {!angularGettext.Catalog} gettextCatalog Gettext service.
   * @param {!ngeo.FeatureHelper} ngeoFeatureHelper Ngeo feature helper service.
   * @struct
   * @ngdoc service
   * @ngname ngeoRuleHelper
   * @ngInject
   */
  constructor(gettextCatalog, ngeoFeatureHelper) {

    /**
     * @type {!angularGettext.Catalog}
     * @private
     */
    this.gettextCatalog_ = gettextCatalog;

    /**
     * @type {!ngeo.FeatureHelper}
     * @private
     */
    this.ngeoFeatureHelper_ = ngeoFeatureHelper;
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
    const isCustom = opt_isCustom === true;

    /**
     * @type {string}
     */
    const name = this.gettextCatalog_.getString(attribute.name);

    // Todo: support geometry

    switch (attribute.type) {
      case ngeo.AttributeType.DATE:
      case ngeo.AttributeType.DATETIME:
        if (isCustom) {
          rule = new ngeo.rule.Rule({
            name,
            operator: ngeo.rule.Rule.OperatorType.EQUAL_TO,
            operators: [
              ngeo.rule.Rule.OperatorType.EQUAL_TO,
              ngeo.rule.Rule.OperatorType.GREATER_THAN,
              ngeo.rule.Rule.OperatorType.GREATER_THAN_OR_EQUAL_TO,
              ngeo.rule.Rule.OperatorType.LESSER_THAN,
              ngeo.rule.Rule.OperatorType.LESSER_THAN_OR_EQUAL_TO,
              ngeo.rule.Rule.OperatorType.NOT_EQUAL_TO
            ],
            propertyName: attribute.name,
            type: attribute.type
          });
        } else {
          rule = new ngeo.rule.Rule({
            name,
            operator: ngeo.rule.Rule.OperatorType.BETWEEN,
            propertyName: attribute.name,
            type: attribute.type
          });
        }
        break;
      case ngeo.AttributeType.GEOMETRY:
        rule = new ngeo.rule.Geometry({
          name,
          operator: ngeo.rule.Rule.SpatialOperatorType.WITHIN,
          operators: [
            ngeo.rule.Rule.SpatialOperatorType.CONTAINS,
            ngeo.rule.Rule.SpatialOperatorType.INTERSECTS,
            ngeo.rule.Rule.SpatialOperatorType.WITHIN
          ],
          propertyName: attribute.name,
          type: attribute.type
        });
        break;
      case ngeo.AttributeType.NUMBER:
        if (isCustom) {
          rule = new ngeo.rule.Rule({
            name,
            operator: ngeo.rule.Rule.OperatorType.EQUAL_TO,
            operators: [
              ngeo.rule.Rule.OperatorType.EQUAL_TO,
              ngeo.rule.Rule.OperatorType.GREATER_THAN,
              ngeo.rule.Rule.OperatorType.GREATER_THAN_OR_EQUAL_TO,
              ngeo.rule.Rule.OperatorType.LESSER_THAN,
              ngeo.rule.Rule.OperatorType.LESSER_THAN_OR_EQUAL_TO,
              ngeo.rule.Rule.OperatorType.NOT_EQUAL_TO
            ],
            propertyName: attribute.name,
            type: ngeo.AttributeType.TEXT
          });
        } else {
          rule = new ngeo.rule.Rule({
            name,
            operator: ngeo.rule.Rule.OperatorType.BETWEEN,
            propertyName: attribute.name,
            type: ngeo.AttributeType.TEXT
          });
        }
        break;
      case ngeo.AttributeType.SELECT:
        rule = new ngeo.rule.Select({
          choices: goog.asserts.assert(attribute.choices),
          name,
          propertyName: attribute.name
        });
        break;
      default:
        if (isCustom) {
          rule = new ngeo.rule.Text({
            name,
            operator: ngeo.rule.Rule.OperatorType.LIKE,
            operators: [
              ngeo.rule.Rule.OperatorType.LIKE,
              ngeo.rule.Rule.OperatorType.EQUAL_TO,
              ngeo.rule.Rule.OperatorType.NOT_EQUAL_TO
            ],
            propertyName: attribute.name
          });
        } else {
          rule = new ngeo.rule.Text({
            name,
            operator: ngeo.rule.Rule.OperatorType.LIKE,
            propertyName: attribute.name
          });
        }
        break;
    }

    return rule;
  }

  /**
   * Create a new `ngeo.rule.Rule` object using an other given rule.
   *
   * @param {!ngeo.rule.Rule} rule Original rule to clone.
   * @return {!ngeo.rule.Rule} A clone rule.
   * @export
   */
  cloneRule(rule) {

    let clone;

    let expression = rule.getExpression();
    if (expression === null) {
      expression = undefined;
    }
    const isCustom = rule.isCustom;
    const lowerBoundary = rule.lowerBoundary !== null ? rule.lowerBoundary :
          undefined;
    const name = rule.name;
    const operator = rule.operator !== null ? rule.operator : undefined;
    const operators = rule.operators ? rule.operators.slice(0) : undefined;
    const propertyName = rule.propertyName;
    const type = rule.type !== null ? rule.type : undefined;
    const upperBoundary = rule.upperBoundary !== null ? rule.upperBoundary :
          undefined;

    const options = {
      expression,
      isCustom,
      lowerBoundary,
      name,
      operator,
      operators,
      propertyName,
      type,
      upperBoundary
    };

    if (rule instanceof ngeo.rule.Geometry) {
      clone = new ngeo.rule.Geometry(options);
      clone.feature.setProperties(
        this.ngeoFeatureHelper_.getNonSpatialProperties(rule.feature)
      );
    } else if (rule instanceof ngeo.rule.Select) {
      options.choices = rule.choices.slice(0);
      clone = new ngeo.rule.Select(options);
    } else if (rule instanceof ngeo.rule.Text) {
      clone = new ngeo.rule.Text(options);
    } else {
      clone = new ngeo.rule.Rule(options);
    }

    return clone;
  }

  /**
   * Extend the dynamic properties from a source rule to destination rule.
   * The source rule remains unchanged, while the destination rule changes.
   *
   * @param {!ngeo.rule.Rule} sourceRule Source rule to collect the dynamic
   *     properties from.
   * @param {!ngeo.rule.Rule} destRule Destination rule where the dynamic
   *     properties are set.
   * @export
   */
  extendRule(sourceRule, destRule) {

    if (destRule.getExpression() !== sourceRule.getExpression()) {
      destRule.setExpression(sourceRule.getExpression());
    }

    if (destRule.lowerBoundary !== sourceRule.lowerBoundary) {
      destRule.lowerBoundary = sourceRule.lowerBoundary;
    }

    if (destRule.operator !== sourceRule.operator) {
      destRule.operator = sourceRule.operator;
    }

    if (destRule.upperBoundary !== sourceRule.upperBoundary) {
      destRule.upperBoundary = sourceRule.upperBoundary;
    }

    if (sourceRule instanceof ngeo.rule.Geometry &&
       destRule instanceof ngeo.rule.Geometry
    ) {
      this.ngeoFeatureHelper_.clearNonSpatialProperties(destRule.feature);
      destRule.feature.setProperties(
        this.ngeoFeatureHelper_.getNonSpatialProperties(sourceRule.feature)
      );
    }
  }

};


ngeo.module.service('ngeoRuleHelper', ngeo.RuleHelper);
