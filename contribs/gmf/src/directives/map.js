goog.provide('gmf.MapController');
goog.provide('gmf.mapDirective');

goog.require('gmf');
goog.require('gmf.Permalink');
goog.require('gmf.Snapping');
goog.require('goog.asserts');
goog.require('ngeo.FeatureOverlayMgr');

/**
 * This goog.require is needed because it provides 'ngeo-map' used in
 * the template.
 * @suppress {extraRequire}
 */
goog.require('ngeo.mapDirective');
goog.require('ol.Map');


/**
 * A "map" directive for a GeoMapFish application.
 *
 * Example:
 *
 *      <gmf-map gmf-map-map="mainCtrl.map"></gmf-map>
 *
 * @htmlAttribute {ol.Map} gmf-map-map The map.
 * @return {angular.Directive} The Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfMap
 */
gmf.mapDirective = function() {
  return {
    scope: {
      'getMapFn': '&gmfMapMap'
    },
    controller: 'GmfMapController',
    controllerAs: 'ctrl',
    template: '<div ngeo-map="ctrl.map"></div>'
  };
};

gmf.module.directive('gmfMap', gmf.mapDirective);


/**
 * @param {angular.Scope} $scope The directive's scope.
 * @param {ngeo.FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 * @param {gmf.Permalink} gmfPermalink The gmf permalink service.
 * @param {gmf.Snapping} gmfSnapping The gmf snapping service.
 * @constructor
 * @ngInject
 * @ngdoc controller
 * @ngname GmfMapController
 */
gmf.MapController = function($scope, ngeoFeatureOverlayMgr, gmfPermalink,
    gmfSnapping) {

  var map = $scope['getMapFn']();
  goog.asserts.assertInstanceof(map, ol.Map);

  /**
   * @type {!ol.Map}
   * @export
   */
  this.map = map;

  ngeoFeatureOverlayMgr.init(this.map);

  gmfPermalink.setMap(this.map);

  gmfSnapping.setMap(this.map);

};

gmf.module.controller('GmfMapController', gmf.MapController);
