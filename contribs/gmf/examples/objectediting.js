goog.provide('gmfapp.objectediting');

goog.require('gmf.Themes');
goog.require('gmf.TreeManager');
/** @suppress {extraRequire} */
goog.require('gmf.layertreeDirective');
/** @suppress {extraRequire} */
goog.require('gmf.mapDirective');
/** @suppress {extraRequire} */
goog.require('gmf.objecteditingDirective');
goog.require('gmf.ObjectEditingManager');
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


/**
 * @param {gmf.ObjectEditingManager} gmfObjectEditingManager The gmf
 *     ObjectEditing manager service.
 * @param {gmf.Themes} gmfThemes The gmf themes service.
 * @param {gmf.TreeManager} gmfTreeManager gmf Tree Manager service.
 * @param {ngeo.ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate manager
 *     service.
 * @constructor
 * @ngInject
 */
gmfapp.MainController = function(gmfObjectEditingManager, gmfThemes,
    gmfTreeManager, ngeoToolActivateMgr) {

  /**
   * @type {gmf.TreeManager}
   * @private
   */
  this.gmfTreeManager_ = gmfTreeManager;

  gmfThemes.loadThemes();

  var projection = ol.proj.get('EPSG:21781');
  projection.setExtent([485869.5728, 76443.1884, 837076.5648, 299941.7864]);

  /**
   * @type {ol.source.Vector}
   * @private
   */
  this.vectorSource_ = new ol.source.Vector({
    wrapX: false
  });

  /**
   * @type {ol.layer.Vector}
   * @private
   */
  this.vectorLayer_ = new ol.layer.Vector({
    source: this.vectorSource_
  });

  /**
   * @type {ol.Collection.<ol.Feature>}
   * @export
   */
  this.sketchFeatures = new ol.Collection();

  /**
   * @type {ol.layer.Vector}
   * @private
   */
  this.sketchLayer_ = new ol.layer.Vector({
    source: new ol.source.Vector({
      features: this.sketchFeatures,
      wrapX: false
    })
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

  gmfThemes.getThemesObject().then(function(themes) {
    if (themes) {
      // Add layer vector after
      this.map.addLayer(this.vectorLayer_);
      this.map.addLayer(this.sketchLayer_);
    }
  }.bind(this));

  /**
   * @type {?string}
   * @export
   */
  this.objectEditingGeomType = gmfObjectEditingManager.getGeomType();

  /**
   * @type {?number}
   * @export
   */
  this.objectEditingLayerNodeId = gmfObjectEditingManager.getLayerNodeId();

  /**
   * @type {boolean}
   * @export
   */
  this.objectEditingActive = true;

  var objectEditingToolActivate = new ngeo.ToolActivate(
    this, 'objectEditingActive');
  ngeoToolActivateMgr.registerTool(
    'mapTools', objectEditingToolActivate, true);

  /**
   * @type {boolean}
   * @export
   */
  this.dummyActive = false;

  var dummyToolActivate = new ngeo.ToolActivate(
    this, 'dummyActive');
  ngeoToolActivateMgr.registerTool(
    'mapTools', dummyToolActivate, false);

  /**
   * @type {?ol.Feature}
   * @export
   */
  this.objectEditingFeature = null;

  gmfObjectEditingManager.getFeature().then(function(feature) {
    this.objectEditingFeature = feature;
    if (feature) {
      this.vectorSource_.addFeature(feature);
    }
  }.bind(this));

};

gmfapp.module.controller('MainController', gmfapp.MainController);
