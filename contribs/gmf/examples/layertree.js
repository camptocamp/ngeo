goog.provide('gmf-layertree');

goog.require('gmf.layertreeDirective');
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
 * @constructor
 * @param {angular.$http} $http Angular's $http service.
 */
app.MainController = function($http) {

  var projection = ol.proj.get('EPSG:21781');
  projection.setExtent([485869.5728, 76443.1884, 837076.5648, 299941.7864]);

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new ol.Map({
    view: new ol.View({
      projection: projection,
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1],
      center: [537635, 152640],
      zoom: 3
    })
  });

  /**
   * @type {string}
   * @export
   */
  this.wmsUrl = 'http://geomapfish-demo.camptocamp.net/1.6/wsgi/mapserv_proxy';

  /**
   * @type {Object|undefined}
   * @export
   */
  this.themes = undefined;

  $http.get('data/themes.json').success(angular.bind(this, function(data) {
    this.themes = data;
  }));

};


app.module.controller('MainController', app.MainController);
