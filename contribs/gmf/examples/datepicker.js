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

import angular from 'angular';
import './datepicker.css';
import ngeoMiscDatepickerComponent from 'ngeo/misc/datepickerComponent.js';

import ngeoMiscWMSTime from 'ngeo/misc/WMSTime.js';
import {
  TimePropertyWidgetEnum,
  TimePropertyResolutionEnum,
  TimePropertyModeEnum,
} from 'ngeo/datasource/OGC.js';
import options from './options.js';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfapp', [
  'gettext',
  ngeoMiscDatepickerComponent.name,
  ngeoMiscWMSTime.name,
]);

/**
 * @class
 * @param {import("ngeo/misc/WMSTime.js").WMSTime} ngeoWMSTime wmstime service.
 * @ngInject
 */
function MainController(ngeoWMSTime) {
  /**
   * @type {import("ngeo/misc/WMSTime.js").WMSTime}
   */
  this.ngeoWMSTime_ = ngeoWMSTime;

  /**
   * @type {import('ngeo/datasource/OGC.js').TimeProperty}
   */
  this.wmsTimeRangeMode = {
    widget: TimePropertyWidgetEnum.DATEPICKER,
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
    widget: /** @type {TimePropertyWidgetEnum} */ ('datepicker'),
    maxValue: '2015-12-31T00:00:00Z',
    minValue: '2014-01-01T00:00:00Z',
    resolution: /** @type {TimePropertyResolutionEnum}*/ ('month'),
    mode: /** @type {TimePropertyModeEnum} */ ('value'),
    interval: [0, 1, 0, 0],
  };

  /**
   * @type {string}
   */
  this.value = '';

  /**
   * @type {string}
   */
  this.rangeValue = '';

  /**
   * @param {import('ngeo/datasource/OGC.js').TimeRange} date
   * @this {MainController}
   */
  this.onDateSelected = function (date) {
    this.value = this.ngeoWMSTime_.formatWMSTimeParam(this.wmsTimeValueMode, date);
  };

  /**
   * @param {import('ngeo/datasource/OGC.js').TimeRange} date
   * @this {MainController}
   */
  this.onDateRangeSelected = function (date) {
    this.rangeValue = this.ngeoWMSTime_.formatWMSTimeParam(this.wmsTimeRangeMode, date);
  };
}

myModule.controller('MainController', MainController);
options(myModule);

export default myModule;
