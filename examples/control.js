goog.provide('control');

goog.require('ngeo.controlDirective');
goog.require('ngeo.mapDirective');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.control.MousePosition');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['ngeo']);



/**
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

  /**
   * The "control" directive requires a function that creates the
   * control instance.
   *
   * @param {Element} target Target element.
   * @return {ol.control.MousePosition} Mouse position control.
   */
  this['createControl'] = function(target) {
    return new ol.control.MousePosition({
      className: 'mouse-position',
      target: target
    });
  };
};


app.module.controller('MainController', app.MainController);
