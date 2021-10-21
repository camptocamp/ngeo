// The MIT License (MIT)
//
// Copyright (c) 2017-2021 Camptocamp SA
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

import './simple3d.css';
import angular from 'angular';
import olMap from 'ol/Map';

import olView from 'ol/View';
import olLayerTile from 'ol/layer/Tile';
import olSourceOSM from 'ol/source/OSM';
import ngeoOlcsOlcsModule from 'ngeo/olcs/olcsModule';
import ngeoMapModule from 'ngeo/map/module';
import ngeoOlcsManager from 'ngeo/olcs/Manager';

/** @type {angular.IModule} **/
const myModule = angular.module('app', ['gettext', ngeoMapModule.name, ngeoOlcsOlcsModule.name]);

/**
 * @class
 * @ngInject
 * @param {angular.IScope} $rootScope Root scope.
 * @param {import('ngeo/olcs/Service').OlcsService} ngeoOlcsService The service.
 */
function MainController($rootScope, ngeoOlcsService) {
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

  const cesiumUrl = document.location.search.includes('mode=dev')
    ? 'https://cesium.com/downloads/cesiumjs/releases/1.62/Build/CesiumUnminified/Cesium.js'
    : 'https://cesium.com/downloads/cesiumjs/releases/1.62/Build/Cesium/Cesium.js';

  this.ol3dm = new ngeoOlcsManager(cesiumUrl, $rootScope, {
    map: this.map,
  });

  // Optionally, the manager can be registered into the olcs service
  ngeoOlcsService.initialize(this.ol3dm);
}

myModule.controller('MainController', MainController);
myModule.constant('ngeoUsedKeyRegexp', []);

export default myModule;
