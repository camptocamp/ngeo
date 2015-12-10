goog.provide('gmf.MapController');
goog.provide('gmf.mapDirective');

goog.require('gmf');
goog.require('goog.asserts');
goog.require('ngeo.Debounce');
goog.require('ngeo.Location');
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
 * @example
 * <gmf-map gmf-map-map="mainCtrl.map"></gmf-map>
 *
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

gmfModule.directive('gmfMap', gmf.mapDirective);



/**
 * @param {angular.Scope} $scope The directive's scope.
 * @param {ngeo.Location} ngeoLocation ngeo Location service.
 * @param {ngeo.Debounce} ngeoDebounce ngeo Debounce service.
 * @constructor
 * @ngInject
 * @ngdoc controller
 * @ngname GmfMapController
 */
gmf.MapController = function($scope, ngeoLocation, ngeoDebounce) {

  var map = $scope['getMapFn']();
  goog.asserts.assertInstanceof(map, ol.Map);

  /**
   * @type {!ol.Map}
   * @export
   */
  this.map = map;

  var view = map.getView();
  goog.asserts.assert(!goog.isNull(view));

  var x = ngeoLocation.getParam('map_x');
  var y = ngeoLocation.getParam('map_y');
  var zoom = ngeoLocation.getParam('map_zoom');

  if (goog.isDef(x) && goog.isDef(y)) {
    view.setCenter([+x, +y]);
  }
  if (goog.isDef(zoom)) {
    view.setZoom(+zoom);
  }

  view.on('propertychange', ngeoDebounce(function() {
    var center = view.getCenter();
    var zoom = view.getZoom();
    ngeoLocation.updateParams({
      'map_zoom': zoom,
      'map_x': Math.round(center[0]),
      'map_y': Math.round(center[1])
    });
  }, 300, /* invokeApply */ true));
};

gmfModule.controller('GmfMapController', gmf.MapController);
