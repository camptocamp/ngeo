

/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['gmf']);


/**
 * @constructor
 * @param {!angular.Scope} $scope Angular scope.
 * @param {!gmf.WMSTime} gmfWMSTime wmstime service.
 * @ngInject
 */
app.MainController = function($scope, gmfWMSTime) {

  /**
   * @type {gmf.WMSTime}
   * @private
   */
  this.gmfWMSTime_ = gmfWMSTime;

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
    interval : [0,1,0,0]
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
    interval : [0,0,1,0]
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
    this.sliderValue = this.gmfWMSTime_.formatWMSTimeParam(this.wmsTimeValueMode, date);
    $scope.$digest();
  };

  this.onDateRangeSelected = function(date) {
    this.sliderRangeValue = this.gmfWMSTime_.formatWMSTimeParam(this.wmsTimeRangeMode, date);
    $scope.$digest();
  };

};


app.module.controller('MainController', app.MainController);
