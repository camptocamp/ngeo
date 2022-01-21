// The MIT License (MIT)
//
// Copyright (c) 2021-2022 Camptocamp SA
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

import './mapillarystreetview.css';
import angular from 'angular';
import olMap from 'ol/Map';

import olView from 'ol/View';
import olLayerTile from 'ol/layer/Tile';
import olSourceOSM from 'ol/source/OSM';
import olStyleFill from 'ol/style/Fill';
import olStyleStroke from 'ol/style/Stroke';
import olStyleStyle from 'ol/style/Style';
import olStyleText from 'ol/style/Text';
import ngeoStreetviewModule from 'ngeo/streetview/module';
import gmfMapComponent from 'gmf/map/component';
import options from './options';
import ngeoMiscToolActivate from 'ngeo/misc/ToolActivate';
import ngeoMiscToolActivateMgr from 'ngeo/misc/ToolActivateMgr';

/** @type {angular.IModule} **/
const myModule = angular.module('app', [
  'gettext',
  gmfMapComponent.name,
  ngeoStreetviewModule.name,
  ngeoMiscToolActivateMgr.name,
]);

/**
 * @param {import('ngeo/map/FeatureOverlayMgr').FeatureOverlayMgr} ngeoFeatureOverlayMgr
 *    Ngeo FeatureOverlay manager.
 * @param {import('ngeo/misc/ToolActivateMgr').ToolActivateMgr} ngeoToolActivateMgr
 *    Ngeo ToolActivate manager service.
 * @class
 * @ngInject
 */
function MainController(ngeoFeatureOverlayMgr, ngeoToolActivateMgr) {
  /**
   * @type {import('ol/style/Style').default}
   */
  this.style = new olStyleStyle({
    text: new olStyleText({
      fill: new olStyleFill({color: '#279B61'}),
      font: '900 30px "Font Awesome 5 Free"',
      offsetY: -15,
      stroke: new olStyleStroke({color: '#ffffff', width: 3}),
      text: '\uf041', //map-marker
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
    ],
    view: new olView({
      center: [830604, 5932807],
      zoom: 17,
    }),
  });

  ngeoFeatureOverlayMgr.init(this.map);

  /**
   * @type {boolean}
   */
  this.streetViewActive = true;

  const streetViewToolActivate = new ngeoMiscToolActivate(this, 'streetViewActive');
  ngeoToolActivateMgr.registerTool('mapTools', streetViewToolActivate, true);

  /**
   * @type {boolean}
   */
  this.dummyActive = false;

  const dummyToolActivate = new ngeoMiscToolActivate(this, 'dummyActive');
  ngeoToolActivateMgr.registerTool('mapTools', dummyToolActivate, false);
}

myModule.controller('MainController', MainController);

myModule.constant('ngeoStreetviewOptions', {
  viewer: 'mapillary',
  key: 'd1dNaFk4aDVoVVlZd0dEZG95Wm84QTpkYmRkOGQyMWRkMThiM2E2',
});
options(myModule);

export default myModule;
