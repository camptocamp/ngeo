goog.provide('gmf.EditfeatureController');
goog.provide('gmf.editfeatureDirective');


goog.require('gmf');
goog.require('gmf.EditFeature');
goog.require('gmf.XSDAttributes');
/** @suppress {extraRequire} */
goog.require('ngeo.attributesDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.btnDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.createfeatureDirective');
goog.require('ngeo.DecorateInteraction');
goog.require('ngeo.EventHelper');
goog.require('ngeo.FeatureHelper');
goog.require('ngeo.LayerHelper');
goog.require('ngeo.ToolActivate');
goog.require('ngeo.ToolActivateMgr');
goog.require('ol.format.GeoJSON');
goog.require('ol.interaction.Modify');


/**
 * Directive used to insert, modify and delete features from a single layer.
 * It allows you to modify the geometry of the feature in addition to its
 * attributes.
 *
 * In order to modify or delete a feature, you must click on the map at the
 * location of the feature to select it first.
 *
 * In order to create a new feature, you use the "Draw" button and digitalize
 * the feature on the map.
 *
 * Example:
 *
 *     <gmf-editfeature
 *         gmf-editfeature-layer="::ctrl.layer"
 *         gmf-editfeature-map="::ctrl.map"
 *         gmf-editfeature-tolerance="::ctrl.tolerance"
 *         gmf-editfeature-vector="::ctrl.vectorLayer"
 *         gmf-editfeature-wmslayer="::ctrl.selectedWMSLayer">
 *     </gmf-editfeature>
 *
 * @htmlAttribute {GmfThemesNode} gmf-editfeature-layer The GMF node of the
 *     editable layer.
 * @htmlAttribute {ol.Map} gmf-editfeature-map The map.
 * @htmlAttribute {number|undefined} gmf-editfeatureselector-tolerance The
 *     buffer in pixels to use when making queries to get the features.
 * @htmlAttribute {ol.layer.Vector} gmf-editfeature-vector The vector layer in
 *     which to draw the vector features.
 * @htmlAttribute {ol.layer.Image|ol.layer.Tile} gmf-editfeature-wmslayer The
 *     WMS layer to refresh after each saved modification.
 * @return {angular.Directive} The directive specs.
 * @ngdoc directive
 * @ngname gmfEditfeature
 */
gmf.editfeatureDirective = function() {
  return {
    controller: 'GmfEditfeatureController',
    scope: {
      'layer': '=gmfEditfeatureLayer',
      'map': '<gmfEditfeatureMap',
      'tolerance': '<?gmfEditfeatureTolerance',
      'vectorLayer': '<gmfEditfeatureVector',
      'wmsLayer': '<gmfEditfeatureWmslayer'
    },
    bindToController: true,
    controllerAs: 'efCtrl',
    templateUrl: gmf.baseTemplateUrl + '/editfeature.html'
  };
};

gmf.module.directive(
  'gmfEditfeature', gmf.editfeatureDirective);


/**
 * @param {!angular.Scope} $scope Angular scope.
 * @param {angular.$timeout} $timeout Angular timeout service.
 * @param {angularGettext.Catalog} gettextCatalog Gettext catalog.
 * @param {gmf.EditFeature} gmfEditFeature Gmf edit feature service.
 * @param {gmf.XSDAttributes} gmfXSDAttributes The gmf XSDAttributes service.
 * @param {ngeo.DecorateInteraction} ngeoDecorateInteraction Decorate
 *     interaction service.
 * @param {ngeo.EventHelper} ngeoEventHelper Ngeo Event Helper.
 * @param {ngeo.FeatureHelper} ngeoFeatureHelper Ngeo feature helper service.
 * @param {ngeo.LayerHelper} ngeoLayerHelper Ngeo Layer Helper.
 * @param {ngeo.ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate manager
 *     service.
 * @constructor
 * @ngInject
 * @ngdoc controller
 * @ngname GmfEditfeatureController
 */
