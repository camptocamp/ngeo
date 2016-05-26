goog.provide('disclaimer');

goog.require('ngeo.Disclaimer');
goog.require('ngeo.mapDirective');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['ngeo']);


/**
 * @param {ngeo.Disclaimer} ngeoDisclaimer Ngeo disclaimer service.
 * @constructor
 */
app.MainController = function(ngeoDisclaimer) {

  /**
   * @type {ngeo.Disclaimer}
   * @export
   */
  this.disclaimer = ngeoDisclaimer;

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

  // initialize tooltips
  $('[data-toggle="tooltip"]').tooltip({
    container: 'body',
    trigger: 'hover'
  });
};


/**
 * Demonstrates how to display a disclaimer message in an other target. In
 * this case, it's shown in the map.
 * @export
 */
app.MainController.prototype.inMap = function() {
  var messages = [
    'Disclaimer inside the map',
    'An other message ',
    'Map contributors',
    'This is a long message inside a map'
  ];

  messages.forEach(function(message) {
    this.disclaimer.alert({
      msg: message,
      target: angular.element('#disclaimers-in-map'),
      type: ngeo.MessageType.WARNING
    });
  }, this);
};


app.module.controller('MainController', app.MainController);
