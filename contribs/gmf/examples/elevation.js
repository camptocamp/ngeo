goog.provide('gmf-elevation');

goog.require('gmf.elevationDirective');
goog.require('gmf.mapDirective');
goog.require('ngeo.proj.EPSG21781');
goog.require('ol.Map');
goog.require('ol.Observable');
goog.require('ol.Overlay');
goog.require('ol.View');
goog.require('ol.control.ScaleLine');
goog.require('ol.layer.Tile');
goog.require('ol.proj');
goog.require('ol.source.OSM');


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['gmf']);


app.module.constant(
    'gmfAltitudeUrl',
    'https://geomapfish-demo.camptocamp.net/2.1/wsgi/raster');


/**
 * @constructor
 */
app.MainController = function() {

  var projection = ol.proj.get('EPSG:21781');

  /**
   * @type {Array.<string>}
   * @export
   */
  this.elevationLayers = ['aster', 'srtm'];

  /**
   * @type {string}
   * @export
   */
  this.elevationLayer = this.elevationLayers[0];

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
      projection: projection,
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [600000, 200000],
      zoom: 3
    })
  });
};

app.module.controller('MainController', app.MainController);
