goog.provide('app.layeropacity');

goog.require('ngeo.layertree.DecorateLayer');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');

goog.require('ngeo.map.module');


/** @type {!angular.Module} **/
app.module = angular.module('app', [
  ngeo.module.name,
  ngeo.map.module.name
]);


/**
 * @param {ngeo.layertree.DecorateLayer} ngeoDecorateLayer Decorate layer service.
 * @constructor
 * @ngInject
 */
app.MainController = function(ngeoDecorateLayer) {
  /**
   * @type {ol.layer.Tile}
   * @export
   */
  this.layer = new ol.layer.Tile({
    source: new ol.source.OSM()
  });

  const layer = this.layer;
  ngeoDecorateLayer(layer);

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new ol.Map({
    layers: [layer],
    view: new ol.View({
      center: [0, 0],
      zoom: 4
    })
  });
};


app.module.controller('MainController', app.MainController);
