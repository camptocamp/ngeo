goog.provide('sourceloader');

goog.require('ngeo.SourceLoaderController');
goog.require('ngeo.mapDirective');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['ngeo']);



/**
 * @constructor
 */
app.MainController = function() {

  /**
   * List of preconfigured WMS servers.
   * @type {Array.<string>}
   * @export
   */
  this.externalUrls = [
    'https://wms.geo.admin.ch/',
    'http://ogc.heig-vd.ch/mapserver/wms'
  ];

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
