import ngeoDatasourceDataSource from 'ngeo/datasource/DataSource.js';
import ngeoFilterCondition from 'ngeo/filter/Condition.js';
import ngeoFormatAttributeType from 'ngeo/format/AttributeType.js';
import olFormatGML2 from 'ol/format/GML2.js';
import olFormatGML3 from 'ol/format/GML3.js';
import olFormatWFS from 'ol/format/WFS.js';
import olFormatWMSGetFeatureInfo from 'ol/format/WMSGetFeatureInfo.js';


/**
 * Dimensions definition.
 * @typedef {Object.<string, ?string>} Dimensions
 */


/**
 * Available OGC server types.
 * @enum {string}
 * @hidden
 */
export const ServerType = {
  GEOSERVER: 'geoserver',
  MAPSERVER: 'mapserver',
  QGISSERVER: 'qgisserver'
};


/**
 * Available OGC types.
 * @enum {string}
 * @hidden
 */
export const Type = {
  WMS: 'WMS',
  WMTS: 'WMTS'
};


/**
 * Available Feature prefix for WFS requests.
 * @enum {string}
 * @private
 * @hidden
 */
const WFSFeaturePrefix = {
  FEATURE: 'feature'
};


/**
 * Available OutputFormat for WFS requests.
 * @enum {string}
 * @hidden
 */
export const WFSOutputFormat = {
  GML2: 'GML2',
  GML3: 'GML3'
};


/**
 * Available InfoFormat for WMS requests.
 * @enum {string}
 * @hidden
 */
export const WMSInfoFormat = {
  GML: 'application/vnd.ogc.gml'
};


/**
 * @typedef {Object} DimensionFilterConfig
 * @property {string} field
 * @property {string} [value]
 */


/**
* Dimensions applied by filters configuration.
* @typedef {Object.<string, DimensionFilterConfig>} DimensionsFiltersConfig
*/


/**
 * The options required to create a `OGC`.
 *
 * extends DataSourceOptions
 * @typedef {Object} OGCOptions
 * @property {Dimensions} [activeDimensions] The dimensions that are currently active on the data source.
 * @property {boolean} [copyable] Whether the geometry from this data source can be copied to other data
 *    sources or not. Defaults to `false`.
 * @property {Dimensions} [dimensions] A reference to the dimensions.
 * @property {Dimensions} [dimensionsConfig] The dimensions configuration, which determines those supported
 *    by this data source and whether they should use a static value or the one defined in the dimensions.
 * @property {string} [filterCondition] The filter condition to apply to the filter rules (if any).
 *    Defaults to `ngeo.filter.Condition.AND`.
 * @property {!Array.<!import('ngeo/rule/Rule.js').default>} [filterRules] A list of filter rules to apply to
 *    this data source using the filter condition.
 * @property {boolean} [filtrable] Whether the data source is filtrable or not.
 * @property {string} [ogcImageType] The type of images to fetch by queries by the (WMS) or (WMTS).
 * @property {Array<WMSLayer>} [wmsLayers] A list of layer definitions that are used by WMS queries.
 *    These are **not** used by the (WMTS) queries (the wmtsLayers is used by WMTS queries).
 * @property {Array<WFSLayer>} [wfsLayers] A list of layer definitions that are used by WFS queries.
 *    These are **not** used by the (WMTS) queries (the wmtsLayers is used by WMTS queries).
 * @property {string} [ogcServerType] The type of OGC server.
 * @property {string} [ogcType] The type data source. Can be: 'WMS' or 'WMTS'.
 * @property {Object<string, Object<string, import('gmf/themes.js').GmfOgcServerAttribute>>} [ogcAttributes]
 *    The attributes of the OGC server.
 * @property {boolean} [snappable] Whether the geometry from this data source can be used to snap the geometry
 *    of features from other data sources that are being edited. Defaults to `false`.
 * @property {boolean} [snappingToEdges] Determines whether external features can be snapped to the edges of
 *    features from this data source or not. Defaults to `true`. Requires `snappable` to be set.
 * @property {boolean} [snappingToVertice] Determines whether external features can be snapped to the
 *    vertice of features from this data source or not. Defaults to `true`. Requires `snappable` to be set.
 * @property {number} [snappingTolerance=10] The tolerance in pixels the snapping should occur.
 * @property {boolean} [snappingInvertXY=false] Whether to switch X and Y coordinates
 * @property {string} [timeAttributeName]  The name of the time attribute.
 * @property {number} [timeLowerValue] The time lower value, which can be combined with the time upper value
 *    to determine a range.
 * @property {TimeProperty} [timeProperty] The time property for the data source. Used to apply time filters.
 * @property {number} [timeUpperValue] The time upper value, which can be combined with the time lower value
 *    to determine a range.
 * @property {string} [wfsFeatureNS] The feature namespace to use with WFS requests.
 * @property {string} [wfsFeaturePrefix] The feature prefix to use with WFS requests.
 * @property {string} [wfsOutputFormat] The OutputFormat to use with WFS requests.
 * @property {string} [wfsUrl] The URL to use for (WFS) requests.
 * @property {string} [wmsInfoFormat] The InfoFormat to use with WMS requests.
 * @property {boolean} [wmsIsSingleTile] Whether the (WMS) images returned by this data source should be
 *    single tiles or not. Defaults to `false`
 * @property {string} [wmsUrl] The URL to use for (WMS) requests.
 * @property {string} [wmtsLayer] The layer name to use for the (WMTS) requests.
 * @property {string} [wmtsUrl] The URL to use for (WMTS) requests.
 * @property {Array.<import('ngeo/format/Attribute.js').Attribute>} [attributes] (DataSourceOptions)
 * @property {DimensionsFiltersConfig} [dimensionsFiltersConfig] (DataSourceOptions)
 * @property {number} id (DataSourceOptions)
 * @property {string} [identifierAttribute] (DataSourceOptions)
 * @property {boolean} [inRange] (DataSourceOptions)
 * @property {number} [minResolution] (DataSourceOptions)
 * @property {number} [maxResolution] (DataSourceOptions)
 * @property {string} name (DataSourceOptions)
 * @property {boolean} [visible=false] (DataSourceOptions)
 */


