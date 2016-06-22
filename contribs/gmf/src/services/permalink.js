goog.provide('gmf.Permalink');

goog.require('gmf');
goog.require('gmf.Themes');
goog.require('gmf.TreeManager');
goog.require('ngeo.BackgroundEventType');
goog.require('ngeo.BackgroundLayerMgr');
goog.require('ngeo.Debounce');
goog.require('ngeo.FeatureHelper');
/** @suppress {extraRequire} */
goog.require('ngeo.Features');
goog.require('ngeo.FeatureOverlay');
goog.require('ngeo.FeatureOverlayMgr');
goog.require('ngeo.LayerHelper');
goog.require('ngeo.Popover');
goog.require('ngeo.StateManager');
goog.require('ngeo.format.FeatureHash');
goog.require('ngeo.WfsPermalink');
goog.require('ol.Feature');
goog.require('ol.geom.Point');
goog.require('ol.layer.Group');
goog.require('ol.style.Stroke');
goog.require('ol.style.RegularShape');
goog.require('ol.style.Style');


/**
 * @enum {string}
 */
gmf.PermalinkParam = {
  BG_LAYER: 'baselayer_ref',
  FEATURES: 'rl_features',
  MAP_CROSSHAIR: 'map_crosshair',
  MAP_TOOLTIP: 'map_tooltip',
  MAP_X: 'map_x',
  MAP_Y: 'map_y',
  MAP_Z: 'map_zoom',
  TREE_GROUPS: 'tree_groups',
  WFS_LAYER: 'wfs_layer',
  WFS_NGROUPS: 'wfs_ngroups',
  WFS_SHOW_FEATURES: 'wfs_showFeatures'
};


/**
 * @enum {string}
 */
