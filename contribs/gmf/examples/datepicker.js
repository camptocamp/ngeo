goog.provide('gmfapp.datepicker');

// webpack: import './datepicker.css';
// webpack: import './common_dependencies.js';
goog.require('gmf');
goog.require('ngeo.misc.datepickerComponent');
goog.require('ngeo.misc.WMSTime');


/** @type {!angular.Module} **/
gmfapp.datepicker.module = angular.module('gmfapp', [
  gmf.module.name,
  ngeo.misc.datepickerComponent.name,
  ngeo.misc.WMSTime.module.name,
]);

gmfapp.datepicker.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');


/**
 * @constructor
 * @param {!angular.Scope} $scope Angular scope.
 * @param {!ngeo.misc.WMSTime} ngeoWMSTime wmstime service.
 * @ngInject
 */
gmfapp.datepicker.MainController = function($scope, ngeoWMSTime) {

  /**
   * @type {ngeo.misc.WMSTime}
   * @private
   */
  this.ngeoWMSTime_ = ngeoWMSTime;

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
    interval: [0, 1, 0, 0]
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
    interval: [0, 1, 0, 0]
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
    this.value = this.ngeoWMSTime_.formatWMSTimeParam(this.wmsTimeValueMode, date);
  };

  this.onDateRangeSelected = function(date) {
    this.rangeValue = this.ngeoWMSTime_.formatWMSTimeParam(this.wmsTimeRangeMode, date);
  };

};


gmfapp.datepicker.module.controller('MainController', gmfapp.datepicker.MainController);
