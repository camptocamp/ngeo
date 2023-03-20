import angular from 'angular';
import './datepicker.css';
import ngeoMiscDatepickerComponent from 'ngeo/misc/datepickerComponent.js';

import ngeoMiscWMSTime from 'ngeo/misc/WMSTime.js';
import {
  TimePropertyWidgetEnum,
  TimePropertyResolutionEnum,
  TimePropertyModeEnum,
} from 'ngeo/datasource/OGC.js';

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('gmfapp', ['gettext', ngeoMiscDatepickerComponent.name, ngeoMiscWMSTime.name]);

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
    widget: TimePropertyWidgetEnum.DATEPICKER,
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
    widget: /** @type {TimePropertyWidgetEnum} */ ('datepicker'),
    maxValue: '2015-12-31T00:00:00Z',
    minValue: '2014-01-01T00:00:00Z',
    maxDefValue: null,
    minDefValue: null,
    resolution: /** @type {TimePropertyResolutionEnum}*/ ('month'),
    mode: /** @type {TimePropertyModeEnum} */ ('value'),
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
    this.value = this.ngeoWMSTime_.formatWMSTimeParam(this.wmsTimeValueMode, date);
  };

  this.onDateRangeSelected = function (date) {
    this.rangeValue = this.ngeoWMSTime_.formatWMSTimeParam(this.wmsTimeRangeMode, date);
  };
}

module.controller('MainController', MainController);

export default module;
