/**
 * @module gmf.authentication.module
 */
import * as angular from 'angular';
import gmfAuthenticationComponent from 'gmf/authentication/component.js';

/** @suppress {extraRequire} */
import gmfAuthenticationService from 'gmf/authentication/Service.js';

/**
 * @type {!angular.IModule}
 */
export default angular.module('gmfAuthenticationModule', [
  gmfAuthenticationComponent.name,
  gmfAuthenticationService.module.name
]);
