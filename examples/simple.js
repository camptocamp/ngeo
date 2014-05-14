(function() {
  goog.provide('app');

  goog.require('go_map_directive');
  goog.require('ol.Map');
  goog.require('ol.layer.Tile');
  goog.require('ol.source.OSM');
  goog.require('ol.View2D');

  var module = angular.module('app', [
    'go_map_directive'
  ]);

  module.controller('MainController', ['$scope', function($scope) {
      $scope.map = new ol.Map({
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        view: new ol.View2D({
          center: [0, 0],
          zoom: 4
        })
      });
    }]);

})();

