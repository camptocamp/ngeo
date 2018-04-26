/**
 * @module gmfapp.search
 */
const exports = {};

import './search.css';
/** @suppress {extraRequire} */
import gmfMapComponent from 'gmf/map/component.js';

import gmfSearchModule from 'gmf/search/module.js';
import gmfThemeThemes from 'gmf/theme/Themes.js';
import ngeoMessageNotification from 'ngeo/message/Notification.js';
import ngeoMessageMessage from 'ngeo/message/Message.js';
import EPSG21781 from 'ngeo/proj/EPSG21781.js';
import ngeoMapModule from 'ngeo/map/module.js';
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
  gmfMapComponent.name,
  gmfSearchModule.name,
  gmfThemeThemes.module.name,
  ngeoMapModule.name, // for ngeo.map.FeatureOverlay, perhaps remove me
  ngeoMessageNotification.module.name,
]);

exports.module.value('gmfTreeUrl',
  'https://geomapfish-demo.camptocamp.com/2.3/wsgi/themes?version=2&background=background');

exports.module.value('fulltextsearchUrl',
  'https://geomapfish-demo.camptocamp.com/2.3/wsgi/fulltextsearch?limit=30&partitionlimit=5&interface=desktop');

exports.module.value('gmfLayersUrl',
  'https://geomapfish-demo.camptocamp.com/2.3/wsgi/layers/');

exports.module.constant('defaultTheme', 'Demo');
exports.module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');


/**
 * @param {gmf.theme.Themes} gmfThemes Themes service.
 * @param {ngeo.map.FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature overlay manager service.
 * @param {ngeo.message.Notification} ngeoNotification Ngeo notification service.
 * @constructor
 * @ngInject
 */
exports.MainController = function(gmfThemes, ngeoFeatureOverlayMgr, ngeoNotification) {

  gmfThemes.loadThemes();

  ngeoFeatureOverlayMgr.init(this.map);

  /**
   * @type {Array.<gmfx.SearchComponentDatasource>}
   * @export
   */
  this.searchDatasources = [{
    groupValues: ['osm', 'district'],
    groupActions: [],
    labelKey: 'label',
    projection: EPSG21781,
    bloodhoundOptions: {
      remote: {
        rateLimitWait: 250
      }
    },
    url: 'https://geomapfish-demo.camptocamp.com/2.3/wsgi/fulltextsearch'
  }];

  const fill = new olStyleFill({color: [255, 255, 255, 0.6]});
  const stroke = new olStyleStroke({color: [255, 0, 0, 1], width: 2});
  /**
   * @type {Object.<string, ol.style.Style>} Map of styles for search overlay.
   * @export
   */
  this.searchStyles = {
    'osm': new olStyleStyle({
      fill: fill,
      image: new olStyleCircle({
        fill: fill,
        radius: 5,
        stroke: stroke
      }),
      stroke: stroke
    })
  };

  /**
   * @type {TypeaheadOptions}
   * @export
   */
  this.searchOptions = {
    minLength: 2
  };

  /**
   * @type {string}
   * @export
   */
  this.inputValue = '';

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
      center: [0, 0],
      zoom: 4
    })
  });

  /**
   * @type {function()}
   * @export
   */
  this.searchIsReady = () => {
    ngeoNotification.notify({
      msg: 'gmf-search initialized',
      target: angular.element('#message'),
      type: ngeoMessageMessage.Type.SUCCESS
    });
  };
};

exports.module.controller('MainController', exports.MainController);


export default exports;
