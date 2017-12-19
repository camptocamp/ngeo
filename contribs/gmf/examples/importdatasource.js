// Todo - use the 'Filter' theme instead if the 'Edit' theme

goog.provide('gmfapp.importdatasource');

goog.require('gmf.Themes');
goog.require('gmf.TreeManager');
/** @suppress {extraRequire} */
goog.require('gmf.datasource.DataSourcesManager');
/** @suppress {extraRequire} */
goog.require('gmf.importdatasourceComponent');
/** @suppress {extraRequire} */
goog.require('gmf.layertreeComponent');
/** @suppress {extraRequire} */
goog.require('gmf.mapDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.query.bboxQueryComponent');
/** @suppress {extraRequire} */
goog.require('ngeo.query.mapQueryDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.proj.EPSG21781');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');


/** @type {!angular.Module} **/
gmfapp.module = angular.module('gmfapp', ['gmf']);


gmfapp.module.value('gmfTreeUrl',
  'https://geomapfish-demo.camptocamp.net/2.2/wsgi/themes?version=2&background=background');

gmfapp.module.value('gmfTreeUrl',
  'https://geomapfish-demo.camptocamp.net/2.2/wsgi/themes?version=2&background=background');


gmfapp.module.value('gmfLayersUrl',
  'https://geomapfish-demo.camptocamp.net/2.2/wsgi/layers/');

gmfapp.module.value('gmfExternalOGCServers', [{
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


gmfapp.MainController = class {

  /**
   * @param {!angular.Scope} $scope Angular scope.
   * @param {gmf.datasource.DataSourcesManager} gmfDataSourcesManager The gmf
   *     data sources manager service.
   * @param {gmf.Themes} gmfThemes The gmf themes service.
   * @param {gmf.TreeManager} gmfTreeManager gmf Tree Manager service.
   * @param {ngeo.datasource.DataSources} ngeoDataSources Ngeo collection of
   *     data sources objects.
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
     * @type {gmf.TreeManager}
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


gmfapp.module.controller('MainController', gmfapp.MainController);
