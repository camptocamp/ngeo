/**
 * @module app.toolActivate
 */
const exports = {};

import './toolActivate.css';
import ngeoMapModule from 'ngeo/map/module.js';

/** @suppress {extraRequire} */
import ngeoMiscBtnComponent from 'ngeo/misc/btnComponent.js';

import ngeoMiscDecorate from 'ngeo/misc/decorate.js';
import ngeoMiscToolActivate from 'ngeo/misc/ToolActivate.js';
import ngeoMiscToolActivateMgr from 'ngeo/misc/ToolActivateMgr.js';
import olCollection from 'ol/Collection.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import * as olCoordinate from 'ol/coordinate.js';
import olInteractionDraw from 'ol/interaction/Draw.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';
import olStyleCircle from 'ol/style/Circle.js';
import olStyleFill from 'ol/style/Fill.js';
import olStyleStroke from 'ol/style/Stroke.js';
import olStyleStyle from 'ol/style/Style.js';

/** @type {!angular.Module} **/
exports.module = angular.module('app', [
  'gettext',
  ngeoMapModule.name,
  ngeoMiscBtnComponent.name,
  ngeoMiscToolActivateMgr.module.name,
]);


/**
 * @param {ngeo.map.FeatureOverlayMgr} ngeoFeatureOverlayMgr Feature overlay
 *     manager.
 * @param {ngeo.misc.ToolActivateMgr} ngeoToolActivateMgr ToolActivate manager.
 * @constructor
 * @ngInject
 */
exports.MainController = function(ngeoFeatureOverlayMgr, ngeoToolActivateMgr) {

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new olMap({
    layers: [
      new olLayerTile({
        source: new olSourceOSM()
      })
    ],
    view: new olView({
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
  const features = new olCollection();

  const overlay = ngeoFeatureOverlayMgr.getFeatureOverlay();
  overlay.setFeatures(features);
  overlay.setStyle(new olStyleStyle({
    fill: new olStyleFill({
      color: 'rgba(255, 255, 255, 0.2)'
    }),
    stroke: new olStyleStroke({
      color: '#ffcc33',
      width: 2
    }),
    image: new olStyleCircle({
      radius: 7,
      fill: new olStyleFill({
        color: '#ffcc33'
      })
    })
  }));


  // manage clicks on the map
  this.mapClickIsEnabled = true;
  const content = document.getElementById('popup-content');
  this.map.on('singleclick', (evt) => {
    if (this.mapClickIsEnabled) {
      const c = olCoordinate.toStringXY(evt.coordinate);
      content.innerHTML = `<p>You clicked here: <code>${c}</code></p>`;
    }
  });

  const mapClickTool = new ngeoMiscToolActivate(this, 'mapClickIsEnabled');
  ngeoToolActivateMgr.registerTool('mapTools', mapClickTool, true);


  // draw point interaction
  /**
   * @type {ol.interaction.Draw}
   * @export
   */
  this.drawPoint = new olInteractionDraw(
    /** @type {olx.interaction.DrawOptions} */ ({
      type: 'Point',
      features: features
    }));
  this.drawPoint.setActive(false);
  ngeoMiscDecorate.interaction(this.drawPoint);
  map.addInteraction(this.drawPoint);

  const drawPointTool = new ngeoMiscToolActivate(this.drawPoint, 'active');
  ngeoToolActivateMgr.registerTool('mapTools', drawPointTool);

  // draw line interaction
  /**
   * @type {ol.interaction.Draw}
   * @export
   */
  this.drawLine = new olInteractionDraw(
    /** @type {olx.interaction.DrawOptions} */ ({
      type: 'LineString',
      features: features
    }));
  this.drawLine.setActive(false);
  ngeoMiscDecorate.interaction(this.drawLine);
  map.addInteraction(this.drawLine);

  const drawLineTool = new ngeoMiscToolActivate(this.drawLine, 'active');
  ngeoToolActivateMgr.registerTool('mapTools', drawLineTool);

  // draw polygon interaction
  /**
   * @type {ol.interaction.Draw}
   * @export
   */
  this.drawPolygon = new olInteractionDraw(
    /** @type {olx.interaction.DrawOptions} */ ({
      type: 'Polygon',
      features: features
    }));
  this.drawPolygon.setActive(false);
  ngeoMiscDecorate.interaction(this.drawPolygon);
  map.addInteraction(this.drawPolygon);

  const drawPolygonTool = new ngeoMiscToolActivate(this.drawPolygon, 'active');
  ngeoToolActivateMgr.registerTool('mapTools', drawPolygonTool);
};


exports.module.controller('MainController', exports.MainController);


export default exports;
