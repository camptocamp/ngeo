goog.provide('gmf-mobilebackgroundlayerselector');

goog.require('gmf.Themes');
goog.require('gmf.mapDirective');
goog.require('gmf.mobileBackgroundLayerSelectorDirective');
goog.require('gmf.proj.EPSG21781');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['gmf']);


app.module.constant(
    'gmfTreeUrl',
    'https://geomapfish-demo.camptocamp.net/2.0/wsgi/themes?' +
        'version=2&background=background');


app.module.value('gmfWmsUrl',
    'https://geomapfish-demo.camptocamp.net/1.6/wsgi/mapserv_proxy');



/**
 * @param {gmf.Themes} gmfThemes Themes service.
 * @constructor
 * @ngInject
 */
app.MainController = function(gmfThemes) {

  gmfThemes.loadThemes();

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new ol.Map({
    layers: [],
    view: new ol.View({
      center: [632464, 185457],
      projection: ol.proj.get('epsg:21781'),
      minZoom: 3,
      zoom: 3
    })
  });
};


app.module.controller('MainController', app.MainController);
