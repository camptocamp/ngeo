goog.provide('ngeo.rule.Rule');

goog.require('ngeo');


ngeo.rule.Rule = class {

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
   * For example, chaning an operator from 'is equal to' to 'like'.
   *
   * Also, a rule is especially useful for its `value` getter, which returns
   * the combination of properties described above or `null` if there are some
   * missing.  The `value` getter can be watched and used when the value is
   * not null.
   *
   * When the operator is `between`, the `lowerBoundary` and `upperBoundary`
   * properties are used instead of `expression`.
   *
   * @struct
   * @param {ngeox.rule.RuleOptions} options Options.
   */
  constructor(options) {

    // === DYNAMIC properties (i.e. that can change / be watched ===

    /**
     * The expression of the rule. The expression and boundaries are mutually
     * exclusives.
     * @type {?boolean|number|string}
     * @private
     */
    this.expression_ = options.expression !== undefined ?
      options.expression : null;

    /**
     * The lower boundary of the rule. The expression and boundaries are
     * mutually exclusives.
     * @type {?number|string}
     * @private
     */
    this.lowerBoundary_ = options. lowerBoundary !== undefined ?
      options.lowerBoundary : null;

    /**
     * The rule operator.
     * @type {?string}
     * @private
     */
    this.operator_ = options.operator || null;

    /**
     * The upper boundary of the rule. The expression and boundaries are
     * mutually exclusives.
     * @type {?number|string}
     * @private
     */
    this.upperBoundary_ = options. upperBoundary !== undefined ?
      options.upperBoundary : null;


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
    this.type_ = goog.asserts.assert(options.type);

  }

  // === Dynamic property getters/setters ===

  /**
   * @return {?boolean|number|string} Expression
   * @export
   */
  get expression() {
    return this.expression_;
  }

  /**
   * @param {?boolean|number|string} expression Expression
   * @export
   */
  set expression(expression) {
    this.expression_ = expression;
  }

  /**
   * @return {?number|string} Lower boundary
   * @export
   */
  get lowerBoundary() {
    return this.lowerBoundary_;
  }

  /**
   * @param {?number|string} lowerBoundary Lower boundary
   * @export
   */
  set lowerBoundary(lowerBoundary) {
    this.lowerBoundary_ = lowerBoundary;
  }

  /**
   * @return {?string} Operator
   * @export
   */
  get operator() {
    return this.operator_;
  }

  /**
   * @param {?string} operator Operator
   * @export
   */
  set operator(operator) {
    this.operator_ = operator;
  }

  /**
   * @return {?number|string} Upper boundary
   * @export
   */
  get upperBoundary() {
    return this.upperBoundary_;
  }

  /**
   * @param {?number|string} upperBoundary Upper boundary
   * @export
   */
  set upperBoundary(upperBoundary) {
    this.upperBoundary_ = upperBoundary;
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
   * @return {?ngeox.rule.RuleSimpleValue|ngeox.rule.RuleRangeValue} Value.
   * @export
   */
  get value() {
    let value = null;

    const expression = this.expression;
    const lowerBoundary = this.lowerBoundary;
    const operator = this.operator;
    const propertyName = this.propertyName;
    const upperBoundary = this.upperBoundary;

    if (operator) {
      if (operator === ngeo.rule.Rule.OperatorType.BETWEEN) {
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
   * Reset the following properties to `null`: expression, lowerProperty,
   * upperProperty.
   * @export
   */
  reset() {
    if (this.expression !== null) {
      this.expression = null;
    }
    if (this.lowerProperty !== null) {
      this.lowerProperty = null;
    }
    if (this.upperProperty !== null) {
      this.upperProperty = null;
    }
  }

};


/**
 * @enum {string}
 */
ngeo.rule.Rule.OperatorType = {
  BETWEEN: '..',
  EQUAL_TO: '=',
  GREATER_THAN: '>',
  GREATER_THAN_OR_EQUAL_TO: '>=',
  LESSER_THAN: '',
  LESSER_THAN_OR_EQUAL_TO: '<=',
  LIKE: '~'
};
