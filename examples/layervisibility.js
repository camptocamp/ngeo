goog.provide('layervisibility');

goog.require('go_layervisibility_directive');
goog.require('go_map_directive');
goog.require('ol.Map');
goog.require('ol.View2D');
goog.require('ol.layer.Tile');
goog.require('ol.source.MapQuest');
goog.require('ol.source.TileWMS');

(function() {
  var module = angular.module('app', ['go']);

  module.controller('MainController', ['$scope',
    /**
     * @param {angular.Scope} $scope Scope.
     */
    function($scope) {
      /** @type {ol.layer.Layer} */
      $scope.layer = new ol.layer.Tile({
        source: new ol.source.TileWMS({
          url: 'http://demo.opengeo.org/geoserver/wms',
          params: {'LAYERS': 'topp:states'},
          serverType: 'geoserver',
          extent: [-13884991, 2870341, -7455066, 6338219]
        })
      });

      // initial visibility of the WMS layer
      $scope.layervisibility = false;

      /** @type {ol.Map} */
      $scope.map = new ol.Map({
        layers: [
          new ol.layer.Tile({
            source: new ol.source.MapQuest({layer: 'sat'})
          }),
          $scope.layer
        ],
        view: new ol.View2D({
          center: [-10997148, 4569099],
          zoom: 4
        })
      });

    }]);
})();
