goog.provide('gmfapp.mobilemeasure');

// webpack: import './mobilemeasure.css';
// webpack: import './common_dependencies.js';
goog.require('gmf');
/** @suppress {extraRequire} */
goog.require('gmf.map.component');
/** @suppress {extraRequire} */
goog.require('gmf.permalink.Permalink');
goog.require('gmf.mobile.measure.lengthComponent');
goog.require('gmf.mobile.measure.pointComponent');
goog.require('ngeo.misc.btnComponent');
/** @suppress {extraRequire} */
goog.require('ngeo.proj.EPSG21781');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.control.ScaleLine');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');


/** @type {!angular.Module} **/
gmfapp.mobilemeasure.module = angular.module('gmfapp', [
  gmf.module.name,
  gmf.map.component.name,
  gmf.permalink.Permalink.module.name,
  gmf.mobile.measure.lengthComponent.name,
  gmf.mobile.measure.pointComponent.name,
  ngeo.misc.btnComponent.name,
]);


gmfapp.mobilemeasure.module.value(
  'gmfRasterUrl',
  'https://geomapfish-demo.camptocamp.net/2.2/wsgi/raster');

gmfapp.mobilemeasure.constant('defaultTheme', 'Demo');
gmfapp.mobilemeasure.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');


/**
 * @param {gmf.permalink.Permalink} gmfPermalink The gmf permalink service.
 * @constructor
 * @ngInject
 */
gmfapp.mobilemeasure.MainController = function(gmfPermalink) {

  const center = gmfPermalink.getMapCenter() || [537635, 152640];
  const zoom = gmfPermalink.getMapZoom() || 3;

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
   * @type {Object.<string, gmf.mobile.measure.pointComponent.LayerConfig>}
   * @export
   */
  this.measurePointLayersConfig = {
    'aster': {unit: 'm', decimals: 2},
    'srtm': {unit: 'm'}
  };

  /**
   * @type {boolean}
   * @export
   */
  this.measurePointActive = false;

};


gmfapp.mobilemeasure.module.controller('MainController', gmfapp.mobilemeasure.MainController);
