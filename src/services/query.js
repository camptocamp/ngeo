goog.provide('ngeo.Query');

goog.require('ngeo');
goog.require('ngeo.LayerHelper');
goog.require('ol.format.WFS');
goog.require('ol.format.WMSGetFeatureInfo');
goog.require('ol.obj');
goog.require('ol.source.ImageWMS');
goog.require('ol.source.TileWMS');
goog.require('goog.uri.utils');


/**
 * @enum {string}
 */
ngeo.QueryInfoFormatType = {
  GML: 'application/vnd.ogc.gml'
};


/**
 * @typedef {{
 *     resultSource: (ngeox.QueryResultSource),
 *     source: (ngeox.QuerySource)
 * }}
 */
ngeo.QueryCacheItem;


/**
 * @typedef {{
 *     wms: (Object.<string, Array.<ngeo.QueryCacheItem>>),
 *     wfs: (Object.<string, Array.<ngeo.QueryCacheItem>>)
 * }}
 */
ngeo.QueryableSources;


/**
 * The `ngeoQueryResult` is the value service where the features of the query
 * result are added.
 */
ngeo.module.value('ngeoQueryResult', /** @type {ngeox.QueryResult} */ ({
  sources: [],
  total: 0,
  pending: false
}));


/**
 * The Query service provides a way to send WMS GetFeatureInfo and WFS GetFeature
 * requests from visible layer objects within a map. Those do not necessarily need to have
 * a WMS source. The Query service requires source configuration in order
 * for layers to actually be considered queryable.
 *
 * To know more about the specification of a source configuration, see
 * `ngeox.QuerySource`
 *
 * @constructor
 * @struct
 * @param {angular.$http} $http Angular $http service.
 * @param {angular.$q} $q The Angular $q service.
 * @param {ngeox.QueryResult} ngeoQueryResult The ngeo query result service.
 * @param {ngeox.QueryOptions|undefined} ngeoQueryOptions The options to
 *     configure the ngeo query service with.
 * @param {ngeo.LayerHelper} ngeoLayerHelper Ngeo Layer Helper.
 * @ngdoc service
 * @ngname ngeoQuery
 * @ngInject
 */
ngeo.Query = function($http, $q, ngeoQueryResult, ngeoQueryOptions,
    ngeoLayerHelper) {

  var options = ngeoQueryOptions !== undefined ? ngeoQueryOptions : {};


  /**
   * @type {Object.<string, string>}
   */
  this.dimensions = {};

  /**
   * @type {number}
   * @private
   */
  this.limit_ = options.limit !== undefined ? options.limit : 50;

  /**
   * @type {boolean}
   * @private
   */
  this.queryCountFirst_ = options.queryCountFirst !== undefined ?
      options.queryCountFirst : false;

  /**
   * @type {string}
   * @private
   */
  this.sourceIdsProperty_ = options.sourceIdsProperty !== undefined ?
      options.sourceIdsProperty : ngeo.Query.DEFAULT_SOURCE_IDS_PROPERTY_;

  /**
   * @type {number}
   * @private
   */
  this.tolerancePx_ = options.tolerance !== undefined ?
      options.tolerance : 3;

  /**
   * @type {string}
   * @private
   */
  this.featureNS_ = options.featureNS !== undefined ?
      options.featureNS : 'http://mapserver.gis.umn.edu/mapserver';

  /**
   * @type {string}
   * @private
   */
  this.featurePrefix_ = options.featurePrefix !== undefined ?
      options.featurePrefix : 'feature';

  /**
   * @type {string}
   * @private
   */
  this.geometryName_ = options.geometryName !== undefined ?
      options.geometryName : 'the_geom';

  /**
   * @type {ngeo.LayerHelper}
   * @private
   */
  this.ngeoLayerHelper_ = ngeoLayerHelper;

  /**
   * @type {angular.$http}
   * @private
   */
  this.$http_ = $http;

  /**
   * @type {angular.$q}
   * @private
   */
  this.$q_ = $q;

  /**
   * @type {ngeox.QueryResult}
   * @private
   */
  this.result_ = ngeoQueryResult;

  /**
   * @type {Array.<ngeox.QuerySource>}
   * @private
   */
  this.sources_ = [];

  /**
   * @type {Object.<number|string, ngeo.QueryCacheItem>}
   * @private
   */
  this.cache_ = {};

  /**
   * Promises that can be resolved to cancel started requests.
   * @type {Array.<angular.$q.Deferred>}
   * @private
   */
  this.requestCancelers_ = [];
};


