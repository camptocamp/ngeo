goog.provide('gmf.editfeatureDirective');


goog.require('gmf');
goog.require('gmf.EditFeature');
/** @suppress {extraRequire} */
goog.require('gmf.Snapping');
goog.require('gmf.SyncLayertreeMap');
goog.require('gmf.XSDAttributes');
/** @suppress {extraRequire} */
goog.require('ngeo.attributesComponent');
/** @suppress {extraRequire} */
goog.require('ngeo.btnDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.createfeatureDirective');
goog.require('ngeo.DecorateInteraction');
goog.require('ngeo.EventHelper');
goog.require('ngeo.FeatureHelper');
goog.require('ngeo.LayerHelper');
goog.require('ngeo.utils');
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
goog.require('ol.interaction.TranslateEventType');
goog.require('ol.style.Fill');
goog.require('ol.style.Style');
goog.require('ol.style.Text');
goog.require('ol.ObjectEventType');


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
 *         gmf-editfeature-dirty="ctrl.dirty"
 *         gmf-editfeature-editabletreectrl="::ctrl.treeCtrl"
 *         gmf-editfeature-map="::ctrl.map"
 *         gmf-editfeature-state="efsCtrl.state"
 *         gmf-editfeature-tolerance="::ctrl.tolerance"
 *         gmf-editfeature-vector="::ctrl.vectorLayer">
 *     </gmf-editfeature>
 *
 * @htmlAttribute {boolean} gmf-editfeature-dirty Flag that is toggled as soon
 *     as the feature changes, i.e. if any of its properties change, which
 *     includes the geometry.
 * @htmlAttribute {ngeo.LayertreeController} gmf-editfeature-editabletreectrl
 *     A reference to the editable Layertree controller, which contains a
 *     a reference to the node and WMS layer.
 * @htmlAttribute {ol.Map} gmf-editfeature-map The map.
 * @htmlAttribute {string} gmf-editfeature-state The state property shared
 *     with the `gmf-editfeatureselector` directive. For more info, see in
 *     that directive.
 * @htmlAttribute {number|undefined} gmf-editfeatureselector-tolerance The
 *     buffer in pixels to use when making queries to get the features.
 * @htmlAttribute {ol.layer.Vector} gmf-editfeature-vector The vector layer in
 *     which to draw the vector features.
 * @return {angular.Directive} The directive specs.
 * @ngdoc directive
 * @ngname gmfEditfeature
 */
gmf.editfeatureDirective = function() {
  return {
    controller: 'GmfEditfeatureController as efCtrl',
    scope: {
      'dirty': '=gmfEditfeatureDirty',
      'editableTreeCtrl': '=gmfEditfeatureEditabletreectrl',
      'map': '<gmfEditfeatureMap',
      'state': '=gmfEditfeatureState',
      'tolerance': '<?gmfEditfeatureTolerance',
      'vectorLayer': '<gmfEditfeatureVector'
    },
    bindToController: true,
    templateUrl: `${gmf.baseTemplateUrl}/editfeature.html`
  };
};

gmf.module.directive(
  'gmfEditfeature', gmf.editfeatureDirective);


/**
 * @param {angular.JQLite} $element Element.
 * @param {angular.$q} $q Angular $q service.
 * @param {!angular.Scope} $scope Angular scope.
 * @param {angular.$timeout} $timeout Angular timeout service.
 * @param {angularGettext.Catalog} gettextCatalog Gettext catalog.
 * @param {gmf.EditFeature} gmfEditFeature Gmf edit feature service.
 * @param {gmf.Snapping} gmfSnapping The gmf snapping service.
 * @param {gmf.XSDAttributes} gmfXSDAttributes The gmf XSDAttributes service.
 * @param {ngeo.DecorateInteraction} ngeoDecorateInteraction Decorate
 *     interaction service.
 * @param {ngeo.EventHelper} ngeoEventHelper Ngeo Event Helper.
 * @param {ngeo.FeatureHelper} ngeoFeatureHelper Ngeo feature helper service.
 * @param {ngeo.LayerHelper} ngeoLayerHelper Ngeo Layer Helper.
 * @param {ngeo.ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate manager
 *     service.
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname GmfEditfeatureController
 */
