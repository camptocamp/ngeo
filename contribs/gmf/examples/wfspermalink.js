import angular from 'angular';
import appURL from './url.js';
import './wfspermalink.css';
import gmfMapModule from 'gmf/map/module.js';

import gmfQueryWindowComponent from 'gmf/query/windowComponent.js';
import ngeoStatemanagerWfsPermalink from 'ngeo/statemanager/WfsPermalink.js';

import EPSG21781 from '@geoblocks/proj/src/EPSG_21781.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';
import olStyleStroke from 'ol/style/Stroke.js';
import olStyleStyle from 'ol/style/Style.js';
import olStyleFill from 'ol/style/Fill.js';
import olStyleCircle from 'ol/style/Circle.js';

/** @type {!angular.IModule} **/
const module = angular.module('gmfapp', [
  'gettext',
  gmfMapModule.name,
  gmfQueryWindowComponent.name,
  ngeoStatemanagerWfsPermalink.name,
]);

module.value(
  'ngeoWfsPermalinkOptions',
  /** @type {import('ngeo/statemanager/WfsPermalink.js').WfsPermalinkOptions} */ ({
    wfsTypes: [
      {featureType: 'fuel', label: 'display_name'},
      {featureType: 'osm_scale', label: 'display_name'},
    ],
    defaultFeatureNS: appURL.MAPSERVER_WFS_FEATURE_NS,
    defaultFeaturePrefix: 'feature',
  })
);

module.constant('ngeoPermalinkOgcserverUrl', appURL.MAPSERVER_PROXY);
module.constant('defaultTheme', 'Demo');
module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');

/**
 * @constructor
 * @ngInject
 */
function MainController() {
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
}

module.controller('MainController', MainController);

export default module;
