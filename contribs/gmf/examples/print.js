goog.provide('gmfapp.print');

goog.require('gmf.Themes');
/** @suppress {extraRequire} */
goog.require('gmf.layertreeComponent');
/** @suppress {extraRequire} */
goog.require('gmf.printDirective');
/** @suppress {extraRequire} */
goog.require('gmf.mapDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.proj.EPSG21781');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');


/** @type {!angular.Module} **/
gmfapp.module = angular.module('gmfapp', ['gmf']);


gmfapp.module.value(
    'gmfTreeUrl',
    'https://geomapfish-demo.camptocamp.net/2.2/wsgi/themes?' +
        'version=2&background=background');


gmfapp.module.value('gmfPrintUrl',
    'https://geomapfish-demo.camptocamp.net/2.2/wsgi/printproxy');


gmfapp.module.value(
    'authenticationBaseUrl',
    'https://geomapfish-demo.camptocamp.net/2.2/wsgi'
);


/**
 * @constructor
 * @param {gmf.Themes} gmfThemes The gmf themes service.
 * @param {ngeo.FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *   overlay manager service.
 * @ngInject
 */
gmfapp.MainController = function(gmfThemes, ngeoFeatureOverlayMgr) {

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
   * export
   */
  this.defaulPrintFieldstValues = {
    'comments': 'Default comments example',
    'legend': true
  };

  /**
   * @type {Array.<Object>|undefined}
   * export
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

gmfapp.module.controller('MainController', gmfapp.MainController);
