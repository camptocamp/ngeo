goog.provide('ngeo.WfsPermalink');

goog.require('ngeo');
/** @suppress {extraRequire} - required for `ngeoQueryResult` */
goog.require('ngeo.Query');
goog.require('ol.format.WFS');


/**
 * @typedef {{
 *     property: (string),
 *     condition: (string|Array.<string>)
 * }}
 */
ngeo.WfsPermalinkFilter;


/**
 * @typedef {{
 *     filters: (Array.<ngeo.WfsPermalinkFilter>)
 * }}
 */
ngeo.WfsPermalinkFilterGroup;


/**
 * @typedef {{
 *     wfsType: (string),
 *     filterGroups: (Array.<ngeo.WfsPermalinkFilterGroup>),
 *     showFeatures: (boolean)
 * }}
 */
ngeo.WfsPermalinkData;


/**
 * Constant that is supposed to be set in applications to enable the WFS
 * permalink functionality.
 */
ngeo.module.constant('ngeoWfsPermalinkOptions',
    /** @type {ngeox.WfsPermalinkOptions} */ ({
      url: '', wfsTypes: [], defaultFeatureNS: '', defaultFeaturePrefix: ''
    }));


/**
 * WFS permalink service that can be used to load features with a WFS
 * GetFeature request given query parameters.
 *
 * @constructor
 * @param {angular.$http} $http Angular $http service.
 * @param {ngeo.QueryResult} ngeoQueryResult The ngeo query result service.
 * @param {ngeox.WfsPermalinkOptions} ngeoWfsPermalinkOptions The options to
 *     configure the ngeo wfs permalink service with.
 * @ngdoc service
 * @ngname ngeoWfsPermalink
 * @ngInject
 */
ngeo.WfsPermalink = function($http, ngeoQueryResult, ngeoWfsPermalinkOptions) {

  var options = ngeoWfsPermalinkOptions;

  /**
   * @type {string}
   * @private
   */
  this.url_ = options.url;

  /**
   * @type {number}
   * @private
   */
  this.maxFeatures_ = options.maxFeatures !== undefined ? options.maxFeatures : 50;

  /**
   * @type {Object<string, ngeox.WfsType>}
   * @private
   */
  this.wfsTypes_ = {};
  options.wfsTypes.forEach(function(wfsType) {
    this.wfsTypes_[wfsType.featureType] = wfsType;
  }.bind(this));

  /**
   * @type {string}
   * @private
   */
  this.defaultFeatureNS_ = options.defaultFeatureNS;

  /**
   * @type {string}
   * @private
   */
  this.defaultFeaturePrefix_ = options.defaultFeaturePrefix;

  /**
   * @type {number|undefined}
   * @private
   */
  this.pointRecenterZoom_ = options.pointRecenterZoom;

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
};


/**
 * Clear the results.
 * @export
 */
ngeo.WfsPermalink.prototype.clear = function() {
  this.clearResult_();
};


/**
 * Build a WFS GetFeature request for the given query parameter data, send the
 * request and add the received features to {@link ngeo.QueryResult}.
 *
 * @param {ngeo.WfsPermalinkData} queryData Query data for the WFS request.
 * @param {ol.Map} map The ol3 map object to get the current projection from.
 * @export
 */
ngeo.WfsPermalink.prototype.issue = function(queryData, map) {
  goog.asserts.assert(this.url_,
      'url is not set. to use the wfs permalink service, ' +
      'set the constant `ngeoWfsPermalinkOptions`');
  this.clearResult_();

  var typeName = queryData.wfsType;
  if (!this.wfsTypes_.hasOwnProperty(typeName)) {
    return;
  }
  var wfsType = this.wfsTypes_[typeName];

  var filters = this.createFilters_(queryData.filterGroups);
  if (filters === null) {
    return;
  }

  this.issueRequest_(wfsType, filters, map, queryData.showFeatures);
};


/**
 * @param {ngeox.WfsType} wfsType Type.
 * @param {ol.format.ogc.filter.Filter} filter Filter.
 * @param {ol.Map} map The ol3 map object to get the current projection from.
 * @param {boolean} showFeatures Show features or only zoom to feature extent?
 * @private
 */
