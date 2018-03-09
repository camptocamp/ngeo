goog.provide('app.datetimepicker');

// webpack: import './datetimepicker.css';
goog.require('ngeo.misc.datetimepickerComponent');


/** @type {!angular.Module} **/
app.datetimepicker.module = angular.module('app', [
  'gettext',
  ngeo.misc.datetimepickerComponent.name,
]);


/**
 * @constructor
 * @ngInject
 */
app.datetimepicker.MainController = function() {

  /**
   * @type {string}
   * @private
   */
  this.date = '2018-01-01';

  /**
   * @type {string}
   * @private
   */
  this.time = '12:00:00';

  /**
   * @type {string}
   * @private
   */
  this.datetime = '2018-01-01 12:00:00';

};


app.datetimepicker.module.controller('MainController', app.datetimepicker.MainController);
