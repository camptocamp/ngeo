/**
 * @module gmfapp.simple
 */
const exports = {};

import './simple.css';
/** @suppress {extraRequire} */
import gmfMapComponent from 'gmf/map/component.js';

import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';


/** @type {!angular.Module} **/
exports.module = angular.module('gmfapp', [
  'gettext',
  gmfMapComponent.name,
]);

exports.module.constant('defaultTheme', 'Demo');
exports.module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');


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
};


exports.module.controller('MainController', exports.MainController);


export default exports;
