goog.provide('ngeo.WMSTime');

goog.require('ngeo');
goog.require('ngeo.Time');
goog.require('goog.asserts');


/**
 * ngeo - WMS time service
 * @extends {ngeo.Time}
 * @param {angular.$filter} $filter angular filter service.
 * @param {!angularGettext.Catalog} gettextCatalog service.
 * @constructor
 * @struct
 * @ngInject
 * @ngdoc service
 * @ngname ngeoWMSTime
 */
ngeo.WMSTime  = function($filter, gettextCatalog) {

  /**
   * @private
   * @type {angular.$filter}
   */
  this.$filter_ = $filter;

  /**
   * @type {!angularGettext.Catalog}
   * @private
   */
  this.gettextCatalog_ = gettextCatalog;

  ngeo.Time.call(this);
};
ol.inherits(ngeo.WMSTime, ngeo.Time);


/**
 * Format time regarding a resolution
 * @param  {number} time (in ms format) timestamp to format
 * @param  {(ngeox.TimePropertyResolutionEnum|undefined)} resolution resolution to use
 * @param  {boolean=} opt_useISOFormat True to a ISO-8601 date string that can be used
 *     as a WMS-T Parameter. Otherwise, use a localized date format.
 * @param  {boolean=} opt_toUTC to get the UTC date
 * @return {string} Date string regarding the resolution.
 */
ngeo.WMSTime.prototype.formatTimeValue = function(time, resolution, opt_useISOFormat, opt_toUTC) {
  const date = new Date(time);
  const utc = opt_toUTC ? 'UTC' : undefined;

  // ISO-8601 format to use date as a WMS-T Parameter.
  let yearResolution = 'yyyy';
  let monthResolution = 'yyyy-MM';
  let dayResolution = 'yyyy-MM-dd';

  // Localized format.
  if (!opt_useISOFormat) {
    const gettextCatalog = this.gettextCatalog_;
    yearResolution = gettextCatalog.getString('yyyy');
    monthResolution = gettextCatalog.getString('M/yyyy');
    dayResolution = gettextCatalog.getString('M/d/yyyy');
  }

  switch (resolution) {
    case 'year':
      return this.$filter_('date')(date, yearResolution, utc);
    case 'month':
      return this.$filter_('date')(date, monthResolution, utc);
    case 'day':
      return this.$filter_('date')(date, dayResolution, utc);
    default:
      //case "second":
      return date.toISOString().replace(/\.\d{3}/, '');
  }
};


/**
 * Format time to be used as a WMS Time query parameter
 * @param  {ngeox.TimeProperty} wmsTimeProperty a wmstime property from a node
 * @param  {{start : number, end : (number|undefined)}} times start & end time selected (in ms format)
 * @param  {boolean=} opt_toUTC to get the UTC date
 * @return {string} ISO-8601 date string ready to be used as a query parameter for a
 * WMS request
 * @export
 */
ngeo.WMSTime.prototype.formatWMSTimeParam = function(wmsTimeProperty, times, opt_toUTC) {
  goog.asserts.assert(wmsTimeProperty.resolution !== undefined);
  if (wmsTimeProperty.mode === 'range') {
    goog.asserts.assert(times.end !== undefined);
    return (
      `${this.formatTimeValue(times.start, wmsTimeProperty.resolution, true, opt_toUTC)}/${
        this.formatTimeValue(times.end, wmsTimeProperty.resolution, true, opt_toUTC)}`
    );
  } else {
    return this.formatTimeValue(times.start, wmsTimeProperty.resolution, true, opt_toUTC);
  }
};


ngeo.module.service('ngeoWMSTime', ngeo.WMSTime);
