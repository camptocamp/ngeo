/**
 * @module gmfapp.lidarprofile
 */
const exports = {};

import './lidarprofile.css';
import gmfMapComponent from 'gmf/map/component.js';
import gmfLidarprofileModule from 'gmf/lidarprofile/module.js';
import EPSG2056 from 'ngeo/proj/EPSG2056.js';
import ngeoMapModule from 'ngeo/map/module.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';


/** @type {!angular.Module} **/
exports.module = angular.module('gmfapp', [
  'gettext',
  gmfMapComponent.name,
  gmfLidarprofileModule.name,
  ngeoMapModule.name, // for ngeo.map.FeatureOverlay, perhaps remove me
]);


exports.module.value('pytreeLidarprofileJsonUrl', 'https://sitn.ne.ch/pytree/pytree_dev/');


/**
 * @param {angular.Scope} $scope Angular scope.
 * @constructor
 * @ngInject
 */
exports.MainController = function($scope) {
  /**
   * @type {ol.geom.LineString}
   * @export
   */
  this.profileLine = null;

  /**
   * @type {boolean}
   * @export
   */
  this.panelActivated = false;

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
      projection: EPSG2056,
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [2551894, 1202362],
      zoom: 3
    })
  });
};


exports.module.controller('MainController', exports.MainController);


export default exports;
