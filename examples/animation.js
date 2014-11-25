goog.provide('animation');

goog.require('ngeo.mapDirective');
goog.require('ngeo.resizemapDirective');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');


/** @const **/
var app = {};


/** @type {!angular.Module} */
app.module = angular.module('app', ['ngAnimate', 'ngeo']);


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
 *
 * @constructor
 */
app.MainController = function() {
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

  this['open'] = false;
};


app.module.controller('MainController', app.MainController);
