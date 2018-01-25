goog.provide('gmfapp.print');

// webpack: import './print.css';
// webpack: import './common_dependencies.js';
goog.require('gmf');
goog.require('gmf.layertree.component');
/** @suppress {extraRequire} */
goog.require('gmf.map.component');
/** @suppress {extraRequire} */
goog.require('gmf.print.component');
goog.require('gmf.theme.Themes');
goog.require('ngeo.map.module');
/** @suppress {extraRequire} */
goog.require('ngeo.proj.EPSG21781');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');


/** @type {!angular.Module} **/
gmfapp.print.module = angular.module('gmfapp', [
  gmf.module.name, // Change me when gmf.Theme and other dependencies are in a module
  gmf.layertree.component.name,
  gmf.map.component.name,
  gmf.print.component.name,
  gmf.theme.Themes.module.name,
  ngeo.map.module.name //for ngeo.map.FeatureOverlay, perhaps remove me
]);


gmfapp.print.module.value(
  'gmfTreeUrl',
  'https://geomapfish-demo.camptocamp.net/2.2/wsgi/themes?' +
        'version=2&background=background');


gmfapp.print.module.value('gmfPrintUrl',
  'https://geomapfish-demo.camptocamp.net/2.2/wsgi/printproxy');


gmfapp.print.module.value(
  'authenticationBaseUrl',
  'https://geomapfish-demo.camptocamp.net/2.2/wsgi'
);


gmfapp.print.module.value('gmfLayersUrl',
  'https://geomapfish-demo.camptocamp.net/2.2/wsgi/layers/');

gmfapp.print.constant('defaultTheme', 'Demo');
gmfapp.print.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');


/**
 * @constructor
 * @param {gmf.theme.Themes} gmfThemes The gmf themes service.
 * @param {ngeo.map.FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *   overlay manager service.
 * @ngInject
 */
gmfapp.print.MainController = function(gmfThemes, ngeoFeatureOverlayMgr) {

  gmfThemes.loadThemes();

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
      projection: 'EPSG:21781',
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [537635, 152640],
      zoom: 3
    })
  });

  /**
   * @type {Object.<string, string|number|boolean>}
   * @export
   */
  this.defaulPrintFieldstValues = {
    'comments': 'Default comments example',
    'legend': true
  };

  /**
   * @type {Array.<Object>|undefined}
   * @export
   */
  this.themes = undefined;

  /**
   * @type {Object|undefined}
   * @export
   */
  this.treeSource = undefined;

  gmfThemes.getThemesObject().then((themes) => {
    if (themes) {
      this.themes = themes;
      this.treeSource = themes[3];
    }
  });

  ngeoFeatureOverlayMgr.init(this.map);
};

gmfapp.print.module.controller('MainController', gmfapp.print.MainController);
