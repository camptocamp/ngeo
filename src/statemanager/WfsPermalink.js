import angular from 'angular';
import * as olExtent from 'ol/extent.js';
import {equalTo, and, or} from 'ol/format/filter.js';
import olFormatWFS from 'ol/format/WFS.js';

/**
 * @typedef {import('ngeo/query/MapQuerent.js').QueryResult} QueryResult
 */
/**
 * Results for a query source.
 * @typedef {Object} QueryResultSource
 * @property {Array.<import("ol/Feature.js").default>} features The matching features for this source.
 * @property {number|string} id Identifier (can be not unique).
 * @property {string} label Label.
 * @property {number} [limit] The maximum number of features that can be returned for a query with this
 *    source.
 * @property {boolean} pending Is the request for this source still ongoing?
 * @property {boolean} [queried] Has this source been queried for the last query request?
 * @property {boolean} [tooManyResults] If the last query for this source would return more features than the
 *    configured limit.
 * @property {number} [totalFeatureCount] If `tooManyResults` is `true`, this contains the total number of
 *    features.
 */

/**
 * A WFS type. To be used with {@link WfsPermalinkOptions}.
 *
 * @typedef {Object} WfsType
 * @property {string} featureType The feature type name. Required.
 * @property {string} [label] The field of a feature used as label.
 * @property {string} [featureNS] The namespace URI used for features. If not given, the default namespace set
 *    in {@link WfsPermalinkOptions} will be used.
 * @property {string} [featurePrefix] The prefix for the feature namespace. If not given, the default prefix
 *    set in {@link WfsPermalinkOptions} will be used.
 * @property {string} [defaultFeatureNS] The default namespace URI used for features. This will be used if no
 *    custom namespace is given for a WFS type.
 * @property {string} [defaultFeaturePrefix] The default prefix for the feature namespace. This will be used
 *    if no custom prefix is given for a WFS type.
 */

/**
 * The options for the WFS query service (permalink).
 *
 * @typedef {Object} WfsPermalinkOptions
 * @property {!Array.<WfsType>} wfsTypes The queryable WFS types.
 * @property {number} [pointRecenterZoom] Zoom level to use when result is a single point feature. If not set
 *    the map is not zoomed to a specific zoom level.
 * @property {number} [maxFeatures=50] The maximum number of records per request the query service should ask.
 * @property {string} defaultFeatureNS
 * @property {string} defaultFeaturePrefix
 */

/**
 * @typedef {Object} WfsPermalinkData
 * @property {string} wfsType
 * @property {Array.<WfsPermalinkFilterGroup>} filterGroups
 * @property {boolean} showFeatures
 */

/**
 * @typedef {Object} WfsPermalinkFilter
 * @property {string} property
 * @property {Array.<string>} condition
 */

/**
 * @typedef {Object} WfsPermalinkFilterGroup
 * @property {Array.<WfsPermalinkFilter>} filters
 */

/**
 * WFS permalink service that can be used to load features with a WFS
 * GetFeature request given query parameters.
 *
 * Resulting features are then highlighted and the map is zoomed to the nearest map extent.
 *
 * Configuration:
 *
 *    ngeoWfsPermalinkOptions:
 *      wfsTypes:
 *        - featureType: <featureType>
 *          label: <attribute used as label>
 *        - ...
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
 * http://example.com?wfs_layer=parcels&wfs_ngroups=2&wfs_0_city=Oslo&wfs_0_number=12,34,56&wfs_1_city=Paris&wfs_1_number=78,90
 * will load parcels #12, 34 and 56 of the city of Oslo as well as
 * parcels #78 and 90 of the city of Paris.
 *
 * @constructor
 * @param {angular.IHttpService} $http Angular $http service.
 * @param {string} ngeoPermalinkOgcserverUrl Url to the WFS server
 * @param {QueryResult} ngeoQueryResult The ngeo query result service.
 * @param {WfsPermalinkOptions} ngeoWfsPermalinkOptions The options to
 *     configure the ngeo wfs permalink service with.
 * @ngdoc service
 * @ngname ngeoWfsPermalink
 * @ngInject
 */
