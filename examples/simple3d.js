goog.provide('app.simple3d');

// webpack: import './simple3d.css';
// webpack: import './common_dependencies.js';
/** @suppress {extraRequire} */
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');

goog.require('ngeo.olcs.olcsModule');
goog.require('ngeo');

goog.require('ngeo.map.module');
goog.require('ngeo.olcs.Manager');


/** @type {!angular.Module} **/
app.simple3d.module = angular.module('app', [
  ngeo.module.name,
  ngeo.map.module.name,
  ngeo.olcs.olcsModule.name
]);


/**
 * @constructor
 * @ngInject
 * @param {angular.Scope} $rootScope Root scope.
 * @param {ngeo.olcs.Service} ngeoOlcsService The service.
 */
app.simple3d.MainController = function($rootScope, ngeoOlcsService) {

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

app.simple3d.module.controller('MainController', app.simple3d.MainController);
