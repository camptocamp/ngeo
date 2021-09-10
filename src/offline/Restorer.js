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

import ngeoMapBackgroundLayerMgr from 'ngeo/map/BackgroundLayerMgr';
import angular from 'angular';

class Restorer {
  /**
   * @ngInject
   * @param {import('ngeo/offline/Configuration').default} ngeoOfflineConfiguration
   *    A service for customizing offline behaviour.
   * @param {import('ngeo/map/BackgroundLayerMgr').MapBackgroundLayerManager} ngeoBackgroundLayerMgr
   *    The background layer manager.
   */
  constructor(ngeoOfflineConfiguration, ngeoBackgroundLayerMgr) {
    /**
     * @private
     * @type {import('ngeo/offline/Configuration').default}
     */
    this.configuration_ = ngeoOfflineConfiguration;

    /**
     * @private
     * @type {import('ngeo/map/BackgroundLayerMgr').MapBackgroundLayerManager}
     */
    this.ngeoBackgroundLayerMgr_ = ngeoBackgroundLayerMgr;
  }

  /**
   * @param {import('ol/Map').default} map The map to work on.
   * @return {Promise<import('ol/extent').Extent>} A promise to the extent of the restored area.
   */
  restore(map) {
    return this.configuration_
      .getItem('offline_content')
      .then((offlineContent) => this.doRestore(map, offlineContent));
  }

  /**
   * @protected
   * @param {import('ol/Map').default} map A map
   * @param {import('./index').OfflinePersistentContent} offlineContent The offline content
   * @return {import('ol/extent').Extent} The extent of the restored area
   */
  doRestore(map, offlineContent) {
    map.getLayerGroup().getLayers().clear();
    for (const offlineLayer of offlineContent.layers) {
      const layer = this.configuration_.recreateOfflineLayer(offlineLayer);
      if (layer) {
        map.addLayer(layer);
        if (offlineLayer.backgroundLayer) {
          this.ngeoBackgroundLayerMgr_.set(map, layer);
        }
      }
    }
    return offlineContent.extent;
  }
}

const name = 'ngeoOfflineRestorer';
Restorer.module = angular.module(name, [ngeoMapBackgroundLayerMgr.name]).service(name, Restorer);

const exports = Restorer;

export default exports;
