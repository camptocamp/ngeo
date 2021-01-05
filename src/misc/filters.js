// The MIT License (MIT)
//
// Copyright (c) 2016-2020 Camptocamp SA
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

import angular from 'angular';
import {modulo} from 'ol/math.js';
import {padNumber} from 'ol/string.js';

/**
 * @typedef {Object} StringToHtmlReplacement
 * @property {RegExp} expression The regex expression that must match to do the replacement.
 * @property {string} template The template to use to create a new value as replacement if the regex matches.
 */

/**
 * Format a number with a precision.
 *
 * Arguments:
 * - opt_precision: The used precision, default is 3.
 *
 * @typedef {function(number, number=): string} formatNumber
 */

/**
 * Format a number with the prefix and unit.
 *
 * Arguments:
 * - opt_unit: The unit to used, default is ''.
 * - opt_type: (unit|square|binary) the type of units, default is 'unit'.
 * - opt_precision: The used precision, default is 3.
 *
 * @typedef {function(number, string=, string=, number=): string} unitPrefix
 */

/**
 * Format a couple of numbers as number coordinates.
 *
 * Arguments:
 * - coordinates Array of two numbers.
 * - opt_fractionDigits Optional number of digit. Default to 0.
 * - opt_template Optional template. Default to '{x} {y}'.
 *     Where "{x}" will be replaced by the easting coordinate and "{y}" by the northing one. Note:
 *     Use a html entity to use the semicolon symbol into a template.
 * @typedef {function(import("ol/coordinate.js").Coordinate, (number|string)=, string=, (boolean|string)=): string} numberCoordinates
 */

/**
 * Format a coordinates as DMS coordinates.
 * Arguments:
 * - coordinates Array of two numbers.
 * - opt_fractionDigits Optional number of digit. Default to 0.
 * - opt_template Optional template. Default to '{x} {y}'.
 *     Where "{x}" will be replaced by the easting coordinate, {y} by the northing one. Note: Use a html
 *     entity to use the semicolon symbol into a template.
 * @typedef {function(import("ol/coordinate.js").Coordinate, (number|string)=, string=): string} dmsCoordinates
 */

/**
 * Format a duration in seconds to a more readable form.
 * Arguments:
 * - duration The duration in seconds.
 * @typedef {function(number): string} duration
 */

/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoAngularFilters', []);

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
 * @param {angular.IFilterService} $filter Angular filter
 * @return {function(number): string} A function to format number into a 'scale'
 *     string.
 * @ngInject
 * @ngdoc filter
 * @ngname ngeoScalify
 */
export function ScalifyFilter($filter) {
  const numberFilter = $filter('ngeoNumber');
  /**
   * @param {number} scale
   * @param {number=} opt_precision The used precision, default is 2.
   */
  const filterFn = function (scale, opt_precision) {
    if (opt_precision === undefined) {
      opt_precision = 2;
    }
    const text = numberFilter(scale, opt_precision);
    return text ? `1\u00a0:\u00a0${text}` : '';
  };
  filterFn.$stateful = true;
  return filterFn;
}

module.filter('ngeoScalify', ScalifyFilter);

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
 * @param {angular.ILocaleService} $locale Angular locale
 * @return {formatNumber} Function used to format number into a string.
 * @ngInject
 * @ngdoc filter
 * @ngname ngeoNumber
 */
export function NumberFilter($locale) {
  const formats = $locale.NUMBER_FORMATS;

  /**
   * @param {number} number The number to format.
   * @param {number=} opt_precision The used precision, default is 3.
   * @return {string} The formatted string.
   */
  const result = function (number, opt_precision) {
    const groupSep = formats.GROUP_SEP;
    const decimalSep = formats.DECIMAL_SEP;
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
    const sign = number < 0;
    number = Math.abs(number);

    const nb_decimal = opt_precision - Math.floor(Math.log(number) / Math.log(10)) - 1;
    const factor = Math.pow(10, nb_decimal);
    number = Math.round(number * factor);
    let decimal = '';
    const unit = Math.floor(number / factor);

    if (nb_decimal > 0) {
      let str_number = `${number}`;
      // 0 padding
      while (str_number.length < nb_decimal) {
        str_number = `0${str_number}`;
      }
      decimal = str_number.substring(str_number.length - nb_decimal);
      while (decimal.endsWith('0')) {
        decimal = decimal.substring(0, decimal.length - 1);
      }
    }

    const groups = [];
    let str_unit = `${unit}`;
    while (str_unit.length > 3) {
      const index = str_unit.length - 3;
      groups.unshift(str_unit.substring(index));
      str_unit = str_unit.substring(0, index);
    }
    groups.unshift(str_unit);

    return (sign ? '-' : '') + groups.join(groupSep) + (decimal.length === 0 ? '' : decimalSep + decimal);
  };
  return result;
}

