goog.provide('app.backgroundlayerdropdown');

goog.require('ngeo.BackgroundLayerMgr');
/** @suppress {extraRequire} */
goog.require('ngeo.mapDirective');
goog.require('ngeo.source.AsitVD');
/** @suppress {extraRequire} */
goog.require('ngeo.proj.EPSG21781');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Image');
goog.require('ol.layer.Tile');
goog.require('ol.source.ImageWMS');


/** @type {!angular.Module} **/
app.module = angular.module('app', ['ngeo']);


/**
 * The application-specific background layer component.
 *
 * The component is based on Bootstrap's dropdown jQuery plugin and on
 * the ngeoBackgroundLayerMgr service.
 *
 * @type {!angular.Component}
 */
app.backgroundlayerComponent = {
  bindings: {
    'map': '=appBackgroundlayerMap'
  },
  templateUrl: 'partials/backgroundlayerdropdown.html',
  controller: 'AppBackgroundlayerController',
  controllerAs: 'ctrl'
};


app.module.component('appBackgroundlayer', app.backgroundlayerComponent);


/**
 * @constructor
 * @param {angular.$http} $http Angular http service.
 * @param {ngeo.BackgroundLayerMgr} ngeoBackgroundLayerMgr Background layer
 *     manager.
 * @export
 * @ngInject
 */
app.BackgroundlayerController = function($http, ngeoBackgroundLayerMgr) {
  $http.get('data/backgroundlayers.json').then(
    (resp) => {
      const bgLayers = resp.data;
      this['bgLayers'] = bgLayers;
      this.setLayer(bgLayers[0]);
    });

  /**
   * @type {ngeo.BackgroundLayerMgr}
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
app.BackgroundlayerController.prototype.setLayer = function(layerSpec) {
  this['currentBgLayer'] = layerSpec;
  const layer = this.createLayer_(layerSpec['name']);
  this.backgroundLayerMgr_.set(this['map'], layer);
};


/**
 * @param {string} layerName Layer name.
 * @return {ol.layer.Tile} The layer.
 * @private
 */
app.BackgroundlayerController.prototype.createLayer_ = function(layerName) {
  if (layerName === 'blank') {
    return new ol.layer.Tile();
  }

  const source = new ngeo.source.AsitVD({
    layer: layerName
  });
  return new ol.layer.Tile({source});
};


app.module.controller('AppBackgroundlayerController',
  app.BackgroundlayerController);


/**
 * @constructor
 * @param {angular.Scope} $scope Controller scope.
 * @ngInject
 */
app.MainController = function($scope) {

  /**
   * @type {ol.Map}
   */
  const map = new ol.Map({
    view: new ol.View({
      projection: 'EPSG:21781',
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
  const overlay = new ol.layer.Image({
    source: new ol.source.ImageWMS({
      url: 'https://wms.geo.admin.ch',
      params: {'LAYERS': 'ch.swisstopo.dreiecksvermaschung'},
      serverType: 'mapserver'
    })
  });

  map.addLayer(overlay);

};


app.module.controller('MainController', app.MainController);
