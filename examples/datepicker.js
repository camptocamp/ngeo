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

import './datepicker.css';
import angular from 'angular';
import ngeoMiscDatepickerComponent from 'ngeo/misc/datepickerComponent.js';

import ngeoMiscTime from 'ngeo/misc/Time.js';
import {TimePropertyWidgetEnum, TimePropertyModeEnum} from 'ngeo/datasource/OGC.js';

/** @type {angular.IModule} **/
const myModule = angular.module('app', ['gettext', ngeoMiscDatepickerComponent.name, ngeoMiscTime.name]);

/**
 * @class
 * @param {import("ngeo/misc/Time.js").default} ngeoTime time service.
 * @ngInject
 */
function MainController(ngeoTime) {
  /**
   * @type {import("ngeo/misc/Time.js").default}
   */
  this.ngeoTime_ = ngeoTime;

  /**
   * @type {import('ngeo/datasource/OGC.js').TimeProperty}
   */
  this.timeRangeMode = {
    widget: TimePropertyWidgetEnum.DATEPICKER,
    maxValue: '2013-12-31T00:00:00Z',
    minValue: '2006-01-01T00:00:00Z',
    mode: TimePropertyModeEnum.RANGE,
    interval: [0, 1, 0, 0],
  };

  /**
   * @type {import('ngeo/datasource/OGC.js').TimeProperty}
   */
  this.timeValueMode = {
    widget: TimePropertyWidgetEnum.DATEPICKER,
    maxValue: '2015-12-31T00:00:00Z',
    minValue: '2014-01-01T00:00:00Z',
    mode: TimePropertyModeEnum.VALUE,
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
   * @param {string} date
   */
  this.onDateSelected = function (date) {
    this.value = date;
  };

  /**
   * @param {string} date
   */
  this.onDateRangeSelected = function (date) {
    this.rangeValue = date;
  };
}

myModule.controller('MainController', MainController);

export default myModule;
