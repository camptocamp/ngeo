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
import './displayquerygrid.css';
import './gmf-hidden.inc.css';
import gmfDatasourceManager from 'gmf/datasource/Manager.js';

import gmfLayertreeComponent from 'gmf/layertree/component.js';

import gmfMapComponent from 'gmf/map/component.js';

import gmfQueryGridComponent from 'gmf/query/gridComponent.js';

import gmfThemeManager from 'gmf/theme/Manager.js';
import gmfThemeThemes from 'gmf/theme/Themes.js';
import ngeoGridModule from 'ngeo/grid/module.js';
import ngeoMapModule from 'ngeo/map/module.js';
import ngeoMiscBtnComponent from 'ngeo/misc/btnComponent.js';
import EPSG2056 from '@geoblocks/proj/EPSG_2056.js';
import ngeoQueryComponent from 'ngeo/query/component.js';
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
  gmfDatasourceManager.name,
  gmfLayertreeComponent.name,
  gmfMapComponent.name,
  gmfQueryGridComponent.name,
  gmfThemeManager.name,
  gmfThemeThemes.name,
  ngeoGridModule.name,
  ngeoMapModule.name, // for ngeo.map.FeatureOverlay, perhaps remove me
  ngeoMiscBtnComponent.name,
  ngeoQueryComponent.name,
]);

/**
 * Demo, NOT USED.
 * A sample component to display the result.
 *
 * @type {angular.IComponentOptions}
 * @hidden
 */
const queryresultComponent = {
  controller: 'gmfappQueryresultController',
  // @ts-ignore: webpack
  template: require('./partials/queryresult.html'),
};

module.component('gmfappQueryresult', queryresultComponent);

/**
 * Demo, NOT USED.
 * @param {import('ngeo/query/MapQuerent.js').QueryResult} ngeoQueryResult Query service.
 * @constructor
 * @ngInject
 */
function QueryresultController(ngeoQueryResult) {
  /**
   * @type {import('ngeo/query/MapQuerent.js').QueryResult}
   */
  this.result = ngeoQueryResult;
}

module.controller('gmfappQueryresultController', QueryresultController);

/**
 * @constructor
 * @param {import("gmf/theme/Themes.js").ThemesService} gmfThemes The gmf themes service.
 * @param {import("gmf/datasource/Manager.js").DatasourceManager} gmfDataSourcesManager The gmf
 *     data sources manager service.
 * @param {import("ngeo/map/FeatureOverlayMgr.js").FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *   overlay manager service.
 * @param {import("gmf/theme/Manager.js").ThemeManagerService} gmfThemeManager gmf Theme Manager service.
 * @param {string} defaultTheme The default theme.
 * @ngInject
 */
function MainController(
  gmfThemes,
  gmfDataSourcesManager,
  ngeoFeatureOverlayMgr,
  gmfThemeManager,
  defaultTheme
) {
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
   * @type {Object<string, string>}
   */
  this.dimensions = {};

  // Init the datasources with our map.
  gmfDataSourcesManager.setDatasourceMap(this.map);
  // Give the dimensions to the gmfDataSourcesManager
  gmfDataSourcesManager.setDimensions(this.dimensions);

  /**
   * @type {boolean}
   */
  this.queryActive = true;

  /**
   * @type {import('gmf/themes').GmfThemes[]|undefined}
   * export
   */
  this.themes = undefined;

  /**
   * @type {import('gmf/themes.js').GmfTheme} The selected theme.
   */
  this.selectedTheme = null;

  this.updateTheme = function () {
    gmfThemeManager.addTheme(this.selectedTheme);
  };

  /**
   * @type {boolean}
   */
  this.queryGridActive = true;

  gmfThemes.getThemesObject().then((themes) => {
    if (themes) {
      this.themes = themes;

      // Select default theme;
      themes.forEach((theme) => {
        if (theme.name === defaultTheme) {
          this.selectedTheme = theme;
          return;
        }
      });
    }
  });

  ngeoFeatureOverlayMgr.init(this.map);
}

module.controller('MainController', MainController);

module.constant('gmfDisplayQueryGridOptions', {
  featuresStyle: {
    fill: {color: [255, 170, 0, 0.6]},
    circle: {
      fill: {color: [255, 170, 0, 0.6]},
      radius: 5,
      stroke: {color: [255, 170, 0, 1], width: 2},
    },
    stroke: {color: [255, 170, 0, 1], width: 2},
  },
});
options(module);

export default module;
