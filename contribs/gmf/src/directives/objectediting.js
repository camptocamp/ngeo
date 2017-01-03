goog.provide('gmf.ObjecteditingController');
goog.provide('gmf.objecteditingDirective');

goog.require('gmf');
/** @suppress {extraRequire} */
goog.require('gmf.objecteditingtoolsDirective');
goog.require('gmf.EditFeature');
goog.require('gmf.ObjectEditingQuery');
goog.require('ngeo.DecorateInteraction');
goog.require('ngeo.FeatureHelper');
/** @suppress {extraRequire} */
goog.require('ngeo.jstsExports');
goog.require('ngeo.LayerHelper');
goog.require('ngeo.ToolActivate');
goog.require('ngeo.ToolActivateMgr');
goog.require('ol.Collection');
goog.require('ol.format.GeoJSON');
goog.require('ol.geom.MultiLineString');
goog.require('ol.geom.MultiPoint');
goog.require('ol.geom.MultiPolygon');
goog.require('ol.interaction.Modify');
goog.require('ol.style.Circle');
goog.require('ol.style.Fill');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');


/**
 * Directive used to edit the geometry of a single feature using advanced
 * tools. The geometry must be Multi.
 *
 * Example:
 *
 *     <gmf-objectediting
 *         gmf-objectediting-active="ctrl.objectEditingActive"
 *         gmf-objectediting-feature="ctrl.objectEditingFeature"
 *         gmf-objectediting-geomtype="ctrl.objectEditingGeomType"
 *         gmf-objectediting-layernodeid="ctrl.objectEditingLayerNodeId"
 *         gmf-objectediting-map="::ctrl.map"
 *         gmf-objectediting-sketchfeatures="::ctrl.sketchFeatures">
 *     </gmf-objectediting>
 *
 * @htmlAttribute {boolean} gmf-objectediting-active Whether the directive is
 *     active or not.
 * @htmlAttribute {ol.Feature} gmf-objectediting-feature The feature to edit.
 * @htmlAttribute {string} gmf-objectediting-geomtype The geometry type.
 * @htmlAttribute {number} gmf-objectediting-layernodeid The GMF layer node id.
 * @htmlAttribute {ol.Map} gmf-objectediting-map The map.
 * @htmlAttribute {ol.Collection.<ol.Feature>} gmf-objectediting-sketchfeatures
 *     Collection of temporary features being drawn by the tools.
 * @return {angular.Directive} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfObjectediting
 */
gmf.objecteditingDirective = function() {
  return {
    controller: 'GmfObjecteditingController as oeCtrl',
    scope: {
      'active': '=gmfObjecteditingActive',
      'feature': '<gmfObjecteditingFeature',
      'geomType': '<gmfObjecteditingGeomtype',
      'layerNodeId': '<gmfObjecteditingLayernodeid',
      'map': '<gmfObjecteditingMap',
      'sketchFeatures': '<gmfObjecteditingSketchfeatures'
    },
    bindToController: true,
    templateUrl: gmf.baseTemplateUrl + '/objectediting.html'
  };
};

gmf.module.directive('gmfObjectediting', gmf.objecteditingDirective);


/**
 * @param {!angular.Scope} $scope Angular scope.
 * @param {angular.$timeout} $timeout Angular timeout service.
 * @param {angularGettext.Catalog} gettextCatalog Gettext catalog.
 * @param {gmf.EditFeature} gmfEditFeature Gmf edit feature service.
 * @param {gmf.ObjectEditingQuery} gmfObjectEditingQuery Gmf ObjectEditing
 *     query service.
 * @param {gmf.TreeManager} gmfTreeManager The gmf TreeManager service.
 * @param {ngeo.DecorateInteraction} ngeoDecorateInteraction Decorate
 *     interaction service.
 * @param {ngeo.FeatureHelper} ngeoFeatureHelper Ngeo feature helper service.
goog.require('ngeo.LayerHelper');
 * @param {ngeo.LayerHelper} ngeoLayerHelper Ngeo Layer Helper.
 * @param {ngeo.ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate manager
 *     service.
 * @constructor
 * @ngInject
 * @ngdoc controller
 * @ngname GmfObjecteditingController
 */
