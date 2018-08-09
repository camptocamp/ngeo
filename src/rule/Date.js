/**
 * @module ngeo.rule.Date
 */
import ngeoFormatAttributeType from 'ngeo/format/AttributeType.js';
import ngeoRuleRule from 'ngeo/rule/Rule.js';

const exports = class extends ngeoRuleRule {

  /**
   * A date rule.
   *
   * @struct
   * @param {!ngeox.rule.DateOptions} options Options.
   */
  constructor(options) {

    options.type = options.type || ngeoFormatAttributeType.DATE;

    super(options);
  }
};


export default exports;
