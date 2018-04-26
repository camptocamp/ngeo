/**
 * @module ngeo.rule.Text
 */
import ngeoFormatAttributeType from 'ngeo/format/AttributeType.js';
import ngeoRuleRule from 'ngeo/rule/Rule.js';

const exports = class extends ngeoRuleRule {

  /**
   * A text rule, which always compares the value with the LIKE operator, by
   * default.
   *
   * @struct
   * @param {!ngeox.rule.TextOptions} options Options.
   */
  constructor(options) {

    options.operator = options.operator || ngeoRuleRule.OperatorType.LIKE;
    options.type = ngeoFormatAttributeType.TEXT;

    super(options);

  }
};


export default exports;
