goog.provide('app.control');

// webpack: import './control.css';
goog.require('ngeo.map.module');
/** @suppress {extraRequire} */
goog.require('ngeo.misc.controlComponent');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.control.MousePosition');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');


/** @type {!angular.Module} **/
app.control.module = angular.module('app', [
  'gettext',
  ngeo.map.module.name,
  ngeo.misc.controlComponent.name,
]);


/**
 * @constructor
 * @ngInject
 */
app.control.MainController = function() {

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

  /**
   * @type {ol.control.Control}
   * @export
   */
  this.control = new ol.control.MousePosition({
    className: 'mouse-position'
  });
};


app.control.module.controller('MainController', app.control.MainController);
