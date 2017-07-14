goog.provide('gmfapp.backgroundlayerselector');

goog.require('gmf.Themes');
/** @suppress {extraRequire} */
goog.require('gmf.backgroundlayerselectorComponent');
/** @suppress {extraRequire} */
goog.require('gmf.mapDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.proj.EPSG21781');
goog.require('ol.Map');
goog.require('ol.View');


/** @type {!angular.Module} **/
gmfapp.module = angular.module('gmfapp', ['gmf']);


gmfapp.module.value(
    'gmfTreeUrl',
    'https://geomapfish-demo.camptocamp.net/2.2/wsgi/themes?' +
        'version=2&background=background');


/**
 * @param {gmf.Themes} gmfThemes Themes service.
 * @constructor
 * @ngInject
 */
gmfapp.MainController = function(gmfThemes) {

  gmfThemes.loadThemes();

  /**
   * @type {Object.<string, string>}
   * @export
   */
  this.dimensions = {};

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new ol.Map({
    layers: [],
    view: new ol.View({
      center: [632464, 185457],
      projection: 'EPSG:21781',
      minZoom: 3,
      zoom: 3
    })
  });
};


gmfapp.module.controller('MainController', gmfapp.MainController);
