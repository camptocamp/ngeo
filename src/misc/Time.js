goog.provide('ngeo.misc.Time');

goog.require('ngeo');

/**
 * ngeo - Time service
 * @constructor
 * @struct
 * @ngInject
 * @ngdoc service
 * @ngname ngeoTime
 */
ngeo.misc.Time  = function() {};


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
ngeo.misc.Time.prototype.getOptions = function(time) {

  const minDate = new Date(time.minValue);
  const maxDate = new Date(time.maxValue);

  const minDefaultDate = (time.minDefValue) ?
    new Date(time.minDefValue) : minDate;
  const maxDefaultDate = (time.maxDefValue) ?
    new Date(time.maxDefValue) : maxDate;

  const defaultValues = (time.mode === 'range') ?
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
ngeo.misc.Time.prototype.getUTCDate = function(localDate) {
  return new Date(
    localDate.getUTCFullYear(),
    localDate.getUTCMonth(),
    localDate.getUTCDate());
};


/**
 * @type {!angular.Module}
 */
ngeo.misc.Time.module = angular.module('ngeoTime', []);
ngeo.misc.Time.module.service('ngeoTime', ngeo.misc.Time);
