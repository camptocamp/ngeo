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

import './createfeature.css';
import angular from 'angular';
import ngeoEditingCreatefeatureComponent from 'ngeo/editing/createfeatureComponent';

import ngeoGeometryType from 'ngeo/GeometryType';

import ngeoMiscBtnComponent from 'ngeo/misc/btnComponent';

import ngeoMiscToolActivate from 'ngeo/misc/ToolActivate';
import ngeoMiscToolActivateMgr from 'ngeo/misc/ToolActivateMgr';
import olCollection from 'ol/Collection';
import olMap from 'ol/Map';
import olView from 'ol/View';
import olLayerTile from 'ol/layer/Tile';
import olLayerVector from 'ol/layer/Vector';
import olSourceOSM from 'ol/source/OSM';
import olSourceVector from 'ol/source/Vector';
import ngeoMapModule from 'ngeo/map/module';

/** @type {angular.IModule} **/
const myModule = angular.module('app', [
  'gettext',
  ngeoMapModule.name,
  ngeoMiscBtnComponent.name,
  ngeoMiscToolActivateMgr.name,
  ngeoEditingCreatefeatureComponent.name,
]);

/**
 * @param {import('ngeo/misc/ToolActivateMgr').ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate
 *    manager service.
 * @class
 * @ngInject
 */
function MainController(ngeoToolActivateMgr) {
  /**
   * @type {import('ol/Collection').default<import('ol/Feature').default<import('ol/geom/Geometry').default>>}
   */
  this.features = new olCollection();

  /**
   * @type {string}
   */
  this.pointGeomType = ngeoGeometryType.POINT;

  /**
   * @type {string}
   */
  this.lineStringGeomType = ngeoGeometryType.LINE_STRING;

  /**
   * @type {string}
   */
  this.polygonGeomType = ngeoGeometryType.POLYGON;

  const vector = new olLayerVector({
    source: new olSourceVector({
      wrapX: false,
      features: this.features,
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
  this.createPointActive = false;

  const createPointToolActivate = new ngeoMiscToolActivate(this, 'createPointActive');
  ngeoToolActivateMgr.registerTool('mapTools', createPointToolActivate, false);

  /**
   * @type {boolean}
   */
  this.createLineStringActive = false;

  const createLineStringToolActivate = new ngeoMiscToolActivate(this, 'createLineStringActive');
  ngeoToolActivateMgr.registerTool('mapTools', createLineStringToolActivate, false);

  /**
   * @type {boolean}
   */
  this.createPolygonActive = false;

  const createPolygonToolActivate = new ngeoMiscToolActivate(this, 'createPolygonActive');
  ngeoToolActivateMgr.registerTool('mapTools', createPolygonToolActivate, false);

  /**
   * @type {boolean}
   */
  this.dummyActive = true;

  const dummyToolActivate = new ngeoMiscToolActivate(this, 'dummyActive');
  ngeoToolActivateMgr.registerTool('mapTools', dummyToolActivate, true);
}

myModule.controller('MainController', MainController);

export default myModule;
