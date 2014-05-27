

/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['gmf']);


/**
 * @constructor
 * @param {!angular.Scope} $scope Angular scope.
 * @ngInject
 */
app.MainController = function($scope) {

  /**
   * @type {Object}
   * @export
   */
  this.datePickerRange = {
    widget: 'datepicker',
    maxValue: '2013-12-31T00:00:00Z',
    minValue: '2006-01-01T00:00:00Z',
    maxDefValue: null,
    minDefValue: null,
    resolution: 'day',
    mode: 'range'
  };

  /**
   * @type {Object}
   * @export
   */
  this.datePicker = {
    widget: 'datepicker',
    maxValue: '2015-12-31T00:00:00Z',
    minValue: '2014-01-01T00:00:00Z',
    maxDefValue: null,
    minDefValue: null,
    resolution: 'day',
    mode: 'single'
  };

  /**
   * @type {Object}
   * @export
   */
  this.value = {};

  /**
   * @type {Object}
   * @export
   */
  this.rangeValue = {};

  this.onDateSelected = function(date) {
    this.value = date;
  };

  this.onDateRangeSelected = function(date) {
    this.rangeValue = date;
  };

};


app.module.controller('MainController', app.MainController);
