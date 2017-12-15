goog.provide('ngeo.statemanager.WfsPermalink');

goog.require('ngeo');
goog.require('ol.extent');
goog.require('ol.format.filter');
goog.require('ol.format.WFS');


/**
 * WFS permalink service that can be used to load features with a WFS
 * GetFeature request given query parameters.
 *
 * Resulting features are then highlighted and
 * the map is zoomed to the nearest map extent.
 *
 * Parameters:
 *
 * - ``wfs_layer`` tells what layer will be queried
 * - ``wfs_showFeatures`` (boolean) tells if the features should be
 *   highlighted and listed (when true) or if the map should only be
 *   recentered on the features (when false). Default is true.
 * - other parameters will be considered as WFS attribute/values filters and
 *   must be of the form:
 *   ``wfs_<layer attribute name>=<a comma-separated list of values>``
 *
 * Example:
 * http://example.com?wfs_layer=parcels&wfs_city=Oslo&wfs_number=12,34,56
 * will load parcels #12, 34 and 56 of the city of Oslo.
 *
 * It is possible to define several groups of filtering parameters by:
 *
 * - adding a ``wfs_ngroups`` parameter telling how many groups are defined
 * - prefixing all filtering parameters by the number of each group,
 *   starting at 0. For instance ``wfs_0_<layer attribute name>``
 *
 * Example:
 * http://example.com?wfs_layer=parcels&wfs_ngroups=2
 * &wfs_0_city=Oslo&wfs_0_number=12,34,56&wfs_1_city=Paris&wfs_1_number=78,90
 * will load parcels #12, 34 and 56 of the city of Oslo as well as
 * parcels #78 and 90 of the city of Paris.
 *
 * @constructor
 * @struct
 * @param {angular.$http} $http Angular $http service.
 * @param {ngeox.QueryResult} ngeoQueryResult The ngeo query result service.
 * @param {ngeox.WfsPermalinkOptions} ngeoWfsPermalinkOptions The options to
 *     configure the ngeo wfs permalink service with.
 * @ngdoc service
 * @ngname ngeoWfsPermalink
 * @ngInject
 */
ngeo.statemanager.WfsPermalink = function($http, ngeoQueryResult, ngeoWfsPermalinkOptions) {

  const options = ngeoWfsPermalinkOptions;

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

  goog.asserts.assertArray(options.wfsTypes, 'wfsTypes is not correctly set');
  options.wfsTypes.forEach((wfsType) => {
    this.wfsTypes_[wfsType.featureType] = wfsType;
  });

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
   * @type {ngeox.QueryResult}
   * @private
   */
  this.result_ = ngeoQueryResult;
};


/**
 * Clear the results.
 * @export
 */
ngeo.statemanager.WfsPermalink.prototype.clear = function() {
  this.clearResult_();
};


/**
 * Build a WFS GetFeature request for the given query parameter data, send the
 * request and add the received features to {@link ngeox.QueryResult}.
 *
 * @param {ngeox.WfsPermalinkData} queryData Query data for the WFS request.
 * @param {ol.Map} map The ol3 map object to get the current projection from.
 * @export
 */
ngeo.statemanager.WfsPermalink.prototype.issue = function(queryData, map) {
  goog.asserts.assert(this.url_,
    'url is not set. to use the wfs permalink service, ' +
      'set the value `ngeoWfsPermalinkOptions`');
  this.clearResult_();

  const typeName = queryData.wfsType;
  if (!this.wfsTypes_.hasOwnProperty(typeName)) {
    return;
  }
  const wfsType = this.wfsTypes_[typeName];

  const filters = this.createFilters_(queryData.filterGroups);
  if (filters === null) {
    return;
  }

  this.issueRequest_(wfsType, filters, map, queryData.showFeatures);
};


/**
 * @param {ngeox.WfsType} wfsType Type.
 * @param {ol.format.filter.Filter} filter Filter.
 * @param {ol.Map} map The ol3 map object to get the current projection from.
 * @param {boolean} showFeatures Show features or only zoom to feature extent?
 * @private
 */