gmf.EditfeatureController = function($scope, $timeout, gettextCatalog,
    gmfEditFeature, gmfXSDAttributes, ngeoDecorateInteraction, ngeoEventHelper,
    ngeoFeatureHelper, ngeoLayerHelper, ngeoToolActivateMgr) {

  /**
   * @type {GmfThemesNode}
   * @export
   */
  this.layer;

  /**
   * @type {ol.Map}
   * @export
   */
  this.map;

  /**
   * @type {number}
   * @export
   */
  this.tolerance = this.tolerance !== undefined ? this.tolerance : 10;

  /**
   * @type {ol.layer.Vector}
   * @export
   */
  this.vectorLayer;

  /**
   * @type {ol.layer.Image|ol.layer.Tile}
   * @export
   */
  this.wmsLayer;

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
  this.editFeatureService_ = gmfEditFeature;

  /**
   * @type {gmf.XSDAttributes}
   * @private
   */
  this.xsdAttributes_ = gmfXSDAttributes;

  /**
   * @type {ngeo.DecorateInteraction}
   * @private
   */
  this.ngeoDecorateInteraction_ = ngeoDecorateInteraction;

  /**
   * @type {ngeo.EventHelper}
   * @private
   */
  this.eventHelper_ = ngeoEventHelper;

  /**
   * @type {ngeo.FeatureHelper}
   * @private
   */
  this.featureHelper_ = ngeoFeatureHelper;

  /**
   * @type {ngeo.LayerHelper}
   * @private
   */
  this.layerHelper_ = ngeoLayerHelper;

  /**
   * @type {ngeo.ToolActivateMgr}
   * @private
   */
  this.ngeoToolActivateMgr_ = ngeoToolActivateMgr;

  /**
   * @type {number}
   * @private
   */
  this.pixelBuffer_ = 10;

  /**
   * Flag that is toggled as soon as the feature changes, i.e. if any of its
   * properties change, which includes the geometry.
   * @type {boolean}
   * @private
   */
  this.dirty = false;

  /**
   * Flag that is toggled while a request is pending, either one to get
   * features when a map is clicked or when saving
   * @private
   */
  this.pending = false;

  /**
   * @type {boolean}
   * @export
   */
  this.active = true;

  /**
   * @type {boolean}
   * @export
   */
  this.createActive = false;

  /**
   * @type {ngeo.ToolActivate}
   * @export
   */
  this.createToolActivate = new ngeo.ToolActivate(this, 'createActive');

  /**
   * @type {boolean}
   * @export
   */
  this.mapSelectActive = true;

  $scope.$watch(
    function() {
      return this.mapSelectActive;
    }.bind(this),
    this.handleMapSelectActiveChange_.bind(this)
  );

  /**
   * @type {ngeo.ToolActivate}
   * @export
   */
  this.mapSelectToolActivate = new ngeo.ToolActivate(this, 'mapSelectActive');

  /**
   * @type {?ol.Feature}
   * @export
   */
  this.feature = null;

  $scope.$watch(
    function() {
      return this.feature;
    }.bind(this),
    this.handleFeatureChange_.bind(this)
  );

  /**
   * @type {?number|string}
   * @export
   */
  this.featureId = null;

  /**
   * @type {ol.Collection}
   * @export
   */
  this.features = this.vectorLayer.getSource().getFeaturesCollection();

  /**
   * @type {ol.interaction.Modify}
   * @private
   */
  this.modify_ = new ol.interaction.Modify({
    features: this.features,
    style: ngeoFeatureHelper.getVertexStyle(false)
  });
  this.registerInteraction_(this.modify_);

  /**
   * @type {ngeo.ToolActivate}
   * @export
   */
  this.modifyToolActivate = new ngeo.ToolActivate(this.modify_, 'active');

  /**
   * @type {?Array.<ngeox.Attribute>}
   * @export
   */
  this.attributes = null;

  /**
   * @type {?string}
   * @export
   */
  this.geomType = null;

  gmfXSDAttributes.getAttributes(this.layer.id).then(
    this.setAttributes_.bind(this));

  var uid = goog.getUid(this);
  this.eventHelper_.addListenerKey(
    uid,
    ol.events.listen(
      this.features,
      ol.CollectionEventType.ADD,
      this.handleFeatureAdd_,
      this
    )
  );

  $scope.$on('$destroy', this.handleDestroy_.bind(this));

  this.toggle_(true);
};


