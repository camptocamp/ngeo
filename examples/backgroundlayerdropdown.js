// The MIT License (MIT)
//
// Copyright (c) 2015-2022 Camptocamp SA
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

import './backgroundlayerdropdown.css';
import angular from 'angular';
import ngeoSourceAsitVD from 'ngeo/source/AsitVD';
import {MAPSERVER_PROXY} from './url';

import EPSG2056 from 'ngeo/proj/EPSG_2056';
import olMap from 'ol/Map';
import olView from 'ol/View';
import olLayerImage from 'ol/layer/Image';
import olLayerTile from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import olSourceImageWMS from 'ol/source/ImageWMS';
import gmfMapComponent from 'gmf/map/component';
import options from './options';

/** @type {angular.IModule} **/
const myModule = angular.module('app', ['gettext', gmfMapComponent.name]);

myModule.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    $templateCache.put(
      'partials/backgroundlayerdropdown',
      // @ts-ignore: webpack
      require('./partials/backgroundlayerdropdown.html')
    );
  }
);

/**
 * The application-specific background layer component.
 *
 * The component is based on Bootstrap's dropdown jQuery plugin and on
 * the ngeoBackgroundLayerMgr service.
 *
 * @type {angular.IComponentOptions}
 */
const backgroundlayerComponent = {
  bindings: {
    'map': '=appBackgroundlayerMap',
  },
  templateUrl: 'partials/backgroundlayerdropdown',
  controller: 'AppBackgroundlayerController',
};

myModule.component('appBackgroundlayer', backgroundlayerComponent);

/**
 * @class
 * @param {angular.IHttpService} $http Angular http service.
 * @param {import('ngeo/map/BackgroundLayerMgr').MapBackgroundLayerManager} ngeoBackgroundLayerMgr
 *    Background layer manager.
 * @ngInject
 */
function BackgroundlayerController($http, ngeoBackgroundLayerMgr) {
  $http.get('data/backgroundlayers.json').then((resp) => {
    const bgLayers = resp.data;
    this.bgLayers = bgLayers;
    this.setLayer(bgLayers[0]);
  });

  /**
   * @type {?import('ol/Map').default}
   */
  this.map = null;

  /**
   * @type {import('ngeo/map/BackgroundLayerMgr').MapBackgroundLayerManager}
   */
  this.backgroundLayerMgr_ = ngeoBackgroundLayerMgr;
}

/**
 * Function called when the user selects a new background layer in the
 * dropdown. Called by the ng-click directive used in the partial.
 *
 * @param {Object<string, *>} layerSpec Layer specification object.
 */
BackgroundlayerController.prototype.setLayer = function (layerSpec) {
  if (!this.map) {
    throw new Error('Missing map');
  }
  this.currentBgLayer = layerSpec;
  const layer = this.createLayer_(layerSpec.name);
  this.backgroundLayerMgr_.set(this.map, layer);
};

/**
 * @param {string} layerName Layer name.
 * @returns {import('ol/layer/Layer').default<*>} The layer.
 */
BackgroundlayerController.prototype.createLayer_ = function (layerName) {
  if (layerName === 'blank') {
    const layer = new VectorLayer({
      source: new VectorSource(),
    });
    layer.set('label', 'blank');
    return layer;
  }

  const source = new ngeoSourceAsitVD({
    layer: layerName,
  });
  return new olLayerTile({source});
};

myModule.controller('AppBackgroundlayerController', BackgroundlayerController);

/**
 * @class
 * @param {angular.IScope} $scope Controller scope.
 * @ngInject
 */
function MainController($scope) {
  /**
   * @type {import('ol/Map').default}
   */
  const map = new olMap({
    view: new olView({
      projection: EPSG2056,
      resolutions: [1000, 500, 200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [2535000, 1160000],
      zoom: 3,
    }),
  });
  this.map = map;

  const source = new olSourceImageWMS({
    url: MAPSERVER_PROXY,
    params: {'LAYERS': 'default'},
    serverType: 'mapserver',
  });
  /**
   * An overlay layer.
   *
   * @type {import('ol/layer/Image').default<import('ol/source/Image').default>}
   */
  const overlay = new olLayerImage({
    source,
  });

  map.addLayer(overlay);
}

myModule.controller('MainController', MainController);

myModule.constant('ngeoTilesPreloadingLimit', 0);

options(myModule);

export default myModule;
