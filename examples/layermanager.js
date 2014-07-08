goog.provide('layermanager');

goog.require('go_decoratelayer_service');
goog.require('go_map_directive');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.BingMaps');
goog.require('ol.source.MapQuest');
goog.require('ol.source.OSM');
goog.require('ol.source.Stamen');
goog.require('ol.source.TileWMS');

(function() {
  var module = angular.module('app', ['go']);

  module.filter('goReverse', function() {

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

        Object.defineProperty(layer, 'active', {
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
      $scope.map = new ol.Map({
        view: new ol.View({
          center: [-6655.5402445057125, 6709968.258934638],
          zoom: 11
        })
      });

      /** @type {ol.layer.Layer} */
      var osm = new ol.layer.Tile({
        id: 'osm',
        label: 'OSM',
        source: new ol.source.OSM()
      });
      goDecorateLayer(osm);
      decorateLayer(osm, $scope.map);

      /** @type {ol.layer.Layer} */
      var mapQuest = new ol.layer.Tile({
        id: 'mapquest',
        label: 'MapQuest',
        source: new ol.source.MapQuest({layer: 'sat'})
      });
      goDecorateLayer(mapQuest);
      decorateLayer(mapQuest, $scope.map);

      /** @type {ol.layer.Layer} */
      var stamen = new ol.layer.Tile({
        id: 'stamen',
        label: 'Stamen',
        source: new ol.source.Stamen({
          layer: 'watercolor'
        })
      });
      goDecorateLayer(stamen);
      decorateLayer(stamen, $scope.map);

      $scope['layers'] = [osm, mapQuest, stamen];
    }]);
})();

