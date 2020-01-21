/**
 * @module ngeo.format.filter
 */
import olFormatFilterComparison from 'ol/format/filter/Comparison.js';

/**
 * @classdesc
 * Represents a `<PropertyIsBetween>` temporal comparison operator,
 * suitable for QGIS server that does not support `<During>`.
 */
class DateIsBetween extends olFormatFilterComparison {

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
 * @returns {!ngeo.format.filter.DateIsBetween} `<PropertyIsBetween>` operator.
 */
export function dateBetween(propertyName, lowerBoundary, upperBoundary) {
  return new DateIsBetween(propertyName, lowerBoundary, upperBoundary);
}
