// The MIT License (MIT)
//
// Copyright (c) 2017-2021 Camptocamp SA
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
import ngeoDatasourceOGC from 'ngeo/datasource/OGC.js';
import ngeoFilterRuleHelper from 'ngeo/filter/RuleHelper.js';
import ngeoMiscWMSTime from 'ngeo/misc/WMSTime.js';
import * as olFormatFilter from 'ol/format/filter.js';
import olFormatWFS from 'ol/format/WFS.js';
import ngeoWFSDescribeFeatureType from 'ngeo/WFSDescribeFeatureType.js';
import olFormatWMSCapabilities from 'ol/format/WMSCapabilities.js';
import olFormatWMTSCapabilities from 'ol/format/WMTSCapabilities.js';
import {appendParams as olUriAppendParams} from 'ol/uri.js';
import * as olExtent from 'ol/extent.js';
import olSourceImageWMS from 'ol/source/ImageWMS.js';

/**
 * A hash that contains 2 lists of queryable data sources: `wfs` and `wms`.
 * The same data source can only be in one of the two lists. The `wfs` list
 * has priority, i.e. if the data source supports WFS, it's put in the
 * `wfs` list.
 *
 * @typedef {Object} QueryableDataSources
 * @property {ngeoDatasourceOGC[]} wms List of queryable data sources that support WMS.
 * @property {ngeoDatasourceOGC[]} wfs List of queryable data sources that support WFS.
 */

/**
 * @typedef {Object} QuerentResultItem
 * @property {import('ol/Feature.js').default<import("ol/geom/Geometry.js").default>[]} features
 * @property {number} limit
 * @property {boolean} [tooManyFeatures]
 * @property {number} [totalFeatureCount]
 * @property {string []} [requestPartners] All datasources requested in the same request
 */

/**
 * Hash of features by data source ids.
 * @typedef {Object<number, QuerentResultItem>} QuerentResult
 */

/**
 * The options to use when sending GetFeature/GetFeatureInfo requests using
 * the querent or map query service.
 *
 * @typedef {Object} IssueGetFeaturesOptions
 * @property {string} [action='replace'] The action the MapQuerent should take regarding the queried
 *    features. Possible values are:
 *
 *    - `replace`: newly queried features are used as result
 *    - `add`:     newly queried features are added to the existing ones
 *    - `remove`:  newly queried features are removed from the existing ones
 * @property {import("ol/coordinate.js").Coordinate} [coordinate] The coordinate to issue the requests with,
 *    which can end up with either WMS or WFS requests.
 * @property {import('ngeo/datasource/DataSource.js').default[]} [dataSources] list of data sources to
 *    query. Only those that meet the requirements will actually be queried. The querent service requires
 *    either the `dataSources` or `queryableDataSources` property to be set.
 * @property {import("ol/extent.js").Extent} [extent] The extent to issue the requests with, which can end up
 *    with WFS requests only.
 * @property {import("ol/format/filter/Filter.js").default} [filter] A filter to additionally use with the
 *    query. Only used by WFS requests.
 *    If a filter is defined, then it is used instead of the data source's filter rules.
 * @property {import("ol/geom/Geometry.js").default} [geometry] The geometry to use as filter for the
 *    requests, which can end up with WFS requests only.
 * @property {number} [limit] The maximum number of features to get per request.
 * @property {import("ol/Map.js").default} map The ol3 map object. Used to fill some parameters of the
 *    queries, such as 'srs' and filter the queryable layers within the data sources.
 * @property {QueryableDataSources} [queryableDataSources] A hash of queryable data sources, which must meet
 *    all requirements. The querent service requires either the `dataSources` or `queryableDataSources`
 *    property to be set.
 * @property {number} [tolerance] A minimal buffer value in pixels to ensure a minimal bbox around a
 *    coordinate to issue WFS requests.
 * @property {boolean} [bboxAsGETParam=false] Pass the queried bbox as a parameter of the GET query on WFS
 *    requests.
 */

/**
 * @hidden
 */
