

(function() {
  var module = angular.module('app', ['go']);

  module.controller('MainController', ['$scope', 'goDecorateLayer',
    /**
     * @param {angular.Scope} $scope Scope.
     * @param {go.DecorateLayer} goDecorateLayer Decorate layer service.
     */
    function($scope, goDecorateLayer) {
      /** @type {ol.layer.Layer} */
      $scope.layer = new ol.layer.Tile({
        source: new ol.source.OSM()
      });
      goDecorateLayer($scope.layer);

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
