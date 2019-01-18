/**
 */
import googAsserts from 'goog/asserts.js';
import * as olEvents from 'ol/events.js';


/**
 * active: Whether the rule is active or not. Used by the `ngeo-rule` component.
 * Defaults to `false`.
 *
 * expression: The expression of the rule. The expression and boundaries are mutually exclusives
 *
 * isCustom: Whether the rule is a custom one or not. Defaults to `true`.
 *
 * lowerBoundary: The lower boundary of the rule. The expression and boundaries are mutually exclusives.
 *
 * name: The human-readable name of the rule.
 *
 * operator: he rule operator.
 *
 * operators: The rule operators.
 *
 * propertyName: The property name (a.k.a. the attribute name).
 *
 * type: The type of rule.
 *
 * upperBoundary: The upper boundary of the rule. The expression and boundaries are mutually exclusives.
 *
 * @typedef {{
 *   active: (boolean|undefined),
 *   expression: (number|string|undefined),
 *   isCustom: (boolean|undefined),
 *   lowerBoundary: (number|undefined),
 *   name: (string),
 *   operator: (string|undefined),
 *   operators: (Array.<string>|undefined),
 *   propertyName: (string),
 *   type: (string|undefined),
 *   upperBoundary: (number|undefined)
 * }} RuleOptions
 */


/**
 * operator: The operator of the rule value.
 *
 * propertyName: The property name of the rule value
 *
 * @typedef {{
 *   operator: (string),
 *   propertyName: (string)
 * }} RuleBaseValue
 */

/**
 * expression: The expression of the rule value.
 *
 * @typedef {{
 *   expression: (number|string)
 * }} RuleSimpleValue
 * @extends RuleBaseValue
 */

/**
 * lowerBoundary: The lower boundary of the rule value.
 *
 * upperBoundary: The upper boundary of the rule value.
 *
 * @typedef {{
 *   lowerBoundary: (number),
 *   upperBoundary: (number)
 * }} RuleRangeValue
 * @extends RuleBaseValue
 */


/**
 * @implements {Rule}
 */