/**
 * @const
 * @private
 */
ngeo.Query.DEFAULT_SOURCE_IDS_PROPERTY_ = 'querySourceIds';


/**
 * Adds a new source to the query service.
 *
 * A source must at least have an `id` configured.  That id is then used to
 * associate the corresponding layer object within a map.
 *
 * A source will require a `ol.source.ImageWMS` or `ol.source.TileWMS` object.
 * You can either set it directly in the config, or use the one from a given
 * layer or let the query service create one for you using other source config
 * such as `url` and `params`.
 *
 * A source can be set with either a `format` and/or `infoFormat`, which will
 * determine how the returned features of a query will be read.
 *
 * This method will also create a result entry in the `ngeoQueryResult`
 * value service.
 *
 * @param {ngeox.QuerySource} source The source to add to the query service.
 * @export
 */
ngeo.Query.prototype.addSource = function(source) {
  var sourceId = source.id;

  goog.asserts.assert(sourceId, 'source.id should be thruthy');
  goog.asserts.assert(!this.cache_[sourceId],
      'no other source with the same id should be present');

  // == wmsSource ==
  // if the source doesn't have a wmsSource property set, it must at least have
  // a layer that has one or have the required configuration options in order
  // to create one.
  if (!source.wmsSource) {
    if (source.layer &&
        (source.layer instanceof ol.layer.Image ||
         source.layer instanceof ol.layer.Tile)) {
      var wmsSource = source.layer.getSource();
      if (wmsSource &&
          (wmsSource instanceof ol.source.ImageWMS ||
           wmsSource instanceof ol.source.TileWMS)) {
        source.wmsSource =
            /** @type {ol.source.ImageWMS|ol.source.TileWMS} */ (wmsSource);
      }
    } else {
      var url = source.url;
      var params = source.params;
      goog.asserts.assert(url,
          'url must be set when no layer or wmsSource is set in the source');
      goog.asserts.assert(params,
          'parmas must be set when no layer or wmsSource is set in the source');
      source.wmsSource = new ol.source.ImageWMS({
        url: url,
        params: params
      });
    }
  }
  goog.asserts.assert(source.wmsSource, 'wmsSource should be thruthy');

  // == format ==
  if (!source.format) {
    // GML is the default infoFormat if the source doesn't have one defined
    if (!source.infoFormat) {
      source.infoFormat = ngeo.QueryInfoFormatType.GML;
    }

    var layers = source.wmsSource.getParams()['LAYERS'].split(',');

    if (source.infoFormat === ngeo.QueryInfoFormatType.GML) {
      source.format = new ol.format.WMSGetFeatureInfo({
        layers: layers
      });
    }
  } else if (!source.infoFormat) {
    // == infoFormat ==
    var format = source.format;
    if (format instanceof ol.format.WMSGetFeatureInfo) {
      source.infoFormat = ngeo.QueryInfoFormatType.GML;
    }
  }
  goog.asserts.assert(source.format, 'format should be thruthy');

  this.sources_.push(source);

  var sourceLabel = source.label !== undefined ? source.label : sourceId;

  var sourceIdentifierAttributeField =
      source.identifierAttributeField !== undefined ?
      source.identifierAttributeField : sourceId;

  var resultSource = /** @type {ngeox.QueryResultSource} */ ({
    'features': [],
    'id': sourceId,
    'identifierAttributeField': sourceIdentifierAttributeField,
    'label': sourceLabel,
    'pending': false,
    'queried': false
  });

  this.result_.sources.push(resultSource);

  var cacheItem = {
    'source': source,
    'resultSource': resultSource
  };
  this.cache_[sourceId] = cacheItem;
};


/**
 * Add multiple sources at once in the order they are given.
 * @param {Array.<ngeox.QuerySource>} sources The sources to add to the query
 *     service.
 * @export
 */
ngeo.Query.prototype.addSources = function(sources) {
  sources.forEach(this.addSource, this);
};


