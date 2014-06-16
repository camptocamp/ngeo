goog.provide('interactiontoggle');

goog.require('go_decorator_service');
goog.require('go_map_directive');
goog.require('ol.FeatureOverlay');
goog.require('ol.Map');
goog.require('ol.View2D');
goog.require('ol.interaction.Draw');
goog.require('ol.layer.Tile');
goog.require('ol.source.MapQuest');

(function() {
  var module = angular.module('app', ['go']);

  module.controller('MainController', ['$scope', 'goDecorator',
    /**
     * @param {angular.Scope} $scope Scope.
     * @param {gox.goDecorator} goDecorator decorate layer service.
     */
    function($scope, goDecorator) {

      /** @type {ol.Map} */
      $scope.map = new ol.Map({
        layers: [
          new ol.layer.Tile({
            source: new ol.source.MapQuest({layer: 'sat'})
          })
        ],
        view: new ol.View2D({
          center: [-10997148, 4569099],
          zoom: 4
        })
      });

      var featureOverlay = new ol.FeatureOverlay();
      featureOverlay.setMap($scope.map);

      /** @type {ol.interaction.Draw} */
      $scope.interaction = new ol.interaction.Draw(
          /** @type {olx.interaction.DrawOptions} */ ({
            type: 'Point',
            features: featureOverlay.getFeatures()
          }));
      goDecorator.interaction($scope.interaction, $scope.map);
    }]);
})();
