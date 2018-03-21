goog.provide('ngeo.map.BackgroundLayerMgr');

goog.require('goog.asserts');
goog.require('ngeo.CustomEvent');
goog.require('ol');
goog.require('ol.Observable');
goog.require('ol.layer.Group');
goog.require('ol.layer.Layer');
goog.require('ol.source.ImageWMS');
goog.require('ol.source.TileWMS');
goog.require('ol.source.WMTS');


/**
 * Provides a service for setting/unsetting background layers
 * in maps.
 *
 * The notion of background/base layers doesn't exist in OpenLayers. This
 * service adds that notion.
 *
 * Setting a background layer to map is done with the `set` function:
 *
 *     ngeoBackgroundLayerMgr.set(map, layer);
 *
 * To unset the background layer pass `null` as the `layer` argument:
 *
 *     ngeoBackgroundLayerMgr.set(map, null);
 *
 * The `get` function returns the current background layer of the map passed
 * as an argument. `null` is returned if the map doesn't have a background
 * layer.
 *
 * The background layer is always added at index 0 in the map's layers
 * collection. When a background layer is set it is inserted (at index 0)
 * if the map does not already have a background layer, otherwise the
 * new background layer replaces the previous one at index 0.
 *
 * Users can subscribe to a 'change' event to get notified when the background
 * layer changes:
 *
 *     ngeoBackgroundLayerMgr.on('change', function(e) {
 *       // do something with the layer
 *       let layer = ngeoBackgroundLayerMgr.get();
 *       // know which layer was used before
 *       let previous = e.previous
 *     });
 *
 * See our live examples:
 * [../examples/backgroundlayer.html](../examples/backgroundlayer.html)
 * [../examples/backgroundlayerdropdown.html](../examples/backgroundlayerdropdown.html)
 *
 * @extends {ol.Observable}
 * @constructor
 * @struct
 * @param {ngeo.map.LayerHelper} ngeoLayerHelper Themes service.
 * @ngInject
 * @ngdoc service
 * @ngname ngeoBackgroundLayerMgr
 */
ngeo.map.BackgroundLayerMgr = function(ngeoLayerHelper) {

  ol.Observable.call(this);

  /**
   * Object used to track if maps have background layers.
   * @type {Object.<string, boolean>}
   * @private
   */
  this.mapUids_ = {};

  /**
   * @type {ngeo.map.LayerHelper}
   * @private
   */
  this.ngeoLayerHelper_ = ngeoLayerHelper;

};
ol.inherits(ngeo.map.BackgroundLayerMgr, ol.Observable);


/**
 * Return the current background layer of a given map. `null` is returned if
 * the map does not have a background layer.
 * @param {ol.Map} map Map.
 * @return {ol.layer.Base} layer The background layer.
 * @export
 */
ngeo.map.BackgroundLayerMgr.prototype.get = function(map) {
  const mapUid = ol.getUid(map).toString();
  return mapUid in this.mapUids_ ? this.ngeoLayerHelper_.getGroupFromMap(map,
    ngeo.map.BackgroundLayerMgr.BACKGROUNDLAYERGROUP_NAME).getLayers().item(0) : null;
};


/**
 * Set the background layer of a map. If `layer` is `null` the background layer
 * is removed.
 * @param {ol.Map} map The map.
 * @param {ol.layer.Base} layer The new background layer.
 * @return {ol.layer.Base} The previous background layer.
 * @export
 */
