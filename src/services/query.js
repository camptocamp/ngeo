goog.provide('ngeo.Query');

goog.require('ngeo');
goog.require('ol.format.WMSGetFeatureInfo');
goog.require('ol.source.ImageWMS');
goog.require('ol.source.TileWMS');


/**
 * @typedef {{
 *     resultSource: (ngeo.QueryResultSource),
 *     source: (ngeox.QuerySource)
 * }}
 */
ngeo.QueryCacheItem;


/**
 * @enum {string}
 */
ngeo.QueryInfoFormatType = {
  GML: 'application/vnd.ogc.gml'
};


/**
 * @typedef {{
 *     sources: (Array.<ngeo.QueryResultSource>),
 *     total: (number)
 * }}
 */
ngeo.QueryResult;


/**
 * @typedef {{
 *     features: (Array.<ol.Feature>),
 *     id: (number|string),
 *     label: (string),
 *     pending: (boolean)
 * }}
 */
ngeo.QueryResultSource;


/**
 * The `ngeoQueryResult` is the value service where the features of the query
 * result are added.
 */
ngeo.module.value('ngeoQueryResult', /** @type {ngeo.QueryResult} */ ({
  sources: [],
  total: 0
}));


/**
 * The Query service provides a way to send WMS GetFeatureInfo requests from
 * visible layer objects within a map. Those do not necessarily need to have
 * a WMS source. The Query service requires source configuration in order
 * for layers to actually be considered queryable.
 *
 * To know more about the specification of a source configuration, see
 * `ngeox.QuerySource`
 *
 * @constructor
 * @param {angular.$http} $http Angular $http service.
 * @param {ngeo.QueryResult} ngeoQueryResult The ngeo query result service.
 * @param {ngeox.QueryOptions|undefined} ngeoQueryOptions The options to
 *     configure the ngeo query service with.
 * @param {ngeo.LayerHelper} ngeoLayerHelper Ngeo Layer Helper.
 * @ngdoc service
 * @ngname ngeoQuery
 * @ngInject
 */
ngeo.Query = function($http, ngeoQueryResult, ngeoQueryOptions,
    ngeoLayerHelper) {

  var options = ngeoQueryOptions !== undefined ? ngeoQueryOptions : {};

  /**
   * @type {number}
   * @private
   */
  this.limit_ = options.limit !== undefined ? options.limit : 50;

  /**
   * @type {string}
   * @private
   */
  this.sourceIdProperty_ = options.sourceIdProperty !== undefined ?
      options.sourceIdProperty : ngeo.Query.DEFAULT_SOURCE_ID_PROPERTY_;

  /**
   * @type {string}
   * @private
   */
  this.sourceIdsProperty_ = options.sourceIdsProperty !== undefined ?
      options.sourceIdsProperty : ngeo.Query.DEFAULT_SOURCE_IDS_PROPERTY_;

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
   * @type {ngeo.QueryResult}
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
};


/**
 * @const
 * @private
 */
ngeo.Query.DEFAULT_SOURCE_ID_PROPERTY_ = 'querySourceId';


/**
 * @const
 * @private
 */
ngeo.Query.DEFAULT_SOURCE_IDS_PROPERTY_ = 'querySourceIds';


