

(function() {
  var module = angular.module('app', ['go']);

  module.controller('MainController', ['$scope', 'goDecorateInteraction',
    /**
     * @param {angular.Scope} $scope Scope.
     * @param {go.DecorateInteraction} goDecorateInteraction Decorate
     *     interaction service.
     */
    function($scope, goDecorateInteraction) {

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
      goDecorateInteraction($scope.interaction, $scope.map);
    }]);
})();
