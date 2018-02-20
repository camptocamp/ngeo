goog.provide('gmfapp.authentication');


// webpack: import './authentication.css';
// webpack: import './common_dependencies.js';
goog.require('gmf.authentication.module');


/** @type {!angular.Module} **/
gmfapp.authentication.module = angular.module('gmfapp', [
  gmf.authentication.module.name
]);


gmfapp.authentication.module.value(
  'authenticationBaseUrl',
  'https://geomapfish-demo.camptocamp.net/2.2/wsgi');

gmfapp.authentication.module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');


/**
 * @param {angularGettext.Catalog} gettextCatalog Gettext catalog.
 * @constructor
 * @ngInject
 */
gmfapp.authentication.MainController = function(gettextCatalog) {
  /**
   * A password validator that check if the password as:
   *  - A minimal length of 8 characteres.
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


gmfapp.authentication.module.controller('MainController', gmfapp.authentication.MainController);