export class Querent {
  /**
   * The ngeo Querent is a service that issues all sorts of queries using
   * ngeo data sources. It does not store the result. Instead, it returns it
   * using promises. Any component that inject this service can use it to
   * make it issue its own queries and do whatever it wants with the result.
   *
   * It supports sending OGC requests and parse the response, such as:
   * - WFS DescribeFeatureType
   * - WFS GetFeature
   * - WMS GetCapabilites
   * - WMS GetFeatureInfo
   * - WMTS GetCapabilities
   *
   * @param {angular.IHttpService} $http Angular $http service.
   * @param {angular.IQService} $q The Angular $q service.
   * @param {import("ngeo/filter/RuleHelper.js").RuleHelper} ngeoRuleHelper Ngeo rule helper service.
   * @param {import("ngeo/misc/WMSTime.js").WMSTime} ngeoWMSTime wms time service.
   * @ngdoc service
   * @ngname ngeoQuerent
   * @ngInject
   */
  constructor($http, $q, ngeoRuleHelper, ngeoWMSTime) {
    // === Injected properties ===

    /**
     * @type {angular.IHttpService}
     * @private
     */
    this.http_ = $http;

    /**
     * @type {angular.IQService}
     * @private
     */
    this.q_ = $q;

    /**
     * @type {import("ngeo/filter/RuleHelper.js").RuleHelper}
     * @private
     */
    this.ngeoRuleHelper_ = ngeoRuleHelper;

    /**
     * @type {import("ngeo/misc/WMSTime.js").WMSTime}
     * @private
     */
    this.ngeoWMSTime_ = ngeoWMSTime;

    // === Other properties ===

    /**
     * Promises that can be resolved to cancel started requests.
     * @type {angular.IDeferred<Document | Element | string>[]}
     * @private
     */
    this.requestCancelers_ = [];

    /**
     * Cache of promises for WMS GetCapabilities requests. They key is the
     * online resource base url that is used to do the query.
     * @type {Object<string, angular.IPromise<Document|Element|string>>}
     * @private
     */
    this.wmsGetCapabilitiesPromises_ = {};

    /**
     * Cache of promises for WMST GetCapabilities requests. They key is the
     * url that is used to do the query.
     * @type {Object<string, angular.IPromise<Document|Element|string>>}
     * @private
     */
    this.wmtsGetCapabilitiesPromises_ = {};
  }

  // === PUBLIC methods ===

  /**
   * Issue WMS GetFeatureInfo and/or WFS GetFeature requests using the given
   * data sources, map and optional filters.
   *
   * @param {IssueGetFeaturesOptions} options Options.
   * @return {angular.IPromise<QuerentResult>} Promise.
   */
  issue(options) {
    const promises = [];
    const map = options.map;

    // (1) Cancel requests that are still running
    this.cancelStillRunningRequests_();

    // (2) Get queryable data sources
    /** @type {QueryableDataSources} */
    let queryableDataSources;
    if (options.queryableDataSources) {
      queryableDataSources = options.queryableDataSources;
    } else {
      const dataSources = options.dataSources;
      console.assert(dataSources, 'DataSources should be set');
      queryableDataSources = this.getQueryableDataSources(dataSources, map);
    }

    // (3) Combine data sources that support WFS and issue WFS queries.
    //     The 'bbox' ('extent' option) is not required for WFS requests to
    //     be issued.
    const combinedWFSDataSources = this.getCombinableWFSDataSources_(queryableDataSources.wfs);
    promises.push(this.issueCombinedWFS_(combinedWFSDataSources, options));

    // (4) Combine data sources that support WMS and issue WMS queries.
    //     Only occurs if the `coordinate` option is set, because it's required
    //     by WMS GetFeatureInfo requests.
    const coordinate = options.coordinate;
    if (coordinate) {
      const combinedWMSDataSources = this.getCombinableWMSDataSources_(queryableDataSources.wms);
      promises.push(this.issueCombinedWMS_(combinedWMSDataSources, options));
    }

    return this.q_.all(promises).then(handleCombinedQueryResult_);
  }

  /**
   * Browse a given list of data sources. Return 2 lists of data sources that
   * are queryable, the first one being those that support WFS and the other
   * WMS only. This means that WFS is always favored first, then WMS.
   *
   * The map view resolution determines if the inner ogc layers are in range.
   *
   * @param {import('ngeo/datasource/DataSource.js').default[]} dataSources Data sources
   * @param {import("ol/Map.js").default} map Map.
   * @return {QueryableDataSources} Queryable data sources.
   */
  getQueryableDataSources(dataSources, map) {
    const queryableDataSources = {
      wfs: /** @type {ngeoDatasourceOGC[]} */ ([]),
      wms: /** @type {ngeoDatasourceOGC[]} */ ([]),
    };
    const resolution = map.getView().getResolution();
    if (resolution === undefined) {
      throw new Error('Missing resolution');
    }

    for (const dataSource of dataSources) {
      // (1) Skip data source that can't be queried
      if (!this.isDataSourceQueryable_(dataSource, resolution)) {
        continue;
      }

      if (dataSource instanceof ngeoDatasourceOGC) {
        // (2) Split data sources
        if (dataSource.supportsWFS) {
          queryableDataSources.wfs.push(dataSource);
        } else {
          queryableDataSources.wms.push(dataSource);
        }
      }
    }
    return queryableDataSources;
  }

  /**
   * @param {ngeoDatasourceOGC} dataSource Data source.
   * @return {angular.IPromise<Document|Element|string>} Promise.
   */
  wfsDescribeFeatureType(dataSource) {
    if (!dataSource.supportsAttributes) {
      throw `The data source must support WFS, have a single OGCLayer that
      is queryable in order to issue WFS DescribeFeatureType requests`;
    }
    if (!dataSource.wfsUrl) {
      throw new Error('Missing WFS URL');
    }

    const wfsLayerNames = dataSource.getWFSLayerNames();

    const url = olUriAppendParams(dataSource.wfsUrl, {
      'REQUEST': 'DescribeFeatureType',
      'SERVICE': 'WFS',
      'VERSION': '2.0.0',
      'TYPENAME': wfsLayerNames,
    });

    return this.http_.get(url).then((response) => {
      const format = new ngeoWFSDescribeFeatureType();
      return format.read(response.data);
    });
  }

