import angular from 'angular';
import appURL from './url.js';
import './mobilemeasure.css';
import gmfMapComponent from 'gmf/map/component.js';

import gmfPermalinkPermalink from 'gmf/permalink/Permalink.js';

import gmfMobileMeasureAreaComponent from 'gmf/mobile/measure/areaComponent.js';
import gmfMobileMeasureLengthComponent from 'gmf/mobile/measure/lengthComponent.js';
import gmfMobileMeasurePointComponent from 'gmf/mobile/measure/pointComponent.js';
import ngeoMiscBtnComponent from 'ngeo/misc/btnComponent.js';
import EPSG21781 from '@geoblocks/proj/src/EPSG_21781.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olControlScaleLine from 'ol/control/ScaleLine.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('gmfapp', [
  'gettext',
  gmfMapComponent.name,
  gmfPermalinkPermalink.name,
  gmfMobileMeasureAreaComponent.name,
  gmfMobileMeasureLengthComponent.name,
  gmfMobileMeasurePointComponent.name,
  ngeoMiscBtnComponent.name,
]);

module.value('gmfRasterUrl', appURL.RASTER);

module.constant('defaultTheme', 'Demo');
module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');

/**
 * @param {import("gmf/permalink/Permalink.js").PermalinkService} gmfPermalink The gmf permalink service.
 * @constructor
 * @ngInject
 */
function MainController(gmfPermalink) {
  const center = gmfPermalink.getMapCenter() || [537635, 152640];
  const zoom = gmfPermalink.getMapZoom() || 3;

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
      center: center,
      zoom: zoom,
    }),
  });

  this.map.addControl(new olControlScaleLine());

  /**
   * @type {boolean}
   */
  this.measureAreaActive = false;

  /**
   * @type {boolean}
   */
  this.measureLengthActive = false;

  /**
   * @type {Array<import('gmf/mobile/measure/pointComponent.js').LayerConfig>}
   */
  this.measurePointLayersConfig = [
    {name: 'aster', unit: 'm', decimals: 2},
    {name: 'srtm', unit: 'm'},
  ];

  /**
   * @type {boolean}
   */
  this.measurePointActive = false;
}

module.controller('MainController', MainController);

export default module;
