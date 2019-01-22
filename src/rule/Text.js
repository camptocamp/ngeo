import ngeoFormatAttributeType from 'ngeo/format/AttributeType.js';
import ngeoRuleRule from 'ngeo/rule/Rule.js';


/**
 * The options for creating a text style.
 *
 * @typedef {Object} TextOptions
 * @property {string} text
 * @property {number} [size]
 * @property {number} [angle]
 * @property {ol.Color} [color]
 * @property {number} [width]
 * @property {number} [offsetX]
 * @property {number} [offsetY]
 */

export default class extends ngeoRuleRule {

  /**
   * A text rule, which always compares the value with the LIKE operator, by
   * default.
   *
   * @param {!TextOptions} options Options.
   */
  constructor(options) {

    options.operator = options.operator || ngeoRuleRule.OperatorType.LIKE;
    options.type = ngeoFormatAttributeType.TEXT;

    super(options);

  }
}
