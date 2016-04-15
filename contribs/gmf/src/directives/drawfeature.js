goog.provide('gmf.DrawfeatureController');
goog.provide('gmf.drawfeatureDirective');

goog.require('gmf');
/** @suppress {extraRequire} */
goog.require('gmf.featurestyleDirective');
goog.require('ngeo.ToolActivate');
goog.require('ngeo.ToolActivateMgr');
/** @suppress {extraRequire} */
goog.require('ngeo.btngroupDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.drawfeatureDirective');
goog.require('ngeo.interaction.Modify');
goog.require('ol.Collection');


/**
 * Directive used to create, modify and delete vector features on a map with
 * the addition of changing their style.
 * Example:
 *
 *     <gmf-drawfeature
 *         gmf-drawfeature-active="ctrl.drawFeatureActive">
 *         gmf-drawfeature-map="::ctrl.map">
 *     </gmf-drawfeature>
 *
 * @htmlAttribute {boolean} gmf-drawfeature-active Whether the directive is
 *     active or not.
 * @htmlAttribute {ol.Map} gmf-drawfeature-map The map.
 * @return {angular.Directive} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfDrawfeature
 */
gmf.drawfeatureDirective = function() {
  return {
    controller: 'GmfDrawfeatureController',
    scope: {
      'active': '=gmfDrawfeatureActive',
      'map': '<gmfDrawfeatureMap'
    },
    bindToController: true,
    controllerAs: 'efCtrl',
    templateUrl: gmf.baseTemplateUrl + '/drawfeature.html'
  };
};

gmf.module.directive('gmfDrawfeature', gmf.drawfeatureDirective);


/**
 * @param {!angular.Scope} $scope Angular scope.
 * @param {angular.$timeout} $timeout Angular timeout service.
 * @param {ngeo.DecorateInteraction} ngeoDecorateInteraction Decorate
 *     interaction service.
 * @param {ngeo.FeatureHelper} ngeoFeatureHelper Gmf feature helper service.
 * @param {ol.Collection.<ol.Feature>} ngeoFeatures Collection of features.
 * @param {ngeo.ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate manager
 *     service.
 * @constructor
 * @ngInject
 * @ngdoc controller
 * @ngname GmfDrawfeatureController
 */
gmf.DrawfeatureController = function($scope, $timeout, ngeoDecorateInteraction,
    ngeoFeatureHelper, ngeoFeatures, ngeoToolActivateMgr) {

  /**
   * @type {ol.Map}
   * @export
   */
  this.map;

  /**
   * @type {boolean}
   * @export
   */
  this.active;

  if (this.active === undefined) {
    this.active = false;
  }

  /**
   * @type {boolean}
   * @export
   */
  this.drawActive = false;

 /**
   * @type {ngeo.ToolActivate}
   * @export
   */
  this.drawToolActivate = new ngeo.ToolActivate(this, 'drawActive');

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
   * @type {ngeo.FeatureHelper}
   * @private
   */
  this.featureHelper_ = ngeoFeatureHelper;

  /**
   * @type {ol.Collection.<ol.Feature>}
   * @export
   */
  this.features = ngeoFeatures;

  /**
   * @type {ngeo.ToolActivateMgr}
   * @private
   */
  this.ngeoToolActivateMgr_ = ngeoToolActivateMgr;

  /**
   * @type {?ol.Feature}
   * @export
   */
  this.selectedFeature = null;

  /**
   * @type {ol.Collection.<ol.Feature>}
   * @private
   */
  this.selectedFeatures_ = new ol.Collection();

  /**
   * @type {boolean}
   * @export
   */
  this.otherActive = true;

  /**
   * @type {ngeo.ToolActivate}
   * @export
   */
  this.otherToolActivate = new ngeo.ToolActivate(this, 'otherActive');

  /**
   * @type {ngeo.interaction.Modify}
   * @private
   */
  this.modify_ = new ngeo.interaction.Modify({
    features: this.selectedFeatures_,
    style: ngeoFeatureHelper.getVertexStyle(false)
  });
  var modify = this.modify_;
  modify.setActive(false);
  ngeoDecorateInteraction(modify);
  this.map.addInteraction(modify);

  /**
   * @type {Array.<ol.events.Key>}
   * @private
   */
  this.listenerKeys_ = [];

  $scope.$watch(
    function() {
      return this.active;
    }.bind(this),
    this.handleActiveChange_.bind(this)
  );

  $scope.$watch(
    function() {
      return this.drawActive;
    }.bind(this),
    function(active) {
      if (active) {
        this.selectedFeature = null;
      }
    }.bind(this)
  );

  $scope.$watch(
    function() {
      return this.selectedFeature;
    }.bind(this),
    function(newFeature, previousFeature) {
      if (previousFeature) {
        this.featureHelper_.setStyle(previousFeature);
        this.selectedFeatures_.clear();
      }
      if (newFeature) {
        this.featureHelper_.setStyle(newFeature, true);
        this.selectedFeatures_.push(newFeature);
      }
    }.bind(this)
  );

  $scope.$watch(
    function() {
      return this.mapSelectActive;
    }.bind(this),
    this.handleMapSelectActiveChange_.bind(this)
  );

  /**
   * @type {string}
   * @export
   */
  this.nameProperty = ngeo.FeatureProperties.NAME;

};


