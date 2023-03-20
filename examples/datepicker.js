import './datepicker.css';
import angular from 'angular';
import ngeoMiscDatepickerComponent from 'ngeo/misc/datepickerComponent.js';

import ngeoMiscTime from 'ngeo/misc/Time.js';
import {TimePropertyWidgetEnum, TimePropertyModeEnum} from 'ngeo/datasource/OGC.js';

/** @type {!angular.IModule} **/
const module = angular.module('app', ['gettext', ngeoMiscDatepickerComponent.name, ngeoMiscTime.name]);

/**
 * @constructor
 * @param {!import("ngeo/misc/Time.js").default} ngeoTime time service.
 * @ngInject
 */
function MainController(ngeoTime) {
  /**
   * @type {import("ngeo/misc/Time.js").default}
   * @private
   */
  this.ngeoTime_ = ngeoTime;

  /**
   * @type {import('ngeo/datasource/OGC.js').TimeProperty}
   */
  this.timeRangeMode = {
    widget: TimePropertyWidgetEnum.DATEPICKER,
    maxValue: '2013-12-31T00:00:00Z',
    minValue: '2006-01-01T00:00:00Z',
    maxDefValue: null,
    minDefValue: null,
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
    maxDefValue: null,
    minDefValue: null,
    mode: TimePropertyModeEnum.VALUE,
    interval: [0, 1, 0, 0],
  };

  /**
   * @type {string}
   */
  this.value;

  /**
   * @type {string}
   */
  this.rangeValue;

  this.onDateSelected = function (date) {
    this.value = date;
  };

  this.onDateRangeSelected = function (date) {
    this.rangeValue = date;
  };
}

module.controller('MainController', MainController);

export default module;
