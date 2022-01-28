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

import './drawfeature.css';
import angular from 'angular';
import ngeoDrawModule from 'ngeo/draw/module';

import gmfMapComponent from 'gmf/map/component';
import options from './options';
import ngeoMiscToolActivate from 'ngeo/misc/ToolActivate';
import ngeoMiscToolActivateMgr from 'ngeo/misc/ToolActivateMgr';
import olMap from 'ol/Map';
import olView from 'ol/View';
import olLayerTile from 'ol/layer/Tile';
import olLayerVector from 'ol/layer/Vector';
import olSourceOSM from 'ol/source/OSM';
import olSourceVector from 'ol/source/Vector';

/** @type {angular.IModule} **/
const myModule = angular.module('app', [
  'gettext',
  ngeoDrawModule.name,
  gmfMapComponent.name,
  ngeoMiscToolActivateMgr.name,
]);

/**
 * @param {angular.IScope} $scope Angular scope.
 * @param {import('ol/Collection').default<import('ol/Feature').default<import('ol/geom/Geometry').default>>} ngeoFeatures Collection
 *    of features.
 * @param {import('ngeo/misc/ToolActivateMgr').ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate
 *    manager service.
 * @ngInject
 * @class
 */
function MainController($scope, ngeoFeatures, ngeoToolActivateMgr) {
  /**
   * @type {angular.IScope}
   */
  this.scope_ = $scope;

  const vector = new olLayerVector({
    source: new olSourceVector({
      wrapX: false,
      features: ngeoFeatures,
    }),
  });

  /**
   * @type {import('ol/Map').default}
   */
  this.map = new olMap({
    layers: [
      new olLayerTile({
        source: new olSourceOSM(),
      }),
      vector,
    ],
    view: new olView({
      center: [0, 0],
      zoom: 3,
    }),
  });

  /**
   * @type {boolean}
   */
  this.drawActive = false;

  const drawToolActivate = new ngeoMiscToolActivate(this, 'drawActive');
  ngeoToolActivateMgr.registerTool('mapTools', drawToolActivate, false);

  /**
   * @type {boolean}
   */
  this.dummyActive = true;

  const dummyToolActivate = new ngeoMiscToolActivate(this, 'dummyActive');
  ngeoToolActivateMgr.registerTool('mapTools', dummyToolActivate, true);
}

myModule.controller('MainController', MainController);
options(myModule);

export default myModule;
