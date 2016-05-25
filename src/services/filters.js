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
  var numberFilter = $filter('number');
  return function(scale) {
    var text = numberFilter(scale, 0);
    return text ? '1\u00a0:\u00a0' + text : '';
  };
};

ngeo.module.filter('ngeoScalify', ngeo.Scalify);

/**
 * Format a couple of numbers as number coordinates.
 *
 * Example without parameters (en-US localization):
 *
 *      <p>{{[7.1234, 46.9876] | ngeoNumberCoordinates}}</p>
 *      <!-- will Become 7 47 -->
 *
 * Example with defined fractionDigits and template (en-US localization):
 *
 *      <p>{{[7.1234, 46.9876] | ngeoNumberCoordinates:2:co {x} E; {y} N}}</p>
 *      <!-- will Become co 7.12 E; 46.99 N -->
 *
 * Example without fractionDigits but with defined template and localize:
 *
 *      <!-- With en-US localization (opt_localize can be true or undefined) -->
 *      <p>{{[2600000, 1600000] | ngeoNumberCoordinates::{x}, {y}:true}}</p>
 *      <!-- will Become 2,600,000, 1,600,000 -->
 *      <br/>
 *      <!-- With fr-CH localization (opt_localize can be true or undefined) -->
 *      <p>{{[2600000, 1600000] | ngeoNumberCoordinates::{x}, {y}:true}}</p>
 *      <!-- will Become 2'600'000, 1'600'000 -->
 *      <br/>
 *      <!-- With en-US localization but with localization to false -->
 *      <p>{{[2600000, 1600000] | ngeoNumberCoordinates::{x}, {y}:false}}</p>
 *      <!-- will Become 2'600'000, 1'600'000 -->
 *
 * @param {angular.$filter} $filter Angular filter
 * @return {function(ol.Coordinate, (number|string)=, string=,
 *     (boolean|string)=): string} A function to format numbers into
 *     coordinates string.
 * @ngInject
 * @ngdoc filter
 * @ngname ngeoNumberCoordinates
 */
ngeo.NumberCoordinates = function($filter) {
  /**
   * @param {ol.Coordinate} coordinates Array of two numbers.
   * @param {(number|string)=} opt_fractionDigits Optional number of digit.
   *     Default to 0.
   * @param {string=} opt_template Optional template. Default to '{x} {y}'.
   *     Where "{x}" will be replaced by the first coordinate and "{y}" by the
   *     second one. Note: Use a html entity to use the semicolon symbole
   *     into a template.
   * @param {(boolean|string)=} opt_localize Optional. If true or not defined,
   *     format number as the current local system (see Angular number filter).
   *     Set it explicitely to false to use always "." as the decimal separator
   *     and include "'" group separators after each third digit.
   * @return {string} Number formated coordinates.
   */
  var filterFn = function(coordinates, opt_fractionDigits, opt_template,
      opt_localize) {
    var template = opt_template ? opt_template : '{x} {y}';
    var x = coordinates[0];
    var y = coordinates[1];
    var fractionDigits = parseInt(opt_fractionDigits, 10) | 0;
    if (opt_localize === 'false' || opt_localize === false) {
      x = x.toFixed(fractionDigits);
      y = y.toFixed(fractionDigits);
      x = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\'');
      y = y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\'');
    } else {
      x = $filter('number')(x, fractionDigits);
      y = $filter('number')(y, fractionDigits);
    }
    return template.replace('{x}', x).replace('{y}', y);
  };
  return filterFn;
};

ngeo.module.filter('ngeoNumberCoordinates', ngeo.NumberCoordinates);


/**
 * Format a couple of numbers as DMS coordinates.
 *
 * Example without parameters:
 *
 *      <p>{{[7.1234, 46.9876] | ngeoDMSCoordinates}}</p>
 *      <!-- will Become 46° 59' 15'' N 7° 07' 24'' E-->
 *
 * Example with defined fractionDigits and a template.
 *
 *      <p>{{[7.1234, 46.9876] | ngeoDMSCoordinates:2:[{x}; {y}]}}</p>
 *      <!-- will Become [46° 59' 15.36'' N; 7° 07' 24.24'' E] -->
 *
 * @return {function(ol.Coordinate, (number|string)=, string=): string} A
 *     function to format numbers into a DMS coordinates string.
 * @ngInject
 * @ngdoc filter
 * @ngname ngeoDMSCoordinates
 */
ngeo.DMSCoordinates = function() {
  var degreesToStringHDMS = function(degrees, hemispheres, fractionDigits) {
    var normalizedDegrees = goog.math.modulo(degrees + 180, 360) - 180;
    var dms = Math.abs(3600 * normalizedDegrees);
    var d = Math.floor(dms / 3600);
    var m = Math.floor((dms / 60) % 60);
    var s = (dms % 60);
    return d + '\u00b0 ' +
        goog.string.padNumber(m, 2) + '\u2032 ' +
        goog.string.padNumber(s, 2, fractionDigits) + '\u2033 ' +
        hemispheres.charAt(normalizedDegrees < 0 ? 1 : 0);
  };

  /**
   * @param {ol.Coordinate} coordinates Array of two numbers.
   * @param {(number|string)=} opt_fractionDigits Optional number of digit.
   *     Default to 0.
   * @param {string=} opt_template Optional template. Default to
   *     '{x} {y}'. Where "{x}" will be replaced by the first
   *     coordinate, {y} by the second one. Note: Use a html entity to use the
   *     semicolon symbole into a template.
   * @return {string} DMS formated coordinates.
   */
  var filterFn = function(coordinates, opt_fractionDigits, opt_template) {
    var fractionDigits = parseInt(opt_fractionDigits, 10) | 0;

    var template = opt_template ? opt_template : '{x} {y}';

    var xdms = degreesToStringHDMS(coordinates[1], 'NS', fractionDigits);
    var ydms = degreesToStringHDMS(coordinates[0], 'EW', fractionDigits);

    return template.replace('{x}', xdms).replace('{y}', ydms);
  };

  return filterFn;
};

ngeo.module.filter('ngeoDMSCoordinates', ngeo.DMSCoordinates);
