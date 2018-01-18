goog.provide('gmf.map.component');

goog.require('gmf');
goog.require('gmf.Permalink');
goog.require('gmf.editing.Snapping');
goog.require('ngeo.map.directive');
goog.require('ngeo.map.FeatureOverlayMgr');
goog.require('ol.Map');


/**
 * @type {!angular.Module}
 */
gmf.map.component = angular.module('gmfMapComponent', [
  gmf.editing.Snapping.module.name,
  ngeo.map.directive.name,
  ngeo.map.FeatureOverlayMgr.module.name,
]);

gmf.module.requires.push(gmf.map.component.name);


/**
 * A "map" directive for a GeoMapFish application.
 *
 * Example:
 *
 *      <gmf-map gmf-map-map="mainCtrl.map"></gmf-map>
 *
 * @htmlAttribute {ol.Map} gmf-map-map The map.
 * @htmlAttribute {boolean|undefined} gmf-map-manage-resize Whether to update
 *     the size of the map on browser window resize.
 * @htmlAttribute {boolean|undefined} gmf-map-resize-transition The duration
 *     (milliseconds) of the animation that may occur on the div containing
 *     the map. Used to smoothly resize the map while the animation is in
 *     progress.
 * @return {angular.Directive} The Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfMap
 */
gmf.map.component.directive_ = function() {
  return {
    scope: {
      'map': '<gmfMapMap',
      'manageResize': '<gmfMapManageResize',
      'resizeTransition': '<gmfMapResizeTransition'
    },
    controller: 'GmfMapController as ctrl',
    bindToController: true,
    templateUrl: `${gmf.baseModuleTemplateUrl}/map/component.html`
  };
};

gmf.map.component.directive('gmfMap', gmf.map.component.directive_);


/**
 * @param {!ngeo.map.FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 * @param {!gmf.Permalink} gmfPermalink The gmf permalink service.
 * @param {!gmf.editing.Snapping} gmfSnapping The gmf snapping service.
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname GmfMapController
 */
gmf.map.component.Controller_ = function(ngeoFeatureOverlayMgr, gmfPermalink, gmfSnapping) {

  // Scope properties

  /**
   * @type {!ol.Map}
   * @export
   */
  this.map;

  /**
   * @type {boolean|undefined}
   * @export
   */
  this.manageResize;

  /**
   * @type {boolean|undefined}
   * @export
   */
  this.resizeTransition;


  // Injected properties

  /**
   * @type {!ngeo.map.FeatureOverlayMgr}
   * @private
   */
  this.ngeoFeatureOverlayMgr_ = ngeoFeatureOverlayMgr;

  /**
   * @type {!gmf.Permalink}
   * @private
   */
  this.gmfPermalink_ = gmfPermalink;

  /**
   * @type {!gmf.editing.Snapping}
   * @private
   */
  this.gmfSnapping_ = gmfSnapping;
};


/**
 * Called on initialization of the controller.
 */
gmf.map.component.Controller_.prototype.$onInit = function() {
  this.ngeoFeatureOverlayMgr_.init(this.map);
  this.gmfPermalink_.setMap(this.map);
  this.gmfSnapping_.setMap(this.map);
};


gmf.map.component.controller('GmfMapController', gmf.map.component.Controller_);
