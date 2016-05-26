goog.provide('gmf.Themes');
goog.provide('gmf.ThemesEventType');

goog.require('gmf');
goog.require('goog.array');
goog.require('goog.asserts');
goog.require('ngeo.LayerHelper');
goog.require('ol.events.EventTarget');
goog.require('ol.layer.Tile');


/**
 * @typedef {{
 *     themes: Array.<Object>,
 *     background_layers: Array.<Object>
 * }}
 */
gmf.ThemesResponse;


/**
 * @enum {string}
 */
gmf.ThemesEventType = {
  LOAD: 'load'
};


/**
 * The Themes service. This service interacts
 * with c2cgeoportal's "themes" web service and exposes functions that return
 * objects in the tree returned by the "themes" web service.
 *
 * @constructor
 * @extends {ol.events.EventTarget}
 * @param {angular.$http} $http Angular http service.
 * @param {string} gmfTreeUrl URL to "themes" web service.
 * @param {angular.$q} $q Angular q service
 * @param {ngeo.LayerHelper} ngeoLayerHelper Ngeo Layer Helper.
 * @param {angularGettext.Catalog} gettextCatalog Gettext catalog.
 * @ngInject
 * @ngdoc service
 * @ngname gmfThemes
 */
gmf.Themes = function($http, gmfTreeUrl, $q, ngeoLayerHelper, gettextCatalog) {

  goog.base(this);

  /**
   * @type {angular.$q}
   * @private
   */
  this.$q_ = $q;

  /**
   * @type {angular.$http}
   * @private
   */
  this.$http_ = $http;

  /**
   * @type {string}
   * @private
   */
  this.treeUrl_ = gmfTreeUrl;

  /**
   * @type {ngeo.LayerHelper}
   * @private
   */
  this.layerHelper_ = ngeoLayerHelper;

  /**
   * @type {angularGettext.Catalog}
   * @private
   */
  this.gettextCatalog = gettextCatalog;

  /**
   * @type {?angular.$q.Promise}
   * @private
   */
  this.promise_ = null;
};
goog.inherits(gmf.Themes, ol.events.EventTarget);


/**
 * Find an object by its name. Return null if not found.
 * @param {Array.<Object>} objects Array of objects.
 * @param {string} objectName The object name.
 * @return {Object} The object.
 * @private
 */
gmf.Themes.findObjectByName_ = function(objects, objectName) {
  return goog.array.find(objects, function(object) {
    return object['name'] === objectName;
  });
};


/**
 * Find a theme object by its name. Return null if not found.
 * @param {Array.<Object>} themes Array of "theme" objects.
 * @param {string} themeName The theme name.
 * @return {Object} The theme object.
 */
gmf.Themes.findThemeByName = function(themes, themeName) {
  var theme = gmf.Themes.findObjectByName_(themes, themeName);
  return theme;
};


/**
 * Get background layers.
 * @return {angular.$q.Promise} Promise.
 */
gmf.Themes.prototype.getBgLayers = function() {
  var $q = this.$q_;

  /**
   * @param {gmf.ThemesResponse} data The "themes" web service response.
   * @return {angular.$q.Promise} Promise.
   */
  var promiseSuccessFn = function(data) {
    var promises = data['background_layers'].map(function(item) {

      var callback = function(item, layer) {
        layer.set('label', item['name']);
        layer.set('metadata', item['metadata']);
        var ids = gmf.LayertreeController.getLayerNodeIds(item);
        layer.set('querySourceIds', ids);
        return layer;
      };

      if (item['type'] === 'WMTS') {
        return this.layerHelper_.createWMTSLayerFromCapabilitites(
            item['url'],
            item['name']
        ).then(callback.bind(this, item)).then(null, function(error) {
          console.error(error || 'unknown error');
          // Continue even if some layers have failed loading.
          return $q.resolve(undefined);
        });
      }
    }, this);
    return $q.all(promises);
  }.bind(this);

  goog.asserts.assert(this.promise_ !== null);

  return this.promise_.then(promiseSuccessFn).then(function(values) {
    var layers = [];

    // (1) add a blank layer
    layers.push(new ol.layer.Tile({
      'label': this.gettextCatalog.getString('blank'),
      'metadata': {'thumbnail': ''}
    }));

    // (2) add layers that were returned
    values.forEach(function(layer) {
      if (layer) {
        layers.push(layer);
      }
    });
    return layers;
  }.bind(this));
};


/**
 * Get a theme object by its name.
 * @param {string} themeName Theme name.
 * @return {angular.$q.Promise} Promise.
 * @export
 */
gmf.Themes.prototype.getThemeObject = function(themeName) {
  goog.asserts.assert(this.promise_ !== null);
  return this.promise_.then(
      /**
       * @param {gmf.ThemesResponse} data The "themes" web service response.
       * @return {Object} The theme object for themeName, or null if not found.
       */
      function(data) {
        var themes = data['themes'];
        return gmf.Themes.findThemeByName(themes, themeName);
      });
};


/**
 * Get an array of theme objects.
 * @return {angular.$q.Promise} Promise.
 * @export
 */
gmf.Themes.prototype.getThemesObject = function() {
  goog.asserts.assert(this.promise_ !== null);
  return this.promise_.then(
      /**
       * @param {gmf.ThemesResponse} data The "themes" web service response.
       * @return {Array.<Object>} The themes object.
       */
      function(data) {
        var themes = data['themes'];
        return themes;
      });
};


/**
 * Get an array of background layer objects.
 * @return {angular.$q.Promise} Promise.
 */
gmf.Themes.prototype.getBackgroundLayersObject = function() {
  goog.asserts.assert(this.promise_ !== null);
  return this.promise_.then(
      /**
       * @param {gmf.ThemesResponse} data The "themes" web service response.
       * @return {Array.<Object>} The background layers object.
       */
      function(data) {
        var backgroundLayers = data['background_layers'];
        return backgroundLayers;
      });
};


/**
 * @param {number=} opt_roleId The role id to send in the request.
 * Load themes from the "themes" service.
 * @export
 */
gmf.Themes.prototype.loadThemes = function(opt_roleId) {
  /**
   * @param {angular.$http.Response} resp Ajax response.
   * @return {Object} The "themes" web service response.
   */
  var promiseSuccessFn = function(resp) {
    this.dispatchEvent(gmf.ThemesEventType.LOAD);
    return /** @type {gmf.ThemesResponse} */ (resp.data);
  }.bind(this);

  this.promise_ = this.$http_.get(this.treeUrl_, {
    params: opt_roleId !== undefined ? {'role': opt_roleId} : {},
    cache: false,
    withCredentials: true
  }).then(promiseSuccessFn);
};


gmf.module.service('gmfThemes', gmf.Themes);
