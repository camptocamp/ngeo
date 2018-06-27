goog.module('ngeo.offline.DefaultConfiguration');
goog.module.declareLegacyNamespace();

goog.require('ol.Observable');
goog.require('ol.layer.Layer');
goog.require('ol.layer.Vector');
goog.require('ol.layer.Tile');
goog.require('ol.layer.Image');
goog.require('ol.proj');
goog.require('ol.source.Image');
goog.require('ol.source.ImageWMS');
goog.require('ol.source.TileWMS');
goog.require('ol.tilegrid');
const SerializerDeserializer = goog.require('ngeo.offline.SerializerDeserializer');

goog.require('ngeo.CustomEvent');

const utils = goog.require('ngeo.offline.utils');
const defaultImageLoadFunction = ol.source.Image.defaultImageLoadFunction;


/**
 * @implements {ngeox.OfflineConfiguration}
 */
exports = class extends ol.Observable {

  /**
   * @ngInject
   * @param {!angular.Scope} $rootScope The rootScope provider.
   * @param {ngeo.map.BackgroundLayerMgr} ngeoBackgroundLayerMgr
   */
  constructor($rootScope, ngeoBackgroundLayerMgr) {
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
     * @type {!angular.Scope}
     */
    this.rootScope_ = $rootScope;

    /**
     * @private
     * @type {boolean}
     */
    this.hasDataPreviousValue_ = false;
    this.hasOfflineDataForWatcher();

    /**
     * @private
     * @type {ngeo.map.BackgroundLayerMgr}
     */
    this.ngeoBackgroundLayerMgr_ = ngeoBackgroundLayerMgr;

    /**
     * @private
     * @type {ngeo.offline.SerializerDeserializer}
     */
    this.serDes_ = new SerializerDeserializer();
  }

  /**
   * A synchronous method to be used by Angular watchers.
   * @return {boolean} whether some offline data is available in the storage
   * @override
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
   * @return {Promise<?>}
   * @override
   */
  getItem(key) {
    return localforage.getItem(key);
  }

  /**
   * @param {string} key
   * @param {*} value
   * @return {Promise}
   * @override
   */
  setItem(key, value) {
    return localforage.setItem(key, value);
  }

  /**
   * @return {Promise}
   * @override
   */
  clear() {
    return localforage.clear();
  }

  /**
   * @param {ngeox.OfflineLayerMetadata} layerItem
   * @return {string} A key identifying an offline layer and used during restore.
   * @override
   */
  getLayerKey(layerItem) {
    return /** @type {string} */ (layerItem.layer.get('label'));
  }

  /**
   * @override
   * @return {ngeox.OfflineCallbacks} Offline callbacks.
   */
  getCallbacks() {
    const dispatchProgress = this.dispatchProgress_.bind(this);
    return {
      onLoad(progress) {
        dispatchProgress(progress);
      },
      onError(progress) {
        dispatchProgress(progress);
      },
    };
  }

  /**
    * @param {ol.Map} map
    * @param {ol.layer.Layer} layer
    * @param {Array<ol.layer.Group>} ancestors
    * @param {ol.Extent} userExtent The extent selected by the user.
    * @return {Array<ngeox.OfflineExtentByZoom>}
   */
  getExtentByZoom(map, layer, ancestors, userExtent) {
    const currentZoom = map.getView().getZoom();
    // const viewportExtent = map.calculateExtent(map.getSize());

    const results = [];
    [0, 1, 2, 3, 4].forEach((dz) => {
      results.push({
        zoom: currentZoom + dz,
        extent: userExtent
      });
    });
    return results;
  }

  /**
   * @private
   * @param {ol.source.Source} source
   * @param {ol.proj.Projection} projection
   * @return {ol.source.Source}
   */
  sourceImageWMSToTileWMS_(source, projection) {
    if (source instanceof ol.source.ImageWMS && source.getUrl() && source.getImageLoadFunction() === defaultImageLoadFunction) {
      const tileGrid = ol.tilegrid.getForProjection(source.getProjection() || projection);
      source = new ol.source.TileWMS({
        url: source.getUrl(),
        tileGrid: tileGrid,
        attributions: source.getAttributions(),
        projection: source.getProjection(),
        params: source.getParams()
      });
    }
    return source;
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
        const projection = ol.proj.get(map.getView().getProjection());
        const source = this.sourceImageWMSToTileWMS_(layer.getSource(), projection);
        let layerType;
        let layerSerialization;
        if (layer instanceof ol.layer.Tile || layer instanceof ol.layer.Image) {
          layerType = 'tile';
          layerSerialization = this.serDes_.serializeTileLayer(layer, source);
        } else if (layer instanceof ol.layer.Vector) {
          layerType = 'vector';
        }

        layersItems.push({
          backgroundLayer: this.ngeoBackgroundLayerMgr_.get(map) === layer,
          map,
          extentByZoom,
          layerType,
          layerSerialization,
          layer,
          source,
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

  /**
   * @private
   * @param {ngeox.OfflinePersistentLayer} offlineLayer
   * @return {function(ol.ImageTile, string)}
   */
  createTileLoadFunction_(offlineLayer) {
    /**
     * Load the tile from persistent storage.
     * @param {ol.ImageTile} imageTile
     * @param {string} src
     */
    const tileLoadFunction = function(imageTile, src) {
      // FIXME: ideally we should not load all the storage in memory
      let content = offlineLayer.tiles[utils.normalizeURL(src)];
      if (!content) {
        // use a white 1x1 image to make the map consistent
        content = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=';
      }
      imageTile.getImage().src = content;
    };
    return tileLoadFunction;
  }

  /**
   * @override
   * @param {ngeox.OfflinePersistentLayer} offlineLayer
   * @return {ol.layer.Layer} the layer.
   */
  recreateOfflineLayer(offlineLayer) {
    if (offlineLayer.layerType === 'tile') {
      const serialization = offlineLayer.layerSerialization;
      const tileLoadFunction = this.createTileLoadFunction_(offlineLayer);
      const layer = this.serDes_.deserializeTileLayer(serialization, tileLoadFunction);
      return layer;
    }
    return null;
  }
};
