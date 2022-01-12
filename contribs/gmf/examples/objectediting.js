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
import './objectediting.css';
import gmfLayertreeComponent from 'gmf/layertree/gmfComponent';

import gmfLayertreeTreeManager from 'gmf/layertree/TreeManager';

import gmfMapComponent from 'gmfold/map/component';

import gmfObjecteditingComponent from 'gmf/objectediting/component';

import gmfObjecteditingManager from 'gmf/objectediting/Manager';
import gmfThemeThemes from 'gmf/theme/Themes';
import ngeoMiscToolActivate from 'ngeo/misc/ToolActivate';
import ngeoMiscToolActivateMgr from 'ngeo/misc/ToolActivateMgr';
import EPSG2056 from 'ngeo/proj/EPSG_2056';
import * as olProj from 'ol/proj';
import olCollection from 'ol/Collection';
import olMap from 'ol/Map';
import olView from 'ol/View';
import olLayerTile from 'ol/layer/Tile';
import olLayerVector from 'ol/layer/Vector';
import olSourceOSM from 'ol/source/OSM';
import olSourceVector from 'ol/source/Vector';
import options from './options';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfapp', [
  'gettext',
  gmfLayertreeComponent.name,
  gmfLayertreeTreeManager.name,
  gmfMapComponent.name,
  gmfObjecteditingComponent.name,
  gmfObjecteditingManager.name,
  gmfThemeThemes.name,
  ngeoMiscToolActivateMgr.name,
]);

/**
 * @param {import('gmf/objectediting/Manager').ObjecteditingManagerService} gmfObjectEditingManager The gmf
 *    ObjectEditing manager service.
 * @param {import('gmf/theme/Themes').ThemesService} gmfThemes The gmf themes service.
 * @param {import('gmf/layertree/TreeManager').LayertreeTreeManager} gmfTreeManager gmf Tree Manager
 *    service.
 * @param {import('ngeo/misc/ToolActivateMgr').ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate
 *    manager service.
 * @class
 * @ngInject
 */
function MainController(gmfObjectEditingManager, gmfThemes, gmfTreeManager, ngeoToolActivateMgr) {
  /**
   * @type {import('gmf/layertree/TreeManager').LayertreeTreeManager}
   */
  this.gmfTreeManager_ = gmfTreeManager;

  gmfThemes.loadThemes();

  const projection = olProj.get(EPSG2056);
  projection.setExtent([485869.5728, 76443.1884, 837076.5648, 299941.7864]);

  /**
   * @type {import('ol/source/Vector').default<import('ol/geom/Geometry').default>}
   */
  this.vectorSource_ = new olSourceVector({
    wrapX: false,
  });

  /**
   * @type {import('ol/layer/Vector').default<import('ol/source/Vector').default<import('ol/geom/Geometry').default>>}
   */
  this.vectorLayer_ = new olLayerVector({
    source: this.vectorSource_,
  });

  /**
   * @type {import('ol/Collection').default<import('ol/Feature').default<import('ol/geom/Geometry').default>>}
   */
  this.sketchFeatures = new olCollection();

  /**
   * @type {import('ol/layer/Vector').default<import('ol/source/Vector').default<import('ol/geom/Geometry').default>>}
   */
  this.sketchLayer_ = new olLayerVector({
    source: new olSourceVector({
      features: this.sketchFeatures,
      wrapX: false,
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
      projection: EPSG2056,
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [2537635, 1152640],
      zoom: 2,
    }),
  });

  gmfThemes.getThemesObject().then((themes) => {
    if (themes) {
      // Add layer vector after
      this.map.addLayer(this.vectorLayer_);
      this.map.addLayer(this.sketchLayer_);
    }
  });

  /**
   * @type {string|undefined}
   */
  this.objectEditingGeomType = gmfObjectEditingManager.getGeomType();

  /**
   * @type {number|undefined}
   */
  this.objectEditingLayerNodeId = gmfObjectEditingManager.getLayerNodeId();

  /**
   * @type {boolean}
   */
  this.objectEditingActive = true;

  const objectEditingToolActivate = new ngeoMiscToolActivate(this, 'objectEditingActive');
  ngeoToolActivateMgr.registerTool('mapTools', objectEditingToolActivate, true);

  /**
   * @type {boolean}
   */
  this.dummyActive = false;

  const dummyToolActivate = new ngeoMiscToolActivate(this, 'dummyActive');
  ngeoToolActivateMgr.registerTool('mapTools', dummyToolActivate, false);

  /**
   * @type {?import('ol/Feature').default<import('ol/geom/Geometry').default>}
   */
  this.objectEditingFeature = null;

  gmfObjectEditingManager.getFeature().then((feature) => {
    this.objectEditingFeature = feature;
    if (feature) {
      this.vectorSource_.addFeature(feature);
    }
  });
}

myModule.controller('MainController', MainController);

myModule.constant('defaultTheme', 'ObjectEditing');
options(myModule);

export default myModule;
