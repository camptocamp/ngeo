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

import {DEVICE_PIXEL_RATIO} from 'ol/has.js';
import olSourceTileWMS from 'ol/source/TileWMS.js';
import olSourceWMTS from 'ol/source/WMTS.js';
import TilesDownloader from 'ngeo/offline/TilesDownloader.js';
import angular from 'angular';

/**
 * @param {import("ol/coordinate.js").Coordinate} a Some coordinates.
 * @param {import("ol/coordinate.js").Coordinate} b Some other coordinates.
 * @return {number} The squared magnitude.
 */
function magnitude2(a, b) {
  let magnitudeSquared = 0;
  for (let i = 0; i < a.length; ++i) {
    magnitudeSquared += Math.pow(a[i] - b[i], 2);
  }
  return magnitudeSquared;
}

const Downloader = class {
  /**
   * @ngInject
   * @param {import("ngeo/offline/Configuration.js").default} ngeoOfflineConfiguration
   * A service for customizing offline behaviour.
   */
  constructor(ngeoOfflineConfiguration) {
    /**
     * @private
     * @type {import("ngeo/offline/Configuration.js").default}
     */
    this.configuration_ = ngeoOfflineConfiguration;

    /**
     * @type {?TilesDownloader}
     * @private
     */
    this.tileDownloader_ = null;
  }

  cancel() {
    if (this.tileDownloader_) {
      this.tileDownloader_.cancel();
    }
  }

  /**
   * @param {import("./index.js").OfflineLayerMetadata} layerMetadata Layers metadata.
   * @param {import("./index.js").OfflineTile[]} queue Queue of tiles to download.
   */
  queueLayerTiles_(layerMetadata, queue) {
    const source = /** @type {olSourceTileWMS|olSourceWMTS} */ (layerMetadata.source);
    const {map, extentByZoom} = layerMetadata;

    if (!source) {
      return;
    }
    console.assert(source instanceof olSourceTileWMS || source instanceof olSourceWMTS);
    const projection = map.getView().getProjection();
    const tileGrid = source.getTileGrid();
    const tileUrlFunction = source.getTileUrlFunction();

    console.assert(extentByZoom);
    for (const extentZoom of extentByZoom) {
      const z = extentZoom.zoom;
      const extent = extentZoom.extent;
      /**
       * @type {import("./index.js").OfflineTile[]}
       */
      const queueByZ = [];
      /**
       * @type {number}
       */
      let minX;
      /**
       * @type {number}
       */
      let minY;
      /**
       * @type {number}
       */
      let maxX;
      /**
       * @type {number}
       */
      let maxY;
      tileGrid.forEachTileCoord(extent, z, (coord) => {
        maxX = coord[1];
        maxY = coord[2];
        if (minX === undefined || minY === undefined) {
          minX = coord[1];
          minY = coord[2];
        }
        const url = tileUrlFunction(coord, DEVICE_PIXEL_RATIO, projection);
        console.assert(url);

        if (url) {
          /**
           * @type {import("./index.js").OfflineTile}
           */
          const tile = {coord, url, response: null};
          queueByZ.push(tile);
        }
      });

      const centerTileCoord = [z, (minX + maxX) / 2, (minY + maxY) / 2];
      queueByZ.sort((a, b) => magnitude2(a.coord, centerTileCoord) - magnitude2(b.coord, centerTileCoord));
      queue.push(...queueByZ);
    }
  }

  /**
   * @param {import("ol/extent.js").Extent} extent The extent to download.
   * @param {import("ol/Map.js").default} map The map to work on.
   * @return {Promise<*>} A promise resolving when save is finished.
   */
  save(extent, map) {
    /**
     * @type {!import("./index.js").OfflineLayerMetadata[]}
     */
    const layersMetadatas = this.configuration_.createLayerMetadatas(map, extent);

    /**
     * @type {!import("./index.js").OfflinePersistentLayer[]}
     */
    const persistentLayers = [];
    /**
     * @type {import("./index.js").OfflineTile[]}
     */
    const queue = [];
    /**
     * @type {number[]}
     */
    const zooms = [];
    for (const layerItem of layersMetadatas) {
      if (layerItem.layerType === 'tile') {
        /**
         * @type {import("./index.js").OfflineTile[]}
         */
        const tiles = [];
        this.queueLayerTiles_(layerItem, tiles);
        queue.push(...tiles);
      }
      persistentLayers.push({
        backgroundLayer: layerItem.backgroundLayer,
        layerType: layerItem.layerType,
        layerSerialization: layerItem.layerSerialization,
        key: this.configuration_.getLayerKey(layerItem),
      });

      layerItem.extentByZoom.forEach((obj) => {
        const zoom = obj.zoom;
        if (!zooms.includes(zoom)) {
          zooms.push(zoom);
        }
      });
    }

    /**
     * @type {import("./index.js").OfflinePersistentContent}
     */
    const persistentObject = {
      extent: extent,
      layers: persistentLayers,
      zooms: zooms.sort((a, b) => (a < b ? -1 : 1)),
    };
    const setOfflineContentPromise = this.configuration_.setItem('offline_content', persistentObject);

    const maxDownloads = this.configuration_.getMaxNumberOfParallelDownloads();
    this.tileDownloader_ = new TilesDownloader(queue, this.configuration_, maxDownloads);
    const tileDownloadPromise = this.tileDownloader_.download();

    const allPromise = Promise.all([setOfflineContentPromise, tileDownloadPromise]);
    const setHasOfflineData = () => this.configuration_.setHasOfflineData(true);
    allPromise.then(setHasOfflineData, setHasOfflineData);
    return allPromise;
  }
};

const name = 'offlineDownloader';
Downloader.module = angular.module(name, []).service(name, Downloader);

const exports = Downloader;

export default exports;
