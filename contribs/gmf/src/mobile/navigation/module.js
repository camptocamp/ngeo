/**
 * @module gmf.mobile.navigation.module
 */
import gmfMobileNavigationComponent from 'gmf/mobile/navigation/component.js';

/**
 * @type {!angular.IModule}
 */
const exports = angular.module('gmfMobileNavigationModule', [
  gmfMobileNavigationComponent.name,
]);


export default exports;
