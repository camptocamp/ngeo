goog.provide('gmfapp.displayquerywindow');

// webpack: import './displayquerywindow.css';
// webpack: import './common_dependencies.js';
goog.require('gmf');
goog.require('gmf.datasource.DataSourcesManager');
goog.require('gmf.datasource.Manager');
/** @suppress {extraRequire} */
goog.require('gmf.displayquerywindowComponent');
goog.require('gmf.layertree.component');
/** @suppress {extraRequire} */
goog.require('gmf.map.component');
/** @suppress {extraRequire} */
goog.require('gmf.query.windowComponent');
goog.require('gmf.theme.Themes');
goog.require('ngeo.misc.btnComponent');
/** @suppress {extraRequire} */
goog.require('ngeo.proj.EPSG21781');
/** @suppress {extraRequire} */
goog.require('ngeo.query.bboxQueryComponent');
/** @suppress {extraRequire} */
goog.require('ngeo.query.mapQueryComponent');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');
goog.require('ol.style.Circle');
goog.require('ol.style.Fill');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');

goog.require('ngeo.map.module');


/** @type {!angular.Module} **/
gmfapp.displayquerywindow.module = angular.module('gmfapp', [
  gmf.module.name, // Change me when gmf.Theme and other dependencies are in a module
  gmf.datasource.Manager.module.name,
  gmf.layertree.component.name,
  gmf.map.component.name,
  gmf.query.windowComponent.name,
  gmf.theme.Themes.module.name,
  ngeo.map.module.name, // for ngeo.map.FeatureOverlay, perhaps remove me
  ngeo.misc.btnComponent.name,
]);


gmfapp.displayquerywindow.module.value('ngeoQueryOptions', {
  'limit': 20
});


gmfapp.displayquerywindow.module.value(
  'gmfTreeUrl',
  'https://geomapfish-demo.camptocamp.net/2.2/wsgi/themes?' +
        'version=2&background=background');

gmfapp.displayquerywindow.constant('defaultTheme', 'Demo');
gmfapp.displayquerywindow.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');


/**
 * Demo, NOT USED.
 * A sample component to display the result.
 *
 * @type {!angular.Component}
 */
gmfapp.displayquerywindow.queryresultComponent = {
  controller: 'AppQueryresultController',
  controllerAs: 'qrCtrl',
  templateUrl: 'partials/queryresult.html'
};

gmfapp.displayquerywindow.module.component('appQueryresult', gmfapp.displayquerywindow.queryresultComponent);


/**
 * Demo, NOT USED.
 * @param {ngeox.QueryResult} ngeoQueryResult Query service.
 * @constructor
 * @ngInject
 */
gmfapp.displayquerywindow.QueryresultController = function(ngeoQueryResult) {

  /**
   * @type {ngeox.QueryResult}
   * @export
   */
  this.result = ngeoQueryResult;

};


gmfapp.displayquerywindow.module.controller('AppQueryresultController', gmfapp.displayquerywindow.QueryresultController);


/**
 * @constructor
 * @param {gmf.theme.Themes} gmfThemes The gmf themes service.
 * @param {gmf.datasource.Manager} gmfDataSourcesManager The gmf
 *     data sources manager service.
 * @param {ngeo.map.FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *   overlay manager service.
 * @ngInject
 */
gmfapp.displayquerywindow.MainController = function(gmfThemes, gmfDataSourcesManager,
  ngeoFeatureOverlayMgr) {

  gmfThemes.loadThemes();

  const fill = new ol.style.Fill({color: [255, 170, 0, 0.6]});
  const stroke = new ol.style.Stroke({color: [255, 170, 0, 1], width: 2});

  /**
   * FeatureStyle used by the gmf.query.windowComponent
   * @type {ol.style.Style}
   * @export
   */
  this.featureStyle = new ol.style.Style({
    fill: fill,
    image: new ol.style.Circle({
      fill: fill,
      radius: 5,
      stroke: stroke
    }),
    stroke: stroke
  });

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
      zoom: 3
    })
  });

  // Init the datasources with our map.
  gmfDataSourcesManager.setDatasourceMap(this.map);

  /**
   * @type {Array.<Object>|undefined}
   * export
   */
  this.themes = undefined;

  /**
   * @type {Object|undefined}
   * @export
   */
  this.treeSource = undefined;

  /**
   * @type {boolean}
   * @export
   */
  this.queryActive = true;

  gmfThemes.getThemesObject().then((themes) => {
    if (themes) {
      this.themes = themes;
      this.treeSource = themes[3];
    }
  });

  ngeoFeatureOverlayMgr.init(this.map);
};

gmfapp.displayquerywindow.module.controller('MainController', gmfapp.displayquerywindow.MainController);
