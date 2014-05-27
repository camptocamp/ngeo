goog.provide('opacityslider');

goog.require('go_map_directive');
goog.require('go_opacityslider_directive');
goog.require('ol.Map');
goog.require('ol.View2D');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');

(function() {
  var module = angular.module('app', ['go']);

  module.controller('MainController', ['$scope',
    /**
     * @param {angular.Scope} $scope Scope.
     */
    function($scope) {
      /** @type {ol.layer.Layer} */
      $scope.layer = new ol.layer.Tile({
        source: new ol.source.OSM()
      });

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