/**
 * Save the currently selected feature modifications.
 * @export
 */
gmf.EditfeatureController.prototype.save = function() {
  var feature = this.feature;
  var id = this.featureId;

  this.dirty = false;
  this.pending = true;

  if (id) {
    this.editFeatureService_.updateFeature(
      this.layer.id,
      feature
    ).then(
      this.handleEditFeature_.bind(this)
    );
  } else {
    this.editFeatureService_.insertFeatures(
      this.layer.id,
      [feature]
    ).then(
      this.handleEditFeature_.bind(this)
    );
  }
};


/**
 * @export
 */
gmf.EditfeatureController.prototype.cancel = function() {
  this.dirty = false;
  this.feature = null;
  this.features.clear();
};


/**
 * @export
 */
gmf.EditfeatureController.prototype.delete = function() {
  var msg = this.gettextCatalog_.getString(
      'Do you really want to delete the selected feature?');
  // Confirm deletion first
  if (confirm(msg)) {
    this.dirty = false;
    this.pending = true;

    // (1) Launch request
    this.editFeatureService_.deleteFeature(
      this.layer.id,
      this.feature
    ).then(
      this.handleDeleteFeature_.bind(this)
    );

    // (2) Reset selected feature
    this.cancel();
  }
};


/**
 * Called after an insert, update or delete request.
 * @param {angular.$http.Response} resp Ajax response.
 * @private
 */
gmf.EditfeatureController.prototype.handleEditFeature_ = function(resp) {
  this.pending = false;
  var features = new ol.format.GeoJSON().readFeatures(resp.data);
  if (features.length) {
    this.feature.setId(features[0].getId());
    this.layerHelper_.refreshWMSLayer(this.wmsLayer);
  }
};


/**
 * Called after an insert, update or delete request.
 * @param {angular.$http.Response} resp Ajax response.
 * @private
 */
gmf.EditfeatureController.prototype.handleDeleteFeature_ = function(resp) {
  this.pending = false;
  this.layerHelper_.refreshWMSLayer(this.wmsLayer);
};


/**
 * @param {Array.<ngeox.Attribute>} attributes Attributes.
 * @private
 */
gmf.EditfeatureController.prototype.setAttributes_ = function(attributes) {
  // Set attributes
  this.attributes = attributes;

  // Get geom type from attributes and set
  var geomAttr = ngeo.format.XSDAttribute.getGeometryAttribute(
    this.attributes
  );
  if (geomAttr && geomAttr.geomType) {
    this.geomType = geomAttr.geomType;
  }
};


/**
 * @param {ol.CollectionEvent} evt Event.
 * @private
 */
gmf.EditfeatureController.prototype.handleFeatureAdd_ = function(evt) {
  this.timeout_(function() {
    var feature = evt.element;
    goog.asserts.assertInstanceof(feature, ol.Feature);
    this.feature = feature;
    this.createActive = false;
    if (!feature.getId()) {
      this.dirty = true;
    }
    this.scope_.$apply();
  }.bind(this), 0);
};


/**
 * Activate or deactivate this directive.
 * @param {boolean} active Whether to activate this directive or not.
 * @private
 */
gmf.EditfeatureController.prototype.toggle_ = function(active) {

  var createUid = ['create-', goog.getUid(this)].join('-');
  var otherUid = ['other-', goog.getUid(this)].join('-');
  var toolMgr = this.ngeoToolActivateMgr_;

  if (active) {
    toolMgr.registerTool(createUid, this.createToolActivate, false);
    toolMgr.registerTool(createUid, this.mapSelectToolActivate, true);

    toolMgr.registerTool(otherUid, this.createToolActivate, false);
    toolMgr.registerTool(otherUid, this.modifyToolActivate, true);

    this.mapSelectActive = true;
    this.modify_.setActive(true);
  } else {

    toolMgr.unregisterTool(createUid, this.createToolActivate);
    toolMgr.unregisterTool(createUid, this.mapSelectToolActivate);

    toolMgr.unregisterTool(otherUid, this.createToolActivate);
    toolMgr.unregisterTool(otherUid, this.modifyToolActivate);

    this.createActive = false;
    this.modify_.setActive(false);
    this.mapSelectActive = false;
    this.cancel();
  }

};


