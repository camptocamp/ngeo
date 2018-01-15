goog.provide('gmfapp.timeslider');

// webpack: import './timeslider.css';
// webpack: import './common_dependencies.js';
goog.require('gmf');
goog.require('gmf.layertree.timeSliderComponent');
goog.require('ngeo.misc.WMSTime');


/** @type {!angular.Module} **/
gmfapp.timeslider.module = angular.module('gmfapp', [
  gmf.module.name,
  gmf.layertree.timeSliderComponent.name,
  ngeo.misc.WMSTime.module.name,
]);

gmfapp.timeslider.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');


/**
 * @constructor
 * @param {!angular.Scope} $scope Angular scope.
 * @param {!ngeo.misc.WMSTime} ngeoWMSTime wmstime service.
 * @ngInject
 */
gmfapp.timeslider.MainController = function($scope, ngeoWMSTime) {

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
    widget: /** @type {ngeox.TimePropertyWidgetEnum} */ ('slider'),
    maxValue: '2013-12-31T00:00:00Z',
    minValue: '2006-01-01T00:00:00Z',
    maxDefValue: null,
    minDefValue: null,
    resolution: /** @type {ngeox.TimePropertyResolutionEnum}*/ ('day'),
    mode: /** @type {ngeox.TimePropertyModeEnum} */('range'),
    interval: [0, 1, 0, 0]
  };

  /**
   * @type {ngeox.TimeProperty}
   * @export
   */
  this.wmsTimeValueMode = {
    widget: /** @type {ngeox.TimePropertyWidgetEnum} */ ('slider'),
    maxValue: '2015-12-31T00:00:00Z',
    minValue: '2014-01-01T00:00:00Z',
    maxDefValue: null,
    minDefValue: null,
    resolution: /** @type {ngeox.TimePropertyResolutionEnum}*/ ('year'),
    mode: /** @type {ngeox.TimePropertyModeEnum} */ ('value'),
    interval: [0, 0, 1, 0]
  };

  /**
   * @type {string}
   * @export
   */
  this.sliderValue;

  /**
   * @type {string}
   * @export
   */
  this.sliderRangeValue;

  this.onDateSelected = function(date) {
    this.sliderValue = this.ngeoWMSTime_.formatWMSTimeParam(this.wmsTimeValueMode, date);
    $scope.$digest();
  };

  this.onDateRangeSelected = function(date) {
    this.sliderRangeValue = this.ngeoWMSTime_.formatWMSTimeParam(this.wmsTimeRangeMode, date);
    $scope.$digest();
  };

};


gmfapp.timeslider.module.controller('MainController', gmfapp.timeslider.MainController);
