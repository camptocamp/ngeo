// The MIT License (MIT)
//
// Copyright (c) 2018-2021 Camptocamp SA
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

import './datetimepicker.scss';
import angular from 'angular';
import ngeoMiscDatetimepickerComponent from 'ngeo/misc/datetimepickerComponent.js';

/** @type {angular.IModule} **/
const module = angular.module('app', ['gettext', ngeoMiscDatetimepickerComponent.name]);

/**
 * @constructor
 * @ngInject
 */
function MainController() {
  /**
   * @type {string}
   */
  this.date = '2018-01-01';

  /**
   * @type {string}
   */
  this.time = '12:00:00';

  /**
   * @type {string}
   */
  this.datetime = '2018-01-01 12:00:00';
}

module.controller('MainController', MainController);

export default module;
