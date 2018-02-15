goog.provide('app.interactionbtngroup');

// webpack: import './interactionbtngroup.css';
// webpack: import './common_dependencies.js';
goog.require('ngeo.map.module');
/** @suppress {extraRequire} */
goog.require('ngeo.misc.btnComponent');
goog.require('ngeo.misc.decorate');
goog.require('ol.Collection');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.interaction.Draw');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');
goog.require('ol.style.Circle');
goog.require('ol.style.Fill');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');


/** @type {!angular.Module} **/
app.interactionbtngroup.module = angular.module('app', [
  ngeo.map.module.name,
  ngeo.misc.btnComponent.name,
]);


/**
 * @param {ngeo.map.FeatureOverlayMgr} ngeoFeatureOverlayMgr Feature overlay
 *     manager.
 * @constructor
 * @ngInject
 */
app.interactionbtngroup.MainController = function(ngeoFeatureOverlayMgr) {

  /**
   * Collection shared between the drawing interactions and the feature
   * overlay used to render the drawn features.
   * @type {ol.Collection.<ol.Feature>}
   */
  const features = new ol.Collection();

  const overlay = ngeoFeatureOverlayMgr.getFeatureOverlay();
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
      center: [-10997148, 4569099],
      zoom: 4
    })
  });

  const map = this.map;

  // initialize the feature overlay manager with the map
  ngeoFeatureOverlayMgr.init(map);

  /**
   * @type {ol.interaction.Draw}
   * @export
   */
  this.drawPolygon = new ol.interaction.Draw(
    /** @type {olx.interaction.DrawOptions} */ ({
      type: 'Polygon',
      features: features
    }));

  const drawPolygon = this.drawPolygon;

  drawPolygon.setActive(false);
  ngeo.misc.decorate.interaction(drawPolygon);
  map.addInteraction(drawPolygon);

  /**
   * @type {ol.interaction.Draw}
   * @export
   */
  this.drawPoint = new ol.interaction.Draw(
    /** @type {olx.interaction.DrawOptions} */ ({
      type: 'Point',
      features: features
    }));

  const drawPoint = this.drawPoint;
  drawPoint.setActive(false);
  ngeo.misc.decorate.interaction(drawPoint);
  map.addInteraction(drawPoint);

  /**
   * @type {ol.interaction.Draw}
   * @export
   */
  this.drawLine = new ol.interaction.Draw(
    /** @type {olx.interaction.DrawOptions} */ ({
      type: 'LineString',
      features: features
    }));

  const drawLine = this.drawLine;
  drawLine.setActive(false);
  ngeo.misc.decorate.interaction(drawLine);
  map.addInteraction(drawLine);

};


app.interactionbtngroup.module.controller('MainController', app.interactionbtngroup.MainController);
