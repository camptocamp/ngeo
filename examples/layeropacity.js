goog.provide('layeropacity');

goog.require('go_decorator_service');
goog.require('go_map_directive');
goog.require('ol.Map');
goog.require('ol.View2D');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');

(function() {
  var module = angular.module('app', ['go']);

  module.controller('MainController', ['$scope', 'goDecorator',
    /**
     * @param {angular.Scope} $scope Scope.
     * @param {gox.goDecorator} goDecorator decorate layer service.
     */
    function($scope, goDecorator) {
      /** @type {ol.layer.Layer} */
      $scope.layer = new ol.layer.Tile({
        source: new ol.source.OSM()
      });
      goDecorator.layer($scope.layer);

      /** @type {ol.Map} */
      $scope.map = new ol.Map({
        layers: [
          $scope.layer
        ],
        view: new ol.View2D({
          center: [0, 0],
          zoom: 4
        })
      });
    }]);
})();