export function WfsPermalinkService(
  $http,
  ngeoPermalinkOgcserverUrl,
  ngeoQueryResult,
  ngeoWfsPermalinkOptions
) {
  const options = ngeoWfsPermalinkOptions;

  /**
   * @type {string}
   * @private
   */
  this.url_ = ngeoPermalinkOgcserverUrl;

  /**
   * @type {number}
   * @private
   */
  this.maxFeatures_ = options.maxFeatures !== undefined ? options.maxFeatures : 50;

  /**
   * @type {Object<string, WfsType>}
   * @private
   */
  this.wfsTypes_ = {};

  console.assert(Array.isArray(options.wfsTypes), 'wfsTypes is not correctly set');
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
   * @type {angular.IHttpService}
   * @private
   */
  this.$http_ = $http;

  /**
   * @type {QueryResult}
   * @private
   */
  this.result_ = ngeoQueryResult;
}

/**
 * Clear the results.
 */
WfsPermalinkService.prototype.clear = function () {
  this.clearResult_();
};

/**
 * Build a WFS GetFeature request for the given query parameter data, send the
 * request and add the received features to {@link QueryResult}.
 *
 * @param {WfsPermalinkData} queryData Query data for the WFS request.
 * @param {import("ol/Map.js").default} map The ol3 map object to get the current projection from.
 * @param {number} [zoomLevel] The level to zoom on when recentering on features.
 */
WfsPermalinkService.prototype.issue = function (queryData, map, zoomLevel = undefined) {
  console.assert(
    this.url_,
    'url is not set. to use the wfs permalink service, ' + 'set the value `ngeoWfsPermalinkOptions`'
  );
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

  this.issueRequest_(wfsType, filters, map, queryData.showFeatures, zoomLevel);
};

/**
 * @param {WfsType} wfsType Type.
 * @param {import("ol/format/filter/Filter.js").default} filter Filter.
 * @param {import("ol/Map.js").default} map The ol3 map object to get the current projection from.
 * @param {boolean} showFeatures Show features or only zoom to feature extent?
 * @param {number} [zoomLevel] The level to zoom on when recentering on features.
 * @private
 */
WfsPermalinkService.prototype.issueRequest_ = function (
  wfsType,
  filter,
  map,
  showFeatures,
  zoomLevel = undefined
) {
  const wfsFormat = new olFormatWFS();
  const featureRequestXml = wfsFormat.writeGetFeature({
    srsName: map.getView().getProjection().getCode(),
    featureNS: wfsType.featureNS !== undefined ? wfsType.featureNS : this.defaultFeatureNS_,
    featurePrefix: wfsType.featurePrefix !== undefined ? wfsType.featurePrefix : this.defaultFeaturePrefix_,
    featureTypes: [wfsType.featureType],
    outputFormat: 'GML3',
    filter: filter,
    maxFeatures: this.maxFeatures_,
  });

  const featureRequest = new XMLSerializer().serializeToString(featureRequestXml);
  const config = {
    headers: {'Content-Type': 'text/xml; charset=UTF-8'},
  };
  this.$http_.post(this.url_, featureRequest, config).then((response) => {
    const features = wfsFormat.readFeatures(response.data);
    if (features.length == 0) {
      return;
    }

    // zoom to features
    const size = map.getSize();
    if (size !== undefined) {
      const maxZoom = zoomLevel === undefined ? this.pointRecenterZoom_ : zoomLevel;
      const padding = [10, 10, 10, 10];
      map.getView().fit(this.getExtent_(features), {size, maxZoom, padding});
    }

    // then show if requested
    if (showFeatures) {
      const resultSource = /** @type {QueryResultSource} */ ({
        'features': features,
        'id': wfsType.featureType,
        'identifierAttributeField': wfsType.label,
        'label': wfsType.featureType,
        'pending': false,
      });

      this.result_.sources.push(resultSource);
      this.result_.total = features.length;
    }
  });
};

