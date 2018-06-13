goog.module('ngeo.offline.DefaultConfiguration');
goog.module.declareLegacyNamespace();

goog.require('ol.Observable');
goog.require('ngeo.CustomEvent');

const utils = goog.require('ngeo.offline.utils');

/**
 * @implements {ngeox.OfflineConfiguration}
 */
exports = class extends ol.Observable {

  constructor() {
    super();
    /**
     * @param {number} progress new progress.
     */
    this.dispatchProgress_ = (progress) => {
      this.dispatchEvent(new ngeo.CustomEvent('progress', {
        'progress': progress
      }));
    };
  }

  /**
   * @override
   * @return {ngeox.OfflineCallbacks} Offline callbacks.
   */
  getCallbacks() {
    const dispatchProgress = this.dispatchProgress_.bind(this);
    return {
      onCompleteDownload(success, errors, total) {
        console.log('Complete downloading offline tiles', success, '/', total);
        dispatchProgress(success / total);
      },
      onLoad(progress) {
        console.log(100 * progress, '%');
        dispatchProgress(progress);
      },
      onError(progress) {
        console.log('X');
        dispatchProgress(progress);
      },
      readResponse(tile, response, contentType) {
        tile.response = response;
        console.log('Read some', contentType, 'for tile', tile.url);
      }
    };
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
     * @return {boolean} continue traversal
     */
    const visitLayer = (layer, ancestors) => {
      console.log('Traversing layer', layer.getProperties());
      const extentByZoom = [{
        zoom: 0,
        extent: userExtent
      }, {
        zoom: 1,
        extent: userExtent
      }, {
        zoom: 3,
        extent: userExtent
      }, {
        zoom: 4,
        extent: userExtent
      }];
      layersItems.push({
        map,
        extentByZoom,
        layer,
        ancestors
      });
      return true;
    };
    map.getLayers().forEach((root) => {
      utils.traverseLayer(root, [], visitLayer);
    });
    return layersItems;
  }
};
