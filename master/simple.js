

(function() {
  var module = angular.module('app', ['go']);

  module.controller('MainController', ['$scope',
    /**
     * @param {angular.Scope} $scope Scope.
     */
    function($scope) {
      /** @type {ol.Map} */
      $scope['map'] = new ol.Map({
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        view: new ol.View({
          center: [0, 0],
          zoom: 4
        })
      });
    }]);

})();
