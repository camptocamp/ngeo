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
   * An application-specific map directive. This directive gets a reference
   * to the map instance through the "app-map" attribute.
   */
  module.directive('appMap', [
    /**
     * @return {angular.Directive} The directive specs.
     */
    function() {
      return {
        restrict: 'E',
        scope: {
          'map': '=appMap'
        },
        controller: function() {
          var map = this['map'];
          // do something with map…
          map.getView().on('propertychange',
              /**
               * @param {ol.ObjectEvent} e Object event.
               */
              function(e) {
                window.console.log('"' + e.key + '" event received');
              });
        },
        controllerAs: 'ctrl',
        bindToController: true,
        template: '<div ngeo-map=ctrl.map></div>'
      };
    }]);


  module.controller('MainController', ['$scope',
    /**
     * @param {angular.Scope} $scope Scope.
     */
    function($scope) {
      /** @type {ol.Map} */
      this['map'] = new ol.Map({
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