/**
 * The definition of a single layer (WMS) and/or featureType (WFS).
 *
 * @typedef {Object} WMSLayer
 * @property {string} name The layer name (WMS) and/or feature type name (WFS)
 * @property {boolean} [queryable] Whether the the layer is queryable or not. Defaults to `false`.
 */


/**
 * The definition of a single layer (WMS) and/or featureType (WFS).
 *
 * @typedef {Object} WFSLayer
 * @property {number} [maxResolution] The maximum resolution the layer should be rendered (when visible).
 * @property {number} [minResolution] The minimum resolution the layer should be rendered (when visible).
 * @property {string} name The layer name (WMS) and/or feature type name (WFS)
 * @property {boolean} [queryable] Whether the the layer is queryable or not. Defaults to `false`.
 */


/**
 * Time object
 * @typedef {Object} TimeProperty
 * @property {TimePropertyWidgetEnum} widget
 * @property {string} maxValue
 * @property {string} minValue
 * @property {string|null} maxDefValue
 * @property {string|null} minDefValue
 * @property {TimePropertyModeEnum} mode
 * @property {TimePropertyResolutionEnum} [resolution]
 * @property {Array<string>} [values]
 * @property {Array<number>} interval
 */


/**
 * @typedef {Object} TimeRange
 * @property {number} [end]
 * @property {number} start
 */


/**
 * Active dimensions definition, where the value can't be null.
 * @typedef {Object.<string, string>} DimensionsActive
 */


/**
 * Default name of the geometry attribute.
 * @type {string}
 * @private
 * @hidden
 */
const DEFAULT_GEOMETRY_NAME = 'geom';


/**
 * @private
 * @hidden
 */
