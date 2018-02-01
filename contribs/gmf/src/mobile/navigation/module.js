goog.provide('gmf.mobile.navigation.module');

goog.require('gmf.mobile.navigation.component');

/**
 * @type {!angular.Module}
 */
gmf.mobile.navigation.module = angular.module('gmfMobileNavigationModule', [
  gmf.mobile.navigation.component.name,
]);
