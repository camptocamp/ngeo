goog.provide('gmf-layertree');

/** @suppress {extraRequire} */
goog.require('gmf.Themes');
/** @suppress {extraRequire} */
goog.require('gmf.TreeManager');
goog.require('gmf.disclaimerDirective');
goog.require('gmf.layertreeDirective');
goog.require('gmf.mapDirective');
goog.require('ngeo.Location');
goog.require('ngeo.proj.EPSG21781');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.proj');
goog.require('ol.source.OSM');


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['gmf']);


app.module.value('gmfTreeUrl',
    'https://geomapfish-demo.camptocamp.net/2.1/wsgi/themes?version=2&background=background&interface=desktop');


app.module.value('gmfWmsUrl',
    'https://geomapfish-demo.camptocamp.net/2.1/wsgi/mapserv_proxy');


/**
 * @constructor
 * @param {gmf.Themes} gmfThemes The gme themes service.
 * @param {gmf.TreeManager} gmfTreeManager gmf Tree Manager service.
 * @param {ngeo.Location} ngeoLocation ngeo location service.
 */
app.MainController = function(gmfThemes, gmfTreeManager, ngeoLocation) {

  gmfThemes.loadThemes();

  var projection = ol.proj.get('EPSG:21781');
  projection.setExtent([485869.5728, 76443.1884, 837076.5648, 299941.7864]);

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
      projection: projection,
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [537635, 152640],
      zoom: 3
    })
  });

  // How should disclaimer message be displayed: in modals or alerts
  var modal = ngeoLocation.getParam('modal');

  /**
   * @type {boolean}
   * @export
   */
  this.modal = modal === 'true';

  /**
   * @type {gmf.TreeManager}
   * @export
   */
  this.gmfTreeManager = gmfTreeManager;

  /**
   * @type {Array.<GmfThemesNode>}
   * @export
   */
  this.themes = [];

  /**
   * @type {Array.<GmfThemesNode>}
   * @export
   */
  this.groups = [];

  /**
   * @type {Array.<GmfThemesNode>}
   * @export
   */
  this.layers = [];

  /**
   * @type {Object|undefined}
   * @export
   */
  this.treeSource = undefined;

  /**
   * @type {string}
   * @export
   */
  this.modeFlush = 'add';

  /**
   * @type {function()}
   * @export
   */
  this.setModeFlush = function() {
    var isModeFlush = this.modeFlush == 'flush' ? true : false;
    this.gmfTreeManager.setModeFlush(isModeFlush);
  };

  this.setModeFlush();

  /**
   * @param {GmfThemesNode|undefined} value A theme or undefined to get Themes.
   * @return {Array.<GmfThemesNode>} All themes.
   * @export
   */
  this.getSetTheme = function(value) {
    if (value !== undefined) {
      this.gmfTreeManager.addTheme(value);
    }
    return this.themes;
  };

  /**
   * @param {GmfThemesNode|undefined} value A group or undefined to get groups.
   * @return {Array.<GmfThemesNode>} All groups in all themes.
   * @export
   */
  this.getSetGroup = function(value) {
    if (value !== undefined) {
      this.gmfTreeManager.addGroups([value]);
    }
    return this.groups;
  };

  /**
   * @param {GmfThemesNode|undefined} value A group or undefined to get groups.
   * @return {Array.<GmfThemesNode>} All groups in all themes.
   * @export
   */
  this.getSetLayers = function(value) {
    if (value !== undefined) {
      this.gmfTreeManager.addGroupByLayerName(value.name);
    }
    return this.layers;
  };

  /**
   * @param {GmfThemesNode|undefined} value A Theme or group node, or undefined
   *     to get the groups of the tree manager.
   * @return {Array.<GmfThemesNode>} All groups in the tree manager.
   * @export
   */
  this.getSetRemoveTree = function(value) {
    if (value !== undefined) {
      this.gmfTreeManager.removeGroup(value);
    }
    return this.gmfTreeManager.tree.children;
  };

  gmfThemes.getThemesObject().then(function(themes) {
    if (themes) {
      this.themes = themes;

      // Get an array with all nodes entities existing in "themes".
      var flatNodes = [];
      this.themes.forEach(function(theme) {
        theme.children.forEach(function(group) {
          this.groups.push(group); // get a list of all groups
          this.getDistinctFlatNodes_(group, flatNodes);
        }.bind(this));
      }.bind(this));
      flatNodes.forEach(function(node) {
        // Get an array of all layers
        if (node.children === undefined) {
          this.layers.push(node);
        }
      }.bind(this));

      this.treeSource = this.gmfTreeManager.tree;
    }
  }.bind(this));

  /**
   * Just for this example
   * @param {GmfThemesNode} node A theme, group or layer node.
   * @param {Array.<GmfThemesNode>} nodes An Array of nodes.
   * @export
   */
  this.getDistinctFlatNodes_ = function(node, nodes) {
    var i;
    var children = node.children;
    if (children !== undefined) {
      for (i = 0; i < children.length; i++) {
        this.getDistinctFlatNodes_(children[i], nodes);
      }
    }
    var alreadyAdded = false;
    nodes.some(function(n) {
      if (n.id === node.id) {
        return alreadyAdded = true;
      }
    });
    if (!alreadyAdded) {
      nodes.push(node);
    }
  };
};

app.module.controller('MainController', app.MainController);
