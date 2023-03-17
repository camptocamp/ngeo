import angular from 'angular';
import DateFormatter from 'ngeo/misc/php-date-formatter.js';
import 'jquery-datetimepicker/jquery.datetimepicker.js';
import 'jquery-datetimepicker/jquery.datetimepicker.css';

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoDateTimePicker', ['gettext']);

/**
 * A directive used to display a date or time picker
 *
 * Example:
 *
 *      <input ngeo-datetimepicker
 *          ngeo-datetimepicker-options="{timepicker: false}"
 *
 * @htmlAttribute {Object} ngeo-datetimepicker-options The options.
 *
 * @return {angular.IDirective} The directive specs.
 * @ngdoc directive
 * @ngname ngeoDatetimepicker
 */
function dateTimeComponent() {
  return {
    restrict: 'A',
    controller: Controller,
    bindToController: true,
    scope: {
      'options': '<ngeoDatetimepickerOptions',
    },
  };
}

module.directive('ngeoDatetimepicker', dateTimeComponent);

/**
 * @param {!JQuery} $element Element.
 * @param {!angular.gettext.gettextCatalog} gettextCatalog service.
 * @constructor
 * @private
 * @hidden
 * @ngInject
 * @ngdoc controller
 * @ngname ngeoDatetimepickerController
 */
function Controller($element, gettextCatalog) {
  /**
   * @const {!JQuery}
   * @private
   */
  this.element_ = $element;

  /**
   * The gettext catalog
   * @type {!angular.gettext.gettextCatalog}
   * @private
   */
  this.gettextCatalog_ = gettextCatalog;

  /**
   * The options
   * @type {Object|String}
   * @private
   */
  this.options;
}

/**
 * Initialize the directive.
 */
Controller.prototype.$onInit = function () {
  const lang = this.gettextCatalog_.getCurrentLanguage();
  // @ts-ignore: Missing in DefinitelyTyped
  $.datetimepicker.setLocale(lang);
  // @ts-ignore: Missing in DefinitelyTyped
  $.datetimepicker.setDateFormatter(new DateFormatter());
  if (typeof this.options === 'string') {
    this.options = angular.fromJson(this.options);
  }
  this.element_.datetimepicker(this.options);
};

module.controller('ngeoDateTimePickerController', Controller);

export default module;
