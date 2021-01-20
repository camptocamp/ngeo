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

import angular from 'angular';
import ngeoMapModule from 'ngeo/map/module.js';

import ngeoMiscBtnComponent from 'ngeo/misc/btnComponent.js';

import {interactionDecoration} from 'ngeo/misc/decorate.js';
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

/** @type {angular.IModule} **/
const myModule = angular.module('app', [
  'gettext',
  ngeoMapModule.name,
  ngeoMiscBtnComponent.name,
  ngeoMiscToolActivateMgr.name,
]);

/**
 * @param {import("ngeo/map/FeatureOverlayMgr.js").FeatureOverlayMgr} ngeoFeatureOverlayMgr Feature overlay
 *     manager.
 * @param {import("ngeo/misc/ToolActivateMgr.js").ToolActivateMgr} ngeoToolActivateMgr ToolActivate manager.
 * @constructor
 * @ngInject
 */
function MainController(ngeoFeatureOverlayMgr, ngeoToolActivateMgr) {
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
      center: [1444682, 5979706],
      zoom: 4,
    }),
  });

  const map = this.map;

  // initialize the feature overlay manager with the map
  ngeoFeatureOverlayMgr.init(map);

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

  // manage clicks on the map
  this.mapClickIsEnabled = true;
  const content = document.getElementById('popup-content');
  if (!content) {
    throw new Error('Missing content');
  }
  this.map.on(
    'singleclick',
    /** @type {function(?): ?} */ (
      /**
       * @param {import('ol/MapBrowserEvent.js').default<unknown>} evt
       */
      (evt) => {
        if (this.mapClickIsEnabled) {
          const c = olCoordinate.toStringXY(evt.coordinate);
          content.innerHTML = `<p>You clicked here: <code>${c}</code></p>`;
        }
      }
    )
  );

  const mapClickTool = new ngeoMiscToolActivate(this, 'mapClickIsEnabled');
  ngeoToolActivateMgr.registerTool('mapTools', mapClickTool, true);

  // draw point interaction
  /**
   * @type {import("ol/interaction/Draw.js").default}
   */
  this.drawPoint = new olInteractionDraw(
    /** @type {import('ol/interaction/Draw.js').Options} */ ({
      type: 'Point',
      features: features,
    })
  );
  this.drawPoint.setActive(false);
  interactionDecoration(this.drawPoint);
  map.addInteraction(this.drawPoint);

  const drawPointTool = new ngeoMiscToolActivate(this.drawPoint, 'active');
  ngeoToolActivateMgr.registerTool('mapTools', drawPointTool);

  // draw line interaction
  /**
   * @type {import("ol/interaction/Draw.js").default}
   */
  this.drawLine = new olInteractionDraw(
    /** @type {import('ol/interaction/Draw.js').Options} */ ({
      type: 'LineString',
      features: features,
    })
  );
  this.drawLine.setActive(false);
  interactionDecoration(this.drawLine);
  map.addInteraction(this.drawLine);

  const drawLineTool = new ngeoMiscToolActivate(this.drawLine, 'active');
  ngeoToolActivateMgr.registerTool('mapTools', drawLineTool);

  // draw polygon interaction
  /**
   * @type {import("ol/interaction/Draw.js").default}
   */
  this.drawPolygon = new olInteractionDraw(
    /** @type {import('ol/interaction/Draw.js').Options} */ ({
      type: 'Polygon',
      features: features,
    })
  );
  this.drawPolygon.setActive(false);
  interactionDecoration(this.drawPolygon);
  map.addInteraction(this.drawPolygon);

  const drawPolygonTool = new ngeoMiscToolActivate(this.drawPolygon, 'active');
  ngeoToolActivateMgr.registerTool('mapTools', drawPolygonTool);
}

myModule.controller('MainController', MainController);

export default myModule;
