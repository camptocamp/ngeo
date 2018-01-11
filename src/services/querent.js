goog.provide('ngeo.Querent');

goog.require('ngeo');
goog.require('ngeo.RuleHelper');
goog.require('ngeo.WMSTime');
goog.require('ol.format.WFS');
goog.require('ol.format.WFSDescribeFeatureType');
goog.require('ol.obj');
goog.require('ol.source.ImageWMS');


ngeo.Querent = class {

  /**
   * The ngeo Querent is a service that issues all sorts of queries using
   * ngeo data sources. It does not store the result. Instead, it returns it
   * using promises. Any component that inject this service can use it to
   * make it issue its own queries and do whatever it wants with the result.
   *
   * @struct
   * @param {angular.$http} $http Angular $http service.
   * @param {angular.$q} $q The Angular $q service.
   * @param {!ngeo.RuleHelper} ngeoRuleHelper Ngeo rule helper service.
   * @param {!ngeo.WMSTime} ngeoWMSTime wms time service.
   * @ngdoc service
   * @ngname ngeoQuerent
   * @ngInject
   */
  constructor($http, $q, ngeoRuleHelper, ngeoWMSTime) {

    // === Injected properties ===

    /**
     * @type {angular.$http}
     * @private
     */
    this.http_ = $http;

    /**
     * @type {angular.$q}
     * @private
     */
    this.q_ = $q;

    /**
     * @type {!ngeo.RuleHelper}
     * @private
     */
    this.ngeoRuleHelper_ = ngeoRuleHelper;

    /**
     * @type {!ngeo.WMSTime}
     * @private
     */
    this.ngeoWMSTime_ = ngeoWMSTime;


    // === Other properties ===

    /**
     * Promises that can be resolved to cancel started requests.
     * @type {!Array.<angular.$q.Deferred>}
     * @private
     */
    this.requestCancelers_ = [];
  }


  // === PUBLIC methods ===

  /**
   * Issue WMS GetFeatureInfo and/or WFS GetFeature requests using the given
   * data sources, map and optional filters.
   *
   * @param {ngeox.IssueGetFeaturesOptions} options Options.
   * @return {angular.$q.Promise} Promise.
   * @export
   */
  issue(options) {

    const promises = [];
    const map = options.map;

    // (1) Cancel requests that are still running
    this.cancelStillRunningRequests_();

    // (2) Get queryable data sources
    let queryableDataSources;
    if (options.queryableDataSources) {
      queryableDataSources = options.queryableDataSources;
    } else {
      const dataSources = options.dataSources;
      goog.asserts.assert(dataSources, 'DataSources should be set');
      queryableDataSources = this.getQueryableDataSources(dataSources, map);
    }

    // (3) Combine data sources that support WFS and issue WFS queries.
    //     The 'bbox' ('extent' option) is not required for WFS requests to
    //     be issued.
    const combinedWFSDataSources = this.getCombinableWFSDataSources_(
      queryableDataSources.wfs);
    promises.push(this.issueCombinedWFS_(combinedWFSDataSources, options));

    // (4) Combine data sources that support WMS and issue WMS queries.
    //     Only occurs if the `coordinate` option is set, because it's required
    //     by WMS GetFeatureInfo requests.
    const coordinate = options.coordinate;
    if (coordinate) {
      const combinedWMSDataSources = this.getCombinableWMSDataSources_(
        queryableDataSources.wms);
      promises.push(this.issueCombinedWMS_(combinedWMSDataSources, options));
    }

    return this.q_.all(promises).then(
      this.handleCombinedQueryResult_.bind(this)
    );
  }

  /**
   * Browse a given list of data sources. Return 2 lists of data sources that
   * are queryable, the first one being those that support WFS and the other
   * WMS only. This means that WFS is always favored first, then WMS.
   *
   * The map view resolution determines if the inner ogc layers are in range.
   *
   * @param {!Array.<!ngeo.DataSource>} dataSources Data sources
   * @param {ol.Map} map Map.
   * @return {!ngeox.QueryableDataSources} Queryable data sources.
   * @export
   */
  getQueryableDataSources(dataSources, map) {

    const queryableDataSources = {
      wfs: [],
      wms: []
    };
    const resolution = goog.asserts.assertNumber(map.getView().getResolution());

    for (const dataSource of dataSources) {

      // (1) Skip data source that can't be queried
      if (!this.isDataSourceQueryable_(dataSource, resolution)) {
        continue;
      }

      // (2) Split data sources
      if (dataSource.supportsWFS) {
        queryableDataSources.wfs.push(dataSource);
      } else {
        queryableDataSources.wms.push(dataSource);
      }
    }

    return queryableDataSources;
  }

  /**
   * @param {ngeo.DataSource} dataSource Data source.
   * @return {angular.$q.Promise} Promise.
   * @export
   */
  wfsDescribeFeatureType(dataSource) {

    goog.asserts.assert(
      dataSource.supportsAttributes,
      `The data source must support WFS, have a single OGCLayer that
      is queryable in order to issue WFS DescribeFeatureType requests`
    );

    const ogcLayerNames = dataSource.getOGCLayerNames();

    const url = ol.uri.appendParams(
      goog.asserts.assertString(dataSource.wfsUrl),
      {
        'REQUEST': 'DescribeFeatureType',
        'SERVICE': 'WFS',
        'VERSION': '2.0.0',
        'TYPENAME': ogcLayerNames
      }
    );

    return this.http_.get(url).then((response) => {
      const format = new ol.format.WFSDescribeFeatureType();
      return format.read(response.data);
    });
  }


  // === PRIVATE methods ===

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
   * @param {!Array.<ngeox.QuerentResult>} response Response.
   * @return {ngeox.QuerentResult} Hash of features by data source ids.
   * @private
   */
  handleCombinedQueryResult_(response) {
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
   * Handles the result of a single WMS GetFeatureInfo or WFS GetFeature
   * request. Read features from the response and return them.
   *
   * @param {!Array.<!ngeo.DataSource>} dataSources List of queryable data
   *     sources that were used to do the query.
   * @param {number} limit The maximum number of features to get with the query.
   * @param {boolean} wfs Whether the query was WFS or WMS.
   * @param {angular.$http.Response|number} response Response.
   * @return {ngeox.QuerentResult} Hash of features by data source ids.
   * @private
   */
  handleQueryResult_(dataSources, limit, wfs, response) {
    const hash = {};

    for (const dataSource of dataSources) {
      let features;
      let tooManyFeatures;
      let totalFeatureCount;

      if (typeof response === 'number') {
        features = [];
        tooManyFeatures = true;
        totalFeatureCount = response;
      } else {
        features = this.readAndTypeFeatures_(dataSource, response.data, wfs);
      }
      const dataSourceId = dataSource.id;
      this.setUniqueIds_(features, dataSource.id);
      hash[dataSourceId] = {
        features,
        limit,
        tooManyFeatures,
        totalFeatureCount
      };
    }

    return hash;
  }

  /**
   * Read and assign the type of the feature to each feature in the data.
   * The type will be stocked in the properties of the features as
   * "ngeo_feature_type_".
   * @param {ngeo.DataSource} dataSource used to read the features.
   * @param {Document | Node | Object | string} data the response data.
   * @param {boolean} wfs Whether the query was WFS or WMS.
   * @return {Array.<ol.Feature>} returned features with a type in each features.
   * @private
   */
  readAndTypeFeatures_(dataSource, data, wfs) {
    const features = [];
    let readFeatures;
    // Copy the types to be able to set it AND iterate on it.
    const featureTypes = this.getSetOlFormatTypes_(dataSource, wfs).slice();
    featureTypes.forEach((type) => {
      // Assign temporarily a single feature type to read features separately.
      this.getSetOlFormatTypes_(dataSource, wfs, [type]);
      if (wfs) {
        readFeatures = dataSource.wfsFormat.readFeatures(data);
      } else {
        readFeatures = dataSource.wmsFormat.readFeatures(data);
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
   * @param {ngeo.DataSource} dataSource that contains the format object.
   * @param {boolean} wfs Whether the query was WFS or WMS.
   * @param {Array.<string>=} opt_types An array of type if you want to set the
   *     type of the format object.
   * @return {Array.<string>} The types defined in the format.
   * @private
   */
  getSetOlFormatTypes_(dataSource, wfs, opt_types) {
    let types;
    if (wfs) {
      if (opt_types) {
        dataSource.wfsFormat.setFeatureType(opt_types);
      }
      types = dataSource.wfsFormat.getFeatureType();
    } else {
      if (opt_types) {
        dataSource.wmsFormat.setLayers(opt_types);
      }
      types = dataSource.wmsFormat.getLayers();
    }
    if (!types) {
      return [];
    }
    return (Array.isArray(types)) ? types : [types];
  }

  /**
   * Issue WFS GetFeature requests using the given combined data sources, map
   * and optional filters.
   *
   * @param {!ngeo.Querent.CombinedDataSources} combinedDataSources Combined
   *     data sources.
   * @param {ngeox.IssueGetFeaturesOptions} options Options.
   * @return {angular.$q.Promise} Promise.
   * @private
   */
  issueCombinedWFS_(combinedDataSources, options) {

    const promises = [];

    // The 'limit' option is mandatory in the querent service
    const maxFeatures = goog.asserts.assertNumber(options.limit);

    const map = options.map;
    const view = map.getView();
    const resolution = goog.asserts.assertNumber(view.getResolution());
    const projection = view.getProjection();
    const srsName = projection.getCode();
    const wfsCount = options.wfsCount === true;

    // (1) Extent (bbox), which is optional, i.e. its value can stay undefined
    let bbox;
    const coordinate = options.coordinate;
    if (coordinate) {
      const tolerancePx = options.tolerancePx;
      goog.asserts.assert(tolerancePx);
      const tolerance = tolerancePx * resolution;
      bbox = ol.extent.buffer(
        ol.extent.createOrUpdateFromCoordinate(coordinate),
        tolerance
      );
    } else {
      bbox = options.extent;
    }

    // (2) Launch one request per combinaison of data sources
    const wfsFormat = new ol.format.WFS();
    const xmlSerializer = new XMLSerializer();
    for (const dataSources of combinedDataSources) {

      let getFeatureCommonOptions;
      let featureNS;
      let featureTypes = [];
      let url;
      const params = {};

      // (3) Build query options
      for (const dataSource of dataSources) {

        // (a) Create common options, if not done yet
        if (!getFeatureCommonOptions) {
          featureNS = dataSource.wfsFeatureNS;
          const featurePrefix = dataSource.wfsFeaturePrefix;
          const geometryName = dataSource.geometryName;
          const outputFormat = dataSource.wfsOutputFormat;

          getFeatureCommonOptions = {
            bbox,
            featureNS,
            featurePrefix,
            geometryName,
            outputFormat,
            srsName
          };

          url = dataSource.wfsUrl;

          // All data sources combined share the same active dimensions
          ol.obj.assign(params, dataSource.activeDimensions);
        }

        // (b) Add queryable layer names in featureTypes array
        featureTypes = featureTypes.concat(
          dataSource.getInRangeOGCLayerNames(resolution, true));

        // (c) Add filter, if any. If the case, then only one data source
        //     is expected to be used for this request.
        let filter;
        if (options.filter) {
          filter = this.ngeoRuleHelper_.createFilter({
            dataSource,
            filter: options.filter,
            incTime: true
          });
        } else if ((dataSource.filterRules && dataSource.filterRules.length) ||
            dataSource.timeRangeValue) {

          goog.asserts.assert(
            dataSources.length === 1,
            `A data source having filterRules or timeRangeValue should issue
            a single query, alone.`
          );

          filter = this.ngeoRuleHelper_.createFilter({
            dataSource,
            incTime: true,
            srsName
          });
        }

        if (filter) {
          getFeatureCommonOptions['filter'] = filter;
        }
      }

      goog.asserts.assert(getFeatureCommonOptions);
      getFeatureCommonOptions.featureTypes = featureTypes;
      goog.asserts.assert(url);

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
      const getFeatureDefer = this.q_.defer();
      promises.push(
        getFeatureDefer.promise.then(
          this.handleQueryResult_.bind(this, dataSources, maxFeatures, true)
        )
      );

      // (4.1) Count, if required
      let countPromise;
      if (wfsCount) {
        const getCountOptions =
            /** @type{olx.format.WFSWriteGetFeatureOptions} */ (
            ol.obj.assign(
              {
                resultType: 'hits'
              },
              getFeatureCommonOptions
            )
          );
        const featureCountXml = wfsFormat.writeGetFeature(getCountOptions);
        const featureCountRequest = xmlSerializer.serializeToString(
          featureCountXml);
        const canceler = this.registerCanceler_();
        countPromise = this.http_.post(
          url,
          featureCountRequest,
          {
            params,
            headers: {'Content-Type': 'text/xml; charset=UTF-8'},
            timeout: canceler.promise
          }
        ).then(((response) => {
          const meta = dataSources[0].wfsFormat.readFeatureCollectionMetadata(
            response.data
          );
          return meta['numberOfFeatures'];
        }).bind(this));
      } else {
        countPromise = this.q_.resolve();
      }

      // (4.2) After count, do GetFeature (if required)
      countPromise.then((numberOfFeatures) => {
        // `true` is returned if a count request was made AND there would
        // be too many features.
        if (numberOfFeatures === undefined || numberOfFeatures < maxFeatures) {

          const getFeatureOptions =
              /** @type{olx.format.WFSWriteGetFeatureOptions} */ (
              ol.obj.assign(
                {
                  maxFeatures
                },
                getFeatureCommonOptions
              )
            );
          const featureRequestXml = wfsFormat.writeGetFeature(
            getFeatureOptions);
          const featureRequest = xmlSerializer.serializeToString(
            featureRequestXml);
          goog.asserts.assertString(url);
          const canceler = this.registerCanceler_();
          this.http_.post(
            url,
            featureRequest,
            {
              params,
              headers: {'Content-Type': 'text/xml; charset=UTF-8'},
              timeout: canceler.promise
            }
          ).then((response) => {
            getFeatureDefer.resolve(response);
          });

        } else {
          getFeatureDefer.resolve(numberOfFeatures);
        }
      });
    }

    return this.q_.all(promises).then(
      this.handleCombinedQueryResult_.bind(this)
    );
  }

  /**
   * Issue WMS GetFeatureInfo requests using the given combined data sources,
   * map and optional filters.
   *
   * @param {!ngeo.Querent.CombinedDataSources} combinedDataSources Combined
   *     data sources.
   * @param {ngeox.IssueGetFeaturesOptions} options Options.
   * @return {angular.$q.Promise} Promise.
   * @private
   */
  issueCombinedWMS_(combinedDataSources, options) {

    const promises = [];

    // The 'limit' option is mandatory in the querent service
    const FEATURE_COUNT = goog.asserts.assertNumber(options.limit);

    const map = options.map;
    const view = map.getView();
    const resolution = goog.asserts.assertNumber(view.getResolution());
    const projection = view.getProjection();
    const projCode = projection.getCode();

    // (1) Coordinate, which is required to issue WMS GetFeatureInfo requests
    const coordinate = options.coordinate;
    goog.asserts.assert(coordinate);

    // (2) Launch one request per combinaison of data sources
    for (const dataSources of combinedDataSources) {

      let url;
      let LAYERS = [];
      let INFO_FORMAT;
      let activeDimensionsSet = false;
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
        LAYERS = LAYERS.concat(
          dataSource.getInRangeOGCLayerNames(resolution, true));

        // (c) Manage active dimensions, which are added directly to the
        //     query parameters. Note that this occurs only ONCE, i.e.
        //     for the first data source, because all data sources here have
        //     been combined together, therefore they share the same active
        //     dimensions.
        if (!activeDimensionsSet) {
          ol.obj.assign(params, dataSource.activeDimensions);
          activeDimensionsSet = true;
        }

        // (d) Add filter, if any. If there is a filter on the data source,
        //     then it is expected that one request will be sent for this
        //     data source only.
        if (dataSource.filterRules && dataSource.filterRules.length) {
          goog.asserts.assert(dataSources.length === 1);
          filtrableLayerName = dataSource.getFiltrableOGCLayerName();
          filterString = this.ngeoRuleHelper_.createFilterString({
            dataSource,
            srsName: projCode
          });
        }

        // (e) Add TIME parameter if the data source has a time range value.
        //     If that's the case, then it is expected that one request will be
        //     sent for this data source only.
        if (dataSource.timeRangeValue !== null && dataSource.timeProperty) {
          goog.asserts.assert(dataSources.length === 1);
          params['TIME'] = this.ngeoWMSTime_.formatWMSTimeParam(
            dataSource.timeProperty,
            dataSource.timeRangeValue
          );
        }
      }

      params['LAYERS'] = LAYERS;
      params['QUERY_LAYERS'] = LAYERS;

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
        params['FILTER'] = filterParamValue;
      }

      goog.asserts.assert(url);
      const wmsSource = new ol.source.ImageWMS({
        params,
        url
      });

      // (4) Build query url, then launch
      const wmsGetFeatureInfoUrl = goog.asserts.assertString(
        wmsSource.getGetFeatureInfoUrl(
          coordinate, resolution, projCode, {
            // Without extern, quoting is necessary
            'FEATURE_COUNT': FEATURE_COUNT,
            'INFO_FORMAT': INFO_FORMAT
          }
        )
      );

      const canceler = this.registerCanceler_();
      promises.push(
        this.http_.get(
          wmsGetFeatureInfoUrl,
          {
            timeout: canceler.promise
          }
        ).then(
          this.handleQueryResult_.bind(this, dataSources, FEATURE_COUNT, false)
        )
      );
    }

    return this.q_.all(promises).then(
      this.handleCombinedQueryResult_.bind(this)
    );
  }

  /**
   * @param {!Array.<ngeox.DataSource>} dataSources List of queryable data
   *     sources that supports WFS.
   * @return {ngeo.Querent.CombinedDataSources} Combined lists of data sources.
   * @private
   */
  getCombinableWFSDataSources_(dataSources) {
    const combinableDataSources = [];
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
   * @param {!Array.<ngeox.DataSource>} dataSources List of queryable data
   *     sources that supports WMS.
   * @return {ngeo.Querent.CombinedDataSources} Combined lists of data sources.
   * @private
   */
  getCombinableWMSDataSources_(dataSources) {
    const combinableDataSources = [];
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
   * @param {ngeo.DataSource} ds Data source
   * @param {number} res Resolution.
   * @return {boolean} Whether the data source is queryable
   * @private
   */
  isDataSourceQueryable_(ds, res) {
    return ds.visible && ds.inRange && ds.queryable &&
      ds.isAnyOGCLayerInRange(res, true);
  }

  /**
   * Make sure that feature ids are unique, because the same features might
   * be returned for different layers.
   * @param {Array.<ol.Feature>} features Features
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
   * @return {angular.$q.Deferred} A deferred that can be resolved to cancel a
   *    HTTP request.
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
};


/**
 * @typedef {!Array.<!Array.<!ngeo.DataSource>>}
 */
ngeo.Querent.CombinedDataSources;


ngeo.module.service('ngeoQuerent', ngeo.Querent);
