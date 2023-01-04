import './timeslider.css';
import angular from 'angular';
import gmfLayertreeTimeSliderComponent from 'gmf/layertree/timeSliderComponent.js';

import ngeoMiscWMSTime from 'ngeo/misc/WMSTime.js';
import {
  TimePropertyWidgetEnum,
  TimePropertyResolutionEnum,
  TimePropertyModeEnum,
} from 'ngeo/datasource/OGC.js';

/** @type {!angular.IModule} **/
const module = angular.module('gmfapp', [
  'gettext',
  gmfLayertreeTimeSliderComponent.name,
  ngeoMiscWMSTime.name,
]);

module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');

/**
 * @constructor
 * @param {!angular.IScope} $scope Angular scope.
 * @param {!import("ngeo/misc/WMSTime.js").WMSTime} ngeoWMSTime wmstime service.
 * @ngInject
 */
function MainController($scope, ngeoWMSTime) {
  /**
   * @type {import("ngeo/misc/WMSTime.js").WMSTime}
   * @private
   */
  this.ngeoWMSTime_ = ngeoWMSTime;

  /**
   * @type {import('ngeo/datasource/OGC.js').TimeProperty}
   */
  this.wmsTimeRangeMode = {
    widget: TimePropertyWidgetEnum.SLIDER,
    maxValue: '2013-12-31T00:00:00Z',
    minValue: '2006-01-01T00:00:00Z',
    maxDefValue: null,
    minDefValue: null,
    resolution: TimePropertyResolutionEnum.DAY,
    mode: TimePropertyModeEnum.RANGE,
    interval: [0, 1, 0, 0],
  };

  /**
   * @type {import('ngeo/datasource/OGC.js').TimeProperty}
   */
  this.wmsTimeValueMode = {
    widget: TimePropertyWidgetEnum.SLIDER,
    maxValue: '2015-12-31T00:00:00Z',
    minValue: '2014-01-01T00:00:00Z',
    maxDefValue: null,
    minDefValue: null,
    resolution: TimePropertyResolutionEnum.YEAR,
    mode: TimePropertyModeEnum.VALUE,
    interval: [0, 0, 1, 0],
  };

  /**
   * @type {string}
   */
  this.sliderValue;

  /**
   * @type {string}
   */
  this.sliderRangeValue;

  this.onDateSelected = function (date) {
    this.sliderValue = this.ngeoWMSTime_.formatWMSTimeParam(this.wmsTimeValueMode, date);
    $scope.$digest();
  };

  this.onDateRangeSelected = function (date) {
    this.sliderRangeValue = this.ngeoWMSTime_.formatWMSTimeParam(this.wmsTimeRangeMode, date);
    $scope.$digest();
  };
}

module.controller('MainController', MainController);

export default module;
