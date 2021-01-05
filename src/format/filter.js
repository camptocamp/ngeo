// The MIT License (MIT)
//
// Copyright (c) 2020-2021 Camptocamp SA
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

/**
 * @module ngeo.format.filter
 */
import olFormatFilterComparison from 'ol/format/filter/Comparison.js';

/**
 * @classdesc
 * Represents a `<PropertyIsBetween>` temporal comparison operator,
 * suitable for QGIS server that does not support `<During>`.
 */
export class DateIsBetween extends olFormatFilterComparison {
  /**
   * @param {!string} propertyName Name of the context property to compare.
   * @param {!string} lowerBoundary The lower bound of the range.
   * @param {!string} upperBoundary The upper bound of the range.
   */
  constructor(propertyName, lowerBoundary, upperBoundary) {
    super('PropertyIsBetween', propertyName);

    /**
     * @type {!string}
     */
    this.lowerBoundary = lowerBoundary;

    /**
     * @type {!string}
     */
    this.upperBoundary = upperBoundary;
  }
}

/**
 * Creates a `<PropertyIsBetween>` comparison operator to test whether an expression
 * value lies within a time range given by a lower and upper bound (inclusive).
 *
 * @param {!string} propertyName Name of the context property to compare.
 * @param {!string} lowerBoundary The lower bound of the range.
 * @param {!string} upperBoundary The upper bound of the range.
 * @returns {!DateIsBetween} `<PropertyIsBetween>` operator.
 */
export function dateBetween(propertyName, lowerBoundary, upperBoundary) {
  return new DateIsBetween(propertyName, lowerBoundary, upperBoundary);
}
