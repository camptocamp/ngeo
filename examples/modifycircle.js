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
import ngeoFormatFeatureProperties from 'ngeo/format/FeatureProperties.js';

import ngeoInteractionModifyCircle from 'ngeo/interaction/ModifyCircle.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olLayerVector from 'ol/layer/Vector.js';
import olSourceOSM from 'ol/source/OSM.js';
import olSourceVector from 'ol/source/Vector.js';
import olGeomCircle from 'ol/geom/Circle.js';
import {fromCircle} from 'ol/geom/Polygon.js';
import olCollection from 'ol/Collection.js';
import olFeature from 'ol/Feature.js';
import ngeoMapModule from 'ngeo/map/module.js';

/** @type {angular.IModule} **/
const appmodule = angular.module('app', ['gettext', ngeoMapModule.name]);

/**
 * @constructor
 * @ngInject
 */
function MainController() {
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

  const circle = new olGeomCircle([-10691093, 4966327], 465000);

  /**
   * @type {import("ol/Collection.js").default<olFeature<import("ol/geom/Geometry.js").default>>}
   */
  this.features = new olCollection();

  const circleFeature = new olFeature({
    geometry: fromCircle(circle),
    color: '#000000',
    label: 'Circle 1',
    opacity: '0.5',
    stroke: '2',
  });

  circleFeature.set(ngeoFormatFeatureProperties.IS_CIRCLE, true);
  this.features.push(circleFeature);

  const vectorSource = new olSourceVector({
    features: this.features,
  });
  const vectorLayer = new olLayerVector({
    source: vectorSource,
  });

  // Use vectorLayer.setMap(map) rather than map.addLayer(vectorLayer). This
  // makes the vector layer "unmanaged", meaning that it is always on top.
  vectorLayer.setMap(map);

  /**
   * @type {import("ngeo/interaction/ModifyCircle.js").default}
   */
  this.interaction = new ngeoInteractionModifyCircle(
    /** @type {import('ol/interaction/Modify.js').Options} */ ({
      features: this.features,
    })
  );

  const interaction = this.interaction;
  interaction.setActive(true);
  map.addInteraction(interaction);
}

appmodule.controller('MainController', MainController);

export default module;
