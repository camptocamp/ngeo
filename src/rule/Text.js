import ngeoFormatAttributeType from 'ngeo/format/AttributeType.js';
import ngeoRuleRule, {RuleOperatorType} from 'ngeo/rule/Rule.js';

/**
 * The options for creating a text style.
 *
 * extends import('ngeo/rule/Rule.js').RuleOptions
 * @typedef {Object} TextOptions
 * @property {string} text
 * @property {number} [size]
 * @property {number} [angle]
 * @property {boolean} [rotateWithView=false]
 * @property {import('ol/color.js').Color} [color]
 * @property {number} [width]
 * @property {number} [offsetX]
 * @property {number} [offsetY]
 * @property {boolean} [exceedLength]
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
   * A text rule, which always compares the value with the LIKE operator, by default.
   *
   * @param {!TextOptions} options Options.
   */
  constructor(options) {
    options.operator = options.operator || RuleOperatorType.LIKE;
    options.type = ngeoFormatAttributeType.TEXT;

    super(options);
  }
}
