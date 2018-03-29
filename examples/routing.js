/**
 * This example shows the ngeo routing directive.
 */

goog.provide('app.routing');

goog.require('ngeo.routing.module');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');

/** @type {!angular.Module} **/
const appmodule = angular.module('app', [
  'gettext',
  ngeo.map.module.name,
  ngeo.routing.module.name
]);


/**
 * The application's main directive.
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
      center: [931010.1535989442, 5961705.842297254],
      zoom: 9
    })
  });

  /**
   * @type {boolean}
   * @export
   */
  this.routingfeatureActive = true;
};

appmodule.controller('MainController', app.MainController);
