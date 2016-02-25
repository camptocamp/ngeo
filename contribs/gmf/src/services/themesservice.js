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
 * @ngInject
 * @ngdoc service
 * @ngname gmfThemes
 */
gmf.Themes = function($http, gmfTreeUrl, $q, ngeoLayerHelper) {

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
   * @type {?angular.$q.Promise}
   * @private
   */
  this.promise_ = null;
};
goog.inherits(gmf.Themes, ol.events.EventTarget);


/**
 * Find a layer group object by its name. Return null if not found.
 * @param {Array.<Object>} themes Array of "theme" objects.
 * @param {string} name The group name.
 * @return {{theme: Object, group: Object}} The theme and group.
 */
gmf.Themes.findGroupByName = function(themes, name) {
  for (var i = 0, ii = themes.length; i < ii; i++) {
    var theme = themes[i];
    for (var j = 0, jj = theme.children.length; j < jj; j++) {
      var group = theme.children[j];
      if (group.name == name) {
        return {
          theme: theme,
          group: group
        };
      }
    }
  }
  return null;
};

/**
 * Find a layer object by its name. Return null if not found.
 * @param {Array.<Object>} themes Array of "theme" objects.
 * @param {string} name The layer name.
 * @return {{theme: Object, group: Object, layer: Object}} The theme, group and layer.
 */
gmf.Themes.findLayerByName = function(themes, name) {
  for (var i = 0, ii = themes.length; i < ii; i++) {
    var theme = themes[i];
    for (var j = 0, jj = theme.children.length; j < jj; j++) {
      var group = theme.children[j];
      for (var k = 0, kk = group.children.length; k < kk; k++) {
        var layer = group.children[k];
        if (layer.layers == name) {
          return {
            theme: theme,
            group: group,
            layer: layer
          };
        }
      }
    }
  }
  return null;
};


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

  goog.asserts.assert(!goog.isNull(this.promise_));
  return this.promise_.then(goog.bind(
      /**
       * @param {gmf.ThemesResponse} data The "themes" web service response.
       * @return {angular.$q.Promise} Promise.
       */
      function(data) {
        var promises = data['background_layers'].map(function(item) {

          var callback = function(item, layer) {
            layer.set('label', item['name']);
            layer.set('metadata', item['metadata']);
            return layer;
          };

          if (item['type'] === 'WMTS') {
            return this.layerHelper_.createWMTSLayerFromCapabilitites(
                item['url'],
                item['name']
            ).then(goog.bind(callback, this, item)).then(null, function(error) {
              console.error(error || 'unknown error');
              // Continue even if some layers have failed loading.
              return $q.resolve(undefined);
            });
          }
        }, this);
        return $q.all(promises);
      }, this))

    .then(goog.bind(function(values) {
      var layers = [];

      // (1) add a blank layer
      layers.push(new ol.layer.Tile({
        'label': 'blank',
        'metadata': {'thumbnail': ''}
      }));

      // (2) add layers that were returned
      values.forEach(function(item) {
        if (item) {
          layers.push(item);
        }
      });
      return layers;
    }, this));
};


/**
 * Get a theme object by its name.
 * @param {string} themeName Theme name.
 * @return {angular.$q.Promise} Promise.
 * @export
 */
gmf.Themes.prototype.getThemeObject = function(themeName) {
  goog.asserts.assert(!goog.isNull(this.promise_));
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
  goog.asserts.assert(!goog.isNull(this.promise_));
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
 * @param {number=} opt_roleId The role id to send in the request.
 * Load themes from the "themes" service.
 * @export
 */
gmf.Themes.prototype.loadThemes = function(opt_roleId) {
  this.promise_ = this.$http_.get(this.treeUrl_, {
    params: opt_roleId !== undefined ? {'role': opt_roleId} : {},
    cache: false,
    withCredentials: true
  }).then(goog.bind(
      /**
       * @param {angular.$http.Response} resp Ajax response.
       * @return {Object} The "themes" web service response.
       */
      function(resp) {
        this.dispatchEvent(gmf.ThemesEventType.LOAD);
        return /** @type {gmf.ThemesResponse} */ (resp.data);
      }, this));
};


gmf.module.service('gmfThemes', gmf.Themes);
