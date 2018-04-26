/**
 * @module ngeo.misc.datetimepickerComponent
 */
import 'jquery-datetimepicker';


/**
 * @type {!angular.Module}
 */
const exports = angular.module('ngeoDateTimePicker', ['gettext']);

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
 * @return {angular.Directive} The directive specs.
 * @ngdoc directive
 * @ngname ngeoDatetimepicker
 */
exports.component_ = function() {
  return {
    restrict: 'A',
    controller: exports.Controller_,
    bindToController: true,
    scope: {
      'options': '<ngeoDatetimepickerOptions'
    }
  };
};

exports.directive('ngeoDatetimepicker', exports.component_);


/**
 * @param {!jQuery} $element Element.
 * @param {!angularGettext.Catalog} gettextCatalog service.
 * @constructor
 * @private
 * @struct
 * @ngInject
 * @ngdoc controller
 * @ngname ngeoDatetimepickerController
 */
exports.Controller_ = function($element, gettextCatalog) {
  /**
   * @const {!jQuery}
   * @private
   */
  this.element_ = $element;

  /**
   * The gettext catalog
   * @type {!angularGettext.Catalog}
   * @private
   */
  this.gettextCatalog_ = gettextCatalog;

  /**
   * The options
   * @type {Object|String}
   * @private
   */
  this.options;
};


/**
 * Initialize the directive.
 */
exports.Controller_.prototype.$onInit = function() {
  const lang = this.gettextCatalog_.getCurrentLanguage();
  $.datetimepicker.setLocale(lang);
  if (typeof this.options === 'string') {
    this.options = angular.fromJson(this.options);
  }
  this.element_.datetimepicker(this.options);
};

exports.controller('ngeoDateTimePickerController',
  exports.Controller_);


export default exports;
