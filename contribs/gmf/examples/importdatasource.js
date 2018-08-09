/**
 * @module gmfapp.importdatasource
 */
const exports = {};
// Todo - use the 'Filter' theme instead if the 'Edit' theme

import './importdatasource.css';
import 'jquery-ui/ui/widgets/tooltip.js';
/** @suppress {extraRequire} */
import gmfDatasourceManager from 'gmf/datasource/Manager.js';

import gmfImportImportdatasourceComponent from 'gmf/import/importdatasourceComponent.js';
import gmfLayertreeComponent from 'gmf/layertree/component.js';
import gmfLayertreeTreeManager from 'gmf/layertree/TreeManager.js';

/** @suppress {extraRequire} */
import gmfMapComponent from 'gmf/map/component.js';

import gmfThemeThemes from 'gmf/theme/Themes.js';
import ngeoDatasourceDataSources from 'ngeo/datasource/DataSources.js';

/** @suppress {extraRequire} */
import ngeoQueryBboxQueryComponent from 'ngeo/query/bboxQueryComponent.js';

import ngeoQueryMapQueryComponent from 'ngeo/query/mapQueryComponent.js';
import EPSG21781 from 'ngeo/proj/EPSG21781.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';


/** @type {!angular.Module} **/
exports.module = angular.module('gmfapp', [
  'gettext',
  gmfDatasourceManager.module.name,
  gmfImportImportdatasourceComponent.name,
  gmfLayertreeComponent.name,
  gmfLayertreeTreeManager.module.name,
  gmfMapComponent.name,
  gmfThemeThemes.module.name,
  ngeoDatasourceDataSources.module.name,
  ngeoQueryBboxQueryComponent.name,
  ngeoQueryMapQueryComponent.name,
]);


exports.module.value('gmfTreeUrl',
  'https://geomapfish-demo.camptocamp.com/2.3/wsgi/themes?version=2&background=background');

exports.module.value('gmfTreeUrl',
  'https://geomapfish-demo.camptocamp.com/2.3/wsgi/themes?version=2&background=background');


exports.module.value('gmfLayersUrl',
  'https://geomapfish-demo.camptocamp.com/2.3/wsgi/layers/');

exports.module.value('gmfExternalOGCServers', [{
  'name': 'Swiss Topo WMS',
  'type': 'WMS',
  'url': 'https://wms.geo.admin.ch/?lang=fr'
}, {
  'name': 'ASIT VD',
  'type': 'WMTS',
  'url': 'https://ows.asitvd.ch/wmts/1.0.0/WMTSCapabilities.xml'
}, {
  'name': 'Swiss Topo WMTS',
  'type': 'WMTS',
  'url': 'https://wmts.geo.admin.ch/1.0.0/WMTSCapabilities.xml?lang=fr'
}]);

exports.module.constant('defaultTheme', 'Filters');
exports.module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');


exports.MainController = class {

  /**
   * @param {!angular.Scope} $scope Angular scope.
   * @param {gmf.datasource.Manager} gmfDataSourcesManager The gmf
   *     data sources manager service.
   * @param {gmf.theme.Themes} gmfThemes The gmf themes service.
   * @param {gmf.layertree.TreeManager} gmfTreeManager gmf Tree Manager service.
   * @param {ngeo.datasource.DataSources} ngeoDataSources Ngeo data sources service.
   * @ngInject
   */
  constructor($scope, gmfDataSourcesManager, gmfThemes, gmfTreeManager,
    ngeoDataSources
  ) {

    /**
     * @type {!angular.Scope}
     * @private
     */
    this.scope_ = $scope;

    gmfThemes.loadThemes();

    /**
     * @type {gmf.layertree.TreeManager}
     * @export
     */
    this.gmfTreeManager = gmfTreeManager;

    /**
     * @type {ol.Map}
     * @export
     */
    this.map = new olMap({
      layers: [
        new olLayerTile({
          source: new olSourceOSM()
        })
      ],
      view: new olView({
        projection: EPSG21781,
        resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
        center: [537635, 152640],
        zoom: 2
      })
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
     * @export
     */
    this.queryActive = true;

    // initialize tooltips
    $('[data-toggle="tooltip"]').tooltip({
      container: 'body',
      trigger: 'hover'
    });

  }
};


exports.module.controller('MainController', exports.MainController);


export default exports;