gmf.ObjecteditingController = function($scope, $timeout, gettextCatalog,
    gmfEditFeature, gmfObjectEditingQuery, gmfTreeManager,
    ngeoDecorateInteraction, ngeoFeatureHelper, ngeoLayerHelper,
    ngeoToolActivateMgr) {

  // == Scope properties ==

  /**
   * @type {boolean}
   * @export
   */
  this.active;

  /**
   * @type {ol.Feature}
   * @export
   */
  this.feature;

  /**
   * @type {string}
   * @export
   */
  this.geomType;

  /**
   * @type {number}
   * @export
   */
  this.layerNodeId;

  /**
   * @type {ol.Map}
   * @export
   */
  this.map;

  /**
   * @type {ol.Collection.<ol.Feature>}
   * @export
   */
  this.sketchFeatures;


  // == Injected properties ==

  /**
   * @type {!angular.Scope}
   * @private
   */
  this.scope_ = $scope;

  /**
   * @type {angular.$timeout}
   * @private
   */
  this.timeout_ = $timeout;

  /**
   * @private
   */
  this.gettextCatalog_ = gettextCatalog;

  /**
   * @type {gmf.EditFeature}
   * @private
   */
  this.gmfEditFeature_ = gmfEditFeature;

  /**
   * @type {gmf.ObjectEditingQuery}
   * @private
   */
  this.gmfObjectEditingQuery_ = gmfObjectEditingQuery;

  /**
   * @type {Array.<gmf.ObjectEditingQuery.QueryableLayerInfo>}
   * @export
   */
  this.queryableLayersInfo;

  gmfObjectEditingQuery.getQueryableLayersInfo().then(
    this.handleGetQueryableLayersInfo_.bind(this)
  );

  /**
   * @type {gmf.ObjectEditingQuery.QueryableLayerInfo}
   * @export
   */
  this.selectedQueryableLayerInfo;

  /**
   * Whether to show or hide the queryable list of layers. It is shown only
   * when a tool requires it, which is managed in the `gmf-objecteditingtools`
   * directive.
   * @type {boolean}
   * @export
   */
  this.queryableLayerListShown = false;

  /**
   * @type {boolean}
   * @export
   */
  this.copyFromActive = false;

  /**
   * @type {boolean}
   * @export
   */
  this.deleteFromActive = false;

  /**
   * @type {ngeo.LayerHelper}
   * @private
   */
  this.ngeoLayerHelper_ = ngeoLayerHelper;

  /**
   * @type {gmf.TreeManager}
   * @private
   */
  this.gmfTreeManager_ = gmfTreeManager;

  $scope.$watchCollection(
    function() {
      if (this.gmfTreeManager_.rootCtrl) {
        return this.gmfTreeManager_.rootCtrl.children;
      }
    }.bind(this),
    function(value) {
      // Timeout required, because the collection event is fired before the
      // leaf nodes are created and they are the ones we're looking for here.
      this.timeout_(function() {
        if (value) {
          this.unregisterAllTreeCtrl_();
          this.gmfTreeManager_.rootCtrl.traverseDepthFirst(
            this.registerTreeCtrl_.bind(this)
          );
        }
      }.bind(this));
    }.bind(this)
  );

  /**
   * @type {ngeo.DecorateInteraction}
   * @private
   */
  this.ngeoDecorateInteraction_ = ngeoDecorateInteraction;

  /**
   * @type {ngeo.FeatureHelper}
   * @private
   */
  this.ngeoFeatureHelper_ = ngeoFeatureHelper;

  /**
   * @type {ngeo.ToolActivateMgr}
   * @private
   */
  this.ngeoToolActivateMgr_ = ngeoToolActivateMgr;


  // == Other properties ==

  /**
   * @type {boolean}
   * @private
   */
  this.skipGeometryChange_ = false;

  /**
   * @type {string}
   * @export
   */
  this.process = gmf.ObjecteditingtoolsController.ProcessType.ADD;

  /**
   * @type {null|ol.layer.Image|ol.layer.Tile}
   * @private
   */
  this.editableWMSLayer_ = null;

  /**
   * @type {jsts.io.OL3Parser}
   * @private
   */
  this.jstsOL3Parser_ = new jsts.io.OL3Parser();

  var geometry = this.feature.getGeometry();

  /**
   * The state of the feature determines whether the next 'save' request
   * should be an 'insert' or 'update' one.
   * @type {string}
   * @private
   */
  this.state_ = geometry ? gmf.ObjecteditingController.State.UPDATE :
    gmf.ObjecteditingController.State.INSERT;

  /**
   * @type {Array.<?ol.geom.Geometry>}
   * @private
   */
  this.geometryChanges_ = [];

  this.scope_.$watchCollection(
    function() {
      return this.geometryChanges_;
    }.bind(this),
    function(newVal, oldVal) {
      if (newVal.length) {
        if (newVal.length === 1) {
          this.dirty = false;
        } else {
          this.dirty = true;
        }
      }
    }.bind(this)
  );

  var defaultColor = [39, 155, 145];
  var dirtyColor = [153, 51, 51];

  /**
   * @type {gmf.ObjecteditingController.Styles}
   * @private
   */
  this.defaultStyles_ = {};
  this.initializeStyles_(this.defaultStyles_, defaultColor);

  /**
   * @type {gmf.ObjecteditingController.Styles}
   * @private
   */
  this.defaultStylesWoVertice_ = {};
  this.initializeStyles_(this.defaultStylesWoVertice_, defaultColor, false);

  /**
   * @type {gmf.ObjecteditingController.Styles}
   * @private
   */
  this.dirtyStyles_ = {};
  this.initializeStyles_(this.dirtyStyles_, dirtyColor);

  /**
   * @type {gmf.ObjecteditingController.Styles}
   * @private
   */
  this.dirtyStylesWoVertice_ = {};
  this.initializeStyles_(this.dirtyStylesWoVertice_, dirtyColor, false);

  /**
   * Flag that is toggled while a request is pending.
   * @export
   */
  this.pending = false;

  /**
   * @type {boolean}
   * @export
   */
  this.dirty = false;

  $scope.$watch(
    function() {
      return this.dirty;
    }.bind(this),
    this.setFeatureStyle_.bind(this)
  );

  /**
   * @type {Array.<ol.EventsKey>}
   * @private
   */
  this.listenerKeys_ = [];

  /**
   * @type {ol.Collection}
   * @private
   */
  this.features_ = new ol.Collection();
  this.features_.push(this.feature);

  /**
   * @type {ol.Collection}
   * @private
   */
  this.interactions_ = new ol.Collection();

  /**
   * @type {ol.interaction.Modify}
   * @private
   */
  this.modify_ = new ol.interaction.Modify({
    features: this.features_,
    style: ngeoFeatureHelper.getVertexStyle(false)
  });
  this.interactions_.push(this.modify_);

  /**
   * @type {ngeo.ToolActivate}
   * @private
   */
  this.modifyToolActivate_ = new ngeo.ToolActivate(this.modify_, 'active');

  /**
   * @type {boolean}
   * @export
   */
  this.toolsActive = false;

  /**
   * @type {ngeo.ToolActivate}
   * @private
   */
  this.toolsToolActivate_ = new ngeo.ToolActivate(this, 'toolsActive');

  // Toggle on
  this.initializeInteractions_();
  this.registerInteractions_();
  this.toggle_(true);
  this.resetGeometryChanges_();

  $scope.$on('$destroy', this.handleDestroy_.bind(this));

};


