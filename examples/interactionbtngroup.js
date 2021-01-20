// The MIT License (MIT)
//
// Copyright (c) 2014-2021 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

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

/** @type {angular.IModule} **/
const myModule = angular.module('app', ['gettext', ngeoMapModule.name, ngeoMiscBtnComponent.name]);

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
   * @type {import("ol/Collection.js").default<import('ol/Feature.js').default<import("ol/geom/Geometry.js").default>>}
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

myModule.controller('MainController', MainController);

export default myModule;
