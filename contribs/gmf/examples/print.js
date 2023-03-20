import angular from 'angular';
import appURL from './url.js';
import './print.css';
import gmfLayertreeComponent from 'gmf/layertree/component.js';

import gmfMapComponent from 'gmf/map/component.js';

import gmfPrintComponent from 'gmf/print/component.js';

import gmfThemeThemes from 'gmf/theme/Themes.js';
import ngeoMapModule from 'ngeo/map/module.js';
import EPSG21781 from '@geoblocks/proj/src/EPSG_21781.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('gmfapp', [
  'gettext',
  gmfLayertreeComponent.name,
  gmfMapComponent.name,
  gmfPrintComponent.name,
  gmfThemeThemes.name,
  ngeoMapModule.name, //for ngeo.map.FeatureOverlay, perhaps remove me
]);

module.value('gmfTreeUrl', appURL.GMF_THEMES);
module.value('gmfPrintUrl', appURL.PRINT_PROXY);
module.value('authenticationBaseUrl', appURL.GMF_DEMO);
module.value('gmfLayersUrl', appURL.GMF_LAYERS);

module.constant('defaultTheme', 'Demo');
module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');

/**
 * @constructor
 * @param {import("gmf/theme/Themes.js").ThemesService} gmfThemes The gmf themes service.
 * @param {import("ngeo/map/FeatureOverlayMgr.js").FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *   overlay manager service.
 * @ngInject
 */
function MainController(gmfThemes, ngeoFeatureOverlayMgr) {
  gmfThemes.loadThemes();

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

  /**
   * @type {Object.<string, string|number|boolean>}
   */
  this.defaulPrintFieldstValues = {
    'comments': 'Default comments example',
    'legend': true,
  };

  /**
   * @type {Array.<Object>|undefined}
   */
  this.themes = undefined;

  /**
   * @type {Object|undefined}
   */
  this.treeSource = undefined;

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