gmf.EditfeatureController = function($element, $q, $scope, $timeout,
  gettextCatalog, gmfEditFeature, gmfSnapping, gmfXSDAttributes,
  ngeoDecorateInteraction, ngeoEventHelper, ngeoFeatureHelper,
  ngeoLayerHelper, ngeoToolActivateMgr) {


  // === Binding properties ===

  /**
   * Flag that is toggled as soon as the feature changes, i.e. if any of its
   * properties change, which includes the geometry.
   * @type {boolean}
   * @export
   */
  this.dirty;

  /**
   * @type {ngeo.LayertreeController}
   * @export
   */
  this.editableTreeCtrl;

  /**
   * @type {ol.Map}
   * @export
   */
  this.map;

  /**
   * The state property shared with the `gmf-editfeatureselector` directive.
   * For more info, see in that directive.
   * @type {string}
   * @export
   */
  this.state;

  /**
   * @type {number}
   * @export
   */
  this.tolerance;

  /**
   * @type {ol.layer.Vector}
   * @export
   */
  this.vectorLayer;


  // === Injected properties ===

  /**
   * @type {angular.JQLite}
   * @private
   */
  this.element_ = $element;

  /**
   * @type {angular.$q}
   * @private
   */
  this.q_ = $q;

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
   * @type {angularGettext.Catalog}
   * @private
   */
  this.gettextCatalog_ = gettextCatalog;

  /**
   * @type {gmf.EditFeature}
   * @private
   */
  this.gmfEditFeature_ = gmfEditFeature;

  /**
   * @type {gmf.Snapping}
   * @private
   */
  this.gmfSnapping_ = gmfSnapping;

  /**
   * @type {gmf.XSDAttributes}
   * @private
   */
  this.gmfXSDAttributes_ = gmfXSDAttributes;

  /**
   * @type {ngeo.DecorateInteraction}
   * @private
   */
  this.ngeoDecorateInteraction_ = ngeoDecorateInteraction;

  /**
   * @type {ngeo.EventHelper}
   * @private
   */
  this.ngeoEventHelper_ = ngeoEventHelper;

  /**
   * @type {ngeo.FeatureHelper}
   * @private
   */
  this.ngeoFeatureHelper_ = ngeoFeatureHelper;

  /**
   * @type {ngeo.LayerHelper}
   * @private
   */
  this.ngeoLayerHelper_ = ngeoLayerHelper;

  /**
   * @type {ngeo.ToolActivateMgr}
   * @private
   */
  this.ngeoToolActivateMgr_ = ngeoToolActivateMgr;


  // === Private properties ===

  /**
   * @type {gmfThemes.GmfLayer}
   * @private
   */
  this.editableNode_;

  /**
   * @type {ol.layer.Image|ol.layer.Tile}
   * @private
   */
  this.editableWMSLayer_;

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

  this.scope_.$watch(
    () => this.feature,
    this.handleFeatureChange_.bind(this)
  );

  /**
   * @type {number|string|undefined}
   * @export
   */
  this.featureId = undefined;

  /**
   * @type {ol.Collection}
   * @export
   */
  this.features;

  /**
   * @type {ol.Collection}
   * @private
   */
  this.interactions_ = new ol.Collection();

  /**
   * @type {ol.interaction.Modify}
   * @private
   */
  this.modify_;

  /**
   * @type {ngeo.ToolActivate}
   * @export
   */
  this.modifyToolActivate;

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

  /**
   * @type {ngeo.interaction.Translate}
   * @private
   */
  this.translate_;

  /**
   * @type {ngeo.interaction.Rotate}
   * @private
   */
  this.rotate_;

  /**
   * @type {!ngeo.ToolActivate}
   * @export
   */
  this.rotateToolActivate;

  /**
   * @type {!ngeo.ToolActivate}
   * @export
   */
  this.translateToolActivate;

  /**
   * @type {!Array.<!ol.EventsKey>}
   * @private
   */
  this.listenerKeys_ = [];

  /**
   * @type {?Array.<!ngeox.Attribute>}
   * @export
   */
  this.attributes = null;

  /**
   * @type {string|undefined}
   * @export
   */
  this.geomType;

  /**
   * @type{boolean}
   * @export
   */
  this.showServerError = false;
};


