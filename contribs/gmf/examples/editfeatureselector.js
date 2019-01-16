/**
 * @module gmfapp.editfeatureselector
 */
const exports = {};

import angular from 'angular';
import appURL from './url.js';
import './editfeatureselector.css';
import 'jquery-ui/ui/widgets/tooltip.js';
import gmfAuthenticationModule from 'gmf/authentication/module.js';

import gmfEditingEditFeatureSelectorComponent from 'gmf/editing/editFeatureSelectorComponent.js';

import gmfLayertreeComponent from 'gmf/layertree/component.js';
import gmfLayertreeTreeManager from 'gmf/layertree/TreeManager.js';

import gmfMapComponent from 'gmf/map/component.js';

import gmfThemeThemes from 'gmf/theme/Themes.js';
import ngeoMiscFeatureHelper from 'ngeo/misc/FeatureHelper.js';
import ngeoMiscToolActivate from 'ngeo/misc/ToolActivate.js';
import ngeoMiscToolActivateMgr from 'ngeo/misc/ToolActivateMgr.js';
import EPSG21781 from '@geoblocks/proj/src/EPSG_21781.js';
import olCollection from 'ol/Collection.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olLayerVector from 'ol/layer/Vector.js';
import olSourceOSM from 'ol/source/OSM.js';
import olSourceVector from 'ol/source/Vector.js';


/** @type {!angular.IModule} **/
exports.module = angular.module('gmfapp', [
  'gettext',
  gmfAuthenticationModule.name,
  gmfEditingEditFeatureSelectorComponent.name,
  gmfLayertreeComponent.name,
  gmfLayertreeTreeManager.module.name,
  gmfMapComponent.name,
  gmfThemeThemes.module.name,
  ngeoMiscFeatureHelper.module.name,
  ngeoMiscToolActivateMgr.module.name,
]);


exports.module.value('gmfTreeUrl', appURL.GMF_THEMES);
exports.module.value('authenticationBaseUrl', appURL.GMF_DEMO);
exports.module.value('gmfLayersUrl', appURL.GMF_LAYERS);

exports.module.constant('defaultTheme', 'Edit');
exports.module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');


/**
 * @param {!angular.IScope} $scope Angular scope.
 * @param {gmf.theme.Themes} gmfThemes The gmf themes service.
 * @param {gmf.layertree.TreeManager} gmfTreeManager gmf Tree Manager service.
 * @param {gmfx.User} gmfUser User.
 * @param {ngeo.misc.FeatureHelper} ngeoFeatureHelper Ngeo feature helper service.
 * @param {ngeo.misc.ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate manager
 *     service.
 * @ngInject
 * @constructor
 */
exports.MainController = function($scope, gmfThemes, gmfTreeManager, gmfUser,
  ngeoFeatureHelper, ngeoToolActivateMgr) {

  /**
   * @type {!angular.IScope}
   * @private
   */
  this.scope_ = $scope;

  /**
   * @type {gmfx.User}
   * @export
   */
  this.gmfUser = gmfUser;

  /**
   * @type {ngeo.misc.FeatureHelper}
   * @private
   */
  this.featureHelper_ = ngeoFeatureHelper;

  gmfThemes.loadThemes();

  /**
   * @type {gmf.layertree.TreeManager}
   * @export
   */
  this.gmfTreeManager = gmfTreeManager;


  /**
   * @type {ol.layer.Vector}
   * @export
   */
  this.vectorLayer = new olLayerVector({
    source: new olSourceVector({
      wrapX: false,
      features: new olCollection()
    }),
    style: (feature, resolution) => ngeoFeatureHelper.createEditingStyles(feature)
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
      zoom: 2
    })
  });

  gmfThemes.getThemesObject().then((themes) => {
    if (themes) {
      // Add 'Edit' theme, i.e. the one with id 73
      for (let i = 0, ii = themes.length; i < ii; i++) {
        if (themes[i].id === 73) {
          this.gmfTreeManager.setFirstLevelGroups(themes[i].children);
          break;
        }
      }

      // Add layer vector after
      this.map.addLayer(this.vectorLayer);
    }
  });

  /**
   * @type {boolean}
   * @export
   */
  this.editFeatureSelectorActive = true;

  const editFeatureSelectorToolActivate = new ngeoMiscToolActivate(
    this, 'editFeatureSelectorActive');
  ngeoToolActivateMgr.registerTool(
    'mapTools', editFeatureSelectorToolActivate, true);

  /**
   * @type {boolean}
   * @export
   */
  this.dummyActive = false;

  const dummyToolActivate = new ngeoMiscToolActivate(
    this, 'dummyActive');
  ngeoToolActivateMgr.registerTool(
    'mapTools', dummyToolActivate, false);

  // initialize tooltips
  $('[data-toggle="tooltip"]').tooltip({
    container: 'body',
    trigger: 'hover'
  });

};


exports.module.controller('MainController', exports.MainController);


export default exports;
