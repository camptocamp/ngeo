/**
 * @module app.routing
 */
const exports = {};

/**
 * This example shows the ngeo routing directive.
 */

import ngeoMapModule from 'ngeo/map/module.js';
import ngeoRoutingModule from 'ngeo/routing/module.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';

/** @type {!angular.Module} **/
exports.module = angular.module('app', [
  'gettext',
  ngeoMapModule.name,
  ngeoRoutingModule.name
]);


/**
 * The application's main directive.
 * @constructor
 * @ngInject
 */
exports.MainController = function() {

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
      center: [931010.1535989442, 5961705.842297254],
      zoom: 9
    })
  });

  /**
   * @type {boolean}
   * @export
   */
  this.routingfeatureActive = true;
};

exports.module.controller('MainController', exports.MainController);


export default exports;
