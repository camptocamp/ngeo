


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['ngeo']);


/**
 * @param {angular.Scope} $scope Scope.
 * @param {ngeo.DecorateLayerLoading} ngeoDecorateLayerLoading Decorate layer service.
 * @constructor
 * @ngInject
 */
app.MainController = function($scope, ngeoDecorateLayerLoading) {

  /**
   * @type {ol.layer.Tile}
   * @export
   */
  this.osm = new ol.layer.Tile({
    source: new ol.source.OSM()
  });

  ngeoDecorateLayerLoading(this.osm, $scope);

  /**
   * @type {ol.layer.Image}
   * @export
   */
  this.wms = new ol.layer.Image({
    source: new ol.source.ImageWMS({
      url: 'http://demo.boundlessgeo.com/geoserver/wms',
      params: {'LAYERS': 'topp:states'},
      serverType: 'geoserver'
    })
  });

  ngeoDecorateLayerLoading(this.wms, $scope);

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new ol.Map({
    layers: [this.osm, this.wms],
    view: new ol.View({
      center: [0, 0],
      zoom: 1
    })
  });
};


app.module.controller('MainController', app.MainController);
