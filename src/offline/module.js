goog.module('ngeo.offline.module');
goog.module.declareLegacyNamespace();

const ngeoBase = goog.require('ngeo');
const ngeoOfflineComponent = goog.require('ngeo.offline.component');
const ngeoOfflineNetworkStatus = goog.require('ngeo.offline.NetworkStatus');
const ngeoOfflineServiceManager = goog.require('ngeo.offline.ServiceManager');
const downloader = goog.require('ngeo.offline.Downloader');
const restorer = goog.require('ngeo.offline.Restorer');
const state = goog.require('ngeo.offline.State');

/**
 * @type {!angular.Module}
 */
exports = angular.module('ngeoOfflineModule', [
  ngeoBase.module.name, // Change me when all dependencies are in a module.
  ngeoOfflineComponent.name,
  ngeoOfflineNetworkStatus.module.name,
  ngeoOfflineServiceManager.module.name,
  downloader.module.name,
  restorer.module.name,
  state.module.name
]);