  /**
   * @param {Object<string, *>[]} layerCapabilities List of WMS layer capabilities
   * @param {string} layerName Name of the WMS layer
   * @return {?Object<string, *>} Found WMS layer capability
   */
  wmsFindLayerCapability(layerCapabilities, layerName) {
    let found = null;

    for (const layerCapability of layerCapabilities) {
      if (layerCapability.Name === layerName) {
        found = layerCapability;
        break;
      } else if (layerCapability.Layer) {
        found = this.wmsFindLayerCapability(layerCapability.Layer, layerName);
        if (found) {
          break;
        }
      }
    }

    return found;
  }

  /**
   * @param {string} baseUrl Base url of the WMS server.
   * @param {boolean} [opt_cache] Whether to use the cached capability, if
   *     available. Enabling this will also store the capability when required
   *     for the first time. Defaults to: `true`.
   * @return {angular.IPromise<void>} Promise.
   */
  wmsGetCapabilities(baseUrl, opt_cache) {
    const cache = opt_cache !== false;

    const params = {
      'REQUEST': 'GetCapabilities',
      'SERVICE': 'WMS',
      'VERSION': '1.3.0',
    };

    const url = olUriAppendParams(baseUrl, params);
    let promise;

    if (!cache || !this.wmsGetCapabilitiesPromises_[baseUrl]) {
      promise = this.http_.get(url).then((response) => {
        const format = new olFormatWMSCapabilities();
        return format.read(response.data);
      });
    } else if (cache && this.wmsGetCapabilitiesPromises_[baseUrl]) {
      promise = this.wmsGetCapabilitiesPromises_[baseUrl];
    }

    if (!promise) {
      throw new Error('Missing promise');
    }

    if (cache && !this.wmsGetCapabilitiesPromises_[baseUrl]) {
      this.wmsGetCapabilitiesPromises_[baseUrl] = promise;
    }

    return promise;
  }

  /**
   * @param {Object<string, *>[]} layerCapabilities List of WMTS layer capabilities
   * @param {string} layerName Name of the WMTS layer, a.k.a. the identifier.
   * @return {?Object<string, *>} Found WTMS layer capability
   */
  wmtsFindLayerCapability(layerCapabilities, layerName) {
    let found = null;
    for (const layerCapability of layerCapabilities) {
      if (layerCapability.Identifier === layerName) {
        found = layerCapability;
        break;
      }
    }
    return found;
  }

  /**
   * @param {string} url URL of the WMTS server. Note that it must contain
   *     all required arguments.
   * @param {boolean} [opt_cache] Whether to use the cached capability, if
   *     available. Enabling this will also store the capability when required
   *     for the first time. Defaults to: `true`.
   * @return {angular.IPromise<void>} Promise.
   */
  wmtsGetCapabilities(url, opt_cache) {
    const cache = opt_cache !== false;
    let promise;

    if (!cache || !this.wmtsGetCapabilitiesPromises_[url]) {
      promise = this.http_.get(url).then((response) => {
        const format = new olFormatWMTSCapabilities();
        return format.read(response.data);
      });
    } else if (cache && this.wmtsGetCapabilitiesPromises_[url]) {
      promise = this.wmtsGetCapabilitiesPromises_[url];
    }

    if (!promise) {
      throw new Error('Missing promise');
    }

    if (cache && !this.wmtsGetCapabilitiesPromises_[url]) {
      this.wmtsGetCapabilitiesPromises_[url] = promise;
    }

    return promise;
  }

  // === PRIVATE methods ===

  /**
   * Handles the result of a single WFS GetFeature
   * request. Read features from the response and return them.
   *
   * @param {ngeoDatasourceOGC[]} dataSources List of
   *     queryable data sources that were used to do the query.
   * @param {number} maxFeatures The maximum number of features to get with the query.
   * @param {number} totalFeatureCount Count of features of the query.
   * @param {boolean} wfs Whether the query was WFS or WMS.
   * @param {angular.IHttpResponse<Document|Element|string>} response Response.
   * @return {QuerentResult} Hash of features by data source ids.
   * @private
   */
  handleWFSQueryResult_(dataSources, maxFeatures, totalFeatureCount, wfs, response) {
    /** @type {QuerentResult} */
    const hash = {};
    // For combination of layers the service gives some less than the maxFeatures allowed, so recompute the effective obtained number
    let formatWFS = new olFormatWFS();
    if (dataSources.length > 0 && dataSources[0].wfsOutputFormat === 'GML2') {
      formatWFS = new olFormatWFS({'version': '1.0.0'});
    }

    const limit = formatWFS.readFeatures(response.data).length;
    const tooManyFeatures = totalFeatureCount > limit;
    /** @type {string[]} */
    const datasourceNames = [];
    for (const dataSource of dataSources) {
      const dataSourceId = dataSource.id;
      datasourceNames.push(dataSource.name);
      /** @type {import('ol/Feature.js').default<import("ol/geom/Geometry.js").default>[]} */
      const features =
        dataSource instanceof ngeoDatasourceOGC
          ? this.readAndTypeFeatures_(dataSource, response.data, wfs)
          : [];
      this.setUniqueIds_(features, dataSource.id);
      hash[dataSourceId] = {
        features,
        limit,
        tooManyFeatures,
        totalFeatureCount,
      };
    }
    Object.values(hash).forEach(function (value, index) {
      value.limit = limit;
      value.tooManyFeatures = tooManyFeatures;
      value.requestPartners = datasourceNames;
    });

    return hash;
  }

