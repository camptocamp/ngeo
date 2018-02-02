// Todo - use the 'Filter' theme instead if the 'Edit' theme

goog.provide('gmfapp.filterselector');

// webpack: import './filterselector.css';
// webpack: import './common_dependencies.js';
goog.require('gmf');
goog.require('gmf.authentication.module');
/** @suppress {extraRequire} */
goog.require('gmf.datasource.Manager');
goog.require('gmf.filters.module');
goog.require('gmf.layertree.component');
goog.require('gmf.layertree.TreeManager');
/** @suppress {extraRequire} */
goog.require('gmf.map.component');
goog.require('gmf.theme.Themes');
goog.require('ngeo.datasource.DataSources');
/** @suppress {extraRequire} */
goog.require('ngeo.query.bboxQueryComponent');
/** @suppress {extraRequire} */
goog.require('ngeo.query.mapQueryComponent');
goog.require('ngeo.misc.ToolActivate');
goog.require('ngeo.misc.ToolActivateMgr');
/** @suppress {extraRequire} */
goog.require('ngeo.proj.EPSG21781');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');


/** @type {!angular.Module} **/
gmfapp.filterselector.module = angular.module('gmfapp', [
  gmf.authentication.module.name,
  gmf.datasource.Manager.module.name,
  gmf.layertree.component.name,
  gmf.filters.module.name,
  gmf.map.component.name,
  gmf.theme.Themes.module.name,
  ngeo.datasource.DataSources.module.name,
  ngeo.misc.ToolActivateMgr.module.name,
]);


gmfapp.filterselector.module.value('gmfTreeUrl',
  'https://geomapfish-demo.camptocamp.net/2.2/wsgi/themes?version=2&background=background');


gmfapp.filterselector.module.value(
  'authenticationBaseUrl',
  'https://geomapfish-demo.camptocamp.net/2.2/wsgi');


gmfapp.filterselector.module.value('gmfTreeUrl',
  'https://geomapfish-demo.camptocamp.net/2.2/wsgi/themes?version=2&background=background');


gmfapp.filterselector.module.value('gmfLayersUrl',
  'https://geomapfish-demo.camptocamp.net/2.2/wsgi/layers/');

gmfapp.filterselector.constant('defaultTheme', 'Filters');
gmfapp.filterselector.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');


gmfapp.filterselector.MainController = class {

  /**
   * @param {!angular.Scope} $scope Angular scope.
   * @param {gmf.datasource.Manager} gmfDataSourcesManager The gmf
   *     data sources manager service.
   * @param {gmf.theme.Themes} gmfThemes The gmf themes service.
   * @param {gmf.layertree.TreeManager} gmfTreeManager gmf Tree Manager service.
   * @param {ngeo.datasource.DataSources} ngeoDataSources Ngeo data sources service.
   * @param {ngeo.misc.ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate manager
   *     service.
   * @ngInject
   */
  constructor($scope, gmfDataSourcesManager, gmfThemes, gmfTreeManager,
    ngeoDataSources, ngeoToolActivateMgr
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
     * @type {string}
     * @export
     */
    this.toolGroup = 'mapTools';

    /**
     * @type {boolean}
     * @export
     */
    this.filterSelectorActive = true;

    const filterSelectorToolActivate = new ngeo.misc.ToolActivate(
      this, 'filterSelectorActive');
    ngeoToolActivateMgr.registerTool(
      'dummyTools', filterSelectorToolActivate, true);

    /**
     * @type {boolean}
     * @export
     */
    this.dummyActive = false;

    const dummyToolActivate = new ngeo.misc.ToolActivate(
      this, 'dummyActive');
    ngeoToolActivateMgr.registerTool(
      'dummyTools', dummyToolActivate, false);

    /**
     * @type {boolean}
     * @export
     */
    this.queryActive = true;

    const queryToolActivate = new ngeo.misc.ToolActivate(
      this, 'queryActive');
    ngeoToolActivateMgr.registerTool(
      this.toolGroup, queryToolActivate, true);

    // initialize tooltips
    $('[data-toggle="tooltip"]').tooltip({
      container: 'body',
      trigger: 'hover'
    });

  }
};


gmfapp.filterselector.module.controller('MainController', gmfapp.filterselector.MainController);
