goog.provide('gmf.ObjecteditingController');
goog.provide('gmf.objecteditingDirective');

goog.require('gmf');
goog.require('gmf.EditFeature');
goog.require('ngeo.DecorateInteraction');
goog.require('ngeo.FeatureHelper');
goog.require('ngeo.LayerHelper');
goog.require('ngeo.ToolActivate');
goog.require('ngeo.ToolActivateMgr');
goog.require('ol.Collection');
goog.require('ol.interaction.Modify');
goog.require('ol.style.Circle');
goog.require('ol.style.Fill');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');


/**
 * Directive used to edit the geometry of a single feature using advanced
 * tools.
 *
 * Example:
 *
 *     <gmf-objectediting
 *         gmf-objectediting-active="ctrl.objectEditingActive"
 *         gmf-objectediting-feature="ctrl.objectEditingFeature"
 *         gmf-objectediting-layernodeid="ctrl.objectEditingLayerNodeId"
 *         gmf-objectediting-map="::ctrl.map">
 *     </gmf-objectediting>
 *
 * @htmlAttribute {boolean} gmf-objectediting-active Whether the directive is
 *     active or not.
 * @htmlAttribute {ol.Feature} gmf-objectediting-feature The feature to edit.
 * @htmlAttribute {number} gmf-objectediting-layernodeid The GMF layer node id.
 * @htmlAttribute {ol.Map} gmf-objectediting-map The map.
 * @return {angular.Directive} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfObjectediting
 */
gmf.objecteditingDirective = function() {
  return {
    controller: 'GmfObjecteditingController',
    scope: {
      'active': '=gmfObjecteditingActive',
      'feature': '<gmfObjecteditingFeature',
      'layerNodeId': '<gmfObjecteditingLayernodeid',
      'map': '<gmfObjecteditingMap'
    },
    bindToController: true,
    controllerAs: 'oeCtrl',
    templateUrl: gmf.baseTemplateUrl + '/objectediting.html'
  };
};

gmf.module.directive('gmfObjectediting', gmf.objecteditingDirective);


/**
 * @param {!angular.Scope} $scope Angular scope.
 * @param {angular.$timeout} $timeout Angular timeout service.
 * @param {angularGettext.Catalog} gettextCatalog Gettext catalog.
 * @param {gmf.EditFeature} gmfEditFeature Gmf edit feature service.
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
    gmfEditFeature, gmfTreeManager, ngeoDecorateInteraction, ngeoFeatureHelper,
    ngeoLayerHelper, ngeoToolActivateMgr) {

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
   * @type {number}
   * @export
   */
  this.layerNodeId;

  /**
   * @type {ol.Map}
   * @export
   */
  this.map;


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
      }.bind(this), 0);
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
   * @type {null|ol.layer.Image|ol.layer.Tile}
   * @private
   */
  this.editableWMSLayer_ = null;

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

  /**
   * @type {gmf.ObjecteditingController.Styles}
   * @private
   */
  this.defaultStyles_ = {};
  this.initializeStyles_(this.defaultStyles_, [39, 155, 145]);

  /**
   * @type {gmf.ObjecteditingController.Styles}
   * @private
   */
  this.dirtyStyles_ = {};
  this.initializeStyles_(this.dirtyStyles_, [153, 51, 51]);

  /**
   * Flag that is toggled while a request is pending.
   * @private
   */
  this.pending = false;

  /**
   * @type {boolean}
   * @private
   */
  this.dirty = false;

  $scope.$watch(
    function() {
      return this.dirty;
    }.bind(this),
    function(newVal, oldVal) {
      var geometry = this.feature.getGeometry();
      if (geometry) {
        var geomType = geometry.getType();
        var style = newVal ? this.dirtyStyles_[geomType] :
            this.defaultStyles_[geomType];
        this.feature.setStyle(style);
      }
    }.bind(this)
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
   * @export
   */
  this.modifyToolActivate = new ngeo.ToolActivate(this.modify_, 'active');


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

  this.geometryChanges_.pop();
  var clone = gmf.ObjecteditingController.cloneGeometry_(
    this.geometryChanges_[this.geometryChanges_.length - 1]);

  this.feature.setGeometry(clone);

};


/**
 * Undo the latest modifications.
 * @return {boolean} Whether the state is INSERT or not.
 * @export
 */
gmf.ObjecteditingController.prototype.isStateInsert = function() {
  return this.state_ == gmf.ObjecteditingController.State.INSERT;
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
  this.resetGeometryChanges_();
  if (this.feature.getGeometry()) {
    this.state_ = gmf.ObjecteditingController.State.UPDATE;
  } else {
    this.state_ = gmf.ObjecteditingController.State.INSERT;
  }
  this.pending = false;
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

  if (active) {

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

  } else {

    keys.forEach(function(key) {
      ol.events.unlistenByKey(key);
    }, this);

  }

  this.modify_.setActive(active);
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
 * @param {ol.interaction.Modify.Event} evt Event.
 * @private
 */
gmf.ObjecteditingController.prototype.handleModifyInteractionModifyEnd_ = function(
  evt
) {
  var geometry = this.feature.getGeometry();
  var clone = gmf.ObjecteditingController.cloneGeometry_(geometry);
  this.geometryChanges_.push(clone);
  this.scope_.$apply();
};


/**
 * @param {gmf.ObjecteditingController.Styles} styles Hash of style.
 * @param {ol.Color} color Color.
 * @private
 */
gmf.ObjecteditingController.prototype.initializeStyles_ = function(
  styles, color
) {

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
    }),
    this.ngeoFeatureHelper_.getVertexStyle(true)
  ];
  styles[ol.geom.GeometryType.MULTI_LINE_STRING] = [
    new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: color,
        width: 3
      })
    }),
    this.ngeoFeatureHelper_.getVertexStyle(true)
  ];

  styles[ol.geom.GeometryType.POLYGON] = [
    new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: color,
        width: 2
      }),
      fill: new ol.style.Fill({
        color: rgbaColor
      })
    }),
    this.ngeoFeatureHelper_.getVertexStyle(true)
  ];
  styles[ol.geom.GeometryType.MULTI_POLYGON] = [
    new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: color,
        width: 2
      }),
      fill: new ol.style.Fill({
        color: rgbaColor
      })
    }),
    this.ngeoFeatureHelper_.getVertexStyle(true)
  ];

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
 * @private
 */
gmf.ObjecteditingController.prototype.handleDestroy_ = function() {
  this.features.clear();
  this.toggle_(false);
  this.unregisterInteractions_();
};


// == Static methods and type definitions ==


/**
 * Utility method that gets the clone of a geometry, which can be null or
 * undefined. In the latter case, a null value is returned instead of a
 * geometry.
 * @param {ol.geom.Geometry|null|undefined} geometry A geometry, undefined or
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
