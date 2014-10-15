goog.provide('layermanager');

goog.require('ngeo_decoratelayer_service');
goog.require('ngeo_map_directive');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.BingMaps');
goog.require('ol.source.MapQuest');
goog.require('ol.source.OSM');
goog.require('ol.source.Stamen');
goog.require('ol.source.TileWMS');

(function() {
  var module = angular.module('app', ['ngeo']);

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
    'ngeoDecorateLayer',
    'decorateLayer',

    /**
     * @param {angular.Scope} $scope Scope.
     * @param {ngeo.DecorateLayer} ngeoDecorateLayer Decorate layer service.
     */
    function($scope, ngeoDecorateLayer, decorateLayer) {

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
      ngeoDecorateLayer(osm);
      decorateLayer(osm, map);

      /** @type {ol.layer.Layer} */
      var mapQuest = new ol.layer.Tile({
        id: 'mapquest',
        label: 'MapQuest',
        source: new ol.source.MapQuest({layer: 'sat'})
      });
      ngeoDecorateLayer(mapQuest);
      decorateLayer(mapQuest, map);

      /** @type {ol.layer.Layer} */
      var stamen = new ol.layer.Tile({
        id: 'stamen',
        label: 'Stamen',
        source: new ol.source.Stamen({
          layer: 'watercolor'
        })
      });
      ngeoDecorateLayer(stamen);
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

