/**
 * @module ngeo.rule.Date
 */
import ngeoFormatAttributeType from 'ngeo/format/AttributeType.js';
import ngeoRuleRule from 'ngeo/rule/Rule.js';

export default class extends ngeoRuleRule {

  /**
   * A date rule.
   *
   * @param {!ngeox.rule.DateOptions} options Options.
   */
  constructor(options) {

    options.type = options.type || ngeoFormatAttributeType.DATE;

    super(options);
  }
}
