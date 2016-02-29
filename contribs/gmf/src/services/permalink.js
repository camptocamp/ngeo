goog.provide('gmf.Permalink');

goog.require('gmf');
goog.require('ngeo.BackgroundEventType');
goog.require('ngeo.BackgroundLayerMgr');
goog.require('ngeo.Debounce');
goog.require('ngeo.FeatureOverlay');
goog.require('ngeo.FeatureOverlayMgr');
goog.require('ngeo.Popover');
goog.require('ngeo.StateManager');
goog.require('ol.Feature');
goog.require('ol.geom.Point');
goog.require('ol.style.Stroke');
goog.require('ol.style.RegularShape');
goog.require('ol.style.Style');


/**
 * @enum {string}
 */
gmf.PermalinkParam = {
  BG_LAYER: 'baselayer_ref',
  MAP_CROSSHAIR: 'map_crosshair',
  MAP_TOOLTIP: 'map_tooltip',
  MAP_X: 'map_x',
  MAP_Y: 'map_y',
  MAP_Z: 'map_zoom'
};


gmf.module.constant('gmfPermalinkOptions',
    /** @type {gmfx.PermalinkOptions} */ ({}));


/**
 * The Permalink service for GMF, which uses the `ngeo.StateManager` to manage
 * the GMF application state. Here's the list of states are are managed:
 *
 * - the map center and zoom level
 * - the current background layer selected
 * - whether to add a crosshair feature in the map or not
 *
 * @constructor
 * @param {ngeo.BackgroundLayerMgr} ngeoBackgroundLayerMgr Background layer
 *     manager.
 * @param {ngeo.Debounce} ngeoDebounce ngeo Debounce service.
 * @param {ngeo.FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 * @param {ngeo.StateManager} ngeoStateManager The ngeo StateManager service.
 * @param {gmfx.PermalinkOptions} gmfPermalinkOptions The options to configure
 *     the gmf permalink service with.
 * @ngInject
 * @ngdoc service
 * @ngname gmfPermalink
 */
gmf.Permalink = function(ngeoBackgroundLayerMgr, ngeoDebounce,
    ngeoFeatureOverlayMgr, ngeoStateManager, gmfPermalinkOptions) {

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
   * @type {ngeo.FeatureOverlay}
   * @private
   */
  this.featureOverlay_ = ngeoFeatureOverlayMgr.getFeatureOverlay();

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

  /**
   * @type {Array<(null|ol.style.Style)>|null|ol.FeatureStyleFunction|ol.style.Style}
   * @private
   */
  this.crosshairStyle_;

  if (gmfPermalinkOptions.crosshairStyle !== undefined) {
    this.crosshairStyle_ = gmfPermalinkOptions.crosshairStyle;
  } else {
    this.crosshairStyle_ = [new ol.style.Style({
      image: new ol.style.RegularShape({
        stroke: new ol.style.Stroke({
          color: 'rgba(255, 255, 255, 0.8)',
          width: 5
        }),
        points: 4,
        radius: 8,
        radius2: 0,
        angle: 0
      })
    }), new ol.style.Style({
      image: new ol.style.RegularShape({
        stroke: new ol.style.Stroke({
          color: 'rgba(255, 0, 0, 1)',
          width: 2
        }),
        points: 4,
        radius: 8,
        radius2: 0,
        angle: 0
      })
    })];
  }


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


// === Map crosshair ===


/**
 * Get the map crosshair property from the state manager, if defined.
 * @return {boolean} Whether map crosshair property is set or not.
 * @export
 */
gmf.Permalink.prototype.getMapCrosshair = function() {
  var value = this.ngeoStateManager_.getInitialValue(
      gmf.PermalinkParam.MAP_CROSSHAIR);
  value = value === 'true' ? true : false;
  return value;
};


// === Map tooltip ===


/**
 * Get the tooltip text from the state manager.
 * @return {?string} Tooltip text.
 * @export
 */
gmf.Permalink.prototype.getMapTooltip = function() {
  return this.ngeoStateManager_.getInitialValue(
      gmf.PermalinkParam.MAP_TOOLTIP) || null;
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

  // (1) Initialize the map view with the X, Y and Z available within the
  //     permalink service, if availables
  var center = this.getMapCenter();
  if (center !== null) {
    view.setCenter(center);
  }
  var zoom = this.getMapZoom();
  if (zoom !== null) {
    view.setZoom(zoom);
  }


  // (2) Listen to any property changes within the view and apply them to
  //     the permalink service
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

  // (3) Add map crosshair, if set
  if (this.getMapCrosshair()) {
    var crosshairCoordinate;
    if (center !== null) {
      crosshairCoordinate = center;
    } else {
      crosshairCoordinate = view.getCenter();
    }
    goog.asserts.assertArray(crosshairCoordinate);

    var crosshairFeature = new ol.Feature(
        new ol.geom.Point(crosshairCoordinate))
    crosshairFeature.setStyle(this.crosshairStyle_);
    this.featureOverlay_.addFeature(crosshairFeature);
  }

  // (4) Add map tooltip, if set
  var tooltipText = this.getMapTooltip();
  if (tooltipText) {
    var tooltipPosition;
    if (center !== null) {
      tooltipPosition = center;
    } else {
      tooltipPosition = view.getCenter();
    }
    goog.asserts.assertArray(tooltipPosition);

    var div = $('<div/>', {
      'class': 'gmf-permalink-tooltip',
      'text': tooltipText
    })[0];

    var popover = new ngeo.Popover({
      element: div,
      position: tooltipPosition
    });
    map.addOverlay(popover);

  }
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

  if (this.crosshairLayer_) {
    this.crosshairLayer_.setMap(null);
    this.crosshairLayer_.getSource().clear();
    this.crosshairLayer_ = null;
  }
};


// === Background layer ===


/**
 * Get the background layer object to use to initialize the map from the
 * state manager.
 * @param {Array.<ol.layer.Base>} layers Array of background layer objects.
 * @return {?ol.layer.Base} Background layer.
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