module.filter('ngeoNumber', NumberFilter);

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
 *      {{25000 | ngeoUnitPrefix:'m'}} => 25 km
 *      {{25000000 | ngeoUnitPrefix:'m²':'square'}} => 25 km²
 *      {{2048 | ngeoUnitPrefix:'o':'binary'}} => 2 Kio
 *
 *
 * @param {angular.IFilterService} $filter Angular filter
 * @return {unitPrefix} Function used to format number into a string.
 * @ngInject
 * @ngdoc filter
 * @ngname ngeoUnitPrefix
 */
export function UnitPrefixFilter($filter) {
  /** @type {function(number, number=): string} */
  const numberFilter = $filter('ngeoNumber');
  const standardPrefix = ['', 'k', 'M', 'G', 'T', 'P'];
  const binaryPrefix = ['', 'Ki', 'Mi', 'Gi', 'Ti', 'Pi'];
  /**
   * @param {number} number The number to format.
   * @param {string=} opt_unit The unit to used, default is ''.
   * @param {string=} opt_type (unit|square|binary) the type of units, default is 'unit'.
   * @param {number=} opt_precision The used precision, default is 3.
   * @return {string} The formatted string.
   */
  const result = function (number, opt_unit, opt_type, opt_precision) {
    if (opt_unit === undefined) {
      opt_unit = '';
    }
    const comparatorFactor = 1 - 0.1 ** (opt_precision || 3) * 0.5;
    let divisor = 1000;
    let prefix = standardPrefix;
    if (opt_type === 'square') {
      divisor = 1000000;
    } else if (opt_type === 'binary') {
      divisor = 1024;
      prefix = binaryPrefix;
    }

    let index = 0;
    const index_max = prefix.length - 1;
    while (number >= divisor * comparatorFactor && index < index_max) {
      number = number / divisor;
      index++;
    }

    const postfix = prefix[index] + opt_unit;
    const space = postfix.length == 0 ? '' : '\u00a0';
    return numberFilter(number, opt_precision) + space + postfix;
  };
  return result;
}

module.filter('ngeoUnitPrefix', UnitPrefixFilter);

/**
 * Format a couple of numbers as number coordinates.
 *
 * Example without parameters:
 *
 *      <p>{{[7.1234, 46.9876] | ngeoNumberCoordinates}}</p>
 *      <!-- will Become 7 47 -->
 *
 * Example with defined fractionDigits and template (en-US localization):
 *
 *      <!-- With en-US localization -->
 *      <p>{{[7.1234, 46.9876] | ngeoNumberCoordinates:2:'co {x} E; {y} N'}}</p>
 *      <!-- will Become co 7.12 E; 46.99 N -->
 *      <br/>
 *      <!-- With en-US localization -->
 *      <p>{{[2600000, 1600000] | ngeoNumberCoordinates:0:'{x}, {y}'}}</p>
 *      <!-- will Become 2,600,000, 1,600,000 -->
 *      <br/>
 *      <!-- With fr-CH localization -->
 *      <p>{{[2600000, 1600000] | ngeoNumberCoordinates:0:'{x}, {y}'}}</p>
 *      <!-- will Become 2'600'000, 1'600'000 -->
 *
 * @param {angular.IFilterService} $filter Angular filter
 * @return {numberCoordinates} A function to format numbers into coordinates string.
 * @ngInject
 * @ngdoc filter
 * @ngname ngeoNumberCoordinates
 */
export function NumberCoordinatesFilter($filter) {
  /**
   * @param {import("ol/coordinate.js").Coordinate} coordinates Array of two numbers.
   * @param {(number|string)=} opt_fractionDigits Optional number of digit.
   *     Default to 0.
   * @param {string=} opt_template Optional template. Default to '{x} {y}'.
   *     Where "{x}" will be replaced by the easting coordinate and "{y}" by the
   *     northing one. Note: Use a html entity to use the semicolon symbol
   *     into a template.
   * @return {string} Number formatted coordinates.
   */
  const filterFn = function (coordinates, opt_fractionDigits, opt_template) {
    const template = opt_template ? opt_template : '{x} {y}';
    const x = coordinates[0];
    const y = coordinates[1];
    const fractionDigits = parseInt(/** @type {string} */ (opt_fractionDigits), 10) | 0;
    const x_str = $filter('number')(x, fractionDigits);
    const y_str = $filter('number')(y, fractionDigits);
    return template.replace('{x}', x_str).replace('{y}', y_str);
  };
  return filterFn;
}

