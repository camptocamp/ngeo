/**
 * @module ngeo.offline.Restorer
 */
import ngeoMapBackgroundLayerMgr from 'ngeo/map/BackgroundLayerMgr.js';


class Restorer {

  /**
   * @ngInject
   * @param {ngeo.offline.Configuration} ngeoOfflineConfiguration A service for customizing offline behaviour.
   * @param {ngeo.map.BackgroundLayerMgr} ngeoBackgroundLayerMgr The background layer manager.
   */
  constructor(ngeoOfflineConfiguration, ngeoBackgroundLayerMgr) {
    /**
     * @private
     * @type {ngeo.offline.Configuration}
     */
    this.configuration_ = ngeoOfflineConfiguration;

    /**
     * @private
     * @type {ngeo.map.BackgroundLayerMgr}
     */
    this.ngeoBackgroundLayerMgr_ = ngeoBackgroundLayerMgr;
  }

  /**
   * @param {ol.Map} map The map to work on.
   * @return {Promise<ol.Extent>} A promise to the extent of the restored area.
   */
  restore(map) {
    return this.configuration_.getItem('offline_content').then(offlineContent => this.doRestore(map, offlineContent));
  }

  /**
   * @protected
   * @param {ol.Map} map A map
   * @param {ngeox.OfflinePersistentContent} offlineContent The offline content
   * @return {ol.Extent} The extent of the restored area
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
Restorer.module = angular.module(name, [
  ngeoMapBackgroundLayerMgr.module.name
]).service(name, Restorer);

const exports = Restorer;


export default exports;
