/**
 * @module ngeo.offline.Downloader
 */
import {DEVICE_PIXEL_RATIO} from 'ol/has.js';
import googAsserts from 'goog/asserts.js';
import olSourceTileWMS from 'ol/source/TileWMS.js';
import olSourceWMTS from 'ol/source/WMTS.js';
import TilesDownloader from 'ngeo/offline/TilesDownloader.js';


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
   * @param {ngeo.offline.Configuration} ngeoOfflineConfiguration A service for customizing offline behaviour.
   */
  constructor(ngeoOfflineConfiguration) {
    /**
     * @private
     * @type {ngeo.offline.Configuration}
     */
    this.configuration_ = ngeoOfflineConfiguration;

    /**
     * @type {TilesDownloader}
     * @private
     */
    this.tileDownloader_ = null;
  }

  cancel() {
    this.tileDownloader_.cancel();
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
    googAsserts.assert(source instanceof olSourceTileWMS || source instanceof olSourceWMTS);
    const projection = map.getView().getProjection();
    const tileGrid = source.getTileGrid();
    const tileUrlFunction = source.getTileUrlFunction();

    googAsserts.assert(extentByZoom);
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
        const url = tileUrlFunction(coord, DEVICE_PIXEL_RATIO, projection);
        googAsserts.assert(url);

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

    /**
     * @type {!Array<ngeox.OfflinePersistentLayer>}
     */
    const persistentLayers = [];
    const queue = [];
    const zooms = [];
    for (const layerItem of layersMetadatas) {
      if (layerItem.layerType === 'tile') {
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
        if (zooms.indexOf(zoom) < 0) {
          zooms.push(zoom);
        }
      });
    }

    /**
     * @type {ngeox.OfflinePersistentContent}
     */
    const persistentObject = {
      extent: extent,
      layers: persistentLayers,
      zooms: zooms.sort((a, b) => (a < b ? -1 : 1))
    };
    const setOfflineContentPromise = this.configuration_.setItem('offline_content', persistentObject);

    this.tileDownloader_ = new TilesDownloader(queue, this.configuration_, this.configuration_.getMaxNumberOfParallelDownloads());
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
