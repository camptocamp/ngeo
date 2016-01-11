/**
 * @fileoverview This file defines the Themes service. This service interacts
 * with c2cgeoportal's "themes" web service and exposes functions that return
 * objects in the tree returned by the "themes" web service.
 */
goog.provide('gmf.Themes');
goog.provide('gmf.ThemesEventType');

goog.require('gmf');
goog.require('goog.array');
goog.require('goog.asserts');
goog.require('goog.events.EventTarget');


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
 * @constructor
 * @extends {goog.events.EventTarget}
 * @param {angular.$http} $http Angular http service.
 * @param {string} gmfTreeUrl URL to "themes" web service.
 * @ngInject
 * @ngdoc service
 * @ngname gmfThemes
 */
gmf.Themes = function($http, gmfTreeUrl) {

  goog.base(this);

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
   * @type {?angular.$q.Promise}
   * @private
   */
  this.promise_ = null;
};
goog.inherits(gmf.Themes, goog.events.EventTarget);


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
 * @private
 */
gmf.Themes.findTheme_ = function(themes, themeName) {
  var theme = gmf.Themes.findObjectByName_(themes, themeName);
  return theme;
};


/**
 * Get background layers.
 * @return {angular.$q.Promise} Promise.
 */
gmf.Themes.prototype.getBgLayers = function() {
  goog.asserts.assert(!goog.isNull(this.promise_));
  return this.promise_.then(goog.bind(
      /**
       * @param {gmf.ThemesResponse} data The "themes" web service response.
       * @return {Array.<Object>} Array of background layer objects.
       */
      function(data) {
        var bgLayers = data['background_layers'].map(goog.bind(function(item) {
          goog.asserts.assert('name' in item);
          goog.asserts.assert('imageType' in item);

          // create an ol.layer from the json spec
          // use a future layer factory shared with the layertree
          //return layer;

          return item;
        }, this));

        // add the blank layer ???
        return bgLayers;
      }, this));
};


/**
 * Get a theme object by its name.
 * @param {string} themeName Theme name.
 * @return {angular.$q.Promise} Promise.
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
        return gmf.Themes.findTheme_(themes, themeName);
      });
};


/**
 * Get an array of theme objects.
 * @return {angular.$q.Promise} Promise.
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
    cache: false
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


gmfModule.service('gmfThemes', gmf.Themes);
