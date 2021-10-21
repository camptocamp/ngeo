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
import ngeoSourceAsitVD from 'ngeo/source/AsitVD';
import EPSG2056 from 'ngeo/proj/EPSG_2056';

import olMap from 'ol/Map';
import olView from 'ol/View';
import olLayerTile from 'ol/layer/Tile';
import ngeoMapModule from 'ngeo/map/module';

/** @type {angular.IModule} */
const myModule = angular.module('app', ['gettext', ngeoMapModule.name]);

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
        source: new ngeoSourceAsitVD({
          layer: 'asitvd.fond_couleur',
        }),
      }),
    ],
    view: new olView({
      projection: EPSG2056,
      resolutions: [250, 100, 50, 20, 10, 5, 2.5, 2, 1.5, 1, 0.5],
      center: [2535000, 1154000],
      zoom: 0,
    }),
  });
}

myModule.controller('MainController', MainController);

export default myModule;
