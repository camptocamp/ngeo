goog.provide('ngeo.misc.datetimepickerComponent');

goog.require('ngeo');
goog.require('ngeo.misc.Time');


/**
 * @type {!angular.Module}
 */
ngeo.misc.datetimepickerComponent = angular.module('ngeoDateTimePicker', [
  ngeo.misc.Time.module.name,
]);

ngeo.module.requires.push(ngeo.misc.datetimepickerComponent.name);

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
ngeo.misc.datetimepickerComponent.component_ = function() {
  return {
    restrict: 'A',
    controller: ngeo.misc.datetimepickerComponent.component_,
    bindToController: true,
    scope: {
      'options': '<ngeoDatetimepickerOptions'
    }
  };
};

ngeo.misc.datetimepickerComponent.directive('ngeoDateTimePicker', ngeo.misc.datetimepickerComponent.component_);


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
ngeo.misc.datetimepickerComponent.Controller_ = function($element, gettextCatalog) {
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
ngeo.misc.datetimepickerComponent.Controller_.prototype.$onInit = function() {
  const lang = this.gettextCatalog_.getCurrentLanguage();
  $.datetimepicker.setLocale(lang);
  if (typeof this.options === 'string') {
    this.options = angular.fromJson(this.options);
  }
  this.element_.datetimepicker(this.options);
};

ngeo.misc.datetimepickerComponent.controller('ngeoDateTimePickerController',
  ngeo.misc.datetimepickerComponent.Controller_);
