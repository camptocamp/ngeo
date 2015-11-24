goog.provide('toolActivate');

goog.require('ngeo.FeatureOverlayMgr');
goog.require('ngeo.ToolActivate');
goog.require('ngeo.ToolActivateMgr');
goog.require('ngeo.btngroupDirective');
goog.require('ngeo.mapDirective');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.geom.Point');
goog.require('ol.interaction.Draw');
goog.require('ol.layer.Tile');
goog.require('ol.source.MapQuest');
goog.require('ol.style.Circle');
goog.require('ol.style.Fill');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['ngeo']);



/**
 * @param {ngeo.FeatureOverlayMgr} ngeoFeatureOverlayMgr Feature overlay
 *     manager.
 * @param {ngeo.ToolActivateMgr} ngeoToolActivateMgr ToolActivate manager.
 * @constructor
 * @ngInject
 */
app.MainController = function(ngeoFeatureOverlayMgr, ngeoToolActivateMgr) {

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.MapQuest({layer: 'sat'})
      })
    ],
    view: new ol.View({
      center: [1444682, 5979706],
      zoom: 4
    })
  });

  var map = this.map;

  // initialize the feature overlay manager with the map
  ngeoFeatureOverlayMgr.init(map);

  /**
   * Collection shared between the drawing interactions and the feature
   * overlay used to render the drawn features.
   * @type {ol.Collection.<ol.Feature>}
   */
  var features = new ol.Collection();

  var overlay = ngeoFeatureOverlayMgr.getFeatureOverlay();
  overlay.setFeatures(features);
  overlay.setStyle(new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgba(255, 255, 255, 0.2)'
    }),
    stroke: new ol.style.Stroke({
      color: '#ffcc33',
      width: 2
    }),
    image: new ol.style.Circle({
      radius: 7,
      fill: new ol.style.Fill({
        color: '#ffcc33'
      })
    })
  }));


  //Manage click on the map
  var mapClickIsEnable = true;
  var content = document.getElementById('popup-content');
  this.map.on('singleclick', function(evt) {
    if (mapClickIsEnable) {
      var c = ol.coordinate.toStringXY(evt.coordinate);
      content.innerHTML = '<p>You clicked here: <code>' + c + '</code></p>';
    }
  });

  var activeMapClick = function() {
    mapClickIsEnable = true;
  };
  var deactiveMapClick = function() {
    mapClickIsEnable = false;
  };

  var mapClickToolActivate = new ngeo.ToolActivate('mapTools', activeMapClick,
      deactiveMapClick, true);

  ngeoToolActivateMgr.registerTool(mapClickToolActivate);


  //Create and manage point

  /**
   * @type {function()}
   * @export
   */
  this.togglePoint = function() {
    if (drawPoint.getActive()) {
      ngeoToolActivateMgr.deactivateTool(pointToolActivate);
    } else {
      ngeoToolActivateMgr.activateTool(pointToolActivate);
    }
  };

  /**
   * @type {ol.interaction.Draw}
   * @export
   */
  this.drawPoint = new ol.interaction.Draw(
      /** @type {olx.interaction.DrawOptions} */ ({
        type: 'Point',
        features: features
      }));
  var drawPoint = this.drawPoint;
  drawPoint.setActive(false);
  map.addInteraction(drawPoint);

  var activePoint = function() {
    drawPoint.setActive(true);
  };
  var deactivePoint = function() {
    drawPoint.setActive(false);
  };

  var pointToolActivate = new ngeo.ToolActivate('mapTools', activePoint,
      deactivePoint);

  ngeoToolActivateMgr.registerTool(pointToolActivate);


  //Create and Manage polygon

  /**
   * @type {function()}
   * @export
   */
  this.togglePolygon = function() {
    if (drawPolygon.getActive()) {
      ngeoToolActivateMgr.deactivateTool(polygonToolActivate);
    } else {
      ngeoToolActivateMgr.activateTool(polygonToolActivate);
    }
  };

  /**
   * @type {ol.interaction.Draw}
   * @export
   */
  this.drawPolygon = new ol.interaction.Draw(
      /** @type {olx.interaction.DrawOptions} */ ({
        type: 'Polygon',
        features: features
      }));
  var drawPolygon = this.drawPolygon;
  drawPolygon.setActive(false);
  map.addInteraction(drawPolygon);

  var activePolygon = function() {
    drawPolygon.setActive(true);
  };
  var deactivePolygon = function() {
    drawPolygon.setActive(false);
  };

  var polygonToolActivate = new ngeo.ToolActivate('mapTools', activePolygon,
      deactivePolygon);

  ngeoToolActivateMgr.registerTool(polygonToolActivate);

};


app.module.controller('MainController', app.MainController);
