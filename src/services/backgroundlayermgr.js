goog.provide('ngeo.BackgroundEvent');
goog.provide('ngeo.BackgroundEventType');
goog.provide('ngeo.BackgroundLayerMgr');

goog.require('goog.asserts');
goog.require('ngeo');
goog.require('ol.Observable');
goog.require('ol.events');
goog.require('ol.source.ImageWMS');
goog.require('ol.source.TileWMS');
goog.require('ol.source.WMTS');


/**
 * @enum {string}
 */
ngeo.BackgroundEventType = {
  /**
   * Triggered when the background layer changes.
   */
  CHANGE: 'change'
};


/**
 * @constructor
 * @struct
 * @extends {ol.events.Event}
 * @param {ngeo.BackgroundEventType} type Type.
 * @param {ol.layer.Base} previous Previous background layer.
 * @implements {ngeox.BackgroundEvent}
 */
ngeo.BackgroundEvent = function(type, previous) {

  ol.events.Event.call(this, type);

  /**
   * The layer used as background before a change.
   * @type {ol.layer.Base}
   */
  this.previous = previous;
};
ol.inherits(ngeo.BackgroundEvent, ol.events.Event);


/**
 * Provides a service for setting/unsetting background layers
 * in maps.
 *
 * The notion of background/base layers doesn't exist in OpenLayers 3. This
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
 * @ngdoc service
 * @ngname ngeoBackgroundLayerMgr
 */
ngeo.BackgroundLayerMgr = function() {

  ol.Observable.call(this);

  /**
   * Object used to track if maps have background layers.
   * @type {Object.<string, boolean>}
   * @private
   */
  this.mapUids_ = {};
};
ol.inherits(ngeo.BackgroundLayerMgr, ol.Observable);


/**
 * Return the current background layer of a given map. `null` is returned if
 * the map does not have a background layer.
 * @param {ol.Map} map Map.
 * @return {ol.layer.Base} layer The background layer.
 * @export
 */
ngeo.BackgroundLayerMgr.prototype.get = function(map) {
  const mapUid = ol.getUid(map).toString();
  return mapUid in this.mapUids_ ? map.getLayers().item(0) : null;
};


/**
 * Set the background layer of a map. If `layer` is `null` the background layer
 * is removed.
 * @param {ol.Map} map The map.
 * @param {ol.layer.Base} layer The new background layer.
 * @return {ol.layer.Base} The previous background layer.
 * @export
 */
ngeo.BackgroundLayerMgr.prototype.set = function(map, layer) {
  const mapUid = ol.getUid(map).toString();
  const previous = this.get(map);
  if (previous !== null) {
    goog.asserts.assert(mapUid in this.mapUids_);
    if (layer !== null) {
      map.getLayers().setAt(0, layer);
    } else {
      map.getLayers().removeAt(0);
      delete this.mapUids_[mapUid];
    }
  } else if (layer !== null) {
    map.getLayers().insertAt(0, layer);
    this.mapUids_[mapUid] = true;
  }

  this.dispatchEvent(new ngeo.BackgroundEvent(ngeo.BackgroundEventType.CHANGE,
      previous));
  return previous;
};

/**
 * @param {ol.Map} map The map.
 * @param {Object.<string, string>} dimensions The global dimensions object.
 * @export
 */
ngeo.BackgroundLayerMgr.prototype.updateDimensions = function(map, dimensions) {
  const baseBgLayer = this.get(map);
  if (baseBgLayer) {
    let layers = [baseBgLayer];
    if (baseBgLayer instanceof ol.layer.Group) {
      // Handle the first level of layers of the base background layer.
      layers = baseBgLayer.getLayers().getArray();
    }

    layers.forEach(function(layer) {
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


ngeo.module.service('ngeoBackgroundLayerMgr', ngeo.BackgroundLayerMgr);
