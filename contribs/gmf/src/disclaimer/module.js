goog.provide('gmf.disclaimer.module');

goog.require('gmf.disclaimer.component');


/**
 * @type {!angular.Module}
 */
gmf.disclaimer.module = angular.module('gmfDisclaimerModule', [
  gmf.disclaimer.component.name,
]);
