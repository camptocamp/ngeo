/**
 * This example shows the ngeo routing directive.
 */

goog.provide('app.routing');

/** @suppress {extraRequire} */
goog.require('ngeo.routingComponent');
/** @suppress {extraRequire} */
goog.require('ngeo.routingFeatureComponent');
/** @suppress {extraRequire} */
goog.require('ngeo.nominatimInputComponent');
/** @suppress {extraRequire} */
goog.require('ngeo.mapDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.filters');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');

/** @type {!angular.Module} */
app.module = angular.module('app', ['ngeo']);


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

app.module.controller('MainController', app.MainController);