/**
 * @param {Array.<import("ol/Feature.js").default>} features Features.
 * @return {import("ol/extent.js").Extent} The extent of all features.
 * @private
 */
WfsPermalinkService.prototype.getExtent_ = function (features) {
  return features.reduce(
    (extent, feature) => olExtent.extend(extent, feature.getGeometry().getExtent()),
    olExtent.createEmpty()
  );
};

/**
 * Create OGC filters for the filter groups extracted from the query params.
 *
 * @param {Array.<WfsPermalinkFilterGroup>} filterGroups Filter groups.
 * @return {import("ol/format/filter/Filter.js").default} OGC filters.
 * @private
 */
WfsPermalinkService.prototype.createFilters_ = function (filterGroups) {
  if (filterGroups.length == 0) {
    return null;
  }
  const createFiltersForGroup = function (filterGroup) {
    const filters = filterGroup.filters.map((filterDef) => {
      const condition = filterDef.condition;
      if (Array.isArray(condition)) {
        return WfsPermalinkService.or_(condition.map((cond) => equalTo(filterDef.property, cond)));
      } else {
        return equalTo(filterDef.property, filterDef.condition);
      }
    });
    return WfsPermalinkService.and_(filters);
  };
  return WfsPermalinkService.or_(filterGroups.map(createFiltersForGroup));
};

/**
 * Join a list of filters with `and(...)`.
 *
 * @param {Array.<import("ol/format/filter/Filter.js").default>} filters The filters to join.
 * @return {import("ol/format/filter/Filter.js").default} The joined filters.
 * @private
 */
WfsPermalinkService.and_ = function (filters) {
  return WfsPermalinkService.joinFilters_(filters, and);
};

/**
 * Join a list of filters with `or(...)`.
 *
 * @param {Array.<import("ol/format/filter/Filter.js").default>} filters The filters to join.
 * @return {import("ol/format/filter/Filter.js").default} The joined filters.
 * @private
 */
WfsPermalinkService.or_ = function (filters) {
  return WfsPermalinkService.joinFilters_(filters, or);
};

/**
 * Join a list of filters with a given join function.
 *
 * @param {Array.<import("ol/format/filter/Filter.js").default>} filters The filters to join.
 * @param {function(!import("ol/format/filter/Filter.js").default, !import("ol/format/filter/Filter.js").default): import("ol/format/filter/Filter.js").default} joinFn
 *    The function to join two filters.
 * @return {import("ol/format/filter/Filter.js").default} The joined filters.
 * @private
 */
WfsPermalinkService.joinFilters_ = function (filters, joinFn) {
  return filters.reduce((combinedFilters, currentFilter) => {
    if (combinedFilters === null) {
      return currentFilter;
    } else {
      console.assert(currentFilter !== null);
      return joinFn(combinedFilters, currentFilter);
    }
  }, null);
};

/**
 * Clear every features for all result sources and reset the total counter
 * as well.
 * @private
 */
WfsPermalinkService.prototype.clearResult_ = function () {
  this.result_.total = 0;
  this.result_.sources.forEach((source) => {
    source.features.length = 0;
  });
};

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoWfsPermalink', [
  // FIXME add dependencies
]);

/**
 * Set this value to enable WFS permalink.
 */
module.value('ngeoPermalinkOgcserverUrl', '');

/**
 * Value that is supposed to be set in applications to enable the WFS
 * permalink functionality.
 */
module.value(
  'ngeoWfsPermalinkOptions',
  /** @type {WfsPermalinkOptions} */ ({
    url: '',
    wfsTypes: [],
    defaultFeatureNS: '',
    defaultFeaturePrefix: '',
  })
);

module.service('ngeoWfsPermalink', WfsPermalinkService);

export default module;