class OGC extends ngeoDatasourceDataSource {

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
   * @param {OGCOptions} options Options.
   */
  constructor(options) {

    super(options);

    // === DYNAMIC properties (i.e. that can change / be watched) ===

    /**
     * The dimensions configuration for the data source.
     * @type {?Dimensions}
     */
    this.dimensionsConfig = options.dimensionsConfig || null;

    /**
     * The dimensions applied by filters configuration for the data source.
     * @type {?DimensionsFiltersConfig}
     */
    this.dimensionsFiltersConfig = options.dimensionsFiltersConfig || null;

    /**
     * The filter condition to apply to the filter rules (if any).
     * @type {string}
     */
    this.filterCondition_ = options.filterCondition || ngeoFilterCondition.AND;

    /**
     * A list of filter rules to apply to this data source using the filter
     * condition.
     * @type {?Array.<!import("ngeo/rule/Rule.js").default>}
     */
    this.filterRules = options.filterRules || null;

    /**
     * Whether the data source is filtrable or not. When `null`, that means
     * that we do not know if the data source if filtrable or not, yet. In
     * that case, the value of the property needs to be determined from an
     * external way.
     * @type {?boolean}
     */
    this.filtrable = options.filtrable || null;


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
     * @type {?Dimensions}
     * @private
     */
    this.dimensions_ = options.dimensions || null;

    /**
     * The name of the geometry attribute.
     * @type {string}
     * @private
     */
    this.geometryName_ = DEFAULT_GEOMETRY_NAME;

    /**
     * The type of images to fetch by queries by the (WMS) or (WMTS) .
     * @type {string}
     * @private
     */
    this.ogcImageType_ = options.ogcImageType || 'image/png';

    /**
     * A list of layer definitions that are used by WMS queries.
     * These are **not** used by the (WMTS) queries (the wmtsLayers is used
     * by WMTS queries).
     * @type {?Array<WMSLayer>}
     * @private
     */
    this.wmsLayers_ = options.wmsLayers || null;

    /**
     * A list of layer definitions that are used by WFS queries.
     * These are **not** used by the (WMTS) queries (the wmtsLayers is used
     * by WMTS queries).
     * @type {?Array<WFSLayer>}
     * @private
     */
    this.wfsLayers_ = options.wfsLayers || null;

    /**
     * The type of OGC server making the requests.
     * @type {string}
     * @private
     */
    this.ogcServerType_ = options.ogcServerType || ServerType.MAPSERVER;

    /**
     * The type data source. Can be: 'WMS' or 'WMTS'.
     * @type {string}
     * @private
     */
    this.ogcType_ = options.ogcType || Type.WMS;

    /**
     * The attributes of the OGC server.
     * @type {Object<string, Object<string, import('gmf/themes.js').GmfOgcServerAttribute>>}
     * @private
     */
    this.ogcAttributes_ = options.ogcAttributes;

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
     * Determines whether to switch X and Y coordinates upon reading a GML formatted
     * getFeature request
     * @type {boolean}
     * @private
     */
    this.snappingInvertXY_ = options.snappingInvertXY === true;

    /**
     * The name of the time attribute.
     * @type {string|undefined}
     * @private
     */
    this.timeAttributeName_ = options.timeAttributeName;

    /**
     * Time lower value.
     * @type {number|undefined}
     */
    this.timeLowerValue = options.timeLowerValue;

    /**
     * @type {?TimeProperty}
     * @private
     */
    this.timeProperty_ = options.timeProperty !== undefined ? options.timeProperty : null;

    /**
     * Time upper value.
     * @type {number|undefined}
     * @private
     */
    this.timeUpperValue = options.timeUpperValue;

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
    this.wfsFeaturePrefix_ = options.wfsFeaturePrefix || WFSFeaturePrefix.FEATURE;

    /**
     * The OutputFormat to use with WFS requests.
     * @type {string}
     * @private
     */
    this.wfsOutputFormat_ = options.wfsOutputFormat || WFSOutputFormat.GML3;

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
    this.wmsInfoFormat_ = options.wmsInfoFormat || WMSInfoFormat.GML;

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
    const wfsLayers = [];
    if (this.queryable && this.wfsLayers) {
      for (const wfsLayer of this.wfsLayers) {
        if (wfsLayer.queryable) {
          wfsLayers.push(wfsLayer.name);
        }
      }
    }
    const wmsLayers = [];
    if (this.queryable) {
      for (const wmsLayer of (this.wmsLayers || [])) {
        if (wmsLayer.queryable) {
          wmsLayers.push(wmsLayer.name);
        }
      }
      for (const wfsLayer of this.wfsLayers || []) {
        if (wfsLayer.queryable) {
          wmsLayers.push(wfsLayer.name);
        }
      }
    }

    let wfsFormat = null;
    if (this.supportsWFS && wfsLayers.length) {
      let format;
      if (this.wfsOutputFormat_ === WFSOutputFormat.GML3) {
        format = new olFormatGML3();
      } else if (this.wfsOutputFormat_ === WFSOutputFormat.GML2) {
        format = new olFormatGML2();
      }
      console.assert(format);
      wfsFormat = new olFormatWFS({
        featureNS: this.wfsFeatureNS,
        featureType: wfsLayers,
        gmlFormat: format
      });
    }

    /**
     * @type {?import("ol/format/WFS.js").default}
     * @private
     */
    this.wfsFormat_ = wfsFormat;

    let wmsFormat = null;
    if (this.supportsWMS && wmsLayers.length) {
      if (this.wmsInfoFormat === WMSInfoFormat.GML) {
        wmsFormat = new olFormatWMSGetFeatureInfo({
          layers: wmsLayers
        });
      }
      // Todo, support more formats for WMS
    }

    /**
     * @type {?import("ol/format/WMSGetFeatureInfo.js").default}
     * @private
     */
    this.wmsFormat_ = wmsFormat;
  }

