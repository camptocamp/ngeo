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
 * A filter used to format a number with a precision, using the locale.
 *
 * Arguments:
 * - opt_precision: The used precision, default is 3.
 *
 * Examples:
 *
 *      {{0.1234 | ngeoNumber}} => 0.123
 *      {{1.234 | ngeoNumber}} => 1.23
 *      {{12.34 | ngeoNumber}} => 12.3
 *      {{123.4 | ngeoNumber}} => 123
 *      {{1234 | ngeoNumber}} => 1230
 *
 * @param {angular.$locale} $locale Angular locale
 * @return {ngeox.number} Function used to format number into a string.
 * @ngInject
 * @ngdoc filter
 * @ngname ngeoNumber
 */
ngeo.Number = function($locale) {
  var formats = $locale.NUMBER_FORMATS;

  /**
   * @param {number} number The number to format.
   * @param {number=} opt_precision The used precision, default is 3.
   * @return {string} The formatted string.
   */
  var result = function(number, opt_precision) {
    var groupSep = formats.GROUP_SEP;
    var decimalSep = formats.DECIMAL_SEP;
    if (opt_precision === undefined) {
      opt_precision = 3;
    }

    if (number === Infinity) {
      return '\u221e';
    } else if (number === -Infinity) {
      return '-\u221e';
    } else if (number === 0) {
      // 0 will creates infinity values
      return '0';
    }
    var sign = number < 0;
    number = Math.abs(number);

    var nb_decimal = opt_precision - Math.floor(Math.log(number) / Math.log(10)) - 1;
    var factor = Math.pow(10, nb_decimal);
    number = Math.round(number * factor);
    var decimal = '';
    var unit = Math.floor(number / factor);

    if (nb_decimal > 0) {
      var str_number = number + '';
      // 0 padding
      while (str_number.length < nb_decimal) {
        str_number = '0' + str_number;
      }
      decimal = str_number.substring(str_number.length - nb_decimal);
      while (decimal[decimal.length - 1] === '0') {
        decimal = decimal.substring(0, decimal.length - 1);
      }
    }

    var groups = [];
    var str_unit = unit + '';
    while (str_unit.length > 3) {
      var index = str_unit.length - 3;
      groups.unshift(str_unit.substring(index));
      str_unit = str_unit.substring(0, index);
    }
    groups.unshift(str_unit);

    return (sign ? '-' : '') + groups.join(groupSep) + (
      decimal.length === 0 ? '' : decimalSep + decimal
    );
  };
  return result;
};

ngeo.module.filter('ngeoNumber', ngeo.Number);

/**
 * A filter used to format a number with the prefix and unit
 *
 * Arguments:
 * - opt_unit: The unit to used, default is ''.
 * - opt_type: (unit|square|binary) the type of units, default is 'unit'.
 * - opt_precision: The used precision, default is 3.
 *
 * Examples:
 *
 *      {{25000 | ngeoUnitPrefix}} => 25 k
 *      {{25000 | ngeoUnitPrefix:m}} => 25 km
 *      {{25000000 | ngeoUnitPrefix:m²:square}} => 25 km²
 *      {{2048 | ngeoUnitPrefix:o:binary}} => 2 Kio
 *
 *
 * @param {angular.$filter} $filter Angular filter
 * @return {ngeox.unitPrefix} Function used to format number into a string.
 * @ngInject
 * @ngdoc filter
 * @ngname ngeoUnitPrefix
 */
ngeo.UnitPrefix = function($filter) {
  var numberFilter = $filter('ngeoNumber');
  var standardPrefix = ['', 'k', 'M', 'G', 'T', 'P'];
  var binaryPrefix = ['', 'Ki', 'Mi', 'Gi', 'Ti', 'Pi'];
  /**
   * @param {number} number The number to format.
   * @param {string=} opt_unit The unit to used, default is ''.
   * @param {string=} opt_type (unit|square|binary) the type of units, default is 'unit'.
   * @param {number=} opt_precision The used precision, default is 3.
   * @return {string} The formated string.
   */
  var result = function(number, opt_unit, opt_type, opt_precision) {
    if (opt_unit === undefined) {
      opt_unit = '';
    }
    var divisor = 1000;
    var prefix = standardPrefix;
    if (opt_type === 'square') {
      divisor = 1000000;
    } else if (opt_type === 'binary') {
      divisor = 1024;
      prefix = binaryPrefix;
    }

    var index = 0;
    var index_max = prefix.length - 1;
    while (number >= divisor && index < index_max) {
      number = number / divisor;
      index++;
    }

    var postfix = prefix[index] + opt_unit;
    var space = postfix.length == 0 ? '' : '\u00a0';
    return numberFilter(number, opt_precision) + space + postfix;
  };
  return result;
};

ngeo.module.filter('ngeoUnitPrefix', ngeo.UnitPrefix);

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
 *      <p>{{[2600000, 1600000] | ngeoNumberCoordinates::{x}, {y}}}</p>
 *      <!-- will Become 2,600,000, 1,600,000 -->
 *      <br/>
 *      <!-- With fr-CH localization (opt_localize can be true or undefined) -->
 *      <p>{{[2600000, 1600000] | ngeoNumberCoordinates::{x}, {y}}}</p>
 *      <!-- will Become 2'600'000, 1'600'000 -->
 *      <br/>
 *      <!-- With en-US localization but with localization to false -->
 *      <p>{{[2600000, 1600000] | ngeoNumberCoordinates::{x}, {y}}}</p>
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
   * @return {string} Number formated coordinates.
   */
  var filterFn = function(coordinates, opt_fractionDigits, opt_template) {
    var template = opt_template ? opt_template : '{x} {y}';
    var x = coordinates[0];
    var y = coordinates[1];
    var fractionDigits = parseInt(opt_fractionDigits, 10) | 0;
    x = $filter('number')(x, fractionDigits);
    y = $filter('number')(y, fractionDigits);
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
