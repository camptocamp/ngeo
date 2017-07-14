goog.provide('app.createfeature');

goog.require('ngeo.ToolActivate');
goog.require('ngeo.ToolActivateMgr');
/** @suppress {extraRequire} */
goog.require('ngeo.btngroupDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.btnDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.createfeatureDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.mapDirective');
goog.require('ol.Collection');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.layer.Vector');
goog.require('ol.source.OSM');
goog.require('ol.source.Vector');


/** @type {!angular.Module} **/
app.module = angular.module('app', ['ngeo']);


/**
 * @param {ngeo.ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate manager
 *     service.
 * @constructor
 * @ngInject
 */
app.MainController = function(ngeoToolActivateMgr) {

  /**
   * @type {ol.Collection}
   * @export
   */
  this.features = new ol.Collection();

  /**
   * @type {string}
   * @export
   */
  this.pointGeomType = ngeo.GeometryType.POINT;

  /**
   * @type {string}
   * @export
   */
  this.lineStringGeomType = ngeo.GeometryType.LINE_STRING;

  /**
   * @type {string}
   * @export
   */
  this.polygonGeomType = ngeo.GeometryType.POLYGON;

  const vector = new ol.layer.Vector({
    source: new ol.source.Vector({
      wrapX: false,
      features: this.features
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
      }),
      vector
    ],
    view: new ol.View({
      center: [0, 0],
      zoom: 3
    })
  });

  /**
   * @type {boolean}
   * @export
   */
  this.createPointActive = false;

  const createPointToolActivate = new ngeo.ToolActivate(
    this,
    'createPointActive'
  );
  ngeoToolActivateMgr.registerTool(
    'mapTools',
    createPointToolActivate,
    false
  );

  /**
   * @type {boolean}
   * @export
   */
  this.createLineStringActive = false;

  const createLineStringToolActivate = new ngeo.ToolActivate(
    this,
    'createLineStringActive'
  );
  ngeoToolActivateMgr.registerTool(
    'mapTools',
    createLineStringToolActivate,
    false
  );

  /**
   * @type {boolean}
   * @export
   */
  this.createPolygonActive = false;

  const createPolygonToolActivate = new ngeo.ToolActivate(
    this,
    'createPolygonActive'
  );
  ngeoToolActivateMgr.registerTool(
    'mapTools',
    createPolygonToolActivate,
    false
  );

  /**
   * @type {boolean}
   * @export
   */
  this.dummyActive = true;

  const dummyToolActivate = new ngeo.ToolActivate(
    this,
    'dummyActive'
  );
  ngeoToolActivateMgr.registerTool(
    'mapTools',
    dummyToolActivate,
    true
  );
};


app.module.controller('MainController', app.MainController);
