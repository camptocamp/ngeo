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
import ngeoMapModule from 'ngeo/map/module';

import ngeoMiscBtnComponent from 'ngeo/misc/btnComponent';

import {interactionDecoration} from 'ngeo/misc/decorate';
import olCollection from 'ol/Collection';
import olMap from 'ol/Map';
import olView from 'ol/View';
import olInteractionDraw from 'ol/interaction/Draw';
import olLayerTile from 'ol/layer/Tile';
import olSourceOSM from 'ol/source/OSM';
import olStyleCircle from 'ol/style/Circle';
import olStyleFill from 'ol/style/Fill';
import olStyleStroke from 'ol/style/Stroke';
import olStyleStyle from 'ol/style/Style';

/** @type {angular.IModule} **/
const myModule = angular.module('app', ['gettext', ngeoMapModule.name, ngeoMiscBtnComponent.name]);

/**
 * @param {import('ngeo/map/FeatureOverlayMgr').FeatureOverlayMgr} ngeoFeatureOverlayMgr Feature overlay
 *     manager.
 * @class
 * @ngInject
 */
function MainController(ngeoFeatureOverlayMgr) {
  /**
   * Collection shared between the drawing interactions and the feature
   * overlay used to render the drawn features.
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
      center: [-10997148, 4569099],
      zoom: 4,
    }),
  });

  const map = this.map;

  // initialize the feature overlay manager with the map
  ngeoFeatureOverlayMgr.init(map);

  /**
   * @type {import('ol/interaction/Draw').default}
   */
  this.drawPolygon = new olInteractionDraw(
    /** @type {import('ol/interaction/Draw').Options} */ ({
      type: 'Polygon',
      features: features,
    })
  );

  const drawPolygon = this.drawPolygon;

  drawPolygon.setActive(false);
  interactionDecoration(drawPolygon);
  map.addInteraction(drawPolygon);

  /**
   * @type {import('ol/interaction/Draw').default}
   */
  this.drawPoint = new olInteractionDraw(
    /** @type {import('ol/interaction/Draw').Options} */ ({
      type: 'Point',
      features: features,
    })
  );

  const drawPoint = this.drawPoint;
  drawPoint.setActive(false);
  interactionDecoration(drawPoint);
  map.addInteraction(drawPoint);

  /**
   * @type {import('ol/interaction/Draw').default}
   */
  this.drawLine = new olInteractionDraw(
    /** @type {import('ol/interaction/Draw').Options} */ ({
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
