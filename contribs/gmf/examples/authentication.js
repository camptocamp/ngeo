// The MIT License (MIT)
//
// Copyright (c) 2016-2021 Camptocamp SA
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
import appURL from './url.js';
import './authentication.css';
import gmfAuthenticationModule from 'gmf/authentication/module.js';

/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('gmfapp', ['gettext', gmfAuthenticationModule.name]);

module.value('authenticationBaseUrl', appURL.GMF_DEMO);

module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');

/**
 * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
 * @constructor
 * @ngInject
 */
function MainController(gettextCatalog) {
  /**
   * A password validator that check if the password as:
   *  - A minimal length of 8 characters.
   *  - At least one lowercase letter.
   *  - At least one Uppercase letter.
   *  - At least one digit.
   *  - At least one special character.
   * @type {import('gmf/authentication/component.js').PasswordValidator} the password validator
   */
  this.passwordValidator = {
    isPasswordValid: function (value) {
      return (
        value.length > 8 && /\d/.test(value) && /[a-z]/.test(value) && /[A-Z]/.test(value) && /\W/.test(value)
      );
    },
    notValidMessage: gettextCatalog.getString(
      'The new password must have at least 8 characters,' +
        'including capital letter, small letter, digit and special character.'
    ),
  };
}

module.controller('MainController', MainController);

export default module;
