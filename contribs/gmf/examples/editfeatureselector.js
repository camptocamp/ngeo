goog.provide('gmf-editfeatureselector');

goog.require('gmf');
goog.require('gmf.Themes');
goog.require('gmf.TreeManager');
goog.require('gmf.authenticationDirective');
goog.require('gmf.editfeatureselectorDirective');
goog.require('gmf.layertreeDirective');
goog.require('gmf.mapDirective');
goog.require('ngeo.FeatureHelper');
goog.require('ngeo.ToolActivate');
goog.require('ngeo.ToolActivateMgr');
goog.require('ngeo.proj.EPSG21781');
goog.require('ol.Collection');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.layer.Vector');
goog.require('ol.source.OSM');
goog.require('ol.source.Vector');


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['gmf']);


app.module.value('gmfTreeUrl',
    'https://geomapfish-demo.camptocamp.net/2.1/wsgi/themes?version=2&background=background');


app.module.value('gmfWmsUrl',
    'https://geomapfish-demo.camptocamp.net/2.1/wsgi/mapserv_proxy');

app.module.value(
    'authenticationBaseUrl',
    'https://geomapfish-demo.camptocamp.net/2.1/wsgi');


app.module.value('gmfTreeUrl',
    'https://geomapfish-demo.camptocamp.net/2.1/wsgi/themes?version=2&background=background');


app.module.value('gmfLayersUrl',
    'https://geomapfish-demo.camptocamp.net/2.1/wsgi/layers/');


/**
 * @param {!angular.Scope} $scope Angular scope.
 * @param {gmf.Themes} gmfThemes The gmf themes service.
 * @param {gmf.TreeManager} gmfTreeManager gmf Tree Manager service.
 * @param {gmfx.User} gmfUser User.
 * @param {ngeo.FeatureHelper} ngeoFeatureHelper Ngeo feature helper service.
 * @param {ngeo.ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate manager
 *     service.
 * @constructor
 */
app.MainController = function($scope, gmfThemes, gmfTreeManager, gmfUser,
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

  var projection = ol.proj.get('EPSG:21781');
  projection.setExtent([485869.5728, 76443.1884, 837076.5648, 299941.7864]);


  /**
   * @type {ol.layer.Vector}
   * @export
   */
  this.vectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
      wrapX: false,
      features: new ol.Collection()
    }),
    style: function(feature, resolution) {
      return ngeoFeatureHelper.createEditingStyles(feature);
    }
  });

  /**
   * @type {Object|undefined}
   * @export
   */
  this.treeSource = undefined;

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
      projection: projection,
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [537635, 152640],
      zoom: 2
    })
  });

  gmfThemes.getThemesObject().then(function(themes) {
    if (themes) {
      // Add 'Edit' theme, i.e. the one with id 73
      for (var i = 0, ii = themes.length; i < ii; i++) {
        if (themes[i].id === 73) {
          this.gmfTreeManager.addTheme(themes[i]);
          break;
        }
      }
      this.treeSource = this.gmfTreeManager.tree;

      // Add layer vector after
      this.map.addLayer(this.vectorLayer);
    }
  }.bind(this));

 /**
   * @type {boolean}
   * @export
   */
  this.editFeatureSelectorActive = true;

  var editFeatureSelectorToolActivate = new ngeo.ToolActivate(
      this, 'editFeatureSelectorActive');
  ngeoToolActivateMgr.registerTool(
      'mapTools', editFeatureSelectorToolActivate, true);

 /**
   * @type {boolean}
   * @export
   */
  this.dummyActive = false;

  var dummyToolActivate = new ngeo.ToolActivate(
      this, 'dummyActive');
  ngeoToolActivateMgr.registerTool(
      'mapTools', dummyToolActivate, false);

  // initialize tooltips
  $('[data-toggle="tooltip"]').tooltip({
    container: 'body',
    trigger: 'hover'
  });

};


app.module.controller('MainController', app.MainController);
