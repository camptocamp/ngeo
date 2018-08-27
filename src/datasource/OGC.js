/**
 * @module ngeo.datasource.OGC
 */
import googAsserts from 'goog/asserts.js';
import ngeoDatasourceDataSource from 'ngeo/datasource/DataSource.js';
import ngeoFilterCondition from 'ngeo/filter/Condition.js';
import ngeoFormatAttributeType from 'ngeo/format/AttributeType.js';
import olFormatGML2 from 'ol/format/GML2.js';
import olFormatGML3 from 'ol/format/GML3.js';
import olFormatWFS from 'ol/format/WFS.js';
import olFormatWMSGetFeatureInfo from 'ol/format/WMSGetFeatureInfo.js';

/**
 * @implements {ngeox.datasource.OGC}
 */
const exports = class extends ngeoDatasourceDataSource {

  /**
   * A data source contains information of a single source of data that can
   * show or fetch the data using an OGC server. Several OGC service types are
   * supported by this data source: WMS, WMTS and even WFS.
   *
   * You can use the information stored within an OGC data source to do all
   * sorts of things:
   * - issue WMS/WFS queries
   * - apply filter rules on it
   * - create `ol.layer.Layer` objects using the WMS, WMTS or event WFS
   *   information
   *
   * @struct
   * @param {ngeox.datasource.OGCOptions} options Options.
   */
  constructor(options) {

    super(options);

    // === DYNAMIC properties (i.e. that can change / be watched) ===

    /**
     * The dimensions configuration for the data source.
     * @type {?ngeox.Dimensions}
     * @private
     */
    this.dimensionsConfig_ = options.dimensionsConfig || null;

    /**
     * The filter condition to apply to the filter rules (if any).
     * @type {string}
     * @private
     */
    this.filterCondition_ = options.filterCondition || ngeoFilterCondition.AND;

    /**
     * A list of filter rules to apply to this data source using the filter
     * condition.
     * @type {?Array.<!ngeo.rule.Rule>}
     * @private
     */
    this.filterRules_ = options.filterRules || null;

    /**
     * Whether the data source is filtrable or not. When `null`, that means
     * that we do not know if the data source if filtrable or not, yet. In
     * that case, the value of the property needs to be determined from an
     * external way.
     * @type {?boolean}
     * @private
     */
    this.filtrable_ = options.filtrable || null;


    // === STATIC properties (i.e. that never change) ===

    /**
     * Whether the geometry from this data source can be copied to other data
     * sources or not. Defaults to `false`.
     * @type {boolean}
     * @private
     */
    this.copyable_ = options.copyable === true;

    /**
     * A reference to the dimensions object.
     * @type {?ngeox.Dimensions}
     * @private
     */
    this.dimensions_ = options.dimensions || null;

    /**
     * The name of the geometry attribute.
     * @type {string}
     * @private
     */
    this.geometryName_ = options.geometryName || exports.DEFAULT_GEOMETRY_NAME_;

    /**
     * The type of images to fetch by queries by the (WMS) or (WMTS) .
     * @type {string}
     * @private
     */
    this.ogcImageType_ = options.ogcImageType || 'image/png';

    /**
     * A list of layer definitions that are used by (WMS) and (WFS) queries.
     * These are **not** used by the (WMTS) queries (the wmtsLayers is used
     * by WMTS queries).
     * @type {?Array.<!ngeox.datasource.OGCLayer>}
     * @private
     */
    this.ogcLayers_ = options.ogcLayers || null;

    /**
     * The type of OGC server making the requests.
     * @type {string}
     * @private
     */
    this.ogcServerType_ = options.ogcServerType || exports.ServerType.MAPSERVER;

    /**
     * The type data source. Can be: 'WMS' or 'WMTS'.
     * @type {string}
     * @private
     */
    this.ogcType_ = options.ogcType || exports.Type.WMS;

    /**
     * Whether the geometry from this data source can be used to snap the
     * geometry of features from other data sources that are being edited.
     * Defaults to `false`.
     * @type {boolean}
     * @private
     */
    this.snappable_ = options.snappable === true;

    /**
     * Determines whether external features can be snapped to the edges of
     * features from this data source or not. Defaults to `true`. Requires
     * `snappable` to be set.
     * @type {boolean}
     * @private
     */
    this.snappingToEdges_ = options.snappingToEdges !== false;

    /**
     * Determines whether external features can be snapped to the vertice of
     * features from this data source or not. Defaults to `true`. Requires
     * `snappable` to be set.
     * @type {boolean}
     * @private
     */
    this.snappingToVertice_ = options.snappingToVertice !== false;

    /**
     * The tolerance in pixels the snapping should occur. Defaults to `10`.
     * @type {number}
     * @private
     */
    this.snappingTolerance_ = options.snappingTolerance !== undefined ? options.snappingTolerance : 10;

    /**
     * The name of the time attribute.
     * @type {string|undefined}
     * @private
     */
    this.timeAttributeName_ = options.timeAttributeName;

    /**
     * @type {number|undefined}
     * @private
     */
    this.timeLowerValue_ = options.timeLowerValue;

    /**
     * @type {?ngeox.TimeProperty}
     * @private
     */
    this.timeProperty_ = options.timeProperty !== undefined ? options.timeProperty : null;

    /**
     * @type {number|undefined}
     * @private
     */
    this.timeUpperValue_ = options.timeUpperValue;

    /**
     * The feature namespace to use with WFS requests.
     * @type {string}
     * @private
     */
    this.wfsFeatureNS_ = options.wfsFeatureNS;

    /**
     * The feature prefix to use with WFS requests.
     * @type {string}
     * @private
     */
    this.wfsFeaturePrefix_ = options.wfsFeaturePrefix || exports.WFSFeaturePrefix.FEATURE;

    /**
     * The OutputFormat to use with WFS requests.
     * @type {string}
     * @private
     */
    this.wfsOutputFormat_ = options.wfsOutputFormat || exports.WFSOutputFormat.GML3;

    /**
     * The url to use for (WFS) requests.
     * @type {string|undefined}
     * @private
     */
    this.wfsUrl_ = options.wfsUrl;

    /**
     * The InfoFormat to use with WMS requests.
     * @type {string}
     * @private
     */
    this.wmsInfoFormat_ = options.wmsInfoFormat || exports.WMSInfoFormat.GML;

    /**
     * Whether the (WMS) images returned by this data source
     * should be single tiles or not.
     * @type {boolean}
     * @private
     */
    this.wmsIsSingleTile_ = options.wmsIsSingleTile === true;

    /**
     * The url to use for (WMS) requests.
     * @type {string|undefined}
     * @private
     */
    this.wmsUrl_ = options.wmsUrl;

    /**
     * The layer name to use for the (WMTS) requests.
     * @type {string|undefined}
     * @private
     */
    this.wmtsLayer_ = options.wmtsLayer;

    /**
     * The url to use for (WMTS) requests.
     * @type {string|undefined}
     * @private
     */
    this.wmtsUrl_ = options.wmtsUrl;


    // === Calculated properties ===

    // Get queryable ogc layer names
    const layers = [];
    if (this.queryable && this.ogcLayers) {
      for (const ogcLayer of this.ogcLayers) {
        if (ogcLayer.queryable) {
          layers.push(ogcLayer.name);
        }
      }
    }

    let wfsFormat = null;
    if (this.supportsWFS && layers.length) {
      let format = undefined;
      if (this.wfsOutputFormat_ === exports.WFSOutputFormat.GML3) {
        format = new olFormatGML3();
      } else if (this.wfsOutputFormat_ === exports.WFSOutputFormat.GML2) {
        format = new olFormatGML2();
      }
      googAsserts.assert(format);
      wfsFormat = new olFormatWFS({
        featureNS: this.wfsFeatureNS,
        featureType: layers,
        gmlFormat: format
      });
    }

    /**
     * @type {?ol.format.WFS}
     * @private
     */
    this.wfsFormat_ = wfsFormat;

    let wmsFormat = null;
    if (this.supportsWMS && layers.length) {
      if (this.wmsInfoFormat === exports.WMSInfoFormat.GML) {
        wmsFormat = new olFormatWMSGetFeatureInfo({
          layers
        });
      }
      // Todo, support more formats for WMS
    }

    /**
     * @type {?ol.format.WMSGetFeatureInfo}
     * @private
     */
    this.wmsFormat_ = wmsFormat;
  }

  // ========================================
  // === Dynamic property getters/setters ===
  // ========================================

  /**
   * @return {?ngeox.Dimensions} Dimensions configuration for this data source
   * @export
   */
  get dimensionsConfig() {
    return this.dimensionsConfig_;
  }

  /**
   * @param {?ngeox.Dimensions} dimensionsConfig Dimensions configuration
   * @export
   */
  set dimensionsConfig(dimensionsConfig) {
    this.dimensionsConfig_ = dimensionsConfig;
  }

  /**
   * @return {string} Filter condition
   * @export
   */
  get filterCondition() {
    return this.filterCondition_;
  }

  /**
   * @param {string} filterCondition Filter condition
   * @export
   */
  set filterCondition(filterCondition) {
    this.filterCondition_ = filterCondition;
  }

  /**
   * @return {?Array.<!ngeo.rule.Rule>} Filter rules
   * @export
   */
  get filterRules() {
    return this.filterRules_;
  }

  /**
   * @param {?Array.<!ngeo.rule.Rule>} filterRules Filter rules
   * @export
   */
  set filterRules(filterRules) {
    this.filterRules_ = filterRules;
  }

  /**
   * @return {number|undefined} Time lower value
   * @export
   */
  get timeLowerValue() {
    return this.timeLowerValue_;
  }

  /**
   * @param {number|undefined} time Time lower value
   * @export
   */
  set timeLowerValue(time) {
    this.timeLowerValue_ = time;
  }

  /**
   * @return {?ngeox.TimeRange} Time range value
   * @export
   */
  get timeRangeValue() {
    let range = null;
    const lower = this.timeLowerValue;
    const upper = this.timeUpperValue;
    if (lower !== undefined) {
      range = {
        end: upper,
        start: lower
      };
    }
    return range;
  }

  /**
   * @param {?ngeox.TimeRange} range Time range value
   * @export
   */
  set timeRangeValue(range) {
    if (range) {
      this.timeUpperValue = range.end;
      this.timeLowerValue = range.start;
    } else {
      this.timeUpperValue = undefined;
      this.timeLowerValue = undefined;
    }
  }

  /**
   * @return {number|undefined} Time upper value
   * @export
   */
  get timeUpperValue() {
    return this.timeUpperValue_;
  }

  /**
   * @param {number|undefined} time Time upper value
   * @export
   */
  set timeUpperValue(time) {
    this.timeUpperValue_ = time;
  }

  // =======================================
  // === Static property getters/setters ===
  // =======================================

  /**
   * @inheritDoc
   */
  getAttributes() {
    return super.attributes;
  }

  /**
   * @inheritDoc
   */
  setAttributes(attributes) {
    super.setAttributes(attributes);
    this.updateGeometryNameFromAttributes_();
  }

  /**
   * @return {boolean} Copyable
   * @export
   */
  get copyable() {
    return this.copyable_;
  }

  /**
   * @return {?boolean} Filtrable.
   * @export
   */
  get filtrable() {
    return this.filtrable_;
  }

  /**
   * @param {?boolean} filtrable Filtrable.
   * @export
   */
  set filtrable(filtrable) {
    this.filtrable_ = filtrable;
  }

  /**
   * @return {string} Geometry name
   * @export
   */
  get geometryName() {
    return this.geometryName_;
  }

  /**
   * @return {string} OGC image type
   * @export
   */
  get ogcImageType() {
    return this.ogcImageType_;
  }

  /**
   * @return {?Array.<!ngeox.datasource.OGCLayer>} OGC layers
   * @export
   */
  get ogcLayers() {
    return this.ogcLayers_;
  }

  /**
   * @return {string} OGC server type
   * @export
   */
  get ogcServerType() {
    return this.ogcServerType_;
  }

  /**
   * @return {string} OGC type
   * @export
   */
  get ogcType() {
    return this.ogcType_;
  }

  /**
   * @return {boolean} Snappable
   * @export
   */
  get snappable() {
    return this.snappable_;
  }

  /**
   * @return {boolean} Snapping to edges
   * @export
   */
  get snappingToEdges() {
    return this.snappingToEdges_;
  }

  /**
   * @return {boolean} Snapping to vertices
   * @export
   */
  get snappingToVertice() {
    return this.snappingToVertice_;
  }

  /**
   * @return {number} Snapping tolerance
   * @export
   */
  get snappingTolerance() {
    return this.snappingTolerance_;
  }

  /**
   * @return {string|undefined} Time attribute name
   * @export
   */
  get timeAttributeName() {
    return this.timeAttributeName_;
  }

  /**
   * @return {?ngeox.TimeProperty} Time property
   * @export
   */
  get timeProperty() {
    return this.timeProperty_;
  }

  /**
   * @return {string} WFS feature namespace
   * @export
   */
  get wfsFeatureNS() {
    return this.wfsFeatureNS_;
  }

  /**
   * @return {string} WFS feature prefix
   * @export
   */
  get wfsFeaturePrefix() {
    return this.wfsFeaturePrefix_;
  }

  /**
   * @return {string} WFS output format
   * @export
   */
  get wfsOutputFormat() {
    return this.wfsOutputFormat_;
  }

  /**
   * @export
   * @return {string|undefined} WFS url
   */
  get wfsUrl() {
    return this.wfsUrl_;
  }

  /**
   * @return {string} WMS info format
   * @export
   */
  get wmsInfoFormat() {
    return this.wmsInfoFormat_;
  }

  /**
   * @return {boolean} WMS is single tile
   * @export
   */
  get wmsIsSingleTile() {
    return this.wmsIsSingleTile_;
  }

  /**
   * @return {string|undefined} WMS url
   * @export
   * @override
   */
  get wmsUrl() {
    return this.wmsUrl_;
  }

  /**
   * @return {string|undefined} WMTS layer
   * @export
   */
  get wmtsLayer() {
    return this.wmtsLayer_;
  }

  /**
   * @return {string|undefined} WMTS url
   * @export
   * @override
   */
  get wmtsUrl() {
    return this.wmtsUrl_;
  }

  // ===================================
  // === Calculated property getters ===
  // ===================================

  /**
   * @return {!ngeox.DimensionsActive} Active dimensions
   * @export
   */
  get activeDimensions() {
    const active = {};
    const dimensions = this.dimensions_ || {};
    const config = this.dimensionsConfig || {};

    for (const key in config) {
      if (config[key] === null) {
        if (dimensions[key] !== undefined && dimensions[key] !== null) {
          active[key] = dimensions[key];
        }
      } else {
        active[key] = config[key];
      }
    }

    return active;
  }

  /**
   * A data source can't be combined to other data source to issue a single
   * WFS request if:
   *
   * - it has filter rules set
   * - it has time range set
   *
   * @return {boolean} Whether the data source can be combined to an other
   *     data source to fetch features in a single WFS request.
   * @export
   * @override
   */
  get combinableForWFS() {
    return this.filterRules_ === null &&
      this.timeRangeValue === null;
  }

  /**
   * A data source can't be combined to other data source to issue a single
   * WMS request if:
   *
   * - it has filter rules set
   * - it has time range set
   *
   * @return {boolean} Whether the data source can be combined to an other
   *     data source to fetch features in a single WMS request.
   * @export
   * @override
   */
  get combinableForWMS() {
    return this.filterRules_ === null &&
      this.timeRangeValue === null;
  }

  /**
   * Whether the data source is queryable or not. For an OGC data source to be
   * queryable, it requires the support of WFS or WMS and at least one ogc
   * layer to be querable.
   * @export
   */
  get queryable() {
    let queryable = false;
    const supportsOGCQueries = this.supportsWMS || this.supportsWFS;
    if (supportsOGCQueries && this.ogcLayers) {
      for (const ogcLayer of this.ogcLayers) {
        if (ogcLayer.queryable === true) {
          queryable = true;
          break;
        }
      }
    }
    return queryable;
  }

  /**
   * @return {boolean} Whether the data source supports making WFS requests
   *     or not.
   * @export
   * @override
   */
  get supportsWFS() {
    return this.wfsUrl !== undefined;
  }

  /**
   * To be able to do advanced operations on a data source, such as editing
   * or filtering, a data source must be bound to 1 set of attributes.
   * These attributes are the ones defined by an ogcLayer.  This means that
   * to be considered to support having attributes defined, you either need
   * to define them directly when creating the data source, or if you let
   * the querent service get them for you using a WFS DescribeFeatureType
   * request, the data source must have only 1 ogcLayer set, which must
   * be queryable.
   * @return {boolean} Supports attributes.
   * @export
   */
  get supportsAttributes() {
    return this.attributes !== null || (
      this.supportsWFS &&
      this.ogcLayers !== null &&
      this.ogcLayers.length === 1 &&
      this.ogcLayers[0].queryable === true
    );
  }

  /**
   * @return {boolean} Whether the data source supports making WMS requests
   *     or not.
   * @export
   * @override
   */
  get supportsWMS() {
    return this.wmsUrl !== undefined;
  }

  /**
   * @return {boolean} Whether the data source supports making WTMS requests
   *     or not.
   * @export
   */
  get supportsWMTS() {
    return this.wmtsUrl !== undefined;
  }

  /**
   * @return {?ol.format.WFS} WFS format.
   * @export
   */
  get wfsFormat() {
    return this.wfsFormat_;
  }

  /**
   * @return {?ol.format.WMSGetFeatureInfo} WMS format.
   * @export
   */
  get wmsFormat() {
    return this.wmsFormat_;
  }

  // ============================
  // === Other public methods ===
  // ============================

  /**
   * @param {ngeox.datasource.OGC} dataSource Data source.
   * @return {boolean} Whether this data source can be combined to the given
   *     other data source to fetch features in a single WFS request.
   * @export
   * @override
   */
  combinableWithDataSourceForWFS(dataSource) {
    return this.combinableForWFS && dataSource.combinableForWFS &&
      this.supportsWFS && dataSource.supportsWFS &&
      this.queryable && dataSource.queryable &&
      this.wfsUrl === dataSource.wfsUrl &&
      this.haveTheSameActiveDimensions(dataSource);
  }

  /**
   * @param {ngeox.datasource.OGC} dataSource Data source.
   * @return {boolean} Whether this data source can be combined to the given
   *     other data source to fetch features in a single WMS request.
   * @export
   * @override
   */
  combinableWithDataSourceForWMS(dataSource) {
    return this.combinableForWMS && dataSource.combinableForWMS &&
      this.supportsWMS && dataSource.supportsWMS &&
      this.queryable && dataSource.queryable &&
      this.wmsUrl === dataSource.wmsUrl &&
      this.haveTheSameActiveDimensions(dataSource);
  }

  /**
   * Check if there's at least one OGC layer in range of a given resolution.
   * @param {number} res Resolution.
   * @param {boolean} queryableOnly Whether to additionally check if the
   *     OGC layer is queryable as well or not. Defaults to `false`.
   * @return {boolean} At least one OGC layer is in range.
   * @export
   */
  isAnyOGCLayerInRange(res, queryableOnly = false) {
    return !!(this.getInRangeOGCLayerNames(res, queryableOnly).length);
  }

  /**
   * Returns a list of OGC layer names that are in range of a given resolution.
   * If there's no OGC layers defined, an empty array is returned.
   * @param {number} res Resolution.
   * @param {boolean} queryableOnly Whether to additionally check if the
   *     OGC layer is queryable as well or not. Defaults to `false`.
   * @return {Array.<string>} The OGC layer names that are in range.
   * @export
   */
  getInRangeOGCLayerNames(res, queryableOnly = false) {

    const layerNames = [];

    if (this.ogcLayers) {
      for (const ogcLayer of this.ogcLayers) {
        const maxRes = ogcLayer.maxResolution;
        const minRes = ogcLayer.minResolution;
        const inMinRange = minRes === undefined || res >= minRes;
        const inMaxRange = maxRes === undefined || res <= maxRes;
        const inRange = inMinRange && inMaxRange;

        if (inRange && (!queryableOnly || ogcLayer.queryable)) {
          layerNames.push(ogcLayer.name);
        }
      }
    }

    return layerNames;
  }

  /**
   * Returns the list of OGC layer names.
   * @param {boolean} queryableOnly Whether to additionally check if the
   *     OGC layer is queryable as well or not. Defaults to `false`.
   * @return {Array.<string>} The OGC layer names.
   * @export
   */
  getOGCLayerNames(queryableOnly = false) {

    const layerNames = [];

    if (this.ogcLayers) {
      for (const ogcLayer of this.ogcLayers) {
        if (!queryableOnly || ogcLayer.queryable) {
          layerNames.push(ogcLayer.name);
        }
      }
    }

    return layerNames;
  }

  /**
   * Returns the filtrable OGC layer name. This methods asserts that
   * the name exists and is filtrable.
   * @return {string} OGC layer name.
   * @export
   */
  getFiltrableOGCLayerName() {
    googAsserts.assert(this.filtrable);
    const layerNames = this.getOGCLayerNames();
    googAsserts.assert(layerNames.length === 1);
    return layerNames[0];
  }

  /**
   * Loop in the attributes of the data source. Update the `geometryName`
   * property on the first geometry attribute found. If none is found, then
   * the default geometry name is set.
   * @private
   */
  updateGeometryNameFromAttributes_() {
    let geometryName = exports.DEFAULT_GEOMETRY_NAME_;

    if (this.attributes) {
      for (const attribute of this.attributes) {
        if (attribute.type === ngeoFormatAttributeType.GEOMETRY) {
          geometryName = attribute.name;
          break;
        }
      }
    }

    this.geometryName_ = geometryName;
  }

  /**
   * @param {!ngeox.datasource.OGC} dataSource Remote data source to
   *     compare with this one.
   * @return {boolean} Whether the two data sources have the same active
   *     dimensions. If both have no dimensions, they are considered to be
   *     sharing the same dimensions.
   * @export
   * @override
   */
  haveTheSameActiveDimensions(dataSource) {
    let share = true;

    const myActive = this.activeDimensions;
    const itsActive = dataSource.activeDimensions;

    for (const key in myActive) {
      if (myActive[key] !== itsActive[key]) {
        share = false;
        break;
      }
    }

    if (share) {
      for (const key in itsActive) {
        if (itsActive[key] !== myActive[key]) {
          share = false;
          break;
        }
      }
    }

    return share;
  }
};


