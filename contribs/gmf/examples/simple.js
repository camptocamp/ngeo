goog.provide('gmfapp.simple');

// webpack: import './simple.css';
// webpack: import './common_dependencies.js';
goog.require('gmf');
/** @suppress {extraRequire} */
goog.require('gmf.map.component');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');


/** @type {!angular.Module} **/
gmfapp.simple.module = angular.module('gmfapp', [
  gmf.module.name,
  gmf.map.component.name,
]);

gmfapp.simple.constant('defaultTheme', 'Demo');
gmfapp.simple.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');


/**
 * @constructor
 * @ngInject
 */
gmfapp.simple.MainController = function() {

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


gmfapp.simple.module.controller('MainController', gmfapp.simple.MainController);
