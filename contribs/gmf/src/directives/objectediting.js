goog.provide('gmf.ObjecteditingController');
goog.provide('gmf.objecteditingDirective');

goog.require('gmf');
goog.require('ngeo.DecorateInteraction');
goog.require('ngeo.FeatureHelper');
goog.require('ngeo.ToolActivate');
goog.require('ngeo.ToolActivateMgr');
goog.require('ol.Collection');
goog.require('ol.interaction.Modify');


/**
 * Directive used to edit the geometry of a single feature using advanced
 * tools.
 *
 * Example:
 *
 *     <gmf-objectediting
 *         gmf-objectediting-active="ctrl.objectEditingActive"
 *         gmf-objectediting-feature="ctrl.objectEditingFeature"
 *         gmf-objectediting-map="::ctrl.map">
 *     </gmf-objectediting>
 *
 * @htmlAttribute {boolean} gmf-objectediting-active Whether the directive is
 *     active or not.
 * @htmlAttribute {ol.Feature} gmf-objectediting-feature The feature to edit.
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
      'map': '<gmfObjecteditingMap'
    },
    bindToController: true,
    controllerAs: 'oeCtrl',
    templateUrl: gmf.baseTemplateUrl + '/objectediting.html'
  };
};

gmf.module.directive('gmfObjectediting', gmf.objecteditingDirective);


/**
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
gmf.ObjecteditingController = function(ngeoDecorateInteraction,
    ngeoFeatureHelper, ngeoToolActivateMgr) {

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
   * @type {ol.Map}
   * @export
   */
  this.map;


  // == Injected properties ==

  /**
   * @type {ngeo.DecorateInteraction}
   * @private
   */
  this.ngeoDecorateInteraction_ = ngeoDecorateInteraction;

  /**
   * @type {ngeo.FeatureHelper}
   * @private
   */
  this.featureHelper_ = ngeoFeatureHelper;

  /**
   * @type {ngeo.ToolActivateMgr}
   * @private
   */
  this.ngeoToolActivateMgr_ = ngeoToolActivateMgr;


  // == Other properties ==

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

  if (active) {
    console.log(active);
  } else {
    console.log(active);
  }

  this.modify_.setActive(active);
};


gmf.module.controller(
  'GmfObjecteditingController', gmf.ObjecteditingController);
