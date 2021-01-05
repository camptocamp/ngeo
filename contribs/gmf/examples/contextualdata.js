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
import './contextualdata.css';
import gmfContextualdataModule from 'gmf/contextualdata/module.js';

import gmfMapComponent from 'gmf/map/component.js';
import ngeoMiscFilters from 'ngeo/misc/filters.js';
import EPSG2056 from '@geoblocks/proj/EPSG_2056.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';
import options from './options.js';

/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('gmfapp', [
  'gettext',
  gmfContextualdataModule.name,
  gmfMapComponent.name,
  ngeoMiscFilters.name,
]);

module.value('gmfContextualdatacontentTemplateUrl', 'partials/contextualdata.html');

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
      projection: EPSG2056,
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [2600000, 1200000],
      zoom: 3,
    }),
  });
}

/**
 * @param {import("ol/coordinate.js").Coordinate} coordinate The coordinate for the right-clicked
 *     point.
 * @param {Object<string, number>} data The data received from the raster service.
 * @return {Object<string, number>} The additional data to add to the scope for the
 *     contextualdata popover.
 */
MainController.prototype.onRasterData = function (coordinate, data) {
  return {
    elelvation_diff: data.srtm - data.aster,
  };
};

module.controller('MainController', MainController);
options(module);

export default MainController;