/**
 * Clear the results.
 * @export
 */
ngeo.Query.prototype.clear = function() {
  this.clearResult_();
};


/**
 * Remove all sources.
 * @export
 */
ngeo.Query.prototype.removeAllSources = function() {
  this.result_.sources.length = 0;
  this.sources_.length = 0;
  this.cache_ = {};
};


/**
 * Issue a new request using a given map and a given object, which can be
 * a coordinate or extent.
 *
 * When given a coordinate, WMS GetFeatureInfo or WFS GetFeature requests will
 * be made. If a layer supports WFS, a GetFeature request with a bbox around the
 * coordinate are issued.
 *
 * For an extent, WFS GetFeature is used.
 *
 * @param {ol.Map} map The ol3 map object to fetch the layers from.
 * @param {ol.Coordinate|ol.Extent} object The coordinate or extent to issue
 *     the request with.
 * @export
 */
ngeo.Query.prototype.issue = function(map, object) {
  this.cancelStillRunningRequests_();
  this.clearResult_();

  if (object.length === 2) {
    this.issueIdentifyFeaturesRequests_(map, object);
  } else {
    goog.asserts.assert(object.length === 4, 'expecting extent');
    this.issueGetFeatureRequests_(map, object);
  }
};


/**
 * Issue WMS GetFeatureInfo or WFS GetFeature requests using the given
 * coordinate and map.
 * For each visible layer of the map, if that layer has a source configured
 * within this query service, then a query will be sent and the results
 * will be stocked in the `ngeoQueryResult`.
 *
 * For WMS GetFeatureInfo, gf multiple sources share the same url and use GML
 * as info format, then only one request will be sent for all these sources.
 *
 * NOTE: Only GML info format are currently supported.
 *
 * @param {ol.Map} map The ol3 map object to fetch the layers from.
 * @param {ol.Coordinate} coordinate The coordinate to issue the request with.
 * @private
 */
ngeo.Query.prototype.issueIdentifyFeaturesRequests_ = function(map, coordinate) {
  var sources = this.getQueryableSources_(map, false);

  this.doGetFeatureInfoRequests_(sources.wms, coordinate, map);
  this.doGetFeatureRequestsWithCoordinate_(sources.wfs, coordinate, map);
  this.updatePendingState_();
};


/**
 * Issue WFS GetFeature requests using the given extent for each visible layer
 * of the map.
 *
 * @param {ol.Map} map The ol3 map object to fetch the layers from.
 * @param {ol.Extent} extent The coordinate to issue the request with.
 * @private
 */
ngeo.Query.prototype.issueGetFeatureRequests_ = function(map, extent) {
  var sources = this.getQueryableSources_(map, true);
  this.doGetFeatureRequests_(sources.wfs, extent, map);
  this.updatePendingState_();
};


/**
 * @param {ol.Map} map Map.
 * @param {boolean} wfsOnly Only get sources queryable via WFS.
 * @return {ngeo.QueryableSources} Queryable sources.
 * @private
 */