/**
 * Guess the type of OGC service from a given url. Default returned value is
 * WMS.
 * @param {string} url Url
 * @return {string} Guessed OGC service type.
 */
exports.guessServiceTypeByUrl = function(url) {
  let type;

  if (/(wmts)/i.test(url)) {
    type = exports.Type.WMTS;
  } else {
    type = exports.Type.WMS;
  }

  return type;
};


/**
 * Default name of the geometry attribute.
 * @type {string}
 * @private
 */
exports.DEFAULT_GEOMETRY_NAME_ = 'geom';


/**
 * Available OGC server types.
 * @enum {string}
 */
exports.ServerType = {
  GEOSERVER: 'geoserver',
  MAPSERVER: 'mapserver',
  QGISSERVER: 'qgisserver'
};


/**
 * Available OGC types.
 * @enum {string}
 */
exports.Type = {
  WMS: 'WMS',
  WMTS: 'WMTS'
};


/**
 * Available Feature prefix for WFS requests.
 * @enum {string}
 */
exports.WFSFeaturePrefix = {
  FEATURE: 'feature'
};


/**
 * Available OutputFormat for WFS requests.
 * @enum {string}
 */
exports.WFSOutputFormat = {
  GML2: 'GML2',
  GML3: 'GML3'
};


/**
 * Available InfoFormat for WMS requests.
 * @enum {string}
 */
exports.WMSInfoFormat = {
  GML: 'application/vnd.ogc.gml'
};


export default exports;
