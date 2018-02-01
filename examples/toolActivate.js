goog.provide('app.toolActivate');

// webpack: import './toolActivate.css';
// webpack: import './common_dependencies.js';
goog.require('ngeo');
goog.require('ngeo.map.module');
/** @suppress {extraRequire} */
goog.require('ngeo.misc.btnComponent');
goog.require('ngeo.misc.decorate');
goog.require('ngeo.misc.ToolActivate');
goog.require('ngeo.misc.ToolActivateMgr');
goog.require('ol.Collection');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol');
goog.require('ol.coordinate');
goog.require('ol.interaction.Draw');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');
goog.require('ol.style.Circle');
goog.require('ol.style.Fill');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');

/** @type {!angular.Module} **/
app.toolActivate.module = angular.module('app', [
  ngeo.map.module.name,
  ngeo.misc.btnComponent.name,
  ngeo.misc.ToolActivateMgr.module.name,
]);


/**
 * @param {ngeo.map.FeatureOverlayMgr} ngeoFeatureOverlayMgr Feature overlay
 *     manager.
 * @param {ngeo.misc.ToolActivateMgr} ngeoToolActivateMgr ToolActivate manager.
 * @constructor
 * @ngInject
 */
app.toolActivate.MainController = function(ngeoFeatureOverlayMgr, ngeoToolActivateMgr) {

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
      center: [1444682, 5979706],
      zoom: 4
    })
  });

  const map = this.map;

  // initialize the feature overlay manager with the map
  ngeoFeatureOverlayMgr.init(map);

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


  // manage clicks on the map
  this.mapClickIsEnabled = true;
  const content = document.getElementById('popup-content');
  this.map.on('singleclick', (evt) => {
    if (this.mapClickIsEnabled) {
      const c = ol.coordinate.toStringXY(evt.coordinate);
      content.innerHTML = `<p>You clicked here: <code>${c}</code></p>`;
    }
  });

  const mapClickTool = new ngeo.misc.ToolActivate(this, 'mapClickIsEnabled');
  ngeoToolActivateMgr.registerTool('mapTools', mapClickTool, true);


  // draw point interaction
  /**
   * @type {ol.interaction.Draw}
   * @export
   */
  this.drawPoint = new ol.interaction.Draw(
    /** @type {olx.interaction.DrawOptions} */ ({
      type: 'Point',
      features: features
    }));
  this.drawPoint.setActive(false);
  ngeo.misc.decorate.interaction(this.drawPoint);
  map.addInteraction(this.drawPoint);

  const drawPointTool = new ngeo.misc.ToolActivate(this.drawPoint, 'active');
  ngeoToolActivateMgr.registerTool('mapTools', drawPointTool);

  // draw line interaction
  /**
   * @type {ol.interaction.Draw}
   * @export
   */
  this.drawLine = new ol.interaction.Draw(
    /** @type {olx.interaction.DrawOptions} */ ({
      type: 'LineString',
      features: features
    }));
  this.drawLine.setActive(false);
  ngeo.misc.decorate.interaction(this.drawLine);
  map.addInteraction(this.drawLine);

  const drawLineTool = new ngeo.misc.ToolActivate(this.drawLine, 'active');
  ngeoToolActivateMgr.registerTool('mapTools', drawLineTool);

  // draw polygon interaction
  /**
   * @type {ol.interaction.Draw}
   * @export
   */
  this.drawPolygon = new ol.interaction.Draw(
    /** @type {olx.interaction.DrawOptions} */ ({
      type: 'Polygon',
      features: features
    }));
  this.drawPolygon.setActive(false);
  ngeo.misc.decorate.interaction(this.drawPolygon);
  map.addInteraction(this.drawPolygon);

  const drawPolygonTool = new ngeo.misc.ToolActivate(this.drawPolygon, 'active');
  ngeoToolActivateMgr.registerTool('mapTools', drawPolygonTool);
};


app.toolActivate.module.controller('MainController', app.toolActivate.MainController);
