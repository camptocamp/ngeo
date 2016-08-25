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
goog.require('ngeo.Menu');
goog.require('ngeo.ToolActivate');
goog.require('ngeo.ToolActivateMgr');
goog.require('ngeo.interaction.Rotate');
goog.require('ngeo.interaction.Translate');
/** @suppress {extraRequire} */
goog.require('ngeo.modalDirective');
goog.require('ol.Collection');
goog.require('ol.format.GeoJSON');
goog.require('ol.interaction.Modify');
goog.require('ol.style.Fill');
goog.require('ol.style.Style');
goog.require('ol.style.Text');


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
 * @param {angular.JQLite} $element Element.
 * @param {!angular.Scope} $scope Angular scope.
 * @param {angular.$timeout} $timeout Angular timeout service.
 * @param {angular.$q} $q Angular $q service.
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
gmf.EditfeatureController = function($element, $scope, $timeout, $q,
    gettextCatalog, gmfEditFeature, gmfXSDAttributes, ngeoDecorateInteraction,
    ngeoEventHelper, ngeoFeatureHelper, ngeoLayerHelper, ngeoToolActivateMgr) {

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
   * @type {angular.JQLite}
   * @private
   */
  this.element_ = $element;

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
   * @type {angular.$q}
   * @private
   */
  this.q_ = $q;

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
   * A deferred object resolved after the confirm modal "continue w/o saving" or
   * "save" buttons are clicked.
   * @type {angular.$q.Deferred|null}
   * @private
   */
  this.confirmDeferred_ = null;

  /**
   * Flag that controls the visibility of the modal that manages unsaved
   * modifications.
   * @type {boolean}
   * @export
   */
  this.unsavedModificationsModalShown = false;

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
   * @type {ol.Collection}
   * @private
   */
  this.interactions_ = new ol.Collection();

  /**
   * @type {ol.interaction.Modify}
   * @private
   */
  this.modify_ = new ol.interaction.Modify({
    features: this.features,
    style: ngeoFeatureHelper.getVertexStyle(false)
  });
  this.interactions_.push(this.modify_);

  /**
   * @type {ngeo.ToolActivate}
   * @export
   */
  this.modifyToolActivate = new ngeo.ToolActivate(this.modify_, 'active');

  /**
   * @type {ngeo.Menu}
   * @private
   */
  this.menu_ = new ngeo.Menu({
    actions: [{
      cls: 'fa fa-arrows',
      label: gettextCatalog.getString('Move'),
      name: gmf.EditfeatureController.MenuActionType.MOVE
    }, {
      cls: 'fa fa-rotate-right',
      label: gettextCatalog.getString('Rotate'),
      name: gmf.EditfeatureController.MenuActionType.ROTATE
    }]
  });
  this.map.addOverlay(this.menu_);

  /**
   * @type {ngeo.interaction.Translate}
   * @private
   */
  this.translate_ = new ngeo.interaction.Translate({
    features: this.features,
    style: new ol.style.Style({
      text: new ol.style.Text({
        text: '\uf047',
        font: 'normal 18px FontAwesome',
        fill: new ol.style.Fill({
          color: '#7a7a7a'
        })
      })
    })
  });
  this.interactions_.push(this.translate_);

  /**
   * @type {ngeo.interaction.Rotate}
   * @private
   */
  this.rotate_ = new ngeo.interaction.Rotate({
    features: this.features,
    style: new ol.style.Style({
      text: new ol.style.Text({
        text: '\uf01e',
        font: 'normal 18px FontAwesome',
        fill: new ol.style.Fill({
          color: '#7a7a7a'
        })
      })
    })
  });
  this.interactions_.push(this.rotate_);

  this.initializeInteractions_();

  /**
   * @type {ngeo.ToolActivate}
   * @export
   */
  this.rotateToolActivate = new ngeo.ToolActivate(this.rotate_, 'active');

  /**
   * @type {ngeo.ToolActivate}
   * @export
   */
  this.translateToolActivate = new ngeo.ToolActivate(this.translate_, 'active');

  /**
   * @type {Array.<ol.EventsKey>}
   * @private
   */
  this.listenerKeys_ = [];

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
 * @enum {string}
 */
gmf.EditfeatureController.MenuActionType = {
  MOVE: 'move',
  ROTATE: 'rotate'
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
  this.menu_.close();
  this.unsavedModificationsModalShown = false;
};


/**
 * Check if there are unsaved modifications. If there aren't, then cancel.
 * Used by the 'cancel' button in the template.
 * @export
 */
gmf.EditfeatureController.prototype.confirmCancel = function() {
  this.checkForModifications_().then(function() {
    this.cancel();
  }.bind(this));
};


/**
 * Check if there's a feature selected and if it contains modifications
 * (a.k.a. is dirty), then the confirmation modal is shown.
 * @param {boolean=} scopeApply Whether to force scope to refresh or not.
 *     when the confirm modal is not dismissed.
 * @return {angular.$q.Promise} The promise attached to the confirm deferred
 *     object.
 * @private
 */
gmf.EditfeatureController.prototype.checkForModifications_ = function(
    scopeApply) {
  this.confirmDeferred_ = this.q_.defer();
  if (this.feature && this.dirty) {
    this.unsavedModificationsModalShown = true;
    if (scopeApply) {
      this.scope_.$apply();
    }
  } else {
    this.confirmDeferred_.resolve();
  }

  return this.confirmDeferred_.promise;
};


/**
 * @export
 */
gmf.EditfeatureController.prototype.continueWithoutSaving = function() {
  this.cancel();
  this.confirmDeferred_.resolve();
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
 * Called when the modal 'save' button is clicked. Do as if the user had
 * clicked on the 'save' input button in the form, which allows the form
 * to be validated.
 * @export
 */
gmf.EditfeatureController.prototype.submit = function() {
  // Use timeout to prevent the digest already in progress
  // due to clicking on the modal button to throw an error.
  this.timeout_(function() {
    this.element_.find('input[type="submit"]').click();
  }.bind(this), 0);
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
  if (this.confirmDeferred_) {
    this.confirmDeferred_.resolve();
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

  var keys = this.listenerKeys_;
  var createUid = ['create-', goog.getUid(this)].join('-');
  var otherUid = ['other-', goog.getUid(this)].join('-');
  var toolMgr = this.ngeoToolActivateMgr_;

  if (active) {

    keys.push(ol.events.listen(this.menu_, ngeo.MenuEventType.ACTION_CLICK,
        this.handleMenuActionClick_, this));

    keys.push(ol.events.listen(this.translate_,
        ol.interaction.TranslateEventType.TRANSLATEEND,
        this.handleTranslateEnd_, this));

    keys.push(ol.events.listen(this.rotate_,
        ngeo.RotateEventType.ROTATEEND,
        this.handleRotateEnd_, this));

    toolMgr.registerTool(createUid, this.createToolActivate, false);
    toolMgr.registerTool(createUid, this.mapSelectToolActivate, true);

    toolMgr.registerTool(otherUid, this.createToolActivate, false);
    toolMgr.registerTool(otherUid, this.modifyToolActivate, true);
    toolMgr.registerTool(otherUid, this.translateToolActivate, false);
    toolMgr.registerTool(otherUid, this.rotateToolActivate, false);

  } else {

    keys.forEach(function(key) {
      ol.events.unlistenByKey(key);
    }, this);

    toolMgr.unregisterTool(createUid, this.createToolActivate);
    toolMgr.unregisterTool(createUid, this.mapSelectToolActivate);

    toolMgr.unregisterTool(otherUid, this.createToolActivate);
    toolMgr.unregisterTool(otherUid, this.modifyToolActivate);
    toolMgr.unregisterTool(otherUid, this.translateToolActivate);
    toolMgr.unregisterTool(otherUid, this.rotateToolActivate);

    this.createActive = false;
    this.cancel();
  }

  this.modify_.setActive(active);
  this.mapSelectActive = active;
  this.layer['editing'] = active;

};


/**
 * Called when the mapSelectActive property changes.
 * @param {boolean} active Whether the map select is active or not.
 * @private
 */
gmf.EditfeatureController.prototype.handleMapSelectActiveChange_ = function(
    active) {

  var mapDiv = this.map.getTargetElement();
  goog.asserts.assertElement(mapDiv);

  if (active) {
    ol.events.listen(this.map, ol.MapBrowserEvent.EventType.CLICK,
        this.handleMapClick_, this);

    goog.events.listen(mapDiv, goog.events.EventType.CONTEXTMENU,
        this.handleMapContextMenu_, false, this);

  } else {
    ol.events.unlisten(this.map, ol.MapBrowserEvent.EventType.CLICK,
        this.handleMapClick_, this);

    goog.events.unlisten(mapDiv, goog.events.EventType.CONTEXTMENU,
        this.handleMapContextMenu_, false, this);
  }
};


/**
 * Called when the map is clicked.
 *
 * (1) If a vector feature was clicked, don't do anything (i.e. allow the
 *     interactions to do their bidings without selecting a new feature).
 *
 * (2) Otherwise, if there is a feature being edited and has unsaved
 *     modifications, show the confirmation modal asking the user what to do
 *     about it.
 *
 * (3) If there's no feature selected or we have one without unsaved
 *     modifications or with modifications that were canceled, launch a query
 *     to fetch the features at the clicked location.
 *
 * @param {ol.MapBrowserEvent} evt Event.
 * @private
 */
gmf.EditfeatureController.prototype.handleMapClick_ = function(evt) {
  var coordinate = evt.coordinate;
  var pixel = evt.pixel;

  // (1) Check if we clicked on an existing vector feature, i.e the one
  //     selected. In that case, no need to do any further action.
  var feature = this.map.forEachFeatureAtPixel(
    pixel,
    function(feature) {
      var ret = false;
      if (ol.array.includes(this.features.getArray(), feature)) {
        ret = feature;
      }
      return ret;
    }.bind(this),
    null
  );

  if (feature) {
    return;
  }

  // (2) If a feature is being edited and has unsaved changes, show modal
  //     to let the user decide what to do
  this.checkForModifications_(true).then(function() {

    var map = this.map;
    var view = map.getView();
    var resolution = view.getResolution();
    var buffer = resolution * this.tolerance;
    var extent = ol.extent.buffer(
      [coordinate[0], coordinate[1], coordinate[0], coordinate[1]],
      buffer
    );

    // (3) Launch query to fetch features
    this.editFeatureService_.getFeatures([this.layer.id], extent).then(
      this.handleGetFeatures_.bind(this));

    // (4) Clear any previously selected feature
    this.cancel();

    // (5) Pending
    this.pending = true;
  }.bind(this));
};


/**
 * @param {Event} evt Event.
 * @private
 */
gmf.EditfeatureController.prototype.handleMapContextMenu_ = function(evt) {
  var pixel = this.map.getEventPixel(evt);
  var coordinate = this.map.getCoordinateFromPixel(pixel);

  var feature = this.map.forEachFeatureAtPixel(
    pixel,
    function(feature) {
      var ret = false;
      if (ol.array.includes(this.features.getArray(), feature)) {
        ret = feature;
      }
      return ret;
    }.bind(this),
    null
  );

  feature = feature ? feature : null;

  // show contextual menu when clicking on certain types of features
  if (feature) {
    var type = this.featureHelper_.getType(feature);
    if (type === ngeo.GeometryType.POLYGON ||
        type === ngeo.GeometryType.LINE_STRING) {
      this.menu_.open(coordinate);
    }
    evt.preventDefault();
  }
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
 * Initialize interactions by setting them inactive and decorating them
 * @private
 */
gmf.EditfeatureController.prototype.initializeInteractions_ = function() {
  this.interactions_.forEach(function(interaction) {
    interaction.setActive(false);
    this.ngeoDecorateInteraction_(interaction);
  }, this);
};


/**
 * Register interactions by adding them to the map
 * @private
 */
gmf.EditfeatureController.prototype.registerInteractions_ = function() {
  this.interactions_.forEach(function(interaction) {
    this.map.addInteraction(interaction);
  }, this);
};


/**
 * Unregister interactions, i.e. set them inactive and remove them from the map
 * @private
 */
gmf.EditfeatureController.prototype.unregisterInteractions_ = function() {
  this.interactions_.forEach(function(interaction) {
    this.map.removeInteraction(interaction);
  }, this);
};


/**
 * @param {?ol.Feature} newFeature The new feature.
 * @param {?ol.Feature} oldFeature The old feature.
 * @private
 */
gmf.EditfeatureController.prototype.handleFeatureChange_ = function(
  newFeature, oldFeature
) {

  var geom;
  if (oldFeature) {
    ol.events.unlisten(
      oldFeature,
      ol.ObjectEventType.PROPERTYCHANGE,
      this.handleFeaturePropertyChange_,
      this
    );
    geom = oldFeature.getGeometry();
    goog.asserts.assert(geom);
    ol.events.unlisten(
      geom,
      ol.events.EventType.CHANGE,
      this.handleFeatureGeometryChange_,
      this
    );
    this.unregisterInteractions_();
  }

  if (newFeature) {
    this.featureId = newFeature.getId() || null;
    ol.events.listen(
      newFeature,
      ol.ObjectEventType.PROPERTYCHANGE,
      this.handleFeaturePropertyChange_,
      this
    );
    geom = newFeature.getGeometry();
    goog.asserts.assert(geom);
    ol.events.listen(
      geom,
      ol.events.EventType.CHANGE,
      this.handleFeatureGeometryChange_,
      this
    );
    this.registerInteractions_();

    // The `ui-date` triggers an unwanted change, i.e. it converts the text
    // to Date, which makes the directive dirty when it shouldn't... to
    // bypass this, we reset the dirty state here. We do so only if we're
    // editing an existing feature
    if (this.featureId) {
      this.timeout_(function() {
        this.dirty = false;
        this.scope_.$apply();
      }.bind(this), 0);
    }
  } else {
    this.featureId = null;
  }

};


/**
 * @private
 */
gmf.EditfeatureController.prototype.handleFeaturePropertyChange_ = function() {
  this.dirty = true;
};


/**
 * @private
 */
gmf.EditfeatureController.prototype.handleFeatureGeometryChange_ = function() {
  this.dirty = true;
  this.scope_.$apply();
};


/**
 * @param {ngeo.MenuEvent} evt Event.
 * @private
 */
gmf.EditfeatureController.prototype.handleMenuActionClick_ = function(evt) {
  var action = evt.action;

  switch (action) {
    case gmf.EditfeatureController.MenuActionType.MOVE:
      this.translate_.setActive(true);
      this.scope_.$apply();
      break;
    case gmf.EditfeatureController.MenuActionType.ROTATE:
      this.rotate_.setActive(true);
      this.scope_.$apply();
      break;
    default:
      break;
  }
};


/**
 * @param {ol.interaction.TranslateEvent} evt Event.
 * @private
 */
gmf.EditfeatureController.prototype.handleTranslateEnd_ = function(evt) {
  this.translate_.setActive(false);
  this.scope_.$apply();
};


/**
 * @param {ngeo.RotateEvent} evt Event.
 * @private
 */
gmf.EditfeatureController.prototype.handleRotateEnd_ = function(evt) {
  this.rotate_.setActive(false);
  this.scope_.$apply();
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
  this.unregisterInteractions_();
};


gmf.module.controller(
  'GmfEditfeatureController', gmf.EditfeatureController);
