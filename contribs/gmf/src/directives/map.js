goog.provide('gmf.mapDirective');

goog.require('gmf');
goog.require('gmf.Permalink');
goog.require('gmf.Snapping');

goog.require('ngeo.map.FeatureOverlayMgr');


// In the future module declaration, don't forget to require:
// - ngeo.map.FeatureOverlayMgr.module.name


/**
 * This goog.require is needed because it provides 'ngeo-map' used in
 * the template.
 * @suppress {extraRequire}
 */
goog.require('ngeo.map.module');
goog.require('ol.Map');


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
gmf.mapDirective = function() {
  return {
    scope: {
      'map': '<gmfMapMap',
      'manageResize': '<gmfMapManageResize',
      'resizeTransition': '<gmfMapResizeTransition'
    },
    controller: 'GmfMapController as ctrl',
    bindToController: true,
    templateUrl: `${gmf.baseTemplateUrl}/map.html`
  };
};

gmf.module.directive('gmfMap', gmf.mapDirective);


/**
 * @param {!ngeo.map.FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 * @param {!gmf.Permalink} gmfPermalink The gmf permalink service.
 * @param {!gmf.Snapping} gmfSnapping The gmf snapping service.
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname GmfMapController
 */
gmf.MapController = function(ngeoFeatureOverlayMgr, gmfPermalink, gmfSnapping) {

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
   * @type {!gmf.Snapping}
   * @private
   */
  this.gmfSnapping_ = gmfSnapping;
};

gmf.module.controller('GmfMapController', gmf.MapController);


/**
 * Called on initialization of the controller.
 */
gmf.MapController.prototype.$onInit = function() {
  this.ngeoFeatureOverlayMgr_.init(this.map);
  this.gmfPermalink_.setMap(this.map);
  this.gmfSnapping_.setMap(this.map);
};
