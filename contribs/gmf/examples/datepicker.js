/**
 */
const exports = {};

import angular from 'angular';
import './datepicker.css';
import ngeoMiscDatepickerComponent from 'ngeo/misc/datepickerComponent.js';

import ngeoMiscWMSTime from 'ngeo/misc/WMSTime.js';
import {TimePropertyWidgetEnum, TimePropertyResolutionEnum, TimePropertyModeEnum} from 'ngeo/datasource/OGC.js';


/** @type {!angular.IModule} **/
exports.module = angular.module('gmfapp', [
  'gettext',
  ngeoMiscDatepickerComponent.name,
  ngeoMiscWMSTime.module.name,
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
    widget: TimePropertyWidgetEnum.DATEPICKER,
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
    widget: /** @type {TimePropertyWidgetEnum} */ ('datepicker'),
    maxValue: '2015-12-31T00:00:00Z',
    minValue: '2014-01-01T00:00:00Z',
    maxDefValue: null,
    minDefValue: null,
    resolution: /** @type {TimePropertyResolutionEnum}*/ ('month'),
    mode: /** @type {TimePropertyModeEnum} */ ('value'),
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


exports.module.controller('MainController', exports.MainController);


export default exports;
