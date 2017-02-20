goog.provide('app.layerloading');

goog.require('ngeo.DecorateLayerLoading');
/** @suppress {extraRequire} */
goog.require('ngeo.mapDirective');
goog.require('ngeo.source.AsitVD');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Image');
goog.require('ol.layer.Tile');
goog.require('ol.source.ImageWMS');


/** @type {!angular.Module} **/
app.module = angular.module('app', ['ngeo']);


/**
 * @param {angular.Scope} $scope Scope.
 * @param {ngeo.DecorateLayerLoading} ngeoDecorateLayerLoading Decorate layer service.
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
