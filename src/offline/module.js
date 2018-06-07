goog.module('ngeo.offline.module');

const ngeoBase = goog.require('ngeo');
const ngeoOfflineComponent = goog.require('ngeo.offline.component');
const ngeoOfflineNetworkStatus = goog.require('ngeo.offline.NetworkStatus');
const ngeoOfflineServiceManager = goog.require('ngeo.offline.ServiceManager');
const downloader = goog.require('ngeo.offline.Downloader');

/**
 * @type {!angular.Module}
 */
exports = angular.module('ngeoOfflineModule', [
  ngeoBase.module.name, // Change me when all dependencies are in a module.
  ngeoOfflineComponent.name,
  'ngeoNetworkStatus',
  ngeoOfflineServiceManager.module.name,
  downloader.module.name
]);
