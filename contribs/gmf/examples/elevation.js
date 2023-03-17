import angular from 'angular';
import appURL from './url.js';
import './elevation.css';
import gmfMapComponent from 'gmf/map/component.js';

import gmfRasterModule from 'gmf/raster/module.js';
import EPSG21781 from '@geoblocks/proj/src/EPSG_21781.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('gmfapp', ['gettext', gmfMapComponent.name, gmfRasterModule.name]);

module.value('gmfRasterUrl', appURL.RASTER);

module.constant('defaultTheme', 'Demo');
module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');

/**
 * @constructor
 * @ngInject
 */
function MainController() {
  /**
   * @type {Array.<string>}
   */
  this.elevationLayers = ['aster', 'srtm'];

  /**
   * @type {string}
   */
  this.selectedElevationLayer = this.elevationLayers[0];

  /**
   * @type {import("ol/Map.js").default}
   */
  this.map = new olMap({
    layers: [
      new olLayerTile({
        source: new olSourceOSM(),
      }),
    ],
    view: new olView({
      projection: EPSG21781,
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [600000, 200000],
      zoom: 3,
    }),
  });
}

module.controller('MainController', MainController);

export default module;
