/**
 * @module app.simple
 */
const exports = {};

import './simple.css';
import angular from 'angular';
import olMap from 'ol/Map.js';

import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';
import ngeoMapModule from 'ngeo/map/module.js';


/** @type {!angular.IModule} **/
exports.module = angular.module('app', [
  'gettext',
  ngeoMapModule.name
]);


/**
 * @constructor
 * @ngInject
 */
exports.MainController = function() {

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
};


exports.module.controller('MainController', exports.MainController);


export default exports;
