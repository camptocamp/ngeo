import './mouseposition.css';
import angular from 'angular';
import gmfMapModule from 'gmf/map/module.js';

import EPSG2056 from '@geoblocks/proj/src/EPSG_2056.js';
import EPSG21781 from '@geoblocks/proj/src/EPSG_21781.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('gmfapp', ['gettext', gmfMapModule.name]);

module.constant('defaultTheme', 'Demo');
module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');

/**
 * @constructor
 * @ngInject
 */
function MainController() {
  const epsg2056template = 'Coordinates (m)&#58; {x}, {y}';

  /**
   * @type {Array<import('gmf/map/mousepositionComponent.js').MousePositionProjection>}
   */
  this.projections = [
    {
      code: EPSG2056,
      label: 'CH1903+ / LV95',
      filter: `ngeoNumberCoordinates:0:${epsg2056template}`,
    },
    {
      code: EPSG21781,
      label: 'CH1903 / LV03',
      filter: 'ngeoNumberCoordinates:2:[{x} E; {y} N]',
    },
    {
      code: 'EPSG:4326',
      label: 'WGS84',
      filter: 'ngeoDMSCoordinates:2',
    },
  ];

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
      center: [828042, 5933739],
      zoom: 8,
    }),
  });
}

module.controller('MainController', MainController);

export default module;
