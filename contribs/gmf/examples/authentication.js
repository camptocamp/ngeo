/**
 * @module gmfapp.authentication
 */
const exports = {};

import appURL from './url.js';
import './authentication.css';
import gmfAuthenticationModule from 'gmf/authentication/module.js';


/** @type {!angular.Module} **/
exports.module = angular.module('gmfapp', [
  'gettext',
  gmfAuthenticationModule.name
]);


exports.module.value(
  'authenticationBaseUrl',
  appURL.GMF_DEMO);

exports.module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');


/**
 * @param {angularGettext.Catalog} gettextCatalog Gettext catalog.
 * @constructor
 * @ngInject
 */
exports.MainController = function(gettextCatalog) {
  /**
   * A password validator that check if the password as:
   *  - A minimal length of 8 characters.
   *  - At least one lowercase letter.
   *  - At least one Uppercase letter.
   *  - At least one digit.
   *  - At least one special character.
   * @type {gmfx.PasswordValidator} the password validator
   * @export
   */
  this.passwordValidator = {
    isPasswordValid: function(value) {
      return (
        value.length > 8 && /\d/.test(value) &&
        /[a-z]/.test(value) && /[A-Z]/.test(value) &&
        /\W/.test(value)
      );
    },
    notValidMessage: gettextCatalog.getString('The new password must have at least 8 characters,'
                             + 'including capital letter, small letter, digit and special character.')
  };
};


exports.module.controller('MainController', exports.MainController);


export default exports;
