/**
 */
const exports = {};

import './timeslider.css';
import angular from 'angular';
import gmfLayertreeTimeSliderComponent from 'gmf/layertree/timeSliderComponent.js';

import ngeoMiscWMSTime from 'ngeo/misc/WMSTime.js';
import {TimePropertyWidgetEnum, TimePropertyResolutionEnum, TimePropertyModeEnum} from 'ngeo/datasource/OGC.js';


/** @type {!angular.IModule} **/
exports.module = angular.module('gmfapp', [
  'gettext',
  gmfLayertreeTimeSliderComponent.name,
  ngeoMiscWMSTime.name,
]);

exports.module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');


/**
 * @constructor
 * @param {!angular.IScope} $scope Angular scope.
 * @param {!import("ngeo/misc/WMSTime.js").default} ngeoWMSTime wmstime service.
 * @ngInject
 */
exports.MainController = function($scope, ngeoWMSTime) {

  /**
   * @type {import("ngeo/misc/WMSTime.js").default}
   * @private
   */
  this.ngeoWMSTime_ = ngeoWMSTime;

  /**
   * @type {TimeProperty}
   * @export
   */
  this.wmsTimeRangeMode = {
    widget: TimePropertyWidgetEnum.SLIDER,
    maxValue: '2013-12-31T00:00:00Z',
    minValue: '2006-01-01T00:00:00Z',
    maxDefValue: null,
    minDefValue: null,
    resolution: TimePropertyResolutionEnum.DAY,
    mode: TimePropertyModeEnum.RANGE,
    interval: [0, 1, 0, 0]
  };

  /**
   * @type {TimeProperty}
   * @export
   */
  this.wmsTimeValueMode = {
    widget: TimePropertyWidgetEnum.SLIDER,
    maxValue: '2015-12-31T00:00:00Z',
    minValue: '2014-01-01T00:00:00Z',
    maxDefValue: null,
    minDefValue: null,
    resolution: TimePropertyResolutionEnum.YEAR,
    mode: TimePropertyModeEnum.VALUE,
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


exports.module.controller('MainController', exports.MainController);


export default exports;