module.filter('ngeoNumberCoordinates', NumberCoordinatesFilter);

/**
 * Format coordinates as DMS coordinates.
 *
 * Example without parameters:
 *
 *      <p>{{[7.1234, 46.9876] | ngeoDMSCoordinates}}</p>
 *      <!-- will Become  7° 07' 24'' E 46° 59' 15'' N-->
 *
 * Example with defined fractionDigits and a template.
 *
 *      <p>{{[7.1234, 46.9876] | ngeoDMSCoordinates:2:'[{y}; {x]'}}</p>
 *      <!-- will Become [46° 59' 15.36'' N; 7° 07' 24.24'' E] -->
 *
 * @return {dmsCoordinates} A function to format numbers into a DMS coordinates string.
 * @ngInject
 * @ngdoc filter
 * @ngname ngeoDMSCoordinates
 */
export function DMSCoordinatesFilter() {
  /**
   * @param {number} degrees
   * @param {string} hemispheres
   * @param {number} fractionDigits
   */
  const degreesToStringHDMS = function (degrees, hemispheres, fractionDigits) {
    const normalizedDegrees = modulo(degrees + 180, 360) - 180;
    const dms = Math.abs(3600 * normalizedDegrees);
    const d = Math.floor(dms / 3600);
    const m = Math.floor((dms / 60) % 60);
    const s = dms % 60;
    return `${d}\u00b0 ${padNumber(m, 2)}\u2032 ${padNumber(s, 2, fractionDigits)}\u2033 ${hemispheres.charAt(
      normalizedDegrees < 0 ? 1 : 0
    )}`;
  };

  /**
   * @param {import("ol/coordinate.js").Coordinate} coordinates Array of two numbers.
   * @param {(number|string)=} opt_fractionDigits Optional number of digit.
   *     Default to 0.
   * @param {string=} opt_template Optional template. Default to
   *     '{x} {y}'. Where "{x}" will be replaced by the easting
   *     coordinate, {y} by the northing one. Note: Use a html entity to use the
   *     semicolon symbol into a template.
   * @return {string} DMS formatted coordinates.
   */
  const filterFn = function (coordinates, opt_fractionDigits, opt_template) {
    const fractionDigits = parseInt(/** @type {string} */ (opt_fractionDigits), 10) | 0;

    const template = opt_template ? opt_template : '{x} {y}';

    const xdms = degreesToStringHDMS(coordinates[0], 'EW', fractionDigits);
    const ydms = degreesToStringHDMS(coordinates[1], 'NS', fractionDigits);

    return template.replace('{x}', xdms).replace('{y}', ydms);
  };

  return filterFn;
}

module.filter('ngeoDMSCoordinates', DMSCoordinatesFilter);

/**
 * A filter to mark a value as trusted HTML.
 *
 * Usage:
 *
 *    <p ng-bind-html="ctrl.someValue | ngeoTrustHtml"></p>
 *
 * If you use it, you don't require the "ngSanitize".
 * @return {function(?):string} The filter function.
 * @ngInject
 * @ngdoc filter
 * @param {angular.ISCEService} $sce Angular sce service.
 * @ngname ngeoTrustHtml
 */
export function trustHtmlFilter($sce) {
  return function (input) {
    if (input !== undefined && input !== null) {
      return $sce.trustAsHtml(`${input}`);
    } else {
      return $sce.trustAsHtml('&nbsp;');
    }
  };
}

module.filter('ngeoTrustHtml', trustHtmlFilter);

/**
 * A filter to mark a value as trusted HTML, with the addition of
 * automatically converting any string that matches the
 * StringToHtmlReplacements list to HTML.
 *
 * Usage:
 *
 *    <p ng-bind-html="ctrl.someValue | ngeoTrustHtmlAuto"></p>
 *
 * If you use it, you don't require the "ngSanitize".
 * @return {function(?):string} The filter function.
 * @ngInject
 * @ngdoc filter
 * @param {angular.ISCEService} $sce Angular sce service.
 * @param {StringToHtmlReplacement[]}
 *     ngeoStringToHtmlReplacements List of replacements for string to html.
 * @ngname ngeoTrustHtmlAuto
 */