  /**
   * Handles the result of a single WMS GetFeatureInfo or WFS GetFeature
   * request. Read features from the response and return them.
   *
   * @param {ngeoDatasourceOGC[]} dataSources List of
   *     queryable data sources that were used to do the query.
   * @param {number} limit The maximum number of features to get with the query.
   * @param {boolean} wfs Whether the query was WFS or WMS.
   * @param {angular.IHttpResponse<Document|Element|string>|number} response Response.
   * @return {QuerentResult} Hash of features by data source ids.
   * @private
   */
  handleQueryResult_(dataSources, limit, wfs, response) {
    /** @type {QuerentResult} */
    const hash = {};

    for (const dataSource of dataSources) {
      const dataSourceId = dataSource.id;

      if (typeof response === 'number') {
        /** @type {import('ol/Feature.js').default<import("ol/geom/Geometry.js").default>[]} */
        const features = [];
        const tooManyFeatures = true;
        const totalFeatureCount = response;
        this.setUniqueIds_(features, dataSource.id);
        hash[dataSourceId] = {
          features,
          limit,
          tooManyFeatures,
          totalFeatureCount,
        };
      } else {
        const features =
          dataSource instanceof ngeoDatasourceOGC
            ? this.readAndTypeFeatures_(dataSource, response.data, wfs)
            : [];
        this.setUniqueIds_(features, dataSource.id);
        hash[dataSourceId] = {
          features,
          limit,
        };
      }
    }

    return hash;
  }

  /**
   * Read and assign the type of the feature to each feature in the data.
   * The type will be stocked in the properties of the features as
   * "ngeo_feature_type_".
   * @param {ngeoDatasourceOGC} dataSource used to read the features.
   * @param {Document|Element|string} data the response data.
   * @param {boolean} wfs Whether the query was WFS or WMS.
   * @return {import('ol/Feature.js').default<import('ol/geom/Geometry.js').default>[]} returned features with a type in each features.
   * @private
   */
  readAndTypeFeatures_(dataSource, data, wfs) {
    /** @type {import('ol/Feature.js').default<import('ol/geom/Geometry.js').default>[]} */
    const features = [];
    /** @type {import('ol/Feature.js').default<import('ol/geom/Geometry.js').default>[]} */
    let readFeatures;
    // Copy the types to be able to set it AND iterate on it.
    const featureTypes = this.getSetOlFormatTypes_(dataSource, wfs).slice();
    featureTypes.forEach((type) => {
      // Assign temporarily a single feature type to read features separately.
      this.getSetOlFormatTypes_(dataSource, wfs, [type]);
      if (wfs) {
        if (!dataSource.wfsFormat) {
          throw new Error('Missing wfsFormat');
        }
        readFeatures =
          /** @type {import('ol/Feature.js').default<import('ol/geom/Geometry.js').default>[]} */ (
            dataSource.wfsFormat.readFeatures(data)
          );
      } else {
        if (!dataSource.wmsFormat) {
          throw new Error('Missing wmsFormat');
        }
        readFeatures =
          /** @type {import('ol/Feature.js').default<import('ol/geom/Geometry.js').default>[]} */ (
            dataSource.wmsFormat.readFeatures(data)
          );
      }
      if (readFeatures.length > 0) {
        readFeatures.forEach((feature) => {
          feature.set('ngeo_feature_type_', type);
          features.push(feature);
        });
      }
    });
    // Re-set the value to the datasource.xxxFormat to be able to re-use
    // it later (in another query);
    this.getSetOlFormatTypes_(dataSource, wfs, featureTypes);
    return features;
  }

  /**
   * Return the types defined in the format of the datasource. Can set the
   * types if one is given.
   * @param {ngeoDatasourceOGC} dataSource that contains the format object.
   * @param {boolean} wfs Whether the query was WFS or WMS.
   * @param {string[]} [opt_types] An array of type if you want to set the
   *     type of the format object.
   * @return {string[]} The types defined in the format.
   * @private
   */
  getSetOlFormatTypes_(dataSource, wfs, opt_types) {
    let types;
    if (wfs) {
      if (!dataSource.wfsFormat) {
        throw new Error('Missing wfsFormat');
      }
      if (opt_types) {
        dataSource.wfsFormat.setFeatureType(opt_types);
      }
      types = dataSource.wfsFormat.getFeatureType();
    } else {
      if (!dataSource.wmsFormat) {
        throw new Error('Missing wmsFormat');
      }
      if (opt_types) {
        dataSource.wmsFormat.setLayers(opt_types);
      }
      types = dataSource.wmsFormat.getLayers();
    }
    if (!types) {
      return [];
    }
    return Array.isArray(types) ? types : [types];
  }

