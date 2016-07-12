goog.provide('gmf-timeselector');

goog.require('gmf.DatePickerDirective');
goog.require('gmf.WMSTime');
goog.require('goog.asserts');

/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['gmf']);


/**
 * @constructor
 * @param {!angular.Scope} $scope Angular scope.
 * @param {!gmf.WMSTime} gmfWMSTime wmstime service.
 * @ngInject
 */
app.MainController = function($scope, gmfWMSTime) {

  /**
   * @type {gmf.WMSTime}
   * @private
   */
  this.gmfWMSTime_ = gmfWMSTime;

  /**
   * @type {gmfx.TimeProperty}
   * @export
   */
  this.wmsTimeRangeMode = {
    widget: /** @type {gmfx.TimePropertyWidgetEnum} */ ('datepicker'),
    maxValue: '2013-12-31T00:00:00Z',
    minValue: '2006-01-01T00:00:00Z',
    maxDefValue: null,
    minDefValue: null,
    resolution: /** @type {gmfx.TimePropertyResolutionEnum}*/ ('day'),
    mode: /** @type {gmfx.TimePropertyModeEnum} */ ('range'),
    interval : [0,1,0,0]
  };

  /**
   * @type {gmfx.TimeProperty}
   * @export
   */
  this.wmsTimeValueMode = {
    widget: /** @type {gmfx.TimePropertyWidgetEnum} */ ('datepicker'),
    maxValue: '2015-12-31T00:00:00Z',
    minValue: '2014-01-01T00:00:00Z',
    maxDefValue: null,
    minDefValue: null,
    resolution: /** @type {gmfx.TimePropertyResolutionEnum}*/ ('month'),
    mode: /** @type {gmfx.TimePropertyModeEnum} */ ('value'),
    interval : [0,1,0,0]
  };

  /**
   * @type {string}
   * @export
   */
  this.value;

  /**
   * @type {string}
   * @export
   */
  this.rangeValue;

  this.onDateSelected = function(date) {
    this.value = this.gmfWMSTime_.formatWMSTimeParam(this.wmsTimeValueMode, date);
  };

  this.onDateRangeSelected = function(date) {
    this.rangeValue = this.gmfWMSTime_.formatWMSTimeParam(this.wmsTimeRangeMode, date);
  };

};


app.module.controller('MainController', app.MainController);
