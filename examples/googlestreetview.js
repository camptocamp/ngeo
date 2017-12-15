goog.provide('app.googlestreetview');

goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');
goog.require('ol.style.Fill');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');
goog.require('ol.style.Text');

goog.require('ngeo.map.module');
goog.require('ngeo.googlestreetview.module');
goog.require('ngeo.ToolActivate');
goog.require('ngeo.ToolActivateMgr');


/** @type {!angular.Module} **/
app.module = angular.module('app', [
  ngeo.module.name,
  ngeo.map.module.name,
  ngeo.googlestreetview.module.name,
  ngeo.ToolActivateMgr.module.name
]);


/**
 * @param {!ngeo.map.FeatureOverlayMgr} ngeoFeatureOverlayMgr Ngeo FeatureOverlay
 *     manager.
 * @param {ngeo.ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate manager
 *     service.
 * @constructor
 * @ngInject
 */
app.MainController = function(ngeoFeatureOverlayMgr, ngeoToolActivateMgr) {

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

  const googleStreetViewToolActivate = new ngeo.ToolActivate(
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

  const dummyToolActivate = new ngeo.ToolActivate(
    this,
    'dummyActive'
  );
  ngeoToolActivateMgr.registerTool(
    'mapTools',
    dummyToolActivate,
    false
  );
};


app.module.controller('MainController', app.MainController);