  /**
   * Issue WFS GetFeature requests using the given combined data sources, map
   * and optional filters.
   *
   * @param {CombinedDataSources} combinedDataSources Combined data sources.
   * @param {IssueGetFeaturesOptions} options Options.
   * @return {angular.IPromise<QuerentResult>} Promise.
   * @private
   */
  issueCombinedWFS_(combinedDataSources, options) {
    /** @type {angular.IPromise<QuerentResult>[]} */
    const promises = [];

    // The 'limit' option is mandatory in the querent service
    const maxFeatures = options.limit;

    const map = options.map;
    const view = map.getView();
    const resolution = view.getResolution();
    const projection = view.getProjection();
    const srsName = projection.getCode();

    if (resolution === undefined) {
      throw new Error('Missing resolution');
    }

    // (1) Extent (bbox), which is optional, i.e. its value can stay undefined
    /** @type {import("ol/extent.js").Extent} */
    let bbox;
    const coordinate = options.coordinate;
    if (coordinate) {
      const tolerance = options.tolerance;
      console.assert(tolerance);
      bbox = olExtent.buffer(olExtent.createOrUpdateFromCoordinate(coordinate), tolerance * resolution);
    } else {
      bbox = options.extent;
    }

    // (2) Launch one request per combinaison of data sources
    const wfsFormat = new olFormatWFS();
    const xmlSerializer = new XMLSerializer();
    let hasAtLeastOneQueryIconPosition = false;
    for (const dataSources of combinedDataSources) {
      /** @type {?import('ol/format/WFS.js').WriteGetFeatureOptions} */
      let getFeatureCommonOptions = null;
      /** @type {string[]} */
      let featureTypesNames = [];
      /** @type {import('ol/format/WFS.js').FeatureType[]} */
      const featureTypesObjects = [];
      /** @type {?string} */
      let url = null;
      /** @type {Object<string, string>} */
      const params = {};

      if (options.bboxAsGETParam && bbox) {
        params.bbox = bbox.join(',');
      }

      // (3) Build query options
      for (const dataSource of dataSources) {
        const currentFeatureTypesNames = dataSource.getInRangeWFSLayerNames(resolution, true);
        const geometryName = dataSource.geometryName(currentFeatureTypesNames[0]);

        // (a) Create common options, if not done yet
        if (!getFeatureCommonOptions) {
          const featureNS = dataSource.wfsFeatureNS;
          const featurePrefix = dataSource.wfsFeaturePrefix;
          const outputFormat = dataSource.wfsOutputFormat;
          if (!geometryName) {
            throw new Error('Missing geometryName');
          }

          getFeatureCommonOptions = {
            bbox,
            featureNS,
            featurePrefix,
            geometryName,
            outputFormat,
            srsName,
            featureTypes: [],
          };

          url = dataSource.wfsUrl;

          // All data sources combined share the same active dimensions
          Object.assign(params, dataSource.activeDimensions);
        }

        // (b) Add queryable layer names in featureTypesNames array
        featureTypesNames = featureTypesNames.concat(currentFeatureTypesNames);

        // (c) Add filter, if any. If the case, then only one data source
        //     is expected to be used for this request.
        let filter = null;
        if (options.filter) {
          filter = this.ngeoRuleHelper_.createFilter({
            dataSource: dataSource,
            filter: options.filter,
            incDimensions: true,
            incTime: true,
          });
        } else if (
          (dataSource.filterRules && dataSource.filterRules.length) ||
          dataSource.timeRangeValue ||
          (dataSource.dimensionsFiltersConfig && Object.keys(dataSource.dimensionsFiltersConfig).length > 0)
        ) {
          console.assert(
            dataSources.length === 1 ||
              !(dataSource.timeRangeValue || (dataSource.filterRules && dataSource.filterRules.length)),
            `A data source having filterRules or timeRangeValue should issue
            a single query, alone.`
          );

          filter = this.ngeoRuleHelper_.createFilter({
            dataSource: dataSource,
            incDimensions: true,
            incTime: true,
            srsName: srsName,
          });
        }

        // (d) If a 'geometry' is set in the query options, then
        // create and add a spatial filter it to the existing filter
        // as well.
        if (options.geometry) {
          const spatialFilter = olFormatFilter.intersects(geometryName, options.geometry, srsName);
          filter = this.ngeoRuleHelper_.joinFilters(filter, spatialFilter);
        }

        if (filter) {
          getFeatureCommonOptions.filter = filter;
        }

        // (e) For coordinate (click) query, and if at least one dataSource has a
        // queryIconPosition, define featureTypes as Object to use a custom bbox per layer.
        if (coordinate) {
          /** @type {import("ol/extent.js").Extent} */
          let queryIconPosition;
          if (dataSource.queryIconPosition) {
            hasAtLeastOneQueryIconPosition = true;
            queryIconPosition = this.makeBboxWithQueryIconPosition_(
              dataSource.queryIconPosition,
              resolution,
              coordinate
            );
            console.assert(queryIconPosition !== null, 'Bad queryIconPosition values');
            // Be sure it respects a minimal bbox.
            queryIconPosition = olExtent.extend(queryIconPosition, bbox);
          }
          currentFeatureTypesNames.forEach((name) => {
            featureTypesObjects.push({
              geometryName,
              name,
              bbox: queryIconPosition || bbox,
            });
          });
        }
      } //for each datasource

      if (!getFeatureCommonOptions) {
        throw new Error('Missing getFeatureCommonOptions');
      }

      if (hasAtLeastOneQueryIconPosition) {
        getFeatureCommonOptions.featureTypes = featureTypesObjects;
        // If featureTypes is set with FeatureType objects then bbox and geometryName is
        // not used. Delete them for clarity.
        delete getFeatureCommonOptions.bbox;
        delete getFeatureCommonOptions.geometryName;
      } else {
        // If there is no queryIconPosition, use a simple array of names and a common geom.
        getFeatureCommonOptions.featureTypes = featureTypesNames;
      }

      if (!url) {
        throw new Error('Missing url');
      }

      // (4) Build query then launch
      //
      //     If we require to do a WFS GetFeature request with
      //     `resultType: 'hits'` first, do so. In that case, if there would
      //     be too many features returned, no GetFeature is done thereafter
      //     and the data sources will return empty arrays in the returned
      //     response.
      //
      //     If we do not need to count features first, then proceed with
      //     an normal WFS GetFeature request.

      // (4.1) Count, if required
      /** @type {angular.IPromise<number|void>} */
      /** @type {import('ol/format/WFS.js').WriteGetFeatureOptions} */
      const getCountOptions = Object.assign(
        {
          resultType: 'hits',
        },
        getFeatureCommonOptions
      );
      const featureCountXml = wfsFormat.writeGetFeature(getCountOptions);
      const featureCountRequest = xmlSerializer.serializeToString(featureCountXml);
      const canceler = this.registerCanceler_();
      /** @type {angular.IPromise<QuerentResult>} */
      const countPromise = new Promise((resolve, reject) => {
        this.http_
          .post(url, featureCountRequest, {
            params: params,
            headers: {'Content-Type': 'text/xml; charset=UTF-8'},
            timeout: canceler.promise,
          })
          .then((response) => {
            if (!dataSources[0].wfsFormat) {
              throw new Error('Missing wfsFormat');
            }

            const metadata = dataSources[0].wfsFormat.readFeatureCollectionMetadata(response.data);
            if (!metadata) {
              throw new Error('Missing metadata');
            }
            const numberOfFeatures = metadata.numberOfFeatures;
            const getFeatureOptions = Object.assign(
              {
                maxFeatures,
              },
              getFeatureCommonOptions
            );
            const featureRequestXml = wfsFormat.writeGetFeature(getFeatureOptions);
            const featureRequest = xmlSerializer.serializeToString(featureRequestXml);
            if (typeof url !== 'string') {
              throw new Error('Wrong URL type');
            }
            const canceler = this.registerCanceler_();
            this.http_
              .post(url, featureRequest, {
                params: params,
                headers: {'Content-Type': 'text/xml; charset=UTF-8'},
                timeout: canceler.promise,
              })
              .then((response) => {
                const results = this.handleWFSQueryResult_(
                  dataSources,
                  maxFeatures,
                  numberOfFeatures,
                  true,
                  response
                );
                resolve(results);
              });
          });
      });
      promises.push(countPromise);
    }
    return Promise.all(promises).then(handleCombinedQueryResult_);
  }

