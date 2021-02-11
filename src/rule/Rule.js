// The MIT License (MIT)
//
// Copyright (c) 2017-2021 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import {unlistenByKey} from 'ol/events.js';

/**
 * @typedef {Object} RuleOptions
 * @property {boolean} [active=false] Whether the rule is active or not. Used by the `ngeo-rule` component.
 * @property {number|string} [expression] Deprecated. Use literal instead. Kept for compatibility with saved filters.
 * @property {number|string|string[]} [literal] The literal of the rule. The literal and boundaries are
 *    mutually exclusives.
 * @property {boolean} [isCustom] Whether the rule is a custom one or not. Defaults to `true`.
 * @property {number} [lowerBoundary] The lower boundary of the rule. The literal and boundaries are
 *    mutually exclusives.
 * @property {string} name The human-readable name of the rule.
 * @property {string} [operator] The rule operator.
 * @property {string[]} [operators] The rule operators.
 * @property {string} propertyName The property name (a.k.a. the attribute name).
 * @property {string} [type] The type of rule.
 * @property {number} [upperBoundary] The upper boundary of the rule. The literal and boundaries are
 *    mutually exclusives.
 */

/**
 * @typedef {Object} RuleBaseValue
 * @property {string} operator The operator of the rule value.
 * @property {string} propertyName The property name of the rule value
 */

/**
 * @typedef {Object} RuleSimpleValue
 * @property {number|string|string[]} literal The literal of the rule value.
 * extends RuleBaseValue
 * @property {string} operator The operator of the rule value.
 * @property {string} propertyName The property name of the rule value
 */

/**
 * @typedef {Object} RuleRangeValue
 * @property {number} lowerBoundary The lower boundary of the rule value.
 * @property {number} upperBoundary The upper boundary of the rule value.
 * extends RuleBaseValue
 * @property {string} operator The operator of the rule value.
 * @property {string} propertyName The property name of the rule value
 */

/**
 * @enum {string}
 * @hidden
 */
export const RuleOperatorType = {
  BETWEEN: '..',
  EQUAL_TO: '=',
  GREATER_THAN: '>',
  GREATER_THAN_OR_EQUAL_TO: '>=',
  LESSER_THAN: '<',
  LESSER_THAN_OR_EQUAL_TO: '<=',
  LIKE: '~',
  NOT_EQUAL_TO: '!=',
};

/**
 * @enum {string}
 * @hidden
 */
export const RuleSpatialOperatorType = {
  CONTAINS: 'contains',
  INTERSECTS: 'intersects',
  WITHIN: 'within',
};

/**
 * @enum {string}
 * @hidden
 */
export const RuleTemporalOperatorType = {
  BEGINS: 'time_start',
  DURING: 'time_during',
  ENDS: 'time_end',
  EQUALS: 'time_equal',
};

/**
 * @hidden
 */
export default class Rule {
  /**
   * The abstract class for all filter rules.
   *
   * Rules are used to define filters that can be applied on data sources.
   * A rule is usually a combination of 3 things:
   *
   * - a property name, for example 'city_name'
   * - an operator, for example 'is equal to'
   * - and an literal, for example 'Chicoutimi'.
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
   * properties are used instead of `literal`.
   *
   * @param {RuleOptions} options Options.
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
     * The literal of the rule. The literal and boundaries are mutually
     * exclusives.
     * @type {?number|string|string[]}
     * @protected
     */
    this.literal_ = options.literal !== undefined ? options.literal : null;

    /**
     * The lower boundary of the rule. The literal and boundaries are
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
     * The upper boundary of the rule. The literal and boundaries are
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
     * @type {?string[]}
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
    this.type_ = options.type;

    // === Other properties ===

    /**
     * @type {Array<import("ol/events.js").EventsKey>}
     * @protected
     */
    this.listenerKeys = [];
  }

  /**
   * @return {?number|string|string[]} Literal
   */
  get literal() {
    return this.literal_;
  }

  /**
   * @param {?number|string|string[]} literal Literal
   */
  set literal(literal) {
    this.literal_ = literal;
  }

  // === Static property getters/setters ===

  /**
   * @return {boolean} Is custom.
   */
  get isCustom() {
    return this.isCustom_;
  }

  /**
   * @return {string} name
   */
  get name() {
    return this.name_;
  }

  /**
   * @return {?string[]} Operators
   */
  get operators() {
    return this.operators_;
  }

  /**
   * @return {string} Property name
   */
  get propertyName() {
    return this.propertyName_;
  }

  /**
   * @return {string} Type
   */
  get type() {
    return this.type_;
  }

  // === Calculated property getters ===

  /**
   * @return {?RuleSimpleValue|RuleRangeValue} Value.
   */
  get value() {
    let value = null;

    const literal = this.literal;
    const lowerBoundary = this.lowerBoundary;
    const operator = this.operator;
    const propertyName = this.propertyName;
    const upperBoundary = this.upperBoundary;

    if (operator) {
      if (operator === RuleOperatorType.BETWEEN || operator === RuleTemporalOperatorType.DURING) {
        if (lowerBoundary !== null && upperBoundary !== null) {
          value = {
            operator,
            lowerBoundary,
            propertyName,
            upperBoundary,
          };
        }
      } else {
        if (literal !== null) {
          value = {
            literal,
            operator,
            propertyName,
          };
        }
      }
    }

    return value;
  }

  // === Other utility methods ===

  /**
   * Reset the following properties to `null`: literal, lowerBoundary,
   * upperBoundary.
   */
  reset() {
    if (this.literal !== null) {
      this.literal = null;
    }
    if (this.lowerBoundary !== null) {
      this.lowerBoundary = null;
    }
    if (this.upperBoundary !== null) {
      this.upperBoundary = null;
    }
  }

  /**
   */
  destroy() {
    this.listenerKeys.forEach(unlistenByKey);
    this.listenerKeys.length = 0;
  }
}
