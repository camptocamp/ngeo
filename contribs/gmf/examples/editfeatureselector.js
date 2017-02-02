goog.provide('gmfapp.editfeatureselector');

goog.require('gmf.Themes');
goog.require('gmf.TreeManager');
/** @suppress {extraRequire} */
goog.require('gmf.authenticationDirective');
/** @suppress {extraRequire} */
goog.require('gmf.editfeatureselectorDirective');
/** @suppress {extraRequire} */
goog.require('gmf.layertreeDirective');
/** @suppress {extraRequire} */
goog.require('gmf.mapDirective');
goog.require('ngeo.FeatureHelper');
goog.require('ngeo.ToolActivate');
goog.require('ngeo.ToolActivateMgr');
/** @suppress {extraRequire} */
goog.require('ngeo.proj.EPSG21781');
goog.require('ol.Collection');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.layer.Vector');
goog.require('ol.source.OSM');
goog.require('ol.source.Vector');


/** @type {!angular.Module} **/
gmfapp.module = angular.module('gmfapp', ['gmf']);


gmfapp.module.value('gmfTreeUrl',
    'https://geomapfish-demo.camptocamp.net/2.2/wsgi/themes?version=2&background=background');


gmfapp.module.value(
    'authenticationBaseUrl',
    'https://geomapfish-demo.camptocamp.net/2.2/wsgi');


gmfapp.module.value('gmfTreeUrl',
    'https://geomapfish-demo.camptocamp.net/2.2/wsgi/themes?version=2&background=background');


gmfapp.module.value('gmfLayersUrl',
    'https://geomapfish-demo.camptocamp.net/2.2/wsgi/layers/');


/**
 * @param {!angular.Scope} $scope Angular scope.
 * @param {gmf.Themes} gmfThemes The gmf themes service.
 * @param {gmf.TreeManager} gmfTreeManager gmf Tree Manager service.
 * @param {gmfx.User} gmfUser User.
 * @param {ngeo.FeatureHelper} ngeoFeatureHelper Ngeo feature helper service.
 * @param {ngeo.ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate manager
 *     service.
 * @ngInject
 * @constructor
 */
gmfapp.MainController = function($scope, gmfThemes, gmfTreeManager, gmfUser,
    ngeoFeatureHelper, ngeoToolActivateMgr) {

  /**
   * @type {!angular.Scope}
   * @private
   */
  this.scope_ = $scope;

  /**
   * @type {gmfx.User}
   * @export
   */
  this.gmfUser = gmfUser;

  /**
   * @type {ngeo.FeatureHelper}
   * @private
   */
  this.featureHelper_ = ngeoFeatureHelper;

  gmfThemes.loadThemes();

  /**
   * @type {gmf.TreeManager}
   * @export
   */
  this.gmfTreeManager = gmfTreeManager;


  /**
   * @type {ol.layer.Vector}
   * @export
   */
  this.vectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
      wrapX: false,
      features: new ol.Collection()
    }),
    style(feature, resolution) {
      return ngeoFeatureHelper.createEditingStyles(feature);
    }
  });

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
      zoom: 2
    })
  });

  gmfThemes.getThemesObject().then((themes) => {
    if (themes) {
      // Add 'Edit' theme, i.e. the one with id 73
      for (let i = 0, ii = themes.length; i < ii; i++) {
        if (themes[i].id === 73) {
          this.gmfTreeManager.setFirstLevelGroups(themes[i].children);
          break;
        }
      }

      // Add layer vector after
      this.map.addLayer(this.vectorLayer);
    }
  });

 /**
   * @type {boolean}
   * @export
   */
  this.editFeatureSelectorActive = true;

  const editFeatureSelectorToolActivate = new ngeo.ToolActivate(
      this, 'editFeatureSelectorActive');
  ngeoToolActivateMgr.registerTool(
      'mapTools', editFeatureSelectorToolActivate, true);

 /**
   * @type {boolean}
   * @export
   */
  this.dummyActive = false;

  const dummyToolActivate = new ngeo.ToolActivate(
      this, 'dummyActive');
  ngeoToolActivateMgr.registerTool(
      'mapTools', dummyToolActivate, false);

  // initialize tooltips
  $('[data-toggle="tooltip"]').tooltip({
    container: 'body',
    trigger: 'hover'
  });

};


gmfapp.module.controller('MainController', gmfapp.MainController);
