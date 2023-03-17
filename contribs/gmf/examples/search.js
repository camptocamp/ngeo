import angular from 'angular';
import appURL from './url.js';
import './search.css';
import gmfMapComponent from 'gmf/map/component.js';

import gmfSearchModule from 'gmf/search/module.js';
import gmfThemeThemes from 'gmf/theme/Themes.js';
import ngeoMessageNotification from 'ngeo/message/Notification.js';
import {MessageType} from 'ngeo/message/Message.js';
import EPSG21781 from '@geoblocks/proj/src/EPSG_21781.js';
import ngeoMapModule from 'ngeo/map/module.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';
import olStyleCircle from 'ol/style/Circle.js';
import olStyleFill from 'ol/style/Fill.js';
import olStyleStroke from 'ol/style/Stroke.js';
import olStyleStyle from 'ol/style/Style.js';

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('gmfapp', [
  'gettext',
  gmfMapComponent.name,
  gmfSearchModule.name,
  gmfThemeThemes.name,
  ngeoMapModule.name, // for ngeo.map.FeatureOverlay, perhaps remove me
  ngeoMessageNotification.name,
]);

module.value('gmfTreeUrl', appURL.GMF_THEMES);
module.value('fulltextsearchUrl', `${appURL.SEARCH}?limit=30&partitionlimit=5&interface=desktop`);
module.value('gmfLayersUrl', appURL.GMF_LAYERS);

module.constant('defaultTheme', 'Demo');
module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');

/**
 * @param {import("gmf/theme/Themes.js").ThemesService} gmfThemes Themes service.
 * @param {import("ngeo/map/FeatureOverlayMgr.js").FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo
 *    feature overlay manager service.
 * @param {import("ngeo/message/Notification.js").MessageNotification} ngeoNotification Ngeo notification
 *    service.
 * @constructor
 * @ngInject
 */
function MainController(gmfThemes, ngeoFeatureOverlayMgr, ngeoNotification) {
  gmfThemes.loadThemes();

  ngeoFeatureOverlayMgr.init(this.map);

  /**
   * @type {Array<import('gmf/search/component.js').SearchComponentDatasource>}
   */
  this.searchDatasources = [
    {
      datasetTitle: 'test',
      groupValues: ['osm', 'district'],
      groupActions: [],
      labelKey: 'label',
      projection: EPSG21781,
      bloodhoundOptions: /** @type {Bloodhound.BloodhoundOptions<any>} */ ({
        remote: {
          rateLimitWait: 250,
        },
      }),
      url: appURL.SEARCH,
    },
  ];

  const fill = new olStyleFill({color: [255, 255, 255, 0.6]});
  const stroke = new olStyleStroke({color: [255, 0, 0, 1], width: 2});
  /**
   * @type {Object.<string, import("ol/style/Style.js").default>} Map of styles for search overlay.
   */
  this.searchStyles = {
    'osm': new olStyleStyle({
      fill: fill,
      image: new olStyleCircle({
        fill: fill,
        radius: 5,
        stroke: stroke,
      }),
      stroke: stroke,
    }),
  };

  /**
   * @type {Twitter.Typeahead.Options}
   */
  this.searchOptions = {
    minLength: 2,
  };

  /**
   * @type {string}
   */
  this.inputValue = '';

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
      center: [0, 0],
      zoom: 4,
    }),
  });

  /**
   * @type {function(): void}
   */
  this.searchIsReady = () => {
    ngeoNotification.notify({
      msg: 'gmf-search initialized',
      target: '#message',
      type: MessageType.SUCCESS,
    });
  };
}

module.controller('MainController', MainController);

export default module;
