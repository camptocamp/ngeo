goog.provide('gmfapp.contextualdata');

// webpack: import './contextualdata.css';
// webpack: import './common_dependencies.js';
goog.require('gmf');
/** @suppress {extraRequire} */
goog.require('gmf.contextualdata.module');
/** @suppress {extraRequire} */
goog.require('gmf.map.component');
/** @suppress {extraRequire} */
goog.require('ngeo.filters');
/** @suppress {extraRequire} */
goog.require('ngeo.proj.EPSG21781');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');


/** @type {!angular.Module} **/
gmfapp.contextualdata.module = angular.module('gmfapp', [
  gmf.module.name,
  gmf.contextualdata.module.name,
  gmf.map.component.name,
]);


gmfapp.contextualdata.module.value(
  'gmfRasterUrl',
  'https://geomapfish-demo.camptocamp.net/2.2/wsgi/raster');

gmfapp.contextualdata.module.value(
  'gmfContextualdatacontentTemplateUrl',
  'partials/contextualdata.html');

gmfapp.contextualdata.constant('defaultTheme', 'Demo');
gmfapp.contextualdata.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');


/**
 * @constructor
 * @ngInject
 */
gmfapp.contextualdata.MainController = function() {
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
      projection: 'EPSG:21781',
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [600000, 200000],
      zoom: 3
    })
  });
};


/**
 * @param {ol.Coordinate} coordinate The coordinate for the right-clicked
 *     point.
 * @param {Object} data The data received from the raster service.
 * @return {Object} The additional data to add to the scope for the
 *     contextualdata popover.
 */
gmfapp.contextualdata.MainController.prototype.onRasterData = function(coordinate, data) {
  return {
    'elelvation_diff': data['srtm'] - data['aster']
  };
};

gmfapp.contextualdata.module.controller('MainController', gmfapp.contextualdata.MainController);
