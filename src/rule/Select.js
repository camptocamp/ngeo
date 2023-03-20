import ngeoFormatAttributeType from 'ngeo/format/AttributeType.js';
import ngeoRuleRule, {RuleOperatorType} from 'ngeo/rule/Rule.js';

/**
 * extends import('ngeo/rule/Rule.js').RuleOptions
 * @typedef {Object} SelectOptions
 * @property {Array.<string>} choices List of choices available for selection.
 * @property {boolean} [active=false] (RuleOptions)
 * @property {number|string} [expression] (RuleOptions)
 * @property {boolean} [isCustom] (RuleOptions)
 * @property {number} [lowerBoundary] (RuleOptions)
 * @property {string} name (RuleOptions)
 * @property {string} [operator] (RuleOptions)
 * @property {Array.<string>} [operators] (RuleOptions)
 * @property {string} propertyName (RuleOptions)
 * @property {string} [type] (RuleOptions)
 * @property {number} [upperBoundary] (RuleOptions)
 */

/**
 * @hidden
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
    options.operator = RuleOperatorType.EQUAL_TO;
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
   */
  get choices() {
    return this.choices_;
  }

  // === Calculated property getters ===

  /**
   * @return {Array.<string>} Selected choices
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
