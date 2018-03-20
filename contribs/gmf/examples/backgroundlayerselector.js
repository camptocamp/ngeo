goog.provide('gmfapp.backgroundlayerselector');

// webpack: import './backgroundlayerselector.css';
goog.require('gmf.backgroundlayerselector.module');
/** @suppress {extraRequire} */
goog.require('gmf.map.component');
goog.require('gmf.theme.Themes');
const EPSG21781 = goog.require('ngeo.proj.EPSG21781');
goog.require('ol.Map');
goog.require('ol.View');


/** @type {!angular.Module} **/
gmfapp.backgroundlayerselector.module = angular.module('gmfapp', [
  'gettext',
  gmf.backgroundlayerselector.module.name,
  gmf.map.component.name,
  gmf.theme.Themes.module.name,
]);


gmfapp.backgroundlayerselector.module.value(
  'gmfTreeUrl',
  'https://geomapfish-demo.camptocamp.com/2.3/wsgi/themes?' +
        'version=2&background=background');

gmfapp.backgroundlayerselector.module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');


/**
 * @param {gmf.theme.Themes} gmfThemes Themes service.
 * @constructor
 * @ngInject
 */
gmfapp.backgroundlayerselector.MainController = function(gmfThemes) {

  gmfThemes.loadThemes();

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new ol.Map({
    layers: [],
    view: new ol.View({
      center: [632464, 185457],
      projection: EPSG21781,
      minZoom: 3,
      zoom: 3
    })
  });
};


gmfapp.backgroundlayerselector.module.controller('MainController', gmfapp.backgroundlayerselector.MainController);