ngeo.statemanager.WfsPermalink.prototype.issueRequest_ = function(wfsType, filter, map, showFeatures) {
  const wfsFormat = new ol.format.WFS();
  const featureRequestXml = wfsFormat.writeGetFeature({
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

  const featureRequest = new XMLSerializer().serializeToString(featureRequestXml);
  this.$http_.post(this.url_, featureRequest).then((response) => {
    const features = wfsFormat.readFeatures(response.data);
    if (features.length == 0) {
      return;
    }

    // zoom to features
    const size = map.getSize();
    if (size !== undefined) {
      const maxZoom = this.pointRecenterZoom_;
      const padding = [10, 10, 10, 10];
      map.getView().fit(this.getExtent_(features), {size, maxZoom, padding});
    }

    // then show if requested
    if (showFeatures) {
      const resultSource = /** @type {ngeox.QueryResultSource} */ ({
        'features': features,
        'id': wfsType.featureType,
        'identifierAttributeField': wfsType.label,
        'label': wfsType.featureType,
        'pending': false
      });

      this.result_.sources.push(resultSource);
      this.result_.total = features.length;
    }
  });
};


/**
 * @param {Array.<ol.Feature>} features Features.
 * @return {ol.Extent} The extent of all features.
 * @private
 */
ngeo.statemanager.WfsPermalink.prototype.getExtent_ = function(features) {
  return features.reduce((extent, feature) => ol.extent.extend(extent, feature.getGeometry().getExtent()), ol.extent.createEmpty());
};

/**
 * Create OGC filters for the filter groups extracted from the query params.
 *
 * @param {Array.<ngeox.WfsPermalinkFilterGroup>} filterGroups Filter groups.
 * @return {ol.format.filter.Filter} OGC filters.
 * @private
 */
ngeo.statemanager.WfsPermalink.prototype.createFilters_ = function(filterGroups) {
  if (filterGroups.length == 0) {
    return null;
  }
  const f = ol.format.filter;
  const createFiltersForGroup = function(filterGroup) {
    const filters = filterGroup.filters.map((filterDef) => {
      const condition = filterDef.condition;
      if (Array.isArray(condition)) {
        return ngeo.statemanager.WfsPermalink.or_(condition.map(cond => f.equalTo(filterDef.property, cond)));
      } else {
        return f.equalTo(filterDef.property, filterDef.condition);
      }
    });
    return ngeo.statemanager.WfsPermalink.and_(filters);
  };
  return ngeo.statemanager.WfsPermalink.or_(filterGroups.map(createFiltersForGroup));
};


/**
 * Join a list of filters with `and(...)`.
 *
 * @param {Array.<ol.format.filter.Filter>} filters The filters to join.
 * @return {ol.format.filter.Filter} The joined filters.
 * @private
 */
ngeo.statemanager.WfsPermalink.and_ = function(filters) {
  return ngeo.statemanager.WfsPermalink.joinFilters_(filters, ol.format.filter.and);
};


/**
 * Join a list of filters with `or(...)`.
 *
 * @param {Array.<ol.format.filter.Filter>} filters The filters to join.
 * @return {ol.format.filter.Filter} The joined filters.
 * @private
 */
ngeo.statemanager.WfsPermalink.or_ = function(filters) {
  return ngeo.statemanager.WfsPermalink.joinFilters_(filters, ol.format.filter.or);
};


/**
 * Join a list of filters with a given join function.
 *
 * @param {Array.<ol.format.filter.Filter>} filters The filters to join.
 * @param {function(!ol.format.filter.Filter, !ol.format.filter.Filter):
 *    ol.format.filter.Filter} joinFn The function to join two filters.
 * @return {ol.format.filter.Filter} The joined filters.
 * @private
 */
ngeo.statemanager.WfsPermalink.joinFilters_ = function(filters, joinFn) {
  return filters.reduce((combinedFilters, currentFilter) => {
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
ngeo.statemanager.WfsPermalink.prototype.clearResult_ = function() {
  this.result_.total = 0;
  this.result_.sources.forEach((source) => {
    source.features.length = 0;
  }, this);
};


/**
 * @type {!angular.Module}
 */
ngeo.statemanager.WfsPermalink.module = angular.module('ngeoWfsPermalink', [
  // FIXME add dependencies
]);


/**
 * Value that is supposed to be set in applications to enable the WFS
 * permalink functionality.
 */
ngeo.statemanager.WfsPermalink.module.value('ngeoWfsPermalinkOptions',
  /** @type {ngeox.WfsPermalinkOptions} */ ({
    url: '',
    wfsTypes: [],
    defaultFeatureNS: '',
    defaultFeaturePrefix: ''
  })
);


ngeo.statemanager.WfsPermalink.module.service('ngeoWfsPermalink', ngeo.statemanager.WfsPermalink);
ngeo.module.requires.push(ngeo.statemanager.WfsPermalink.module.name);
