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
import './displayquerywindow.css';
import './gmf-hidden.inc.css';
import gmfDatasourceManager from 'gmf/datasource/Manager';

import gmfLayertreeComponent from 'gmf/layertree/gmfComponent';

import gmfMapComponent from 'gmf/map/component';

import gmfQueryWindowComponent from 'gmf/query/windowComponent';

import gmfThemeManager from 'gmf/theme/Manager';
import gmfThemeThemes from 'gmf/theme/Themes';
import ngeoMiscBtnComponent from 'ngeo/misc/btnComponent';
import EPSG2056 from 'ngeo/proj/EPSG_2056';
import ngeoQueryComponent from 'ngeo/query/component';
import olMap from 'ol/Map';
import olView from 'ol/View';
import olLayerTile from 'ol/layer/Tile';
import olSourceOSM from 'ol/source/OSM';
import ngeoMapModule from 'ngeo/map/module';
import options from './options';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfapp', [
  'gettext',
  gmfDatasourceManager.name,
  gmfLayertreeComponent.name,
  gmfMapComponent.name,
  gmfQueryWindowComponent.name,
  gmfThemeManager.name,
  gmfThemeThemes.name,
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
  controller: 'AppQueryresultController',
  // @ts-ignore: webpack
  template: require('./partials/queryresult.html'),
};

myModule.component('appQueryresult', queryresultComponent);

/**
 * Demo, NOT USED.
 *
 * @param {import('ngeo/query/MapQuerent').QueryResult} ngeoQueryResult Query service.
 * @class
 * @ngInject
 */
function QueryresultController(ngeoQueryResult) {
  /**
   * @type {import('ngeo/query/MapQuerent').QueryResult}
   */
  this.result = ngeoQueryResult;
}

myModule.controller('AppQueryresultController', QueryresultController);

/**
 * @class
 * @param {import('gmf/theme/Themes').ThemesService} gmfThemes The gmf themes service.
 * @param {import('gmf/datasource/Manager').DatasourceManager} gmfDataSourcesManager The gmf
 *     data sources manager service.
 * @param {import('ngeo/map/FeatureOverlayMgr').FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *   overlay manager service.
 * @param {import('gmf/theme/Manager').ThemeManagerService} gmfThemeManager gmf Theme Manager service.
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
   * @type {import('gmf/themes').GmfTheme[]|undefined}
   * export
   */
  this.themes = undefined;

  /**
   * @type {import('gmf/themes').GmfTheme} The selected theme.
   */
  this.selectedTheme = null;

  this.updateTheme = function () {
    gmfThemeManager.addTheme(this.selectedTheme);
  };

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

myModule.controller('MainController', MainController);

myModule.constant('gmfDisplayQueryWindowOptions', {
  featuresStyle: {
    fill: {color: [255, 170, 0, 0.6]},
    stroke: {color: [255, 170, 0, 1], width: 2},
    circle: {
      radius: 5,
      fill: {color: [255, 170, 0, 0.6]},
      stroke: {color: [255, 170, 0, 1], width: 2},
    },
  },
});
options(myModule);

export default myModule;
