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

import olObservable from 'ol/Observable.js';
import olLayerLayer from 'ol/layer/Layer.js';
import olLayerVector from 'ol/layer/Vector.js';
import olLayerTile from 'ol/layer/Tile.js';
import olLayerImage from 'ol/layer/Image.js';
import * as olProj from 'ol/proj.js';
import {defaultImageLoadFunction} from 'ol/source/Image.js';
import olSourceImageWMS from 'ol/source/ImageWMS.js';
import olSourceTileWMS from 'ol/source/TileWMS.js';
import {createForProjection as createTileGridForProjection} from 'ol/tilegrid.js';
import SerializerDeserializer from 'ngeo/offline/SerializerDeserializer.js';
import LocalforageCordovaWrapper from 'ngeo/offline/LocalforageCordovaWrapper.js';
import LocalforageAndroidWrapper from 'ngeo/offline/LocalforageAndroidWrapper.js';
import LocalforageIosWrapper from 'ngeo/offline/LocalforageIosWrapper.js';
import ngeoCustomEvent from 'ngeo/CustomEvent.js';
import {normalizeURL, traverseLayer} from 'ngeo/offline/utils.js';
// @ts-ignore
import localforage from 'localforage/src/localforage.js';

/**
 * implements {import('ngeo/offline/index.js').OfflineOnTileDownload}
 */
export default class extends olObservable {
  /**
   * @ngInject
   * @param {!angular.IScope} $rootScope The rootScope provider.
   * @param {!import("ngeo/map/BackgroundLayerMgr.js").MapBackgroundLayerManager} ngeoBackgroundLayerMgr
   *    Background layer manager.
   * @param {number} ngeoOfflineGutter A gutter around the tiles to download (to avoid cut symbols)
   */
  constructor($rootScope, ngeoBackgroundLayerMgr, ngeoOfflineGutter) {
    super();

    this.localforage_ = this.createLocalforage();
    this.configureLocalforage();

    /**
     * @private
     * @type {!angular.IScope}
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
     * @type {!import("ngeo/map/BackgroundLayerMgr.js").MapBackgroundLayerManager}
     */
    this.ngeoBackgroundLayerMgr_ = ngeoBackgroundLayerMgr;

    /**
     * @private
     * @type {SerializerDeserializer}
     */
    // @ts-ignore
    this.serDes_ = new SerializerDeserializer({gutter: ngeoOfflineGutter});

    /**
     * @private
     * @type {number}
     */
    this.gutter_ = ngeoOfflineGutter;
  }

  /**
   * @private
   * @param {number} progress new progress.
   */
  dispatchProgress_(progress) {
    this.dispatchEvent(
      new ngeoCustomEvent('progress', {
        'progress': progress,
      })
    );
  }

  /**
   * @protected
   */
  initializeHasOfflineData() {
    this.getItem('offline_content').then((value) => this.setHasOfflineData(!!value));
  }

  /**
   * @export
   * @return {boolean} whether some offline data is available in the storage
   */
  hasOfflineData() {
    return this.hasData;
  }

