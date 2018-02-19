goog.provide('app.backgroundlayer');

// webpack: import './backgroundlayer.css';
// webpack: import './common_dependencies.js';
goog.require('ngeo.source.AsitVD');
const EPSG21781 = goog.require('ngeo.proj.EPSG21781');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Image');
goog.require('ol.layer.Tile');
goog.require('ol.source.ImageWMS');
goog.require('ngeo.map.module');


/** @type {!angular.Module} **/
app.backgroundlayer.module = angular.module('app', [
  ngeo.map.module.name
]);


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
app.backgroundlayer.backgroundlayerComponent = {
  bindings: {
    'map': '=appBackgroundlayerMap'
  },
  template: require('./partials/backgroundlayer.html'),
  controller: 'AppBackgroundlayerController',
  controllerAs: 'ctrl'
};


app.backgroundlayer.module.component('appBackgroundlayer', app.backgroundlayer.backgroundlayerComponent);


/**
 * @constructor
 * @param {angular.$http} $http Angular http service.
 * @param {ngeo.map.BackgroundLayerMgr} ngeoBackgroundLayerMgr Background layer
 *     manager.
 * @export
 * @ngInject
 */
app.backgroundlayer.BackgroundlayerController = function($http, ngeoBackgroundLayerMgr) {

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
app.backgroundlayer.BackgroundlayerController.prototype.change = function() {
  const layerSpec = this.bgLayer;
  const layer = this.getLayer_(layerSpec['name']);
  this.backgroundLayerMgr_.set(this.map, layer);
};


/**
 * @param {string} layerName Layer name.
 * @return {ol.layer.Tile} The layer.
 * @private
 */
app.backgroundlayer.BackgroundlayerController.prototype.getLayer_ = function(layerName) {
  if (layerName === 'blank') {
    return new ol.layer.Tile();
  }

  const source = new ngeo.source.AsitVD({
    layer: layerName
  });
  return new ol.layer.Tile({source});
};


app.backgroundlayer.module.controller('AppBackgroundlayerController',
  app.backgroundlayer.BackgroundlayerController);


/**
 * @constructor
 * @param {angular.Scope} $scope Controller scope.
 * @ngInject
 */
app.backgroundlayer.MainController = function($scope) {

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new ol.Map({
    view: new ol.View({
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
  const overlay = new ol.layer.Image({
    source: new ol.source.ImageWMS({
      url: 'https://wms.geo.admin.ch',
      params: {'LAYERS': 'ch.swisstopo.dreiecksvermaschung'},
      serverType: 'mapserver'
    })
  });

  this.map.addLayer(overlay);

};


app.backgroundlayer.module.controller('MainController', app.backgroundlayer.MainController);
