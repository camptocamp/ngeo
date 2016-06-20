goog.provide('gmf-timeslider');

goog.require('gmf.TimeSliderDirective');

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
   * @type {gmfx.TimeProperty}
   * @export
   */
  this.sliderRange = {
    widget: /** @type {gmfx.TimePropertyWidgetEnum} */ ('slider'),
    maxValue: '2013-12-31T00:00:00Z',
    minValue: '2006-01-01T00:00:00Z',
    maxDefValue: null,
    minDefValue: null,
    resolution: 'day',
    mode: /** @type {gmfx.TimePropertyModeEnum} */('range')
  };

  /**
   * @type {gmfx.TimeProperty}
   * @export
   */
  this.slider = {
    widget: /** @type {gmfx.TimePropertyWidgetEnum} */ ('slider'),
    maxValue: '2015-12-31T00:00:00Z',
    minValue: '2014-01-01T00:00:00Z',
    maxDefValue: null,
    minDefValue: null,
    resolution: 'day',
    mode: /** @type {gmfx.TimePropertyModeEnum} */ ('single')
  };

  /**
   * @type {Object}
   * @export
   */
  this.sliderValue = {};

  /**
   * @type {Object}
   * @export
   */
  this.sliderRangeValue = {};

  this.onDateSelected = function(date) {
    this.sliderValue = date;
    $scope.$digest();
  };

  this.onDateRangeSelected = function(date) {
    this.sliderRangeValue = date;
    $scope.$digest();
  };

};


app.module.controller('MainController', app.MainController);