ngeo.Query.prototype.getQueryableSources_ = function(map, wfsOnly) {

  var wmsItemsByUrl =
      /** @type {Object.<string, Array.<ngeo.QueryCacheItem>>} */ ({});
  var wfsItemsByUrl =
      /** @type {Object.<string, Array.<ngeo.QueryCacheItem>>} */ ({});

  var layers = this.ngeoLayerHelper_.getFlatLayers(map.getLayerGroup());

  layers.forEach(function(layer) {

    // Skip layers that are not visible
    if (!this.ngeoLayerHelper_.isLayerVisible(layer, map)) {
      return;
    }

    // Skip layers that don't have one or more sources configured
    var ids = this.getLayerSourceIds_(layer);
    if (ids.length === 0) {
      return;
    }

    var infoFormat;
    var url;
    var item;
    for (var i = 0, len = ids.length; i < len; i++) {
      var id = ids[i];
      item = this.cache_[id];
      if (!item) {
        continue;
      }

      // If `validateLayerParams` is set, then the source config layer in the
      // LAYERS params must be in the current LAYERS params of the layer
      // wms source object.
      if (item.source.validateLayerParams) {
        goog.asserts.assert(
            layer instanceof ol.layer.Image ||
            layer instanceof ol.layer.Tile,
            'The layer should be an Image or Tile when using the ' +
            'validateLayerParams option.'
        );
        var layerSource = layer.getSource();
        goog.asserts.assert(
            layerSource instanceof ol.source.ImageWMS ||
            layerSource instanceof ol.source.TileWMS,
            'The layer source should be a WMS one when using the ' +
            'validateLayerParams option.'
        );
        var layerLayers = layerSource.getParams()['LAYERS'].split(',');
        var cfgLayer = item.source.wmsSource.getParams()['LAYERS'].split(',');

        var every = cfgLayer.every(function(layer) {
          return layerLayers.indexOf(layer) != -1;
        });
        if (!every) {
          continue;
        }
      }

      if (item.source.wfsQuery) {
        // use WFS GetFeature
        url = item.source.urlWfs || item.source.wmsSource.getUrl();
        goog.asserts.assertString(url);
        if (!wfsItemsByUrl[url]) {
          wfsItemsByUrl[url] = [];
        }
        this.pushSourceIfUnique_(item, wfsItemsByUrl[url]);
      } else if (!wfsOnly) {
        // use WMF GetFeatureInfo
        infoFormat = item.source.infoFormat;

        // Sources that use GML as info format are combined together if they
        // share the same server url
        if (infoFormat === ngeo.QueryInfoFormatType.GML) {
          url = item.source.wmsSource.getUrl();
          goog.asserts.assertString(url);
          if (!wmsItemsByUrl[url]) {
            wmsItemsByUrl[url] = [];
          }
          this.pushSourceIfUnique_(item, wmsItemsByUrl[url]);
        } else {
          // TODO - support other kinds of infoFormats
        }
      }
    }
  }, this);

  return {
    wms: wmsItemsByUrl,
    wfs: wfsItemsByUrl
  };
};


/**
 * Push source if and only if not already in the array. it aims to add a unicity
 * constraint on sources.
 *
 * The 'id' of a source object is taken from the 'id' property of the
 * node object (in the tree). Under the wood, the 'id' property of a node is filled
 * regarding the layer attached to it. therefore, Two nodes with the same layer ,
 * attached will have the same 'id'. We must avoid multiple identical request.
 * @param  {ngeo.QueryCacheItem} item  The QueryCache item to push in the array
 * @param  {Array.<ngeo.QueryCacheItem>} array QueryCacheItem array
 * @return {boolean} true if the item has been added, false otherwise.
 * @private
 */
ngeo.Query.prototype.pushSourceIfUnique_ = function(item, array) {
  var isUnique = array.indexOf(item) < 0;
  if (isUnique) {
    array.push(item);
  }
  return isUnique;
};

/**
 * @param {Object.<string, Array.<ngeo.QueryCacheItem>>} wmsItemsByUrl Queryable
 *    layers for GetFeatureInfo
 * @param {ol.Coordinate} coordinate Query coordinate
 * @param {ol.Map} map Map
 * @private
 */
ngeo.Query.prototype.doGetFeatureInfoRequests_ = function(
    wmsItemsByUrl, coordinate, map) {
  var view = map.getView();
  var projCode = view.getProjection().getCode();
  var resolution = /** @type {number} */(view.getResolution());

  angular.forEach(wmsItemsByUrl, function(items) {

    items.forEach(function(item) {
      item['resultSource'].pending = true;
      item['resultSource'].queried = true;
    });

    var infoFormat = items[0].source.infoFormat;
    var wmsGetFeatureInfoUrl = items[0].source.wmsSource.getGetFeatureInfoUrl(
        coordinate, resolution, projCode, {
          'INFO_FORMAT': infoFormat,
          'FEATURE_COUNT': this.limit_
        });

    goog.asserts.assert(
        wmsGetFeatureInfoUrl, 'WMS GetFeatureInfo url should be thruty');

    var layers = this.getLayersForItems_(items);
    var lyrStr = layers.join(',');

    wmsGetFeatureInfoUrl =
        goog.uri.utils.setParam(wmsGetFeatureInfoUrl, 'LAYERS', lyrStr);
    wmsGetFeatureInfoUrl =
        goog.uri.utils.setParam(wmsGetFeatureInfoUrl, 'QUERY_LAYERS', lyrStr);

    // add dimensions values
    var dimensions = items[0].source.dimensions;
    if (dimensions) {
      for (var key in dimensions) {
        var value = this.dimensions[key];
        if (value !== undefined) {
          wmsGetFeatureInfoUrl = goog.uri.utils.setParam(wmsGetFeatureInfoUrl, key, value);
        }
      }
    }

    var canceler = this.registerCanceler_();
    this.$http_.get(wmsGetFeatureInfoUrl, {timeout: canceler.promise})
        .then(function(items, response) {
          items.forEach(function(item) {
            item['resultSource'].pending = false;
            var format = item.source.format;
            var features = format.readFeatures(response.data);
            this.setUniqueIds_(features, item.source.id);
            item['resultSource'].features = features;
            this.result_.total += features.length;
          }, this);
          this.updatePendingState_();
        }.bind(this, items));
  }, this);
};


