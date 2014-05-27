


/** @const **/
var app = {};


/** @type {!angular.Module} */
app.module = angular.module('app', ['ngeo']);


/**
 * App-specific directive wrapping the ngeo map directive. The directive's
 * controller has a property "map" including a reference to the OpenLayers
 * map.
 *
 * @return {angular.Directive} The directive specs.
 */
app.mapDirective = function() {
  return {
    restrict: 'E',
    scope: {
      'map': '=appMap',
      'class': '=appMapClass'
    },
    controller: function() {},
    controllerAs: 'ctrl',
    bindToController: true,
    template: '<div ngeo-map="ctrl.map"></div>'
  };
};


app.module.directive('appMap', app.mapDirective);


/**
 * The application's main controller.
 * @param {angular.$timeout} $timeout Angular timeout service.
 *
 * @constructor
 * @ngInject
 */
app.MainController = function($timeout) {
  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new ol.Map({
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

  /**
   * @type {boolean}
   * @export
   */
  this.open = false;

  // We want the sidebar to be open at application launch so we set the `open`
  // property to true at startup.
  // But we need to do it asynchronously in order to have the `resizemap`
  // directive working. If we don't, the `ng-class` directive doesn't fire the
  // animation hooks.
  var self = this;
  $timeout(function() {
    self.open = true;
  }, 0);
};


app.module.controller('MainController', app.MainController);
