import angular from 'angular';
import appURL from './url.js';
import './authentication.css';
import gmfAuthenticationModule from 'gmf/authentication/module.js';

/**
 * @type {!angular.IModule}
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