/**
 * @enum {string}
 */
gmf.EditfeatureController.MenuActionType = {
  MOVE: 'move',
  ROTATE: 'rotate'
};


/**
 * Called on initialization of the controller.
 */
gmf.EditfeatureController.prototype.$onInit = function() {

  // (1) Set default values and other properties
  this.dirty = this.dirty === true;
  this.editableNode_ = /** @type {gmfThemes.GmfLayer} */ (
    this.editableTreeCtrl.node);
  this.features = this.vectorLayer.getSource().getFeaturesCollection();
  this.tolerance = this.tolerance !== undefined ? this.tolerance : 10;

  // (1.1) Set editable WMS layer
  const layer = gmf.SyncLayertreeMap.getLayer(this.editableTreeCtrl);
  goog.asserts.assert(
    layer instanceof ol.layer.Image || layer instanceof ol.layer.Tile);
  this.editableWMSLayer_ = layer;

  // (1.2) Create, set and initialize interactions
  this.modify_ = new ol.interaction.Modify({
    deleteCondition: ngeo.utils.deleteCondition,
    features: this.features,
    style: this.ngeoFeatureHelper_.getVertexStyle(false)
  });
  this.interactions_.push(this.modify_);

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

  this.initializeInteractions_();

  this.modifyToolActivate = new ngeo.ToolActivate(this.modify_, 'active');
  this.rotateToolActivate = new ngeo.ToolActivate(this.rotate_, 'active');
  this.translateToolActivate = new ngeo.ToolActivate(this.translate_, 'active');

  // (1.3) Add menu to map
  this.map.addOverlay(this.menu_);


  // (2) Watchers and event listeners
  this.scope_.$watch(
    () => this.createActive,
    (newVal, oldVal) => {
      if (newVal) {
        this.gmfSnapping_.ensureSnapInteractionsOnTop();
      }
    }
  );

  this.scope_.$on('$destroy', this.handleDestroy_.bind(this));

  const uid = ol.getUid(this);
  this.ngeoEventHelper_.addListenerKey(
    uid,
    ol.events.listen(
      this.features,
      ol.CollectionEventType.ADD,
      this.handleFeatureAdd_,
      this
    )
  );

  this.scope_.$watch(
    () => this.mapSelectActive,
    this.handleMapSelectActiveChange_.bind(this)
  );

  this.scope_.$watch(
    () => this.state,
    (newValue, oldValue) => {
      const state = gmf.EditfeatureController.State;
      if (newValue === state.STOP_EDITING_PENDING) {
        this.confirmCancel().then(() => {
          this.state = state.STOP_EDITING_EXECUTE;
        });
      } else if (newValue === state.DEACTIVATE_PENDING) {
        this.confirmCancel().then(() => {
          this.state = state.DEACTIVATE_EXECUTE;
        });
      }
    }
  );

  this.scope_.$watch(
    () => this.unsavedModificationsModalShown,
    (newValue, oldValue) => {
      // Reset stop request when closing the confirmation modal
      if (oldValue && !newValue) {
        this.state = gmf.EditfeatureController.State.IDLE;
      }
    }
  );


  // (3) Get attributes
  this.gmfXSDAttributes_.getAttributes(this.editableNode_.id).then(
    this.setAttributes_.bind(this));


  // (4) Toggle
  this.toggle_(true);

};


