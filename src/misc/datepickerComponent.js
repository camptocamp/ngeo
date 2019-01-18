/**
 */
import angular from 'angular';
import googAsserts from 'goog/asserts.js';
import ngeoMiscTime from 'ngeo/misc/Time.js';

import 'angular-ui-date';
import 'ngeo/sass/jquery-ui.js';

// FIXME: import the locales in the applications
import 'jquery-ui/ui/i18n/datepicker-fr.js';
import 'jquery-ui/ui/i18n/datepicker-en-GB.js';
import 'jquery-ui/ui/i18n/datepicker-de.js';
import 'jquery-ui/ui/i18n/datepicker-it.js';


/**
 * @type {!angular.IModule}
 */
const exports = angular.module('ngeoDatePicker', [
  ngeoMiscTime.name,
  'ui.date',
]);


exports.value('ngeoDatePickerTemplateUrl',
  /**
   * @param {JQLite} element Element.
   * @param {angular.IAttributes} attrs Attributes.
   * @return {string} Template URL.
   */
  (element, attrs) => {
    const templateUrl = attrs['ngeoDatePickerTemplateUrl'];
    return templateUrl !== undefined ? templateUrl :
      'ngeo/misc/datepickerComponent';
  });

module.run(/* @ngInject */ ($templateCache) => {
  $templateCache.put('ngeo/misc/datepickerComponent', require('./datepickerComponent.html'));
});


/**
 * Provide a directive to select a single date or a range of dates. Requires
 * jQuery UI for the 'datepicker' widget.
 *
 * @param {string|function(!JQLite=, !angular.IAttributes=)}
 * ngeoDatePickerTemplateUrl Template for the directive.
 * @param {angular.ITimeoutService} $timeout angular timeout service
 * @return {angular.IDirective} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoDatePicker
 */
function component(ngeoDatePickerTemplateUrl, $timeout) {
  return {
    scope: {
      onDateSelected: '&',
      time: '='
    },
    bindToController: true,
    controller: 'ngeoDatePickerController as datepickerCtrl',
    restrict: 'AE',
    templateUrl: ngeoDatePickerTemplateUrl,
    link: (scope, element, attrs, ctrl) => {
      ctrl.init();

      const lang = ctrl.gettextCatalog_.getCurrentLanguage();
      $['datepicker']['setDefaults']($['datepicker']['regional'][lang]);

      ctrl.sdateOptions = angular.extend({}, ctrl.sdateOptions, {
        'minDate': ctrl.initialMinDate,
        'maxDate': ctrl.initialMaxDate,
        'onClose': (selectedDate) => {
          if (selectedDate) {
            $(element[0]).find('input[name="edate"]').datepicker('option', 'minDate', selectedDate);
          }
        }
      });

      ctrl.edateOptions = angular.extend({}, ctrl.edateOptions, {
        'minDate': ctrl.initialMinDate,
        'maxDate': ctrl.initialMaxDate,
        'onClose': (selectedDate) => {
          if (selectedDate) {
            $(element[0]).find('input[name="sdate"]').datepicker('option', 'maxDate', selectedDate);
          }
        }
      });

      angular.element('body').on('hidden.bs.popover', () => {
        const dp = angular.element('#ui-datepicker-div');
        if (dp && dp.css('display') === 'block') {
          $(element[0]).find('input[name$="date"]').datepicker('hide');
        }
      });

      $timeout(() => {
        angular.element('#ui-datepicker-div').on('mousedown', (e) => {
          e.stopPropagation();
        });
      });
    }
  };
}

module.directive('ngeoDatePicker', component);


/**
 * DatePickerController - directive conttroller
 * @param {!angular.IScope} $scope Angular scope.
 * @param {!angular.auto.IInjectorService} $injector injector.
 * @param {!import("ngeo/misc/Time.js").default} ngeoTime time service.
 * @param {!angular.gettext.gettextCatalog} gettextCatalog service.
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname ngeoDatePickerController
 */
function Controller($scope, $injector,
  ngeoTime, gettextCatalog) {

  /**
   * @type {!import("ngeo/misc/Time.js").default}
   * @private
   */
  this.ngeoTime_ = ngeoTime;

  /**
   * @type {!TimeProperty}
   * @export
   */
  this.time;

  /**
   * The gettext catalog
   * @type {!angular.gettext.gettextCatalog}
   * @private
   */
  this.gettextCatalog_ = gettextCatalog;


  /**
   * If the component is used to select a date range
   * @type {boolean}
   * @export
   */
  this.isModeRange;


  /**
   * Function called after date(s) changed/selected
   * @type {function({time: {start: number, end: number}})}
   * @export
   */
  this.onDateSelected;


  /**
   * Initial min date for the datepicker
   * @type {!Date}
   */
  this.initialMinDate;

  /**
   * Initial max date for the datepickeronDateSelected
   * @type {!Date}
   */
  this.initialMaxDate;

  /**
   * Datepicker options for the second datepicker (only for range mode)
   * @type {Object}
   * @export
   */
  this.edateOptions = {
    'changeMonth': true,
    'changeYear': true
  };

  /**
   * Datepicker options for the first datepicker
   * @type {Object}
   * @export
   */
  this.sdateOptions = {
    'changeMonth': true,
    'changeYear': true
  };

  /**
   * Start date model for the first date picker
   * @type {Date}
   * @export
   */
  this.sdate;

  /**
   * End date model for the second datepicker (only for range mode)
   * @type {Date}
   * @export
   */
  this.edate;

  $scope.$watchGroup(['datepickerCtrl.sdate', 'datepickerCtrl.edate'], (newDates, oldDates) => {
    const sDate = newDates[0];
    const eDate = newDates[1];

    if (angular.isDate(sDate) && (!this.isModeRange || angular.isDate(eDate))) {
      this.onDateSelected({
        time: {
          start: this.ngeoTime_.getTime(sDate),
          end: this.ngeoTime_.getTime(eDate)
        }
      });
    }
  });
}

/**
 * Initialise the controller.
 */
Controller.prototype.init = function() {
  //fetch the initial options for the component
  const initialOptions_ = this.ngeoTime_.getOptions(this.time);
  this.initialMinDate = this.ngeoTime_.createDate(initialOptions_.minDate);
  this.initialMaxDate = this.ngeoTime_.createDate(initialOptions_.maxDate);
  this.isModeRange = this.time.mode === 'range';

  if (this.isModeRange) {
    googAsserts.assertArray(initialOptions_.values);
    this.sdate = this.ngeoTime_.createDate(initialOptions_.values[0]);
    this.edate = this.ngeoTime_.createDate(initialOptions_.values[1]);
  } else {
    googAsserts.assertNumber(initialOptions_.values);
    this.sdate = this.ngeoTime_.createDate(initialOptions_.values);
  }
};

module.controller('ngeoDatePickerController', Controller);


export default module;
