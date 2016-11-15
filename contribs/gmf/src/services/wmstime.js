goog.provide('gmf.WMSTime');

goog.require('gmf');
goog.require('ngeo.Time');
goog.require('goog.asserts');


/**
 * gmf - WMS time service
 * @extends {ngeo.Time}
 * @param {angular.$filter} $filter angular filter service.
 * @constructor
 * @struct
 * @ngInject
 * @ngdoc service
 * @ngname gmfWMSTime
 */
gmf.WMSTime  = function($filter) {

  /**
   * @private
   * @type {angular.$filter}
   */
  this.$filter_ = $filter;

  ngeo.Time.call(this);
};
ol.inherits(gmf.WMSTime, ngeo.Time);


/**
 * gmfWMSTime.prototype.formatWMSTimeValue_ - Format time regarding a
 * resolution
 *
 * @param  {number} time (in ms format) timestamp to format
 * @param  {ngeox.TimePropertyResolutionEnum} resolution resolution to use
 * @param  {boolean=} opt_toUTC to get the UTC date
 * @return {string} ISO-8601 date string regarding the resolution
 * @private
 */
gmf.WMSTime.prototype.formatWMSTimeValue_ = function(time, resolution, opt_toUTC) {
  var date = new Date(time);
  var utc = opt_toUTC ? 'UTC' : undefined;
  switch (resolution) {
    case 'year':
      return this.$filter_('date')(date, 'yyyy', utc);
    case 'month':
      return this.$filter_('date')(date, 'yyyy-MM', utc);
    case 'day':
      return this.$filter_('date')(date, 'yyyy-MM-dd', utc);
    default:
      //case "second":
      return date.toISOString().replace(/\.\d{3}/, '');
  }
};


/**
 * gmfWMSTime.prototype.formatWMSTimeParam - Format time to be used as a
 * WMS Time query parameter
 *
 * @param  {ngeox.TimeProperty} wmsTimeProperty a wmstime property from a node
 * @param  {{start : number, end : (number|undefined)}} times start & end time selected (in ms format)
 * @param  {boolean=} opt_toUTC to get the UTC date
 * @return {string} ISO-8601 date string ready to be used as a query parameter for a
 * WMS request
 * @export
 */
gmf.WMSTime.prototype.formatWMSTimeParam = function(wmsTimeProperty, times, opt_toUTC) {
  goog.asserts.assert(wmsTimeProperty.resolution !== undefined);
  if (wmsTimeProperty.mode === 'range') {
    goog.asserts.assert(times.end !== undefined);
    return (
      this.formatWMSTimeValue_(times.start, wmsTimeProperty.resolution, opt_toUTC) + '/' +
      this.formatWMSTimeValue_(times.end, wmsTimeProperty.resolution, opt_toUTC)
    );
  } else {
    return this.formatWMSTimeValue_(times.start, wmsTimeProperty.resolution, opt_toUTC);
  }
};


gmf.module.service('gmfWMSTime', gmf.WMSTime);
