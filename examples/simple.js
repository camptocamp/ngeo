goog.provide('app.simple');

goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');

goog.require('ngeo.map.module');


/** @type {!angular.Module} **/
app.module = angular.module('app', [
  ngeo.map.module.name
]);


/**
 * @constructor
 * @ngInject
 */
app.MainController = function() {

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
};


app.module.controller('MainController', app.MainController);
