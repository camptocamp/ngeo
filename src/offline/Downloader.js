goog.module('ngeo.offline.Downloader');

goog.require('ol.has');

goog.require('goog.asserts');
goog.require('ol.source.TileWMS');
goog.require('ol.source.WMTS');

const utils = goog.require('ngeo.offline.utils');
const TilesDownloader = goog.require('ngeo.offline.TilesDownloader');


/**
 * @param {ol.Coordinate} a Some coordinates.
 * @param {ol.Coordinate} b Some other coordinates.
 * @return {number} The squared magnitude.
 */
function magnitude2(a, b) {
  let magnitudeSquared = 0;
  for (let i = 0; i < a.length; ++i) {
    magnitudeSquared += Math.pow(a[1] - b[1], 2);
  }
  return magnitudeSquared;
}


const Downloader = class {

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

    /**
     * @type {TilesDownloader}
     */
    this.tileDownloader = null;
  }


  /**
   * @param {ngeox.OfflineLayerMetadata} layerMetadata Layers metadata.
   * @param {Array<ngeox.OfflineTile>} queue Queue of tiles to download.
   */
  queueLayerTiles_(layerMetadata, queue) {
    const {map, source, extentByZoom} = layerMetadata;

    if (!source) {
      return;
    }
    goog.asserts.assert(source instanceof ol.source.TileWMS || source instanceof ol.source.WMTS);
    const projection = map.getView().getProjection();
    const tileGrid = source.getTileGrid();
    const tileUrlFunction = source.getTileUrlFunction();

    goog.asserts.assert(extentByZoom);
    for (const extentZoom of extentByZoom) {
      const z = extentZoom.zoom;
      const extent = extentZoom.extent;
      const queueByZ = [];
      let minX, minY, maxX, maxY;
      tileGrid.forEachTileCoord(extent, z, (coord) => {
        maxX = coord[1];
        maxY = coord[2];
        if (minX === undefined) {
          minX = coord[1];
          minY = coord[2];
        }
        const url = tileUrlFunction(coord, ol.has.DEVICE_PIXEL_RATIO, projection);
        goog.asserts.assert(url);

        /**
         * @type {ngeox.OfflineTile}
         */
        const tile = {coord, url};
        queueByZ.push(tile);
      });

      const centerTileCoord = [z, (minX + maxX) / 2, (minY + maxY) / 2];
      queueByZ.sort((a, b) => magnitude2(a.coord, centerTileCoord) - magnitude2(b.coord, centerTileCoord));
      queue.push(...queueByZ);
    }
  }

  /**
   * @param {ol.Extent} extent The extent to download.
   * @param {ol.Map} map The map to work on.
   * @return {Promise} A promise resolving when save is finished.
   */
  save(extent, map) {
    /**
     * @type {!Array<ngeox.OfflineLayerMetadata>}
     */
    const layersMetadatas = this.configuration_.createLayerMetadatas(map, extent);

    const queue = [];
    for (const layerItem of layersMetadatas) {
      if (layerItem.layerType === 'tile') {
        const tiles = layerItem.tiles = [];
        this.queueLayerTiles_(layerItem, tiles);
        queue.push(...tiles);
      }
    }

    const callbacks = this.configuration_.getCallbacks();
    this.tileDownloader = new TilesDownloader(queue, callbacks);
    const downloadCompletePromise = this.tileDownloader.download();

    return downloadCompletePromise.then(() => {
      /**
       * @type {!Array<ngeox.OfflinePersistentLayer>}
       */
      const persistentLayers = [];
      for (const layerItem of layersMetadatas) {
        const tilesContentByUrl = {};
        if (layerItem.layerType === 'tile') {
          for (const tile of layerItem.tiles) {
            const tileKey = utils.normalizeURL(tile.url);
            tilesContentByUrl[tileKey] = tile.response;
          }
        }
        persistentLayers.push({
          layerType: layerItem.layerType,
          layerSerialization: layerItem.layerSerialization,
          key: this.configuration_.getLayerKey(layerItem),
          tiles: tilesContentByUrl
        });
      }

      /**
       * @type {ngeox.OfflinePersistentContent}
       */
      const persistentObject = {
        extent: extent,
        layers: persistentLayers
      };
      this.configuration_.setItem('offline_content', persistentObject);
    });
  }
};

const name = 'offlineDownloader';
Downloader.module = angular.module(name, []).service(name, Downloader);

exports = Downloader;
