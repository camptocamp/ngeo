goog.provide('gmf.Permalink');

goog.require('gmf');
goog.require('ngeo');
goog.require('ngeo.AutoProjection');
goog.require('gmf.Themes');
goog.require('gmf.TreeManager');
/** @suppress {extraRequire} */
goog.require('gmf.ThemeManager');
goog.require('ngeo.BackgroundEventType');
goog.require('ngeo.BackgroundLayerMgr');
goog.require('ngeo.Debounce');
goog.require('ngeo.FeatureHelper');
/** @suppress {extraRequire} */
goog.require('ngeo.Features');
goog.require('ngeo.FeatureOverlay');
goog.require('ngeo.FeatureOverlayMgr');
goog.require('ngeo.Popover');
goog.require('ngeo.StateManager');
goog.require('ngeo.format.FeatureHash');
goog.require('ngeo.WfsPermalink');
goog.require('goog.asserts');
goog.require('ol.Feature');
goog.require('ol.geom.Point');
goog.require('ol.proj');
goog.require('ol.style.Stroke');
goog.require('ol.style.RegularShape');
goog.require('ol.style.Style');


/**
 * @enum {string}
 */
gmf.PermalinkOpenLayersLayerProperties = {
  OPACITY: 'opacity'
};

/**
 * @enum {string}
 */
gmf.PermalinkParamPrefix = {
  DIMENSIONS: 'dim_',
  TREE_ENABLE: 'tree_enable_',
  TREE_GROUP_LAYERS: 'tree_group_layers_',
  TREE_GROUP_OPACITY: 'tree_group_opacity_',
  TREE_OPACITY: 'tree_opacity_',
  WFS: 'wfs_'
};


gmf.module.value('gmfPermalinkOptions',
  /** @type {gmfx.PermalinkOptions} */ ({}));


/** Configure the ngeo state manager */
(function() {
  const regexp = [];
  for (const key1 in gmf.PermalinkParamPrefix) {
    regexp.push(new RegExp(`${gmf.PermalinkParamPrefix[key1]}.*`));
  }
  for (const key2 in gmf.PermalinkParam) {
    regexp.push(new RegExp(gmf.PermalinkParamPrefix[key2]));
  }
  ngeo.module.value('ngeoUsedKeyRegexp', regexp);
})();


/**
 * The Permalink service for GMF, which uses the `ngeo.StateManager` to manage
 * the GMF application state. Here's the list of states are are managed:
 *
 * - the map center and zoom level
 * - the current background layer selected
 * - whether to add a crosshair feature in the map or not
 * - the dimensions value
 *
 * To have the whole possibilities offer by the permalink, these services
 * should be instantiated: ngeoBackgroundLayerMgr, ngeoFeatureOverlayMgr,
 * ngeoFeatureHelper, gmfPermalinkOptions, gmfThemes, gmfObjectEditingManager,
 * gmfThemeManager, defaultTheme, gmfTreeManager, ngeoWfsPermalink,
 * ngeoAutoProjection and ngeoFeatures.
 *
 * @constructor
 * @struct
 * @param {angular.$timeout} $timeout Angular timeout service.
 * @param {angular.Scope} $rootScope Angular rootScope.
 * @param {angular.$injector} $injector Main injector.
 * @param {ngeo.Debounce} ngeoDebounce ngeo Debounce service.
 * @param {ngeo.StateManager} ngeoStateManager The ngeo StateManager service.
 * @param {ngeo.Location} ngeoLocation ngeo location service.
 * @ngInject
 * @ngdoc service
 * @ngname gmfPermalink
 */
