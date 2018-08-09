/**
 * @module gmf.authentication.module
 */
import gmfAuthenticationComponent from 'gmf/authentication/component.js';

/** @suppress {extraRequire} */
import gmfAuthenticationService from 'gmf/authentication/Service.js';

/**
 * @type {!angular.Module}
 */
const exports = angular.module('gmfAuthenticationModule', [
  gmfAuthenticationComponent.name,
  gmfAuthenticationService.module.name
]);


export default exports;
