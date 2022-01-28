// The MIT License (MIT)
//
// Copyright (c) 2014-2022 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import './animation.css';
import angular from 'angular';
import olMap from 'ol/Map';
import olView from 'ol/View';
import olLayerTile from 'ol/layer/Tile';
import olSourceOSM from 'ol/source/OSM';
import gmfMapComponent from 'gmf/map/component';
import options from './options';

/** @type {angular.IModule} */
const myModule = angular.module('app', ['gettext', gmfMapComponent.name]);

/**
 * App-specific component wrapping the ngeo map component. The component's
 * controller has a property "map" including a reference to the OpenLayers
 * map.
 *
 * @type {angular.IComponentOptions}
 */
const mapComponent = {
  bindings: {
    'map': '=appMap',
    'class': '=appMapClass',
  },
  template: '<gmf-map gmf-map-map="$ctrl.map"></gmf-map>',
};

myModule.component('appMap', mapComponent);

/**
 * The application's main controller.
 *
 * @param {angular.ITimeoutService} $timeout Angular timeout service.
 * @class
 * @ngInject
 * @private
 * @hidden
 */
function MainController($timeout) {
  /**
   * @type {import('ol/Map').default}
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
  $timeout(() => {
    this.open = true;
  }, 0);
}

myModule.controller('MainController', MainController);
options(myModule);

export default myModule;