ngeo.WfsPermalink.prototype.issueRequest_ = function(wfsType, filter, map, showFeatures) {
  var featureRequestXml = new ol.format.WFS().writeGetFeature({
    srsName: map.getView().getProjection().getCode(),
    featureNS: (wfsType.featureNS !== undefined) ?
        wfsType.featureNS : this.defaultFeatureNS_,
    featurePrefix: (wfsType.featurePrefix !== undefined) ?
        wfsType.featurePrefix : this.defaultFeaturePrefix_,
    featureTypes: [wfsType.featureType],
    outputFormat: 'GML3',
    filter: filter,
    maxFeatures: this.maxFeatures_
  });

  var featureRequest = new XMLSerializer().serializeToString(featureRequestXml);
  this.$http_.post(this.url_, featureRequest).then(function(response) {
    var features = new ol.format.WFS().readFeatures(response.data);
    if (features.length == 0) {
      return;
    }

    // zoom to features
    var mapSize = map.getSize();
    if (mapSize !== undefined) {
      map.getView().fit(
          this.getExtent_(features),
          mapSize,
          {maxZoom: this.pointRecenterZoom_, padding: [10, 10, 10, 10]});
    }

    // then show if requested
    if (showFeatures) {
      var resultSource = /** @type {ngeo.QueryResultSource} */ ({
        'features': features,
        'id': wfsType.featureType,
        'identifierAttributeField': wfsType.label,
        'label': wfsType.featureType,
        'pending': false
      });

      this.result_.sources.push(resultSource);
      this.result_.total = features.length;
    }
  }.bind(this));
};


/**
 * @param {Array.<ol.Feature>} features Features.
 * @return {ol.Extent} The extent of all features.
 * @private
 */
ngeo.WfsPermalink.prototype.getExtent_ = function(features) {
  return features.reduce(function(extent, feature) {
    return ol.extent.extend(extent, feature.getGeometry().getExtent());
  }, ol.extent.createEmpty());
};

/**
 * Create OGC filters for the filter groups extracted from the query params.
 *
 * @param {Array.<ngeo.WfsPermalinkFilterGroup>} filterGroups Filter groups.
 * @return {ol.format.ogc.filter.Filter} OGC filters.
 * @private
 */
ngeo.WfsPermalink.prototype.createFilters_ = function(filterGroups) {
  if (filterGroups.length == 0) {
    return null;
  }
  var f = ol.format.ogc.filter;
  var createFiltersForGroup = function(filterGroup) {
    var filters = filterGroup.filters.map(function(filterDef) {
      var condition = filterDef.condition;
      if (Array.isArray(condition)) {
        return ngeo.WfsPermalink.or_(condition.map(function(cond) {
          return f.equalTo(filterDef.property, cond);
        }));
      } else {
        return f.equalTo(filterDef.property, filterDef.condition);
      }
    });
    return ngeo.WfsPermalink.and_(filters);
  };
  return ngeo.WfsPermalink.or_(filterGroups.map(createFiltersForGroup));
};


/**
 * Join a list of filters with `and(...)`.
 *
 * @param {Array.<ol.format.ogc.filter.Filter>} filters The filters to join.
 * @return {ol.format.ogc.filter.Filter} The joined filters.
 * @private
 */
ngeo.WfsPermalink.and_ = function(filters) {
  return ngeo.WfsPermalink.joinFilters_(filters, ol.format.ogc.filter.and);
};


/**
 * Join a list of filters with `or(...)`.
 *
 * @param {Array.<ol.format.ogc.filter.Filter>} filters The filters to join.
 * @return {ol.format.ogc.filter.Filter} The joined filters.
 * @private
 */
ngeo.WfsPermalink.or_ = function(filters) {
  return ngeo.WfsPermalink.joinFilters_(filters, ol.format.ogc.filter.or);
};


/**
 * Join a list of filters with a given join function.
 *
 * @param {Array.<ol.format.ogc.filter.Filter>} filters The filters to join.
 * @param {function(!ol.format.ogc.filter.Filter, !ol.format.ogc.filter.Filter):
 *    ol.format.ogc.filter.Filter} joinFn The function to join two filters.
 * @return {ol.format.ogc.filter.Filter} The joined filters.
 * @private
 */
ngeo.WfsPermalink.joinFilters_ = function(filters, joinFn) {
  return filters.reduce(function(combinedFilters, currentFilter) {
    if (combinedFilters === null) {
      return currentFilter;
    } else {
      goog.asserts.assert(currentFilter !== null);
      return joinFn(combinedFilters, currentFilter);
    }
  }, null);
};


/**
 * Clear every features for all result sources and reset the total counter
 * as well.
 * @private
 */
ngeo.WfsPermalink.prototype.clearResult_ = function() {
  this.result_.total = 0;
  this.result_.sources.forEach(function(source) {
    source.features.length = 0;
  }, this);
};

ngeo.module.service('ngeoWfsPermalink', ngeo.WfsPermalink);
