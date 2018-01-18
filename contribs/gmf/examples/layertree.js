goog.provide('gmfapp.layertree');

goog.require('gmf.disclaimer.module');
/** @suppress {extraRequire} */
goog.require('gmf.layertree.component');
goog.require('gmf.layertree.TreeManager');
/** @suppress {extraRequire} */
goog.require('gmf.map.component');
goog.require('gmf.theme.Manager');
goog.require('gmf.theme.Themes');
/** @suppress {extraRequire} */
goog.require('ngeo.proj.EPSG21781');
goog.require('ngeo.statemanager.Location');
goog.require('ngeo.layertree.module');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');


/** @type {!angular.Module} **/
gmfapp.module = angular.module('gmfapp', [
  gmf.module.name, // Change when other dependencies are in a module
  gmf.layertree.component.name,
  gmf.layertree.TreeManager.module.name,
  gmf.map.component.name,
  gmf.theme.Manager.module.name,
  gmf.theme.Themes.module.name,
  ngeo.statemanager.Location.module.name,
  ngeo.layertree.module.name,
  gmf.disclaimer.module.name,
]);


gmfapp.module.value('gmfTreeUrl',
  'https://geomapfish-demo.camptocamp.net/2.2/wsgi/themes?version=2&background=background&interface=desktop');


/**
 * @constructor
 * @param {gmf.layertree.TreeManager} gmfTreeManager gmf Tree Manager service.
 * @param {gmf.theme.Themes} gmfThemes The gmf themes service.
 * @param {gmf.theme.Manager} gmfThemeManager gmf Theme Manager service.
 * @param {ngeo.statemanager.Location} ngeoLocation ngeo location service.
 * @ngInject
 */
gmfapp.MainController = function(gmfTreeManager, gmfThemes, gmfThemeManager, ngeoLocation) {

  gmfThemes.loadThemes();

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      projection: 'EPSG:21781',
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
   * @type {gmf.layertree.TreeManager}
   * @export
   */
  this.gmfTreeManager = gmfTreeManager;

  /**
   * @type {gmf.theme.Manager}
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

gmfapp.module.controller('MainController', gmfapp.MainController);