// == API methods ==


/**
 * Delete the feature after asking for a confirmation.
 * @export
 */
gmf.ObjecteditingController.prototype.delete = function() {
  var msg = this.gettextCatalog_.getString(
      'Do you really want to delete the feature?');
  // Confirm deletion first
  if (confirm(msg)) {
    this.dirty = false;
    this.pending = true;

    this.gmfEditFeature_.deleteFeature(
      this.layerNodeId,
      this.feature
    ).then(
      this.handleDeleteFeature_.bind(this)
    );
  }

};


/**
 * Save the current modifications.
 * @export
 */
gmf.ObjecteditingController.prototype.save = function() {

  this.pending = true;

  if (this.state_ === gmf.ObjecteditingController.State.INSERT) {
    this.gmfEditFeature_.insertFeatures(
      this.layerNodeId,
      [this.feature]
    ).then(
      this.handleEditFeature_.bind(this)
    );
  } else if (this.state_ === gmf.ObjecteditingController.State.UPDATE) {
    this.gmfEditFeature_.updateFeature(
      this.layerNodeId,
      this.feature
    ).then(
      this.handleEditFeature_.bind(this)
    );
  }
};


/**
 * Undo the latest modifications.
 * @export
 */
gmf.ObjecteditingController.prototype.undo = function() {

  if (this.geometryChanges_.length <= 1) {
    return;
  }

  this.skipGeometryChange_ = true;

  this.geometryChanges_.pop();
  var clone = gmf.ObjecteditingController.cloneGeometry_(
    this.geometryChanges_[this.geometryChanges_.length - 1]);

  this.feature.setGeometry(clone);

  this.skipGeometryChange_ = false;
};


