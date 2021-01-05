// The MIT License (MIT)
//
// Copyright (c) 2016-2021 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import './timeslider.css';
import angular from 'angular';
import gmfLayertreeTimeSliderComponent from 'gmf/layertree/timeSliderComponent.js';

import ngeoMiscWMSTime from 'ngeo/misc/WMSTime.js';
import {
  TimePropertyWidgetEnum,
  TimePropertyResolutionEnum,
  TimePropertyModeEnum,
} from 'ngeo/datasource/OGC.js';

/** @type {angular.IModule} **/
const module = angular.module('gmfapp', [
  'gettext',
  gmfLayertreeTimeSliderComponent.name,
  ngeoMiscWMSTime.name,
]);

module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');

/**
 * @constructor
 * @param {angular.IScope} $scope Angular scope.
 * @param {import("ngeo/misc/WMSTime.js").WMSTime} ngeoWMSTime wmstime service.
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
    resolution: TimePropertyResolutionEnum.YEAR,
    mode: TimePropertyModeEnum.VALUE,
    interval: [0, 0, 1, 0],
  };

  /**
   * @type {string}
   */
  this.sliderValue = '';

  /**
   * @type {string}
   */
  this.sliderRangeValue = '';

  /**
   * @param {import('ngeo/datasource/OGC.js').TimeRange} date
   */
  this.onDateSelected = function (date) {
    this.sliderValue = this.ngeoWMSTime_.formatWMSTimeParam(this.wmsTimeValueMode, date);
    $scope.$digest();
  };

  /**
   * @param {import('ngeo/datasource/OGC.js').TimeRange} date
   */
  this.onDateRangeSelected = function (date) {
    this.sliderRangeValue = this.ngeoWMSTime_.formatWMSTimeParam(this.wmsTimeRangeMode, date);
    $scope.$digest();
  };
}

module.controller('MainController', MainController);

export default module;
