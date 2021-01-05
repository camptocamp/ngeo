// The MIT License (MIT)
//
// Copyright (c) 2017-2021 Camptocamp SA
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

// Todo - use the 'Filter' theme instead if the 'Edit' theme
import angular from 'angular';
import appURL from './url.js';
import './importdatasource.css';
import 'bootstrap/js/src/tooltip.js';
import gmfDatasourceManager from 'gmf/datasource/Manager.js';

import gmfImportImportdatasourceComponent from 'gmf/import/importdatasourceComponent.js';
import gmfLayertreeComponent from 'gmf/layertree/component.js';
import gmfLayertreeTreeManager from 'gmf/layertree/TreeManager.js';

import gmfMapComponent from 'gmf/map/component.js';

import gmfThemeThemes from 'gmf/theme/Themes.js';
import ngeoDatasourceDataSources from 'ngeo/datasource/DataSources.js';

import ngeoQueryComponent from 'ngeo/query/component.js';

import EPSG2056 from '@geoblocks/proj/src/EPSG_2056.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';

/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('gmfapp', [
  'gettext',
  gmfDatasourceManager.name,
  gmfImportImportdatasourceComponent.name,
  gmfLayertreeComponent.name,
  gmfLayertreeTreeManager.name,
  gmfMapComponent.name,
  gmfThemeThemes.name,
  ngeoDatasourceDataSources.name,
  ngeoQueryComponent.name,
]);

module.value('gmfTreeUrl', appURL.GMF_THEMES);
module.value('gmfLayersUrl', appURL.GMF_LAYERS);

module.value('gmfExternalOGCServers', [
  {
    'name': 'Swiss Topo WMS',
    'type': 'WMS',
    'url': 'https://wms.geo.admin.ch/?lang=fr',
  },
  {
    'name': 'ASIT VD',
    'type': 'WMTS',
    'url': 'https://ows.asitvd.ch/wmts/1.0.0/WMTSCapabilities.xml',
  },
  {
    'name': 'Swiss Topo WMTS',
    'type': 'WMTS',
    'url': 'https://wmts.geo.admin.ch/1.0.0/WMTSCapabilities.xml?lang=fr',
  },
]);

module.constant('defaultTheme', 'Filters');
module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');

/**
 * @private
 */
class MainController {
  /**
   * @param {angular.IScope} $scope Angular scope.
   * @param {import("gmf/datasource/Manager.js").DatasourceManager} gmfDataSourcesManager The gmf
   *    data sources manager service.
   * @param {import("gmf/theme/Themes.js").ThemesService} gmfThemes The gmf themes service.
   * @param {import("gmf/layertree/TreeManager.js").LayertreeTreeManager} gmfTreeManager gmf Tree Manager
   *    service.
   * @param {import("ngeo/datasource/DataSources.js").DataSource} ngeoDataSources Ngeo data sources service.
   * @ngInject
   */
  constructor($scope, gmfDataSourcesManager, gmfThemes, gmfTreeManager, ngeoDataSources) {
    /**
     * @type {angular.IScope}
     * @private
     */
    this.scope_ = $scope;

    gmfThemes.loadThemes();

    /**
     * @type {import("gmf/layertree/TreeManager.js").LayertreeTreeManager}
     */
    this.gmfTreeManager = gmfTreeManager;

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
        zoom: 2,
      }),
    });

    // Init the datasources with our map.
    gmfDataSourcesManager.setDatasourceMap(this.map);

    gmfThemes.getThemesObject().then((themes) => {
      if (themes) {
        // Set 'Filters' theme, i.e. the one with id 175
        for (let i = 0, ii = themes.length; i < ii; i++) {
          if (themes[i].id === 175) {
            this.gmfTreeManager.setFirstLevelGroups(themes[i].children);
            break;
          }
        }
      }
    });

    /**
     * @type {boolean}
     */
    this.queryActive = true;

    // initialize tooltips
    $('[data-toggle="tooltip"]').tooltip({
      container: 'body',
      trigger: 'hover',
    });
  }
}

module.controller('MainController', MainController);

export default module;
