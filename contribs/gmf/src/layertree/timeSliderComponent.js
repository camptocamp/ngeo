import angular from 'angular';
import ngeoMiscWMSTime from 'ngeo/misc/WMSTime.js';

import 'jquery-ui/ui/widgets/slider.js';
import 'angular-ui-slider';
import './timeslider.scss';


/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('gmfLayertreeTimeSliderComponent', [
  ngeoMiscWMSTime.name,
  'ui.slider',
]);


module.run(/* @ngInject */ ($templateCache) => {
  // @ts-ignore: webpack
  $templateCache.put('gmf/layertree/timesliderComponent', require('./timesliderComponent.html'));
});


/**
 * Provide a directive to select a single date or a range of dates with a slider
 * Example:
 *
 *      <gmf-time-slider
 *          gmf-time-slider-time="{
 *            maxValue: '2013-12-31T00:00:00Z',
 *            minValue: '2006-01-01T00:00:00Z',
 *            mode: 'range'}"
 *          gmf-time-slider-on-date-selected="ctrl.onDateSelected(time)">
 *      </gmf-time-slider>
 *
 * @htmlAttribute {import('ngeo/datasource/OGC.js').TimeProperty} gmf-time-slider-time parameter
 *    for initialization.
 * @htmlAttribute {function()} gmf-time-slider-on-date-selected Expression evaluated after
 * date(s) changed
 * @return {angular.IDirective} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfTimeSlider
 */
function layertreeTimeSliderComponent() {
  return {
    scope: {
      onDateSelected: '&gmfTimeSliderOnDateSelected',
      time: '=gmfTimeSliderTime'
    },
    bindToController: true,
    controller: 'gmfTimeSliderController as sliderCtrl',
    restrict: 'AE',
    templateUrl: 'gmf/layertree/timesliderComponent',
    link: {
      pre: function preLink(scope, element, attrs, ctrl) {
        ctrl.init();

        ctrl.sliderOptions['stop'] = onSliderReleased_;
        ctrl.sliderOptions['slide'] = computeDates_;

        function onSliderReleased_(e, sliderUi) {
          ctrl.onDateSelected({
            time: computeDates_(e, sliderUi)
          });
          scope.$apply();
        }

        function computeDates_(e, sliderUi) {
          let sDate, eDate, wmstime;
          if (sliderUi.values) {
            sDate = new Date(ctrl.getClosestValue_(sliderUi.values[0]));
            eDate = new Date(ctrl.getClosestValue_(sliderUi.values[1]));
            ctrl.dates = [sDate, eDate];
            wmstime = {
              start: sDate.getTime(),
              end: eDate.getTime()
            };
          } else {
            sDate = new Date(ctrl.getClosestValue_(sliderUi.value));
            ctrl.dates = sDate;
            wmstime = {
              start: sDate.getTime()
            };
          }
          scope.$apply();
          return wmstime;
        }
      }
    }
  };
}


module.directive('gmfTimeSlider', layertreeTimeSliderComponent);


/**
 * TimeSliderController - directive controller
 * @param {import("ngeo/misc/WMSTime.js").WMSTime} ngeoWMSTime WMSTime service.
 * @constructor
 * @private
 * @hidden
 * @ngInject
 * @ngdoc controller
 * @ngname gmfTimeSliderController
 */
function Controller(ngeoWMSTime) {

  /**
   * @type {import("ngeo/misc/WMSTime.js").WMSTime}
   * @private
   */
  this.ngeoWMSTime_ = ngeoWMSTime;

  /**
   * Function called after date(s) changed/selected
   * @type {Function}
   */
  this.onDateSelected;


  /**
   * A time object for directive initialization
   * @type {import('ngeo/datasource/OGC.js').TimeProperty}
   */
  this.time;

  /**
   * If the component is used to select a date range
   * @type {boolean}
   */
  this.isModeRange;

  /**
   * Minimal value of the slider (time in ms)
   * @type {number}
   */
  this.minValue;

  /**
   * Maximal value of the slider (time in ms)
   * @type {number}
   */
  this.maxValue;

  /**
   * Used when WMS time object has a property 'values' instead of an interval
   * @type {?Array.<number>}
   */
  this.timeValueList;

  /**
   * Default Slider options (used by ui-slider directive)
   * @type {{
   *  range : boolean,
   *  min : number,
   *  max : number
   * }}
   */
  this.sliderOptions;

  /**
   * Model for the ui-slider directive (date in ms format)
   * @type {Array.<number>|number}
   */
  this.dates;
}


/**
 * Initialise the controller.
 */
