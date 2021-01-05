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
import './print.css';
import './gmf-hidden.inc.css';
import gmfLayertreeComponent from 'gmf/layertree/component.js';

import gmfMapComponent from 'gmf/map/component.js';

import gmfPrintComponent from 'gmf/print/component.js';

import gmfThemeThemes from 'gmf/theme/Themes.js';
import ngeoMapModule from 'ngeo/map/module.js';
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
  gmfLayertreeComponent.name,
  gmfMapComponent.name,
  gmfPrintComponent.name,
  gmfThemeThemes.name,
  ngeoMapModule.name, //for ngeo.map.FeatureOverlay, perhaps remove me
]);

/**
 * @constructor
 * @param {import("gmf/theme/Themes.js").ThemesService} gmfThemes The gmf themes service.
 * @param {import("ngeo/map/FeatureOverlayMgr.js").FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *   overlay manager service.
 * @ngInject
 */
function MainController(gmfThemes, ngeoFeatureOverlayMgr) {
  gmfThemes.loadThemes();

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
      center: [2537635, 1152640],
      zoom: 3,
    }),
  });

  /**
   * @type {import('gmf/themes').GmfTheme[]|undefined}
   */
  this.themes = undefined;

  /**
   * @type {import('gmf/themes').GmfTheme|undefined}
   */
  this.treeSource = undefined;

  gmfThemes.getThemesObject().then((themes) => {
    if (themes) {
      this.themes = themes;
      this.treeSource = themes[3];
    }
  });

  ngeoFeatureOverlayMgr.init(this.map);
}

module.controller('MainController', MainController);

module.constant('gmfPrintOptions', {
  fieldsValues: {
    comments: 'Default comments example',
    legend: true,
  },
});
options(module);

export default module;
