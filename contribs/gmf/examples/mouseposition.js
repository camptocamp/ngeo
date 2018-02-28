goog.provide('gmfapp.mouseposition');

// webpack: import './mouseposition.css';
/** @suppress {extraRequire} */
goog.require('gmf.map.module');
const EPSG2056 = goog.require('ngeo.proj.EPSG2056');
const EPSG21781 = goog.require('ngeo.proj.EPSG21781');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');


/** @type {!angular.Module} **/
gmfapp.mouseposition.module = angular.module('gmfapp', [
  'gettext',
  gmf.map.module.name,
]);

gmfapp.mouseposition.module.constant('defaultTheme', 'Demo');
gmfapp.mouseposition.module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');


/**
 * @constructor
 * @ngInject
 */
gmfapp.mouseposition.MainController = function() {

  const epsg2056template = 'Coordinates (m)&#58; {x}, {y}';

  /**
   * @type {Array.<gmfx.MousePositionProjection>}
   * @export
   */
  this.projections = [{
    code: EPSG2056,
    label: 'CH1903+ / LV95',
    filter: `ngeoNumberCoordinates:0:${epsg2056template}`
  }, {
    code: EPSG21781,
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

gmfapp.mouseposition.module.controller('MainController', gmfapp.mouseposition.MainController);
