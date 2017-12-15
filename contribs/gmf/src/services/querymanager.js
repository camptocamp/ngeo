goog.provide('gmf.QueryManager');

goog.require('ol.events');
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
 * @param {!ngeo.Query} ngeoQuery The ngeo Query service.
 * @param {!gmf.Themes} gmfThemes The gmf Themes service.
 * @param {!angular.$q} $q Angular q service
 * @ngInject
 * @ngdoc service
 * @ngname gmfQueryManager
 */
gmf.QueryManager = function(ngeoQuery, gmfThemes, $q) {

  /**
   * @type {!ngeo.Query}
   * @private
   */
  this.ngeoQuery_ = ngeoQuery;

  /**
   * @type {!gmf.Themes}
   * @private
   */
  this.gmfThemes_ = gmfThemes;

  /**
   * @type {!angular.$q}
   * @private
   */
  this.$q_ = $q;

  /**
   * @type {!Array.<!ngeox.QuerySource>}
   * @private
   */
  this.sources_ = [];

  /**
   * @type {!Object.<number|string, !ngeox.QuerySource>}
   * @private
   */
  this.cache_ = {};

  ol.events.listen(this.gmfThemes_, 'change', this.handleThemesChange_, this);
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

  this.gmfThemes_.getOgcServersObject().then((ogcServers) => {
    const promiseThemes = this.gmfThemes_.getThemesObject().then((themes) => {
      // create sources for each themes
      for (const theme of themes) {
        for (const child of theme.children) {
          goog.asserts.assert(child);
          this.createSources_(child, child, ogcServers);
        }
      }
    });

    const promiseBgLayers = this.gmfThemes_.getBackgroundLayersObject().then((backgroundLayers) => {
      // create a source for each background layer
      for (const backgroundLayer of backgroundLayers) {
        this.createSources_(null, backgroundLayer, ogcServers);
      }
    });

    // then add all sources to the query service
    this.$q_.all([promiseThemes, promiseBgLayers]).then(() => {
      this.ngeoQuery_.addSources(this.sources_);
    });
  });
};


/**
 * Create and add a source for the query service from the GMF theme node if
 * it has no children, otherwise create the sources for each child node if
 * it has any.
 * @param {gmfThemes.GmfGroup} firstLevelGroup A node.
 * @param {!gmfThemes.GmfGroup|!gmfThemes.GmfLayer} node A node.
 * @param {!gmfThemes.GmfOgcServers} ogcServers OGC servers.
 * @private
 */
gmf.QueryManager.prototype.createSources_ = function(firstLevelGroup, node, ogcServers) {
  const children = node.children;

  // First we handle the groups
  if (children) {
    for (const child of children) {
      goog.asserts.assert(child);
      this.createSources_(firstLevelGroup, child, ogcServers);
    }
    return;
  }

  // We are now on a leaf so we can cast node.metadata to the typed
  // (and non minified) version.

  const id = node.id;
  const meta = /** @type {gmfThemes.GmfMetaData} */ (node.metadata);
  const identifierAttributeField = meta.identifierAttributeField;
  let layers;
  const name = node.name;
  let validateLayerParams = false;
  const gmfLayer = /** @type gmfThemes.GmfLayer */ (node);
  let ogcServer;

  // Don't create sources for WMTS layers without wmsUrl and ogcServer,
  // they are not queryable.
  if (gmfLayer.type === 'WMTS') {
    const layers_ = meta.queryLayers || meta.wmsLayers;
    if (layers_ && meta.ogcServer && ogcServers[meta.ogcServer]) {
      layers = layers_.split(',');
      ogcServer = ogcServers[meta.ogcServer];
    } else {
      return;
    }
  }

  validateLayerParams = gmfLayer.type === 'WMS';
  let gmfLayerWMS;
  if (gmfLayer.type === 'WMS') {
    gmfLayerWMS = /** @type gmfThemes.GmfLayerWMS */ (gmfLayer);
    layers = gmfLayerWMS.layers.split(',');
    if (!firstLevelGroup || firstLevelGroup.mixed) {
      goog.asserts.assert(gmfLayerWMS.ogcServer);
      ogcServer = ogcServers[/** @type string */ (gmfLayerWMS.ogcServer)];
    } else {
      goog.asserts.assert(firstLevelGroup.ogcServer);
      ogcServer = ogcServers[/** @type string */ (firstLevelGroup.ogcServer)];
    }
  }
  if (!this.cache_[id]) {
    goog.asserts.assert(ogcServer.urlWfs);
    goog.asserts.assert(layers);

    const source = {
      'id': id,
      'identifierAttributeField': identifierAttributeField,
      'label': name,
      'getLayers': function(resolution) {
        let childLayers = layers;
        goog.asserts.assert(childLayers);
        if (validateLayerParams) {
          // Some nodes have child layers, i.e. a list of layer names that are
          // part of a group. The name of the group itself can't be used 'as-is'
          // as an identifier of the layers for this source. For example, a
          // group named 'osm' might result in returning 'restaurant' features.
          // This override makes sure that those layer names are used instead of
          // the original one.
          if (gmfLayerWMS.childLayers && gmfLayerWMS.childLayers.length) {
            // skip layers with no queryable childLayer

            const childLayerNames = [];
            gmfLayerWMS.childLayers.forEach((childLayer) => {
              if (childLayer.queryable && resolution >= childLayer.minResolutionHint && resolution <= childLayer.maxResolutionHint) {
                childLayerNames.push(childLayer.name);
              }
            }, this);
            childLayers = childLayerNames;
          }
        }
        return childLayers;
      },
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
