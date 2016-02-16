goog.provide('gmf-mobilemeasure');

goog.require('gmf.Permalink');
goog.require('gmf.mobileMeasureLengthDirective');
goog.require('gmf.mobileMeasurePointDirective');
goog.require('gmf.proj.EPSG21781');
goog.require('ngeo.MeasureEvent');
goog.require('ngeo.btngroupDirective');
goog.require('ngeo.interaction.MeasurePointMobile');
goog.require('gmf.mapDirective');
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
    'https://geomapfish-demo.camptocamp.net/2.0/wsgi/raster');


/**
 * @param {gmf.Permalink} gmfPermalink The gmf permalink service.
 * @constructor
 */
app.MainController = function(gmfPermalink) {

  var projection = ol.proj.get('EPSG:21781');
  projection.setExtent([485869.5728, 76443.1884, 837076.5648, 299941.7864]);

  var center = gmfPermalink.getMapCenter() || [537635, 152640];
  var zoom = gmfPermalink.getMapZoom() || 3;

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
      center: center,
      zoom: zoom
    })
  });

  this.map.addControl(new ol.control.ScaleLine());

  /**
   * @type {boolean}
   * @export
   */
  this.measureLengthActive = false;

  /**
   * @type {boolean}
   * @export
   */
  this.measurePointActive = false;

};


app.module.controller('MainController', app.MainController);
