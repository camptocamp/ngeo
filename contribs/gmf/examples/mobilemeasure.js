/**
 * @module gmfapp.mobilemeasure
 */
const exports = {};

import './mobilemeasure.css';
/** @suppress {extraRequire} */
import gmfMapComponent from 'gmf/map/component.js';

/** @suppress {extraRequire} */
import gmfPermalinkPermalink from 'gmf/permalink/Permalink.js';

import gmfMobileMeasureLengthComponent from 'gmf/mobile/measure/lengthComponent.js';
import gmfMobileMeasurePointComponent from 'gmf/mobile/measure/pointComponent.js';
import ngeoMiscBtnComponent from 'ngeo/misc/btnComponent.js';
import EPSG21781 from 'ngeo/proj/EPSG21781.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olControlScaleLine from 'ol/control/ScaleLine.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';


/** @type {!angular.Module} **/
exports.module = angular.module('gmfapp', [
  'gettext',
  gmfMapComponent.name,
  gmfPermalinkPermalink.module.name,
  gmfMobileMeasureLengthComponent.name,
  gmfMobileMeasurePointComponent.name,
  ngeoMiscBtnComponent.name,
]);


exports.module.value(
  'gmfRasterUrl',
  'https://geomapfish-demo-dc.camptocamp.com/2.4/wsgi/raster');

exports.module.constant('defaultTheme', 'Demo');
exports.module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');


/**
 * @param {gmf.permalink.Permalink} gmfPermalink The gmf permalink service.
 * @constructor
 * @ngInject
 */
exports.MainController = function(gmfPermalink) {

  const center = gmfPermalink.getMapCenter() || [537635, 152640];
  const zoom = gmfPermalink.getMapZoom() || 3;

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new olMap({
    layers: [
      new olLayerTile({
        source: new olSourceOSM()
      })
    ],
    view: new olView({
      projection: EPSG21781,
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: center,
      zoom: zoom
    })
  });

  this.map.addControl(new olControlScaleLine());

  /**
   * @type {boolean}
   * @export
   */
  this.measureLengthActive = false;

  /**
   * @type {Object.<string, gmf.mobile.measure.pointComponent.LayerConfig>}
   * @export
   */
  this.measurePointLayersConfig = [
    {name: 'aster', unit: 'm', decimals: 2},
    {name: 'srtm', unit: 'm'}
  ];

  /**
   * @type {boolean}
   * @export
   */
  this.measurePointActive = false;

};


exports.module.controller('MainController', exports.MainController);


export default exports;
