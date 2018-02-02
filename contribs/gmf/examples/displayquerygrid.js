goog.provide('gmfapp.displayquerygrid');

// webpack: import './displayquerygrid.css';
// webpack: import './common_dependencies.js';
goog.require('gmf');
goog.require('gmf.datasource.Manager');
goog.require('gmf.layertree.component');
/** @suppress {extraRequire} */
goog.require('gmf.map.component');
/** @suppress {extraRequire} */
goog.require('gmf.query.gridComponent');
goog.require('gmf.theme.Themes');
goog.require('ngeo.grid.module');
goog.require('ngeo.map.module');
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


/** @type {!angular.Module} **/
gmfapp.displayquerygrid.module = angular.module('gmfapp', [
  gmf.datasource.Manager.module.name,
  gmf.layertree.component.name,
  gmf.map.component.name,
  gmf.query.gridComponent.name,
  gmf.theme.Themes.module.name,
  ngeo.grid.module.name,
  ngeo.map.module.name, // for ngeo.map.FeatureOverlay, perhaps remove me
  ngeo.misc.btnComponent.name,
]);


gmfapp.displayquerygrid.module.constant('ngeoQueryOptions', {
  'limit': 20,
  'queryCountFirst': true
});


gmfapp.displayquerygrid.module.constant(
  'gmfTreeUrl',
  'https://geomapfish-demo.camptocamp.net/2.2/wsgi/themes?' +
        'version=2&background=background');

gmfapp.displayquerygrid.constant('defaultTheme', 'Demo');
gmfapp.displayquerygrid.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');


/**
 * Demo, NOT USED.
 * A sample component to display the result.
 *
 * @type {!angular.Component}
 */
gmfapp.displayquerygrid.queryresultComponent = {
  controller: 'gmfappQueryresultController',
  controllerAs: 'qrCtrl',
  templateUrl: 'partials/queryresult.html'
};

gmfapp.displayquerygrid.module.component('gmfappQueryresult', gmfapp.displayquerygrid.queryresultComponent);


/**
 * Demo, NOT USED.
 * @param {ngeox.QueryResult} ngeoQueryResult Query service.
 * @constructor
 * @ngInject
 */
gmfapp.displayquerygrid.QueryresultController = function(ngeoQueryResult) {

  /**
   * @type {ngeox.QueryResult}
   * @export
   */
  this.result = ngeoQueryResult;

};


gmfapp.displayquerygrid.module.controller('gmfappQueryresultController', gmfapp.displayquerygrid.QueryresultController);


/**
 * @constructor
 * @param {gmf.theme.Themes} gmfThemes The gmf themes service.
 * @param {gmf.datasource.Manager} gmfDataSourcesManager The gmf
 *     data sources manager service.
 * @param {ngeo.map.FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *   overlay manager service.
 * @ngInject
 */
gmfapp.displayquerygrid.MainController = function(gmfThemes, gmfDataSourcesManager,
  ngeoFeatureOverlayMgr) {

  gmfThemes.loadThemes();

  const fill = new ol.style.Fill({color: [255, 170, 0, 0.6]});
  const stroke = new ol.style.Stroke({color: [255, 170, 0, 1], width: 2});

  /**
   * FeatureStyle used by the displayquerygrid directive
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

  /**
   * @type {boolean}
   * @export
   */
  this.queryGridActive = true;

  gmfThemes.getThemesObject().then((themes) => {
    if (themes) {
      this.themes = themes;
      this.treeSource = themes[3];
    }
  });

  ngeoFeatureOverlayMgr.init(this.map);
};

gmfapp.displayquerygrid.module.controller('MainController', gmfapp.displayquerygrid.MainController);
