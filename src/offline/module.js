import ngeoOfflineComponent from 'ngeo/offline/component.js';
import ngeoOfflineNetworkStatus from 'ngeo/offline/NetworkStatus.js';
import ngeoOfflineServiceManager from 'ngeo/offline/ServiceManager.js';
import downloader from 'ngeo/offline/Downloader.js';
import restorer from 'ngeo/offline/Restorer.js';
import mode from 'ngeo/offline/Mode.js';
import angular from 'angular';

/**
 * @type {!angular.IModule}
 */
const exports = angular.module('ngeoOfflineModule', [
  ngeoOfflineComponent.name,
  ngeoOfflineNetworkStatus.module.name,
  ngeoOfflineServiceManager.module.name,
  downloader.module.name,
  restorer.module.name,
  mode.module.name,
]);

exports.value('ngeoOfflineGutter', 96);

export default exports;