export function trustHtmlAutoFilter($sce, ngeoStringToHtmlReplacements) {
  return function (input) {
    if (input !== undefined && input !== null) {
      if (typeof input === 'string') {
        for (const replacement of ngeoStringToHtmlReplacements) {
          if (input.match(replacement.expression)) {
            input = replacement.template.replace(/\$1/g, input);
            break;
          }
        }
        return $sce.trustAsHtml(`${input}`);
      } else {
        return $sce.trustAsHtml(`${input}`);
      }
    } else {
      return $sce.trustAsHtml('&nbsp;');
    }
  };
}

module.filter('ngeoTrustHtmlAuto', trustHtmlAutoFilter);

/**
 * A filter used to format a time duration in seconds into a more
 * readable form.
 * Only the two largest units will be shown.
 *
 * Examples:
 *      {{42 | ngeoDuration}} => 42 seconds
 *      {{132 | ngeoDuration}} => 2 minutes 12 seconds
 *      {{3910 | ngeoDuration}} => 1 hour 5 minutes
 *        -> Note: the remaining 10 seconds will be dropped
 *
 * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
 * @return {duration} Function used to format a time duration in seconds into a string.
 * @ngInject
 * @ngdoc filter
 * @ngname ngeoDuration
 */
export function DurationFilter(gettextCatalog) {
  // time unit enum
  const TimeUnits = Object.freeze({
    SECONDS: Symbol('seconds'),
    MINUTES: Symbol('minutes'),
    HOURS: Symbol('hours'),
    DAYS: Symbol('days'),
  });

  /**
   * @param {number} amount Amount of time.
   * @param {symbol} unit Unit of time.
   * @return {string} formatted and translated string
   */
  const pluralize = function (amount, unit) {
    let formattedUnit = '';
    switch (unit) {
      case TimeUnits.SECONDS:
        formattedUnit = gettextCatalog.getPlural(amount, 'second', 'seconds');
        break;
      case TimeUnits.MINUTES:
        formattedUnit = gettextCatalog.getPlural(amount, 'minute', 'minutes');
        break;
      case TimeUnits.HOURS:
        formattedUnit = gettextCatalog.getPlural(amount, 'hour', 'hours');
        break;
      case TimeUnits.DAYS:
        formattedUnit = gettextCatalog.getPlural(amount, 'day', 'days');
        break;
      default:
        break;
    }
    return `${amount} ${formattedUnit}`;
  };

  /**
   * @param {number} duration The duration in seconds.
   * @return {string} The formatted string.
   */
  const result = function (duration) {
    // round to next integer
    duration = Math.round(duration);

    // just seconds
    let output;
    if (duration < 60) {
      return pluralize(duration, TimeUnits.SECONDS);
    }

    // minutes (+ seconds)
    let remainder = duration % 60; // seconds
    duration = Math.floor(duration / 60); // minutes
    if (duration < 60) {
      // less than an hour
      output = pluralize(duration, TimeUnits.MINUTES);
      if (remainder > 0) {
        output += ` ${pluralize(remainder, TimeUnits.SECONDS)}`;
      }
      return output;
    }

    // hours (+ minutes)
    remainder = duration % 60; // minutes
    duration = Math.floor(duration / 60); // hours
    if (duration < 24) {
      // less than a day
      output = pluralize(duration, TimeUnits.HOURS);
      if (remainder > 0) {
        output += ` ${pluralize(remainder, TimeUnits.MINUTES)}`;
      }
      return output;
    }

    // days (+ hours)
    remainder = duration % 24; // hours
    duration = Math.floor(duration / 24); // days
    output = pluralize(duration, TimeUnits.DAYS);
    if (remainder > 0) {
      output += ` ${pluralize(remainder, TimeUnits.HOURS)}`;
    }
    return output;
  };

  return result;
}

module.filter('ngeoDuration', DurationFilter);

/**
 * @type {StringToHtmlReplacement[]}
 * @ngname ngeoStringToHtmlReplacements
 * @hidden
 */
const StringToHtmlReplacements = [
  // Hyperlink
  {
    expression: /^(https?:\/\/.+)$/gm,
    template: '<a target="_blank" href="$1">$1</a>',
  },
  // Mailto
  {
    expression: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gim,
    template: '<a href="mailto:$1">$1</a>',
  },
];

module.constant('ngeoStringToHtmlReplacements', StringToHtmlReplacements);

/**
 * A filter used to remove the CDATA prefix and postfix.
 *
 * @return {function(string): string|void} Result string
 * @ngdoc filter
 * @ngname ngeoDuration
 * @hidden
 */
export const removeCDATA = function () {
  return function (input) {
    if (input && input.replace) {
      return input.replace(/<!\[CDATA\[(.*)\]\]>/, '$1');
    }
  };
};

module.filter('removeCDATA', removeCDATA);

export default module;
