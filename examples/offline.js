/**
 * @module app.offline
 */
const exports = {};

import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import './offline.css';
import './common_dependencies.js';
import olMap from 'ol/Map.js';

import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';
import ngeoMapModule from 'ngeo/map/module.js';
import ngeoOfflineModule from 'ngeo/offline/module.js';
import ngeoOfflineConfiguration from 'ngeo/offline/Configuration.js';
import NgeoOfflineServiceManager from 'ngeo/offline/ServiceManager.js';
import angular from 'angular';

/** @type {!angular.IModule} **/
exports.module = angular.module('app', [
  'gettext',
  ngeoMapModule.name,
  ngeoOfflineModule.name,
  NgeoOfflineServiceManager.module.name,
]);

exports.module.value('ngeoOfflineTestUrl', '../../src/offline/component.html');

// Define the offline download configuration service
ngeoOfflineModule.service('ngeoOfflineConfiguration', ngeoOfflineConfiguration);

class MainController {
  /**
   * @param {import("ngeo/map/FeatureOverlayMgr.js").FeatureOverlayMgr} ngeoFeatureOverlayMgr
   * ngeo feature overlay manager service.
   * @param {import("ngeo/offline/NetworkStatus.js").default} ngeoNetworkStatus ngeo network status service.
   * @param {NgeoOfflineServiceManager} ngeoOfflineServiceManager ngeo offline service.
   * @ngInject
   */
  constructor(ngeoFeatureOverlayMgr, ngeoNetworkStatus, ngeoOfflineServiceManager) {
    /**
     * Save a square of 10 km sideways (Map's unit is the meter).
     * @type {number}
     * @export
     */
    this.offlineExtentSize = 10000;

    /**
     * @type {ngeoNetworkStatus}
     * @export
     */
    this.ngeoNetworkStatus = ngeoNetworkStatus;

    /**
     * @type {olMap}
     * @export
     */
    this.map = new olMap({
      layers: [
        new olLayerTile({
          source: new olSourceOSM(),
        }),
      ],
      view: new olView({
        center: [352379, 5172733],
        zoom: 4,
      }),
    });

    ngeoFeatureOverlayMgr.init(this.map);

    ngeoOfflineServiceManager.setSaveService('offlineDownloader');
    ngeoOfflineServiceManager.setRestoreService('ngeoOfflineRestorer');
  }
}

exports.module.controller('MainController', MainController);

export default exports;
