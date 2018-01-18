goog.provide('gmfapp.backgroundlayerselector');

/** @suppress {extraRequire} */
goog.require('gmf.backgroundlayerselector.module');
/** @suppress {extraRequire} */
goog.require('gmf.map.component');
goog.require('gmf.theme.Themes');
/** @suppress {extraRequire} */
goog.require('ngeo.proj.EPSG21781');
goog.require('ol.Map');
goog.require('ol.View');


/** @type {!angular.Module} **/
gmfapp.module = angular.module('gmfapp', [
  gmf.backgroundlayerselector.module.name,
  gmf.map.component.name,
  gmf.theme.Themes.module.name,
]);


gmfapp.module.value(
  'gmfTreeUrl',
  'https://geomapfish-demo.camptocamp.net/2.2/wsgi/themes?' +
        'version=2&background=background');


/**
 * @param {gmf.theme.Themes} gmfThemes Themes service.
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
