goog.provide('gmf.QueryManager');

goog.require('gmf');
goog.require('gmf.Themes');
goog.require('ngeo.Query');


/**
 * The QueryManager service, uses the
 * c2cgeoportal's themes to configure ngeo's query service with each layer
 * found.
 *
 * Used UI metadata:
 *
 *  * identifierAttributeField: Field used to identify the feature (like a title).
 *  * queryLayers: The alternate layers used to do the query.
 *  * wmsLayers: The layers used to do the query, used if queryLayers is not provided.
 *  * wmsUrl: An alternate wmsUrl used to do the query (essential to query WMTS layer).
 *
 * @constructor
 * @param {ngeo.Query} ngeoQuery The ngeo Query service.
 * @param {gmf.Themes} gmfThemes The gmf Themes service.
 * @param {string} gmfWmsUrl URL to the wms service to use by default.
 * @param {angular.$q} $q Angular q service
 * @ngInject
 * @ngdoc service
 * @ngname gmfThemes
 */
gmf.QueryManager = function(ngeoQuery, gmfThemes, gmfWmsUrl, $q) {

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
   * @type {angular.$q}
   * @private
   */
  this.$q_ = $q;

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

  ol.events.listen(this.gmfThemes_, gmf.ThemesEventType.CHANGE,
    this.handleThemesChange_, this);
};


/**
 * Called when the themes change. Remove any existing sources first, then
 * create and add sources from the loaded themes.
 * @private
 */
gmf.QueryManager.prototype.handleThemesChange_ = function() {

  this.sources_.length = 0;
  this.cache_ = {};
  this.ngeoQuery_.removeAllSources();

  this.gmfThemes_.getOgcServersObject().then(function(ogcServers) {
    var promiseThemes = this.gmfThemes_.getThemesObject().then(function(themes) {
      // create sources for each themes
      for (var i = 0, len = themes.length; i < len; i++) {
        this.createSources_(themes[i], ogcServers);
      }
    }.bind(this));

    var promiseBgLayers = this.gmfThemes_.getBackgroundLayersObject().then(function(backgroundLayers) {
      // create a source for each background layer
      for (var i = 0, len = backgroundLayers.length; i < len; i++) {
        this.createSources_(backgroundLayers[i], ogcServers);
      }
    }.bind(this));

    // then add all sources to the query service
    this.$q_.all([promiseThemes, promiseBgLayers]).then(function() {
      this.ngeoQuery_.addSources(this.sources_);
    }.bind(this));
  }.bind(this));
};


/**
 * Create and add a source for the query service from the GMF theme node if
 * it has no children, otherwise create the sources for each child node if
 * it has any.
 * @param {GmfThemesGroup|GmfThemesLeaf} node A node.
 * @param {GmfOgcServers} ogcServers OGC servers.
 * @private
 */
gmf.QueryManager.prototype.createSources_ = function(node, ogcServers) {
  var meta = node.metadata;
  var children = node.children;
  var id = node.id;
  var identifierAttributeField = meta.identifierAttributeField;
  var layers = meta.wmsLayers || meta.queryLayers || node.layers;
  var name = node.name;
  var url = meta.wmsUrl || node.url || this.gmfWmsUrl_;
  var validateLayerParams = false;
  var wfsQuery;

  // Skip non-querable layers that have no child layers.
  if (!node.childLayers || node.childLayers.length < 1) {
    return;
  }

  // don't create sources for WMTS layers without wmsUrl and ogcServer,
  // they are not queryable.
  if (node.type === 'WMTS' && !meta.wmsUrl) {
    if (meta.ogcServer && ogcServers[meta.ogcServer]) {
      var ogcServer = ogcServers[meta.ogcServer];
      url = ogcServer.urlWfs;
      wfsQuery = ogcServer.wfsSupport;
    } else {
      return;
    }
  }

  if (children) {
    for (var i = 0, len = children.length; i < len; i++) {
      this.createSources_(children[i], ogcServers);
    }
  } else {
    if (!this.cache_[id]) {

      // Some nodes have child layers, i.e. a list of layer names that are
      // part of a group. The name of the group itself can't be used 'as-is'
      // as an identifier of the layers for this source. For example, a
      // group named 'osm' might result in returning 'restaurant' features.
      // This override makes sure that those layer names are used instead of
      // the original one.
      if (node.childLayers && node.childLayers.length) {
        // skip layers with no queryable childLayer
        var isQueryable = function(item) {
          return item.queryable;
        };
        if (!node.childLayers.some(isQueryable)) {
          return;
        }

        var childLayerNames = [];
        node.childLayers.forEach(function(childLayer) {
          if (childLayer.queryable) {
            childLayerNames.push(childLayer.name);
          }
        }, this);
        layers = childLayerNames.join(',');
        validateLayerParams = node.type === 'WMS';
      }

      var source = {
        'id': id,
        'identifierAttributeField': identifierAttributeField,
        'label': name,
        'params': {'LAYERS': layers},
        'url': url,
        'validateLayerParams': validateLayerParams,
        'wfsQuery': wfsQuery
      };
      this.cache_[id] = source;
      this.sources_.push(source);
    }
  }
};


gmf.module.service('gmfQueryManager', gmf.QueryManager);
