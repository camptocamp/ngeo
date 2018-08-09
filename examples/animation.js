/**
 * @module app.animation
 */
const exports = {};

import './animation.css';
import olMap from 'ol/Map.js';

import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';
import ngeoMapModule from 'ngeo/map/module.js';


/** @type {!angular.Module} */
exports.module = angular.module('app', [
  'gettext',
  ngeoMapModule.name
]);


/**
 * App-specific component wrapping the ngeo map component. The component's
 * controller has a property "map" including a reference to the OpenLayers
 * map.
 *
 * @type {!angular.Component}
 */
exports.mapComponent = {
  bindings: {
    'map': '=appMap',
    'class': '=appMapClass'
  },
  template: '<div ngeo-map="$ctrl.map"></div>'
};


exports.module.component('appMap', exports.mapComponent);


/**
 * The application's main controller.
 * @param {angular.$timeout} $timeout Angular timeout service.
 *
 * @constructor
 * @ngInject
 */
exports.MainController = function($timeout) {
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
   * @type {boolean}
   * @export
   */
  this.open = false;

  // We want the sidebar to be open at application launch so we set the `open`
  // property to true at startup.
  // But we need to do it asynchronously in order to have the `resizemap`
  // directive working. If we don't, the `ng-class` directive doesn't fire the
  // animation hooks.
  const self = this;
  $timeout(() => {
    self.open = true;
  }, 0);
};


exports.module.controller('MainController', exports.MainController);


export default exports;
