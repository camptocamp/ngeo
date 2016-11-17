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
 * @struct
 * @param {ngeo.Query} ngeoQuery The ngeo Query service.
 * @param {gmf.Themes} gmfThemes The gmf Themes service.
 * @param {angular.$q} $q Angular q service
 * @ngInject
 * @ngdoc service
 * @ngname gmfThemes
 */
gmf.QueryManager = function(ngeoQuery, gmfThemes, $q) {

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
 * @param {Object.<string, string>} dimensions The global dimensions object.
 * @export
 */
gmf.QueryManager.prototype.setDimensions = function(dimensions) {
  this.ngeoQuery_.dimensions = dimensions;
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
      for (var i = 0, leni = themes.length; i < leni; i++) {
        var theme = themes[i];
        for (var j = 0, lenj = theme.children.length; j < lenj; j++) {
          this.createSources_(theme.children[j], theme.children[j], ogcServers);
        }
      }
    }.bind(this));

    var promiseBgLayers = this.gmfThemes_.getBackgroundLayersObject().then(function(backgroundLayers) {
      // create a source for each background layer
      for (var i = 0, len = backgroundLayers.length; i < len; i++) {
        this.createSources_(backgroundLayers[i], backgroundLayers[i], ogcServers);
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
 * @param {gmfThemes.GmfGroup} firstLevelGroup A node.
 * @param {gmfThemes.GmfGroup|gmfThemes.GmfLayer} node A node.
 * @param {gmfThemes.GmfOgcServers} ogcServers OGC servers.
 * @private
 */
gmf.QueryManager.prototype.createSources_ = function(firstLevelGroup, node, ogcServers) {
  var children = node.children;

  // First we handle the groups
  if (children) {
    for (var i = 0, len = children.length; i < len; i++) {
      this.createSources_(firstLevelGroup, children[i], ogcServers);
    }
    return;
  }

  // We are now on a leaf so we can cast node.metadata to the typed
  // (and non minified) version.

  var id = node.id;
  var meta = /** @type {gmfThemes.GmfMetaData} */ (node.metadata);
  var identifierAttributeField = meta.identifierAttributeField;
  var layers;
  var name = node.name;
  var validateLayerParams = false;
  var gmfLayer = /** @type gmfThemes.GmfLayer */ (node);
  var ogcServer;

  // Don't create sources for WMTS layers without wmsUrl and ogcServer,
  // they are not queryable.
  if (gmfLayer.type === 'WMTS') {
    layers = meta.queryLayers || meta.wmsLayers;
    if (layers && meta.ogcServer && ogcServers[meta.ogcServer]) {
      ogcServer = ogcServers[meta.ogcServer];
    } else {
      return;
    }
  }

  validateLayerParams = gmfLayer.type === 'WMS';
  var gmfLayerWMS;
  if (gmfLayer.type === 'WMS') {
    gmfLayerWMS = /** @type gmfThemes.GmfLayerWMS */ (gmfLayer);
    layers = gmfLayerWMS.layers;
    if (firstLevelGroup.mixed) {
      goog.asserts.assert(gmfLayerWMS.ogcServer);
      ogcServer = ogcServers[/** @type string */ (gmfLayerWMS.ogcServer)];
    } else {
      goog.asserts.assert(firstLevelGroup.ogcServer);
      ogcServer = ogcServers[/** @type string */ (firstLevelGroup.ogcServer)];
    }
  }
  var childLayers = layers;
  if (!this.cache_[id]) {
    if (validateLayerParams) {
      // Some nodes have child layers, i.e. a list of layer names that are
      // part of a group. The name of the group itself can't be used 'as-is'
      // as an identifier of the layers for this source. For example, a
      // group named 'osm' might result in returning 'restaurant' features.
      // This override makes sure that those layer names are used instead of
      // the original one.
      if (gmfLayerWMS.childLayers && gmfLayerWMS.childLayers.length) {
        // skip layers with no queryable childLayer
        var isQueryable = function(item) {
          return item.queryable;
        };
        if (!gmfLayerWMS.childLayers.some(isQueryable)) {
          return;
        }

        var childLayerNames = [];
        gmfLayerWMS.childLayers.forEach(function(childLayer) {
          if (childLayer.queryable) {
            childLayerNames.push(childLayer.name);
          }
        }, this);
        childLayers = childLayerNames.join(',');
      }
    }

    goog.asserts.assert(ogcServer.urlWfs);
    goog.asserts.assert(childLayers);
    goog.asserts.assert(layers);

    var source = {
      'id': id,
      'identifierAttributeField': identifierAttributeField,
      'label': name,
      'params': {'LAYERS': childLayers},
      'layers': layers,
      'dimensions': node.dimensions || firstLevelGroup.dimensions,
      'url': ogcServer.urlWfs,
      'validateLayerParams': validateLayerParams,
      'wfsQuery': ogcServer.wfsSupport
    };
    this.cache_[id] = source;
    this.sources_.push(source);
  }
};


gmf.module.service('gmfQueryManager', gmf.QueryManager);
