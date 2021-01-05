// The MIT License (MIT)
//
// Copyright (c) 2018-2020 Camptocamp SA
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
import DateFormatter from 'ngeo/misc/php-date-formatter.js';
import 'jquery-datetimepicker/jquery.datetimepicker.js';
import 'jquery-datetimepicker/jquery.datetimepicker.css';

/**
 * @type {angular.IModule}
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
 * @param {JQuery} $element Element.
 * @param {angular.gettext.gettextCatalog} gettextCatalog service.
 * @constructor
 * @hidden
 * @ngInject
 * @ngdoc controller
 * @ngname ngeoDatetimepickerController
 */
export function Controller($element, gettextCatalog) {
  /**
   * @const {JQuery}
   * @private
   */
  this.element_ = $element;

  /**
   * The gettext catalog
   * @type {angular.gettext.gettextCatalog}
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
