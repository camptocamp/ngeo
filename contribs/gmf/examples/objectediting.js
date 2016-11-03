goog.provide('gmf-objectediting');

goog.require('gmf.mapDirective');
goog.require('gmf.objecteditingDirective');
goog.require('gmf.ObjectEditingManager');
goog.require('ngeo.ToolActivate');
goog.require('ngeo.ToolActivateMgr');
goog.require('ngeo.proj.EPSG21781');
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


app.module.value('gmfLayersUrl',
    'https://geomapfish-demo.camptocamp.net/2.1/wsgi/layers/');


/**
 * @param {gmf.ObjectEditingManager} gmfObjectEditingManager The gmf
 *     ObjectEditing manager service.
 * @param {ngeo.ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate manager
 *     service.
 * @constructor
 */
app.MainController = function(gmfObjectEditingManager, ngeoToolActivateMgr) {

  var projection = ol.proj.get('EPSG:21781');
  projection.setExtent([485869.5728, 76443.1884, 837076.5648, 299941.7864]);

  /**
   * @type {ol.source.Vector}
   * @private
   */
  this.vectorSource_ = new ol.source.Vector({
    wrapX: false
  });

  var vectorLayer = new ol.layer.Vector({
    source: this.vectorSource_
  });

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      }),
      vectorLayer
    ],
    view: new ol.View({
      projection: projection,
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [537635, 152640],
      zoom: 2
    })
  });

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


app.module.controller('MainController', app.MainController);
