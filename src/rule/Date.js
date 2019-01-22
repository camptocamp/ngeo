import ngeoFormatAttributeType from 'ngeo/format/AttributeType.js';
import ngeoRuleRule from 'ngeo/rule/Rule.js';


/**
 * @typedef {Object} DateOptions
 * @extends RuleOptions
 */


export default class extends ngeoRuleRule {

  /**
   * A date rule.
   *
   * @param {!DateOptions} options Options.
   */
  constructor(options) {

    options.type = options.type || ngeoFormatAttributeType.DATE;

    super(options);
  }
}
