/**
 * @fileoverview This file defines the QueryManager service, which uses the
 * c2cgeoportal's themes to configure ngeo's query service with each layer
 * found.
 */
goog.provide('gmf.QueryManager');

goog.require('gmf');
goog.require('gmf.Themes');
goog.require('ngeo.Query');


/**
 * @constructor
 * @param {ngeo.Query} ngeoQuery The ngeo Query service.
 * @param {gmf.Themes} gmfThemes The gmf Themes service.
 * @param {string} gmfWmsUrl URL to the wms service to use by default.
 * @ngInject
 * @ngdoc service
 * @ngname gmfThemes
 */
gmf.QueryManager = function(ngeoQuery, gmfThemes, gmfWmsUrl) {

  /**
   * @type {ngeo.Query}
   * @private
   */
  this.ngeoQuery_ = ngeoQuery;

  /**
   * @type {gmf.Themes}
   * @private
   */
  this.gmfThemes_ = gmfThemes;

  /**
   * @type {string}
   * @private
   */
  this.gmfWmsUrl_ = gmfWmsUrl;

  /**
   * @type {Array.<ngeox.QuerySource>}
   * @private
   */
  this.sources_ = [];

  /**
   * @type {Object.<number|string, ngeox.QuerySource>}
   * @private
   */
  this.cache_ = {};

  // event listeners
  ol.events.listenOnce(gmfThemes, gmf.ThemesEventType.LOAD,
      this.handleThemesLoad_, this);
};


/**
 * Called when the theme service has loaded the themes. Create a source for
 * each theme and add them to the query service.
 * @private
 */
gmf.QueryManager.prototype.handleThemesLoad_ = function() {
  this.gmfThemes_.getThemesObject().then(goog.bind(function(themes) {
    // create sources for each themes
    for (var i = 0, len = themes.length; i < len; i++) {
      this.createSources_(themes[i]);
    }
    // then add them to the query service
    this.ngeoQuery_.addSources(this.sources_);
  }, this));
};


/**
 * Create and add a source for the query service from the GMF theme node if
 * it has no children, otherwise create the sources for each child node if
 * it has any.
 * @param {GmfThemesNode} node Theme layer node.
 * @private
 */
gmf.QueryManager.prototype.createSources_ = function(node) {
  var meta = node.metadata;
  var children = node.children;
  var id = node.id;
  var identifierAttributeField = meta['identifierAttributeField'];
  var layers = meta['wmsLayers'] || meta['queryLayers'] || node.layers;
  var name = node.name;
  var url = meta['wmsUrl'] || node.url || this.gmfWmsUrl_;

  if (children) {
    for (var i = 0, len = children.length; i < len; i++) {
      this.createSources_(children[i]);
    }
  } else {
    if (!this.cache_[id]) {
      var source = {
        'id': id,
        'identifierAttributeField': identifierAttributeField,
        'label': name,
        'params': {'LAYERS': layers},
        'url': url
      };
      this.cache_[id] = source;
      this.sources_.push(source);
    }
  }
};


gmf.module.service('gmfQueryManager', gmf.QueryManager);