gmf.PermalinkParamPrefix = {
  TREE_ENABLE: 'tree_enable_',
  TREE_GROUP_LAYERS: 'tree_group_layers_',
  WFS: 'wfs_'
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
 * @param {angular.$timeout} $timeout Angular timeout service.
 * @param {ngeo.BackgroundLayerMgr} ngeoBackgroundLayerMgr Background layer
 *     manager.
 * @param {ngeo.Debounce} ngeoDebounce ngeo Debounce service.
 * @param {ngeo.FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 * @param {ngeo.FeatureHelper} ngeoFeatureHelper Ngeo feature helper service.
 * @param {ol.Collection.<ol.Feature>} ngeoFeatures Collection of features.
 * @param {ngeo.LayerHelper} ngeoLayerHelper Ngeo Layer Helper.
 * @param {ngeo.StateManager} ngeoStateManager The ngeo StateManager service.
 * @param {gmf.Themes} gmfThemes The gmf Themes service.
 * @param {gmf.TreeManager} gmfTreeManager The gmf TreeManager service.
 * @param {gmfx.PermalinkOptions} gmfPermalinkOptions The options to configure
 *     the gmf permalink service with.
 * @param {ngeo.Location} ngeoLocation ngeo location service.
 * @param {ngeo.WfsPermalink} ngeoWfsPermalink ngeo WFS query service.
 * @ngInject
 * @ngdoc service
 * @ngname gmfPermalink
 */
gmf.Permalink = function($timeout, ngeoBackgroundLayerMgr, ngeoDebounce,
    ngeoFeatureOverlayMgr, ngeoFeatureHelper, ngeoFeatures, ngeoLayerHelper,
    ngeoStateManager, gmfThemes, gmfTreeManager, gmfPermalinkOptions,
    ngeoLocation, ngeoWfsPermalink) {

  // == listener keys ==

  /**
   * The key for map view 'propertychange' event.
   * @type {?ol.EventsKey}
   * @private
   */
  this.mapViewPropertyChangeEventKey_ = null;

  /**
   * @type {Object.<number, gmf.Permalink.ListenerKeys>}
   * @private
   */
  this.listenerKeys_ = {};

  // == properties from params ==

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
   * @type {ngeo.FeatureHelper}
   * @private
   */
  this.featureHelper_ = ngeoFeatureHelper;

  /**
   * @type {ol.Collection.<ol.Feature>}
   * @private
   */
  this.ngeoFeatures_ = ngeoFeatures;

  /**
   * @type {ngeo.LayerHelper}
   * @private
   */
  this.layerHelper_ = ngeoLayerHelper;

  /**
   * @type {ngeo.StateManager}
   * @private
   */
  this.ngeoStateManager_ = ngeoStateManager;

  /**
   * @type {gmf.Themes}
   * @private
   */
  this.gmfThemes_ = gmfThemes;

  /**
   * @type {gmf.TreeManager}
   * @private
   */
  this.gmfTreeManager_ = gmfTreeManager;


  // == other properties ==

  /**
   * @type {ngeo.Location}
   * @private
   */
  this.ngeoLocation_ = ngeoLocation;

  /**
   * @type {ngeo.WfsPermalink}
   * @private
   */
  this.ngeoWfsPermalink_ = ngeoWfsPermalink;

  /**
   * @type {?ol.Map}
   * @private
   */
  this.map_ = null;

  /**
   * @type {?ol.layer.Group}
   * @private
   */
  this.dataLayerGroup_ = null;

  /**
   * @type {?Array.<GmfThemesNode>}
   * @private
   */
  this.themes_ = null;

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


  /**
   * @type {ngeo.format.FeatureHash}
   * @private
   */
  this.featureHashFormat_ = new ngeo.format.FeatureHash({
    setStyle: false,
    encodeStyles: false
  });

  // == event listeners ==

  ol.events.listen(
      this.ngeoBackgroundLayerMgr_,
      ngeo.BackgroundEventType.CHANGE,
      this.handleBackgroundLayerManagerChange_,
      this);

  this.gmfThemes_.getThemesObject().then(function(themes) {
    this.themes_ = themes;
    // The theme service has loaded. Wait to allow the layers to be created
    $timeout(function() {
      this.initLayers_();
    }.bind(this));
  }.bind(this));

  // ngeoFeatures
  //   (1) read from features from the state manager first, add them
  //   (2) listen for further features added/removed
  var features = this.getFeatures();
  features.forEach(function(feature) {
    this.featureHelper_.setStyle(feature);
    this.addNgeoFeature_(feature);
  }, this);
  this.ngeoFeatures_.extend(features);
  ol.events.listen(this.ngeoFeatures_, ol.CollectionEventType.ADD,
    this.handleNgeoFeaturesAdd_, this);
  ol.events.listen(this.ngeoFeatures_, ol.CollectionEventType.REMOVE,
    this.handleNgeoFeaturesRemove_, this);

};


/**
 * Utility method that does 2 things:
 * - initialize the listener keys of a given uid with an array (if that key
 *   has not array set yet)
 * - unlisten any events if the array already exists for the given uid and
 *   empty the array.
 * @param {number} uid Unique id.
 * @private
 */
gmf.Permalink.prototype.initListenerKey_ = function(uid) {
  if (!this.listenerKeys_[uid]) {
    this.listenerKeys_[uid] = {
      goog: [],
      ol: []
    };
  } else {
    if (this.listenerKeys_[uid].goog.length) {
      this.listenerKeys_[uid].goog.forEach(function(key) {
        goog.events.unlistenByKey(key);
      }, this);
      this.listenerKeys_[uid].goog.length = 0;
    }
    if (this.listenerKeys_[uid].ol.length) {
      this.listenerKeys_[uid].ol.forEach(function(key) {
        ol.events.unlistenByKey(key);
      }, this);
      this.listenerKeys_[uid].ol.length = 0;
    }
  }
};


/**
 * Utility method to add a listener key bound to a unique id. The key can
 * come from an `ol.events` (default) or `goog.events`.
 * @param {number} uid Unique id.
 * @param {ol.EventsKey|goog.events.Key} key Key.
 * @param {boolean=} opt_isol Whether it's an OpenLayers event or not. Defaults
 *     to true.
 * @private
 */
gmf.Permalink.prototype.addListenerKey_ = function(uid, key, opt_isol) {
  if (!this.listenerKeys_[uid]) {
    this.initListenerKey_(uid);
  }

  var isol = opt_isol !== undefined ? opt_isol : true;
  if (isol) {
    this.listenerKeys_[uid].ol.push(/** @type {ol.EventsKey} */ (key));
  } else {
    this.listenerKeys_[uid].goog.push(/** @type {goog.events.Key} */ (key));
  }
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


// === NgeoFeatures (A.K.A. DrawFeature, RedLining) ===


/**
 * Get the ngeo features from the state manager for initialization purpose
 * @return {Array.<ol.Feature>} The features read from the state manager.
 * @export
 */
gmf.Permalink.prototype.getFeatures = function() {
  var features = [];
  var f = this.ngeoStateManager_.getInitialValue(gmf.PermalinkParam.FEATURES);
  if (f !== undefined && f !== '') {
    features = this.featureHashFormat_.readFeatures(f);
  }
  return features;
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
  //     permalink service, if available
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
        new ol.geom.Point(crosshairCoordinate));
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

  // (5) register 'data' layers
  this.registerDataLayerGroup_(map);

  // (6) check for a wfs permalink
  var wfsPermalinkData = this.getWfsPermalinkData_();
  if (wfsPermalinkData !== null) {
    this.ngeoWfsPermalink_.issue(wfsPermalinkData, map);
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

  this.unregisterDataLayerGroup_();
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


// === Layers (layer tree) ===


/**
 * @private
 */
gmf.Permalink.prototype.initLayers_ = function() {

  if (!this.themes_) {
    return;
  }

  var layers = this.dataLayerGroup_.getLayers();
  var layer;
  var param;
  var layerNames;

  // (1) try to look for any group name from any of the themes in the state
  //     manager.  If any is found, then apply the found results in the
  //     appropriate layer.
  this.themes_.forEach(function(themeNode) {
    themeNode.children.forEach(function(groupNode) {
      if (groupNode.mixed) {
        // (1.1) - Mixed group, treat each node separately

        layerNames = [];

        groupNode.children.forEach(function(layerNode) {
          param = this.getLayerStateParamFromNode_(layerNode);
          var enable = this.ngeoStateManager_.getInitialValue(param);
          if (enable !== undefined) {
            enable = enable === 'true' ? true : false;
            var layerName = layerNode.name;
            layer = this.layerHelper_.getLayerByName(
              layerName, layers.getArray());
            if (layer) {
              layer.setVisible(enable);
            } else {
              layerNames.push(layerName);
            }
          }
        }, this);

        if (layerNames.length) {
          this.gmfTreeManager_.addCustomGroups([{
            node: groupNode,
            layers: layerNames
          }]);
        }

      } else {
        // (1.2) - group not mixed
        param = this.getLayerStateParamFromNode_(groupNode);
        var groupLayers = this.ngeoStateManager_.getInitialValue(param);
        if (groupLayers !== undefined) {
          var groupName = groupNode.name;
          layer = this.layerHelper_.getLayerByName(
              groupName, layers.getArray());
          if (layer) {
            this.initMergedLayer_(layer, groupLayers);
          } else if (groupLayers !== '') {
            layerNames = groupLayers.split(',');
            this.gmfTreeManager_.addCustomGroups([{
              node: groupNode,
              layers: layerNames
            }]);
          }
        }
      }
    }, this);
  }, this);

  // (2) at this point, the initialization is complete. We now need to listen
  //     to any change happening to the existing layers and any added or
  //     removed ones.
  layers.forEach(function(layer) {
    this.registerLayer_(layer, true);
  }, this);

  var layersUid = goog.getUid(layers);

  this.addListenerKey_(layersUid, ol.events.listen(layers,
      ol.CollectionEventType.ADD, this.handleLayersAdd_, this));
  this.addListenerKey_(layersUid, ol.events.listen(layers,
      ol.CollectionEventType.REMOVE, this.handleLayersRemove_, this));
};


/**
 * Initializes a WMS layer containing more than one layer names in its source
 * LAYERS param using a list of layer names that were fetched from the state
 * manager. The `layerNames` string may be empty.
 * @param {ol.layer.Base} layer Layer.
 * @param {string} layerNames A comma separated list of server-side layer names
 * @private
 */
gmf.Permalink.prototype.initMergedLayer_ = function(layer, layerNames) {
  goog.asserts.assert(
      layer instanceof ol.layer.Image ||
      layer instanceof ol.layer.Tile);

  var source = layer.getSource();
  goog.asserts.assert(
      source instanceof ol.source.ImageWMS ||
      source instanceof ol.source.TileWMS);

  source.updateParams({
    'LAYERS': layerNames
  });
};


/**
 * @param {ol.CollectionEvent} evt Event.
 * @private
 */
gmf.Permalink.prototype.handleLayersAdd_ = function(evt) {
  var layer = evt.element;
  goog.asserts.assertInstanceof(layer, ol.layer.Base);
  this.registerLayer_(layer, true);
};


/**
 * @param {ol.CollectionEvent} evt Event.
 * @private
 */
gmf.Permalink.prototype.handleLayersRemove_ = function(evt) {
  var layer = evt.element;
  goog.asserts.assertInstanceof(layer, ol.layer.Base);
  this.unregisterLayer_(layer);
};


/**
 * @param {ol.layer.Base} layer Layer.
 * @param {boolean=} opt_init Whether the registration of the layer happens
 *     during the initialization of the permalink or not. Defaults to `false`.
 * @private
 */
gmf.Permalink.prototype.registerLayer_ = function(layer, opt_init) {

  var init = opt_init !== undefined ? opt_init : false;
  var layerUid = goog.getUid(layer);

  if (layer instanceof ol.layer.Group) {
    // set up a listener on group layers because layers can also later be added
    // to a group
    this.addListenerKey_(layerUid, ol.events.listen(layer.getLayers(),
        ol.CollectionEventType.ADD, this.handleLayersAdd_, this));
    this.addListenerKey_(layerUid, ol.events.listen(layer.getLayers(),
        ol.CollectionEventType.REMOVE, this.handleLayersRemove_, this));

    layer.getLayers().forEach(function(layer) {
      this.registerLayer_(layer, opt_init);
    }, this);
  } else {
    this.addListenerKey_(layerUid, ol.events.listen(layer,
      ol.Object.getChangeEventType(ol.layer.LayerProperty.VISIBLE),
      this.handleLayerVisibleChange_, this));

    var isMerged = layer.get('isMerged');
    if (isMerged) {
      goog.asserts.assert(
        layer instanceof ol.layer.Image ||
        layer instanceof ol.layer.Tile);

      var source = layer.getSource();
      goog.asserts.assert(
        source instanceof ol.source.ImageWMS ||
        source instanceof ol.source.TileWMS);

      var sourceUid = goog.getUid(source);
      this.addListenerKey_(
        sourceUid,
        ol.events.listen(
          source, ol.events.EventType.CHANGE,
          this.handleWMSSourceChange_.bind(this, layer, source),
          this));

      if (!init) {
        // if registering a layer after initialization, then we need to update
        // the state manager properties using the current state of the layer.
        // Emulating a source 'change' does the trick.
        source.changed(); // forces `this.handleWMSSourceChange_` to be called
      }
    } else {
      if (!init) {
        // if registering a layer after initialization, then we need to update
        // the state manager properties using the current state of the layer
        this.updateLayerStateByVisibility_(layer);
      }
    }
  }

};


/**
 * @param {ol.layer.Base} layer Layer.
 * @private
 */
gmf.Permalink.prototype.unregisterLayer_ = function(layer) {

  var layerUid = goog.getUid(layer);

  this.initListenerKey_(layerUid); // clear event listeners
  if (layer instanceof ol.layer.Group) {
    layer.getLayers().forEach(this.unregisterLayer_, this);
  } else {
    var isMerged = layer.get('isMerged');
    if (isMerged) {
      goog.asserts.assert(
        layer instanceof ol.layer.Image ||
        layer instanceof ol.layer.Tile);

      var source = layer.getSource();
      goog.asserts.assert(
        source instanceof ol.source.ImageWMS ||
        source instanceof ol.source.TileWMS);

      var sourceUid = goog.getUid(source);
      this.initListenerKey_(sourceUid); // clear event listeners
    }

    var param = this.getLayerStateParamFromLayer_(layer);
    this.ngeoStateManager_.deleteParam(param);
  }
};


/**
 * Called when a layer `visible` property changes. Update the state manager
 * for that particular layer.
 * @param {ol.ObjectEvent} evt Event.
 * @private
 */
gmf.Permalink.prototype.handleLayerVisibleChange_ = function(evt) {
  var layer = evt.target;
  goog.asserts.assertInstanceof(layer, ol.layer.Base);
  this.updateLayerStateByVisibility_(layer);
};


/**
 * Update the state manager if the layer is hidden. No need to manage when it
 * is visible (when merged), since that's managed elsewhere.
 * @param {ol.layer.Base} layer Layer.
 * @private
 */
gmf.Permalink.prototype.updateLayerStateByVisibility_ = function(layer) {
  var visible = layer.getVisible();
  var param = this.getLayerStateParamFromLayer_(layer);
  var isMerged = layer.get('isMerged');
  var object = {};

  if (isMerged) {
    if (visible === false) {
      // TODO - only WMS layers should be managed here... that's not currently
      //     the case
      object[param] = '';
      this.ngeoStateManager_.updateState(object);
    }
  } else {
    object[param] = visible;
    this.ngeoStateManager_.updateState(object);
  }
};


/**
 * @param {ol.layer.Image|ol.layer.Tile} layer Layer.
 * @param {ol.source.ImageWMS|ol.source.TileWMS} source WMS source.
 * @private
 */
gmf.Permalink.prototype.handleWMSSourceChange_ = function(layer, source) {
  var layers = source.getParams()['LAYERS'];
  if (Array.isArray(layers)) {
    layers = layers.join(',');
  }
  var layerName = layer.get('layerName');
  var param = gmf.PermalinkParamPrefix.TREE_GROUP_LAYERS + layerName;
  var object = {};
  object[param] = layers;
  this.ngeoStateManager_.updateState(object);
};


/**
 * @param {ol.layer.Base} layer Layer.
 * @return {string} The state param for the layer
 * @private
 */
gmf.Permalink.prototype.getLayerStateParamFromLayer_ = function(layer) {
  var layerName = /** @type {string} */ (layer.get('layerName'));
  var isMerged = /** @type {boolean} */ (layer.get('isMerged'));
  return this.getLayerStateParam_(layerName, isMerged);
};


/**
 * @param {GmfThemesNode} layerNode Gmf theme node representing a layer.
 * @return {string} The state param for the layer
 * @private
 */
gmf.Permalink.prototype.getLayerStateParamFromNode_ = function(layerNode) {
  var layerName = layerNode.name;
  var type = gmf.Themes.getNodeType(layerNode);
  var isMerged = type === gmf.Themes.NodeType.NOT_MIXED_GROUP;
  return this.getLayerStateParam_(layerName, isMerged);
};


/**
 * @param {string} layerName The name of the layer.
 * @param {boolean} isMerged Whether the layer is merged or not.
 * @return {string} The state param for the layer
 * @private
 */
gmf.Permalink.prototype.getLayerStateParam_ = function(layerName,
    isMerged) {
  var param;
  if (isMerged) {
    param = gmf.PermalinkParamPrefix.TREE_GROUP_LAYERS + layerName;
  } else {
    param = gmf.PermalinkParamPrefix.TREE_ENABLE + layerName;
  }
  return param;
};


/**
 * Look in the map layers for a layer group named 'data' and keep a reference
 * to its layer collection.
 *
 * If the themes haven't been loaded yet, that means the map doesn't have
 * the 'data' layer group created yet.
 * @param {ol.Map} map The ol3 map object
 * @private
 */
gmf.Permalink.prototype.registerDataLayerGroup_ = function(map) {
  this.dataLayerGroup_ = this.layerHelper_.getGroupFromMap(map,
      gmf.DATALAYERGROUP_NAME);
  this.initLayers_();
};


/**
 * @private
 */
gmf.Permalink.prototype.unregisterDataLayerGroup_ = function() {
  var layers = this.dataLayerGroup_.getLayers();
  var layersUid = goog.getUid(layers);
  this.initListenerKey_(layersUid); // clear event listeners
  this.dataLayerGroup_ = null;
};


// === ngeoFeatures, A.K.A features from the DrawFeature, RedLining  ===


/**
 * @param {ol.CollectionEvent} event Collection event.
 * @private
 */
gmf.Permalink.prototype.handleNgeoFeaturesAdd_ = function(event) {
  var feature = event.element;
  goog.asserts.assertInstanceof(feature, ol.Feature);
  this.addNgeoFeature_(feature);
};


/**
 * @param {ol.CollectionEvent} event Collection event.
 * @private
 */
gmf.Permalink.prototype.handleNgeoFeaturesRemove_ = function(event) {
  var feature = event.element;
  goog.asserts.assertInstanceof(feature, ol.Feature);
  this.removeNgeoFeature_(feature);
};


/**
 * Listen to any changes that may occur within the feature in order to
 * update the state of the permalink accordingly.
 * @param {ol.Feature} feature Feature.
 * @private
 */
gmf.Permalink.prototype.addNgeoFeature_ = function(feature) {
  var uid = goog.getUid(feature);
  this.addListenerKey_(
    uid,
    ol.events.listen(feature, ol.events.EventType.CHANGE,
      this.handleNgeoFeaturesChange_, this),
    true
  );
};


/**
 * Unregister any event listener from the feature.
 * @param {ol.Feature} feature Feature.
 * @private
 */
gmf.Permalink.prototype.removeNgeoFeature_ = function(feature) {
  var uid = goog.getUid(feature);
  this.initListenerKey_(uid); // clear event listeners
  this.handleNgeoFeaturesChange_();
};


/**
 * Called once upon initialization of the permalink service if there's at
 * least one feature in the ngeoFeatures collection, then called everytime
 * the collection changes or any of the features within the collection changes.
 * @private
 */
gmf.Permalink.prototype.handleNgeoFeaturesChange_ = function() {
  var features = this.ngeoFeatures_.getArray();
  var data = this.featureHashFormat_.writeFeatures(features);

  var object = {};
  object[gmf.PermalinkParam.FEATURES] = data;
  this.ngeoStateManager_.updateState(object);
};


/**
 * Get the query data for a WFS permalink.
 * @return {ngeo.WfsPermalinkData|null} The query data.
 * @private
 */
gmf.Permalink.prototype.getWfsPermalinkData_ = function() {
  var wfsLayer = this.ngeoLocation_.getParam(gmf.PermalinkParam.WFS_LAYER);
  if (!wfsLayer) {
    return null;
  }

  var numGroups = this.ngeoLocation_.getParamAsInt(gmf.PermalinkParam.WFS_NGROUPS);
  var paramKeys = this.ngeoLocation_.getParamKeysWithPrefix(gmf.PermalinkParamPrefix.WFS);

  var filterGroups = [];
  var filterGroup;
  if (numGroups === undefined) {
    // no groups are used, e.g. '?wfs_layer=fuel&wfs_osm_id=123
    filterGroup = this.createFilterGroup_(gmf.PermalinkParamPrefix.WFS, paramKeys);
    if (filterGroup !== null) {
      filterGroups.push(filterGroup);
    }
  } else {
    // filter groups are used, e.g. '?wfs_layer=osm_scale&wfs_ngroups=2&wfs_0_ele=380&
    // wfs_0_highway=bus_stop&&wfs_1_name=Grand-Pont'
    for (var i = 0; i < numGroups; i++) {
      filterGroup = this.createFilterGroup_(gmf.PermalinkParamPrefix.WFS + i + '_', paramKeys);
      if (filterGroup !== null) {
        filterGroups.push(filterGroup);
      }
    }
  }

  if (filterGroups.length == 0) {
    return null;
  }

  var showFeaturesParam = this.ngeoLocation_.getParam(gmf.PermalinkParam.WFS_SHOW_FEATURES);
  var showFeatures = !(showFeaturesParam === '0' || showFeaturesParam === 'false');

  return {
    wfsType: wfsLayer,
    showFeatures: showFeatures,
    filterGroups: filterGroups
  };
};


/**
 * Create a filter group for a given prefix from the query params.
 * @param {string} prefix E.g. `wfs_` or `wfs_0_`.
 * @param {Array.<string>} paramKeys All param keys starting with `wfs_`.
 * @return {ngeo.WfsPermalinkFilterGroup|null} A filter group.
 * @private
 */
gmf.Permalink.prototype.createFilterGroup_ = function(prefix, paramKeys) {
  /**
   * @type {Array.<ngeo.WfsPermalinkFilter>}
   */
  var filters = [];

  paramKeys.forEach(function(paramKey) {
    if (paramKey == gmf.PermalinkParam.WFS_LAYER || paramKey == gmf.PermalinkParam.WFS_SHOW_FEATURES ||
        paramKey == gmf.PermalinkParam.WFS_NGROUPS || paramKey.indexOf(prefix) != 0) {
      return;
    }
    var value = this.ngeoLocation_.getParam(paramKey);
    if (!value) {
      return;
    }

    var condition = value;
    if (value.indexOf(',') > -1) {
      condition = value.split(',');
    }

    var filter = {
      property: paramKey.replace(prefix, ''),
      condition: condition
    };
    filters.push(filter);
  }.bind(this));

  return (filters.length > 0) ? {filters: filters} : null;
};


/**
 * @typedef {{
 *     goog: (Array.<goog.events.Key>),
 *     ol: (Array.<ol.EventsKey>)
 * }}
 */
gmf.Permalink.ListenerKeys;


gmf.module.service('gmfPermalink', gmf.Permalink);
