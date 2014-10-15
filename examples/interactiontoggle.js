goog.provide('interactiontoggle');

goog.require('ngeo_decorateinteraction_service');
goog.require('ngeo_map_directive');
goog.require('ol.FeatureOverlay');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.interaction.Draw');
goog.require('ol.layer.Tile');
goog.require('ol.source.MapQuest');

(function() {
  var module = angular.module('app', ['ngeo']);

  module.controller('MainController', ['$scope', 'ngeoDecorateInteraction',
    /**
     * @param {angular.Scope} $scope Scope.
     * @param {ngeo.DecorateInteraction} ngeoDecorateInteraction Decorate
     *     interaction service.
     */
    function($scope, ngeoDecorateInteraction) {

      /** @type {ol.Map} */
      var map = new ol.Map({
        layers: [
          new ol.layer.Tile({
            source: new ol.source.MapQuest({layer: 'sat'})
          })
        ],
        view: new ol.View({
          center: [-10997148, 4569099],
          zoom: 4
        })
      });
      $scope['map'] = map;

      var featureOverlay = new ol.FeatureOverlay();
      featureOverlay.setMap(map);

      /** @type {ol.interaction.Draw} */
      var interaction = new ol.interaction.Draw(
          /** @type {olx.interaction.DrawOptions} */ ({
            type: 'Point',
            features: featureOverlay.getFeatures()
          }));
      ngeoDecorateInteraction(interaction, map);
      $scope['interaction'] = interaction;

    }]);
})();
