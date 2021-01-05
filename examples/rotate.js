// The MIT License (MIT)
//
// Copyright (c) 2016-2021 Camptocamp SA
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
import ngeoInteractionRotate from 'ngeo/interaction/Rotate.js';

import olCollection from 'ol/Collection.js';
import olFeature from 'ol/Feature.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olLayerVector from 'ol/layer/Vector.js';
import olSourceOSM from 'ol/source/OSM.js';
import olSourceVector from 'ol/source/Vector.js';
import olStyleText from 'ol/style/Text.js';
import olStyleStroke from 'ol/style/Stroke.js';
import olStyleStyle from 'ol/style/Style.js';
import olStyleFill from 'ol/style/Fill.js';
import olStyleCircle from 'ol/style/Circle.js';
import olGeomPolygon from 'ol/geom/Polygon.js';
import ngeoMapModule from 'ngeo/map/module.js';

/** @type {angular.IModule} **/
const module = angular.module('app', ['gettext', ngeoMapModule.name]);

/** @type {angular.IModule} **/
const appmodule = angular.module('app', ['ngeo']);

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

  const polygon = new olGeomPolygon([
    [
      [-9e6, 4e6],
      [-11e6, 4e6],
      [-11e6, 6e6],
      [-9e6, 6e6],
    ],
  ]);

  /**
   * @type {import("ol/Collection.js").default<olFeature<import("ol/geom/Geometry.js").default>>}
   */
  this.features = new olCollection();

  this.features.push(
    new olFeature({
      geometry: polygon,
    })
  );

  const vectorSource = new olSourceVector({
    features: this.features,
  });
  const vectorLayer = new olLayerVector({
    source: vectorSource,
  });

  // Use vectorLayer.setMap(map) rather than map.addLayer(vectorLayer). This
  // makes the vector layer "unmanaged", meaning that it is always on top.
  vectorLayer.setMap(map);

  /** @type {import("ol/style/Style.js").StyleLike} */
  const style = (function () {
    /** @type {Object<string, olStyleStyle|olStyleStyle[]>} */
    const styles = {};
    styles.Polygon = [
      new olStyleStyle({
        fill: new olStyleFill({
          color: [255, 255, 255, 0.5],
        }),
      }),
      new olStyleStyle({
        stroke: new olStyleStroke({
          color: [255, 255, 255, 1],
          width: 5,
        }),
      }),
      new olStyleStyle({
        stroke: new olStyleStroke({
          color: [0, 153, 255, 1],
          width: 3,
        }),
      }),
    ];
    styles.Point = new olStyleStyle({
      image: new olStyleCircle(),
      text: new olStyleText({
        text: '\uf01e',
        font: '900 18px "Font Awesome 5 Free"',
        fill: new olStyleFill({
          color: '#ffffff',
        }),
      }),
    });

    styles.GeometryCollection = styles.Polygon.concat(styles.Point);

    return (
      /**
       * @param {olFeature<import("ol/geom/Geometry.js").default>|import('ol/render/Feature.js').default} feature
       * @param {number} resolution
       */
      function (feature, resolution) {
        const geometry = feature.getGeometry();
        if (!geometry) {
          throw new Error('Missing geometry');
        }
        return styles[geometry.getType()];
      }
    );
  })();

  /**
   * @type {import("ngeo/interaction/Rotate.js").default}
   */
  this.interaction = new ngeoInteractionRotate(
    /** @type {import('ol/interaction/Modify.js').Options} */ ({
      features: this.features,
      layers: [vectorLayer],
      style: style,
    })
  );

  const interaction = this.interaction;
  interaction.setActive(false);
  map.addInteraction(interaction);

  map.on(
    'singleclick',
    /** @type {function(?): ?} */ (
      /**
       * @param {import('ol/MapBrowserEvent.js').default<unknown>} evt
       */ (evt) => {
        const feature = this.map.forEachFeatureAtPixel(evt.pixel, (feature) => feature);
        if (feature) {
          this.interaction.setActive(true);
        }
      }
    )
  );
}

appmodule.controller('MainController', MainController);

export default module;
