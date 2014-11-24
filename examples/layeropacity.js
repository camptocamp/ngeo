goog.provide('layeropacity');

goog.require('ngeo.DecorateLayer');
goog.require('ngeo.mapDirective');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');


/** @const **/
var app = {};


var module = angular.module('app', ['ngeo']);



/**
 * @param {angular.Scope} $scope Scope.
 * @param {ngeo.DecorateLayer} ngeoDecorateLayer Decorate layer service.
 * @constructor
 * @ngInject
 */
app.MainController = function($scope, ngeoDecorateLayer) {
  /** @type {ol.layer.Tile} */
  var layer = new ol.layer.Tile({
    source: new ol.source.OSM()
  });
  ngeoDecorateLayer(layer);
  this['layer'] = layer;

  /** @type {ol.Map} */
  this['map'] = new ol.Map({
    layers: [layer],
    view: new ol.View({
      center: [0, 0],
      zoom: 4
    })
  });
};


module.controller('MainController', app.MainController);