/**
 * Called when the active property of the this directive changes. Manage
 * the activation/deactivation accordingly (event management, etc.)
 * @param {boolean} active Whether the directive is active or not.
 * @private
 */
gmf.DrawfeatureController.prototype.handleActiveChange_ = function(active) {

  var keys = this.listenerKeys_;
  var drawUid = ['draw-', goog.getUid(this)].join('-');
  var otherUid = ['other-', goog.getUid(this)].join('-');
  var toolMgr = this.ngeoToolActivateMgr_;

  if (active) {
    // when activated

    keys.push(ol.events.listen(this.features, ol.CollectionEventType.ADD,
        this.handleFeaturesAdd_, this));
    keys.push(ol.events.listen(this.features, ol.CollectionEventType.REMOVE,
        this.handleFeaturesRemove_, this));

    toolMgr.registerTool(drawUid, this.drawToolActivate, false);
    toolMgr.registerTool(drawUid, this.mapSelectToolActivate, true);

    toolMgr.registerTool(otherUid, this.drawToolActivate, false);
    toolMgr.registerTool(otherUid, this.otherToolActivate, true);

    this.mapSelectActive = true;
    this.modify_.setActive(true);
  } else {
    // when deactivated

    keys.forEach(function(key) {
      ol.events.unlistenByKey(key);
    }, this);

    toolMgr.unregisterTool(drawUid, this.drawToolActivate);
    toolMgr.unregisterTool(drawUid, this.mapSelectToolActivate);

    toolMgr.unregisterTool(otherUid, this.drawToolActivate);
    toolMgr.unregisterTool(otherUid, this.otherToolActivate);

    this.drawActive = false;
    this.modify_.setActive(false);
    this.mapSelectActive = false;
    this.selectedFeature = null;
  }

};


/**
 * @param {ol.CollectionEvent} evt Event.
 * @private
 */
gmf.DrawfeatureController.prototype.handleFeaturesAdd_ = function(evt) {
  // timeout to prevent double-click to zoom the map
  this.timeout_(function() {
    this.selectedFeature = /** @type {ol.Feature} */ (evt.element);
    this.drawActive = false;
    this.scope_.$apply();
  }.bind(this));
};


/**
 * @param {ol.CollectionEvent} evt Event.
 * @private
 */
gmf.DrawfeatureController.prototype.handleFeaturesRemove_ = function(evt) {
  this.selectedFeature = null;
};


/**
 * Called when the mapSelectActive property changes.
 * @param {boolean} active Whether the map select is active or not.
 * @private
 */
gmf.DrawfeatureController.prototype.handleMapSelectActiveChange_ = function(
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
gmf.DrawfeatureController.prototype.handleMapClick_ = function(evt) {

  var pixel = evt.pixel;

  var feature = this.map.forEachFeatureAtPixel(pixel, function(feature) {
    var ret = false;
    if (ol.array.includes(this.features.getArray(), feature)) {
      ret = feature;
    }
    return ret;
  }.bind(this));

  this.selectedFeature = feature ? feature : null;
  this.scope_.$apply();
};


gmf.module.controller('GmfDrawfeatureController', gmf.DrawfeatureController);
