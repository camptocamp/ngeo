goog.provide('gmf.Permalink');

goog.require('gmf');
goog.require('ngeo.BackgroundEventType');
goog.require('ngeo.BackgroundLayerMgr');
goog.require('ngeo.Debounce');
goog.require('ngeo.StateManager');


/**
 * @enum {string}
 */
gmf.PermalinkParam = {
  BG_LAYER: 'baselayer_ref',
  MAP_X: 'map_x',
  MAP_Y: 'map_y',
  MAP_Z: 'map_zoom'
};


/**
 * The Permalink service for GMF, which uses the `ngeo.StateManager` to manage
 * the GMF application state. Here's the list of states are are managed:
 *
 * - the map center and zoom level
 * - the current background layer selected
 *
 * @constructor
 * @param {ngeo.BackgroundLayerMgr} ngeoBackgroundLayerMgr Background layer
 *     manager.
 * @param {ngeo.Debounce} ngeoDebounce ngeo Debounce service.
 * @param {ngeo.StateManager} ngeoStateManager The ngeo StateManager service.
 * @ngInject
 * @ngdoc service
 * @ngname gmfPermalink
 */
gmf.Permalink = function(ngeoBackgroundLayerMgr, ngeoDebounce,
    ngeoStateManager) {

  /**
   * @type {ngeo.BackgroundLayerMgr}
   * @private
   */
  this.ngeoBackgroundLayerMgr_ = ngeoBackgroundLayerMgr;

  /**
   * @type {ngeo.Debounce}
   * @private
   */
  this.ngeoDebounce_ = ngeoDebounce;

  /**
   * @type {ngeo.StateManager}
   * @private
   */
  this.ngeoStateManager_ = ngeoStateManager;

  /**
   * @type {?ol.Map}
   * @private
   */
  this.map_ = null;


  // == event listeners ==

  ol.events.listen(
      this.ngeoBackgroundLayerMgr_,
      ngeo.BackgroundEventType.CHANGE,
      this.handleBackgroundLayerManagerChange_,
      this);


  // == listener keys ==

  /**
   * The key for map view 'propertychange' event.
   * @type {?ol.events.Key}
   * @private
   */
  this.mapViewPropertyChangeEventKey_ = null;

};

// === Map X, Y, Z ===


/**
 * Get the coordinate to use to initialize the map view from the state manager.
 * @return {?ol.Coordinate} The coordinate for the map view center.
 * @export
 */
gmf.Permalink.prototype.getMapCenter = function() {
  var center = null;
  var x = this.ngeoStateManager_.getInitialValue(gmf.PermalinkParam.MAP_X);
  var y = this.ngeoStateManager_.getInitialValue(gmf.PermalinkParam.MAP_Y);
  if (x !== undefined && y !== undefined) {
    center = [+x, +y];
  }
  return center;
};


/**
 * Get the zoom level to use to initialize the map view from the state manager.
 * @return {?number} The zoom for the map view.
 * @export
 */
gmf.Permalink.prototype.getMapZoom = function() {
  var zoom = null;
  var z = this.ngeoStateManager_.getInitialValue(gmf.PermalinkParam.MAP_Z);
  if (z !== undefined) {
    zoom = +z;
  }
  return zoom;
};


/**
 * Bind an ol3 map object to this service. The service will, from there on,
 * listen to the properties changed within the map view and update the following
 * state properties: map_x, map_y and map_zoom.
 *
 * If the service is already bound to a map, those events are unlistened first.
 *
 * @param {?ol.Map} map The ol3 map object.
 * @export
 */
gmf.Permalink.prototype.setMap = function(map) {

  if (map === this.map_) {
    return;
  }

  if (this.map_) {
    this.unregisterMap_();
    this.map_ = null;
  }

  if (map) {
    this.registerMap_(map);
    this.map_ = map;
  }

};


/**
 * Listen to the map view property change and update the state accordingly.
 * @param {ol.Map} map The ol3 map object.
 * @private
 */
gmf.Permalink.prototype.registerMap_ = function(map) {
  var view = map.getView();
  this.mapViewPropertyChangeEventKey_ = ol.events.listen(
      view,
      'propertychange',
      this.ngeoDebounce_(function() {
        var center = view.getCenter();
        var zoom = view.getZoom();
        var object = {};
        object[gmf.PermalinkParam.MAP_X] = Math.round(center[0]);
        object[gmf.PermalinkParam.MAP_Y] = Math.round(center[1]);
        object[gmf.PermalinkParam.MAP_Z] = zoom;
        this.ngeoStateManager_.updateState(object);
      }.bind(this), 300, /* invokeApply */ true),
      this);
};


/**
 * Remove any event listeners from the current map.
 * @private
 */
gmf.Permalink.prototype.unregisterMap_ = function() {
  goog.asserts.assert(
      this.mapViewPropertyChangeEventKey_, 'Key should be thruthy');
  ol.events.unlistenByKey(this.mapViewPropertyChangeEventKey_);
  this.mapViewPropertyChangeEventKey_ = null;
};


// === Background layer ===


/**
 * Get the background layer object to use to initialize the map from the
 * state manager.
 * @param {Array.<ol.layer.Base>} layers Array of background layer objects.
 * @return {?ol.layer.Base}
 * @export
 */
gmf.Permalink.prototype.getBackgroundLayer = function(layers) {
  var layer = null;
  var layerName = this.ngeoStateManager_.getInitialValue(
      gmf.PermalinkParam.BG_LAYER);
  if (layerName !== undefined) {
    for (var i = 0, len = layers.length; i < len; i++) {
      if (layers[i].get('label') === layerName) {
        layer = layers[i];
        break;
      }
    }
  }
  return layer;
};


/**
 * Called when the background layer changes. Update the state using the
 * background layer label, i.e. its name.
 * @private
 */
gmf.Permalink.prototype.handleBackgroundLayerManagerChange_ = function() {
  if (!this.map_) {
    return;
  }

  // get layer label, i.e its name
  var layer = this.ngeoBackgroundLayerMgr_.get(this.map_);
  var layerName = layer.get('label');
  goog.asserts.assertString(layerName);

  // set it in state
  var object = {};
  object[gmf.PermalinkParam.BG_LAYER] = layerName;
  this.ngeoStateManager_.updateState(object);
};


gmf.module.service('gmfPermalink', gmf.Permalink);
