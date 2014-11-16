goog.provide('mapextension');

goog.require('ngeo_debounce_service');
goog.require('ngeo_location_service');
goog.require('ngeo_map_directive');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');

(function() {
  var module = angular.module('app', ['ngeo']);

  /**
   * An application-specific map directive that updates the URL in the browser
   * address bar when the map view changes. It also sets the initial view based
   * on the URL query params at init time.
   *
   * This directive gets a reference to the map instance through the "app-map"
   * attribute.
   */
  module.directive('appMap', [
    /**
     * @return {angular.Directive} The directive specs.
     */
    function(ngeoLocation) {
      return {
        restrict: 'E',
        scope: {
          'map': '=appMap'
        },
        controller: 'AppMapController',
        controllerAs: 'ctrl',
        bindToController: true,
        template: '<div ngeo-map=ctrl.map></div>'
      };
    }]);


  /**
   * The controller for the `appMap` directive.
   */
  module.controller('AppMapController', [
    '$scope', 'ngeoLocation', 'ngeoDebounce',
    /**
     * @param {angular.Scope} $scope Scope.
     * @param {ngeo.Location} ngeoLocation ngeo Location service.
     * @param {ngeo.Debounce} ngeoDebounce ngeo Debounce service.
     */
    function($scope, ngeoLocation, ngeoDebounce) {
      var map = this['map'];
      var view = map.getView();

      var zoom = ngeoLocation.getParam('z');
      zoom = angular.isDefined(zoom) ? +zoom : 4;

      var x = ngeoLocation.getParam('x');
      var y = ngeoLocation.getParam('y');
      var center = angular.isDefined(x) && angular.isDefined(y) ?
          [+x, +y] : [0, 0];

      view.setCenter(center);
      view.setZoom(zoom);

      ngeoLocation.updateParams({
        'z': zoom,
        'x': Math.round(center[0]),
        'y': Math.round(center[1])
      });

      view.on('propertychange',
          ngeoDebounce(
              /**
               * @param {ol.ObjectEvent} e Object event.
               */
              function(e) {
                var center = view.getCenter();
                var params = {
                  'z': view.getZoom(),
                  'x': Math.round(center[0]),
                  'y': Math.round(center[1])
                };
                ngeoLocation.updateParams(params);
              }, 300, /* invokeApply */ true));

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
        ]
      });
    }]);

})();
