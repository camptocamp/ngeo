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

// @ts-nocheck

/**!
 * @copyright Copyright &copy; Kartik Visweswaran, Krajee.com, 2014 - 2017
 * @version 1.3.4
 *
 * Date formatter utility library that allows formatting date/time variables or Date objects using PHP
 * DateTime format.
 * This library is a standalone javascript library and does not depend on other libraries or plugins like
 * jQuery.
 *
 * @see http://php.net/manual/en/function.date.php
 *
 * For more JQuery plugins visit http://plugins.krajee.com
 * For more Yii related demos visit http://demos.krajee.com
 */

/* eslint max-len: 0 */
/* eslint valid-jsdoc: 0 */
/* eslint quotes: 0 */
/* eslint indent: 0 */
/* eslint default-case: 0 */
/* eslint prefer-rest-params: 0 */
/* eslint prefer-template: 0 */
/* eslint @typescript-eslint/no-this-alias: 0 */
/* eslint @typescript-eslint/restrict-plus-operands: 0 */

'use strict';

/**
 * @private
 * @hidden
 */
const DAY = 1000 * 60 * 60 * 24;
/**
 * @private
 * @hidden
 */
const HOUR = 3600;

/**
 * @private
 * @hidden
 * @param {string} str1 String 1
 * @param {string} str2 String 2
 * @return {boolean}
 */
function _compare(str1, str2) {
  return typeof str1 === 'string' && typeof str2 === 'string' && str1.toLowerCase() === str2.toLowerCase();
}

/**
 * @private
 * @hidden
 * @param {unknown} value Value
 * @param {number} length Length
 * @param {string} [chr] Char
 * @return {string}
 */
function _lpad(value, length, chr) {
  const val = value.toString();
  chr = chr || '0';
  return val.length < length ? _lpad(chr + val, length) : val;
}

/**
 * @private
 * @hidden
 * @param {unknown} [out] Out
 * @return {unknown}
 */
function _extend(out) {
  out = out || {};
  for (let i = 1; i < arguments.length; i++) {
    const obj = arguments[i];
    if (!obj) {
      continue;
    }
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object') {
          _extend(out[key], obj[key]);
        } else {
          out[key] = obj[key];
        }
      }
    }
  }
  return out;
}

/**
 * @private
 * @hidden
 * @param {string} val Value
 * @param {string[]} arr Argument
 * @return {number}
 */
function _indexOf(val, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].toLowerCase() === val.toLowerCase()) {
      return i;
    }
  }
  return -1;
}

/**
 * @private
 * @hidden
 */
const defaultSettings = {
  dateSettings: {
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    meridiem: ['AM', 'PM'],
    ordinal: function (number) {
      const n = number % 10,
        suffixes = {1: 'st', 2: 'nd', 3: 'rd'};
      return Math.floor((number % 100) / 10) === 1 || !suffixes[n] ? 'th' : suffixes[n];
    },
  },
  separators: /[ \-+/.T:@]/g,
  validParts: /[dDjlNSwzWFmMntLoYyaABgGhHisueTIOPZcrU]/g,
  intParts: /[djwNzmnyYhHgGis]/g,
  tzParts:
    /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
  tzClip: /[^-+\dA-Z]/g,
};

/**
 * @hidden
 */
export default class DateFormatter {
  constructor(options) {
    const self = this,
      config = _extend(defaultSettings, options);
    self.dateSettings = config.dateSettings;
    self.separators = config.separators;
    self.validParts = config.validParts;
    self.intParts = config.intParts;
    self.tzParts = config.tzParts;
    self.tzClip = config.tzClip;
  }

