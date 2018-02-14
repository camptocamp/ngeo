goog.provide('app.googlestreetview');

// webpack: import './googlestreetview.css';
// webpack: import './common_dependencies.js';
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');
goog.require('ol.style.Fill');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');
goog.require('ol.style.Text');
goog.require('ngeo.googlestreetview.module');
goog.require('ngeo.map.module');
goog.require('ngeo.misc.ToolActivate');
goog.require('ngeo.misc.ToolActivateMgr');


/** @type {!angular.Module} **/
app.googlestreetview.module = angular.module('app', [
  ngeo.map.module.name,
  ngeo.googlestreetview.module.name,
  ngeo.misc.ToolActivateMgr.module.name
]);


/**
 * @param {!ngeo.map.FeatureOverlayMgr} ngeoFeatureOverlayMgr Ngeo FeatureOverlay
 *     manager.
 * @param {ngeo.misc.ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate manager
 *     service.
 * @constructor
 * @ngInject
 */
app.googlestreetview.MainController = function(ngeoFeatureOverlayMgr, ngeoToolActivateMgr) {

  /**
   * @type {number}
   * @export
   */
  this.radius = 500;

  /**
   * @type {!ol.style.Style}
   * @export
   */
  this.style = new ol.style.Style({
    text: new ol.style.Text({
      fill: new ol.style.Fill({color: '#279B61'}),
      font: 'normal 30px FontAwesome',
      offsetY: -15,
      stroke: new ol.style.Stroke({color: '#ffffff', width: 3}),
      text: '\uf041'
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
      center: [-7910687, 6178318],
      zoom: 17
    })
  });

  ngeoFeatureOverlayMgr.init(this.map);

  /**
   * @type {boolean}
   * @export
   */
  this.googleStreetViewActive = true;

  const googleStreetViewToolActivate = new ngeo.misc.ToolActivate(
    this,
    'googleStreetViewActive'
  );
  ngeoToolActivateMgr.registerTool(
    'mapTools',
    googleStreetViewToolActivate,
    true
  );

  /**
   * @type {boolean}
   * @export
   */
  this.dummyActive = false;

  const dummyToolActivate = new ngeo.misc.ToolActivate(
    this,
    'dummyActive'
  );
  ngeoToolActivateMgr.registerTool(
    'mapTools',
    dummyToolActivate,
    false
  );
};


app.googlestreetview.module.controller('MainController', app.googlestreetview.MainController);
