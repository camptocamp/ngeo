goog.provide('ngeo.datetimepickerDirective');

goog.require('ngeo');

// Don't forget to add module dependencies


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
ngeo.datetimepickerDirective = function() {
  return {
    restrict: 'A',
    controller: ngeo.DatetimepickerController,
    bindToController: true,
    scope: {
      'options': '<ngeoDatetimepickerOptions'
    }
  };
};

ngeo.module.directive('ngeoDatetimepicker', ngeo.datetimepickerDirective);


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
ngeo.DatetimepickerController = function($element, gettextCatalog) {
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
ngeo.DatetimepickerController.prototype.$onInit = function() {
  const lang = this.gettextCatalog_.getCurrentLanguage();
  $.datetimepicker.setLocale(lang);
  if (typeof this.options === 'string') {
    this.options = angular.fromJson(this.options);
  }
  this.element_.datetimepicker(this.options);
};
