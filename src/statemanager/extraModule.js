goog.provide('ngeo.statemanager.extraModule');

goog.require('ngeo');
goog.require('ngeo.statemanager.WfsPermalink');

/**
 * @type {!angular.Module}
 */
ngeo.statemanager.extraModule = angular.module('ngeoStatemanagerExtraModule', [
  ngeo.statemanager.WfsPermalink.module.name,
]);
