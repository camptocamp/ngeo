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

import './mapswipe.css';
import angular from 'angular';
import ngeoMapswipeModule from 'ngeo/map/swipe.js';
import ngeoMapModule from 'ngeo/map/module.js';
import olLayerTile from 'ol/layer/Tile.js';
import olMap from 'ol/Map.js';
import olSourceOSM, {ATTRIBUTION} from 'ol/source/OSM.js';
import olView from 'ol/View.js';

/** @type {angular.IModule} **/
const myModule = angular.module('app', ['gettext', ngeoMapModule.name, ngeoMapswipeModule.name]);

/**
 * @class
 * @ngInject
 */
function MainController() {
  const openStreetMapLayer = new olLayerTile({
    source: new olSourceOSM(),
  });

  /**
   * @type {import('ol/layer/Tile.js').default}
   */
  this.openSeaMapLayer = new olLayerTile({
    source: new olSourceOSM({
      attributions: ['All maps © <a href="http://www.openseamap.org/">OpenSeaMap</a>', ATTRIBUTION],
      opaque: false,
      url: 'https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png',
    }),
  });

  /**
   * @type {import('ol/Map.js').default}
   */
  this.map = new olMap({
    layers: [openStreetMapLayer, this.openSeaMapLayer],
    view: new olView({
      center: [-244780.24508882355, 5986452.183179816],
      zoom: 15,
    }),
  });
}

myModule.controller('MainController', MainController);

export default myModule;
