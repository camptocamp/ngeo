goog.provide('app.simple3d');

/** @suppress {extraRequire} */
goog.require('ngeo.mapDirective');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');

goog.require('ngeo.olcs.olcsModule');
goog.require('ngeo');

goog.require('ngeo.olcs.Manager');


/** @type {!angular.Module} **/
app.module = angular.module('app', [
  ngeo.module.name,
  ngeo.olcs.olcsModule.name
]);


/**
 * @constructor
 * @ngInject
 * @param {angular.Scope} $rootScope Root scope.
 * @param {ngeo.olcs.Service} ngeoOlcsService The service.
 */
app.MainController = function($rootScope, ngeoOlcsService) {

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
      center: [0, 0],
      zoom: 4
    })
  });

  // TODO: detect and use different URL for DEBUG MODE
  const cesiumUrl = '../node_modules/@camptocamp/cesium/Build/Cesium/Cesium.js';

  /**
   * @export
   * @type {olcs.contrib.Manager}
   */
  this.ol3dm = new ngeo.olcs.Manager(cesiumUrl, $rootScope, {
    map: this.map
  });

  // Optionally, the manager can be registered into the olcs service
  ngeoOlcsService.initialize(this.ol3dm);
};

app.module.controller('MainController', app.MainController);
