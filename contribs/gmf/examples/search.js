goog.provide('gmf-search');

goog.require('gmf.mapDirective');
goog.require('ngeo.proj.EPSG21781');
goog.require('gmf.searchDirective');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');
goog.require('ol.style.Circle');
goog.require('ol.style.Fill');
goog.require('ol.style.RegularShape');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['gmf']);

app.module.constant('gmfTreeUrl',
    'https://geomapfish-demo.camptocamp.net/2.1/wsgi/themes?version=2&background=background');


/**
 * @param {gmf.Themes} gmfThemes Themes service.
 * @constructor
 * @ngInject
 */
app.MainController = function(gmfThemes) {

  gmfThemes.loadThemes();

  /**
   * @type {Array.<gmfx.SearchDirectiveDatasource>}
   * @export
   */
  this.searchDatasources = [{
    groupValues: ['osm', 'district'],
    groupActions: [],
    labelKey: 'label',
    projection: 'EPSG:21781',
    url: 'https://geomapfish-demo.camptocamp.net/2.1/wsgi/fulltextsearch'
  }];

  var fill = new ol.style.Fill({color: [255, 255, 255, 0.6]});
  var stroke = new ol.style.Stroke({color: [255, 0, 0, 1], width: 2});
  /**
   * @type {Object.<string, ol.style.Style>} Map of styles for search overlay.
   * @export
   */
  this.searchStyles = {
    'osm': new ol.style.Style({
      fill: fill,
      image: new ol.style.Circle({fill: fill, radius: 5, stroke: stroke}),
      stroke: stroke
    })
  };


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
