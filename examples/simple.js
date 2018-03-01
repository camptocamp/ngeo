goog.provide('app.simple');

// webpack: import './simple.css';
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');
goog.require('ngeo.map.module');


/** @type {!angular.Module} **/
app.simple.module = angular.module('app', [
  'gettext',
  ngeo.map.module.name
]);


/**
 * @constructor
 * @ngInject
 */
app.simple.MainController = function() {

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


app.simple.module.controller('MainController', app.simple.MainController);
