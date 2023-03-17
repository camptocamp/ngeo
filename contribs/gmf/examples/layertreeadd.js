import angular from 'angular';
import appURL from './url.js';
import './layertreeadd.css';
import gmfDisclaimerModule from 'gmf/disclaimer/module.js';

import gmfLayertreeComponent from 'gmf/layertree/component.js';
import gmfLayertreeTreeManager from 'gmf/layertree/TreeManager.js';

import gmfMapComponent from 'gmf/map/component.js';

import gmfThemeThemes from 'gmf/theme/Themes.js';

import gmfThemeManager from 'gmf/theme/Manager.js';
import EPSG21781 from '@geoblocks/proj/src/EPSG_21781.js';
import ngeoStatemanagerLocation from 'ngeo/statemanager/Location.js';
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
  gmfLayertreeTreeManager.name,
  gmfMapComponent.name,
  gmfThemeManager.name,
  gmfThemeThemes.name,
  ngeoStatemanagerLocation.name,
  gmfDisclaimerModule.name,
]);

module.value('gmfTreeUrl', appURL.GMF_THEMES);

module.constant('defaultTheme', 'Demo');
module.constant('gmfTreeManagerModeFlush', false);
module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');

/**
 * @constructor
 * @param {import("gmf/layertree/TreeManager.js").LayertreeTreeManager} gmfTreeManager gmf Tree Manager
 *    service.
 * @param {import("gmf/theme/Themes.js").ThemesService} gmfThemes The gmf themes service.
 * @param {import("gmf/theme/Manager.js").ThemeManagerService} gmfThemeManager gmf Tree Manager service.
 * @param {import("ngeo/statemanager/Location.js").StatemanagerLocation} ngeoLocation ngeo location service.
 * @ngInject
 */
function MainController(gmfTreeManager, gmfThemes, gmfThemeManager, ngeoLocation) {
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

  // How should disclaimer message be displayed: in modals or alerts
  const modal = ngeoLocation.getParam('modal');

  /**
   * @type {boolean}
   */
  this.modal = modal === 'true';

  /**
   * @type {import("gmf/layertree/TreeManager.js").LayertreeTreeManager}
   */
  this.gmfTreeManager = gmfTreeManager;

  /**
   * @type {import("gmf/theme/Manager.js").ThemeManagerService}
   */
  this.gmfThemeManager = gmfThemeManager;

  /**
   * @type {Array.<import('gmf/themes.js').GmfTheme>}
   */
  this.themes = [];

  /**
   * @type {Array.<import('gmf/themes.js').GmfGroup>}
   */
  this.groups = [];

  /**
   * @type {Array.<import('gmf/themes.js').GmfLayer>}
   */
  this.layers = [];

  /**
   * @param {import('gmf/themes.js').GmfTheme|undefined} value A theme or undefined to get Themes.
   * @return {Array.<import('gmf/themes.js').GmfTheme>} All themes.
   */
  this.getSetTheme = function (value) {
    if (value) {
      this.gmfThemeManager.addTheme(value);
    }
    return this.themes;
  };

  /**
   * @param {import('gmf/themes.js').GmfGroup|undefined} value A group or undefined to get groups.
   * @return {Array.<import('gmf/themes.js').GmfGroup>} All groups in all themes.
   */
  this.getSetGroup = function (value) {
    if (value !== undefined) {
      this.gmfTreeManager.addFirstLevelGroups([value]);
    }
    return this.groups;
  };

  /**
   * @param {import('gmf/themes.js').GmfLayer|undefined} value A group or undefined to get groups.
   * @return {Array.<import('gmf/themes.js').GmfLayer>} All groups in all themes.
   */
  this.getSetLayers = function (value) {
    if (value !== undefined) {
      this.gmfTreeManager.addGroupByLayerName(value.name);
    }
    return this.layers;
  };

  /**
   * @param {import('gmf/themes.js').GmfGroup|undefined} value A GeoMapFish group node, or undefined
   *     to get the groups of the tree manager.
   * @return {Array.<import('gmf/themes.js').GmfGroup>} All groups in the tree manager.
   */
  this.getSetRemoveTree = function (value) {
    if (value !== undefined) {
      this.gmfTreeManager.removeGroup(value);
    }
    return this.gmfTreeManager.root.children;
  };

  gmfThemes.getThemesObject().then((themes) => {
    if (themes) {
      this.themes = themes;

      // Get an array with all nodes entities existing in "themes".
      const flatNodes = [];
      this.themes.forEach((theme) => {
        theme.children.forEach((group) => {
          this.groups.push(group); // get a list of all groups
          this.getDistinctFlatNodes_(group, flatNodes);
        });
      });
      flatNodes.forEach((node) => {
        // Get an array of all layers
        if (node.children === undefined) {
          this.layers.push(node);
        }
      });
    }
  });

  /**
   * Just for this example
   * @param {import('gmf/themes.js').GmfTheme|import('gmf/themes.js').GmfGroup|import('gmf/themes.js').GmfLayer} node
   *    A theme, group or layer node.
   * @param {Array.<import('gmf/themes.js').GmfTheme|import('gmf/themes.js').GmfGroup|import('gmf/themes.js').GmfLayer>} nodes
   *    An Array of nodes.
   */
  this.getDistinctFlatNodes_ = function (node, nodes) {
    let i;
    const children = /** @type {import('gmf/themes.js').GmfGroup} */ (node).children;
    if (children !== undefined) {
      for (i = 0; i < children.length; i++) {
        this.getDistinctFlatNodes_(children[i], nodes);
      }
    }
    let alreadyAdded = false;
    nodes.some((n) => {
      if (n.id === node.id) {
        return (alreadyAdded = true);
      }
    });
    if (!alreadyAdded) {
      nodes.push(node);
    }
  };
}

module.controller('MainController', MainController);

export default module;
