goog.provide('gmfapp.lidarprofile');

/** @suppress {extraRequire} */
goog.require('gmf.drawprofilelineDirective');
/** @suppress {extraRequire} */
goog.require('gmf.mapDirective');
/** @suppress {extraRequire} */
goog.require('gmf.lidarPanelComponent');
/** @suppress {extraRequire} */
goog.require('gmf.lidarProfileComponent');
/** @suppress {extraRequire} */
goog.require('ngeo.proj.EPSG2056');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');


/** @type {!angular.Module} **/
gmfapp.module = angular.module('gmfapp', ['gmf']);


gmfapp.module.value('pytreeLidarProfileJsonUrl', 'https://sitn.ne.ch/pytree/pytree_dev/');

/**
 * @param {angular.Scope} $scope Angular scope.
 * @constructor
 * @ngInject
 */
gmfapp.MainController = function($scope) {
  /**
   * @type {ol.geom.LineString}
   * @export
   */
  this.profileLine = null;

  /**
   * @type {boolean}
   * @export
   */
  this.panelActivated = false;

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      projection: 'EPSG:2056',
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [2551894, 1202362],
      zoom: 3
    })
  });
};


gmfapp.module.controller('MainController', gmfapp.MainController);
