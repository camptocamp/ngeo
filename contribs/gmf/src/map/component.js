/**
 */
import angular from 'angular';
import gmfPermalinkModule from 'gmf/permalink/module.js';
import gmfEditingSnapping from 'gmf/editing/Snapping.js';
import ngeoMapModule from 'ngeo/map/module.js';
import ngeoMapFeatureOverlayMgr from 'ngeo/map/FeatureOverlayMgr.js';

/**
 * @type {!angular.IModule}
 */
const exports = angular.module('gmfMapComponent', [
  gmfPermalinkModule.name,
  gmfEditingSnapping.name,
  ngeoMapModule.name,
  ngeoMapFeatureOverlayMgr.name,
]);


module.run(/* @ngInject */ ($templateCache) => {
  $templateCache.put('gmf/map', require('./component.html'));
});


/**
 * A "map" directive for a GeoMapFish application.
 *
 * Example:
 *
 *      <gmf-map gmf-map-map="mainCtrl.map"></gmf-map>
 *
 * @htmlAttribute {import("ol/Map.js").default} gmf-map-map The map.
 * @htmlAttribute {boolean|undefined} gmf-map-manage-resize Whether to update
 *     the size of the map on browser window resize.
 * @htmlAttribute {boolean|undefined} gmf-map-resize-transition The duration
 *     (milliseconds) of the animation that may occur on the div containing
 *     the map. Used to smoothly resize the map while the animation is in
 *     progress.
 * @return {angular.IDirective} The Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfMap
 */
function directive() {
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
}

module.directive('gmfMap', directive);


/**
 * @param {!import("ngeo/map/FeatureOverlayMgr.js").default} ngeoFeatureOverlayMgr The ngeo feature
 * @param {!import("gmf/permalink/Permalink.js").default} gmfPermalink The gmf permalink service.
 * @param {!import("gmf/editing/Snapping.js").default} gmfSnapping The gmf snapping service.
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname GmfMapController
 */
function Controller(ngeoFeatureOverlayMgr, gmfPermalink, gmfSnapping) {

  // Scope properties

  /**
   * @type {!import("ol/Map.js").default}
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
   * @type {!import("ngeo/map/FeatureOverlayMgr.js").default}
   * @private
   */
  this.ngeoFeatureOverlayMgr_ = ngeoFeatureOverlayMgr;

  /**
   * @type {!import("gmf/permalink/Permalink.js").default}
   * @private
   */
  this.gmfPermalink_ = gmfPermalink;

  /**
   * @type {!import("gmf/editing/Snapping.js").default}
   * @private
   */
  this.gmfSnapping_ = gmfSnapping;
}


/**
 * Called on initialization of the controller.
 */
Controller.prototype.$onInit = function() {
  this.ngeoFeatureOverlayMgr_.init(this.map);
  this.gmfPermalink_.setMap(this.map);
  this.gmfSnapping_.setMap(this.map);
};


module.controller('GmfMapController', Controller);


export default module;
