/**
 * @module gmfapp.mouseposition
 */
const exports = {};

import './mouseposition.css';
/** @suppress {extraRequire} */
import gmfMapModule from 'gmf/map/module.js';

import EPSG2056 from 'ngeo/proj/EPSG2056.js';
import EPSG21781 from 'ngeo/proj/EPSG21781.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';


/** @type {!angular.Module} **/
exports.module = angular.module('gmfapp', [
  'gettext',
  gmfMapModule.name,
]);

exports.module.constant('defaultTheme', 'Demo');
exports.module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');


/**
 * @constructor
 * @ngInject
 */
exports.MainController = function() {

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
  this.map = new olMap({
    layers: [
      new olLayerTile({
        source: new olSourceOSM()
      })
    ],
    view: new olView({
      center: [828042, 5933739],
      zoom: 8
    })
  });
};

exports.module.controller('MainController', exports.MainController);


export default exports;
