goog.provide('gmf-mouseposition');

/** @suppress {extraRequire} */
goog.require('gmf.mapDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.CoordinateFormat');
goog.require('ngeo.CoordinateFormatConfig');
goog.require('gmf.mousepositionDirective');
goog.require('ngeo.proj.EPSG21781');
goog.require('ngeo.proj.EPSG2056');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['gmf']);


/**
 *
 * @param {ngeo.CoordinateFormat} ngeoCoordinateFormat Coordinates format
 *     projection config.
 * @constructor
 * @ngInject
 */
app.MainController = function(ngeoCoordinateFormat) {

  /**
   * @type {Array.<string>}
   * @export
   */
  this.projections = ['EPSG:4326', 'EPSG:4326:DMS', 'EPSG:4326:UTM3132'];

  /**
   *
   * @type {ngeo.CoordinateFormatConfig|undefined}
   */
  var projWgs84Dms = ngeoCoordinateFormat.getProjection('EPSG:4326:DMS');
  if (projWgs84Dms) {
    projWgs84Dms.label = 'Custom DMS label';
  }

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