/**
 * Called when the mapSelectActive property changes.
 * @param {boolean} active Whether the map select is active or not.
 * @private
 */
gmf.EditfeatureController.prototype.handleMapSelectActiveChange_ = function(
    active) {

  if (active) {
    ol.events.listen(this.map, ol.MapBrowserEvent.EventType.CLICK,
        this.handleMapClick_, this);
  } else {
    ol.events.unlisten(this.map, ol.MapBrowserEvent.EventType.CLICK,
        this.handleMapClick_, this);
  }
};


/**
 * @param {ol.MapBrowserEvent} evt Event.
 * @private
 */
gmf.EditfeatureController.prototype.handleMapClick_ = function(evt) {

  // (1) Launch query to fetch features
  var coordinate = evt.coordinate;
  var map = this.map;
  var view = map.getView();
  var resolution = view.getResolution();
  var buffer = resolution * this.tolerance;
  var extent = ol.extent.buffer(
    [coordinate[0], coordinate[1], coordinate[0], coordinate[1]],
    buffer
  );

  this.editFeatureService_.getFeatures([this.layer.id], extent).then(
    this.handleGetFeatures_.bind(this));

  // (2) Clear any previously selected feature
  this.cancel();

  // (3) Pending
  this.pending = true;

  this.scope_.$apply();

};


/**
 * @param {Array.<ol.Feature>} features Features.
 * @private
 */
gmf.EditfeatureController.prototype.handleGetFeatures_ = function(features) {
  this.pending = false;

  this.timeout_(function() {
    if (features.length) {
      var feature = features[0];
      this.feature = feature;
      this.features.push(feature);
    }
  }.bind(this), 0);
};


/**
 * Register an interaction by setting it inactive, decorating it and adding it
 * to the map
 * @param {ol.interaction.Interaction} interaction Interaction to register.
 * @private
 */
gmf.EditfeatureController.prototype.registerInteraction_ = function(
    interaction) {
  interaction.setActive(false);
  this.ngeoDecorateInteraction_(interaction);
  this.map.addInteraction(interaction);
};


/**
 * Unregister an interaction, i.e. set it inactive and remove it from the map
 * @param {ol.interaction.Interaction} interaction Interaction to unregister.
 * @private
 */
gmf.EditfeatureController.prototype.unregisterInteraction_ = function(
    interaction) {
  interaction.setActive(false);
  this.map.removeInteraction(interaction);
};


/**
 * @param {?ol.Feature} newFeature The new feature.
 * @param {?ol.Feature} oldFeature The old feature.
 * @private
 */
gmf.EditfeatureController.prototype.handleFeatureChange_ = function(
  newFeature, oldFeature
) {

  if (oldFeature) {
    ol.events.unlisten(
      oldFeature,
      ol.ObjectEventType.PROPERTYCHANGE,
      this.handleFeaturePropertyChange_,
      this
    );
  }

  if (newFeature) {
    this.featureId = newFeature.getId() || null;
    ol.events.listen(
      newFeature,
      ol.ObjectEventType.PROPERTYCHANGE,
      this.handleFeaturePropertyChange_,
      this
    );
  } else {
    this.featureId = null;
  }

};


/**
 * @param {ol.ObjectEvent} evt Event.
 * @private
 */
gmf.EditfeatureController.prototype.handleFeaturePropertyChange_ = function(
  evt
) {
  this.dirty = true;
};


/**
 * @private
 */
gmf.EditfeatureController.prototype.handleDestroy_ = function() {
  this.features.clear();
  this.handleFeatureChange_(null, this.feature);
  this.feature = null;
  var uid = goog.getUid(this);
  this.eventHelper_.clearListenerKey(uid);
  this.toggle_(false);
  this.handleMapSelectActiveChange_(false);
  this.unregisterInteraction_(this.modify_);
};


gmf.module.controller(
  'GmfEditfeatureController', gmf.EditfeatureController);