gmf.Permalink = function($timeout, $rootScope, $injector, ngeoDebounce,
  ngeoStateManager, ngeoLocation) {

  /**
   * @type {angular.Scope}
   * @private
   */
  this.rootScope_ = $rootScope;

  /**
   * @type {angular.$timeout}
   * @private
   */
  this.$timeout_ = $timeout;

  // == listener keys ==

  /**
   * The key for map view 'propertychange' event.
   * @type {?ol.EventsKey}
   * @private
   */
  this.mapViewPropertyChangeEventKey_ = null;

  /**
   * @type {Object.<number, gmfx.PermalinkListenerKeys>}
   * @private
   */
  this.listenerKeys_ = {};

  // == properties from params ==

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
   * @type {?ol.Collection.<ol.Feature>}
   * @private
   */
  this.ngeoFeatures_ = $injector.has('ngeoFeatures') ?
    $injector.get('ngeoFeatures') : null;

  /**
   * @type {?ngeo.BackgroundLayerMgr}
   * @private
   */
  this.ngeoBackgroundLayerMgr_ = $injector.has('ngeoBackgroundLayerMgr') ?
    $injector.get('ngeoBackgroundLayerMgr') : null;

  /**
   * @type {?ngeo.FeatureOverlayMgr}
   */
  const ngeoFeatureOverlayMgr = $injector.has('ngeoFeatureOverlayMgr') ?
    $injector.get('ngeoFeatureOverlayMgr') : null;

  /**
   * @type {?ngeo.FeatureOverlay}
   * @private
   */
  this.featureOverlay_ = ngeoFeatureOverlayMgr ?
    ngeoFeatureOverlayMgr.getFeatureOverlay() : null;

  /**
   * @type {?ngeo.FeatureHelper}
   * @private
   */
  this.featureHelper_ = $injector.has('ngeoFeatureHelper') ?
    $injector.get('ngeoFeatureHelper') : null;

  /**
   * The options to configure the gmf permalink service with.
   * @type {!gmfx.PermalinkOptions}
   */
  const gmfPermalinkOptions = $injector.has('gmfPermalinkOptions') ?
    $injector.get('gmfPermalinkOptions') : {};
  if (gmfPermalinkOptions.useLocalStorage === false) {
    this.ngeoStateManager_.useLocalStorage = false;
  }

  /**
   * @type {boolean}
   * @private
   */
  this.crosshairEnabledByDefault_ = !!gmfPermalinkOptions.crosshairEnabledByDefault;

  /**
   * @type {?gmf.Themes}
   * @private
   */
  this.gmfThemes_ = $injector.has('gmfThemes') ? $injector.get('gmfThemes') : null;

  /**
   * @type {?gmf.ObjectEditingManager}
   * @private
   */
  this.gmfObjectEditingManager_ = $injector.has('gmfObjectEditingManager') ?
    $injector.get('gmfObjectEditingManager') : null;

  /**
   * @type {?gmf.ThemeManager}
   * @private
   */
  this.gmfThemeManager_ = $injector.has('gmfThemeManager') ?
    $injector.get('gmfThemeManager') : null;

  /**
   * @type {string|undefined}
   * @private
   */
  this.defaultTheme_ = $injector.has('defaultTheme') ?
    $injector.get('defaultTheme') : undefined;

  /**
   * @type {?gmf.TreeManager}
   * @private
   */
  this.gmfTreeManager_ = $injector.has('gmfTreeManager') ?
    $injector.get('gmfTreeManager') : null;

  // == other properties ==

  /**
   * @type {ngeo.Location}
   * @private
   */
  this.ngeoLocation_ = ngeoLocation;

  /**
   * @type {?ngeo.WfsPermalink}
   * @private
   */
  this.ngeoWfsPermalink_ = $injector.has('ngeoWfsPermalink') ?
    $injector.get('ngeoWfsPermalink') : null;

  /**
   * @type {?gmfx.User}
   * @export
   */
  this.gmfUser_ = $injector.has('gmfUser') ?
    $injector.get('gmfUser') : null;

  /**
   * @type {?ol.Map}
   * @private
   */
  this.map_ = null;

  /**
   * @type {?ngeo.AutoProjection}
   * @private
   */
  this.ngeoAutoProjection_ = $injector.has('ngeoAutoProjection') ?
    $injector.get('ngeoAutoProjection') : null;

  /**
   * A list of projections that the coordinates in the permalink can be in.
   * @type {?Array.<ol.proj.Projection>}
   * @private
   */
  this.sourceProjections_ = null;
  if (gmfPermalinkOptions.projectionCodes !== undefined && this.ngeoAutoProjection_) {
    const projections = this.ngeoAutoProjection_.getProjectionList(gmfPermalinkOptions.projectionCodes);
    if (projections.length > 0) {
      this.sourceProjections_ = projections;
    }
  }

  /**
   * @type {?ol.Feature}
   * @private
   */
  this.crosshairFeature_ = null;

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
   * @type {?ngeo.Popover}
   * @private
   */
  this.mapTooltip_ = null;

  /**
   * @type {ngeo.format.FeatureHash}
   * @private
   */
  this.featureHashFormat_ = new ngeo.format.FeatureHash({
    setStyle: false,
    encodeStyles: false,
    propertiesType: {
      'fillColor': ngeo.FeatureProperties.COLOR,
      'fillOpacity': ngeo.FeatureProperties.OPACITY,
      'fontColor': ngeo.FeatureProperties.COLOR,
      'fontSize': ngeo.FeatureProperties.SIZE,
      'isBox': ngeo.FeatureProperties.IS_RECTANGLE,
      'isCircle': ngeo.FeatureProperties.IS_CIRCLE,
      'isLabel': ngeo.FeatureProperties.IS_TEXT,
      'name': ngeo.FeatureProperties.NAME,
      'pointRadius': ngeo.FeatureProperties.SIZE,
      'showLabel': ngeo.FeatureProperties.SHOW_LABEL,
      'showMeasure': ngeo.FeatureProperties.SHOW_MEASURE,
      'strokeColor': ngeo.FeatureProperties.COLOR,
      'strokeWidth': ngeo.FeatureProperties.STROKE
    }
  });

  // == event listeners ==

  if (this.ngeoBackgroundLayerMgr_) {
    ol.events.listen(
      this.ngeoBackgroundLayerMgr_,
      ngeo.BackgroundEventType.CHANGE,
      this.handleBackgroundLayerManagerChange_,
      this);
  }

  // visibility
  this.rootScope_.$on('ngeo-layertree-state', (event, treeCtrl, firstParent) => {
    const newState = {};
    if (firstParent.node.mixed) {
      const state = treeCtrl.getState();
      goog.asserts.assert(state === 'on' || state === 'off');
      const visible = state === 'on';
      treeCtrl.traverseDepthFirst((ctrl) => {
        if (ctrl.node.children === undefined) {
          const param = gmf.PermalinkParamPrefix.TREE_ENABLE + ctrl.node.name;
          newState[param] = visible;
        }
      });
    } else {
      const gmfLayerNames = [];
      firstParent.traverseDepthFirst((ctrl) => {
        if (ctrl.node.children === undefined && ctrl.getState() === 'on') {
          gmfLayerNames.push(ctrl.node.name);
        }
      });
      newState[gmf.PermalinkParamPrefix.TREE_GROUP_LAYERS + firstParent.node.name] = gmfLayerNames.join(',');
    }
    this.ngeoStateManager_.updateState(newState);
  });
  this.rootScope_.$on('ngeo-layertree-opacity', (event, treeCtrl) => {
    const newState = {};
    const opacity = treeCtrl.layer.getOpacity();
    const stateName = (treeCtrl.parent.node.mixed ?
      gmf.PermalinkParamPrefix.TREE_OPACITY : gmf.PermalinkParamPrefix.TREE_GROUP_OPACITY
    ) + treeCtrl.node.name;
    newState[stateName] = opacity;
    this.ngeoStateManager_.updateState(newState);
  });

  // ngeoFeatures
  //   (1) read from features from the state manager first, add them
  //   (2) listen for further features added/removed
  const features = this.getFeatures();
  if (this.ngeoFeatures_) {
    features.forEach(function(feature) {
      if (this.featureHelper_) {
        this.featureHelper_.setStyle(feature);
      }
      this.addNgeoFeature_(feature);
    }, this);

    this.ngeoFeatures_.extend(features);
    ol.events.listen(this.ngeoFeatures_, ol.CollectionEventType.ADD,
      this.handleNgeoFeaturesAdd_, this);
    ol.events.listen(this.ngeoFeatures_, ol.CollectionEventType.REMOVE,
      this.handleNgeoFeaturesRemove_, this);
  }

  if (this.featureHelper_) {
    this.rootScope_.$on('$localeChangeSuccess', () => {
      features.forEach(function(feature) {
        this.featureHelper_.setStyle(feature);
      }, this);
    });
  }

  if (this.gmfThemeManager_) {
    this.rootScope_.$on(gmf.ThemeManagerEventType.THEME_NAME_SET, (event, name) => {
      this.setThemeInUrl_(name);
    });
  }

  this.initLayers_();
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
      this.listenerKeys_[uid].goog.forEach((key) => {
        goog.events.unlistenByKey(key);
      }, this);
      this.listenerKeys_[uid].goog.length = 0;
    }
    if (this.listenerKeys_[uid].ol.length) {
      this.listenerKeys_[uid].ol.forEach((key) => {
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

  const isol = opt_isol !== undefined ? opt_isol : true;
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
  const x = this.ngeoStateManager_.getInitialNumberValue(gmf.PermalinkParam.MAP_X);
  const y = this.ngeoStateManager_.getInitialNumberValue(gmf.PermalinkParam.MAP_Y);

  if (!isNaN(x) && !isNaN(y)) {
    const center = [x, y];
    if (this.sourceProjections_ !== null && this.ngeoAutoProjection_) {
      const targetProjection = this.map_.getView().getProjection();
      const reprojectedCenter = this.ngeoAutoProjection_.tryProjectionsWithInversion(
        center, targetProjection.getExtent(), targetProjection,
        this.sourceProjections_);
      if (reprojectedCenter) {
        return reprojectedCenter;
      }
    }
    return center;
  }
  return null;
};


/**
 * Get the zoom level to use to initialize the map view from the state manager.
 * @return {number|undefined} The zoom for the map view.
 * @export
 */
gmf.Permalink.prototype.getMapZoom = function() {
  const zoom = this.ngeoStateManager_.getInitialNumberValue(gmf.PermalinkParam.MAP_Z);
  return isNaN(zoom) ? undefined : zoom;
};


// === Map crosshair ===


/**
 * Get the map crosshair property from the state manager, if defined.
 * @return {boolean} Whether map crosshair property is set or not.
 * @export
 */
gmf.Permalink.prototype.getMapCrosshair = function() {
  const crosshair = this.ngeoStateManager_.getInitialBooleanValue(gmf.PermalinkParam.MAP_CROSSHAIR);
  return crosshair === undefined ? this.crosshairEnabledByDefault_ : crosshair;
};


/**
 * Sets the map crosshair to the center (or the map center if nothing provided).
 * Overwrites an existing map crosshair.
 * @param {?ol.Coordinate=} opt_center Optional center coordinate.
 */
gmf.Permalink.prototype.setMapCrosshair = function(opt_center) {
  let crosshairCoordinate;
  if (opt_center) {
    crosshairCoordinate = opt_center;
  } else {
    crosshairCoordinate = this.map_.getView().getCenter();
  }
  goog.asserts.assertArray(crosshairCoordinate);

  // remove existing crosshair first
  if (this.crosshairFeature_) {
    this.featureOverlay_.removeFeature(this.crosshairFeature_);
  }
  // set new crosshair
  this.crosshairFeature_ = new ol.Feature(
    new ol.geom.Point(crosshairCoordinate));
  this.crosshairFeature_.setStyle(this.crosshairStyle_);

  // add to overlay
  this.featureOverlay_.addFeature(this.crosshairFeature_);
};


// === Map tooltip ===


/**
 * Get the tooltip text from the state manager.
 * @return {string|undefined} Tooltip text.
 * @export
 */
gmf.Permalink.prototype.getMapTooltip = function() {
  return this.ngeoStateManager_.getInitialStringValue(gmf.PermalinkParam.MAP_TOOLTIP);
};

/**
 * Sets the map tooltip to the center (or the map center if nothing provided).
 * Overwrites an existing map tooltip.
 * @param {string} tooltipText Text to display in tooltip.
 * @param {?ol.Coordinate=} opt_center Optional center coordinate.
 */
gmf.Permalink.prototype.setMapTooltip = function(tooltipText, opt_center) {
  let tooltipPosition;
  if (opt_center) {
    tooltipPosition = opt_center;
  } else {
    tooltipPosition = this.map_.getView().getCenter();
  }
  goog.asserts.assertArray(tooltipPosition);

  const div = $('<div/>', {
    'class': 'gmf-permalink-tooltip',
    'text': tooltipText
  })[0];

  if (this.mapTooltip_ !== null) {
    this.map_.removeOverlay(this.mapTooltip_);
  }

  this.mapTooltip_ = new ngeo.Popover({
    element: div,
    position: tooltipPosition
  });

  this.map_.addOverlay(this.mapTooltip_);
};


// === NgeoFeatures (A.K.A. DrawFeature, RedLining) ===


/**
 * Get the ngeo features from the state manager for initialization purpose
 * @return {!Array.<!ol.Feature>} The features read from the state manager.
 * @export
 */
gmf.Permalink.prototype.getFeatures = function() {
  const f = this.ngeoStateManager_.getInitialStringValue(gmf.PermalinkParam.FEATURES);
  if (f !== undefined && f !== '') {
    return goog.asserts.assert(this.featureHashFormat_.readFeatures(f));
  }
  return [];
};


/**
 * @param {!Object.<string, string>} dimensions The global dimensions object.
 * @export
 */
gmf.Permalink.prototype.setDimensions = function(dimensions) {
  // apply initial state
  const keys = this.ngeoLocation_.getParamKeysWithPrefix(gmf.PermalinkParamPrefix.DIMENSIONS);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = this.ngeoLocation_.getParam(key);
    goog.asserts.assert(value);
    dimensions[key.slice(gmf.PermalinkParamPrefix.DIMENSIONS.length)] = value;
  }

  this.rootScope_.$watchCollection(() => dimensions, (dimensions) => {
    const params = {};
    for (const key in dimensions) {
      params[gmf.PermalinkParamPrefix.DIMENSIONS + key] = dimensions[key];
    }
    this.ngeoLocation_.updateParams(params);
  });
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
    this.map_ = map;
    if (this.gmfObjectEditingManager_) {
      this.gmfObjectEditingManager_.getFeature().then((feature) => {
        this.registerMap_(map, feature);
      });
    } else {
      this.registerMap_(map, null);
    }
  }

};


