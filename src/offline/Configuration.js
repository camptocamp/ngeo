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

import olObservable from 'ol/Observable';
import olLayerLayer from 'ol/layer/Layer';
import olLayerVector from 'ol/layer/Vector';
import olLayerTile from 'ol/layer/Tile';
import olLayerImage from 'ol/layer/Image';
import * as olProj from 'ol/proj';
import {defaultImageLoadFunction} from 'ol/source/Image';
import olSourceImageWMS from 'ol/source/ImageWMS';
import olSourceTileWMS from 'ol/source/TileWMS';
import {createForProjection as createTileGridForProjection} from 'ol/tilegrid';
import SerializerDeserializer from 'ngeo/offline/SerializerDeserializer';
import LocalforageCordovaWrapper from 'ngeo/offline/LocalforageCordovaWrapper';
import LocalforageAndroidWrapper from 'ngeo/offline/LocalforageAndroidWrapper';
import LocalforageIosWrapper from 'ngeo/offline/LocalforageIosWrapper';
import ngeoCustomEvent from 'ngeo/CustomEvent';
import {normalizeURL, traverseLayer} from 'ngeo/offline/utils';
// @ts-ignore
import localforage from 'localforage/src/localforage';

/**
 * implements {import('ngeo/offline/index').OfflineOnTileDownload}
 */
export default class extends olObservable {
  /**
   * @ngInject
   * @param {!angular.IScope} $rootScope The rootScope provider.
   * @param {!import('ngeo/map/BackgroundLayerMgr').MapBackgroundLayerManager} ngeoBackgroundLayerMgr
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
     * @type {!import('ngeo/map/BackgroundLayerMgr').MapBackgroundLayerManager}
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
   * @returns {boolean} whether some offline data is available in the storage
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
   *
   * @param {string} msg A message
   * @param {string} key The key to work on
   * @param {Promise<?>} promise A promise
   * @returns {Promise<?>} The promise we passed
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
   * @returns {Promise<?>} A promise
   */
  getItem(key) {
    const promise = this.localforage_['getItem'](key);
    return this.traceGetSetItem('getItem', key, promise);
  }

  /**
   * @param {string} key .
   * @returns {Promise<?>} .
   */
  removeItem(key) {
    const promise = this.localforage_['removeItem'](key);
    return this.traceGetSetItem('removeItem', key, promise);
  }

  /**
   * @param {string} key The key
   * @param {*} value A value
   * @returns {Promise<?>} A promise
   */
  setItem(key, value) {
    const promise = this.localforage_['setItem'](key, value);
    return this.traceGetSetItem('setItem', key, promise);
  }

  /**
   * @returns {Promise<void>} A promise
   */
  clear() {
    this.setHasOfflineData(false);
    const promise = this.localforage_.clear();
    return this.traceGetSetItem('clear', '', promise);
  }

  /**
   * @param {!import('ol/Map').default} map A map
   * @returns {number} An "estimation" of the size of the data to download
   */
  estimateLoadDataSize(map) {
    return 50;
  }

  /**
   * @param {import('./index').OfflineLayerMetadata} layerItem The layer metadata
   * @returns {string} A key identifying an offline layer and used during restore.
   */
  getLayerKey(layerItem) {
    return /** @type {string} */ (layerItem.layer.get('label'));
  }

  /**
   * @param {number} progress The download progress
   * @param {import('./index').OfflineTile} tile The tile
   * @returns {Promise<void>} A promise
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
   * @returns {Promise<void>} A promise
   */
  onTileDownloadError(progress) {
    this.dispatchProgress_(progress);
    return Promise.resolve();
  }

  /**
   * @param {import('ol/Map').default} map A map
   * @param {import('ol/layer/Layer').default<import('ol/source/Source').default>} layer A layer
   * @param {import('ol/layer/Group').default[]} ancestors The ancestors of that layer
   * @param {import('ol/extent').Extent} userExtent The extent selected by the user.
   * @returns {import('./index').OfflineExtentByZoom[]} The extent to download per zoom level
   */
  getExtentByZoom(map, layer, ancestors, userExtent) {
    const currentZoom = map.getView().getZoom();
    if (currentZoom === undefined) {
      throw new Error('Missing currentZoom');
    }
    /**
     * @type {import('./index').OfflineExtentByZoom[]}
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
   * @param {import('ol/source/Source').default} source An ImageWMS source
   * @param {!import('ol/proj/Projection').default} projection The projection
   * @returns {import('ol/source/Source').default} A tiled equivalent source
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
   * @param {import('ol/Map').default} map The map to work on.
   * @param {import('ol/extent').Extent} userExtent The extent selected by the user.
   * @returns {!import('./index').OfflineLayerMetadata[]} the downloadable layers and metadata.
   */
  createLayerMetadatas(map, userExtent) {
    /**
     * @type {import('./index').OfflineLayerMetadata[]}
     */
    const layersItems = [];

    /**
     * @param {import('ol/layer/Base').default} layer .
     * @param {import('ol/layer/Group').default[]} ancestors .
     * @returns {boolean} whether to traverse this layer children.
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
   * @param {import('./index').OfflinePersistentLayer} offlineLayer The offline layer
   * @returns {function(import('ol/ImageTile').default, string)} the tile function
   */
  createTileLoadFunction_(offlineLayer) {
    /**
     * Load the tile from persistent storage.
     *
     * @param {import('ol/ImageTile').default} imageTile The image tile
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
   * @param {import('./index').OfflinePersistentLayer} offlineLayer The layer to recreate
   * @returns {?import('ol/layer/Layer').default<import('ol/source/Source').default>} the layer.
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
   * @returns {number} The number
   */
  getMaxNumberOfParallelDownloads() {
    return 11;
  }
}
