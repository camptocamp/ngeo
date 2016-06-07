goog.provide('gmf.WMSTime');

goog.require('gmf');
goog.require('goog.asserts');

/**
 * gmf - description
 * @param {angular.$filter} $filter angular filter service.
 * @constructor
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

};


/**
 * Get options for wms components regarding  the time property of a node;
 * @param {gmfx.TimeProperty} wmsTime the time property of a node
 * @return {{
 *  minDate : number,
 *  maxDate : number,
 *  values : (Array<number>|number)
 * }} - Configuration for the UI components
 * @export
 */
gmf.WMSTime.prototype.getOptions = function(wmsTime) {

  var minDate = new Date(wmsTime.minValue);
  var maxDate = new Date(wmsTime.maxValue);

  var minDefaultDate = (wmsTime.minDefValue) ?
      new Date(wmsTime.minDefValue) : minDate;
  var maxDefaultDate = (wmsTime.maxDefValue) ?
      new Date(wmsTime.maxDefValue) : maxDate;

  var defaultValues = (wmsTime.mode === 'range') ?
      [minDefaultDate.getTime(), maxDefaultDate.getTime()] :
      minDefaultDate.getTime();

  return {
    minDate: minDate.getTime(),
    maxDate: maxDate.getTime(),
    values: defaultValues
  };
};


/**
 * gmfWMSTime.prototype.formatWMSTimeValue_ - Format time regarding a
 * resolution
 *
 * @param  {number} time (in ms format) timestamp to format
 * @param  {gmfx.TimePropertyResolutionEnum} resolution resolution to use
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
 * @param  {gmfx.TimeProperty} wmsTimeProperty a wmstime property from a node
 * @param  {{start : number, end : (number|undefined)}} times start & end time selected (in ms format)
 * @param  {boolean=} opt_toUTC to get the UTC date
 * @return {string} ISO-8601 date string ready to be used as a query parameter for a
 * WMS request
 * @export
 */
gmf.WMSTime.prototype.formatWMSTimeParam = function(wmsTimeProperty, times, opt_toUTC) {
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


/**
 * WMSTime.prototype.getUTCDate - Get UTC date from a local date object
 *
 * @param  {Object} localDate loacl date object in
 * @return {Object} UTC date
 * @export
 */
gmf.WMSTime.prototype.getUTCDate = function(localDate) {
  return new Date(
    localDate.getUTCFullYear(),
    localDate.getUTCMonth(),
    localDate.getUTCDate());
};


gmf.module.service('gmfWMSTime', gmf.WMSTime);
