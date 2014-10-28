goog.provide('mapextension');

goog.require('ngeo.MapDirectiveController');
goog.require('ngeo_map_directive');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');

(function() {
  var module = angular.module('app', ['ngeo']);

  /**
   * An application-specific map directive. The directive gets a reference
   * to the map from the ngeo directive's controller. Such a directive can
   * be used to update the browser URL when the map view states change for
   * example.
   */
  module.directive('appMap', [
    /**
     * @return {angular.Directive} The directive specs.
     */
    function() {
      return {
        restrict: 'A',
        require: 'ngeoMap',
        link:
            /**
             * @param {angular.Scope} scope Scope.
             * @param {angular.JQLite} element Element.
             * @param {angular.Attributes} attrs Attributes.
             * @param {ngeo.MapDirectiveController} controller Controller.
             */
            function(scope, element, attrs, controller) {
              var map = controller.getMap();
              // do something with map…
              map.getView().on('propertychange',
                  /**
                   * @param {ol.ObjectEvent} e Object event.
                   */
                  function(e) {
                    window.console.log('"' + e.key + '" event received');
                  });
            }
      };
    }]);

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
