goog.provide('ngeo.offline.module');

goog.require('ngeo');
goog.require('ngeo.offline.component');
goog.require('ngeo.offline.NetworkStatus');
goog.require('ngeo.offline.ServiceManager');

/**
 * @type {!angular.Module}
 */
ngeo.offline.module = angular.module('ngeoOfflineModule', [
  ngeo.module.name, // Change me when all dependencies are in a module.
  ngeo.offline.component.name,
  'ngeoNetworkStatus',
  ngeo.offline.ServiceManager.module.name,
]);
