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


var module = angular.module('app', ['ngeo']);



/**
 * @param {angular.Scope} $scope Scope.
 * @constructor
 * @ngInject
 */
app.MainController = function($scope) {
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
   * control instance. And that function should be defined on the
   * scope.
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


module.controller('MainController', app.MainController);
