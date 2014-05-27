
/** @suppress {extraRequire} */
/** @suppress {extraRequire} */


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['gmf']);


app.module.value('gmfTreeUrl',
    'https://geomapfish-demo.camptocamp.net/2.1/wsgi/themes?version=2&background=background&interface=desktop');


/**
 * @constructor
 * @param {gmf.Themes} gmfThemes The gmf themes service.
 * @param {gmf.TreeManager} gmfTreeManager gmf Tree Manager service.
 * @param {gmf.ThemeManager} gmfThemeManager gmf Tree Manager service.
 * @param {ngeo.Location} ngeoLocation ngeo location service.
 */
app.MainController = function(gmfThemes, gmfTreeManager, gmfThemeManager, ngeoLocation) {

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
   * @type {gmf.ThemeManager}
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
    if (value !== undefined) {
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
      this.gmfTreeManager.addFirstLevelGroups([value]);
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
   * @param {gmfThemes.GmfGroup|undefined} value A GeoMapFish group node, or undefined
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
    }
  }.bind(this));

  /**
   * Just for this example
   * @param {gmfThemes.GmfTheme|gmfThemes.GmfGroup|gmfThemes.GmfLayer} node A theme, group or layer node.
   * @param {Array.<gmfThemes.GmfTheme|gmfThemes.GmfGroup|gmfThemes.GmfLayer>} nodes An Array of nodes.
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