/**
 * Undo the latest modifications.
 * @return {boolean} Whether the state is INSERT or not.
 * @export
 */
gmf.ObjecteditingController.prototype.isStateInsert = function() {
  return this.state_ === gmf.ObjecteditingController.State.INSERT;
};


// == Private methods ==


/**
 * Called after a delete request.
 * @param {angular.$http.Response} resp Ajax response.
 * @private
 */
gmf.ObjecteditingController.prototype.handleDeleteFeature_ = function(resp) {
  this.feature.setGeometry(null);
  this.resetGeometryChanges_();
  this.state_ = gmf.ObjecteditingController.State.INSERT;
  this.pending = false;
  this.refreshWMSLayer_();
};


/**
 * Called after an 'insert' or 'update' request.
 * @param {angular.$http.Response} resp Ajax response.
 * @private
 */
gmf.ObjecteditingController.prototype.handleEditFeature_ = function(resp) {
  // (1) Update the id
  var features = new ol.format.GeoJSON().readFeatures(resp.data);
  if (features.length) {
    this.feature.setId(features[0].getId());
  }
  // (2) Reset geometry changes
  this.resetGeometryChanges_();
  // (3) Update state
  if (this.feature.getGeometry()) {
    this.state_ = gmf.ObjecteditingController.State.UPDATE;
  } else {
    this.state_ = gmf.ObjecteditingController.State.INSERT;
  }
  // (4) No longer pending
  this.pending = false;
  // (5) Refresh WMS layer
  this.refreshWMSLayer_();
};


/**
 * Initialize interactions by setting them inactive and decorating them
 * @private
 */
gmf.ObjecteditingController.prototype.initializeInteractions_ = function() {
  this.interactions_.forEach(function(interaction) {
    interaction.setActive(false);
    this.ngeoDecorateInteraction_(interaction);
  }, this);
};


/**
 * Register interactions by adding them to the map
 * @private
 */
gmf.ObjecteditingController.prototype.registerInteractions_ = function() {
  this.interactions_.forEach(function(interaction) {
    this.map.addInteraction(interaction);
  }, this);
};


/**
 * Unregister interactions, i.e. remove them from the map
 * @private
 */
gmf.ObjecteditingController.prototype.unregisterInteractions_ = function() {
  this.interactions_.forEach(function(interaction) {
    this.map.removeInteraction(interaction);
  }, this);
};


/**
 * Activate or deactivate this directive.
 * @param {boolean} active Whether to activate this directive or not.
 * @private
 */
gmf.ObjecteditingController.prototype.toggle_ = function(active) {

  var keys = this.listenerKeys_;
  var uid = gmf.ObjecteditingController.NAMESPACE_ + '-' + ol.getUid(this);
  var toolMgr = this.ngeoToolActivateMgr_;

  if (active) {

    keys.push(
      ol.events.listen(
        this.feature,
        ol.Object.getChangeEventType(this.feature.getGeometryName()),
        this.handleFeatureGeometryChange_,
        this
      )
    );

    keys.push(
      ol.events.listen(
        this.modify_,
        ol.Object.getChangeEventType(
          ol.interaction.Interaction.Property.ACTIVE),
        this.setFeatureStyle_,
        this
      )
    );

    keys.push(
      ol.events.listen(
        this.modify_,
        ol.interaction.Modify.EventType.MODIFYEND,
        this.handleModifyInteractionModifyEnd_,
        this
      )
    );

    keys.push(
      ol.events.listen(
        window,
        'beforeunload',
        this.handleWindowBeforeUnload_,
        this
      )
    );

    keys.push(
      ol.events.listen(
        this.sketchFeatures,
        ol.Collection.EventType.ADD,
        this.handleSketchFeaturesAdd_,
        this
      )
    );

    toolMgr.registerTool(uid, this.modifyToolActivate_, true);
    toolMgr.registerTool(uid, this.toolsToolActivate_, false);

  } else {

    this.undoAllChanges_();

    keys.forEach(function(key) {
      ol.events.unlistenByKey(key);
    }, this);

    toolMgr.unregisterTool(uid, this.modifyToolActivate_);
    toolMgr.unregisterTool(uid, this.toolsToolActivate_);

  }

  this.modify_.setActive(active);
};


