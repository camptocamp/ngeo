goog.provide('layeropacity');

goog.require('ngeo_decoratelayer_service');
goog.require('ngeo_map_directive');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');

(function() {
  var module = angular.module('app', ['ngeo']);

  module.controller('MainController', ['$scope', 'ngeoDecorateLayer',
    /**
     * @param {angular.Scope} $scope Scope.
     * @param {ngeo.DecorateLayer} ngeoDecorateLayer Decorate layer service.
     */
    function($scope, ngeoDecorateLayer) {

      /** @type {ol.layer.Tile} */
      var layer = new ol.layer.Tile({
        source: new ol.source.OSM()
      });
      ngeoDecorateLayer(layer);
      this['layer'] = layer;

      /** @type {ol.Map} */
      $scope['map'] = new ol.Map({
        layers: [layer],
        view: new ol.View({
          center: [0, 0],
          zoom: 4
        })
      });
    }]);
})();
