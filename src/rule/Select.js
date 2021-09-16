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

import ngeoFormatAttributeType from 'ngeo/format/AttributeType';
import ngeoRuleRule, {RuleOperatorType} from 'ngeo/rule/Rule';

/**
 * extends import('ngeo/rule/Rule').RuleOptions
 *
 * @typedef {Object} SelectOptions
 * @property {string[]} choices List of choices available for selection.
 * @property {boolean} [active=false] (RuleOptions)
 * @property {number|string} [expression] (RuleOptions)
 * @property {number|string|string[]} [literal] (RuleOptions)
 * @property {boolean} [isCustom] (RuleOptions)
 * @property {number} [lowerBoundary] (RuleOptions)
 * @property {string} name (RuleOptions)
 * @property {string} [operator] (RuleOptions)
 * @property {string[]} [operators] (RuleOptions)
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
   * The literal property holds the list of selected choices, which is
   * comma-separated.
   *
   * @param {SelectOptions} options Options.
   */
  constructor(options) {
    options.operator = RuleOperatorType.EQUAL_TO;
    options.type = ngeoFormatAttributeType.SELECT;

    super(options);

    // === STATIC properties (i.e. that never change) ===

    /**
     * @type {string[]}
     * @private
     */
    this.choices_ = options.choices;
  }

  // === Static property getters/setters ===

  /**
   * @returns {string[]} Choices
   */
  get choices() {
    return this.choices_;
  }

  // === Calculated property getters ===

  /**
   * @returns {string[]} Selected choices
   */
  get selectedChoices() {
    /** @type {string[]} */
    let selectedChoices;
    if (this.literal) {
      selectedChoices = /** @type {string[]} */ (this.literal);
    } else {
      selectedChoices = [];
    }
    return selectedChoices;
  }
}
