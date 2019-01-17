/**
 */
const exports = {};

import './asitvd.css';
import angular from 'angular';
import ngeoSourceAsitVD from 'ngeo/source/AsitVD.js';
import EPSG21781 from '@geoblocks/proj/src/EPSG_21781.js';

import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import ngeoMapModule from 'ngeo/map/module.js';


/** @type {!angular.IModule} */
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
        source: new ngeoSourceAsitVD({
          layer: 'asitvd.fond_couleur'
        })
      })
    ],
    view: new olView({
      projection: EPSG21781,
      resolutions: [250, 100, 50, 20, 10, 5, 2.5, 2, 1.5, 1, 0.5],
      center: [535000, 154000],
      zoom: 0
    })
  });
};

exports.module.controller('MainController', exports.MainController);


export default exports;
