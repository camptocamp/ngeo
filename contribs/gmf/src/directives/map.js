/**
 * @fileoverview This file provides the "map" directive for GeoMapFish
 * applications.
 *
 * Example:
 *
 * <gmf-map gmf-map-map="::mainCtrl.map"></gmf-map>
 */
goog.provide('gmf.mapDirective');

goog.require('gmf');
goog.require('goog.asserts');
goog.require('ngeo.Debounce');
goog.require('ngeo.Location');
goog.require('ngeo.mapDirective');


/**
 * @return {angular.Directive} The Directive Definition Object.
 * @ngInject
 */
gmf.mapDirective = function() {
  return {
    scope: {},
    bindToController: {
      'map': '=gmfMapMap'
    },
    controller: 'GmfMapController',
    controllerAs: 'ctrl',
    template: '<div ngeo-map="ctrl.map"></div>'
  };
};

gmfModule.directive('gmfMap', gmf.mapDirective);



/**
 * @param {ngeo.Location} ngeoLocation ngeo Location service.
 * @param {ngeo.Debounce} ngeoDebounce ngeo Debounce service.
 * @constructor
 * @ngInject
 */
gmf.MapController = function(ngeoLocation, ngeoDebounce) {

  /**
   * @type {!ol.Map}
   */
  var map = this['map'];
  goog.asserts.assert(goog.isDef(map));
  var view = map.getView();

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