  /**
   * Create and add a buffer around the given coordinate.
   * The buffer is built with the flipped (horizontally and vertically) values of the queryIconPosition.
   * @param {!number[]} queryIconPosition The values in px to buffer the bbox (1 to 4 values, css system).
   * @param {!number} resolution The map view resolution to define the px size correctly.
   * @param {!import("ol/coordinate.js").Coordinate} coordinate The bbox to buffer.
   * @return {!import("ol/extent.js").Extent} The new bbox or null if the queryIconPosition param
   * is not valid.
   * @private
   */
  makeBboxWithQueryIconPosition_(queryIconPosition, resolution, coordinate) {
    const bbox = olExtent.createOrUpdateFromCoordinate(coordinate);
    const buffers = queryIconPosition.map((value) => value * resolution);
    const length = buffers.length;
    if (!length || length > 4) {
      return null;
    }
    if (length === 1) {
      // Same buffer all around.
      return olExtent.buffer(bbox, buffers[0]);
    }
    const fourValuesBuffers = [
      buffers[0], // Top is always set.
      buffers[1], // Right is always set (with length > 1).
      length === 2 ? buffers[0] : buffers[2], // Take bottom.
      length === 4 ? buffers[3] : buffers[1], // Take left.
    ];
    // To includes the feature's point into the queried zone relative to the click. Flip vertically and
    // horizontally the queryIconPosition (that is relative to the icon).
    // Ol extent coordinate order is [left, bottom, right, top].
    return [
      bbox[0] - fourValuesBuffers[1], // Use right buffer for left.
      bbox[1] - fourValuesBuffers[0], // Use top buffer for bottom.
      bbox[2] + fourValuesBuffers[3], // Use left buffer for right.
      bbox[3] + fourValuesBuffers[2], // Use bottom buffer for top.
    ];
  }

