goog.provide('ngeo.filters');

goog.require('ngeo');

/**
 * Format a number as a localized scale.
 * For instance:
 *  - For 'fr-CH' the value 25000 will become '1 : 25 000'.
 *  - For 'en-US' the value 25000 will become '1 : 25,000'.
 *
 * Example:
 *
 *      <p>{{25000 | ngeoScalify}}</p>
 *
 *
 * @param {angular.$filter} $filter Angular filter
 * @return {function(number): string} A function to format number into a 'scale'
 *     string.
 * @ngInject
 * @ngdoc filter
 * @ngname ngeoScalify
 */
ngeo.Scalify = function($filter) {
  var number = $filter('number');
  return function(scale) {
    var text = number(scale, 0);
    return text ? '1\u00a0:\u00a0' + text : '';
  };
};

ngeo.module.filter('ngeoScalify', ngeo.Scalify);