const exports = class {

  /**
   * The abstract class for all filter rules.
   *
   * Rules are used to define filters that can be applied on data sources.
   * A rule is usually a combination of 3 things:
   *
   * - a property name, for example 'city_name'
   * - an operator, for example 'is equal to'
   * - and an expression, for example 'Chicoutimi'.
   *
   * A rule is useful to hold those properties and change them on the fly.
   * For example, changing an operator from 'is equal to' to 'like'.
   *
   * Also, a rule is especially useful for its `value` getter, which returns
   * the combination of properties described above or `null` if there are some
   * missing.  The `value` getter can be watched and used when the value is
   * not null.
   *
   * When the operator is `between`, the `lowerBoundary` and `upperBoundary`
   * properties are used instead of `expression`.
   *
   * @param {!RuleOptions} options Options.
   */
  constructor(options) {

    // === DYNAMIC properties (i.e. that can change / be watched ===

    /**
     * Whether the rule is active or not. Used by the `ngeo-rule` component.
     * Defaults to `false`.
     * @type {boolean}
     */
    this.active = options.active === true;

    /**
     * The expression of the rule. The expression and boundaries are mutually
     * exclusives.
     *
     * Note: exported (instead of private) due to the problem with the
     * compiler. See the getter/setter methods below...  As a setter, the
     * `expression` property would support being bond to an `ng-model`. Without
     * it, it can't unless we expose the property directly.
     *
     * @type {?number|string}
     * @export
     */
    this.expression = options.expression !== undefined ?
      options.expression : null;

    /**
     * The lower boundary of the rule. The expression and boundaries are
     * mutually exclusives.
     * @type {?number}
     */
    this.lowerBoundary = options.lowerBoundary !== undefined ? options.lowerBoundary : null;

    /**
     * The rule operator.
     * @type {?string}
     */
    this.operator = options.operator || null;

    /**
     * The upper boundary of the rule. The expression and boundaries are
     * mutually exclusives.
     * @type {?number}
     */
    this.upperBoundary = options.upperBoundary !== undefined ? options.upperBoundary : null;


    // === STATIC properties (i.e. that never change) ===

    /**
     * Whether the rule is a custom one or not.
     * @type {boolean}
     * @private
     */
    this.isCustom_ = options.isCustom !== false;

    /**
     * The human-readable name of the rule.
     * @type {string}
     * @private
     */
    this.name_ = options.name;

    /**
     * A list of rule operators.
     * @type {?Array.<string>}
     * @private
     */
    this.operators_ = options.operators || null;

    /**
     * The property name (a.k.a. the attribute name).
     * @type {string}
     * @private
     */
    this.propertyName_ = options.propertyName;

    /**
     * The type of rule.
     * @type {string}
     * @private
     */
    this.type_ = googAsserts.assert(options.type);


    // === Other properties ===

    /**
     * @type {Array.<!import("ol/EventsKey.js").default>}
     * @protected
     */
    this.listenerKeys = [];

  }

  /**
   * The `expression` property does not have conventionnal getter/setters
   * method because of a limitation of the compiler. It doesn't support
   * yet having such methods being extended in child classes.
   *
   * See: https://github.com/google/closure-compiler/issues/1089
   *
   * @return {?number|string} Expression
   * @export
   */
  getExpression() {
    return this.expression;
  }

  /**
   * @param {?number|string} expression Expression
   * @export
   */
  setExpression(expression) {
    this.expression = expression;
  }

  // === Static property getters/setters ===

  /**
   * @return {boolean} Is custom.
   * @export
   */
  get isCustom() {
    return this.isCustom_;
  }

  /**
   * @return {string} name
   * @export
   */
  get name() {
    return this.name_;
  }

  /**
   * @return {?Array.<string>} Operators
   * @export
   */
  get operators() {
    return this.operators_;
  }

  /**
   * @return {string} Property name
   * @export
   */
  get propertyName() {
    return this.propertyName_;
  }

  /**
   * @return {string} Type
   * @export
   */
  get type() {
    return this.type_;
  }

  // === Calculated property getters ===

  /**
   * @return {?RuleSimpleValue|RuleRangeValue} Value.
   * @export
   */
  get value() {
    let value = null;

    const expression = this.getExpression();
    const lowerBoundary = this.lowerBoundary;
    const operator = this.operator;
    const propertyName = this.propertyName;
    const upperBoundary = this.upperBoundary;

    if (operator) {
      if (operator === OperatorType.BETWEEN ||
          operator === TemporalOperatorType.DURING) {
        if (lowerBoundary !== null && upperBoundary !== null) {
          value = {
            operator,
            lowerBoundary,
            propertyName,
            upperBoundary
          };
        }
      } else {
        if (expression !== null) {
          value = {
            expression,
            operator,
            propertyName
          };
        }
      }
    }

    return value;
  }

  // === Other utility methods ===

  /**
   * Reset the following properties to `null`: expression, lowerBoundary,
   * upperBoundary.
   * @export
   */
  reset() {
    if (this.getExpression() !== null) {
      this.setExpression(null);
    }
    if (this.lowerBoundary !== null) {
      this.lowerBoundary = null;
    }
    if (this.upperBoundary !== null) {
      this.upperBoundary = null;
    }
  }

  /**
   * @export
   */
  destroy() {
    this.listenerKeys.forEach(olEvents.unlistenByKey);
    this.listenerKeys.length = 0;
  }

};


/**
 * @enum {string}
 */
exports.OperatorType = {
  BETWEEN: '..',
  EQUAL_TO: '=',
  GREATER_THAN: '>',
  GREATER_THAN_OR_EQUAL_TO: '>=',
  LESSER_THAN: '<',
  LESSER_THAN_OR_EQUAL_TO: '<=',
  LIKE: '~',
  NOT_EQUAL_TO: '!='
};


/**
 * @enum {string}
 */
exports.SpatialOperatorType = {
  CONTAINS: 'contains',
  INTERSECTS: 'intersects',
  WITHIN: 'within'
};


/**
 * @enum {string}
 */
exports.TemporalOperatorType = {
  BEGINS: 'time_start',
  DURING: 'time_during',
  ENDS: 'time_end',
  EQUALS: 'time_equal'
};


export default exports;
