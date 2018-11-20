/**
 * @module gmf.disclaimer.module
 */
import gmfDisclaimerComponent from 'gmf/disclaimer/component.js';

/**
 * @type {!angular.IModule}
 */
const exports = angular.module('gmfDisclaimerModule', [
  gmfDisclaimerComponent.name,
]);


export default exports;
