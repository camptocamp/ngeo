goog.provide('ngeo.filters');

goog.require('ngeo');
goog.require('ol.coordinate');

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
 * Format a couple of numbers as Swiss coordinates.
 *
 * Example without parameters:
 *
 *      <p>{{[600000.1234, 200000.5678] | ngeoSwissCoordinates}}</p>
 *      <!-- will Become 600'000, 200'001 -->
 *      <p>{{[2600000.1234, 1200000.5678] | ngeoSwissCoordinates}}</p>
 *      <!-- will Become 2'600'000, 1'200'001 -->
 *
 * Example with defined prefix, separator and suffix (you can
 *     not use the colon symbole).
 *
 *      <p>{{[600000.1234, 200000.5678] | ngeoSwissCoordinates:[:; :]}}</p>
 *      <!-- will Become [600'000; 200'001] -->
 *      <p>{{[2600000.1234, 1200000.5678] | ngeoSwissCoordinates:[:; :]}}</p>
 *      <!-- will Become [2'600'000; 1'200'001] -->
 *
 * @return {function(ol.Coordinate, string, string, string): string} A
 *     function to format numbers into an Swiss coordinates string.
 * @ngInject
 * @ngdoc filter
 * @ngname ngeoSwissCoordinates
 */
ngeo.SwissCoordinates = function() {
  /**
   * @param {ol.Coordinate} coordinates Array of two numbers.
   * @param {string=} opt_prefix Optional prefix.
   * @param {string=} opt_separator Optional separatator. default to ' '.
   * @param {string=} opt_suffix Optional suffix.
   * @return {string} Swiss formated coordinates.
   */
  var filterFn = function(coordinates, opt_prefix, opt_separator, opt_suffix) {
    var prefix = opt_prefix ? opt_prefix : '';
    var separator = opt_separator ? opt_separator : ', ';
    var suffix = opt_suffix ? opt_suffix : '';
    var x = Math.round(coordinates[0]);
    x = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\'');
    var y = Math.round(coordinates[1]);
    y = y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\'');
    return prefix + x + separator + y + suffix;
  };
  return filterFn;
};

ngeo.module.filter('ngeoSwissCoordinates', ngeo.SwissCoordinates);


/**
 * Format a couple of numbers as a East North coordinates.
 *
 * Example without parameters:
 *
 *      <p>{{[7.1234, 46.9876] | ngeoEastNorthCoordinates}}</p>
 *      <!-- will Become 7 E 47 N -->
 *
 * Example with defined fractionDigits, prefix, separator and suffix (you can
 *     not use the colon symbole).
 *
 *      <p>{{[7.1234, 46.9876] | ngeoEastNorthCoordinates:2:[:; :]}}</p>
 *      <!-- will Become [7.12 E; 46.99 N] -->
 *
 * @return {function(ol.Coordinate, number, string, string, string): string} A
 *     function to format numbers into an East North coordinates string.
 * @ngInject
 * @ngdoc filter
 * @ngname ngeoEastNorthCoordinates
 */
ngeo.EastNorthCoordinates = function() {
  /**
   * @param {ol.Coordinate} coordinates Array of two numbers.
   * @param {number=} opt_fractionDigits number of digit, Same as
   *     {@link ol.coordinate.format} opt_fractionDigits parameters.
   * @param {string=} opt_prefix Optional prefix.
   * @param {string=} opt_separator Optional separatator. default to ' '.
   * @param {string=} opt_suffix Optional suffix.
   * @return {string} East north formated coordinates.
   */
  var filterFn = function(coordinates, opt_fractionDigits, opt_prefix,
      opt_separator, opt_suffix) {
    var prefix = opt_prefix ? opt_prefix : '';
    var separator = opt_separator ? opt_separator : ' ';
    var suffix = opt_suffix ? opt_suffix : '';
    var template = prefix + '{x} E' + separator + '{y} N' + suffix;
    return ol.coordinate.format(coordinates, template, opt_fractionDigits);
  };
  return filterFn;
};

ngeo.module.filter('ngeoEastNorthCoordinates', ngeo.EastNorthCoordinates);


/**
 * Format a couple of numbers as DMS coordinates.
 *
 * Example without parameters:
 *
 *      <p>{{[7.1234, 46.9876] | ngeoDMSCoordinates}}</p>
 *      <!-- will Become 46° 59' 15'' N 7° 07' 24'' E-->
 *
 * Example with defined fractionDigits, prefix, separator and suffix (you can
 *     not use the colon symbole).
 *
 *      <p>{{[7.1234, 46.9876] | ngeoDMSCoordinates:2:[:; :]}}</p>
 *      <!-- will Become [46° 59' 15.36'' N; 7° 07' 24.24'' E] -->
 *
 * @return {function(ol.Coordinate, number, string, string, string): string} A
 *     function to format numbers into a DMS coordinates string.
 * @ngInject
 * @ngdoc filter
 * @ngname ngeoDMSCoordinates
 */
ngeo.DMSCoordinates = function() {
  var degreesToStringHDMS = function(degrees, hemispheres, digits) {
    var normalizedDegrees = goog.math.modulo(degrees + 180, 360) - 180;
    var dms = Math.abs(3600 * normalizedDegrees);
    var d = Math.floor(dms / 3600);
    var m = Math.floor((dms / 60) % 60);
    var s = parseFloat((dms % 60).toFixed(digits));
    return d + '\u00b0 ' +
        goog.string.padNumber(m, 2) + '\u2032 ' +
        goog.string.padNumber(s, 2) + '\u2033 ' +
        hemispheres.charAt(normalizedDegrees < 0 ? 1 : 0);
  };

  /**
   * @param {ol.Coordinate} coordinates Array of two numbers.
   * @param {number=} opt_fractionDigits number of digit, Same as
   *     {@link ol.coordinate.format} opt_fractionDigits parameters.
   * @param {string=} opt_prefix Optional prefix.
   * @param {string=} opt_separator Optional separatator. default to ' '.
   * @param {string=} opt_suffix Optional suffix.
   * @return {string} DMS formated coordinates.
   */
  var filterFn = function(coordinates, opt_fractionDigits, opt_prefix,
      opt_separator, opt_suffix) {
    var digits = opt_fractionDigits ? opt_fractionDigits : 0;
    var prefix = opt_prefix ? opt_prefix : '';
    var separator = opt_separator ? opt_separator : ' ';
    var suffix = opt_suffix ? opt_suffix : '';

    var xdms = degreesToStringHDMS(coordinates[1], 'NS', digits);
    var ydms = degreesToStringHDMS(coordinates[0], 'EW', digits);

    return prefix + xdms + separator + ydms + suffix;
  };

  return filterFn;
};

ngeo.module.filter('ngeoDMSCoordinates', ngeo.DMSCoordinates);
