/**
 * @module gmfapp.wfspermalink
 */
const exports = {};

import './wfspermalink.css';
/** @suppress {extraRequire} */
import gmfMapComponent from 'gmf/map/component.js';

/** @suppress {extraRequire} */
import gmfQueryWindowComponent from 'gmf/query/windowComponent.js';

import EPSG21781 from 'ngeo/proj/EPSG21781.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';
import olStyleStroke from 'ol/style/Stroke.js';
import olStyleStyle from 'ol/style/Style.js';
import olStyleFill from 'ol/style/Fill.js';
import olStyleCircle from 'ol/style/Circle.js';


/** @type {!angular.Module} **/
exports.module = angular.module('gmfapp', [
  'gettext',
  gmfMapComponent.name,
  gmfQueryWindowComponent.name,
]);

exports.module.value('ngeoWfsPermalinkOptions',
  /** @type {ngeox.WfsPermalinkOptions} */ ({
    url: 'https://geomapfish-demo.camptocamp.com/2.3/wsgi/mapserv_proxy',
    wfsTypes: [
      {featureType: 'fuel', label: 'display_name'},
      {featureType: 'osm_scale', label: 'display_name'}
    ],
    defaultFeatureNS: 'http://mapserver.gis.umn.edu/mapserver',
    defaultFeaturePrefix: 'feature'
  }));

exports.module.constant('defaultTheme', 'Demo');
exports.module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');


/**
 * @constructor
 * @ngInject
 */
exports.MainController = function() {
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

  const fill = new olStyleFill({color: [255, 170, 0, 0.6]});
  const stroke = new olStyleStroke({color: [255, 170, 0, 1], width: 2});

  /**
   * FeatureStyle used by the gmf.query.windowComponent
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
};

exports.module.controller('MainController', exports.MainController);


export default exports;