ngeo.map.BackgroundLayerMgr.prototype.set = function(map, layer) {
  const ZIndex = -200;
  const mapUid = ol.getUid(map).toString();
  const previous = this.get(map);
  if (layer !== null) {
    layer.setZIndex(ZIndex);
    this.ngeoLayerHelper_.setZIndexToFirstLevelChildren(layer, ZIndex);
  }

  const bgGroup = this.ngeoLayerHelper_.getGroupFromMap(map, ngeo.map.BackgroundLayerMgr.BACKGROUNDLAYERGROUP_NAME);

  if (previous !== null) {
    goog.asserts.assert(mapUid in this.mapUids_);
    if (layer !== null) {
      bgGroup.getLayers().setAt(0, layer);
    } else {
      bgGroup.getLayers().removeAt(0);
      delete this.mapUids_[mapUid];
    }
  } else if (layer !== null) {
    bgGroup.getLayers().insertAt(0, layer);
    this.mapUids_[mapUid] = true;
  }
  /** @type {ngeox.BackgroundEvent} */
  const event = new ngeo.CustomEvent('change', {
    current: layer,
    previous: previous
  });
  this.dispatchEvent(event);

  return previous;
};

/**
 * Return the current background layer overlay of a given map, used by the opacity slider.
 * `null` is returned if the map does not have an opacity background layer.
 * @param {ol.Map} map Map.
 * @return {ol.layer.Base} layer The opacity background layer.
 * @export
 */
ngeo.map.BackgroundLayerMgr.prototype.getOpacityBgLayer = function(map) {
  const mapUid = ol.getUid(map).toString();
  return mapUid in this.mapUids_ ? this.ngeoLayerHelper_.getGroupFromMap(map,
    ngeo.map.BackgroundLayerMgr.BACKGROUNDLAYERGROUP_NAME).getLayers().item(1) : null;
};

/**
 * Set an background layer overlay, used by the opacity slider.
 * @param {ol.Map} map The map.
 * @param {ol.layer.Base} layer The opacity background layer.
 * @export
 */
ngeo.map.BackgroundLayerMgr.prototype.setOpacityBgLayer = function(map, layer) {
  const ZIndex = -100;
  layer.setOpacity(0);
  layer.setVisible(true);
  layer.setZIndex(ZIndex);
  this.ngeoLayerHelper_.setZIndexToFirstLevelChildren(layer, ZIndex);
  const bgGroup = this.ngeoLayerHelper_.getGroupFromMap(map, ngeo.map.BackgroundLayerMgr.BACKGROUNDLAYERGROUP_NAME);

  const index = bgGroup.getLayers().getArray().indexOf(layer);
  if (index === -1) {
    bgGroup.getLayers().push(layer);
  }
};

/**
 * @param {ol.Map} map The map.
 * @param {Object.<string, string>} dimensions The global dimensions object.
 * @export
 */
ngeo.map.BackgroundLayerMgr.prototype.updateDimensions = function(map, dimensions) {
  const baseBgLayer = this.get(map);
  if (baseBgLayer) {
    let layers = [baseBgLayer];
    if (baseBgLayer instanceof ol.layer.Group) {
      // Handle the first level of layers of the base background layer.
      layers = baseBgLayer.getLayers().getArray();
    }

    layers.forEach((layer) => {
      goog.asserts.assertInstanceof(layer, ol.layer.Layer);
      if (layer) {
        let hasUpdates = false;
        const updatedDimensions = {};
        for (const key in layer.get('dimensions')) {
          const value = dimensions[key];
          if (value !== undefined) {
            updatedDimensions[key] = value;
            hasUpdates = true;
          }
        }
        if (hasUpdates) {
          const source = layer.getSource();
          if (source instanceof ol.source.WMTS) {
            source.updateDimensions(updatedDimensions);
            source.refresh();
          } else if (source instanceof ol.source.TileWMS || source instanceof ol.source.ImageWMS) {
            source.updateParams(updatedDimensions);
            source.refresh();
          }
        }
      }
    });
  }
};

/**
 * @type {!angular.Module}
 */
ngeo.map.BackgroundLayerMgr.module = angular.module('ngeoBackgroundLayerMgr', []);
ngeo.map.BackgroundLayerMgr.module.service('ngeoBackgroundLayerMgr', ngeo.map.BackgroundLayerMgr);

/**
 * @const
 */
ngeo.map.BackgroundLayerMgr.BACKGROUNDLAYERGROUP_NAME = 'background';
