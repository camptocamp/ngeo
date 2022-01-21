// The MIT License (MIT)
//
// Copyright (c) 2014-2022 Camptocamp SA
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
import gmfMapComponent from 'gmf/map/component';
import options from './options';

import ngeoMiscBtnComponent from 'ngeo/misc/btnComponent';

import {interactionDecoration} from 'ngeo/misc/decorate';
import ngeoMiscToolActivate from 'ngeo/misc/ToolActivate';
import ngeoMiscToolActivateMgr from 'ngeo/misc/ToolActivateMgr';
import olCollection from 'ol/Collection';
import olMap from 'ol/Map';
import olView from 'ol/View';
import * as olCoordinate from 'ol/coordinate';
import olInteractionDraw from 'ol/interaction/Draw';
import olLayerTile from 'ol/layer/Tile';
import olSourceOSM from 'ol/source/OSM';
import olStyleCircle from 'ol/style/Circle';
import olStyleFill from 'ol/style/Fill';
import olStyleStroke from 'ol/style/Stroke';
import olStyleStyle from 'ol/style/Style';

/** @type {angular.IModule} **/
const myModule = angular.module('app', [
  'gettext',
  gmfMapComponent.name,
  ngeoMiscBtnComponent.name,
  ngeoMiscToolActivateMgr.name,
]);

/**
 * @param {import('ngeo/map/FeatureOverlayMgr').FeatureOverlayMgr} ngeoFeatureOverlayMgr Feature overlay
 *     manager.
 * @param {import('ngeo/misc/ToolActivateMgr').ToolActivateMgr} ngeoToolActivateMgr ToolActivate manager.
 * @class
 * @ngInject
 */
function MainController(ngeoFeatureOverlayMgr, ngeoToolActivateMgr) {
  /**
   * @type {import('ol/Map').default}
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
   *
   * @type {import('ol/Collection').default<import('ol/Feature').default<import('ol/geom/Geometry').default>>}
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
    /** @type {import('ol/Observable').EventTypes} */ ('singleclick'),
    /** @type {function(?): ?} */ (
      /**
       * @param {import('ol/MapBrowserEvent').default<unknown>} evt
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
   * @type {import('ol/interaction/Draw').default}
   */
  this.drawPoint = new olInteractionDraw(
    /** @type {import('ol/interaction/Draw').Options} */ ({
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
   * @type {import('ol/interaction/Draw').default}
   */
  this.drawLine = new olInteractionDraw(
    /** @type {import('ol/interaction/Draw').Options} */ ({
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
   * @type {import('ol/interaction/Draw').default}
   */
  this.drawPolygon = new olInteractionDraw(
    /** @type {import('ol/interaction/Draw').Options} */ ({
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
options(myModule);

export default myModule;
