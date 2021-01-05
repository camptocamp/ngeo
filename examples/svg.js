// The MIT License (MIT)
//
// Copyright (c) 2019-2021 Camptocamp SA
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
import './svg.css';
import EPSG2056 from '@geoblocks/proj/EPSG_2056.js';

import Map from 'ol/Map.js';
import View from 'ol/View.js';
import LayerVector from 'ol/layer/Vector.js';
import SourceVector from 'ol/source/Vector.js';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import Style from 'ol/style/Style.js';
import Icon from 'ol/style/Icon.js';

import MapModule from 'ngeo/map/module.js';

/** @type {!angular.IModule} **/
const appmodule = angular.module('app', [MapModule.name]);

/**
 * @constructor
 * @ngInject
 * @hidden
 */
function MainController() {
  const source = new SourceVector();
  const feature1 = new Feature({
    geometry: new Point([2599000, 1200000]),
  });
  feature1.setStyle([
    new Style({
      image: new Icon({
        // @ts-ignore: webpack
        src: 'data:image/svg+xml;base64,' + btoa(require('./inline.svg')),
        // For IE compatibility
        imgSize: [65, 65],
      }),
    }),
  ]);
  source.addFeature(feature1);

  const feature2 = new Feature({
    geometry: new Point([2600000, 1200000]),
  });
  feature2.setStyle([
    new Style({
      image: new Icon({
        // @ts-ignore: webpack
        src: 'data:image/svg+xml;base64,' + btoa(require('./inline.svg?viewbox&width=30px')),
        // For IE compatibility
        imgSize: [30, 30],
      }),
    }),
  ]);
  source.addFeature(feature2);

  const feature3 = new Feature({
    geometry: new Point([2601000, 1200000]),
  });
  feature3.setStyle([
    new Style({
      image: new Icon({
        // @ts-ignore: webpack
        src: require('./url.svg?url'),
        // For IE compatibility
        imgSize: [65, 65],
      }),
    }),
  ]);
  source.addFeature(feature3);

  this.map = new Map({
    layers: [
      new LayerVector({
        source,
      }),
    ],
    view: new View({
      projection: EPSG2056,
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1],
      center: [2600000, 1200000],
      zoom: 4,
    }),
  });
}

appmodule.controller('MainController', MainController);

export default module;
