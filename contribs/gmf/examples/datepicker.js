goog.provide('gmfapp.datepicker');

/** @suppress {extraRequire} */
goog.require('ngeo.DatePickerDirective');
goog.require('gmf.WMSTime');


/** @type {!angular.Module} **/
gmfapp.module = angular.module('gmfapp', ['gmf']);


/**
 * @constructor
 * @param {!angular.Scope} $scope Angular scope.
 * @param {!gmf.WMSTime} gmfWMSTime wmstime service.
 * @ngInject
 */
gmfapp.MainController = function($scope, gmfWMSTime) {

  /**
   * @type {gmf.WMSTime}
   * @private
   */
  this.gmfWMSTime_ = gmfWMSTime;

  /**
   * @type {ngeox.TimeProperty}
   * @export
   */
  this.wmsTimeRangeMode = {
    widget: /** @type {ngeox.TimePropertyWidgetEnum} */ ('datepicker'),
    maxValue: '2013-12-31T00:00:00Z',
    minValue: '2006-01-01T00:00:00Z',
    maxDefValue: null,
    minDefValue: null,
    resolution: /** @type {ngeox.TimePropertyResolutionEnum}*/ ('day'),
    mode: /** @type {ngeox.TimePropertyModeEnum} */ ('range'),
    interval : [0,1,0,0]
  };

  /**
   * @type {ngeox.TimeProperty}
   * @export
   */
  this.wmsTimeValueMode = {
    widget: /** @type {ngeox.TimePropertyWidgetEnum} */ ('datepicker'),
    maxValue: '2015-12-31T00:00:00Z',
    minValue: '2014-01-01T00:00:00Z',
    maxDefValue: null,
    minDefValue: null,
    resolution: /** @type {ngeox.TimePropertyResolutionEnum}*/ ('month'),
    mode: /** @type {ngeox.TimePropertyModeEnum} */ ('value'),
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


gmfapp.module.controller('MainController', gmfapp.MainController);
