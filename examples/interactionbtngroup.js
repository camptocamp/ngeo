import './interactionbtngroup.css';
import angular from 'angular';
import ngeoMapModule from 'ngeo/map/module.js';

import ngeoMiscBtnComponent from 'ngeo/misc/btnComponent.js';

import {interactionDecoration} from 'ngeo/misc/decorate.js';
import olCollection from 'ol/Collection.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olInteractionDraw from 'ol/interaction/Draw.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';
import olStyleCircle from 'ol/style/Circle.js';
import olStyleFill from 'ol/style/Fill.js';
import olStyleStroke from 'ol/style/Stroke.js';
import olStyleStyle from 'ol/style/Style.js';

/** @type {!angular.IModule} **/
const module = angular.module('app', ['gettext', ngeoMapModule.name, ngeoMiscBtnComponent.name]);

/**
 * @param {import("ngeo/map/FeatureOverlayMgr.js").FeatureOverlayMgr} ngeoFeatureOverlayMgr Feature overlay
 *     manager.
 * @constructor
 * @ngInject
 */
function MainController(ngeoFeatureOverlayMgr) {
  /**
   * Collection shared between the drawing interactions and the feature
   * overlay used to render the drawn features.
   * @type {import("ol/Collection.js").default.<import("ol/Feature.js").default>}
   */
  const features = new olCollection();

  const overlay = ngeoFeatureOverlayMgr.getFeatureOverlay();
  overlay.setFeatures(features);
  overlay.setStyle(
    new olStyleStyle({
      fill: new olStyleFill({
        color: 'rgba(255, 255, 255, 0.2)',
      }),
      stroke: new olStyleStroke({
        color: '#ffcc33',
        width: 2,
      }),
      image: new olStyleCircle({
        radius: 7,
        fill: new olStyleFill({
          color: '#ffcc33',
        }),
      }),
    })
  );

  /**
   * @type {import("ol/Map.js").default}
   */
  this.map = new olMap({
    layers: [
      new olLayerTile({
        source: new olSourceOSM(),
      }),
    ],
    view: new olView({
      center: [-10997148, 4569099],
      zoom: 4,
    }),
  });

  const map = this.map;

  // initialize the feature overlay manager with the map
  ngeoFeatureOverlayMgr.init(map);

  /**
   * @type {import("ol/interaction/Draw.js").default}
   */
  this.drawPolygon = new olInteractionDraw(
    /** @type {import('ol/interaction/Draw.js').Options} */ ({
      type: 'Polygon',
      features: features,
    })
  );

  const drawPolygon = this.drawPolygon;

  drawPolygon.setActive(false);
  interactionDecoration(drawPolygon);
  map.addInteraction(drawPolygon);

  /**
   * @type {import("ol/interaction/Draw.js").default}
   */
  this.drawPoint = new olInteractionDraw(
    /** @type {import('ol/interaction/Draw.js').Options} */ ({
      type: 'Point',
      features: features,
    })
  );

  const drawPoint = this.drawPoint;
  drawPoint.setActive(false);
  interactionDecoration(drawPoint);
  map.addInteraction(drawPoint);

  /**
   * @type {import("ol/interaction/Draw.js").default}
   */
  this.drawLine = new olInteractionDraw(
    /** @type {import('ol/interaction/Draw.js').Options} */ ({
      type: 'LineString',
      features: features,
    })
  );

  const drawLine = this.drawLine;
  drawLine.setActive(false);
  interactionDecoration(drawLine);
  map.addInteraction(drawLine);
}

module.controller('MainController', MainController);

export default module;
