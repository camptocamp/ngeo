goog.provide('gmf.contextualdata.module');

goog.require('gmf.contextualdata.component');

/**
 * @type {!angular.Module}
 */
gmf.contextualdata.module = angular.module('gmfContextualdataModule', [
  gmf.contextualdata.component.name,
]);
