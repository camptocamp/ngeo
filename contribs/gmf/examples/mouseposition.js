goog.provide('gmf-mouseposition');

/** @suppress {extraRequire} */
goog.require('gmf.mapDirective');
goog.require('gmf.mousepositionDirective');
goog.require('ngeo.proj.EPSG2056');
goog.require('ngeo.proj.EPSG21781');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['gmf']);


/**
 * @constructor
 * @ngInject
 */
app.MainController = function() {

  var epsg2056FilterLabel = 'Coordinates';

  /**
   * @type {Array.<gmfx.MousePositionProjection>}
   * @export
   */
  this.projections = [{
    code: 'EPSG:2056',
    label: 'CH1903+ / LV03',
    filter: 'ngeoSwissCoordinates:' + epsg2056FilterLabel + ' (m) : '
  }, {
    code: 'EPSG:21781',
    label: 'CH1903 / LV03',
    filter: 'ngeoEastNorthCoordinates:2:[ :; : ]'
  }, {
    code: 'EPSG:4326',
    label: 'WGS84',
    filter: 'ngeoDMSCoordinates'
  }];

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
      center: [828042, 5933739],
      zoom: 8
    })
  });
};

app.module.controller('MainController', app.MainController);
