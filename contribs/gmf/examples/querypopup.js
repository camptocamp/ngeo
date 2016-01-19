goog.provide('gmf-querypopup');

goog.require('gmf.CreateQuerypopup');
goog.require('gmf.mapDirective');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.proj');
goog.require('ol.source.OSM');


proj4.defs('EPSG:21781',
    '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 ' +
    '+x_0=600000 +y_0=200000 +ellps=bessel ' +
    '+towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs');


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['gmf']);



/**
 * @param {gmf.CreateQuerypopup} gmfCreateQuerypopup service.
 * @constructor
 * @ngInject
 */
app.MainController = function(gmfCreateQuerypopup) {

  /**
   * @type {gmf.Querypopup}
   * @private
   */
  this.querypopup_ = gmfCreateQuerypopup();

  /**
   * @type {Array.<ol.Feature>}
   * @export
   */
  this.demoFeatures = [new ol.Feature({
    geometry: new ol.geom.Point([533065, 156135]),
    name: 'Point 1',
    id: '1234'
  }), new ol.Feature({
    geometry: new ol.geom.Point([535165, 152335]),
    name: 'Point 2',
    id: '5678'
  }), new ol.Feature({
    geometry: new ol.geom.Point([539565, 151935]),
    name: 'Point 3',
    id: '9101'
  })];

  this.selectOne = function() {
    this.querypopup_.open(this.demoFeatures.slice(0, 1));
  };

  this.selectMultiple = function() {
    this.querypopup_.open(this.demoFeatures);
  };

  var projection = ol.proj.get('EPSG:21781');
  projection.setExtent([485869.5728, 76443.1884, 837076.5648, 299941.7864]);

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
      center: [537635, 152640],
      zoom: 3
    })
  });
};


app.module.controller('MainController', app.MainController);