/**
 * Save the currently selected feature modifications.
 * @export
 */
gmf.EditfeatureController.prototype.save = function() {
  goog.asserts.assert(this.attributes);

  const feature = this.feature.clone();
  feature.setId(this.feature.getId());
  const id = this.featureId;

  this.pending = true;

  const dateFormatter = new DateFormatter();
  for (const attribute of this.attributes) {
    if (attribute.format) {
      if (this.feature.get(attribute.name)) {
        const name = this.feature.get(attribute.name);
        goog.asserts.assertString(name);
        const value = dateFormatter.parseDate(name, attribute.format);
        let jsonFormat = 'Y-m-d\\TH:i:s';
        if (attribute.type === 'date') {
          jsonFormat = 'Y-m-d';
        } else if (attribute.type === 'time') {
          jsonFormat = 'H:i:s';
        } else if (attribute.type === 'datetime') {
          // Time zone correction
          value.setMinutes(value.getMinutes() + value.getTimezoneOffset());
        }
        feature.set(attribute.name, dateFormatter.formatDate(value, jsonFormat));
      } else {
        // Shouldn't be set to an empty string
        feature.set(attribute.name, null);
      }
    }
  }

  const promise = id ?
    this.gmfEditFeature_.updateFeature(
      this.editableNode_.id,
      feature
    ) :
    this.gmfEditFeature_.insertFeatures(
      this.editableNode_.id,
      [feature]
    );
  promise.then(
    (response) => {
      this.dirty = false;
      this.pending = false;
      this.handleEditFeature_(response);
    },
    () => {
      this.showServerError = true;
      this.pending = false;
    }
  );
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
 * @return {angular.$q.Promise} The promise attached to the confirm deferred
 *     object.
 * @export
 */
gmf.EditfeatureController.prototype.confirmCancel = function() {
  return this.checkForModifications_().then(() => {
    this.cancel();
  });
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
  const msg = this.gettextCatalog_.getString(
    'Do you really want to delete the selected feature?');
  // Confirm deletion first
  if (confirm(msg)) {
    this.pending = true;

    // (1) Launch request
    this.gmfEditFeature_.deleteFeature(
      this.editableNode_.id,
      this.feature
    ).then(
      (response) => {
        this.dirty = false;
        this.pending = false;
        this.ngeoLayerHelper_.refreshWMSLayer(this.editableWMSLayer_);

        // (2) Reset selected feature
        this.cancel();
      },
      () => {
        this.showServerError = true;
        this.pending = false;
      }
    );

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
  this.timeout_(() => {
    this.element_.find('input[type="submit"]').click();
  }, 0);
};

/**
 * Called after an insert, update or delete request.
 * @param {angular.$http.Response} resp Ajax response.
 * @private
 */
gmf.EditfeatureController.prototype.handleEditFeature_ = function(resp) {
  const features = new ol.format.GeoJSON().readFeatures(resp.data);
  if (features.length) {
    this.feature.setId(features[0].getId());
    this.ngeoLayerHelper_.refreshWMSLayer(this.editableWMSLayer_);
  }
  if (this.confirmDeferred_) {
    this.confirmDeferred_.resolve();
  }
};


/**
 * @param {!Array.<ngeox.Attribute>} attributes Attributes.
 * @private
 */
gmf.EditfeatureController.prototype.setAttributes_ = function(attributes) {
  // Set attributes
  this.attributes = attributes;
  for (const attribute of attributes) {
    if (attribute.type == 'date') {
      attribute.format = 'Y-m-d';
      attribute.mask = '9999-19-39';
    } else if (attribute.type == 'time') {
      attribute.format = 'H:i';
      attribute.mask = '29:59';
    } else if (attribute.type == 'datetime') {
      attribute.format = 'Y-m-d H:i';
      attribute.mask = '9999-19-39 29:59';
    }
  }

  // Get geom type from attributes and set
  const geomAttr = ngeo.format.XSDAttribute.getGeometryAttribute(
    this.attributes
  );
  if (geomAttr && geomAttr.geomType) {
    this.geomType = geomAttr.geomType;
  }
};


/**
 * @param {ol.Collection.Event} evt Event.
 * @private
 */
gmf.EditfeatureController.prototype.handleFeatureAdd_ = function(evt) {
  this.feature = null;
  this.timeout_(() => {
    goog.asserts.assert(this.attributes);
    const feature = evt.element;
    goog.asserts.assertInstanceof(feature, ol.Feature);
    const dateFormatter = new DateFormatter();
    for (const attribute of this.attributes) {
      if (attribute.format) {
        if (feature.get(attribute.name)) {
          let value;
          if (attribute.type === 'datetime') {
            value = new Date(feature.get(attribute.name));
            // Time zone correction
            value.setMinutes(value.getMinutes() - value.getTimezoneOffset());
          } else {
            let jsonFormat = '';
            if (attribute.type === 'date') {
              jsonFormat = 'Y-m-d';
            } else if (attribute.type === 'time') {
              jsonFormat = 'H:i:s';
            }
            const name = feature.get(attribute.name);
            goog.asserts.assertString(name);
            value = dateFormatter.parseDate(name, jsonFormat);
          }
          feature.set(attribute.name, dateFormatter.formatDate(value, attribute.format));
        } else {
          // Shouldn't be set to an empty string
          feature.set(attribute.name, null);
        }
      }
    }
    this.feature = feature;
    this.createActive = false;
    if (!feature.getId()) {
      this.dirty = true;
    }
    this.scope_.$apply();
  }, 0);
};


/**
 * Activate or deactivate this directive.
 * @param {boolean} active Whether to activate this directive or not.
 * @private
 */
gmf.EditfeatureController.prototype.toggle_ = function(active) {

  const keys = this.listenerKeys_;
  const createUid = ['create-', ol.getUid(this)].join('-');
  const otherUid = ['other-', ol.getUid(this)].join('-');
  const toolMgr = this.ngeoToolActivateMgr_;

  if (active) {

    // FIXME
    //this.registerInteractions_();

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

    // FIXME
    //this.unregisterInteractions_();

    keys.forEach((key) => {
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
  this.editableTreeCtrl.properties['editing'] = active;

};


/**
 * Called when the mapSelectActive property changes.
 * @param {boolean} active Whether the map select is active or not.
 * @private
 */
gmf.EditfeatureController.prototype.handleMapSelectActiveChange_ = function(
  active) {

  const mapDiv = this.map.getViewport();
  goog.asserts.assertElement(mapDiv);

  if (active) {
    ol.events.listen(this.map, ol.MapBrowserEventType.CLICK,
      this.handleMapClick_, this);

    goog.events.listen(mapDiv, goog.events.EventType.CONTEXTMENU,
      this.handleMapContextMenu_, false, this);

  } else {
    ol.events.unlisten(this.map, ol.MapBrowserEventType.CLICK,
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
  const coordinate = evt.coordinate;
  const pixel = evt.pixel;

  // (1) Check if we clicked on an existing vector feature, i.e the one
  //     selected. In that case, no need to do any further action.
  const feature = this.map.forEachFeatureAtPixel(
    pixel,
    (feature) => {
      let ret = false;
      if (ol.array.includes(this.features.getArray(), feature)) {
        ret = feature;
      }
      return ret;
    },
    {
      hitTolerance: 5
    }
  );

  if (feature) {
    return;
  }

  // (2) If a feature is being edited and has unsaved changes, show modal
  //     to let the user decide what to do
  this.checkForModifications_(true).then(() => {

    const map = this.map;
    const view = map.getView();
    const resolution = view.getResolution();
    const buffer = resolution * this.tolerance;
    const extent = ol.extent.buffer(
      [coordinate[0], coordinate[1], coordinate[0], coordinate[1]],
      buffer
    );

    // (3) Launch query to fetch features
    this.gmfEditFeature_.getFeaturesInExtent(
      [this.editableNode_.id],
      extent
    ).then(this.handleGetFeatures_.bind(this));

    // (4) Clear any previously selected feature
    this.cancel();

    // (5) Pending
    this.pending = true;
  });
};


/**
 * @param {Event} evt Event.
 * @private
 */
gmf.EditfeatureController.prototype.handleMapContextMenu_ = function(evt) {
  const pixel = this.map.getEventPixel(evt);
  const coordinate = this.map.getCoordinateFromPixel(pixel);

  let feature = this.map.forEachFeatureAtPixel(
    pixel,
    (feature) => {
      let ret = false;
      if (ol.array.includes(this.features.getArray(), feature)) {
        ret = feature;
      }
      return ret;
    },
    {
      hitTolerance: 7
    }
  );

  feature = feature ? feature : null;

  // show contextual menu when clicking on certain types of features
  if (feature) {
    const type = this.ngeoFeatureHelper_.getType(feature);
    if (type === ngeo.GeometryType.POLYGON || type === ngeo.GeometryType.MULTI_POLYGON ||
        type === ngeo.GeometryType.LINE_STRING || type === ngeo.GeometryType.MULTI_LINE_STRING) {
      this.menu_.open(coordinate);
    }
    evt.preventDefault();
    evt.stopPropagation();
  }
};


/**
 * @param {Array.<ol.Feature>} features Features.
 * @private
 */
gmf.EditfeatureController.prototype.handleGetFeatures_ = function(features) {
  this.pending = false;

  this.timeout_(() => {
    if (features.length) {
      const feature = features[0];
      this.feature = feature;
      this.features.push(feature);
    }
  }, 0);
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

  let geom;
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
    this.featureId = newFeature.getId();
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

    this.gmfSnapping_.ensureSnapInteractionsOnTop();

    // The `ui-date` triggers an unwanted change, i.e. it converts the text
    // to Date, which makes the directive dirty when it shouldn't... to
    // bypass this, we reset the dirty state here. We do so only if we're
    // editing an existing feature
    if (this.featureId) {
      this.timeout_(() => {
        this.dirty = false;
        this.scope_.$apply();
      }, 0);
    }
  } else {
    this.featureId = undefined;
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
  const action = evt.action;

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
 * @param {ol.interaction.Translate.Event} evt Event.
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
  const uid = ol.getUid(this);
  this.ngeoEventHelper_.clearListenerKey(uid);
  this.toggle_(false);
  this.handleMapSelectActiveChange_(false);
  this.unregisterInteractions_();
};


gmf.module.controller(
  'GmfEditfeatureController', gmf.EditfeatureController);


/**
 * The different possible values of the `state` inner property.
 * @enum {string}
 */
gmf.EditfeatureController.State = {
  /**
   * The default state. While idle, nothing happens.
   * @type {string}
   */
  IDLE: 'idle',
  /**
   * The state active after the deactivation of the editing tools and the
   * unsaved modifications were saved or discarded.
   * @type {string}
   */
  DEACTIVATE_EXECUTE: 'deactivate_execute',
  /**
   * The state active when the deactivation of the editing tools is in
   * progress while there are unsaved modifications.
   * @type {string}
   */
  DEACTIVATE_PENDING: 'deactivate_pending',
  /**
   * Final state set after the "stop editing" button has been clicked while
   * no unsaved modifications were made or if the user saved them or confirmed
   * to continue without saving.
   * @type {string}
   */
  STOP_EDITING_EXECUTE: 'stop_editing_execute',
  /**
   * The state that is active while when the "stop editing" button has been
   * clicked but before any confirmation has been made to continue.
   * @type {string}
   */
  STOP_EDITING_PENDING: 'stop_editing_pending'
};
