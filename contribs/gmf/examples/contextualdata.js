import angular from 'angular';
import appURL from './url.js';
import './contextualdata.css';
import gmfContextualdataModule from 'gmf/contextualdata/module.js';

import gmfMapComponent from 'gmf/map/component.js';
import ngeoMiscFilters from 'ngeo/misc/filters.js';
import EPSG21781 from '@geoblocks/proj/src/EPSG_21781.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('gmfapp', [
  'gettext',
  gmfContextualdataModule.name,
  gmfMapComponent.name,
  ngeoMiscFilters.name,
]);

module.value('gmfRasterUrl', appURL.RASTER);

module.value('gmfContextualdatacontentTemplateUrl', 'partials/contextualdata.html');

module.constant('defaultTheme', 'Demo');
module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');

/**
 * @constructor
 * @ngInject
 */
function MainController() {
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

/**
 * @param {import("ol/coordinate.js").Coordinate} coordinate The coordinate for the right-clicked
 *     point.
 * @param {Object} data The data received from the raster service.
 * @return {Object} The additional data to add to the scope for the
 *     contextualdata popover.
 */
MainController.prototype.onRasterData = function (coordinate, data) {
  return {
    'elelvation_diff': data['srtm'] - data['aster'],
  };
};

module.controller('MainController', MainController);

export default MainController;