/**
 * Listen to the map view property change and update the state accordingly.
 * @param {ol.Map} map The ol3 map object.
 * @param {?ol.Feature} oeFeature ObjectEditing feature
 * @private
 */
gmf.Permalink.prototype.registerMap_ = function(map, oeFeature) {

  const view = map.getView();
  let center;

  // (1) Initialize the map view with either:
  //     a) the given ObjectEditing feature
  //     b) the X, Y and Z available within the permalink service, if available
  if (oeFeature && oeFeature.getGeometry()) {
    const size = map.getSize();
    goog.asserts.assert(size);
    view.fit(oeFeature.getGeometry().getExtent(), size);
  } else {
    center = this.getMapCenter();
    if (center) {
      view.setCenter(center);
    }
    const zoom = this.getMapZoom();
    if (zoom !== undefined) {
      view.setZoom(zoom);
    }
  }


  // (2) Listen to any property changes within the view and apply them to
  //     the permalink service
  this.mapViewPropertyChangeEventKey_ = ol.events.listen(
    view,
    'propertychange',
    this.ngeoDebounce_(() => {
      const center = view.getCenter();
      const zoom = view.getZoom();
      const object = {};
      object[gmf.PermalinkParam.MAP_X] = Math.round(center[0]);
      object[gmf.PermalinkParam.MAP_Y] = Math.round(center[1]);
      object[gmf.PermalinkParam.MAP_Z] = zoom;
      this.ngeoStateManager_.updateState(object);
    }, 300, /* invokeApply */ true),
    this);

  // (3) Add map crosshair, if set
  if (this.getMapCrosshair() && this.featureOverlay_) {
    this.setMapCrosshair(center);
  }

  // (4) Add map tooltip, if set
  const tooltipText = this.getMapTooltip();
  if (tooltipText) {
    this.setMapTooltip(tooltipText, center);
  }

  // (6) check for a wfs permalink
  const wfsPermalinkData = this.getWfsPermalinkData_();
  if (wfsPermalinkData !== null && this.ngeoWfsPermalink_) {
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
};


// === Background layer ===


/**
 * Get the background layer object to use to initialize the map from the
 * state manager.
 * @param {!Array.<!ol.layer.Base>} layers Array of background layer objects.
 * @return {?ol.layer.Base} Background layer.
 * @export
 */
gmf.Permalink.prototype.getBackgroundLayer = function(layers) {
  const layerName = this.ngeoStateManager_.getInitialStringValue(gmf.PermalinkParam.BG_LAYER);
  if (layerName !== undefined) {
    for (const layer of layers) {
      if (layer.get('label') === layerName) {
        return layer;
      }
    }
  }
  return null;
};


/**
 * Called when the background layer changes. Update the state using the
 * background layer label, i.e. its name.
 * @private
 */
gmf.Permalink.prototype.handleBackgroundLayerManagerChange_ = function() {
  if (!this.map_ || !this.ngeoBackgroundLayerMgr_) {
    return;
  }

  // get layer label, i.e its name
  const layer = this.ngeoBackgroundLayerMgr_.get(this.map_);
  const layerName = layer.get('label');
  goog.asserts.assertString(layerName);

  // set it in state
  const object = {};
  object[gmf.PermalinkParam.BG_LAYER] = layerName;
  this.ngeoStateManager_.updateState(object);
};


// === Layers (layer tree) ===


/**
 * Get the current first level node names in the tree manager and update the
 * correspondent state of the permalink.
 * @export
 */
gmf.Permalink.prototype.refreshFirstLevelGroups = function() {
  if (!this.gmfTreeManager_) {
    return;
  }
  // Get first-level-groups order
  const groupNodes = this.gmfTreeManager_.rootCtrl.node.children;
  const orderedNames = groupNodes.map(node => node.name);

  // set it in state
  const object = {};
  object[gmf.PermalinkParam.TREE_GROUPS] = orderedNames.join(',');
  this.ngeoStateManager_.updateState(object);
};


/**
 * Return true if there is a theme specified in the URL path.
 * @private
 * @param {Array.<string>} pathElements Array of path elements.
 * @return {boolean} theme in path.
 */
gmf.Permalink.prototype.themeInUrl_ = function(pathElements) {
  const indexOfTheme = pathElements.indexOf('theme');
  return indexOfTheme != -1 && indexOfTheme == pathElements.length - 2;
};


/**
 * @param {string} themeName Theme name.
 * @private
 */
gmf.Permalink.prototype.setThemeInUrl_ = function(themeName) {
  if (themeName) {
    const pathElements = this.ngeoLocation_.getPath().split('/');
    goog.asserts.assert(pathElements.length > 1);
    if (pathElements[pathElements.length - 1] === '') {
      // case where the path is just "/"
      pathElements.splice(pathElements.length - 1);
    }
    if (this.themeInUrl_(pathElements)) {
      pathElements[pathElements.length - 1] = themeName;
    } else {
      pathElements.push('theme', themeName);
    }
    this.ngeoLocation_.setPath(pathElements.join('/'));
  }
};


/**
 * Get the default theme from url, local storage, user functionalities or
 * defaultTheme constant.
 * @return {?string} default theme name.
 * @export
 */
gmf.Permalink.prototype.defaultThemeName = function() {

  // check if we have a theme in url
  const pathElements = this.ngeoLocation_.getPath().split('/');
  if (this.themeInUrl_(pathElements)) {
    return pathElements[pathElements.length - 1];
  }

  // check if we have a theme in the local storage
  const tn = this.ngeoStateManager_.getInitialStringValue('theme');
  if (tn) {
    return tn;
  }

  const defaultTheme = this.defaultThemeNameFromFunctionalities();
  if (defaultTheme !== null) {
    return defaultTheme;
  }

  // fallback to the defaultTheme constant
  if (this.defaultTheme_) {
    return this.defaultTheme_;
  }

  return null;
};


/**
 * Get the default theme from user functionalities.
 * @return {?string} default theme name.
 * @export
 */
gmf.Permalink.prototype.defaultThemeNameFromFunctionalities = function() {
  //check if we have a theme in the user functionalities
  if (!this.gmfUser_) {
    return null;
  }
  const functionalities = this.gmfUser_.functionalities;
  if (functionalities && 'default_theme' in functionalities) {
    const defaultTheme = functionalities.default_theme;
    if (defaultTheme.length > 0) {
      return defaultTheme[0];
    }
  }
  return null;
};


/**
 * @private
 */
gmf.Permalink.prototype.initLayers_ = function() {
  if (!this.gmfThemes_) {
    return;
  }
  this.gmfThemes_.getThemesObject().then((themes) => {
    const themeName = this.defaultThemeName();
    goog.asserts.assert(themeName !== null);

    if (this.gmfThemeManager_) {
      this.gmfThemeManager_.setThemeName(this.gmfThemeManager_.modeFlush ? themeName : '');
    }

    /**
     * @type {Array<(gmfThemes.GmfGroup)>}
     */
    let firstLevelGroups = [];
    let theme;
    // Check if we have the groups in the permalink
    const groupsNames = this.ngeoLocation_.getParam(gmf.PermalinkParam.TREE_GROUPS);
    if (groupsNames === undefined) {
      goog.asserts.assertString(themeName);
      theme = gmf.Themes.findThemeByName(themes, themeName);
      if (theme) {
        firstLevelGroups = theme.children;
      }
    } else {
      groupsNames.split(',').forEach((groupName) => {
        const group = gmf.Themes.findGroupByName(themes, groupName);
        if (group) {
          firstLevelGroups.push(group);
        }
      });
    }

    if (this.gmfTreeManager_) {
      this.gmfTreeManager_.setFirstLevelGroups(firstLevelGroups);
    }

    this.$timeout_(() => {
      if (!this.gmfTreeManager_ || !this.gmfTreeManager_.rootCtrl) {
        // we don't have any layertree
        return;
      }
      // Enable the layers and set the opacity
      this.gmfTreeManager_.rootCtrl.traverseDepthFirst((treeCtrl) => {
        if (treeCtrl.isRoot) {
          return;
        }

        const opacity = this.ngeoStateManager_.getInitialNumberValue((
          treeCtrl.parent.node.mixed ?
            gmf.PermalinkParamPrefix.TREE_OPACITY :
            gmf.PermalinkParamPrefix.TREE_GROUP_OPACITY
        ) + treeCtrl.node.name);
        if (opacity !== undefined && treeCtrl.layer) {
          treeCtrl.layer.setOpacity(opacity);
        }
        if (treeCtrl.parent.node && treeCtrl.parent.node.mixed && treeCtrl.node.children == undefined) {
          // Layer of a mixed group
          const enable = this.ngeoStateManager_.getInitialBooleanValue(
            gmf.PermalinkParamPrefix.TREE_ENABLE + treeCtrl.node.name
          );
          if (enable !== undefined) {
            treeCtrl.setState(enable ? 'on' : 'off', false);
          }
        } else if (!treeCtrl.node.mixed && treeCtrl.depth == 1) {
          // First level non mixed group
          const groupLayers = this.ngeoStateManager_.getInitialStringValue(
            gmf.PermalinkParamPrefix.TREE_GROUP_LAYERS + treeCtrl.node.name
          );
          if (groupLayers !== undefined) {
            const groupLayersArray = groupLayers.split(',');
            treeCtrl.traverseDepthFirst((treeCtrl) => {
              if (treeCtrl.node.children === undefined) {
                const enable = ol.array.includes(groupLayersArray, treeCtrl.node.name);
                treeCtrl.setState(enable ? 'on' : 'off', false);
              }
            });
          }
        }
      });
      const firstParents = this.gmfTreeManager_.rootCtrl.children;
      firstParents.forEach((firstParent) => {
        firstParent.traverseDepthFirst((treeCtrl) => {
          if (treeCtrl.getState() !== 'indeterminate') {
            this.rootScope_.$broadcast('ngeo-layertree-state', treeCtrl, firstParent);
            return ngeo.LayertreeController.VisitorDecision.STOP;
          }
        });
      });
    });
  });
};


// === ngeoFeatures, A.K.A features from the DrawFeature, RedLining  ===


/**
 * @param {ol.Collection.Event} event Collection event.
 * @private
 */
gmf.Permalink.prototype.handleNgeoFeaturesAdd_ = function(event) {
  const feature = event.element;
  goog.asserts.assertInstanceof(feature, ol.Feature);
  this.addNgeoFeature_(feature);
};


/**
 * @param {ol.Collection.Event} event Collection event.
 * @private
 */
gmf.Permalink.prototype.handleNgeoFeaturesRemove_ = function(event) {
  const feature = event.element;
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
  const uid = ol.getUid(feature);
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
  const uid = ol.getUid(feature);
  this.initListenerKey_(uid); // clear event listeners
  this.handleNgeoFeaturesChange_();
};


/**
 * Called once upon initialization of the permalink service if there's at
 * least one feature in the ngeoFeatures collection, then called every time
 * the collection changes or any of the features within the collection changes.
 * @private
 */
gmf.Permalink.prototype.handleNgeoFeaturesChange_ = function() {
  if (!this.ngeoFeatures_) {
    return;
  }
  const features = this.ngeoFeatures_.getArray();
  const data = this.featureHashFormat_.writeFeatures(features);

  const object = {};
  object[gmf.PermalinkParam.FEATURES] = data;
  this.ngeoStateManager_.updateState(object);
};


/**
 * Get the query data for a WFS permalink.
 * @return {ngeo.WfsPermalinkData|null} The query data.
 * @private
 */
gmf.Permalink.prototype.getWfsPermalinkData_ = function() {
  const wfsLayer = this.ngeoLocation_.getParam(gmf.PermalinkParam.WFS_LAYER);
  if (!wfsLayer) {
    return null;
  }

  const numGroups = this.ngeoLocation_.getParamAsInt(gmf.PermalinkParam.WFS_NGROUPS);
  const paramKeys = this.ngeoLocation_.getParamKeysWithPrefix(gmf.PermalinkParamPrefix.WFS);

  const filterGroups = [];
  let filterGroup;
  if (numGroups === undefined) {
    // no groups are used, e.g. '?wfs_layer=fuel&wfs_osm_id=123
    filterGroup = this.createFilterGroup_(gmf.PermalinkParamPrefix.WFS, paramKeys);
    if (filterGroup !== null) {
      filterGroups.push(filterGroup);
    }
  } else {
    // filter groups are used, e.g. '?wfs_layer=osm_scale&wfs_ngroups=2&wfs_0_ele=380&
    // wfs_0_highway=bus_stop&&wfs_1_name=Grand-Pont'
    for (let i = 0; i < numGroups; i++) {
      filterGroup = this.createFilterGroup_(`${gmf.PermalinkParamPrefix.WFS + i}_`, paramKeys);
      if (filterGroup !== null) {
        filterGroups.push(filterGroup);
      }
    }
  }

  if (filterGroups.length == 0) {
    return null;
  }

  const showFeaturesParam = this.ngeoLocation_.getParam(gmf.PermalinkParam.WFS_SHOW_FEATURES);
  const showFeatures = !(showFeaturesParam === '0' || showFeaturesParam === 'false');

  return {
    wfsType: wfsLayer,
    showFeatures,
    filterGroups
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
  const filters = [];

  paramKeys.forEach((paramKey) => {
    if (paramKey == gmf.PermalinkParam.WFS_LAYER || paramKey == gmf.PermalinkParam.WFS_SHOW_FEATURES ||
        paramKey == gmf.PermalinkParam.WFS_NGROUPS || paramKey.indexOf(prefix) != 0) {
      return;
    }
    const value = this.ngeoLocation_.getParam(paramKey);
    if (!value) {
      return;
    }

    let condition = value;
    if (value.indexOf(',') > -1) {
      condition = value.split(',');
    }

    const filter = {
      property: paramKey.replace(prefix, ''),
      condition
    };
    filters.push(filter);
  });

  return (filters.length > 0) ? {filters} : null;
};


/**
 * Contains the layer name
 * @param {!ol.layer.Base} layer The layer to inspect
 * @param {string} name The layer name to find
 * @return {boolean} The containing status
 */
gmf.Permalink.prototype.containsLayerName = function(layer, name) {
  if (layer instanceof ol.layer.Group) {
    for (const l of layer.getLayers().getArray()) {
      goog.asserts.assert(l);
      if (this.containsLayerName(l, name)) {
        return true;
      }
    }
    return false;
  } else {
    return layer.get('layerNodeName') == name;
  }
};


/**
 * Clean the permalink parameters
 * @param {!Array.<gmfThemes.GmfGroup>} groups firstlevel groups of the tree
 */
gmf.Permalink.prototype.cleanParams = function(groups) {
  const keys = goog.asserts.assert(this.ngeoLocation_.getParamKeys());
  for (const key of keys) {
    if (key.startsWith(gmf.PermalinkParamPrefix.TREE_GROUP_LAYERS)) {
      const value = key.substring(gmf.PermalinkParamPrefix.TREE_GROUP_LAYERS.length);
      for (const group of groups) {
        if (group.name == value) {
          this.ngeoStateManager_.deleteParam(key);
          break;
        }
      }
    }
    if (key.startsWith(gmf.PermalinkParamPrefix.TREE_GROUP_OPACITY)) {
      const value = key.substring(gmf.PermalinkParamPrefix.TREE_GROUP_OPACITY.length);
      for (const group of groups) {
        if (group.name == value) {
          this.ngeoStateManager_.deleteParam(key);
          break;
        }
      }
    }
  }
  this.$timeout_(() => {
    if (!this.map_) {
      return;
    }
    const layer = this.map_.getLayerGroup();
    goog.asserts.assert(layer);
    for (const key of keys) {
      if (key.startsWith(gmf.PermalinkParamPrefix.TREE_ENABLE)) {
        const value = key.substring(gmf.PermalinkParamPrefix.TREE_ENABLE.length);
        if (!this.containsLayerName(layer, value)) {
          this.ngeoStateManager_.deleteParam(key);
        }
      }
      if (key.startsWith(gmf.PermalinkParamPrefix.TREE_OPACITY)) {
        const value = key.substring(gmf.PermalinkParamPrefix.TREE_OPACITY.length);
        if (!this.containsLayerName(layer, value)) {
          this.ngeoStateManager_.deleteParam(key);
        }
      }
    }
  });
};


gmf.module.service('gmfPermalink', gmf.Permalink);
