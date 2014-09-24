

(function() {
  var module = angular.module('app', ['go']);

  module.filter('reverse', function() {

    /**
     * @param {Array} items Array to reverse.
     * @return {Array} Reversed array.
     */
    return function(items) {
      return items.slice().reverse();
    };
  });

  module.value('decorateLayer',

      /**
       * @param {!ol.layer.Layer} layer Layer to decorate.
       * @param {ol.Map} map Map.
       */
      function(layer, map) {

        Object.defineProperty(layer, 'inmap', {
          get: function() {
            return map.getLayers().getArray().indexOf(layer) >= 0;
          },
          set: function(val) {
            if (val) {
              map.addLayer(layer);
            } else {
              map.removeLayer(layer);
            }
          }
        });
      });

  module.controller('MainController', [
    '$scope',
    'goDecorateLayer',
    'decorateLayer',

    /**
     * @param {angular.Scope} $scope Scope.
     * @param {go.DecorateLayer} goDecorateLayer Decorate layer service.
     */
    function($scope, goDecorateLayer, decorateLayer) {

      /** @type {ol.Map} */
      var map = new ol.Map({
        view: new ol.View({
          center: [-6655.5402445057125, 6709968.258934638],
          zoom: 11
        })
      });
      $scope['map'] = map;

      /** @type {ol.layer.Layer} */
      var osm = new ol.layer.Tile({
        id: 'osm',
        label: 'OSM',
        source: new ol.source.OSM()
      });
      goDecorateLayer(osm);
      decorateLayer(osm, map);

      /** @type {ol.layer.Layer} */
      var mapQuest = new ol.layer.Tile({
        id: 'mapquest',
        label: 'MapQuest',
        source: new ol.source.MapQuest({layer: 'sat'})
      });
      goDecorateLayer(mapQuest);
      decorateLayer(mapQuest, map);

      /** @type {ol.layer.Layer} */
      var stamen = new ol.layer.Tile({
        id: 'stamen',
        label: 'Stamen',
        source: new ol.source.Stamen({
          layer: 'watercolor'
        })
      });
      goDecorateLayer(stamen);
      decorateLayer(stamen, map);

      $scope['layers'] = [osm, mapQuest, stamen];
    }]);

  module.directive('layerManager', [
    function() {
      return {
        restrict: 'A',
        scope: {
          map: '=layerManager'
        },
        template: '<ul class="list-group">' +
            '<li class="list-group-item" ng-repeat="layer in ' +
                'map.getLayers().getArray()' +
                ' | reverse track by layer.get(\'id\')">' +
            '<button type="button" ng-click="layer.inmap = false" ' +
                'class="btn btn-primary btn-xs badge">×</button>' +
            '<label>' +
            '<input type="checkbox" ng-model="layer.visible"  />' +
                '{{layer.get("label")}}' +
            '</label>' +
            '<input type="range" min="0" max="1" step="0.05" ' +
                'ng-model="layer.opacity" />' +
            '</li>' +
            '</ul>'
      };
    }]);

})();

