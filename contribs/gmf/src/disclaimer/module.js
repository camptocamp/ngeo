/**
 * @module gmf.disclaimer.module
 */
import * as angular from 'angular';
import gmfDisclaimerComponent from 'gmf/disclaimer/component.js';

/**
 * @type {!angular.IModule}
 */
export default angular.module('gmfDisclaimerModule', [
  gmfDisclaimerComponent.name,
]);
