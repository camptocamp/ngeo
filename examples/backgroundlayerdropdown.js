/**
 * @module app.backgroundlayerdropdown
 */
const exports = {};

import './backgroundlayerdropdown.css';
import ngeoSourceAsitVD from 'ngeo/source/AsitVD.js';

import EPSG21781 from 'ngeo/proj/EPSG21781.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerImage from 'ol/layer/Image.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceImageWMS from 'ol/source/ImageWMS.js';
import ngeoMapModule from 'ngeo/map/module.js';


/** @type {!angular.Module} **/
exports.module = angular.module('app', [
  'gettext',
  ngeoMapModule.name
]);


/**
 * The application-specific background layer component.
 *
 * The component is based on Bootstrap's dropdown jQuery plugin and on
 * the ngeoBackgroundLayerMgr service.
 *
 * @type {!angular.Component}
 */
exports.backgroundlayerComponent = {
  bindings: {
    'map': '=appBackgroundlayerMap'
  },
  template: require('./partials/backgroundlayerdropdown.html'),
  controller: 'AppBackgroundlayerController'
};


exports.module.component('appBackgroundlayer', exports.backgroundlayerComponent);


/**
 * @constructor
 * @param {angular.$http} $http Angular http service.
 * @param {ngeo.map.BackgroundLayerMgr} ngeoBackgroundLayerMgr Background layer
 *     manager.
 * @export
 * @ngInject
 */
exports.BackgroundlayerController = function($http, ngeoBackgroundLayerMgr) {
  $http.get('data/backgroundlayers.json').then(
    (resp) => {
      const bgLayers = resp.data;
      this['bgLayers'] = bgLayers;
      this.setLayer(bgLayers[0]);
    });

  /**
   * @type {ngeo.map.BackgroundLayerMgr}
   * @private
   */
  this.backgroundLayerMgr_ = ngeoBackgroundLayerMgr;
};


/**
 * Function called when the user selects a new background layer in the
 * dropdown. Called by the ng-click directive used in the partial.
 * @param {Object} layerSpec Layer specification object.
 * @export
 */
exports.BackgroundlayerController.prototype.setLayer = function(layerSpec) {
  this['currentBgLayer'] = layerSpec;
  const layer = this.createLayer_(layerSpec['name']);
  this.backgroundLayerMgr_.set(this['map'], layer);
};


/**
 * @param {string} layerName Layer name.
 * @return {ol.layer.Tile} The layer.
 * @private
 */
exports.BackgroundlayerController.prototype.createLayer_ = function(layerName) {
  if (layerName === 'blank') {
    return new olLayerTile();
  }

  const source = new ngeoSourceAsitVD({
    layer: layerName
  });
  return new olLayerTile({source});
};


exports.module.controller('AppBackgroundlayerController',
  exports.BackgroundlayerController);


/**
 * @constructor
 * @param {angular.Scope} $scope Controller scope.
 * @ngInject
 */
exports.MainController = function($scope) {

  /**
   * @type {ol.Map}
   */
  const map = new olMap({
    view: new olView({
      projection: EPSG21781,
      resolutions: [1000, 500, 200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [600000, 200000],
      zoom: 1
    })
  });
  this['map'] = map;

  /**
   * An overlay layer.
   * @type {ol.layer.Image}
   */
  const overlay = new olLayerImage({
    source: new olSourceImageWMS({
      url: 'https://wms.geo.admin.ch',
      params: {'LAYERS': 'ch.swisstopo.dreiecksvermaschung'},
      serverType: 'mapserver'
    })
  });

  map.addLayer(overlay);

};


exports.module.controller('MainController', exports.MainController);


export default exports;
