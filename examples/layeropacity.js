goog.provide('layeropacity');

goog.require('go_decoratelayer_service');
goog.require('go_map_directive');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');

(function() {
  var module = angular.module('app', ['go']);

  module.controller('MainController', ['$scope', 'goDecorateLayer',
    /**
     * @param {angular.Scope} $scope Scope.
     * @param {go.DecorateLayer} goDecorateLayer Decorate layer service.
     */
    function($scope, goDecorateLayer) {

      /** @type {ol.layer.Tile} */
      var layer = new ol.layer.Tile({
        source: new ol.source.OSM()
      });
      goDecorateLayer(layer);
      $scope['layer'] = layer;

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