/**
 * Adds a new source to the query service.
 *
 * A source must at least have an `id` configured.  That id is then used to
 * associate the the corresponding layer object within a map.
 *
 * A source will require a `ol.source.ImageWMS` or `ol.source.TileWMS` object.
 * You can either set it directly in the config, or use the one from a given
 * layer or let the query service create one from you using other source config
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

  var resultSource = /** @type {ngeo.QueryResultSource} */ ({
    'features': [],
    'id': sourceId,
    'identifierAttributeField': sourceIdentifierAttributeField,
    'label': sourceLabel,
    'pending': false
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
 * Issue a new request using a given map and a given object, which can be
 * a coordinate or extent.
 *
 * NOTE: only coordinates are currently supported.
 *
 * @param {ol.Map} map The ol3 map object to fetch the layers from.
 * @param {ol.Coordinate|ol.Extent} object The coordinate or extent to issue
 *     the request with.
 * @export
 */
ngeo.Query.prototype.issue = function(map, object) {

  this.clearResult_();

  if (object.length === 2) {
    this.issueWMSGetFeatureInfoRequests_(map, object);
  }
};


/**
 * Issue a new WMS GetFeatureInfo request using a given map and a coordinate.
 * For each visible layer of the map, if that layer has a source configured
 * within this query service, then a query will be sent and the results
 * will be stocked in the `ngeoQueryResult`.
 *
 * If multiple sources share the same url and use GML as info format, then
 * only one request will be sent for all these sources.
 *
 * NOTE: Only GML info format are currently supported.
 *
 * @param {ol.Map} map The ol3 map object to fetch the layers from.
 * @param {ol.Coordinate} coordinate The coordinate to issue the request with.
 * @private
 */
ngeo.Query.prototype.issueWMSGetFeatureInfoRequests_ = function(
    map, coordinate) {

  var view = map.getView();
  var projCode = view.getProjection().getCode();

  var id;
  var ids;
  var infoFormat;
  var url;
  var item;
  var wmsGetFeatureInfoUrl;

  var itemsByUrl =
      /** @type {Object.<string, Array.<ngeo.QueryCacheItem>>} */ ({});

  var resolution = /** @type {number} */ (view.getResolution());

  var layers = this.ngeoLayerHelper_.getFlatLayers(map.getLayerGroup());

  layers.forEach(function(layer) {

    // Skip layers that are not visible
    if (!layer.getVisible()) {
      return;
    }

    // Skip layers that don't have one or more sources configured
    id = this.getLayerSourceId_(layer);
    ids = this.getLayerSourceIds_(layer);
    if ((!id || !this.cache_[id]) && !ids.length) {
      return;
    }

    if (id) {
      ids.push(id);
    }

    for (var i = 0, len = ids.length; i < len; i++) {
      id = ids[i];
      item = this.cache_[id];

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
        var cfgLayer = item.source.wmsSource.getParams()['LAYERS'];
        if (layerLayers.indexOf(cfgLayer) === -1) {
          continue;
        }
      }

      item['resultSource'].pending = true;
      infoFormat = item.source.infoFormat;

      // Sources that use GML as info format are combined together if they
      // share the same server url
      if (infoFormat === ngeo.QueryInfoFormatType.GML) {
        url = item.source.wmsSource.getUrl();
        goog.asserts.assertString(url);
        if (!itemsByUrl[url]) {
          itemsByUrl[url] = [];
        }
        itemsByUrl[url].push(item);
      } else {
        // TODO - support other kinds of infoFormats
        item['resultSource'].pending = false;
      }
    }
  }, this);

  goog.object.forEach(itemsByUrl, function(items) {

    infoFormat = items[0].source.infoFormat;
    var layers = items[0].source.wmsSource.getParams()['LAYERS'].split(',');

    wmsGetFeatureInfoUrl = items[0].source.wmsSource.getGetFeatureInfoUrl(
        coordinate, resolution, projCode, {
          'INFO_FORMAT': infoFormat,
          'FEATURE_COUNT': this.limit_
        });

    goog.asserts.assert(
        wmsGetFeatureInfoUrl, 'WMS GetFeatureInfo url should be thruty');

    for (var i = 1, len = items.length; i < len; i++) {
      layers = layers.concat(
          items[i].source.wmsSource.getParams()['LAYERS'].split(','));
    }

    var lyrStr = layers.join(',');

    wmsGetFeatureInfoUrl =
        goog.uri.utils.setParam(wmsGetFeatureInfoUrl, 'LAYERS', lyrStr);
    wmsGetFeatureInfoUrl =
        goog.uri.utils.setParam(wmsGetFeatureInfoUrl, 'QUERY_LAYERS', lyrStr);

    this.$http_.get(wmsGetFeatureInfoUrl).then(function(items, response) {
      items.forEach(function(item) {
        var format = item.source.format;
        var features = format.readFeatures(response.data);
        item['resultSource'].pending = false;
        item['resultSource'].features = features;
        this.result_.total += features.length;
      }, this);
    }.bind(this, items));
  }, this);
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
  }, this);
};


/**
 * Returns the source id from an ol3 layer object.
 * @param {ol.layer.Base} layer The ol3 layer object.
 * @return {number|string} id The id of the source bound to that layer.
 * @private
 */
ngeo.Query.prototype.getLayerSourceId_ = function(layer) {
  var id = layer.get(this.sourceIdProperty_);
  id = goog.isNumber(id) || goog.isString(id) ? id : '';
  return id;
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
  var clone = ids.slice()
  return clone;
};


ngeo.module.service('ngeoQuery', ngeo.Query);