  // ========================================
  // === Dynamic property getters/setters ===
  // ========================================
  /**
   * @return {?Dimensions} Current dimensions to use for this data source
   */
  get dimensions() {
    return this.dimensions_;
  }

  /**
   * @return {string} Filter condition
   */
  get filterCondition() {
    return this.filterCondition_;
  }

  /**
   * @param {string} filterCondition Filter condition
   */
  set filterCondition(filterCondition) {
    this.filterCondition_ = filterCondition;
  }

  /**
   * @return {?TimeRange} Time range value
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
   * @param {?TimeRange} range Time range value
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

  // =======================================
  // === Static property getters/setters ===
  // =======================================

  /**
   * @inheritDoc
   */
  setAttributes(attributes) {
    super.setAttributes(attributes);
    this.updateGeometryNameFromAttributes_();
  }

  /**
   * @return {boolean} Copyable
   */
  get copyable() {
    return this.copyable_;
  }

  /**
   * @param {?string} layer The layer name.
   * @return {?string} Geometry name
   */
  geometryName(layer) {
    if (!this.ogcAttributes_ || !layer) {
      return this.geometryName_;
    }
    const attributes = this.ogcAttributes_[layer];
    for (const attribute in attributes) {
      if (attributes[attribute].namespace == 'http://www.opengis.net/gml') {
        return attribute;
      }
    }
    return this.geometryName_;
  }

  /**
   * @return {string} OGC image type
   */
  get ogcImageType() {
    return this.ogcImageType_;
  }

  /**
   * @return {?Array<WMSLayer>} WMS layers
   */
  get wmsLayers() {
    return this.wmsLayers_;
  }

  /**
   * @return {?Array<WFSLayer>} TFS layers
   */
  get wfsLayers() {
    return this.wfsLayers_;
  }

  /**
   * @return {string} OGC server type
   */
  get ogcServerType() {
    return this.ogcServerType_;
  }

  /**
   * @return {string} OGC type
   */
  get ogcType() {
    return this.ogcType_;
  }

  /**
   * @return {boolean} Snappable
   */
  get snappable() {
    return this.snappable_;
  }

  /**
   * @return {boolean} Snapping to edges
   */
  get snappingToEdges() {
    return this.snappingToEdges_;
  }

  /**
   * @return {boolean} Snapping to vertices
   */
  get snappingToVertice() {
    return this.snappingToVertice_;
  }

  /**
   * @return {number} Snapping tolerance
   */
  get snappingTolerance() {
    return this.snappingTolerance_;
  }

  /**
   * @return {boolean} InvertXY
   */
  get snappingInvertXY() {
    return this.snappingInvertXY_;
  }

  /**
   * @return {string|undefined} Time attribute name
   */
  get timeAttributeName() {
    return this.timeAttributeName_;
  }

