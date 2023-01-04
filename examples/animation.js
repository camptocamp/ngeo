import './animation.css';
import angular from 'angular';
import olMap from 'ol/Map.js';

import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';
import ngeoMapModule from 'ngeo/map/module.js';

/** @type {!angular.IModule} */
const module = angular.module('app', ['gettext', ngeoMapModule.name]);

/**
 * App-specific component wrapping the ngeo map component. The component's
 * controller has a property "map" including a reference to the OpenLayers
 * map.
 *
 * @type {!angular.IComponentOptions}
 */
const mapComponent = {
  bindings: {
    'map': '=appMap',
    'class': '=appMapClass',
  },
  template: '<div ngeo-map="$ctrl.map"></div>',
};

module.component('appMap', mapComponent);

/**
 * The application's main controller.
 * @param {angular.ITimeoutService} $timeout Angular timeout service.
 *
 * @constructor
 * @ngInject
 * @private
 * @hidden
 */
function MainController($timeout) {
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
      center: [0, 0],
      zoom: 4,
    }),
  });

  /**
   * @type {boolean}
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
}

module.controller('MainController', MainController);

export default module;
