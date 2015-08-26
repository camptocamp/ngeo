goog.provide('gmf-search');

goog.require('gmf.mapDirective');
goog.require('gmf.searchDirective');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['gmf']);



/**
 * @constructor
 */
app.MainController = function() {

  proj4.defs('EPSG:21781',
      '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 ' +
      '+x_0=600000 +y_0=200000 +ellps=bessel ' +
      '+towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs');

  /**
   * @type {Array.<gmfx.SearchDirectiveDatasource>}
   * @export
   */
  this.searchDatasources = [{
    title: 'From demo 1.6',
    url: 'http://geomapfish-demo.camptocamp.net/1.6/wsgi/fulltextsearch',
    projection: 'EPSG:21781'
  }, {
    title: 'From Cartoriviera - ',
    url: 'http://map.cartoriviera.ch/main/wsgi/fulltextsearch',
    projection: 'EPSG:21781',
    groupByProperties: ['04rue', '03adresse']
  }];

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
};


app.module.controller('MainController', app.MainController);
