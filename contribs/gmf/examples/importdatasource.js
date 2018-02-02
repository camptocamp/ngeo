// Todo - use the 'Filter' theme instead if the 'Edit' theme

goog.provide('gmfapp.importdatasource');

// webpack: import './importdatasource.css';
// webpack: import './common_dependencies.js';
goog.require('gmf');
/** @suppress {extraRequire} */
goog.require('gmf.datasource.Manager');
goog.require('gmf.import.importdatasourceComponent');
goog.require('gmf.layertree.component');
goog.require('gmf.layertree.TreeManager');
/** @suppress {extraRequire} */
goog.require('gmf.map.component');
goog.require('gmf.theme.Themes');
goog.require('ngeo.datasource.DataSources');
/** @suppress {extraRequire} */
goog.require('ngeo.query.bboxQueryComponent');
goog.require('ngeo.query.mapQueryComponent');
/** @suppress {extraRequire} */
goog.require('ngeo.proj.EPSG21781');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');


/** @type {!angular.Module} **/
gmfapp.importdatasource.module = angular.module('gmfapp', [
  gmf.datasource.Manager.module.name,
  gmf.import.importdatasourceComponent.name,
  gmf.layertree.component.name,
  gmf.map.component.name,
  gmf.theme.Themes.module.name,
  ngeo.datasource.DataSources.module.name,
  ngeo.query.bboxQueryComponent.name,
  ngeo.query.mapQueryComponent.name,
]);


gmfapp.importdatasource.module.value('gmfTreeUrl',
  'https://geomapfish-demo.camptocamp.net/2.2/wsgi/themes?version=2&background=background');

gmfapp.importdatasource.module.value('gmfTreeUrl',
  'https://geomapfish-demo.camptocamp.net/2.2/wsgi/themes?version=2&background=background');


gmfapp.importdatasource.module.value('gmfLayersUrl',
  'https://geomapfish-demo.camptocamp.net/2.2/wsgi/layers/');

gmfapp.importdatasource.module.value('gmfExternalOGCServers', [{
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

gmfapp.importdatasource.constant('defaultTheme', 'Filters');
gmfapp.importdatasource.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');


gmfapp.importdatasource.MainController = class {

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
    this.map = new ol.Map({
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        projection: 'EPSG:21781',
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


gmfapp.importdatasource.module.controller('MainController', gmfapp.importdatasource.MainController);
