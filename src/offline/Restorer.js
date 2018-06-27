goog.module('ngeo.offline.Restorer');

class Restorer {

  /**
   * @ngInject
   * @param {ngeox.OfflineConfiguration} ngeoOfflineConfiguration A service for customizing offline behaviour.
   */
  constructor(ngeoOfflineConfiguration) {
    /**
     * @private
     * @type {ngeox.OfflineConfiguration}
     */
    this.configuration_ = ngeoOfflineConfiguration;
  }

  /**
   * @public
   * @param {ol.Map} map
   * @return {Promise<ol.Extent>}
   */
  restore(map) {
    return this.configuration_.getItem('offline_content').then(offlineContent => this.doRestore_(map, offlineContent));
  }

  /**
   * @param {ol.Map} map
   * @param {ngeox.OfflinePersistentContent} offlineContent
   * @return {ol.Extent}
   */
  doRestore_(map, offlineContent) {
    map.getLayerGroup().getLayers().clear();
    for (const offlineLayer of offlineContent.layers) {
      const layer = this.configuration_.recreateOfflineLayer(offlineLayer);
      if (layer) {
        map.addLayer(layer);
      }
    }
    return offlineContent.extent;
  }
}

const name = 'ngeoOfflineRestorer';
Restorer.module = angular.module(name, []).service(name, Restorer);

exports = Restorer;