Controller.prototype.init = function() {
  this.timeValueList = this.getTimeValueList_();

  // Fetch the initial options for the component
  const initialOptions_ = this.ngeoWMSTime_.getOptions(this.time);
  this.isModeRange = this.time.mode === 'range';
  this.minValue = initialOptions_.minDate;
  this.maxValue = initialOptions_.maxDate;
  const values = initialOptions_.values;
  const currentTime = {};
  if (this.isModeRange) {
    if (!Array.isArray(values)) {
      throw new Error('Wrong Options values');
    }
    currentTime.start = values[0];
    currentTime.end = values[1];
    this.dates = [currentTime.start, currentTime.end];
  } else {
    currentTime.start = initialOptions_.values;
    this.dates = currentTime.start;
  }
  this.timeValueList = this.getTimeValueList_();
  this.sliderOptions = {
    range: this.isModeRange,
    min: this.minValue,
    max: this.maxValue
  };
  // Call the callback with the current slider time.
  this.onDateSelected({time: currentTime});
};

/**
 * TimeSliderController.prototype.getTimeValueList_ - Get a list of time value instead
 * of using the wmstime interval as a list of possibles values
 * @private
 * @return {Array<number>}  - List of timestamp representing possible values
 */
Controller.prototype.getTimeValueList_ = function() {
  const wmsTime = this.time;
  let timeValueList = null;
  const minDate = new Date(this.minValue);
  const maxDate = new Date(this.maxValue);

  if (wmsTime.values) {
    timeValueList = [];
    wmsTime.values.forEach((date) => {
      timeValueList.push(new Date(date).getTime());
    });
  } else {
    const maxNbValues = 1024;
    const endDate = new Date(minDate.getTime());
    endDate.setFullYear(minDate.getFullYear() + maxNbValues * wmsTime.interval[0]);
    endDate.setMonth(minDate.getMonth() + maxNbValues * wmsTime.interval[1],
      minDate.getDate() + maxNbValues * wmsTime.interval[2]);
    endDate.setSeconds(minDate.getSeconds() + maxNbValues * wmsTime.interval[3]);

    if (endDate > maxDate) {
      // Transform interval to a list of values when the number
      // of values is below a threshold (maxNbValues)
      timeValueList = [];
      for (let i = 0; ; i++) {
        const nextDate = new Date(minDate.getTime());
        nextDate.setFullYear(minDate.getFullYear() + i * wmsTime.interval[0]);
        nextDate.setMonth(minDate.getMonth() + i * wmsTime.interval[1],
          minDate.getDate() + i * wmsTime.interval[2]);
        nextDate.setSeconds(minDate.getSeconds() + i * wmsTime.interval[3]);
        if (nextDate <= maxDate) {
          timeValueList.push(nextDate.getTime());
        } else {
          break;
        }
      }
    }
  }
  return timeValueList;
};


/**
 * Compute the closest available date from the given timestamp
 * @param  {number} timestamp selected datetime (in ms format)
 * @return {number} the closest available datetime (in ms format) from the timestamp
 * @private
 */
Controller.prototype.getClosestValue_ = function(timestamp) {
  if (timestamp <= this.minValue) {
    return this.minValue;
  }

  if (timestamp >= this.maxValue) {
    return this.maxValue;
  }

  if (this.timeValueList) {
    // Time stops are defined as a list of values
    let index;
    let leftIndex = 0;
    let rightIndex = this.timeValueList.length - 1;

    while ((rightIndex - leftIndex) > 1) {
      index = Math.floor((leftIndex + rightIndex) / 2);
      if (this.timeValueList[index] >= timestamp) {
        rightIndex = index;
      } else {
        leftIndex = index;
      }
    }

    const leftDistance = Math.abs(this.timeValueList[leftIndex] - timestamp);
    const rightDistance = Math.abs(this.timeValueList[rightIndex] - timestamp);

    return this.timeValueList[leftDistance < rightDistance ? leftIndex : rightIndex];
  } else {
    // Time stops are defined by a start date plus an interval
    const targetDate = new Date(timestamp);
    const startDate = new Date(this.minValue);
    let bestDate = new Date(this.minValue);
    const maxDate = new Date(this.maxValue);
    let bestDistance = Math.abs(targetDate.getTime() - bestDate.getTime());

    for (let i = 1; ; i++) {
      // The start date should always be used as a reference
      // because adding a month twice could differ from adding
      // two months at once
      const next = new Date(startDate.getTime());
      next.setFullYear(startDate.getFullYear() + i * this.time.interval[0]);
      next.setMonth(startDate.getMonth() + i * this.time.interval[1],
        startDate.getDate() + i * this.time.interval[2]);
      next.setSeconds(startDate.getSeconds() + i * this.time.interval[3]);

      if (next > maxDate) {
        break;
      }

      const distance = Math.abs(targetDate.getTime() - next.getTime());
      if (distance <= bestDistance) {
        bestDate = next;
        bestDistance = distance;
      } else {
        break;
      }
    }

    return bestDate.getTime();
  }
};


/**
 * Format and localize time regarding a resolution.
 * @param {number} time (in ms format) timestamp to format and localize.
 * @return {string} Localized date string regarding the resolution.
 */
Controller.prototype.getLocalizedDate = function(time) {
  return this.ngeoWMSTime_.formatTimeValue(time, this.time.resolution);
};


module.controller('gmfTimeSliderController', Controller);


export default module;
