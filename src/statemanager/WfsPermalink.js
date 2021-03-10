// The MIT License (MIT)
//
// Copyright (c) 2016-2021 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import angular from 'angular';
import {extend as extendExtent, createEmpty as createEmptyExtent} from 'ol/extent.js';
import Feature from 'ol/Feature.js';
import {equalTo, and, or} from 'ol/format/filter.js';
import olFormatWFS from 'ol/format/WFS.js';

/**
 * @typedef {import('ngeo/query/MapQuerent.js').QueryResult} QueryResult
 */
/**
 * Results for a query source.
 * @typedef {Object} QueryResultSource
 * @property {Feature<import("ol/geom/Geometry.js").default>[]} features The matching features for this source.
 * @property {number|string} id Identifier (can be not unique).
 * @property {string} label Label.
 * @property {number} [limit] The maximum number of features that can be returned for a query with this
 *    source.
 * @property {boolean} pending Is the request for this source still ongoing?
 * @property {boolean} [tooManyResults] If the last query for this source would return more features than the
 *    configured limit.
 * @property {number} [totalFeatureCount] If `tooManyResults` is `true`, this contains the total number of
 *    features.
 * @property {string} [identifierAttributeField] The field to use to identify the feature.
 * @property {string[]} [mergeComposants] The original datasources merged in merged result.
 * @property {string[]} [requestPartners] The datasources of the request (which are summed in totalFeatureCount).
 */

/**
 * @typedef {Object} WfsPermalinkData
 * @property {string} wfsType
 * @property {WfsPermalinkFilterGroup[]} filterGroups
 * @property {boolean} showFeatures
 */

/**
 * @typedef {Object} WfsPermalinkFilter
 * @property {string} property
 * @property {string[]|string} condition
 */

/**
 * @typedef {Object} WfsPermalinkFilterGroup
 * @property {WfsPermalinkFilter[]} filters
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
 * @class
 * @param {angular.IHttpService} $http Angular $http service.
 * @param {import('ngeo/options.js').ngeoPermalinkOgcserverUrl} ngeoPermalinkOgcserverUrl URL to the WFS server
 * @param {QueryResult} ngeoQueryResult The ngeo query result service.
 * @param {import('ngeo/options.js').ngeoWfsPermalinkOptions} ngeoWfsPermalinkOptions The options to
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
   * @type {import('ngeo/options.js').ngeoPermalinkOgcserverUrl}
   */
  this.url_ = ngeoPermalinkOgcserverUrl;

  /**
   * @type {number}
   */
  this.maxFeatures_ = options.maxFeatures !== undefined ? options.maxFeatures : 50;

  /**
   * @type {Object<string, import('ngeo/options.js').WfsType>}
   */
  this.wfsTypes_ = {};

  console.assert(Array.isArray(options.wfsTypes), 'wfsTypes is not correctly set');
  options.wfsTypes.forEach((wfsType) => {
    this.wfsTypes_[wfsType.featureType] = wfsType;
  });

  /**
   * @type {string}
   */
  this.defaultFeatureNS_ = options.defaultFeatureNS;

  /**
   * @type {string}
   */
  this.defaultFeaturePrefix_ = options.defaultFeaturePrefix;

  /**
   * @type {number|undefined}
   */
  this.pointRecenterZoom_ = options.pointRecenterZoom;

  /**
   * @type {angular.IHttpService}
   */
  this.$http_ = $http;

  /**
   * @type {QueryResult}
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
 * @param {import('ngeo/options.js').WfsType} wfsType Type.
 * @param {import("ol/format/filter/Filter.js").default} filter Filter.
 * @param {import("ol/Map.js").default} map The ol3 map object to get the current projection from.
 * @param {boolean} showFeatures Show features or only zoom to feature extent?
 * @param {number} [zoomLevel] The level to zoom on when recentering on features.
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
 * @param {import('ol/Feature.js').FeatureLike[]} features Features.
 * @return {import('ol/extent.js').Extent} The extent of all features.
 */
WfsPermalinkService.prototype.getExtent_ = function (features) {
  return /** @type {import('ol/extent.js').Extent} */ (
    /** @type {any[]} */ (features).reduce((extent, feature) => {
      if (feature instanceof Feature) {
        const geometry = feature.getGeometry();
        if (geometry) {
          return extendExtent(extent, geometry.getExtent());
        }
        return extent;
      }
    }, createEmptyExtent())
  );
};

/**
 * Create OGC filters for the filter groups extracted from the query params.
 *
 * @param {WfsPermalinkFilterGroup[]} filterGroups Filter groups.
 * @return {?import("ol/format/filter/Filter.js").default} OGC filters.
 */
WfsPermalinkService.prototype.createFilters_ = function (filterGroups) {
  if (filterGroups.length == 0) {
    return null;
  }
  /**
   * The function
   * @param {WfsPermalinkFilterGroup} filterGroup The filter
   * @return {import("ol/format/filter/Filter.js").default} The return
   */
  const createFiltersForGroup = function (filterGroup) {
    const filters = filterGroup.filters.map((filterDef) => {
      const condition = filterDef.condition;
      if (Array.isArray(condition)) {
        return WfsPermalinkService.or_(condition.map((cond) => equalTo(filterDef.property, cond)));
      } else {
        return equalTo(filterDef.property, condition);
      }
    });
    return WfsPermalinkService.and_(filters);
  };
  const filters = filterGroups.map(createFiltersForGroup);
  if (filters) {
    return WfsPermalinkService.or_(filters);
  }
  return null;
};

/**
 * Join a list of filters with `and(...)`.
 *
 * @param {import("ol/format/filter/Filter.js").default[]} filters The filters to join.
 * @return {import("ol/format/filter/Filter.js").default} The joined filters.
 */
WfsPermalinkService.and_ = function (filters) {
  return WfsPermalinkService.joinFilters_(filters, and);
};

/**
 * Join a list of filters with `or(...)`.
 *
 * @param {import("ol/format/filter/Filter.js").default[]} filters The filters to join.
 * @return {import("ol/format/filter/Filter.js").default} The joined filters.
 */
WfsPermalinkService.or_ = function (filters) {
  return WfsPermalinkService.joinFilters_(filters, or);
};

/**
 * Join a list of filters with a given join function.
 *
 * @param {import("ol/format/filter/Filter.js").default[]} filters The filters to join.
 * @param {function(import("ol/format/filter/Filter.js").default, import("ol/format/filter/Filter.js").default): import("ol/format/filter/Filter.js").default} joinFn
 *    The function to join two filters.
 * @return {import("ol/format/filter/Filter.js").default} The joined filters.
 */
WfsPermalinkService.joinFilters_ = function (filters, joinFn) {
  return filters.reduce((combinedFilters, currentFilter) => {
    if (combinedFilters === null) {
      return currentFilter;
    } else {
      console.assert(currentFilter !== null);
      return joinFn(combinedFilters, currentFilter);
    }
  });
};

/**
 * Clear every features for all result sources and reset the total counter
 * as well.
 */
WfsPermalinkService.prototype.clearResult_ = function () {
  this.result_.total = 0;
  this.result_.sources.forEach((source) => {
    source.features.length = 0;
  });
};

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('ngeoWfsPermalink', [
  // FIXME add dependencies
]);

myModule.service('ngeoWfsPermalink', WfsPermalinkService);

export default myModule;
