goog.provide('ngeo.BackgroundEvent');
goog.provide('ngeo.BackgroundEventType');
goog.provide('ngeo.BackgroundLayerMgr');

goog.require('goog.asserts');
goog.require('ngeo');
goog.require('ol.Observable');
goog.require('ol.events');


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
 * @extends {ol.events.Event}
 * @param {ngeo.BackgroundEventType} type Type.
 * @param {ol.layer.Base} previous Previous background layer.
 * @implements {ngeox.BackgroundEvent}
 */
ngeo.BackgroundEvent = function(type, previous) {

  goog.base(this, type);

  /**
   * The layer used as background before a change.
   * @type {ol.layer.Base}
   */
  this.previous = previous;
};
goog.inherits(ngeo.BackgroundEvent, ol.events.Event);


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
 *       var layer = ngeoBackgroundLayerMgr.get();
 *       // know which layer was used before
 *       var previous = e.previous
 *     });
 *
 * See our live examples:
 * {@link ../examples/backgroundlayer.html}
 * {@link ../examples/backgroundlayerdropdown.html}
 *
 * @extends {ol.Observable}
 * @constructor
 * @ngdoc service
 * @ngname ngeoBackgroundLayerMgr
 */
ngeo.BackgroundLayerMgr = function() {

  goog.base(this);


  /**
   * Object used to track if maps have background layers.
   * @type {Object.<string, boolean>}
   * @private
   */
  this.mapUids_ = {};
};
goog.inherits(ngeo.BackgroundLayerMgr, ol.Observable);


/**
 * Return the current background layer of a given map. `null` is returned if
 * the map does not have a background layer.
 * @param {ol.Map} map Map.
 * @return {ol.layer.Base} layer The background layer.
 * @export
 */
ngeo.BackgroundLayerMgr.prototype.get = function(map) {
  var mapUid = goog.getUid(map).toString();
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
  var mapUid = goog.getUid(map).toString();
  var previous = this.get(map);
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


ngeo.module.service('ngeoBackgroundLayerMgr', ngeo.BackgroundLayerMgr);