/**
 * @param {Object.<string, Array.<ngeo.QueryCacheItem>>} wfsItemsByUrl Queryable
 *    layers for GetFeature
 * @param {ol.Coordinate} coordinate Query coordinate
 * @param {ol.Map} map Map
 * @private
 */
ngeo.Query.prototype.doGetFeatureRequestsWithCoordinate_ = function(
    wfsItemsByUrl, coordinate, map) {
  var view = map.getView();
  var bbox = this.getQueryBbox_(coordinate, view);
  this.doGetFeatureRequests_(wfsItemsByUrl, bbox, map);
};


/**
 * @param {Object.<string, Array.<ngeo.QueryCacheItem>>} wfsItemsByUrl Queryable
 *    layers for GetFeature
 * @param {ol.Extent} bbox Query bbox
 * @param {ol.Map} map Map
 * @private
 */
ngeo.Query.prototype.doGetFeatureRequests_ = function(
    wfsItemsByUrl, bbox, map) {
  var view = map.getView();
  var projCode = view.getProjection().getCode();
  var wfsFormat = new ol.format.WFS();
  var xmlSerializer = new XMLSerializer();

  angular.forEach(wfsItemsByUrl, function(items, url) {
    items.forEach(function(item) {
      var layers = this.getLayersForItem_(item);

      if (layers.length == 0 || layers[0] === '') {
        // do not query source if no valid layers
        return;
      }

      item['resultSource'].pending = true;
      item['resultSource'].queried = true;

      /** @type{olx.format.WFSWriteGetFeatureOptions} */
      var getFeatureOptions = {
        srsName: projCode,
        featureNS: this.featureNS_,
        featurePrefix: this.featurePrefix_,
        featureTypes: layers,
        outputFormat: 'GML3',
        bbox: bbox,
        geometryName: this.geometryName_
      };

      var sourceFormat = new ol.format.WFS({
        featureType: layers,
        featureNS: this.featureNS_
      });

      var getFeatures = function() {
        /** @type{olx.format.WFSWriteGetFeatureOptions} */
        var options = /** @type{olx.format.WFSWriteGetFeatureOptions} */ (ol.obj.assign({
          maxFeatures: this.limit_
        }, getFeatureOptions));
        var featureRequestXml = wfsFormat.writeGetFeature(options);
        var featureRequest = xmlSerializer.serializeToString(featureRequestXml);

        var canceler = this.registerCanceler_();
        this.$http_.post(url, featureRequest, {timeout: canceler.promise})
            .then(function(response) {
              item['resultSource'].pending = false;
              var features = sourceFormat.readFeatures(response.data);
              this.setUniqueIds_(features, item.source.id);
              item['resultSource'].features = features;
              this.result_.total += features.length;
              this.updatePendingState_();
            }.bind(this));
      }.bind(this);

      if (this.queryCountFirst_) {
        var getCountOptions = /** @type{olx.format.WFSWriteGetFeatureOptions} */ (ol.obj.assign({
          resultType: 'hits'
        }, getFeatureOptions));
        var featureCountXml = wfsFormat.writeGetFeature(getCountOptions);
        var featureCountRequest = xmlSerializer.serializeToString(featureCountXml);

        var canceler = this.registerCanceler_();
        this.$http_.post(url, featureCountRequest, {timeout: canceler.promise})
            .then(function(response) {
              var meta = sourceFormat.readFeatureCollectionMetadata(response.data);
              if (meta['numberOfFeatures'] > this.limit_) {
                item['resultSource'].pending = false;
                item['resultSource'].features = [];
                item['resultSource'].tooManyResults = true;
                item['resultSource'].totalFeatureCount = meta['numberOfFeatures'];
                this.updatePendingState_();
              } else {
                getFeatures();
              }
            }.bind(this));
      } else {
        getFeatures();
      }
    }.bind(this));
  }.bind(this));
};