  /**
   * Issue WMS GetFeatureInfo requests using the given combined data sources,
   * map and optional filters.
   *
   * @param {CombinedDataSources} combinedDataSources Combined data sources.
   * @param {IssueGetFeaturesOptions} options Options.
   * @return {angular.IPromise<QuerentResult>} Promise.
   * @private
   */
  issueCombinedWMS_(combinedDataSources, options) {
    /** @type {angular.IPromise<QuerentResult>[]} */
    const promises = [];

    // The 'limit' option is mandatory in the querent service
    const FEATURE_COUNT = options.limit;

    const map = options.map;
    const view = map.getView();
    const resolution = view.getResolution();
    const projection = view.getProjection();
    const projCode = projection.getCode();
    if (resolution === undefined) {
      throw new Error('Missing resolution');
    }

    // (1) Coordinate, which is required to issue WMS GetFeatureInfo requests
    const coordinate = options.coordinate;
    if (!coordinate) {
      throw new Error('Missing coordinate');
    }

    // (2) Launch one request per combinaison of data sources
    for (const dataSources of combinedDataSources) {
      let url;
      /** @type {string[]} */
      let LAYERS = [];
      let INFO_FORMAT;
      let activeDimensionsSet = false;
      /** @type {Object<string, *>} */
      const params = {};
      let filterString = null;
      let filtrableLayerName = null;

      // (3) Build query options
      for (const dataSource of dataSources) {
        // (a) Create common options, if not done yet
        if (!INFO_FORMAT) {
          INFO_FORMAT = dataSource.wmsInfoFormat;
          url = dataSource.wmsUrl;
        }

        // (b) Add queryable layer names in featureTypes array
        LAYERS = LAYERS.concat(dataSource.getWMSLayerNames(true));

        // (c) Manage active dimensions, which are added directly to the
        //     query parameters. Note that this occurs only ONCE, i.e.
        //     for the first data source, because all data sources here have
        //     been combined together, therefore they share the same active
        //     dimensions.
        if (!activeDimensionsSet) {
          Object.assign(params, dataSource.activeDimensions);
          activeDimensionsSet = true;
        }

        // (d) Add filter, if any. If there is a filter on the data source,
        //     then it is expected that one request will be sent for this
        //     data source only.
        if (dataSource.filterRules && dataSource.filterRules.length) {
          console.assert(dataSources.length === 1);
          filtrableLayerName = dataSource.getFiltrableWFSLayerName();
          filterString = this.ngeoRuleHelper_.createFilterString({
            dataSource: dataSource,
            srsName: projCode,
          });
        }

        // (e) Add TIME parameter if the data source has a time range value.
        //     If that's the case, then it is expected that one request will be
        //     sent for this data source only.
        if (dataSource.timeRangeValue && dataSource.timeProperty) {
          console.assert(dataSources.length === 1);
          params.TIME = this.ngeoWMSTime_.formatWMSTimeParam(
            dataSource.timeProperty,
            /** @type {import('ngeo/datasource/OGC.js').TimeRange} */ (dataSource.timeRangeValue)
          );
        }
      }

      params.LAYERS = LAYERS;
      params.QUERY_LAYERS = LAYERS;

      // Manage 'FILTER' parameter
      if (filterString && filtrableLayerName) {
        let filterParamValue = null;
        if (LAYERS.length === 1) {
          // When there's only one layer in the `LAYERS` parameters, then
          // the filter string is given as-is.
          filterParamValue = filterString;
        } else {
          // When there's more then one layer, then each filter must be wrapped
          // between parenthesis and the order must also match the `LAYERS`
          // parameter as well.
          const filterParamValues = [];
          for (let i = 0, ii = LAYERS.length; i < ii; i++) {
            if (LAYERS[i] === filtrableLayerName) {
              filterParamValues.push(`(${filterString})`);
            } else {
              filterParamValues.push('()');
            }
          }
          filterParamValue = filterParamValues.join('');
        }
        params.FILTER = filterParamValue;
      }

      if (!url) {
        throw new Error('Missing url');
      }
      const wmsSource = new olSourceImageWMS({
        params,
        url,
        projection: map.getView().getProjection(),
      });

      // (4) Build query url, then launch
      const wmsGetFeatureInfoUrl = wmsSource.getFeatureInfoUrl(coordinate, resolution, projCode, {
        // Without extern, quoting is necessary
        'FEATURE_COUNT': FEATURE_COUNT,
        'INFO_FORMAT': INFO_FORMAT,
      });
      if (!wmsGetFeatureInfoUrl) {
        throw new Error('Missing wmsGetFeatureInfoUrl');
      }

      const canceler = this.registerCanceler_();
      promises.push(
        this.http_
          .get(wmsGetFeatureInfoUrl, {
            timeout: canceler.promise,
          })
          .then(
            /** @type {function(angular.IHttpResponse<Document|Element|string>|number): QuerentResult} */
            (this.handleQueryResult_.bind(this, dataSources, FEATURE_COUNT, false))
          )
      );
    }

    return this.q_.all(promises).then(handleCombinedQueryResult_);
  }

