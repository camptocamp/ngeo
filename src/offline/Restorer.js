import ngeoMapBackgroundLayerMgr from 'ngeo/map/BackgroundLayerMgr.js';
import angular from 'angular';

class Restorer {
  /**
   * @ngInject
   * @param {import("ngeo/offline/Configuration.js").default}
   * ngeoOfflineConfiguration A service for customizing offline behaviour.
   * @param {import("ngeo/map/BackgroundLayerMgr.js").MapBackgroundLayerManager}
   * ngeoBackgroundLayerMgr The background layer manager.
   */
  constructor(ngeoOfflineConfiguration, ngeoBackgroundLayerMgr) {
    /**
     * @private
     * @type {import("ngeo/offline/Configuration.js").default}
     */
    this.configuration_ = ngeoOfflineConfiguration;

    /**
     * @private
     * @type {import("ngeo/map/BackgroundLayerMgr.js").MapBackgroundLayerManager}
     */
    this.ngeoBackgroundLayerMgr_ = ngeoBackgroundLayerMgr;
  }

  /**
   * @param {import("ol/Map.js").default} map The map to work on.
   * @return {Promise<import("ol/extent.js").Extent>} A promise to the extent of the restored area.
   */
  restore(map) {
    return this.configuration_
      .getItem('offline_content')
      .then((offlineContent) => this.doRestore(map, offlineContent));
  }

  /**
   * @protected
   * @param {import("ol/Map.js").default} map A map
   * @param {import("./index.js").OfflinePersistentContent} offlineContent The offline content
   * @return {import("ol/extent.js").Extent} The extent of the restored area
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
