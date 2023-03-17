import angular from 'angular';
import ngeoMiscTime, {Time} from 'ngeo/misc/Time.js';

/**
 * ngeo - WMS time service
 * @ngdoc service
 * @ngname ngeoWMSTime
 * @hidden
 */
export class WMSTime extends Time {
  /**
   * @param {angular.IFilterService} $filter angular filter service.
   * @param {!angular.gettext.gettextCatalog} gettextCatalog service.
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
     * @type {!angular.gettext.gettextCatalog}
     * @private
     */
    this.gettextCatalog_ = gettextCatalog;
  }

  /**
   * Format time regarding a resolution
   * @param  {number} time (in ms format) timestamp to format
   * @param  {import('ngeo/datasource/OGC.js').TimePropertyResolutionEnum|undefined} resolution resolution to
   *    use.
   * @param  {boolean=} opt_useISOFormat True to a ISO-8601 date string that can be used
   *     as a WMS-T Parameter. Otherwise, use a localized date format.
   * @param  {boolean=} opt_toUTC to get the UTC date
   * @return {string} Date string regarding the resolution.
   */
  formatTimeValue(time, resolution, opt_useISOFormat, opt_toUTC) {
    const date = new Date(time);
    const utc = opt_toUTC ? 'UTC' : undefined;

    // ISO-8601 format to use date as a WMS-T Parameter.
    let yearResolution = 'yyyy';
    let monthResolution = 'yyyy-MM';
    let dayResolution = 'yyyy-MM-dd';
    let secondResolution = undefined;

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
   * @param  {import('ngeo/datasource/OGC.js').TimeProperty} wmsTimeProperty a wmstime property from a node
   * @param  {import('ngeo/datasource/OGC.js').TimeRange} times start & end time selected (in ms format)
   * @param  {boolean=} opt_toUTC to get the UTC date
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
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoWMSTime', [ngeoMiscTime.name]);
module.service('ngeoWMSTime', WMSTime);

export default module;