/**
 * Undo all current changes.
 * @private
 */
gmf.ObjecteditingController.prototype.undoAllChanges_ = function() {
  var clone = gmf.ObjecteditingController.cloneGeometry_(
    this.geometryChanges_[0]);
  this.feature.setGeometry(clone);

  this.resetGeometryChanges_();
  this.dirty = false;
  this.setFeatureStyle_();
};


/**
 * Reset the array of geometry changes.  If there are more than one changes,
 * reset them entirely. Then, if there's no changes, clone the current geometry
 * as the first entry. One entry means that there's no changes.
 * @private
 */
gmf.ObjecteditingController.prototype.resetGeometryChanges_ = function() {
  if (this.geometryChanges_.length > 1) {
    this.geometryChanges_.length = 0;
  }
  if (this.geometryChanges_.length === 0) {
    var geometry = this.feature.getGeometry();
    var clone = gmf.ObjecteditingController.cloneGeometry_(geometry);
    this.geometryChanges_.push(clone);
  }
};


/**
 * Called after the modification interaction has completed modifying the
 * existing geometry. The new geometry is pushed in the changes array.
 * If the geometry type is `MultiPolygon`, we check if any of the inner
 * geometries intersects with one an other first. Those that does are merged
 * before being pushed to the changes.
 *
 * @param {ol.interaction.Modify.Event} evt Event.
 * @private
 */
gmf.ObjecteditingController.prototype.handleModifyInteractionModifyEnd_ = function(
  evt
) {
  var geometry = this.feature.getGeometry();

  if (geometry instanceof ol.geom.MultiPolygon) {
    var jstsGeom = this.jstsOL3Parser_.read(geometry);
    var jstsBuffered = jstsGeom.buffer(0);
    geometry = gmf.ObjecteditingController.toMultiGeometry_(
      this.jstsOL3Parser_.write(jstsBuffered)
    );
    this.skipGeometryChange_ = true;
    this.feature.setGeometry(geometry.clone());
    this.skipGeometryChange_ = false;
  }

  var clone = gmf.ObjecteditingController.cloneGeometry_(geometry);
  this.geometryChanges_.push(clone);
  this.scope_.$apply();
};


/**
 * @param {gmf.ObjecteditingController.Styles} styles Hash of style.
 * @param {ol.Color} color Color.
 * @param {boolean=} opt_incVertice Whether to include vertice or not. Defaults
 *     to `true`.
 * @private
 */
gmf.ObjecteditingController.prototype.initializeStyles_ = function(
  styles, color, opt_incVertice
) {

  var incVertice = opt_incVertice !== false;
  var rgbaColor = color.slice();
  rgbaColor.push(0.3);

  var image = new ol.style.Circle({
    radius: 8,
    stroke: new ol.style.Stroke({color: color, width: 1}),
    fill: new ol.style.Fill({color: rgbaColor})
  });

  styles[ol.geom.GeometryType.POINT] = new ol.style.Style({
    image: image
  });
  styles[ol.geom.GeometryType.MULTI_POINT] = new ol.style.Style({
    image: image
  });

  styles[ol.geom.GeometryType.LINE_STRING] = [
    new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: color,
        width: 3
      })
    })
  ];
  if (incVertice) {
    styles[ol.geom.GeometryType.LINE_STRING].push(
      this.ngeoFeatureHelper_.getVertexStyle(true)
    );
  }
  styles[ol.geom.GeometryType.MULTI_LINE_STRING] = [
    new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: color,
        width: 3
      })
    })
  ];
  if (incVertice) {
    styles[ol.geom.GeometryType.MULTI_LINE_STRING].push(
      this.ngeoFeatureHelper_.getVertexStyle(true)
    );
  }

  styles[ol.geom.GeometryType.POLYGON] = [
    new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: color,
        width: 2
      }),
      fill: new ol.style.Fill({
        color: rgbaColor
      })
    })
  ];
  if (incVertice) {
    styles[ol.geom.GeometryType.POLYGON].push(
      this.ngeoFeatureHelper_.getVertexStyle(true)
    );
  }
  styles[ol.geom.GeometryType.MULTI_POLYGON] = [
    new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: color,
        width: 2
      }),
      fill: new ol.style.Fill({
        color: rgbaColor
      })
    })
  ];
  if (incVertice) {
    styles[ol.geom.GeometryType.MULTI_POLYGON].push(
      this.ngeoFeatureHelper_.getVertexStyle(true)
    );
  }

};


