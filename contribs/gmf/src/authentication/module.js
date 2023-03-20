/**
 */
import angular from 'angular';
import gmfAuthenticationComponent from 'gmf/authentication/component.js';

import gmfAuthenticationService from 'gmf/authentication/Service.js';

/**
 * @type {!angular.IModule}
 */
export default angular.module('gmfAuthenticationModule', [
  gmfAuthenticationComponent.name,
  gmfAuthenticationService.name,
]);
