goog.provide('app.layerloading');

goog.require('ngeo.source.AsitVD');
/** @suppress {extraRequire} */
goog.require('ngeo.proj.EPSG21781');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Image');
goog.require('ol.layer.Tile');
goog.require('ol.source.ImageWMS');

goog.require('ngeo.layertree.DecorateLayerLoading');
goog.require('ngeo.map.module');


/** @type {!angular.Module} **/
app.module = angular.module('app', [
  ngeo.module.name,
  ngeo.layertree.DecorateLayerLoading.module.name,
  ngeo.map.module.name
]);


/**
 * @param {angular.Scope} $scope Scope.
 * @param {ngeo.layertree.DecorateLayer} ngeoDecorateLayerLoading Decorate layer service.
 * @constructor
 * @ngInject
 */
app.MainController = function($scope, ngeoDecorateLayerLoading) {

  const source = new ngeo.source.AsitVD({
    layer: 'asitvd.fond_couleur'
  });
  /**
   * @type {ol.layer.Tile}
   * @export
   */
  this.asitvd = new ol.layer.Tile({source});

  ngeoDecorateLayerLoading(this.asitvd, $scope);

  /**
   * @type {ol.layer.Image}
   * @export
   */
  this.wms = new ol.layer.Image({
    source: new ol.source.ImageWMS({
      url: 'https://wms.geo.admin.ch',
      params: {'LAYERS': 'ch.swisstopo.dreiecksvermaschung'},
      serverType: 'mapserver'
    })
  });

  ngeoDecorateLayerLoading(this.wms, $scope);

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new ol.Map({
    layers: [this.asitvd, this.wms],
    view: new ol.View({
      projection: 'EPSG:21781',
      resolutions: [1000, 500, 200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [600000, 200000],
      zoom: 1
    })
  });
};


app.module.controller('MainController', app.MainController);