  getMonth(val) {
    const self = this;
    let i = _indexOf(val, self.dateSettings.monthsShort) + 1;
    if (i === 0) {
      i = _indexOf(val, self.dateSettings.months) + 1;
    }
    return i;
  }
  /**
   *
   * @param {Date|string|number} vDate
   * @param {?string} vFormat
   * @return {?Date}
   */
  parseDate(vDate, vFormat) {
    const self = this,
      vSettings = self.dateSettings,
      out = {date: null, year: null, month: null, day: null, hour: 0, min: 0, sec: 0};
    let vDateFlag = false,
      vTimeFlag = false,
      i;
    if (!vDate) {
      return null;
    }
    if (vDate instanceof Date) {
      return vDate;
    }
    if (vFormat === 'U') {
      i = parseInt(vDate);
      return i ? new Date(i * 1000) : vDate;
    }
    switch (typeof vDate) {
      case 'number':
        return new Date(vDate);
      case 'string':
        break;
      default:
        return null;
    }
    const vFormatParts = vFormat.match(self.validParts);
    if (!vFormatParts || vFormatParts.length === 0) {
      throw new Error('Invalid date format definition.');
    }
    const vDateParts = vDate.replace(self.separators, '\0').split('\0');
    for (i = 0; i < vDateParts.length; i++) {
      const vDatePart = vDateParts[i];
      const iDatePart = parseInt(vDatePart);
      switch (vFormatParts[i]) {
        case 'y':
        case 'Y':
          if (iDatePart) {
            const len = vDatePart.length;
            out.year = len === 2 ? parseInt((iDatePart < 70 ? '20' : '19') + vDatePart) : iDatePart;
          } else {
            return null;
          }
          vDateFlag = true;
          break;
        case 'm':
        case 'n':
        case 'M':
        case 'F':
          if (isNaN(iDatePart)) {
            const vMonth = self.getMonth(vDatePart);
            if (vMonth > 0) {
              out.month = vMonth;
            } else {
              return null;
            }
          } else {
            if (iDatePart >= 1 && iDatePart <= 12) {
              out.month = iDatePart;
            } else {
              return null;
            }
          }
          vDateFlag = true;
          break;
        case 'd':
        case 'j':
          if (iDatePart >= 1 && iDatePart <= 31) {
            out.day = iDatePart;
          } else {
            return null;
          }
          vDateFlag = true;
          break;
        case 'g':
        case 'h':
          const vMeriIndex = vFormatParts.includes('a')
            ? vFormatParts.indexOf('a')
            : vFormatParts.includes('A')
            ? vFormatParts.indexOf('A')
            : -1;
          const mer = vDateParts[vMeriIndex];
          if (vMeriIndex !== -1) {
            const vMeriOffset = _compare(mer, vSettings.meridiem[0])
              ? 0
              : _compare(mer, vSettings.meridiem[1])
              ? 12
              : -1;
            if (iDatePart >= 1 && iDatePart <= 12 && vMeriOffset !== -1) {
              out.hour = iDatePart % 12 === 0 ? vMeriOffset : iDatePart + vMeriOffset;
            } else {
              if (iDatePart >= 0 && iDatePart <= 23) {
                out.hour = iDatePart;
              }
            }
          } else {
            if (iDatePart >= 0 && iDatePart <= 23) {
              out.hour = iDatePart;
            } else {
              return null;
            }
          }
          vTimeFlag = true;
          break;
        case 'G':
        case 'H':
          if (iDatePart >= 0 && iDatePart <= 23) {
            out.hour = iDatePart;
          } else {
            return null;
          }
          vTimeFlag = true;
          break;
        case 'i':
          if (iDatePart >= 0 && iDatePart <= 59) {
            out.min = iDatePart;
          } else {
            return null;
          }
          vTimeFlag = true;
          break;
        case 's':
          if (iDatePart >= 0 && iDatePart <= 59) {
            out.sec = iDatePart;
          } else {
            return null;
          }
          vTimeFlag = true;
          break;
      }
    }
    if (vDateFlag === true && out.year && out.month && out.day) {
      out.date = new Date(out.year, out.month - 1, out.day, out.hour, out.min, out.sec, 0);
    } else {
      if (vTimeFlag !== true) {
        return null;
      }
      out.date = new Date(0, 0, 0, out.hour, out.min, out.sec, 0);
    }
    return out.date;
  }
  guessDate(vDateStr, vFormat) {
    if (typeof vDateStr !== 'string') {
      return vDateStr;
    }
    const self = this;
    const vParts = vDateStr.replace(self.separators, '\0').split('\0'),
      vPattern = /^[djmn]/g;
    const vFormatParts = vFormat.match(self.validParts);
    const vDate = new Date();

    if (!vPattern.test(vFormatParts[0])) {
      return vDateStr;
    }

    for (let i = 0; i < vParts.length; i++) {
      let vDigit = 2;
      const iPart = vParts[i];
      const iSec = parseInt(iPart.substr(0, 2));
      if (isNaN(iSec)) {
        return null;
      }
      switch (i) {
        case 0:
          if (vFormatParts[0] === 'm' || vFormatParts[0] === 'n') {
            vDate.setMonth(iSec - 1);
          } else {
            vDate.setDate(iSec);
          }
          break;
        case 1:
          if (vFormatParts[0] === 'm' || vFormatParts[0] === 'n') {
            vDate.setDate(iSec);
          } else {
            vDate.setMonth(iSec - 1);
          }
          break;
        case 2:
          let vYear = vDate.getFullYear();
          const len = iPart.length;
          vDigit = len < 4 ? len : 4;
          vYear = parseInt(len < 4 ? vYear.toString().substr(0, 4 - len) + iPart : iPart.substr(0, 4));
          if (!vYear) {
            return null;
          }
          vDate.setFullYear(vYear);
          break;
        case 3:
          vDate.setHours(iSec);
          break;
        case 4:
          vDate.setMinutes(iSec);
          break;
        case 5:
          vDate.setSeconds(iSec);
          break;
      }
      const n = iPart.substr(vDigit);
      if (n.length > 0) {
        vParts.splice(i + 1, 0, n);
      }
    }
    return vDate;
  }
  parseFormat(vChar, vDate) {
    let fmt = null;
    const self = this,
      vSettings = self.dateSettings,
      backslash = /\\?(.?)/gi,
      doFormat = function (t, s) {
        return fmt[t] ? fmt[t]() : s;
      };
    fmt = {
      /////////
      // DAY //
      /////////
      /**
       * Day of month with leading 0: `01..31`
       * @return {string}
       */
      d() {
        return _lpad(fmt.j(), 2);
      },
      /**
       * Shorthand day name: `Mon...Sun`
       * @return {string}
       */
      D() {
        return vSettings.daysShort[fmt.w()];
      },
      /**
       * Day of month: `1..31`
       * @return {number}
       */
      j() {
        return vDate.getDate();
      },
      /**
       * Full day name: `Monday...Sunday`
       * @return {number}
       */
      l() {
        return vSettings.days[fmt.w()];
      },
      /**
       * ISO-8601 day of week: `1[Mon]..7[Sun]`
       * @return {number}
       */
      N() {
        return fmt.w() || 7;
      },
      /**
       * Day of week: `0[Sun]..6[Sat]`
       * @return {number}
       */
      w() {
        return vDate.getDay();
      },
      /**
       * Day of year: `0..365`
       * @return {number}
       */
      z() {
        const a = new Date(fmt.Y(), fmt.n() - 1, fmt.j()),
          b = new Date(fmt.Y(), 0, 1);
        return Math.round((a - b) / DAY);
      },

      //////////
      // WEEK //
      //////////
      /**
       * ISO-8601 week number
       * @return {number}
       */
      W() {
        const a = new Date(fmt.Y(), fmt.n() - 1, fmt.j() - fmt.N() + 3);
        const b = new Date(a.getFullYear(), 0, 4);
        return _lpad(1 + Math.round((a - b) / DAY / 7), 2);
      },

      ///////////
      // MONTH //
      ///////////
      /**
       * Full month name: `January...December`
       * @return {string}
       */
      F() {
        return vSettings.months[vDate.getMonth()];
      },
      /**
       * Month w/leading 0: `01..12`
       * @return {string}
       */
      m() {
        return _lpad(fmt.n(), 2);
      },
      /**
       * Shorthand month name; `Jan...Dec`
       * @return {string}
       */
      M() {
        return vSettings.monthsShort[vDate.getMonth()];
      },
      /**
       * Month: `1...12`
       * @return {number}
       */
      n() {
        return vDate.getMonth() + 1;
      },
      /**
       * Days in month: `28...31`
       * @return {number}
       */
      t() {
        return new Date(fmt.Y(), fmt.n(), 0).getDate();
      },

      //////////
      // YEAR //
      //////////
      /**
       * Is leap year? `0 or 1`
       * @return {number}
       */
      L() {
        const Y = fmt.Y();
        return (Y % 4 === 0 && Y % 100 !== 0) || Y % 400 === 0 ? 1 : 0;
      },
      /**
       * ISO-8601 year
       * @return {number}
       */
      o() {
        const n = fmt.n(),
          W = fmt.W(),
          Y = fmt.Y();
        return Y + (n === 12 && W < 9 ? 1 : n === 1 && W > 9 ? -1 : 0);
      },
      /**
       * Full year: `e.g. 1980...2010`
       * @return {number}
       */
      Y() {
        return vDate.getFullYear();
      },
      /**
       * Last two digits of year: `00...99`
       * @return {string}
       */
      y() {
        return fmt.Y().toString().slice(-2);
      },

      //////////
      // TIME //
      //////////
      /**
       * Meridian lower: `am or pm`
       * @return {string}
       */
      a() {
        return fmt.A().toLowerCase();
      },
      /**
       * Meridian upper: `AM or PM`
       * @return {string}
       */
      A() {
        const n = fmt.G() < 12 ? 0 : 1;
        return vSettings.meridiem[n];
      },
      /**
       * Swatch Internet time: `000..999`
       * @return {string}
       */
      B() {
        const H = vDate.getUTCHours() * HOUR;
        const i = vDate.getUTCMinutes() * 60;
        const s = vDate.getUTCSeconds();
        return _lpad(Math.floor((H + i + s + HOUR) / 86.4) % 1000, 3);
      },
      /**
       * 12-Hours: `1..12`
       * @return {number}
       */
      g() {
        return fmt.G() % 12 || 12;
      },
      /**
       * 24-Hours: `0..23`
       * @return {number}
       */
      G() {
        return vDate.getHours();
      },
      /**
       * 12-Hours with leading 0: `01..12`
       * @return {string}
       */
      h() {
        return _lpad(fmt.g(), 2);
      },
      /**
       * 24-Hours w/leading 0: `00..23`
       * @return {string}
       */
      H() {
        return _lpad(fmt.G(), 2);
      },
      /**
       * Minutes w/leading 0: `00..59`
       * @return {string}
       */
      i() {
        return _lpad(vDate.getMinutes(), 2);
      },
      /**
       * Seconds w/leading 0: `00..59`
       * @return {string}
       */
      s() {
        return _lpad(vDate.getSeconds(), 2);
      },
      /**
       * Microseconds: `000000-999000`
       * @return {string}
       */
      u() {
        return _lpad(vDate.getMilliseconds() * 1000, 6);
      },

      //////////////
      // TIMEZONE //
      //////////////
      /**
       * Timezone identifier: `e.g. Atlantic/Azores, ...`
       * @return {string}
       */
      e() {
        const str = /\((.*)\)/.exec(String(vDate))[1];
        return str || 'Coordinated Universal Time';
      },
      /**
       * DST observed? `0 or 1`
       * @return {number}
       */
      I() {
        const a = new Date(fmt.Y(), 0),
          c = Date.UTC(fmt.Y(), 0),
          b = new Date(fmt.Y(), 6),
          d = Date.UTC(fmt.Y(), 6);
        return a - c !== b - d ? 1 : 0;
      },
      /**
       * Difference to GMT in hour format: `e.g. +0200`
       * @return {string}
       */
      O() {
        const tzo = vDate.getTimezoneOffset(),
          a = Math.abs(tzo);
        return (tzo > 0 ? '-' : '+') + _lpad(Math.floor(a / 60) * 100 + (a % 60), 4);
      },
      /**
       * Difference to GMT with colon: `e.g. +02:00`
       * @return {string}
       */
      P() {
        const O = fmt.O();
        return O.substr(0, 3) + ':' + O.substr(3, 2);
      },
      /**
       * Timezone abbreviation: `e.g. EST, MDT, ...`
       * @return {string}
       */
      T() {
        const str = (String(vDate).match(self.tzParts) || ['']).pop().replace(self.tzClip, '');
        return str || 'UTC';
      },
      /**
       * Timezone offset in seconds: `-43200...50400`
       * @return {number}
       */
      Z() {
        return -vDate.getTimezoneOffset() * 60;
      },

      ////////////////////
      // FULL DATE TIME //
      ////////////////////
      /**
       * ISO-8601 date
       * @return {string}
       */
      c() {
        return 'Y-m-d\\TH:i:sP'.replace(backslash, doFormat);
      },
      /**
       * RFC 2822 date
       * @return {string}
       */
      r() {
        return 'D, d M Y H:i:s O'.replace(backslash, doFormat);
      },
      /**
       * Seconds since UNIX epoch
       * @return {number}
       */
      U() {
        return vDate.getTime() / 1000 || 0;
      },
    };
    return doFormat(vChar, vChar);
  }
  formatDate(vDate, vFormat) {
    const self = this,
      BACKSLASH = '\\';
    if (typeof vDate === 'string') {
      vDate = self.parseDate(vDate, vFormat);
      if (!vDate) {
        return null;
      }
    }
    if (vDate instanceof Date) {
      let vDateStr = '';
      const len = vFormat.length;
      for (let i = 0; i < len; i++) {
        const vChar = vFormat.charAt(i);
        if (vChar === 'S' || vChar === BACKSLASH) {
          continue;
        }
        if (i > 0 && vFormat.charAt(i - 1) === BACKSLASH) {
          vDateStr += vChar;
          continue;
        }
        let str = self.parseFormat(vChar, vDate);
        if (i !== len - 1 && self.intParts.test(vChar) && vFormat.charAt(i + 1) === 'S') {
          const n = parseInt(str) || 0;
          str += self.dateSettings.ordinal(n);
        }
        vDateStr += str;
      }
      return vDateStr;
    }
    return '';
  }
}
