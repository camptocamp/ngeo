goog.provide('gmfapp.mouseposition');

/** @suppress {extraRequire} */
goog.require('gmf.map.module');
/** @suppress {extraRequire} */
goog.require('ngeo.proj.EPSG2056');
/** @suppress {extraRequire} */
goog.require('ngeo.proj.EPSG21781');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');


/** @type {!angular.Module} **/
gmfapp.module = angular.module('gmfapp', [
  gmf.module.name,
  gmf.map.module.name,
]);


/**
 * @constructor
 * @ngInject
 */
gmfapp.MainController = function() {

  const epsg2056template = 'Coordinates (m)&#58; {x}, {y}';

  /**
   * @type {Array.<gmfx.MousePositionProjection>}
   * @export
   */
  this.projections = [{
    code: 'EPSG:2056',
    label: 'CH1903+ / LV95',
    filter: `ngeoNumberCoordinates:0:${epsg2056template}`
  }, {
    code: 'EPSG:21781',
    label: 'CH1903 / LV03',
    filter: 'ngeoNumberCoordinates:2:[{x} E; {y} N]'
  }, {
    code: 'EPSG:4326',
    label: 'WGS84',
    filter: 'ngeoDMSCoordinates:2'
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

gmfapp.module.controller('MainController', gmfapp.MainController);