  /**
   * @param {ngeoDatasourceOGC[]} dataSources List of
   *     queryable data sources that supports WFS.
   * @return {CombinedDataSources} Combined lists of data sources.
   * @private
   */
  getCombinableWFSDataSources_(dataSources) {
    /** @type {CombinedDataSources} */
    const combinableDataSources = [];
    /** @type {CombinedDataSources} */
    const notCombinableDataSources = [];

    for (const dataSource of dataSources) {
      if (dataSource.combinableForWFS) {
        let combined = false;
        for (const combinableDataSource of combinableDataSources) {
          if (dataSource.combinableWithDataSourceForWFS(combinableDataSource[0])) {
            combinableDataSource.push(dataSource);
            combined = true;
          }
        }
        if (!combined) {
          combinableDataSources.push([dataSource]);
        }
      } else {
        notCombinableDataSources.push([dataSource]);
      }
    }

    return combinableDataSources.concat(notCombinableDataSources);
  }

  /**
   * @param {ngeoDatasourceOGC[]} dataSources List of
   *     queryable data sources that supports WMS.
   * @return {CombinedDataSources} Combined lists of data sources.
   * @private
   */
  getCombinableWMSDataSources_(dataSources) {
    /** @type {CombinedDataSources} */
    const combinableDataSources = [];
    /** @type {CombinedDataSources} */
    const notCombinableDataSources = [];

    for (const dataSource of dataSources) {
      if (dataSource.combinableForWMS) {
        let combined = false;
        for (const combinableDataSource of combinableDataSources) {
          if (dataSource.combinableWithDataSourceForWMS(combinableDataSource[0])) {
            combinableDataSource.push(dataSource);
            combined = true;
          }
        }
        if (!combined) {
          combinableDataSources.push([dataSource]);
        }
      } else {
        notCombinableDataSources.push([dataSource]);
      }
    }

    return combinableDataSources.concat(notCombinableDataSources);
  }

  /**
   * Checks if a data source can be queried, which requires it to be:
   * - visible
   * - in range
   * - queryable (using the native getter)
   * - have at least one OGC layer in range of current map view resolution.
   *
   * @param {import('ngeo/datasource/DataSource.js').default} ds Data source
   * @param {number} res Resolution.
   * @return {boolean} Whether the data source is queryable
   * @private
   */
  isDataSourceQueryable_(ds, res) {
    let queryable = ds.visible && ds.inRange && ds.queryable;
    // If the data source supports WFS, do one last extra check: see
    // of any of the inner OGC layer is in range.
    if (queryable && ds instanceof ngeoDatasourceOGC && ds.supportsWFS) {
      /**
       * @type {ngeoDatasourceOGC}
       */
      const ogcDS = ds;
      queryable = ogcDS.isAnyOGCLayerInRange(res, true);
    }
    return queryable;
  }

  /**
   * Make sure that feature ids are unique, because the same features might
   * be returned for different layers.
   * @param {import('ol/Feature.js').default<import("ol/geom/Geometry.js").default>[]} features Features
   * @param {number} dataSourceId Data source id.
   * @private
   */
  setUniqueIds_(features, dataSourceId) {
    features.forEach((feature) => {
      if (feature.getId() !== undefined) {
        const id = `${dataSourceId}_${feature.getId()}`;
        feature.setId(id);
      }
    });
  }

  /**
   * @return {angular.IDeferred<*>} A deferred that can be resolved to cancel a HTTP request.
   * @private
   */
  registerCanceler_() {
    const canceler = this.q_.defer();
    this.requestCancelers_.push(canceler);
    return canceler;
  }

  /**
   * @private
   */
  cancelStillRunningRequests_() {
    for (const canceler of this.requestCancelers_) {
      canceler.resolve();
    }
    this.requestCancelers_.length = 0;
  }
}

/**
 * Handles the response of multiple promises that did either
 * WMS GetFeatureInfo or WFS GetFeature requests, in which the result is
 * a hash with key being the data source id and value the array of features.
 *
 * The response object itself is an array, one item being one result per
 * promise. The idea is to return a single hash by combining the result
 * objects.
 *
 * The keys are always unique, i.e. there can be multiple result objects for
 * the same data source id.
 *
 * @param {QuerentResult[]} response Response.
 * @return {QuerentResult} Hash of features by data source ids.
 * @private
 */
function handleCombinedQueryResult_(response) {
  /** @type {QuerentResult} */
  const combinedHash = {};
  for (const hash of response) {
    for (const dataSourceIdStr in hash) {
      const dataSourceId = Number(dataSourceIdStr);
      combinedHash[dataSourceId] = hash[dataSourceId];
    }
  }
  return combinedHash;
}

/**
 * @typedef {ngeoDatasourceOGC[][]} CombinedDataSources
 */

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('ngeoQuerent', [ngeoFilterRuleHelper.name, ngeoMiscWMSTime.name]);
myModule.service('ngeoQuerent', Querent);

export default myModule;
