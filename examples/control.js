/**
 * @module app.control
 */
const exports = {};

import './control.css';
import ngeoMapModule from 'ngeo/map/module.js';

/** @suppress {extraRequire} */
import ngeoMiscControlComponent from 'ngeo/misc/controlComponent.js';

import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olControlMousePosition from 'ol/control/MousePosition.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';


/** @type {!angular.Module} **/
exports.module = angular.module('app', [
  'gettext',
  ngeoMapModule.name,
  ngeoMiscControlComponent.name,
]);


/**
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
      center: [0, 0],
      zoom: 4
    })
  });

  /**
   * @type {ol.control.Control}
   * @export
   */
  this.control = new olControlMousePosition({
    className: 'mouse-position'
  });
};


exports.module.controller('MainController', exports.MainController);


export default exports;