/**
 * Set the style of the feature depending on:
 *  - the geometry type
 *  - the dirty state of the directive
 *  - whether the modify control is active or not
 *
 * @private
 */
gmf.ObjecteditingController.prototype.setFeatureStyle_ = function() {
  var geometry = this.feature.getGeometry();
  if (geometry) {
    var geomType = geometry.getType();
    var modifyActive = this.modify_.getActive();
    var style;
    if (this.dirty) {
      if (modifyActive) {
        style = this.dirtyStyles_[geomType];
      } else {
        style = this.dirtyStylesWoVertice_[geomType];
      }
    } else {
      if (modifyActive) {
        style = this.defaultStyles_[geomType];
      } else {
        style = this.defaultStylesWoVertice_[geomType];
      }
    }
    this.feature.setStyle(style);
  }
};


/**
 * Registers a newly added Layertree controller 'leaf', i.e. groups are
 * excluded.
 *
 * If the Layertree controller node id is equal to the `layerNodeId` configured
 * with this directive, then find the WMS layer associated with it for
 * for refresh purpose.
 *
 * @param {ngeo.LayertreeController} treeCtrl Layertree controller to register
 * @private
 */
gmf.ObjecteditingController.prototype.registerTreeCtrl_ = function(treeCtrl) {

  // Skip any Layertree controller that has a node that is not a leaf
  var node = /** @type {gmfThemes.GmfGroup|gmfThemes.GmfLayer} */ (
    treeCtrl.node);
  if (node.children && node.children.length) {
    return;
  }

  // Set editable WMS layer for refresh purpose
  if (node.id === this.layerNodeId) {
    var layer = gmf.SyncLayertreeMap.getLayer(treeCtrl);
    goog.asserts.assert(
      layer instanceof ol.layer.Image || layer instanceof ol.layer.Tile);
    this.editableWMSLayer_ = layer;
  }

};


/**
 * Unregisters all currently registered Layertree controllers.
 *
 * Unset the WMS layer associated with the `layerNodeId` configured with
 * this directive.
 *
 * @private
 */
gmf.ObjecteditingController.prototype.unregisterAllTreeCtrl_ = function() {
  this.editableWMSLayer_ = null;
};


/**
 * Refresh the WMS layer, if set.
 * @private
 */
gmf.ObjecteditingController.prototype.refreshWMSLayer_ = function() {
  if (this.editableWMSLayer_) {
    this.ngeoLayerHelper_.refreshWMSLayer(this.editableWMSLayer_);
  }
};


/**
 * Called before the window unloads. Show a confirmation message if there are
 * unsaved modifications.
 * @param {Event} e Event.
 * @return {string} Message
 * @private
 */
gmf.ObjecteditingController.prototype.handleWindowBeforeUnload_ = function(e) {
  if (this.dirty) {
    var msg = this.gettextCatalog_.getString('There are unsaved changes.');
    (e || window.event).returnValue = msg;
    return msg;
  }
  return '';
};


/**
 * Called when a feature is added to the collection of sketch features.
 * Depending on the current behaviour, use the added sketch feature to process
 * the existing geometry.
 *
 * @param {ol.Collection.Event} evt Event.
 * @private
 */
gmf.ObjecteditingController.prototype.handleSketchFeaturesAdd_ = function(evt) {
  var sketchFeature = /** @type {ol.Feature} */ (evt.element);
  var sketchGeom = /** @type {ol.geom.Geometry} */ (
    sketchFeature.getGeometry());

  var geom = this.feature.getGeometry();

  if (geom) {
    var jstsGeom = this.jstsOL3Parser_.read(geom);
    var jstsSketchGeom = this.jstsOL3Parser_.read(sketchGeom);
    var jstsProcessedGeom;

    if (this.process === gmf.ObjecteditingtoolsController.ProcessType.ADD) {
      jstsProcessedGeom = jstsGeom.union(jstsSketchGeom);
    } else {
      if (jstsGeom.intersects(jstsSketchGeom)) {
        jstsProcessedGeom = jstsGeom.difference(jstsSketchGeom);
      }
    }

    if (jstsProcessedGeom) {
      var processedGeom = this.jstsOL3Parser_.write(jstsProcessedGeom);
      var multiGeom = gmf.ObjecteditingController.toMultiGeometry_(
        processedGeom);
      this.feature.setGeometry(multiGeom.clone());
    }

  } else if (this.process === gmf.ObjecteditingtoolsController.ProcessType.ADD) {
    this.feature.setGeometry(
      gmf.ObjecteditingController.toMultiGeometry_(sketchGeom.clone()));
  }

  this.sketchFeatures.clear();
};


