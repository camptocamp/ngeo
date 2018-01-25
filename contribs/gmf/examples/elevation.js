goog.provide('gmfapp.elevation');


// webpack: import './elevation.css';
// webpack: import './common_dependencies.js';
goog.require('gmf');
/** @suppress {extraRequire} */
goog.require('gmf.map.component');
goog.require('gmf.raster.module');
/** @suppress {extraRequire} */
goog.require('ngeo.proj.EPSG21781');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');


/** @type {!angular.Module} **/
gmfapp.elevation.module = angular.module('gmfapp', [
  gmf.module.name,
  gmf.map.component.name,
  gmf.raster.module.name,
]);


gmfapp.elevation.module.value(
  'gmfRasterUrl',
  'https://geomapfish-demo.camptocamp.net/2.2/wsgi/raster');

gmfapp.elevation.constant('defaultTheme', 'Demo');
gmfapp.elevation.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');


/**
 * @constructor
 * @ngInject
 */
gmfapp.elevation.MainController = function() {
  /**
   * @type {Array.<string>}
   * @export
   */
  this.elevationLayers = ['aster', 'srtm'];

  /**
   * @type {string}
   * @export
   */
  this.selectedElevationLayer = this.elevationLayers[0];

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
      projection: 'EPSG:21781',
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [600000, 200000],
      zoom: 3
    })
  });
};

gmfapp.elevation.module.controller('MainController', gmfapp.elevation.MainController);
