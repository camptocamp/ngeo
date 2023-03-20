import angular from 'angular';
import appURL from './url.js';
import './backgroundlayerselector.css';
import gmfBackgroundlayerselectorModule from 'gmf/backgroundlayerselector/module.js';

import gmfMapComponent from 'gmf/map/component.js';

import gmfThemeThemes from 'gmf/theme/Themes.js';
import EPSG21781 from '@geoblocks/proj/src/EPSG_21781.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('gmfapp', [
  'gettext',
  gmfBackgroundlayerselectorModule.name,
  gmfMapComponent.name,
  gmfThemeThemes.name,
]);

module.value('gmfTreeUrl', appURL.GMF_THEMES);

module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');

/**
 * @param {import("gmf/theme/Themes.js").ThemesService} gmfThemes Themes service.
 * @constructor
 * @ngInject
 */
function MainController(gmfThemes) {
  gmfThemes.loadThemes();

  /**
   * @type {import("ol/Map.js").default}
   */
  this.map = new olMap({
    layers: [],
    view: new olView({
      center: [632464, 185457],
      projection: EPSG21781,
      minZoom: 3,
      zoom: 3,
    }),
  });
}

module.controller('MainController', MainController);

export default module;
