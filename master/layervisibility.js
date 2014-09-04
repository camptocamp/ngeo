

(function() {
  var module = angular.module('app', ['go']);

  module.controller('MainController', ['$scope', 'goDecorateLayer',
    /**
     * @param {angular.Scope} $scope Scope.
     * @param {go.DecorateLayer} goDecorateLayer Decorate layer service.
     */
    function($scope, goDecorateLayer) {

      /** @type {ol.layer.Tile} */
      var wmsLayer = new ol.layer.Tile({
        source: new ol.source.TileWMS({
          url: 'http://demo.opengeo.org/geoserver/wms',
          params: {'LAYERS': 'topp:states'},
          serverType: 'geoserver',
          extent: [-13884991, 2870341, -7455066, 6338219]
        })
      });
      goDecorateLayer(wmsLayer);
      $scope['layer'] = wmsLayer;

      /** @type {ol.Map} */
      $scope['map'] = new ol.Map({
        layers: [
          new ol.layer.Tile({
            source: new ol.source.MapQuest({layer: 'sat'})
          }),
          wmsLayer
        ],
        view: new ol.View({
          center: [-10997148, 4569099],
          zoom: 4
        })
      });
    }]);
})();
