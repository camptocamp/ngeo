/**
 */

import './scaleselector.css';
import angular from 'angular';
import ngeoMiscFilters from 'ngeo/misc/filters.js';

import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';
import ngeoMapModule from 'ngeo/map/module.js';


/** @type {!angular.IModule} **/
exports.module = angular.module('app', [
  'gettext',
  ngeoMapModule.name,
  ngeoMiscFilters.name,
]);


/**
 * @constructor
 * @param {angular.IScope} $scope Controller scope.
 * @ngInject
 */
exports.MainController = function($scope) {

  /**
   * @type {import("ol/Map.js").default}
   * @export
   */
  this.map = new olMap({
    layers: [
      new olLayerTile({
        source: new olSourceOSM()
      })
    ],
    view: new olView({
      center: [-10635142.37, 4813698.29],
      zoom: 1,
      maxZoom: 4
    })
  });

  /**
   * The zoom level/scale map object for the ngeoScaleselector directive.
   * @type {!Array.<number>}
   * @const
   * @export
   */
  this.scales = [200000000, 100000000, 50000000, 25000000, 12000000];

  /**
   * Use the "dropup" variation of the Bootstrap dropdown.
   * @type {ScaleselectorOptions}
   * @export
   */
  this.options = {
    dropup: true
  };

};


exports.module.controller('MainController', exports.MainController);


export default exports;