  /**
   * @return {?TimeProperty} Time property
   */
  get timeProperty() {
    return this.timeProperty_;
  }

  /**
   * @return {string} WFS feature namespace
   */
  get wfsFeatureNS() {
    return this.wfsFeatureNS_;
  }

  /**
   * @return {string} WFS feature prefix
   */
  get wfsFeaturePrefix() {
    return this.wfsFeaturePrefix_;
  }

  /**
   * @return {string} WFS output format
   */
  get wfsOutputFormat() {
    return this.wfsOutputFormat_;
  }

  /**
   * @return {string|undefined} WFS url
   */
  get wfsUrl() {
    return this.wfsUrl_;
  }

  /**
   * @return {string} WMS info format
   */
  get wmsInfoFormat() {
    return this.wmsInfoFormat_;
  }

  /**
   * @return {boolean} WMS is single tile
   */
  get wmsIsSingleTile() {
    return this.wmsIsSingleTile_;
  }

  /**
   * @return {string|undefined} WMS url
   * @override
   */
  get wmsUrl() {
    return this.wmsUrl_;
  }

  /**
   * @return {string|undefined} WMTS layer
   */
  get wmtsLayer() {
    return this.wmtsLayer_;
  }

  /**
   * @return {string|undefined} WMTS url
   * @override
   */
  get wmtsUrl() {
    return this.wmtsUrl_;
  }

  // ===================================
  // === Calculated property getters ===
  // ===================================

