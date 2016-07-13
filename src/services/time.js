goog.provide('ngeo.Time');

goog.require('ngeo');

/**
 * ngeo - Time service
 * @constructor
 * @ngInject
 * @ngdoc service
 * @ngname ngeoTime
 */
ngeo.Time  = function() {

};


/**
 * Get options regarding the time property of a node;
 *
 * @param {ngeox.TimeProperty} time the time property of a node
 * @return {{
 *  minDate : number,
 *  maxDate : number,
 *  values : (Array<number>|number)
 * }} - Configuration for the UI components
 * @export
 */
ngeo.Time.prototype.getOptions = function(time) {

  var minDate = new Date(time.minValue);
  var maxDate = new Date(time.maxValue);

  var minDefaultDate = (time.minDefValue) ?
      new Date(time.minDefValue) : minDate;
  var maxDefaultDate = (time.maxDefValue) ?
      new Date(time.maxDefValue) : maxDate;

  var defaultValues = (time.mode === 'range') ?
      [minDefaultDate.getTime(), maxDefaultDate.getTime()] :
      minDefaultDate.getTime();

  return {
    minDate: minDate.getTime(),
    maxDate: maxDate.getTime(),
    values: defaultValues
  };
};


/**
 * Time.prototype.getUTCDate - Get UTC date from a local date object
 *
 * @param  {Object} localDate loacl date object in
 * @return {Object} UTC date
 * @export
 */
ngeo.Time.prototype.getUTCDate = function(localDate) {
  return new Date(
    localDate.getUTCFullYear(),
    localDate.getUTCMonth(),
    localDate.getUTCDate());
};


ngeo.module.service('ngeoTime', ngeo.Time);
