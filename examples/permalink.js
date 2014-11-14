goog.provide('permalink');

goog.require('ngeo_map_directive');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');

(function() {
  var module = angular.module('app', ['ngeo']);

  module.config(function($locationProvider) {
    $locationProvider.html5Mode(true);
  });

  /**
   * An application-specific map directive. This directive gets a reference
   * to the map instance through the "app-map" attribute.
   */
  module.directive('appMap', ['$location',
    /**
     * @return {angular.Directive} The directive specs.
     */
    function($location) {
      return {
        restrict: 'E',
        scope: {
          'map': '=appMap'
        },
        controller: function($scope, $location) {
          var map = this['map'];
          // Update URL when map changes
          map.getView().on('propertychange',
              /**
               * @param {ol.ObjectEvent} e Object event.
               */
              function(e) {
                var view = e.target;
                var center = view.getCenter();
                $location.search({
                  zoom: view.getZoom(),
                  x: Math.round(center[0]),
                  y: Math.round(center[1])
                });
                $scope.$apply();
              });
        },
        controllerAs: 'ctrl',
        bindToController: true,
        template: '<div ngeo-map=ctrl.map></div>'
      };
    }]);


  module.controller('MainController', ['$scope', '$location',
    /**
     * @param {angular.Scope} $scope Scope.
     * @param {angular.Location} $location Location.
     */
    function($scope, $location) {

      // Take URL params into account if any
      var center, zoom, params = $location.search();
      if ('x' in params && 'y' in params) {
        center = [params['x'], params['y']];
      }
      if ('zoom' in params) {
        zoom = params['zoom'];
      }

      /** @type {ol.Map} */
      this['map'] = new ol.Map({
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        view: new ol.View({
          center: center || [0, 0],
          zoom: zoom || 4
        })
      });
    }]);

})();
