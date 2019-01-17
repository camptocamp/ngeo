/**
 * @module import("ngeo/rule/Text.js").default
 */
import ngeoFormatAttributeType from 'ngeo/format/AttributeType.js';
import ngeoRuleRule from 'ngeo/rule/Rule.js';


/**
 * The options for creating a text style.
 *
 * @typedef {{
 *     text: (string),
 *     size: (number|undefined),
 *     angle: (number|undefined),
 *     color: (ol.Color|undefined),
 *     width: (number|undefined),
 *     offsetX: (number|undefined),
 *     offsetY: (number|undefined)
 * }} TextOptions
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
