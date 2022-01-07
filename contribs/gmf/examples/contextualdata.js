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
import './contextualdata.css';
import gmfContextualdataModule from 'gmf/contextualdata/module';

import gmfMapComponent from 'gmf/map/gmfComponent';
import ngeoMiscFilters from 'ngeo/misc/filters';
import EPSG2056 from 'ngeo/proj/EPSG_2056';
import 'ngeo/proj/EPSG_21781';
import olMap from 'ol/Map';
import olView from 'ol/View';
import olLayerTile from 'ol/layer/Tile';
import olSourceOSM from 'ol/source/OSM';
import options from './options';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfapp', [
  'gettext',
  gmfContextualdataModule.name,
  gmfMapComponent.name,
  ngeoMiscFilters.name,
]);

myModule.value('gmfContextualdatacontentTemplateUrl', 'partials/contextualdata.html');

/**
 * @class
 * @ngInject
 */
function MainController() {
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
      center: [2600000, 1200000],
      zoom: 3,
    }),
  });
}

/**
 * @param {import('ol/coordinate').Coordinate} coordinate The coordinate for the right-clicked
 *     point.
 * @param {Object<string, number>} data The data received from the raster service.
 * @returns {Object<string, number>} The additional data to add to the scope for the
 *     contextualdata popover.
 */
MainController.prototype.onRasterData = function (coordinate, data) {
  return {
    elelvation_diff: data.srtm - data.aster,
  };
};

myModule.controller('MainController', MainController);
myModule.constant('gmfContextualDataOptions', {
  projections: ['EPSG:2056', 'EPSG:21781', 'EPSG:4326'],
});

options(myModule);

export default MainController;