  /**
   * @param {boolean} value whether there is offline data available in the storage.
   */
  setHasOfflineData(value) {
    const needDigest = value !== this.hasData;
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

  createLocalforage() {
    if (location.search.includes('localforage=cordova')) {
      console.log('Using cordova localforage');
      return new LocalforageCordovaWrapper();
    } else if (location.search.includes('localforage=android')) {
      console.log('Using android localforage');
      return new LocalforageAndroidWrapper();
    } else if (location.search.includes('localforage=ios')) {
      console.log('Using ios localforage');
      return new LocalforageIosWrapper();
    }
    return localforage;
  }

  configureLocalforage() {
    this.localforage_.config({
      'name': 'ngeoOfflineStorage',
      'version': 1.0,
      'storeName': 'offlineStorage',
    });
  }

  /**
   * @param {string} key The key
   * @return {Promise<?>} A promise
   */
  getItem(key) {
    const promise = this.localforage_['getItem'](key);
    return this.traceGetSetItem('getItem', key, promise);
  }

  /**
   * @param {string} key .
   * @return {Promise<?>} .
   */
  removeItem(key) {
    const promise = this.localforage_['removeItem'](key);
    return this.traceGetSetItem('removeItem', key, promise);
  }

  /**
   * @param {string} key The key
   * @param {*} value A value
   * @return {Promise<?>} A promise
   */
  setItem(key, value) {
    const promise = this.localforage_['setItem'](key, value);
    return this.traceGetSetItem('setItem', key, promise);
  }

  /**
   * @return {Promise<void>} A promise
   */
  clear() {
    this.setHasOfflineData(false);
    const promise = this.localforage_.clear();
    return this.traceGetSetItem('clear', '', promise);
  }

  /**
   * @param {!import("ol/Map.js").default} map A map
   * @return {number} An "estimation" of the size of the data to download
   */
  estimateLoadDataSize(map) {
    return 50;
  }

  /**
   * @param {import("./index.js").OfflineLayerMetadata} layerItem The layer metadata
   * @return {string} A key identifying an offline layer and used during restore.
   */
  getLayerKey(layerItem) {
    return /** @type {string} */ (layerItem.layer.get('label'));
  }

  /**
   * @param {number} progress The download progress
   * @param {import("./index.js").OfflineTile} tile The tile
   * @return {Promise<void>} A promise
   */
  onTileDownloadSuccess(progress, tile) {
    this.dispatchProgress_(progress);

    if (tile.response) {
      return this.setItem(normalizeURL(tile.url), tile.response);
    }
    return Promise.resolve();
  }

  /**
   * @param {number} progress The progress
   * @return {Promise<void>} A promise
   */
  onTileDownloadError(progress) {
    this.dispatchProgress_(progress);
    return Promise.resolve();
  }

  /**
   * @param {import("ol/Map.js").default} map A map
   * @param {import("ol/layer/Layer.js").default<import("ol/source/Source.js").default>} layer A layer
   * @param {import("ol/layer/Group.js").default[]} ancestors The ancestors of that layer
   * @param {import("ol/extent.js").Extent} userExtent The extent selected by the user.
   * @return {import("./index.js").OfflineExtentByZoom[]} The extent to download per zoom level
   */
  getExtentByZoom(map, layer, ancestors, userExtent) {
    const currentZoom = map.getView().getZoom();
    if (currentZoom === undefined) {
      throw new Error('Missing currentZoom');
    }
    /**
     * @type {import("./index.js").OfflineExtentByZoom[]}
     */
    const results = [];
    [0, 1, 2, 3, 4].forEach((dz) => {
      results.push({
        zoom: currentZoom + dz,
        extent: userExtent,
      });
    });
    return results;
  }

  /**
   * @protected
   * @param {import("ol/source/Source.js").default} source An ImageWMS source
   * @param {!import("ol/proj/Projection.js").default} projection The projection
   * @return {import("ol/source/Source.js").default} A tiled equivalent source
   */
  sourceImageWMSToTileWMS(source, projection) {
    if (
      source instanceof olSourceImageWMS &&
      source.getUrl() &&
      source.getImageLoadFunction() === defaultImageLoadFunction
    ) {
      const tileGrid = createTileGridForProjection(source.getProjection() || projection, 42, 256);
      const attributions = source.getAttributions() || '';
      const url = source.getUrl();
      if (!url || !attributions) {
        throw new Error('Invalid values');
      }
      source = new olSourceTileWMS({
        gutter: this.gutter_,
        url,
        tileGrid,
        attributions,
        projection: source.getProjection(),
        params: source.getParams(),
      });
    }
    return source;
  }

  /**
   * @param {import("ol/Map.js").default} map The map to work on.
   * @param {import("ol/extent.js").Extent} userExtent The extent selected by the user.
   * @return {!import("./index.js").OfflineLayerMetadata[]} the downloadable layers and metadata.
   */
  createLayerMetadatas(map, userExtent) {
    /**
     * @type {import("./index.js").OfflineLayerMetadata[]}
     */
    const layersItems = [];

    /**
     * @param {import("ol/layer/Base.js").default} layer .
     * @param {import("ol/layer/Group.js").default[]} ancestors .
     * @return {boolean} whether to traverse this layer children.
     */
    const visitLayer = (layer, ancestors) => {
      if (layer instanceof olLayerLayer) {
        const extentByZoom = this.getExtentByZoom(map, layer, ancestors, userExtent);
        const projection = olProj.get(map.getView().getProjection());
        const source = this.sourceImageWMSToTileWMS(layer.getSource(), projection);
        /**
         * @type {string|undefined}
         */
        let layerType;
        /**
         * @type {string|undefined}
         */
        let layerSerialization;
        if (layer instanceof olLayerTile || layer instanceof olLayerImage) {
          layerType = 'tile';
          // @ts-ignore
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
          ancestors,
        });
      }
      return true;
    };
    map.getLayers().forEach((root) => {
      traverseLayer(root, [], visitLayer);
    });
    return layersItems;
  }

  /**
   * @private
   * @param {import("./index.js").OfflinePersistentLayer} offlineLayer The offline layer
   * @return {function(import("ol/ImageTile.js").default, string)} the tile function
   */
  createTileLoadFunction_(offlineLayer) {
    /**
     * Load the tile from persistent storage.
     * @param {import("ol/ImageTile.js").default} imageTile The image tile
     * @param {string} src The tile URL
     */
    const tileLoadFunction = (imageTile, src) => {
      this.getItem(normalizeURL(src)).then((content) => {
        if (!content) {
          // use a transparent 1x1 image to make the map consistent
          /* eslint-disable-next-line */
          content =
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
        }
        /** @type {HTMLImageElement} */ (imageTile.getImage()).src = content;
      });
    };
    return tileLoadFunction;
  }

  /**
   * @param {import("./index.js").OfflinePersistentLayer} offlineLayer The layer to recreate
   * @return {?import("ol/layer/Layer.js").default<import("ol/source/Source.js").default>} the layer.
   */
  recreateOfflineLayer(offlineLayer) {
    if (offlineLayer.layerType === 'tile') {
      const serialization = offlineLayer.layerSerialization;
      if (serialization) {
        const tileLoadFunction = this.createTileLoadFunction_(offlineLayer);
        // @ts-ignore
        const layer = this.serDes_.deserializeTileLayer(serialization, tileLoadFunction);
        return layer;
      }
    }
    return null;
  }

  /**
   * @return {number} The number
   */
  getMaxNumberOfParallelDownloads() {
    return 11;
  }
}
