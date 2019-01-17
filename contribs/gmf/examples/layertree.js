/**
 * @module gmfapp.layertree
 */
const exports = {};

import angular from 'angular';
import appURL from './url.js';
import './layertree.css';
import gmfDisclaimerModule from 'gmf/disclaimer/module.js';

import gmfLayertreeComponent from 'gmf/layertree/component.js';
import gmfLayertreeTreeManager from 'gmf/layertree/TreeManager.js';

import gmfMapComponent from 'gmf/map/component.js';

import gmfThemeManager from 'gmf/theme/Manager.js';
import gmfThemeThemes from 'gmf/theme/Themes.js';
import EPSG21781 from '@geoblocks/proj/src/EPSG_21781.js';
import ngeoStatemanagerLocation from 'ngeo/statemanager/Location.js';
import ngeoLayertreeModule from 'ngeo/layertree/module.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';


/** @type {!angular.IModule} **/
exports.module = angular.module('gmfapp', [
  'gettext',
  gmfLayertreeComponent.name,
  gmfLayertreeTreeManager.module.name,
  gmfMapComponent.name,
  gmfThemeManager.module.name,
  gmfThemeThemes.module.name,
  ngeoStatemanagerLocation.module.name,
  ngeoLayertreeModule.name,
  gmfDisclaimerModule.name,
]);


exports.module.value('gmfTreeUrl', appURL.GMF_THEMES);

exports.module.constant('defaultTheme', 'Demo');
exports.module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');


/**
 * @constructor
 * @param {import("gmf/layertree/TreeManager.js").default} gmfTreeManager gmf Tree Manager service.
 * @param {import("gmf/theme/Themes.js").default} gmfThemes The gmf themes service.
 * @param {import("gmf/theme/Manager.js").default} gmfThemeManager gmf Theme Manager service.
 * @param {ngeo.statemanager.Location} ngeoLocation ngeo location service.
 * @ngInject
 */
exports.MainController = function(gmfTreeManager, gmfThemes, gmfThemeManager, ngeoLocation) {

  gmfThemes.loadThemes();

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

  // How should disclaimer message be displayed: in modals or alerts
  const modal = ngeoLocation.getParam('modal');

  /**
   * @type {boolean}
   * @export
   */
  this.modal = modal === 'true';

  /**
   * @type {import("gmf/layertree/TreeManager.js").default}
   * @export
   */
  this.gmfTreeManager = gmfTreeManager;

  /**
   * @type {import("gmf/theme/Manager.js").default}
   * @export
   */
  this.gmfThemeManager = gmfThemeManager;

  /**
   * @type {Array.<gmfThemes.GmfTheme>}
   * @export
   */
  this.themes = [];

  /**
   * @type {Array.<gmfThemes.GmfGroup>}
   * @export
   */
  this.groups = [];

  /**
   * @type {Array.<gmfThemes.GmfLayer>}
   * @export
   */
  this.layers = [];

  /**
   * @param {gmfThemes.GmfTheme|undefined} value A theme or undefined to get Themes.
   * @return {Array.<gmfThemes.GmfTheme>} All themes.
   * @export
   */
  this.getSetTheme = function(value) {
    if (value) {
      this.gmfThemeManager.addTheme(value);
    }
    return this.themes;
  };

  /**
   * @param {gmfThemes.GmfGroup|undefined} value A group or undefined to get groups.
   * @return {Array.<gmfThemes.GmfGroup>} All groups in all themes.
   * @export
   */
  this.getSetGroup = function(value) {
    if (value !== undefined) {
      this.gmfTreeManager.setFirstLevelGroups([value]);
    }
    return this.groups;
  };

  /**
   * @param {gmfThemes.GmfLayer|undefined} value A group or undefined to get groups.
   * @return {Array.<gmfThemes.GmfLayer>} All groups in all themes.
   * @export
   */
  this.getSetLayers = function(value) {
    if (value !== undefined) {
      this.gmfTreeManager.addGroupByLayerName(value.name);
    }
    return this.layers;
  };

  /**
   * @param {gmfThemes.GmfGroup|undefined} value A GeoMapFish group, or undefined
   *     to get the groups of the tree manager.
   * @return {Array.<gmfThemes.GmfGroup>} All groups in the tree manager.
   * @export
   */
  this.getSetRemoveTree = function(value) {
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
   * @param {gmfThemes.GmfTheme|gmfThemes.GmfGroup|gmfThemes.GmfLayer} node A theme, group or layer node.
   * @param {Array.<gmfThemes.GmfTheme|gmfThemes.GmfGroup|gmfThemes.GmfLayer>} nodes An Array of nodes.
   * @export
   */
  this.getDistinctFlatNodes_ = function(node, nodes) {
    let i;
    const children = node.children;
    if (children !== undefined) {
      for (i = 0; i < children.length; i++) {
        this.getDistinctFlatNodes_(children[i], nodes);
      }
    }
    let alreadyAdded = false;
    nodes.some((n) => {
      if (n.id === node.id) {
        return alreadyAdded = true;
      }
    });
    if (!alreadyAdded) {
      nodes.push(node);
    }
  };
};

exports.module.controller('MainController', exports.MainController);


export default exports;
