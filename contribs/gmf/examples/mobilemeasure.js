goog.provide('gmfapp.mobilemeasure');

goog.require('gmf');
goog.require('gmf.Permalink');
/** @suppress {extraRequire} */
goog.require('gmf.map.component');
/** @suppress {extraRequire} */
goog.require('gmf.mobile.measure.lengthComponent');
/** @suppress {extraRequire} */
goog.require('gmf.mobile.measure.pointComponent');
/** @suppress {extraRequire} */
goog.require('ngeo.misc.btnComponent');
/** @suppress {extraRequire} */
goog.require('ngeo.proj.EPSG21781');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.control.ScaleLine');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');


/** @type {!angular.Module} **/
gmfapp.module = angular.module('gmfapp', [
  gmf.module.name,
  gmf.map.component.name,
  gmf.mobile.measure.lengthComponent.name,
  gmf.mobile.measure.pointComponent.name,
  ngeo.misc.btnComponent.name,
]);


gmfapp.module.value(
  'gmfRasterUrl',
  'https://geomapfish-demo.camptocamp.net/2.2/wsgi/raster');


/**
 * @param {gmf.Permalink} gmfPermalink The gmf permalink service.
 * @constructor
 * @ngInject
 */
gmfapp.MainController = function(gmfPermalink) {

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


gmfapp.module.controller('MainController', gmfapp.MainController);
