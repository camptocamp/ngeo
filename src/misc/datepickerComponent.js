// The MIT License (MIT)
//
// Copyright (c) 2016-2020 Camptocamp SA
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
import ngeoMiscTime from 'ngeo/misc/Time.js';

import 'angular-ui-date';
import 'ngeo/sass/jquery-ui.scss';

// FIXME: import the locales in the applications
import 'jquery-ui/ui/i18n/datepicker-fr.js';
import 'jquery-ui/ui/i18n/datepicker-en-GB.js';
import 'jquery-ui/ui/i18n/datepicker-de.js';
import 'jquery-ui/ui/i18n/datepicker-it.js';

/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoDatePicker', [ngeoMiscTime.name, 'ui.date']);

module.value(
  'ngeoDatePickerTemplateUrl',
  /**
   * @param {JQuery} element Element.
   * @param {angular.IAttributes} attrs Attributes.
   * @return {string} Template URL.
   */
  (element, attrs) => {
    const templateUrl = attrs.ngeoDatePickerTemplateUrl;
    return templateUrl !== undefined ? templateUrl : 'ngeo/misc/datepickerComponent';
  }
);

module.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('ngeo/misc/datepickerComponent', require('./datepickerComponent.html'));
  }
);

/**
 * Provide a directive to select a single date or a range of dates. Requires
 * jQuery UI for the 'datepicker' widget.
 *
 * @param {string|function(JQuery=, angular.IAttributes=): string}
 * ngeoDatePickerTemplateUrl Template for the directive.
 * @param {angular.ITimeoutService} $timeout angular timeout service
 * @return {angular.IDirective} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoDatePicker
 */
function datePickerComponent(ngeoDatePickerTemplateUrl, $timeout) {
  return {
    scope: {
      onDateSelected: '&',
      time: '=',
    },
    bindToController: true,
    controller: 'ngeoDatePickerController as datepickerCtrl',
    restrict: 'AE',
    templateUrl: ngeoDatePickerTemplateUrl,
    link: (scope, element, attrs, ctrl) => {
      if (!ctrl) {
        throw new Error('Missing ctrl');
      }
      ctrl.init();

      const lang = ctrl.gettextCatalog_.getCurrentLanguage();
      $.datepicker.setDefaults($.datepicker.regional[lang]);

      ctrl.sdateOptions = angular.extend({}, ctrl.sdateOptions, {
        'minDate': ctrl.initialMinDate,
        'maxDate': ctrl.initialMaxDate,
        'onClose':
          /**
           * @param {Date} selectedDate
           */
          (selectedDate) => {
            if (selectedDate) {
              $(element[0]).find('input[name="edate"]').datepicker('option', 'minDate', selectedDate);
            }
          },
      });

      ctrl.edateOptions = angular.extend({}, ctrl.edateOptions, {
        'minDate': ctrl.initialMinDate,
        'maxDate': ctrl.initialMaxDate,
        'onClose':
          /**
           * @param {Date} selectedDate
           */
          (selectedDate) => {
            if (selectedDate) {
              $(element[0]).find('input[name="sdate"]').datepicker('option', 'maxDate', selectedDate);
            }
          },
      });

      angular.element('body').on('hidden.bs.popover', () => {
        const dp = angular.element('#ui-datepicker-div');
        if (dp && dp.css('display') === 'block') {
          $(element[0]).find('input[name$="date"]').datepicker('hide');
        }
      });

      $timeout(() => {
        angular.element('#ui-datepicker-div').on('click', (e) => {
          e.stopPropagation();
        });
      });
    },
  };
}

module.directive('ngeoDatePicker', datePickerComponent);

/**
 * DatePickerController - directive conttroller
 * @param {angular.IScope} $scope Angular scope.
 * @param {import("ngeo/misc/Time.js").Time} ngeoTime time service.
 * @param {angular.gettext.gettextCatalog} gettextCatalog service.
 * @constructor
 * @private
 * @hidden
 * @ngInject
 * @ngdoc controller
 * @ngname ngeoDatePickerController
 */
function Controller($scope, ngeoTime, gettextCatalog) {
  /**
   * @type {import("ngeo/misc/Time.js").Time}
   */
  this.ngeoTime_ = ngeoTime;

  /**
   * @type {?import('ngeo/datasource/OGC.js').TimeProperty}
   */
  this.time = null;

  /**
   * The gettext catalog
   * @type {angular.gettext.gettextCatalog}
   */
  this.gettextCatalog_ = gettextCatalog;

  /**
   * If the component is used to select a date range
   * @type {boolean}
   */
  this.isModeRange = false;

  /**
   * Function called after date(s) changed/selected
   * @type {?function({time: {start: number, end: ?number}}): void}
   */
  this.onDateSelected = null;

  /**
   * Initial min date for the datepicker
   * @type {?Date}
   */
  this.initialMinDate = null;

  /**
   * Initial max date for the datepickeronDateSelected
   * @type {?Date}
   */
  this.initialMaxDate = null;

  /**
   * Datepicker options for the second datepicker (only for range mode)
   * @type {unknown}
   */
  this.edateOptions = {
    'changeMonth': true,
    'changeYear': true,
  };

  /**
   * Datepicker options for the first datepicker
   * @type {unknown}
   */
  this.sdateOptions = {
    'changeMonth': true,
    'changeYear': true,
  };

  /**
   * Start date model for the first date picker
   * @type {?Date}
   */
  this.sdate = null;

  /**
   * End date model for the second datepicker (only for range mode)
   * @type {?Date}
   */
  this.edate = null;

  $scope.$watchGroup(['datepickerCtrl.sdate', 'datepickerCtrl.edate'], (newDates, oldDates) => {
    if (!this.onDateSelected) {
      throw new Error('Missing onDateSelected');
    }
    const sDate = newDates[0];
    const eDate = newDates[1];

    if (angular.isDate(sDate) && (!this.isModeRange || angular.isDate(eDate))) {
      const start = this.ngeoTime_.getTime(sDate);
      const end = this.ngeoTime_.getTime(eDate);
      if (!start) {
        throw new Error('Missing start');
      }
      this.onDateSelected({
        time: {
          start,
          end,
        },
      });
    }
  });
}

/**
 * Initialise the controller.
 */
Controller.prototype.init = function () {
  if (!this.time) {
    throw new Error('Missing time');
  }
  // Fetch the initial options for the component
  const initialOptions_ = this.ngeoTime_.getOptions(this.time);
  this.initialMinDate = this.ngeoTime_.createDate(initialOptions_.minDate);
  this.initialMaxDate = this.ngeoTime_.createDate(initialOptions_.maxDate);
  this.isModeRange = this.time.mode === 'range';

  if (this.isModeRange) {
    if (!Array.isArray(initialOptions_.values)) {
      throw new Error('Value should be an array');
    }
    this.sdate = this.ngeoTime_.createDate(initialOptions_.values[0]);
    this.edate = this.ngeoTime_.createDate(initialOptions_.values[1]);
  } else {
    if (typeof initialOptions_.values != 'number') {
      throw new Error('Value should be a number');
    }
    this.sdate = this.ngeoTime_.createDate(initialOptions_.values);
  }
};

module.controller('ngeoDatePickerController', Controller);

export default module;
