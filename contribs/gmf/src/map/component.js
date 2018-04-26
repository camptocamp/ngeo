/**
 * @module gmf.map.component
 */
import gmfPermalinkPermalink from 'gmf/permalink/Permalink.js';
import gmfEditingSnapping from 'gmf/editing/Snapping.js';
import ngeoMapComponent from 'ngeo/map/component.js';
import ngeoMapFeatureOverlayMgr from 'ngeo/map/FeatureOverlayMgr.js';

/**
 * @type {!angular.Module}
 */
const exports = angular.module('gmfMapComponent', [
  gmfPermalinkPermalink.module.name,
  gmfEditingSnapping.module.name,
  ngeoMapComponent.name,
  ngeoMapFeatureOverlayMgr.module.name,
]);


exports.run(/* @ngInject */ ($templateCache) => {
  $templateCache.put('gmf/map', require('./component.html'));
});


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
exports.directive_ = function() {
  return {
    scope: {
      'map': '<gmfMapMap',
      'manageResize': '<gmfMapManageResize',
      'resizeTransition': '<gmfMapResizeTransition'
    },
    controller: 'GmfMapController as ctrl',
    bindToController: true,
    templateUrl: 'gmf/map'
  };
};

exports.directive('gmfMap', exports.directive_);


/**
 * @param {!ngeo.map.FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 * @param {!gmf.permalink.Permalink} gmfPermalink The gmf permalink service.
 * @param {!gmf.editing.Snapping} gmfSnapping The gmf snapping service.
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname GmfMapController
 */
exports.Controller_ = function(ngeoFeatureOverlayMgr, gmfPermalink, gmfSnapping) {

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
   * @type {!gmf.permalink.Permalink}
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
exports.Controller_.prototype.$onInit = function() {
  this.ngeoFeatureOverlayMgr_.init(this.map);
  this.gmfPermalink_.setMap(this.map);
  this.gmfSnapping_.setMap(this.map);
};


exports.controller('GmfMapController', exports.Controller_);


export default exports;
