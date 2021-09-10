// The MIT License (MIT)
//
// Copyright (c) 2016-2021 Camptocamp SA
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
import ngeoMiscTime, {Time} from 'ngeo/misc/Time';

/**
 * ngeo - WMS time service
 * @ngdoc service
 * @ngname ngeoWMSTime
 * @hidden
 */
export class WMSTime extends Time {
  /**
   * @param {angular.IFilterService} $filter angular filter service.
   * @param {angular.gettext.gettextCatalog} gettextCatalog service.
   * @ngInject
   */
  constructor($filter, gettextCatalog) {
    super();

    /**
     * @private
     * @type {angular.IFilterService}
     */
    this.$filter_ = $filter;

    /**
     * @type {angular.gettext.gettextCatalog}
     * @private
     */
    this.gettextCatalog_ = gettextCatalog;
  }

  /**
   * Format time regarding a resolution
   * @param  {number} time (in ms format) timestamp to format
   * @param  {import('ngeo/datasource/OGC').TimePropertyResolutionEnum|undefined} resolution resolution to
   *    use.
   * @param  {boolean} [opt_useISOFormat] True to a ISO-8601 date string that can be used
   *     as a WMS-T Parameter. Otherwise, use a localized date format.
   * @param  {boolean} [opt_toUTC] to get the UTC date
   * @return {string} Date string regarding the resolution.
   */
  formatTimeValue(time, resolution, opt_useISOFormat, opt_toUTC) {
    const date = new Date(time);
    const utc = opt_toUTC ? 'UTC' : undefined;

    // ISO-8601 format to use date as a WMS-T Parameter.
    let yearResolution = 'yyyy';
    let monthResolution = 'yyyy-MM';
    let dayResolution = 'yyyy-MM-dd';
    /** @type {?string} */
    let secondResolution = null;

    // Localized format.
    if (!opt_useISOFormat) {
      const gettextCatalog = this.gettextCatalog_;
      yearResolution = gettextCatalog.getString('yyyy');
      monthResolution = gettextCatalog.getString('M/yyyy');
      dayResolution = gettextCatalog.getString('M/d/yyyy');
      secondResolution = gettextCatalog.getString('M/d/yyyy HH:MM:ss');
    }

    switch (resolution) {
      case 'year':
        return this.$filter_('date')(date, yearResolution, utc);
      case 'month':
        return this.$filter_('date')(date, monthResolution, utc);
      case 'day':
        return this.$filter_('date')(date, dayResolution, utc);
      case 'second':
        if (secondResolution) {
          return this.$filter_('date')(date, secondResolution, utc);
        } else {
          return date.toISOString().replace(/\.\d{3}/, '');
        }
      default:
        //case "second":
        return date.toISOString().replace(/\.\d{3}/, '');
    }
  }

  /**
   * Format time to be used as a WMS Time query parameter
   * @param  {import('ngeo/datasource/OGC').TimeProperty} wmsTimeProperty a wmstime property from a node
   * @param  {import('ngeo/datasource/OGC').TimeRange} times start & end time selected (in ms format)
   * @param  {boolean} [opt_toUTC] to get the UTC date
   * @return {string} ISO-8601 date string ready to be used as a query parameter for a
   * WMS request
   */
  formatWMSTimeParam(wmsTimeProperty, times, opt_toUTC) {
    console.assert(wmsTimeProperty.resolution !== undefined);
    if (wmsTimeProperty.mode === 'range') {
      console.assert(times.end !== undefined);
      return `${this.formatTimeValue(
        times.start,
        wmsTimeProperty.resolution,
        true,
        opt_toUTC
      )}/${this.formatTimeValue(times.end, wmsTimeProperty.resolution, true, opt_toUTC)}`;
    } else {
      return this.formatTimeValue(times.start, wmsTimeProperty.resolution, true, opt_toUTC);
    }
  }
}

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('ngeoWMSTime', [ngeoMiscTime.name]);
myModule.service('ngeoWMSTime', WMSTime);

export default myModule;
