import './lidarprofile.css';
import angular from 'angular';
import gmfMapComponent from 'gmf/map/component.js';
import gmfLidarprofileModule from 'gmf/lidarprofile/module.js';
import EPSG2056 from '@geoblocks/proj/src/EPSG_2056.js';
import ngeoMapModule from 'ngeo/map/module.js';
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
  gmfMapComponent.name,
  gmfLidarprofileModule.name,
  ngeoMapModule.name, // for ngeo.map.FeatureOverlay, perhaps remove me
]);

module.value('pytreeLidarprofileJsonUrl', 'https://sitn.ne.ch/pytree');

/**
 * @param {angular.IScope} $scope Angular scope.
 * @constructor
 * @ngInject
 */
function MainController($scope) {
  /**
   * @type {import("ol/geom/LineString.js").default}
   */
  this.profileLine = null;

  /**
   * @type {boolean}
   */
  this.panelActivated = false;

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
      projection: EPSG2056,
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [2551894, 1202362],
      zoom: 3,
    }),
  });
}

module.controller('MainController', MainController);

export default module;
