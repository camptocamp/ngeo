/**
 * @module ngeo.offline.Configuration
 */
import olObservable from 'ol/Observable.js';
import olLayerLayer from 'ol/layer/Layer.js';
import olLayerVector from 'ol/layer/Vector.js';
import olLayerTile from 'ol/layer/Tile.js';
import olLayerImage from 'ol/layer/Image.js';
import * as olProj from 'ol/proj.js';
import olSourceImage from 'ol/source/Image.js';
import olSourceImageWMS from 'ol/source/ImageWMS.js';
import olSourceTileWMS from 'ol/source/TileWMS.js';
import {createForProjection as createTileGridForProjection} from 'ol/tilegrid.js';
import SerializerDeserializer from 'ngeo/offline/SerializerDeserializer.js';
import ngeoCustomEvent from 'ngeo/CustomEvent.js';
import utils from 'ngeo/offline/utils.js';
const defaultImageLoadFunction = olSourceImage.defaultImageLoadFunction;


/**
 * @implements {ngeox.OfflineOnTileDownload}
 */
const exports = class extends olObservable {

  /**
   * @ngInject
   * @param {!angular.Scope} $rootScope The rootScope provider.
   * @param {ngeo.map.BackgroundLayerMgr} ngeoBackgroundLayerMgr The background layer manager
   * @param {number} ngeoOfflineGutter A gutter around the tiles to download (to avoid cut symbols)
   */
  constructor($rootScope, ngeoBackgroundLayerMgr, ngeoOfflineGutter) {
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
      this.dispatchEvent(new ngeoCustomEvent('progress', {
        'progress': progress
      }));
    };

    /**
     * @private
     * @type {!angular.Scope}
     */
    this.rootScope_ = $rootScope;

    /**
     * @protected
     * @type {boolean}
     */
    this.hasData = false;
    this.initializeHasOfflineData();

    /**
     * @private
     * @type {ngeo.map.BackgroundLayerMgr}
     */
    this.ngeoBackgroundLayerMgr_ = ngeoBackgroundLayerMgr;

    /**
     * @private
     * @type {ngeo.offline.SerializerDeserializer}
     */
    this.serDes_ = new SerializerDeserializer({gutter: ngeoOfflineGutter});

    /**
     * @private
     * @type {number}
     */
    this.gutter_ = ngeoOfflineGutter;
  }

  /**
   * @protected
   */
  initializeHasOfflineData() {
    this.getItem('offline_content').then(value => this.setHasOfflineData(!!value));
  }

  /**
   * @return {boolean} whether some offline data is available in the storage
   */
  hasOfflineData() {
    return this.hasData;
  }

  /**
   * @param {boolean} value whether there is offline data available in the storage.
   */
  setHasOfflineData(value) {
    const needDigest = value ^ this.hasData;
    this.hasData = value;
    if (needDigest) {
      this.rootScope_.$applyAsync(); // force update of the UI
    }
  }

  /**
   * Hook to allow measuring get/set item performance.
   * @param {string} msg A message
   * @param {string} key The key to work on
   * @param {Promise<?>} promise A promise
   * @return {Promise<?>} The promise we passed
   */
  traceGetSetItem(msg, key, promise) {
    return promise;
  }

  /**
   * @param {string} key The key
   * @return {Promise<?>} A promise
   */
  getItem(key) {
    return this.traceGetSetItem('getItem', key, localforage.getItem(key));
  }

  /**
   * @param {string} key The key
   * @param {*} value A value
   * @return {Promise<?>} A promise
   */
  setItem(key, value) {
    return this.traceGetSetItem('setItem', key, localforage.setItem(key, value));
  }

  /**
   * @return {Promise} A promise
   */
  clear() {
    this.setHasOfflineData(false);
    return this.traceGetSetItem('clear', '', localforage.clear());
  }

  /**
   * @param {!ol.Map} map A map
   * @return {number} An "estimation" of the size of the data to download
   */
  estimateLoadDataSize(map) {
    return 50;
  }

  /**
   * @param {ngeox.OfflineLayerMetadata} layerItem The layer metadata
   * @return {string} A key identifying an offline layer and used during restore.
   */
  getLayerKey(layerItem) {
    return /** @type {string} */ (layerItem.layer.get('label'));
  }

  /**
   * @override
   * @param {number} progress The download progress
   * @param {ngeox.OfflineTile} tile The tile
   * @return {Promise} A promise
   */
  onTileDownloadSuccess(progress, tile) {
    this.dispatchProgress_(progress);

    if (tile.response) {
      return this.setItem(utils.normalizeURL(tile.url), tile.response);
    }
    return Promise.resolve();
  }

  /**
   * @override
   * @param {number} progress The progress
   * @return {Promise} A promise
   */
  onTileDownloadError(progress) {
    this.dispatchProgress_(progress);
    return Promise.resolve();
  }

  /**
    * @param {ol.Map} map A map
    * @param {ol.layer.Layer} layer A layer
    * @param {Array<ol.layer.Group>} ancestors The ancestors of that layer
    * @param {ol.Extent} userExtent The extent selected by the user.
    * @return {Array<ngeox.OfflineExtentByZoom>} The extent to download per zoom level
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
   * @protected
   * @param {ol.source.Source} source An ImageWMS source
   * @param {ol.proj.Projection} projection The projection
   * @return {ol.source.Source} A tiled equivalent source
   */
  sourceImageWMSToTileWMS(source, projection) {
    if (source instanceof olSourceImageWMS && source.getUrl() && source.getImageLoadFunction() === defaultImageLoadFunction) {
      const tileGrid = createTileGridForProjection(source.getProjection() || projection, 42, 256);
      source = new olSourceTileWMS({
        gutter: this.gutter_,
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
      if (layer instanceof olLayerLayer) {
        const extentByZoom = this.getExtentByZoom(map, layer, ancestors, userExtent);
        const projection = olProj.get(map.getView().getProjection());
        const source = this.sourceImageWMSToTileWMS(layer.getSource(), projection);
        let layerType;
        let layerSerialization;
        if (layer instanceof olLayerTile || layer instanceof olLayerImage) {
          layerType = 'tile';
          layerSerialization = this.serDes_.serializeTileLayer(layer, source);
        } else if (layer instanceof olLayerVector) {
          layerType = 'vector';
        }

        const backgroundLayer = this.ngeoBackgroundLayerMgr_.get(map) === layer;
        layersItems.push({
          backgroundLayer,
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
   * @param {ngeox.OfflinePersistentLayer} offlineLayer The offline layer
   * @return {function(ol.ImageTile, string)} the tile function
   */
  createTileLoadFunction_(offlineLayer) {
    const that = this;
    /**
     * Load the tile from persistent storage.
     * @param {ol.ImageTile} imageTile The image tile
     * @param {string} src The tile URL
     */
    const tileLoadFunction = function(imageTile, src) {
      that.getItem(utils.normalizeURL(src)).then((content) => {
        if (!content) {
          // use a transparent 1x1 image to make the map consistent
          content = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
        }
        imageTile.getImage().src = content;
      });
    };
    return tileLoadFunction;
  }

  /**
   * @param {ngeox.OfflinePersistentLayer} offlineLayer The layer to recreate
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

  /**
   * @return {number} The number
   */
  getMaxNumberOfParallelDownloads() {
    return 11;
  }
};


export default exports;
