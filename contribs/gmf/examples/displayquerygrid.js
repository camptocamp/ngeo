/**
 * @module gmfapp.displayquerygrid
 */
const exports = {};

import './displayquerygrid.css';
import gmfDatasourceManager from 'gmf/datasource/Manager.js';

import gmfLayertreeComponent from 'gmf/layertree/component.js';

/** @suppress {extraRequire} */
import gmfMapComponent from 'gmf/map/component.js';

/** @suppress {extraRequire} */
import gmfQueryGridComponent from 'gmf/query/gridComponent.js';

import gmfThemeThemes from 'gmf/theme/Themes.js';
import ngeoGridModule from 'ngeo/grid/module.js';
import ngeoMapModule from 'ngeo/map/module.js';
import ngeoMiscBtnComponent from 'ngeo/misc/btnComponent.js';
import EPSG21781 from 'ngeo/proj/EPSG21781.js';
import ngeoQueryBboxQueryComponent from 'ngeo/query/bboxQueryComponent.js';
import ngeoQueryMapQueryComponent from 'ngeo/query/mapQueryComponent.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';
import olStyleCircle from 'ol/style/Circle.js';
import olStyleFill from 'ol/style/Fill.js';
import olStyleStroke from 'ol/style/Stroke.js';
import olStyleStyle from 'ol/style/Style.js';


/** @type {!angular.Module} **/
exports.module = angular.module('gmfapp', [
  'gettext',
  gmfDatasourceManager.module.name,
  gmfLayertreeComponent.name,
  gmfMapComponent.name,
  gmfQueryGridComponent.name,
  gmfThemeThemes.module.name,
  ngeoGridModule.name,
  ngeoMapModule.name, // for ngeo.map.FeatureOverlay, perhaps remove me
  ngeoMiscBtnComponent.name,
  ngeoQueryBboxQueryComponent.name,
  ngeoQueryMapQueryComponent.name,
]);


exports.module.constant('ngeoQueryOptions', {
  'limit': 20,
  'queryCountFirst': true
});


exports.module.constant(
  'gmfTreeUrl',
  'https://geomapfish-demo-dc.camptocamp.com/2.4/themes?' +
        'version=2&background=background');

exports.module.constant('defaultTheme', 'Demo');
exports.module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');


/**
 * Demo, NOT USED.
 * A sample component to display the result.
 *
 * @type {!angular.Component}
 */
exports.queryresultComponent = {
  controller: 'gmfappQueryresultController',
  template: require('./partials/queryresult.html')
};

exports.module.component('gmfappQueryresult', exports.queryresultComponent);


/**
 * Demo, NOT USED.
 * @param {ngeox.QueryResult} ngeoQueryResult Query service.
 * @constructor
 * @ngInject
 */
exports.QueryresultController = function(ngeoQueryResult) {

  /**
   * @type {ngeox.QueryResult}
   * @export
   */
  this.result = ngeoQueryResult;

};


exports.module.controller('gmfappQueryresultController', exports.QueryresultController);


/**
 * @constructor
 * @param {gmf.theme.Themes} gmfThemes The gmf themes service.
 * @param {gmf.datasource.Manager} gmfDataSourcesManager The gmf
 *     data sources manager service.
 * @param {ngeo.map.FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *   overlay manager service.
 * @ngInject
 */
exports.MainController = function(gmfThemes, gmfDataSourcesManager,
  ngeoFeatureOverlayMgr) {

  gmfThemes.loadThemes();

  const fill = new olStyleFill({color: [255, 170, 0, 0.6]});
  const stroke = new olStyleStroke({color: [255, 170, 0, 1], width: 2});

  /**
   * FeatureStyle used by the displayquerygrid directive
   * @type {ol.style.Style}
   * @export
   */
  this.featureStyle = new olStyleStyle({
    fill: fill,
    image: new olStyleCircle({
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

exports.module.controller('MainController', exports.MainController);


export default exports;
