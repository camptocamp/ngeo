import angular from 'angular';

/**
 * ngeo - Time service
 * @constructor
 * @ngInject
 * @ngdoc service
 * @ngname ngeoTime
 * @hidden
 */
export function Time() {}

/**
 * @param {number|string|null} value The value
 * @param {Date} defaultValue The default value
 * @return {Date} the date
 */
Time.prototype.createDate = function (value, defaultValue = null) {
  return value !== null ? new Date(value) : defaultValue;
};

/**
 * @param {Date} date The date
 * @param {number|null=} defaultValue The default value
 * @return {number|null} the time
 */
Time.prototype.getTime = function (date, defaultValue = null) {
  return date ? date.getTime() : defaultValue;
};

/**
 * Get options regarding the time property of a node;
 *
 * @param {import('ngeo/datasource/OGC.js').TimeProperty} time the time property of a node
 * @return {{
 *  minDate : number,
 *  maxDate : number,
 *  values : (Array<number>|number)
 * }} - Configuration for the UI components
 */
Time.prototype.getOptions = function (time) {
  const minDate = this.createDate(time.minValue);
  const maxDate = this.createDate(time.maxValue);

  const minDefaultDate = this.createDate(time.minDefValue, minDate);
  const maxDefaultDate = this.createDate(time.maxDefValue, maxDate);

  const defaultValues =
    time.mode === 'range'
      ? [this.getTime(minDefaultDate), this.getTime(maxDefaultDate)]
      : this.getTime(minDefaultDate);

  return {
    minDate: this.getTime(minDate),
    maxDate: this.getTime(maxDate),
    values: defaultValues,
  };
};

/**
 * Time.prototype.getUTCDate - Get UTC date from a local date object
 *
 * @param  {Object} localDate loacl date object in
 * @return {Object} UTC date
 */
Time.prototype.getUTCDate = function (localDate) {
  return new Date(localDate.getUTCFullYear(), localDate.getUTCMonth(), localDate.getUTCDate());
};

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoTime', []);
module.service('ngeoTime', Time);

export default module;
