// The MIT License (MIT)
//
// Copyright (c) 2016-2025 Camptocamp SA
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

import './datepicker.scss';

import angular from 'angular';
import ngeoMiscDatetimepickerComponent from 'ngeo/misc/datetimepickerComponent';
import ngeoMiscWMSTime from 'ngeo/misc/WMSTime';
import {TimePropertyWidgetEnum, TimePropertyResolutionEnum, TimePropertyModeEnum} from 'ngeo/datasource/OGC';
import options from './options';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfapp', [
  'gettext',
  ngeoMiscDatetimepickerComponent.name,
  ngeoMiscWMSTime.name,
]);

MainController.$inject = ['ngeoWMSTime'];

/**
 * @class
 * @param {import('ngeo/misc/WMSTime').WMSTime} ngeoWMSTime wmstime service.
 */
function MainController(ngeoWMSTime) {
  /**
   * @type {import('ngeo/misc/WMSTime').WMSTime}
   */
  this.ngeoWMSTime_ = ngeoWMSTime;

  /**
   * @type {import('ngeo/datasource/OGC').TimeProperty}
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
   * @type {import('ngeo/datasource/OGC').TimeProperty}
   */
  this.wmsTimeValueMode = {
    widget: /** @type {TimePropertyWidgetEnum} */ 'datepicker',
    maxValue: '2015-12-31T00:00:00Z',
    minValue: '2014-01-01T00:00:00Z',
    resolution: /** @type {TimePropertyResolutionEnum}*/ 'month',
    mode: /** @type {TimePropertyModeEnum} */ 'value',
    interval: [0, 1, 0, 0],
  };

  /**
   * @type {string}
   */
  this.dateValue = '2014-01-01';

  /**
   * @type {string}
   */
  this.dateStart = '2006-01-01';

  /**
   * @type {string}
   */
  this.dateEnd = '2013-12-31';

  /**
   * @type {string}
   */
  this.value = '';

  /**
   * @type {string}
   */
  this.rangeValue = '';

  /**
   * @param {string} startTime
   * @param {string} [opt_endTime]
   * @returns {import('ngeo/ datasource/ OGC').TimeRange}
   */
  this.getStartEnd = function (startTime, opt_endTime) {
    const time = {start: +new Date(startTime)};
    if (opt_endTime) {
      time.end = +new Date(opt_endTime);
    }
    return time;
  };

  /**
   * @param {string} date
   * @this {MainController}
   */
  this.onDateSelected = function (date) {
    if (!date) {
      return this.dateValue;
    }
    this.value = this.ngeoWMSTime_.formatWMSTimeParam(this.wmsTimeValueMode, this.getStartEnd(date));
    this.dateValue = date;
    return this.dateValue;
  };

  /**
   * @param {string} date
   * @this {MainController}
   */
  this.onDateStartSelected = function (date) {
    if (!date) {
      return this.dateStart;
    }
    this.dateStart = date;
    this.rangeValue = this.ngeoWMSTime_.formatWMSTimeParam(
      this.wmsTimeRangeMode,
      this.getStartEnd(this.dateStart, this.dateEnd),
    );
    return this.dateStart;
  };

  /**
   * @param {string} date
   * @this {MainController}
   */
  this.onDateEndSelected = function (date) {
    if (!date) {
      return this.dateEnd;
    }
    this.dateEnd = date;
    this.rangeValue = this.ngeoWMSTime_.formatWMSTimeParam(
      this.wmsTimeRangeMode,
      this.getStartEnd(this.dateStart, this.dateEnd),
    );
    return this.dateEnd;
  };

  this.onDateSelected(this.dateValue);
  this.onDateStartSelected(this.dateStart);
  this.onDateEndSelected(this.dateEnd);
}
myModule.controller('MainController', MainController);
options(myModule);
export default myModule;
