goog.provide('permalink');

goog.require('ngeo.Debounce');
goog.require('ngeo.Location');
goog.require('ngeo.mapDirective');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['ngeo']);


/**
 * Note: the "config" and "run" function defined below are used to work around
 * a bug in Angular that makes the ngeoLocation service incompatible with the
 * $location service. With this workaround we make $location play more nicely
 * with code that uses the history API.
 * See <https://github.com/angular/angular.js/issues/1417>.
 */


/**
 * @param {angular.$locationProvider} $locationProvider Angular location
 *     provider.
 * @private
 * @ngInject
 */
app.config_ = function($locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
};

app.module.config(app.config_);


/**
 * @param {angular.Scope} $rootScope Angular root scope.
 * @private
 * @ngInject
 */
app.run_ = function($rootScope) {
  $rootScope.$on('$locationChangeStart',
      /**
       * @param {angular.Scope.Event} e Angular scope event.
       */
      function(e) {
        e.preventDefault();
      });
};

app.module.run(app.run_);


/**
 * An application-specific map directive that updates the URL in the browser
 * address bar when the map view changes. It also sets the initial view based
 * on the URL query params at init time.
 *
 * This directive gets a reference to the map instance through the "app-map"
 * attribute.
 *
 * @return {angular.Directive} The directive specs.
 */
app.mapDirective = function() {
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
};


app.module.directive('appMap', app.mapDirective);



/**
 * @param {ngeo.Location} ngeoLocation ngeo Location service.
 * @param {ngeo.Debounce} ngeoDebounce ngeo Debounce service.
 * @constructor
 * @ngInject
 */
app.MapDirectiveController = function(ngeoLocation, ngeoDebounce) {
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
};


app.module.controller('AppMapController', app.MapDirectiveController);



/**
 * @constructor
 * @param {angular.$location} $location Angular location service. It is
 * injected into the main controller just to demonstrate its incompatibility
 * with ngeoLocation and the workaround used (see above).
 * @ngInject
 */
app.MainController = function($location) {
  /** @type {ol.Map} */
  this['map'] = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ]
  });
};


app.module.controller('MainController', app.MainController);
