// The MIT License (MIT)
//
// Copyright (c) 2018-2021 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import './offline.css';
import './common_dependencies';
import olMap from 'ol/Map';

import olView from 'ol/View';
import olLayerTile from 'ol/layer/Tile';
import olSourceOSM from 'ol/source/OSM';
import ngeoMapModule from 'ngeo/map/module';
import ngeoOfflineModule from 'ngeo/offline/module';
import ngeoOfflineConfiguration from 'ngeo/offline/Configuration';
import NgeoOfflineServiceManager from 'ngeo/offline/ServiceManager';
import angular from 'angular';

class MainController {
  /**
   * @param {import('ngeo/map/FeatureOverlayMgr').FeatureOverlayMgr} ngeoFeatureOverlayMgr
   * ngeo feature overlay manager service.
   * @param {import('ngeo/offline/NetworkStatus').default} ngeoNetworkStatus ngeo network status service.
   * @param {NgeoOfflineServiceManager} ngeoOfflineServiceManager ngeo offline service.
   * @ngInject
   */
  constructor(ngeoFeatureOverlayMgr, ngeoNetworkStatus, ngeoOfflineServiceManager) {
    /**
     * Save a square of 10 km sideways (Map's unit is the meter).
     *
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

/** @type {!angular.IModule} **/
const myModule = angular.module('app', [
  'gettext',
  ngeoMapModule.name,
  ngeoOfflineModule.name,
  NgeoOfflineServiceManager.module.name,
]);

myModule.value('ngeoOfflineTestUrl', '../../src/offline/component.html');

// Define the offline download configuration service
myModule.service('ngeoOfflineConfiguration', ngeoOfflineConfiguration);

myModule.controller('MainController', MainController);

myModule.constant('ngeoTilesPreloadingLimit', 0);

export default MainController;
