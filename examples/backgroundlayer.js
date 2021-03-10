// The MIT License (MIT)
//
// Copyright (c) 2015-2021 Camptocamp SA
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

import './backgroundlayer.css';
import angular from 'angular';
import ngeoSourceAsitVD from 'ngeo/source/AsitVD.js';
import {MAPSERVER_PROXY} from './url.js';

import EPSG2056 from '@geoblocks/proj/EPSG_2056.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerImage from 'ol/layer/Image.js';
import olLayerTile from 'ol/layer/Tile.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import olSourceImageWMS from 'ol/source/ImageWMS.js';
import ngeoMapModule from 'ngeo/map/module.js';

/** @type {angular.IModule} **/
const myModule = angular.module('app', ['gettext', ngeoMapModule.name]);

myModule.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('partials/backgroundlayer', require('./partials/backgroundlayer.html'));
  }
);

/**
 * The application-specific background layer component.
 *
 * The component is based on Angular's select, ngOptions, ngModel, and
 * ngChange components. ngChange is used to avoid adding a watcher on
 * the ngModel expression.
 *
 * Note: we don't need two-way binding for ngModel here, but using ::
 * for the ngModel expression doesn't actually make a difference. This
 * is because ngModel doesn't actually watch the ngModel expression.
 *
 * @type {angular.IComponentOptions}
 */
const backgroundlayerComponent = {
  bindings: {
    'map': '=appBackgroundlayerMap',
  },
  templateUrl: 'partials/backgroundlayer',
  controller: 'AppBackgroundlayerController',
};

myModule.component('appBackgroundlayer', backgroundlayerComponent);

/**
 * @class
 * @param {angular.IHttpService} $http Angular http service.
 * @param {import("ngeo/map/BackgroundLayerMgr.js").MapBackgroundLayerManager} ngeoBackgroundLayerMgr
 *    Background layer manager.
 * @ngInject
 */
function BackgroundlayerController($http, ngeoBackgroundLayerMgr) {
  /**
   * @type {?import("ol/Map.js").default}
   */
  this.map = null;

  /**
   * @type {import('gmf/themes.js').GmfLayer[]|undefined}
   */
  this.bgLayers = undefined;

  /**
   * @type {import('gmf/themes.js').GmfLayer}
   */
  this.bgLayer = null;

  $http.get('data/backgroundlayers.json').then((resp) => {
    this.bgLayers = resp.data;
    if (!this.bgLayers) {
      throw new Error('Missing bgLayers');
    }
    // Use the first layer by default
    this.bgLayer = this.bgLayers[0];
  });

  /**
   * @type {import("ngeo/map/BackgroundLayerMgr.js").MapBackgroundLayerManager}
   */
  this.backgroundLayerMgr_ = ngeoBackgroundLayerMgr;
}

/**
 * Function called when the user selects a new background layer through
 * the select element. The ngChange directive used in the partial calls
 * it.
 */
BackgroundlayerController.prototype.change = function () {
  if (!this.map) {
    throw new Error('Missing map');
  }
  const layerSpec = this.bgLayer;
  const layer = this.getLayer_(layerSpec.name);
  this.backgroundLayerMgr_.set(this.map, layer);
};

/**
 * @param {string} layerName Layer name.
 * @return {import("ol/layer/Layer.js").default<*>} The layer.
 */
BackgroundlayerController.prototype.getLayer_ = function (layerName) {
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
   * @type {import("ol/Map.js").default}
   */
  this.map = new olMap({
    view: new olView({
      projection: EPSG2056,
      resolutions: [1000, 500, 200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [2535000, 1160000],
      zoom: 3,
    }),
  });

  const source = new olSourceImageWMS({
    url: MAPSERVER_PROXY,
    params: {'LAYERS': 'default'},
    serverType: 'mapserver',
  });
  /**
   * An overlay layer.
   * @type {import("ol/layer/Image.js").default}
   */
  const overlay = new olLayerImage({
    source,
  });

  this.map.addLayer(overlay);
}

myModule.controller('MainController', MainController);
myModule.constant('ngeoTilesPreloadingLimit', 0);

export default myModule;
