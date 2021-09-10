// The MIT License (MIT)
//
// Copyright (c) 2018-2021 Camptocamp SA
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
 * The options for creating a text style.
 *
 * extends import('ngeo/rule/Rule').RuleOptions
 * @typedef {Object} TextOptions
 * @property {string} text
 * @property {number} [size]
 * @property {number} [angle]
 * @property {boolean} [rotateWithView=false]
 * @property {import('ol/color').Color} [color]
 * @property {number} [width]
 * @property {number} [offsetX]
 * @property {number} [offsetY]
 * @property {boolean} [exceedLength]
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
   * A text rule, which always compares the value with the LIKE operator, by default.
   *
   * @param {TextOptions} options Options.
   */
  constructor(options) {
    options.operator = options.operator || RuleOperatorType.LIKE;
    options.type = ngeoFormatAttributeType.TEXT;

    super(options);
  }
}
