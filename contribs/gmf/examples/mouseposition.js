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

import './mouseposition.css';
import angular from 'angular';
import gmfMapModule from 'gmf/map/module';
import gmfMapComponent from 'gmf/map/component';

import EPSG2056 from 'ngeo/proj/EPSG_2056';
import EPSG21781 from 'ngeo/proj/EPSG_21781';
import olMap from 'ol/Map';
import olView from 'ol/View';
import olLayerTile from 'ol/layer/Tile';
import olSourceOSM from 'ol/source/OSM';
import options from './options';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfapp', ['gettext', gmfMapModule.name, gmfMapComponent.name]);

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
      center: [828042, 5933739],
      zoom: 8,
    }),
  });
}

myModule.controller('MainController', MainController);

myModule.constant('gmfMousePositionOptions', {
  projections: [
    {
      code: EPSG2056,
      label: 'CH1903+ / LV95',
      filter: 'ngeoNumberCoordinates:0:Coordinates (m)&#58; {x}, {y}',
    },
    {
      code: EPSG21781,
      label: 'CH1903 / LV03',
      filter: 'ngeoNumberCoordinates:2:[{x} E; {y} N]',
    },
    {
      code: 'EPSG:4326',
      label: 'WGS84',
      filter: 'ngeoDMSCoordinates:2',
    },
  ],
});
options(myModule);

export default myModule;
