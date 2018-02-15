goog.provide('app.createfeature');

// webpack: import './createfeature.css';
// webpack: import './common_dependencies.js';
/** @suppress {extraRequire} */
goog.require('ngeo.editing.createfeatureComponent');
goog.require('ngeo.GeometryType');
/** @suppress {extraRequire} */
goog.require('ngeo.misc.btnComponent');
goog.require('ngeo.misc.ToolActivate');
goog.require('ngeo.misc.ToolActivateMgr');
goog.require('ol.Collection');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.layer.Vector');
goog.require('ol.source.OSM');
goog.require('ol.source.Vector');
goog.require('ngeo.map.module');


/** @type {!angular.Module} **/
app.createfeature.module = angular.module('app', [
  ngeo.map.module.name,
  ngeo.misc.btnComponent.name,
  ngeo.misc.ToolActivateMgr.module.name,
  ngeo.editing.createfeatureComponent.name,
]);


/**
 * @param {ngeo.misc.ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate manager
 *     service.
 * @constructor
 * @ngInject
 */
app.createfeature.MainController = function(ngeoToolActivateMgr) {

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

  const createPointToolActivate = new ngeo.misc.ToolActivate(
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

  const createLineStringToolActivate = new ngeo.misc.ToolActivate(
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

  const createPolygonToolActivate = new ngeo.misc.ToolActivate(
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

  const dummyToolActivate = new ngeo.misc.ToolActivate(
    this,
    'dummyActive'
  );
  ngeoToolActivateMgr.registerTool(
    'mapTools',
    dummyToolActivate,
    true
  );
};


app.createfeature.module.controller('MainController', app.createfeature.MainController);
