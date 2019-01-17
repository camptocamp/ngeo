/**
 * @module ngeo.rule.Select
 */
import ngeoFormatAttributeType from 'ngeo/format/AttributeType.js';
import ngeoRuleRule from 'ngeo/rule/Rule.js';


/**
 * choices: List of choices available for selection.
 *
 * @typedef {{
 *   choices: (Array.<string>)
 * }} SelectOptions
 * @extends RuleOptions
 */


export default class extends ngeoRuleRule {

  /**
   * A select rule, which allows the selection of multiple values among a list
   * of choices.
   *
   * The expression property holds the list of selected choices, which is
   * comma-separated.
   *
   * @param {!SelectOptions} options Options.
   */
  constructor(options) {

    options.operator = ngeoRuleRule.OperatorType.EQUAL_TO;
    options.type = ngeoFormatAttributeType.SELECT;

    super(options);

    // === STATIC properties (i.e. that never change) ===

    /**
     * @type {Array.<string>}
     * @private
     */
    this.choices_ = options.choices;

  }

  // === Static property getters/setters ===

  /**
   * @return {Array.<string>} Choices
   * @export
   */
  get choices() {
    return this.choices_;
  }

  // === Calculated property getters ===

  /**
   * @return {Array.<string>} Selected choices
   * @export
   */
  get selectedChoices() {
    let selectedChoices;
    if (this.expression) {
      const stringExpression = String(this.expression);
      selectedChoices = stringExpression.split(',');
    } else {
      selectedChoices = [];
    }
    return selectedChoices;
  }

}
