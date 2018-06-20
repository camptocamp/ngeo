goog.module('ngeo.offline.Downloader');

goog.require('ol.has');
goog.require('ol.source.Image');
goog.require('ol.source.TileWMS');
goog.require('ol.source.ImageWMS');
goog.require('ol.tilegrid');

goog.require('goog.asserts');


const TilesDownloader = goog.require('ngeo.offline.TilesDownloader');

const defaultImageLoadFunction = ol.source.Image.defaultImageLoadFunction;

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
   * @param {ngeox.OfflineLayerMetadata} layerMetadata Layers metadata.
   * @param {Array<ngeox.OfflineTile>} queue Queue of tiles to download.
   */
  queueLayerTiles_(layerMetadata, queue) {
    const {map, layer, extentByZoom} = layerMetadata;

    const projection = map.getView().getProjection();
    const source = this.sourceImageWMSToTileWMS_(layer.getSource(), projection);
    if (!source) {
      return;
    }
    const tileGrid = source.getTileGrid();
    const tileUrlFunction = source.getTileUrlFunction();

    goog.asserts.assert(extentByZoom);
    for (const extentZoom of extentByZoom) {
      const z = extentZoom.zoom;
      const extent = extentZoom.extent;
      const queueByZ = [];
      let minX, minY, maxX, maxY;
      tileGrid.forEachTileCoord(extent, z, (tileCoord) => {
        maxX = tileCoord[1];
        maxY = tileCoord[2];
        if (minX === undefined) {
          minX = tileCoord[1];
          minY = tileCoord[2];
        }
        /**
         * @type {ngeox.OfflineTile}
         */
        const tile = {
          coord: tileCoord,
          url: tileUrlFunction(tileCoord, ol.has.DEVICE_PIXEL_RATIO, projection)
        };
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
    const layersMetadatas = this.configuration_.createLayerMetadatas(map, extent);

    const queue = [];
    for (const layerItem of layersMetadatas) {
      if (layerItem.type === 'tile') {
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
       * @type {Array<ngeox.OfflinePersistentLayer>}
       */
      const persistentLayers = [];
      for (const layerItem of layersMetadatas) {
        const tilesContentByUrl = {};
        for (const tile of layerItem.tiles) {
          tilesContentByUrl[tile.url] = tile.response;
        }
        persistentLayers.push({
          type: layerItem.type,
          opacity: layerItem.opacity,
          visibility: layerItem.visibility,
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
