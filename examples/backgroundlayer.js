/**
 * @module app.backgroundlayer
 */
const exports = {};

import './backgroundlayer.css';
import ngeoSourceAsitVD from 'ngeo/source/AsitVD.js';

import EPSG21781 from '@geoblocks/proj/src/EPSG_21781.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerImage from 'ol/layer/Image.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceImageWMS from 'ol/source/ImageWMS.js';
import ngeoMapModule from 'ngeo/map/module.js';


/** @type {!angular.IModule} **/
exports.module = angular.module('app', [
  'gettext',
  ngeoMapModule.name
]);


exports.module.run(/* @ngInject */ ($templateCache) => {
  $templateCache.put('partials/backgroundlayer', require('./partials/backgroundlayer.html'));
});


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
 * @type {!angular.Component}
 */
exports.backgroundlayerComponent = {
  bindings: {
    'map': '=appBackgroundlayerMap'
  },
  templateUrl: 'partials/backgroundlayer',
  controller: 'AppBackgroundlayerController'
};


exports.module.component('appBackgroundlayer', exports.backgroundlayerComponent);


/**
 * @constructor
 * @param {angular.IHttpService} $http Angular http service.
 * @param {ngeo.map.BackgroundLayerMgr} ngeoBackgroundLayerMgr Background layer
 *     manager.
 * @export
 * @ngInject
 */
exports.BackgroundlayerController = function($http, ngeoBackgroundLayerMgr) {

  /**
   * @type {ol.Map}
   * @export
   */
  this.map;

  /**
   * @type {Array.<Object>|undefined}
   * @export
   */
  this.bgLayers = undefined;

  /**
   * @type {Object}
   * @export
   */
  this.bgLayer = null;

  $http.get('data/backgroundlayers.json').then(
    (resp) => {
      this.bgLayers = resp.data;
      // use the first layer by default
      this.bgLayer = this.bgLayers[0];
    });

  /**
   * @type {ngeo.map.BackgroundLayerMgr}
   * @private
   */
  this.backgroundLayerMgr_ = ngeoBackgroundLayerMgr;
};


/**
 * Function called when the user selects a new background layer through
 * the select element. The ngChange directive used in the partial calls
 * it.
 * @export
 */
exports.BackgroundlayerController.prototype.change = function() {
  const layerSpec = this.bgLayer;
  const layer = this.getLayer_(layerSpec['name']);
  this.backgroundLayerMgr_.set(this.map, layer);
};


/**
 * @param {string} layerName Layer name.
 * @return {ol.layer.Tile} The layer.
 * @private
 */
exports.BackgroundlayerController.prototype.getLayer_ = function(layerName) {
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
   * @export
   */
  this.map = new olMap({
    view: new olView({
      projection: EPSG21781,
      resolutions: [1000, 500, 200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [600000, 200000],
      zoom: 1
    })
  });

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

  this.map.addLayer(overlay);

};


exports.module.controller('MainController', exports.MainController);


export default exports;
