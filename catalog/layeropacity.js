


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['ngeo']);



/**
 * @param {ngeo.DecorateLayer} ngeoDecorateLayer Decorate layer service.
 * @constructor
 * @ngInject
 */
app.MainController = function(ngeoDecorateLayer) {
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


app.module.controller('MainController', app.MainController);
