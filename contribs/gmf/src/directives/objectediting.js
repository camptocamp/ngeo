goog.provide('gmf.ObjecteditingController');
goog.provide('gmf.objecteditingDirective');

goog.require('gmf');
goog.require('gmf.EditFeature');
goog.require('ngeo.DecorateInteraction');
goog.require('ngeo.FeatureHelper');
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
 * @param {gmf.EditFeature} gmfEditFeature Gmf edit feature service.
 * @param {ngeo.DecorateInteraction} ngeoDecorateInteraction Decorate
 *     interaction service.
 * @param {ngeo.FeatureHelper} ngeoFeatureHelper Ngeo feature helper service.
 * @param {ngeo.ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate manager
 *     service.
 * @constructor
 * @ngInject
 * @ngdoc controller
 * @ngname GmfObjecteditingController
 */
gmf.ObjecteditingController = function($scope, gmfEditFeature,
    ngeoDecorateInteraction, ngeoFeatureHelper, ngeoToolActivateMgr) {

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
   * @type {gmf.EditFeature}
   * @private
   */
  this.gmfEditFeature_ = gmfEditFeature;

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

};


// == API methods ==


/**
 * Save the current modifications.
 * @export
 */
gmf.ObjecteditingController.prototype.save = function() {
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

  } else {

    keys.forEach(function(key) {
      ol.events.unlistenByKey(key);
    }, this);

  }

  this.modify_.setActive(active);
};


/**
 * Reset the array of geometry changes.  If the array is empty, that means
 * the array hasn't been initialized yet. If there's only one item, no need
 * to do anything (i.e. the geometry in there is the same as the feature).
 * If there's more than one, that means there's mo
 * @private
 */
gmf.ObjecteditingController.prototype.resetGeometryChanges_ = function() {
  if (this.geometryChanges_.length === 0) {
    this.geometryChanges_.push(this.feature.getGeometry());
  } else if (this.geometryChanges_.length > 1) {
    var firstGeom = this.geometryChanges_[0];
    this.feature.setGeometry(firstGeom);
    this.geometryChanges_.length = 0;
    this.geometryChanges_.push(firstGeom);
  }
};


/**
 * @param {ol.interaction.Modify.Event} evt Event.
 * @private
 */
gmf.ObjecteditingController.prototype.handleModifyInteractionModifyEnd_ = function(
  evt
) {
  this.geometryChanges_.push(
    this.feature.getGeometry()
  );
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
