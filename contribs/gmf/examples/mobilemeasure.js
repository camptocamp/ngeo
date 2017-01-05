goog.provide('gmfapp.mobilemeasure');

goog.require('gmf.Permalink');
/** @suppress {extraRequire} */
goog.require('gmf.mobileMeasurelengthDirective');
/** @suppress {extraRequire} */
goog.require('gmf.mobileMeasurepointDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.proj.EPSG21781');
/** @suppress {extraRequire} */
goog.require('ngeo.btngroupDirective');
/** @suppress {extraRequire} */
goog.require('gmf.mapDirective');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.control.ScaleLine');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');


/** @type {!angular.Module} **/
gmfapp.module = angular.module('gmfapp', ['gmf']);


gmfapp.module.value(
    'gmfRasterUrl',
    'https://geomapfish-demo.camptocamp.net/2.1/wsgi/raster');


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
   * @type {Array.<string>}
   * @export
   */
  this.measurePointLayers = ['aster', 'srtm'];

  /**
   * @type {boolean}
   * @export
   */
  this.measurePointActive = false;

};


gmfapp.module.controller('MainController', gmfapp.MainController);