  /**
   * @return {!DimensionsActive} Active dimensions
   */
  get activeDimensions() {
    /** @type {DimensionsActive} */
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
   * @override
   */
  get combinableForWFS() {
    return this.filterRules === null && this.timeRangeValue === null;
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
   * @override
   */
  get combinableForWMS() {
    return this.filterRules === null && this.timeRangeValue === null;
  }

  /**
   * Whether the data source is queryable or not. For an OGC data source to be
   * queryable, it requires the support of WFS or WMS and at least one ogc
   * layer to be querable.
   */
  get queryable() {
    let queryable = false;
    if (this.supportsWFS && this.wfsLayers) {
      for (const wfsLayer of this.wfsLayers) {
        if (wfsLayer.queryable === true) {
          queryable = true;
          break;
        }
      }
    }
    if (this.supportsWMS && this.wmsLayers && this.wmsLayers.length > 0) {
      queryable = true;
    }
    return queryable;
  }

  /**
   * @return {boolean} Whether the data source supports making WFS requests
   *     or not.
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
   */
  get supportsAttributes() {
    return this.attributes !== null || (
      this.supportsWFS &&
      this.wfsLayers !== null &&
      this.wfsLayers.length === 1 &&
      this.wfsLayers[0].queryable === true
    );
  }

  /**
   * @return {boolean} Whether the data source supports making WMS requests
   *     or not.
   * @override
   */
  get supportsWMS() {
    return this.wmsUrl !== undefined;
  }

  /**
   * @return {boolean} Whether the data source supports making WTMS requests
   *     or not.
   */
  get supportsWMTS() {
    return this.wmtsUrl !== undefined;
  }

  /**
   * @return {?import("ol/format/WFS.js").default} WFS format.
   */
  get wfsFormat() {
    return this.wfsFormat_;
  }

  /**
   * @return {?import("ol/format/WMSGetFeatureInfo.js").default} WMS format.
   */
  get wmsFormat() {
    return this.wmsFormat_;
  }

  // ============================
  // === Other public methods ===
  // ============================

  /**
   * @param {OGC} dataSource Data source.
   * @return {boolean} Whether this data source can be combined to the given
   *     other data source to fetch features in a single WFS request.
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
   * @param {OGC} dataSource Data source.
   * @return {boolean} Whether this data source can be combined to the given
   *     other data source to fetch features in a single WMS request.
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
   */
  isAnyOGCLayerInRange(res, queryableOnly = false) {
    return !!(this.getInRangeWFSLayerNames(res, queryableOnly).length);
  }

  /**
   * Returns the list of WMS layer names.
   * @param {boolean} queryableOnly Whether to additionally check if the
   *     WMS layer is queryable as well or not. Defaults to `false`.
   * @return {Array<string>} The WMS layer names.
   */
  getWMSLayerNames(queryableOnly = false) {

    const layerNames = [];

    if (this.wmsLayers) {
      for (const wmsLayer of this.wmsLayers) {
        if (!queryableOnly || wmsLayer.queryable) {
          layerNames.push(wmsLayer.name);
        }
      }
    }

    return layerNames;
  }

  /**
   * Returns a list of WFS layer names that are in range of a given resolution.
   * If there's no WFS layers defined, an empty array is returned.
   * @param {number} res Resolution.
   * @param {boolean} queryableOnly Whether to additionally check if the
   *     WFS layer is queryable as well or not. Defaults to `false`.
   * @return {Array<string>} The WFS layer names that are in range.
   */
  getInRangeWFSLayerNames(res, queryableOnly = false) {

    const layerNames = [];

    if (this.wfsLayers) {
      for (const wfsLayer of this.wfsLayers) {
        const maxRes = wfsLayer.maxResolution;
        const minRes = wfsLayer.minResolution;
        const inMinRange = minRes === undefined || res >= minRes;
        const inMaxRange = maxRes === undefined || res <= maxRes;
        const inRange = inMinRange && inMaxRange;

        if (inRange && (!queryableOnly || wfsLayer.queryable)) {
          layerNames.push(wfsLayer.name);
        }
      }
    }

    return layerNames;
  }

  /**
   * Returns the list of WFS layer names.
   * @param {boolean} queryableOnly Whether to additionally check if the
   *     WFS layer is queryable as well or not. Defaults to `false`.
   * @return {Array<string>} The WFS layer names.
   */
  getWFSLayerNames(queryableOnly = false) {

    const layerNames = [];

    if (this.wfsLayers) {
      for (const wfsLayer of this.wfsLayers) {
        if (!queryableOnly || wfsLayer.queryable) {
          layerNames.push(wfsLayer.name);
        }
      }
    }

    return layerNames;
  }

  /**
   * Returns the filtrable WFS layer name. This methods asserts that
   * the name exists and is filtrable.
   * @return {string} WFS layer name.
   */
  getFiltrableWFSLayerName() {
    console.assert(this.filtrable);
    const layerNames = this.getWFSLayerNames();
    console.assert(layerNames.length === 1);
    return layerNames[0];
  }

  /**
   * Loop in the attributes of the data source. Update the `geometryName`
   * property on the first geometry attribute found. If none is found, then
   * the default geometry name is set.
   * @private
   */
  updateGeometryNameFromAttributes_() {
    if (this.attributes) {
      for (const attribute of this.attributes) {
        if (attribute.type === ngeoFormatAttributeType.GEOMETRY) {
          this.geometryName_ = attribute.name;
          break;
        }
      }
    }
  }

  /**
   * @param {!OGC} dataSource Remote data source to
   *     compare with this one.
   * @return {boolean} Whether the two data sources have the same active
   *     dimensions. If both have no dimensions, they are considered to be
   *     sharing the same dimensions.
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
}


/**
 * Guess the type of OGC service from a given url. Default returned value is WMS.
 * @param {string} url Url
 * @return {string} Guessed OGC service type.
 * @hidden
 */
export function guessServiceTypeByUrl(url) {
  let type;

  if (/(wmts)/i.test(url)) {
    type = Type.WMTS;
  } else {
    type = Type.WMS;
  }

  return type;
}


/**
 * Enum for the time property widget
 * Type of the widget to use
 * @enum {string}
 * @hidden
 */
export const TimePropertyWidgetEnum = {
  SLIDER: 'slider',
  DATEPICKER: 'datepicker'
};

/**
 * Mode of the widget
 * @enum {string}
 * @hidden
 */
export const TimePropertyModeEnum = {
  RANGE: 'range',
  VALUE: 'value',
  DISABLED: 'disabled'
};

/**
 * resolution of the widget
 * @enum {string}
 * @hidden
 */
export const TimePropertyResolutionEnum = {
  DAY: 'day',
  MONTH: 'month',
  YEAR: 'year',
  SECOND: 'second'
};

export default OGC;
