goog.provide('app.animation');

// webpack: import './animation.css';
// webpack: import './common_dependencies.js';
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');

goog.require('ngeo');
goog.require('ngeo.map.module');


/** @type {!angular.Module} */
app.animation.module = angular.module('app', [
  ngeo.module.name,
  ngeo.map.module.name
]);


/**
 * App-specific component wrapping the ngeo map component. The component's
 * controller has a property "map" including a reference to the OpenLayers
 * map.
 *
 * @type {!angular.Component}
 */
app.animation.mapComponent = {
  bindings: {
    'map': '=appMap',
    'class': '=appMapClass'
  },
  template: '<div ngeo-map="$ctrl.map"></div>'
};


app.animation.module.component('appMap', app.animation.mapComponent);


/**
 * The application's main controller.
 * @param {angular.$timeout} $timeout Angular timeout service.
 *
 * @constructor
 * @ngInject
 */
app.animation.MainController = function($timeout) {
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
  const self = this;
  $timeout(() => {
    self.open = true;
  }, 0);
};


app.animation.module.controller('MainController', app.animation.MainController);