/**
 * Clear every features for all result sources and reset the total counter
 * as well.
 * @private
 */
ngeo.Query.prototype.clearResult_ = function() {
  this.result_.total = 0;
  this.result_.sources.forEach(function(source) {
    source.features.length = 0;
    source.pending = false;
    source.queried = false;
    source.tooManyResults = false;
    source.totalFeatureCount = undefined;
  }, this);
  this.result_.pending = false;
};


/**
 * Returns the source ids from an ol3 layer object.
 * @param {ol.layer.Base} layer The ol3 layer object.
 * @return {Array.<number|string>} ids The ids of the sources bound to that
 *     layer.
 * @private
 */
ngeo.Query.prototype.getLayerSourceIds_ = function(layer) {
  var ids = layer.get(this.sourceIdsProperty_) || [];
  goog.asserts.assertArray(ids);
  var clone = ids.slice();
  return clone;
};


/**
 * @param {ngeo.QueryCacheItem} item Cache item
 * @return {Array.<string>} Layer names
 * @private
 */
ngeo.Query.prototype.getLayersForItem_ = function(item) {
  return item.source.wmsSource.getParams()['LAYERS'].split(',');
};


/**
 * @param {Array.<ngeo.QueryCacheItem>} items Cache items
 * @return {Array.<string>} Layer names
 * @private
 */
ngeo.Query.prototype.getLayersForItems_ = function(items) {
  var layers = this.getLayersForItem_(items[0]);
  for (var i = 1, len = items.length; i < len; i++) {
    layers = layers.concat(this.getLayersForItem_(items[i]));
  }
  return layers;
};


/**
 * Make sure that feature ids are unique, because the same features might
 * be returned for different layers.
 * @param {Array.<ol.Feature>} features Features
 * @param {string|number} sourceId Source id.
 * @private
 */
ngeo.Query.prototype.setUniqueIds_ = function(features, sourceId) {
  features.forEach(function(feature) {
    if (feature.getId() !== undefined) {
      var id = sourceId + '_' + feature.getId();
      feature.setId(id);
    }
  });
};


/**
 * Construct a bbox around a coordinate with a tolerance relative to the
 * current resolution.
 * @param {ol.Coordinate} coordinate Coordinate
 * @param {ol.View} view View
 * @return {ol.Extent} Bbox
 * @private
 */
ngeo.Query.prototype.getQueryBbox_ = function(coordinate, view) {
  var tolerance = this.tolerancePx_ * view.getResolution();

  return ol.extent.buffer(
      ol.extent.createOrUpdateFromCoordinate(coordinate),
      tolerance);
};


/**
 * @return {angular.$q.Deferred} A deferred that can be resolved to cancel a
 *    HTTP request.
 * @private
 */
ngeo.Query.prototype.registerCanceler_ = function() {
  var canceler = this.$q_.defer();
  this.requestCancelers_.push(canceler);
  return canceler;
};


/**
 * @private
 */
ngeo.Query.prototype.cancelStillRunningRequests_ = function() {
  this.requestCancelers_.forEach(function(canceler) {
    canceler.resolve();
  });
  this.requestCancelers_.length = 0;
};


ngeo.Query.prototype.updatePendingState_ = function() {
  var pendingSources = 0;
  this.result_.sources.forEach(function(source) {
    if (source.pending) {
      pendingSources++;
    }
  });
  this.result_.pending = pendingSources > 0;
};


/**
 * @returns {number} The maximum number of features that are requested.
 * @public
 */
ngeo.Query.prototype.getLimit = function() {
  return this.limit_;
};


ngeo.module.service('ngeoQuery', ngeo.Query);
