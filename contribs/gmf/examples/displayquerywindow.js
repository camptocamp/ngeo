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

/**
 * @type {!angular.IModule}
 * @hidden
 */
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

module.value('ngeoQueryOptions', {
  'limit': 20,
});

module.value('gmfTreeUrl', appURL.GMF_THEMES);

module.constant('defaultTheme', 'Demo');
module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');

/**
 * Demo, NOT USED.
 * A sample component to display the result.
 *
 * @type {!angular.IComponentOptions}
 * @hidden
 */
const queryresultComponent = {
  controller: 'AppQueryresultController',
  // @ts-ignore: webpack
  template: require('./partials/queryresult.html'),
};

module.component('appQueryresult', queryresultComponent);

/**
 * Demo, NOT USED.
 * @param {import('ngeo/query/MapQuerent.js').QueryResult} ngeoQueryResult Query service.
 * @constructor
 * @ngInject
 */
function QueryresultController(ngeoQueryResult) {
  /**
   * @type {import('ngeo/query/MapQuerent.js').QueryResult}
   */
  this.result = ngeoQueryResult;
}

module.controller('AppQueryresultController', QueryresultController);

/**
 * @constructor
 * @param {import("gmf/theme/Themes.js").ThemesService} gmfThemes The gmf themes service.
 * @param {import("gmf/datasource/Manager.js").DatasourceManager} gmfDataSourcesManager The gmf
 *     data sources manager service.
 * @param {import("ngeo/map/FeatureOverlayMgr.js").FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *   overlay manager service.
 * @ngInject
 */
function MainController(gmfThemes, gmfDataSourcesManager, ngeoFeatureOverlayMgr) {
  gmfThemes.loadThemes();

  /**
   * @type {boolean}
   */
  this.desktop = true;

  const fill = new olStyleFill({color: [255, 170, 0, 0.6]});
  const stroke = new olStyleStroke({color: [255, 170, 0, 1], width: 2});

  /**
   * FeatureStyle used by the gmf.query.windowComponent
   * @type {import("ol/style/Style.js").default}
   */
  this.featureStyle = new olStyleStyle({
    fill: fill,
    image: new olStyleCircle({
      fill: fill,
      radius: 5,
      stroke: stroke,
    }),
    stroke: stroke,
  });

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
      projection: EPSG21781,
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [537635, 152640],
      zoom: 3,
    }),
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
   */
  this.treeSource = undefined;

  /**
   * @type {boolean}
   */
  this.queryActive = true;

  gmfThemes.getThemesObject().then((themes) => {
    if (themes) {
      this.themes = themes;
      this.treeSource = themes[3];
    }
  });

  ngeoFeatureOverlayMgr.init(this.map);
}

module.controller('MainController', MainController);

export default module;
