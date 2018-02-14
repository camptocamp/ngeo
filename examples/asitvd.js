goog.provide('app.asitvd');

// webpack: import './asitvd.css';
// webpack: import './common_dependencies.js';
goog.require('ngeo.source.AsitVD');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ngeo.map.module');


/** @type {!angular.Module} */
app.asitvd.module = angular.module('app', [
  ngeo.map.module.name
]);


/**
 * @constructor
 * @ngInject
 */
app.asitvd.MainController = function() {
  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ngeo.source.AsitVD({
          layer: 'asitvd.fond_couleur'
        })
      })
    ],
    view: new ol.View({
      resolutions: [250, 100, 50, 20, 10, 5, 2.5, 2, 1.5, 1, 0.5],
      center: [535000, 154000],
      zoom: 0
    })
  });
};

app.asitvd.module.controller('MainController', app.asitvd.MainController);
