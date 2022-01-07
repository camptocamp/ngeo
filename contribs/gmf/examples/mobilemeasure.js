// The MIT License (MIT)
//
// Copyright (c) 2016-2022 Camptocamp SA
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
import './mobilemeasure.css';
import gmfMapComponent from 'gmf/map/gmfComponent';

import gmfPermalinkPermalink from 'gmf/permalink/Permalink';

import gmfMobileMeasureAreaComponent from 'gmf/mobile/measure/areaComponent';
import gmfMobileMeasureLengthComponent from 'gmf/mobile/measure/lengthComponent';
import gmfMobileMeasurePointComponent from 'gmf/mobile/measure/pointComponent';
import ngeoMiscBtnComponent from 'ngeo/misc/btnComponent';
import EPSG2056 from 'ngeo/proj/EPSG_2056';
import olMap from 'ol/Map';
import olView from 'ol/View';
import olControlScaleLine from 'ol/control/ScaleLine';
import olLayerTile from 'ol/layer/Tile';
import olSourceOSM from 'ol/source/OSM';
import options from './options';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfapp', [
  'gettext',
  gmfMapComponent.name,
  gmfPermalinkPermalink.name,
  gmfMobileMeasureAreaComponent.name,
  gmfMobileMeasureLengthComponent.name,
  gmfMobileMeasurePointComponent.name,
  ngeoMiscBtnComponent.name,
]);

/**
 * @param {import('gmf/permalink/Permalink').PermalinkService} gmfPermalink The gmf permalink service.
 * @class
 * @ngInject
 */
function MainController(gmfPermalink) {
  const center = gmfPermalink.getMapCenter() || [537635, 152640];
  const zoom = gmfPermalink.getMapZoom() || 3;

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
      projection: EPSG2056,
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: center,
      zoom: zoom,
    }),
  });

  this.map.addControl(
    new olControlScaleLine({
      // See: https://www.w3.org/TR/CSS21/syndata.html#length-units
      dpi: 96,
    })
  );

  /**
   * @type {boolean}
   */
  this.measureAreaActive = false;

  /**
   * @type {boolean}
   */
  this.measureLengthActive = false;

  /**
   * @type {boolean}
   */
  this.measurePointActive = false;
}

myModule.controller('MainController', MainController);

const sketchStyle = {
  fill: {
    color: 'rgba(255, 255, 255, 0.2)',
  },
  stroke: {
    color: 'rgba(0, 0, 0, 0.5)',
    lineDash: [10, 10],
    width: 2,
  },
  regularShape: {
    stroke: {
      color: 'rgba(0, 0, 0, 0.7)',
      width: 2,
    },
    points: 4,
    radius: 8,
    radius2: 0,
    angle: 0,
  },
};
myModule.constant('gmfMobileMeasurePointOptions', {
  sketchStyle: sketchStyle,
  decimals: 2,
  format: '{x}, {y}',
  rasterLayers: [
    {name: 'aster', unit: 'm', decimals: 2},
    {name: 'srtm', unit: 'm'},
  ],
});
myModule.constant('gmfMobileMeasureLengthOptions', {
  sketchStyle: sketchStyle,
});
myModule.constant('gmfMobileMeasureAreaOptions', {
  sketchStyle: sketchStyle,
});
options(myModule);

export default myModule;