/**
 * Called when the geometry property of the feature changes, i.e. not when the
 * geometry itself changes but when a new geometry is set to the feature.
 *
 * This happens either when resetting the geometry to null, in which case
 * there's nothing to do here. Otherwise, it happens after the combinaison
 * of a sketch geometry with the existing feature geometry. This new geom
 * is pushed in the `geometryChanges_` array.
 *
 * @private
 */
gmf.ObjecteditingController.prototype.handleFeatureGeometryChange_ = function() {

  if (this.skipGeometryChange_) {
    return;
  }

  var geom = this.feature.getGeometry();
  if (geom) {
    // Use a timeout here, because there can be a scope digest already in
    // progress. For example, with tools that requires the user to draw
    // features on the map, we would need to manually call:
    // this.scope_.$apply();
    // For tools that use promises instead, such as the "copy/delete" from,
    // a scope is already in progress so we must not invoke it again.
    this.timeout_(function() {
      this.geometryChanges_.push(geom.clone());
    }.bind(this));
  }
};


/**
 * @param {Array.<gmf.ObjectEditingQuery.QueryableLayerInfo>} layersInfo List
 *     of queryable layers information, which contains the node and ogcServer.
 * @private
 */
gmf.ObjecteditingController.prototype.handleGetQueryableLayersInfo_ = function(
  layersInfo
) {
  this.queryableLayersInfo = layersInfo;
  if (this.queryableLayersInfo.length) {
    this.selectedQueryableLayerInfo = this.queryableLayersInfo[0];
  }
};


/**
 * @private
 */
gmf.ObjecteditingController.prototype.handleDestroy_ = function() {
  this.features_.clear();
  this.toggle_(false);
  this.unregisterInteractions_();
};


// == Static methods and type definitions ==


/**
 * Utility method that gets the clone of a geometry, which can be null or
 * undefined. In the latter case, a null value is returned instead of a
 * geometry.
 * @param {?ol.geom.Geometry|undefined} geometry A geometry, undefined or
 *     null value.
 * @return {?ol.geom.Geometry} A geometry clone or null value.
 * @private
 */
gmf.ObjecteditingController.cloneGeometry_ = function(geometry) {
  var clone = null;
  if (geometry) {
    clone = geometry.clone();
  }
  return clone;
};


/**
 * Utility method that converts a simple geometry to its multi equivalent. If
 * the geometry itself is already multi, it is returned as-is.
 * @param {ol.geom.Geometry} geometry A geometry
 * @return {ol.geom.Geometry} A multi geometry
 * @private
 */
gmf.ObjecteditingController.toMultiGeometry_ = function(geometry) {
  var multiGeom;
  if (geometry instanceof ol.geom.Point) {
    multiGeom = new ol.geom.MultiPoint([]);
    multiGeom.appendPoint(geometry);
  } else if (geometry instanceof ol.geom.LineString) {
    multiGeom = new ol.geom.MultiLineString([]);
    multiGeom.appendLineString(geometry);
  } else if (geometry instanceof ol.geom.Polygon) {
    multiGeom = new ol.geom.MultiPolygon([]);
    multiGeom.appendPolygon(geometry);
  } else {
    multiGeom = geometry;
  }
  return multiGeom;
};


/**
 * @const
 * @private
 */
gmf.ObjecteditingController.NAMESPACE_ = 'oe';


/**
 * @enum {string}
 */
gmf.ObjecteditingController.State = {
  INSERT: 'insert',
  UPDATE: 'update'
};


/**
 * @typedef {Object.<string, ol.style.Style|Array.<ol.style.Style>>}
 */
gmf.ObjecteditingController.Styles;


gmf.module.controller(
  'GmfObjecteditingController', gmf.ObjecteditingController);
