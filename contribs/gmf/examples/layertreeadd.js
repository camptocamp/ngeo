// The MIT License (MIT)
//
// Copyright (c) 2016-2022 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import angular from 'angular';
import './layertreeadd.css';
import gmfDisclaimerModule from 'gmf/disclaimer/module';

import gmfLayertreeComponent from 'gmf/layertree/gmfComponent';
import gmfLayertreeTreeManager from 'gmf/layertree/TreeManager';

import gmfMapComponent from 'gmf/map/gmfComponent';

import gmfThemeThemes from 'gmf/theme/Themes';

import gmfThemeManager from 'gmf/theme/Manager';
import EPSG2056 from 'ngeo/proj/EPSG_2056';
import ngeoStatemanagerLocation from 'ngeo/statemanager/Location';
import ngeoMapModule from 'ngeo/map/module';
import olMap from 'ol/Map';
import olView from 'ol/View';
import olLayerTile from 'ol/layer/Tile';
import olSourceOSM from 'ol/source/OSM';
import options from './options';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfapp', [
  'gettext',
  gmfLayertreeComponent.name,
  gmfLayertreeTreeManager.name,
  gmfMapComponent.name,
  gmfThemeManager.name,
  gmfThemeThemes.name,
  ngeoStatemanagerLocation.name,
  gmfDisclaimerModule.name,
  ngeoMapModule.name,
]);

/**
 * @class
 * @param {import('gmf/layertree/TreeManager').LayertreeTreeManager} gmfTreeManager gmf Tree Manager
 *    service.
 * @param {import('gmf/theme/Themes').ThemesService} gmfThemes The gmf themes service.
 * @param {import('gmf/theme/Manager').ThemeManagerService} gmfThemeManager gmf Tree Manager service.
 * @param {import('ngeo/statemanager/Location').StatemanagerLocation} ngeoLocation ngeo location service.
 * @ngInject
 */
function MainController(gmfTreeManager, gmfThemes, gmfThemeManager, ngeoLocation) {
  gmfThemes.loadThemes();

  /**
   * @type {import('ol/Map').default}
   */
  this.map = new olMap({
    layers: [
      new olLayerTile({
        source: new olSourceOSM(),
      }),
    ],
    view: new olView({
      projection: EPSG2056,
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [2537635, 1152640],
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
   * @type {import('gmf/layertree/TreeManager').LayertreeTreeManager}
   */
  this.gmfTreeManager = gmfTreeManager;

  /**
   * @type {import('gmf/theme/Manager').ThemeManagerService}
   */
  this.gmfThemeManager = gmfThemeManager;

  /**
   * @type {import('gmf/themes').GmfTheme[]}
   */
  this.themes = [];

  /**
   * @type {import('gmf/themes').GmfGroup[]}
   */
  this.groups = [];

  /**
   * @type {import('gmf/themes').GmfLayer[]}
   */
  this.layers = [];

  /**
   * @param {import('gmf/themes').GmfTheme|undefined} value A theme or undefined to get Themes.
   * @returns {import('gmf/themes').GmfTheme[]} All themes.
   */
  this.getSetTheme = function (value) {
    if (value) {
      this.gmfThemeManager.addTheme(value);
    }
    return this.themes;
  };

  /**
   * @param {import('gmf/themes').GmfGroup|undefined} value A group or undefined to get groups.
   * @returns {import('gmf/themes').GmfGroup[]} All groups in all themes.
   */
  this.getSetGroup = function (value) {
    if (value !== undefined) {
      this.gmfTreeManager.addFirstLevelGroups([value]);
    }
    return this.groups;
  };

  /**
   * @param {import('gmf/themes').GmfLayer|undefined} value A group or undefined to get groups.
   * @returns {import('gmf/themes').GmfLayer[]} All groups in all themes.
   */
  this.getSetLayers = function (value) {
    if (value !== undefined) {
      this.gmfTreeManager.addGroupByLayerName(value.name);
    }
    return this.layers;
  };

  /**
   * @param {import('gmf/themes').GmfGroup|undefined} value A GeoMapFish group node, or undefined
   *     to get the groups of the tree manager.
   * @returns {import('gmf/themes').GmfGroup[]} All groups in the tree manager.
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
      /** @type {(import('gmf/themes').GmfTheme | import('gmf/themes').GmfGroup | import('gmf/themes').GmfLayer)[]} */
      const flatNodes = [];
      this.themes.forEach((theme) => {
        theme.children.forEach((group) => {
          this.groups.push(group); // get a list of all groups
          this.getDistinctFlatNodes_(group, flatNodes);
        });
      });
      flatNodes.forEach((node) => {
        const groupNode = /** @type {import('gmf/themes').GmfGroup} */ (node);
        // Get an array of all layers
        if (groupNode.children === undefined) {
          this.layers.push(/** @type {import('gmf/themes').GmfLayer} */ (node));
        }
      });
    }
  });

  /**
   * Just for this example
   *
   * @param {import('gmf/themes').GmfTheme|import('gmf/themes').GmfGroup|import('gmf/themes').GmfLayer} node
   *    A theme, group or layer node.
   * @param {(import('gmf/themes').GmfTheme | import('gmf/themes').GmfGroup | import('gmf/themes').GmfLayer)[]} nodes
   *    An Array of nodes.
   */
  this.getDistinctFlatNodes_ = function (node, nodes) {
    let i;
    const children = /** @type {import('gmf/themes').GmfGroup} */ (node).children;
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
      return false;
    });
    if (!alreadyAdded) {
      nodes.push(node);
    }
  };
}

myModule.controller('MainController', MainController);
options(myModule);

export default myModule;
