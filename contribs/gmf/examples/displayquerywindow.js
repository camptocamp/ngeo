/**
 */

import angular from 'angular';
import appURL from './url.js';
import './displayquerywindow.css';
import gmfDatasourceManager from 'gmf/datasource/Manager.js';

import gmfLayertreeComponent from 'gmf/layertree/component.js';

import gmfMapComponent from 'gmf/map/component.js';

import gmfQueryWindowComponent from 'gmf/query/windowComponent.js';

import gmfThemeThemes from 'gmf/theme/Themes.js';
import ngeoMiscBtnComponent from 'ngeo/misc/btnComponent.js';
import EPSG21781 from '@geoblocks/proj/src/EPSG_21781.js';
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
import ngeoMapModule from 'ngeo/map/module.js';


/** @type {!angular.IModule} **/
const module = angular.module('gmfapp', [
  'gettext',
  gmfDatasourceManager.name,
  gmfLayertreeComponent.name,
  gmfMapComponent.name,
  gmfQueryWindowComponent.name,
  gmfThemeThemes.name,
  ngeoMapModule.name, // for ngeo.map.FeatureOverlay, perhaps remove me
  ngeoMiscBtnComponent.name,
  ngeoQueryBboxQueryComponent.name,
  ngeoQueryMapQueryComponent.name,
]);


exports.module.value('ngeoQueryOptions', {
  'limit': 20
});


exports.module.value('gmfTreeUrl', appURL.GMF_THEMES);

exports.module.constant('defaultTheme', 'Demo');
exports.module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');


/**
 * Demo, NOT USED.
 * A sample component to display the result.
 *
 * @type {!angular.IComponentOptions}
 */
exports.queryresultComponent = {
  controller: 'AppQueryresultController',
  template: require('./partials/queryresult.html')
};

exports.module.component('appQueryresult', exports.queryresultComponent);


/**
 * Demo, NOT USED.
 * @param {QueryResult} ngeoQueryResult Query service.
 * @constructor
 * @ngInject
 */
exports.QueryresultController = function(ngeoQueryResult) {

  /**
   * @type {QueryResult}
   * @export
   */
  this.result = ngeoQueryResult;

};


exports.module.controller('AppQueryresultController', exports.QueryresultController);


/**
 * @constructor
 * @param {import("gmf/theme/Themes.js").default} gmfThemes The gmf themes service.
 * @param {import("gmf/datasource/Manager.js").default} gmfDataSourcesManager The gmf
 *     data sources manager service.
 * @param {import("ngeo/map/FeatureOverlayMgr.js").default} ngeoFeatureOverlayMgr The ngeo feature
 *   overlay manager service.
 * @ngInject
 */
exports.MainController = function(gmfThemes, gmfDataSourcesManager,
  ngeoFeatureOverlayMgr) {

  gmfThemes.loadThemes();

  /**
   * @type {boolean}
   * @export
   */
  this.desktop = true;

  const fill = new olStyleFill({color: [255, 170, 0, 0.6]});
  const stroke = new olStyleStroke({color: [255, 170, 0, 1], width: 2});

  /**
   * FeatureStyle used by the gmf.query.windowComponent
   * @type {import("ol/style/Style.js").default}
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
   * @type {import("ol/Map.js").default}
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
