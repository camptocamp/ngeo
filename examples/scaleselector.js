import './scaleselector.css';
import angular from 'angular';
import ngeoMiscFilters from 'ngeo/misc/filters.js';

import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';
import ngeoMapModule from 'ngeo/map/module.js';

/** @type {!angular.IModule} **/
const module = angular.module('app', ['gettext', ngeoMapModule.name, ngeoMiscFilters.name]);

/**
 * @constructor
 * @param {angular.IScope} $scope Controller scope.
 * @ngInject
 */
function MainController($scope) {
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
      center: [-10635142.37, 4813698.29],
      zoom: 1,
      maxZoom: 4,
    }),
  });

  /**
   * The zoom level/scale map object for the ngeoScaleselector directive.
   * @type {!Array.<number>}
   * @const
   */
  this.scales = [200000000, 100000000, 50000000, 25000000, 12000000];

  /**
   * Use the "dropup" variation of the Bootstrap dropdown.
   * @type {import('ngeo/map/scaleselector.js').ScaleselectorOptions}
   */
  this.options = {
    dropup: true,
  };
}

module.controller('MainController', MainController);

export default module;
