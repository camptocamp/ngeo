goog.provide('ngeo.Time');

goog.require('ngeo');

/**
 * ngeo - Time service
 * @constructor
 * @struct
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
ngeo.Time.prototype.getUTCDate = function(localDate) {
  return new Date(
    localDate.getUTCFullYear(),
    localDate.getUTCMonth(),
    localDate.getUTCDate());
};


ngeo.module.service('ngeoTime', ngeo.Time);
