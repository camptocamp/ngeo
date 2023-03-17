import './backgroundlayerdropdown.css';
import angular from 'angular';
import ngeoSourceAsitVD from 'ngeo/source/AsitVD.js';

import EPSG21781 from '@geoblocks/proj/src/EPSG_21781.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerImage from 'ol/layer/Image.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceImageWMS from 'ol/source/ImageWMS.js';
import ngeoMapModule from 'ngeo/map/module.js';

/** @type {!angular.IModule} **/
const module = angular.module('app', ['gettext', ngeoMapModule.name]);

module.run(
  /* @ngInject */ ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put(
      'partials/backgroundlayerdropdown',
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
 * @type {!angular.IComponentOptions}
 */
const backgroundlayerComponent = {
  bindings: {
    'map': '=appBackgroundlayerMap',
  },
  templateUrl: 'partials/backgroundlayerdropdown',
  controller: 'AppBackgroundlayerController',
};

module.component('appBackgroundlayer', backgroundlayerComponent);

/**
 * @constructor
 * @param {angular.IHttpService} $http Angular http service.
 * @param {import("ngeo/map/BackgroundLayerMgr.js").MapBackgroundLayerManager} ngeoBackgroundLayerMgr
 *    Background layer manager.
 * @ngInject
 */
function BackgroundlayerController($http, ngeoBackgroundLayerMgr) {
  $http.get('data/backgroundlayers.json').then((resp) => {
    const bgLayers = resp.data;
    this['bgLayers'] = bgLayers;
    this.setLayer(bgLayers[0]);
  });

  /**
   * @type {import("ngeo/map/BackgroundLayerMgr.js").MapBackgroundLayerManager}
   * @private
   */
  this.backgroundLayerMgr_ = ngeoBackgroundLayerMgr;
}

/**
 * Function called when the user selects a new background layer in the
 * dropdown. Called by the ng-click directive used in the partial.
 * @param {Object} layerSpec Layer specification object.
 */
BackgroundlayerController.prototype.setLayer = function (layerSpec) {
  this['currentBgLayer'] = layerSpec;
  const layer = this.createLayer_(layerSpec['name']);
  this.backgroundLayerMgr_.set(this['map'], layer);
};

/**
 * @param {string} layerName Layer name.
 * @return {import("ol/layer/Tile.js").default} The layer.
 * @private
 */
BackgroundlayerController.prototype.createLayer_ = function (layerName) {
  if (layerName === 'blank') {
    return new olLayerTile();
  }

  const source = new ngeoSourceAsitVD({
    layer: layerName,
  });
  return new olLayerTile({source});
};

module.controller('AppBackgroundlayerController', BackgroundlayerController);

/**
 * @constructor
 * @param {angular.IScope} $scope Controller scope.
 * @ngInject
 */
function MainController($scope) {
  /**
   * @type {import("ol/Map.js").default}
   */
  const map = new olMap({
    view: new olView({
      projection: EPSG21781,
      resolutions: [1000, 500, 200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [600000, 200000],
      zoom: 1,
    }),
  });
  this['map'] = map;

  /**
   * An overlay layer.
   * @type {import("ol/layer/Image.js").default}
   */
  const overlay = new olLayerImage({
    source: new olSourceImageWMS({
      projection: undefined, // should be removed in next OL version
      url: 'https://wms.geo.admin.ch',
      params: {'LAYERS': 'ch.swisstopo.dreiecksvermaschung'},
      serverType: 'mapserver',
    }),
  });

  map.addLayer(overlay);
}

module.controller('MainController', MainController);

export default module;
