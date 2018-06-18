goog.module('ngeo.offline.DefaultConfiguration');
goog.module.declareLegacyNamespace();

goog.require('ol.Observable');
goog.require('ol.layer.Layer');
goog.require('ol.layer.Vector');
goog.require('ol.layer.Tile');
goog.require('ol.layer.Image');

goog.require('ngeo.CustomEvent');

const utils = goog.require('ngeo.offline.utils');


/**
 * @implements {ngeox.OfflineConfiguration}
 */
exports = class extends ol.Observable {

  /**
   * @param {!angular.Scope} $rootScope The rootScope provider.
   */
  constructor($rootScope) {
    super();
    localforage.config({
      'name': 'ngeoOfflineStorage',
      'version': 1.0,
      'storeName': 'offlineStorage'
    });
    /**
     * @param {number} progress new progress.
     */
    this.dispatchProgress_ = (progress) => {
      this.dispatchEvent(new ngeo.CustomEvent('progress', {
        'progress': progress
      }));
    };

    /**
     * @private
     * @param {!angular.Scope} $rootScope The rootScope provider.
     */
    this.rootScope_ = $rootScope;

    /**
     * @private
     * @type {boolean}
     */
    this.hasDataPreviousValue_ = false;
    this.hasOfflineDataForWatcher();
  }

  /**
   * A synchronous method to be used by Angular watchers.
   * @return {boolean} whether some offline data is available in the storage
   */
  hasOfflineDataForWatcher() {
    localforage.length().then((numberOfKeys) => {
      const hasData = numberOfKeys !== 0;
      if (hasData ^ this.hasDataPreviousValue_) {
        this.hasDataPreviousValue_ = hasData;
        this.rootScope_.$apply();
      }
    });
    return this.hasDataPreviousValue_;
  }

  /**
   * @param {string} key
   * @return {Promise<*>}
   */
  getItem(key) {
    return localforage.getItem(key);
  }

  /**
   * @param {string} key
   * @param {*} value
   * @return {Promise<*>}
   */
  setItem(key, value) {
    return localforage.setItem(key, value);
  }

  /**
   * @return {Promise<*>}
   */
  clear() {
    return localforage.clear();
  }

  /**
   * @param {ngeox.OfflineLayerMetadata} layerItem
   * @return {string} A key identifying an offline layer and used during restore.
   */
  getLayerKey(layerItem) {
    return layerItem.layer.get('label');
  }

  /**
   * @override
   * @return {ngeox.OfflineCallbacks} Offline callbacks.
   */
  getCallbacks() {
    const dispatchProgress = this.dispatchProgress_.bind(this);
    return {
      onLoad(progress) {
        console.log(100 * progress, '%');
        dispatchProgress(progress);
      },
      onError(progress) {
        console.log('X');
        dispatchProgress(progress);
      },
    };
  }

  /**
    * @param {ol.Map} map
    * @param {ol.layer.Layer} layer
    * @param {Array<ol.layer.Group>} ancestors
    * @param {ol.Extent} userExtent The extent selected by the user.
    * @return {ngeox.OfflineExtentByZoom}
   */
  getExtentByZoom(map, layer, ancestors, userExtent) {
    const currentZoom = map.getView().getZoom();
    // const viewportExtent = map.calculateExtent(map.getSize());

    return [0, 1, 2, 3, 4].map((dz) => {
      return {
        zoom: currentZoom + dz,
        extent: userExtent
      };
    });
  }

  /**
   * @override
   * @param {ol.Map} map The map to work on.
   * @param {ol.Extent} userExtent The extent selected by the user.
   * @return {!Array<ngeox.OfflineLayerMetadata>} the downloadable layers and metadata.
   */
  createLayerMetadatas(map, userExtent) {
    const layersItems = [];

    /**
     * @param {ol.layer.Base} layer .
     * @param {Array<ol.layer.Group>} ancestors .
     * @return {boolean} whether to traverse this layer children.
     */
    const visitLayer = (layer, ancestors) => {
      if (layer instanceof ol.layer.Layer) {
        const extentByZoom = this.getExtentByZoom(map, layer, ancestors, userExtent);
        let type;
        if (layer instanceof ol.layer.Vector) {
          type = 'vector';
        } else if (layer instanceof ol.layer.Tile || layer instanceof ol.layer.Image) {
          type = 'tile';
        }

        layersItems.push({
          map,
          extentByZoom,
          type,
          layer,
          ancestors
        });
      }
      return true;
    };
    map.getLayers().forEach((root) => {
      utils.traverseLayer(root, [], visitLayer);
    });
    return layersItems;
  }
};
