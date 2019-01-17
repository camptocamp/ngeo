/**
 * @module app.simple3d
 */
const exports = {};

import './simple3d.css';
import angular from 'angular';
import olMap from 'ol/Map.js';

import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';
import ngeoOlcsOlcsModule from 'ngeo/olcs/olcsModule.js';
import ngeoMapModule from 'ngeo/map/module.js';
import ngeoOlcsManager from 'ngeo/olcs/Manager.js';


/** @type {!angular.IModule} **/
exports.module = angular.module('app', [
  'gettext',
  ngeoMapModule.name,
  ngeoOlcsOlcsModule.name
]);


/**
 * @constructor
 * @ngInject
 * @param {angular.IScope} $rootScope Root scope.
 * @param {ngeo.olcs.Service} ngeoOlcsService The service.
 */
exports.MainController = function($rootScope, ngeoOlcsService) {

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
      center: [0, 0],
      zoom: 4
    })
  });

  // TODO: detect and use different URL for DEBUG MODE
  const cesiumUrl = '../node_modules/@camptocamp/cesium/Build/Cesium/Cesium.js';

  /**
   * @export
   * @type {olcs.contrib.Manager}
   */
  this.ol3dm = new ngeoOlcsManager(cesiumUrl, $rootScope, {
    map: this.map
  });

  // Optionally, the manager can be registered into the olcs service
  ngeoOlcsService.initialize(this.ol3dm);
};

exports.module.controller('MainController', exports.MainController);


export default exports;
