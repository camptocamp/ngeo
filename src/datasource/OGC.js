// The MIT License (MIT)
//
// Copyright (c) 2017-2020 Camptocamp SA
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

import {pushUnlessIncluded} from 'ngeo/array.js';
import ngeoDatasourceDataSource from 'ngeo/datasource/DataSource.js';
import ngeoFilterCondition from 'ngeo/filter/Condition.js';
import ngeoFormatArcGISGeoJSON from 'ngeo/format/ArcGISGeoJSON.js';
import ngeoFormatAttributeType from 'ngeo/format/AttributeType.js';
import olFormatGML2 from 'ol/format/GML2.js';
import olFormatGML3 from 'ol/format/GML3.js';
import olFormatWFS from 'ol/format/WFS.js';
import olFormatWMSGetFeatureInfo from 'ol/format/WMSGetFeatureInfo.js';

/**
 * Dimensions definition.
 * @typedef {Object<string, ?string>} Dimensions
 */

/**
 * Available OGC server types.
 * @enum {string}
 * @hidden
 */
export const ServerType = {
  ARCGIS: 'arcgis',
  GEOSERVER: 'geoserver',
  MAPSERVER: 'mapserver',
  QGISSERVER: 'qgisserver',
};

/**
 * Available OGC types.
 * @enum {string}
 * @hidden
 */
export const Type = {
  WMS: 'WMS',
  WMTS: 'WMTS',
};

/**
 * Available Feature prefix for WFS requests.
 * @enum {string}
 * @private
 * @hidden
 */
const WFSFeaturePrefix = {
  FEATURE: 'feature',
};

/**
 * Available OutputFormat for WFS requests.
 * @enum {string}
 * @hidden
 */
export const WFSOutputFormat = {
  GML2: 'GML2',
  GML3: 'GML3',
};

/**
 * Available InfoFormat for WMS requests.
 * @enum {string}
 * @hidden
 */
export const WMSInfoFormat = {
  GEOJSON: 'application/geojson',
  GML: 'application/vnd.ogc.gml',
};

/**
 * @typedef {Object} DimensionFilterConfig
 * @property {string} field
 * @property {string} [value]
 */

/**
 * Dimensions applied by filters configuration.
 * @typedef {Object<string, DimensionFilterConfig>} DimensionsFiltersConfig
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
 * @property {Array<import('ngeo/rule/Rule.js').default>} [filterRules] A list of filter rules to apply to
 *    this data source using the filter condition.
 * @property {boolean} [filtrable] Whether the data source is filtrable or not.
 * @property {string} [ogcImageType] The type of images to fetch by queries by the (WMS) or (WMTS).
 * @property {WMSLayer[]} [wmsLayers] A list of layer definitions that are used by WMS queries.
 *    These are **not** used by the (WMTS) queries (the wmtsLayers is used by WMTS queries).
 * @property {WFSLayer[]} [wfsLayers] A list of layer definitions that are used by WFS queries.
 *    These are **not** used by the (WMTS) queries (the wmtsLayers is used by WMTS queries).
 * @property {string} [ogcServerType] The type of OGC server.
 * @property {string} [ogcType] The type data source. Can be: 'WMS' or 'WMTS'.
 * @property {?Object<string, Object<string, import('gmf/themes.js').GmfOgcServerAttribute>>} [ogcAttributes]
 *    The attributes of the OGC server.
 * @property {number[]} [queryIconPosition] values to define the shape (bbox) to use to query
 *    the layer. The values are used like a padding in css with 1, 2, 3 or 4 comma separated
 *    values: all / top-bottom, left-right / top, right-left, bottom / top, right, bottom, left.
 * @property {boolean} [snappable] Whether the geometry from this data source can be used to snap the geometry
 *    of features from other data sources that are being edited. Defaults to `false`.
 * @property {boolean} [snappingToEdges] Determines whether external features can be snapped to the edges of
 *    features from this data source or not. Defaults to `true`. Requires `snappable` to be set.
 * @property {boolean} [snappingToVertice] Determines whether external features can be snapped to the
 *    vertice of features from this data source or not. Defaults to `true`. Requires `snappable` to be set.
 * @property {number} [snappingTolerance=10] The tolerance in pixels the snapping should occur.
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
 * @property {Array<import('ngeo/format/Attribute.js').Attribute>} [attributes] (DataSourceOptions)
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
 * @property {boolean|undefined} [getData] If the layer is queryable and this property is set to
 *     false, then the layer won't be used in queries issued. Defaults to `true`.
 */

/**
 * The definition of a single layer (WMS) and/or featureType (WFS).
 *
 * @typedef {Object} WFSLayer
 * @property {number} [maxResolution] The maximum resolution the layer should be rendered (when visible).
 * @property {number} [minResolution] The minimum resolution the layer should be rendered (when visible).
 * @property {string} name The layer name (WMS) and/or feature type name (WFS)
 * @property {boolean} [queryable] Whether the the layer is queryable or not. Defaults to `false`.
 * @property {boolean|undefined} [getData] If the layer is queryable and this property is set to
 *     false, then the layer won't be used in queries issued. Defaults to `true`.
 */

/**
 * Time object
 * @typedef {Object} TimeProperty
 * @property {TimePropertyWidgetEnum} widget
 * @property {string} maxValue
 * @property {string} minValue
 * @property {string} [maxDefValue]
 * @property {string} [minDefValue]
 * @property {TimePropertyModeEnum} mode
 * @property {TimePropertyResolutionEnum} [resolution]
 * @property {string[]} [values]
 * @property {number[]} interval
 */

/**
 * @typedef {Object} TimeRange
 * @property {number} [end]
 * @property {number} start
 */

/**
 * Active dimensions definition, where the value can't be null.
 * @typedef {Object<string, string>} DimensionsActive
 */

/**
 * Default name of the geometry attribute.
 * @type {string}
 * @private
 * @hidden
 */
export const DEFAULT_GEOMETRY_NAME = 'geom';

/**
 * @private
 * @hidden
 */
export class OGC extends ngeoDatasourceDataSource {
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
     * @type {?Array<import("ngeo/rule/Rule.js").default>}
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
     * @type {?WFSLayer[]}
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
     * @type {?Object<string, Object<string, import('gmf/themes.js').GmfOgcServerAttribute>>}
     * @private
     */
    this.ogcAttributes_ = options.ogcAttributes;

    /**
     * Values to define the shape (bbox) to use to query the layer. The values work like a css
     * padding.
     * @type {number[]}
     * @private
     */
    this.queryIconPosition_ = options.queryIconPosition;

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
     * @type {?string}
     */
    this.wfsUrl_ = options.wfsUrl;

    let wmsInfoFormat;
    if (options.wmsInfoFormat) {
      wmsInfoFormat = options.wmsInfoFormat;
    } else {
      if (this.ogcServerType_ === ServerType.ARCGIS) {
        wmsInfoFormat = WMSInfoFormat.GEOJSON;
      } else {
        wmsInfoFormat = WMSInfoFormat.GML;
      }
    }

    /**
     * The InfoFormat to use with WMS requests.
     * @type {string}
     * @private
     */
    this.wmsInfoFormat_ = wmsInfoFormat;

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

    // Get queryable ogc layer names.
    //
    // Note: for wms layer names, both wms and wfs layers are used,
    // because wms can use layer group. When reading the features
    // returned by wms queries, the layer "name" is used in each
    // feature, not the "group". WFS does not use "group".
    const wfsLayerNames = [];
    const wmsLayerNames = [];
    if (this.queryable) {
      const wfsLayers = /** @type {WFSLayer[]} */ (this.wfsLayers || []);
      for (const wfsLayer of wfsLayers) {
        if (wfsLayer.queryable) {
          // WFS layer named is pushed in both wfs and wms lists
          wfsLayerNames.push(wfsLayer.name);
          wmsLayerNames.push(wfsLayer.name);
        }
      }
      const wmsLayers = /** @type {WMSLayer[]} */ (this.wmsLayers || []);
      for (const wmsLayer of wmsLayers) {
        if (wmsLayer.queryable) {
          pushUnlessIncluded(wmsLayerNames, wmsLayer.name);
        }
      }
    }

    let wfsFormat = null;
    if (this.supportsWFS && wfsLayerNames.length) {
      let format;
      if (this.wfsOutputFormat_ === WFSOutputFormat.GML3) {
        format = new olFormatGML3();
      } else if (this.wfsOutputFormat_ === WFSOutputFormat.GML2) {
        format = new olFormatGML2();
      } else {
        throw new Error('Unknown GML output version');
      }
      wfsFormat = new olFormatWFS({
        featureNS: this.wfsFeatureNS,
        featureType: wfsLayerNames,
        gmlFormat: format,
      });
    }

    /**
     * @type {?import("ol/format/WFS.js").default}
     * @private
     */
    this.wfsFormat_ = wfsFormat;

    let wmsFormat = null;
    if (this.supportsWMS && wmsLayerNames.length) {
      if (this.wmsInfoFormat === WMSInfoFormat.GML) {
        wmsFormat = new olFormatWMSGetFeatureInfo({
          layers: wmsLayerNames,
        });
      } else if (this.wmsInfoFormat === WMSInfoFormat.GEOJSON) {
        if (this.ogcServerType_ === ServerType.ARCGIS) {
          wmsFormat = new ngeoFormatArcGISGeoJSON({
            layers: wmsLayerNames,
          });
        }
      }
    }

    /**
     * @type {?olFormatWMSGetFeatureInfo|ngeoFormatArcGISGeoJSON}
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
    /** @type {?TimeRange} */
    let range = null;
    const lower = this.timeLowerValue;
    const upper = this.timeUpperValue;
    if (lower !== undefined) {
      range = {
        start: lower,
      };
      if (upper != undefined) {
        range.end = upper;
      }
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
   * @param {Array<import('ngeo/format/Attribute.js').Attribute>} attributes Attributes
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
   * @param {string=} layer The layer name.
   * @return {?string} Geometry name
   */
  geometryName(layer) {
    let geometryName = null;

    if (layer && this.ogcAttributes_) {
      const attributes = this.ogcAttributes_[layer];
      for (const attribute in attributes) {
        if (attributes[attribute].namespace == 'http://www.opengis.net/gml') {
          geometryName = attribute;
          break;
        }
      }
    }

    if (!geometryName) {
      geometryName = this.geometryName_;
    }

    return geometryName;
  }

  /**
   * @return {string} OGC image type
   */
  get ogcImageType() {
    return this.ogcImageType_;
  }

  /**
   * @return {?WMSLayer[]} WMS layers
   */
  get wmsLayers() {
    return this.wmsLayers_;
  }

  /**
   * @return {?Array<WFSLayer>} WFS layers
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
   * @return {number[]} The queryIconPosition
   */
  get queryIconPosition() {
    return this.queryIconPosition_;
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
   * @return {?string} WFS url
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
   * @return {DimensionsActive} Active dimensions
   */
  get activeDimensions() {
    /** @type {DimensionsActive} */
    const active = {};
    const dimensions = this.dimensions_ || /** @type {Dimensions} */ ({});
    const config = this.dimensionsConfig || /** @type {Dimensions} */ ({});

    for (const key in config) {
      const configValue = config[key];
      if (configValue === null) {
        const value = dimensions[key];
        if (value !== undefined && value !== null) {
          active[key] = value;
        }
      } else {
        active[key] = configValue;
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
   * Returns the ogc attributes of only the WFS layers of this data
   * source that are queryable.
   *
   * @return {?Object<string, import('gmf/themes.js').GmfOgcServerAttribute>}
   */
  get ogcAttributesWFS() {
    // (1) Collect queryable WFS layer names
    const wfsLayerNames = []; // that are querayble
    for (const wfsLayer of this.wfsLayers_) {
      if (wfsLayer.queryable) {
        wfsLayerNames.push(wfsLayer.name);
      }
    }

    // (2) Get attribute of those layers only
    return this.getCommonOGCAttributes_(wfsLayerNames);
  }

  /**
   * Returns the ogc attributes of only the WMS layers of this data
   * source that are queryable.
   *
   * @return {?Object<string, import('gmf/themes.js').GmfOgcServerAttribute>}
   */
  get ogcAttributesWMS() {
    // (1) Collect queryable WMS layer names
    const wmsLayerNames = []; // that are querayble
    for (const wmsLayer of this.wmsLayers_) {
      if (wmsLayer.queryable) {
        wmsLayerNames.push(wmsLayer.name);
      }
    }

    // (2) Get attribute of those layers only
    return this.getCommonOGCAttributes_(wmsLayerNames);
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
    return (
      this.attributes !== null ||
      (this.supportsWFS &&
        this.wfsLayers !== null &&
        this.wfsLayers.length === 1 &&
        this.wfsLayers[0].queryable === true)
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
   * @return {?olFormatWMSGetFeatureInfo|ngeoFormatArcGISGeoJSON} WMS format.
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
    return (
      this.combinableForWFS &&
      dataSource.combinableForWFS &&
      this.supportsWFS &&
      dataSource.supportsWFS &&
      this.queryable &&
      dataSource.queryable &&
      this.wfsUrl === dataSource.wfsUrl &&
      this.haveTheSameActiveDimensions(dataSource) &&
      this.haveTheSameActiveDimensionsFilters(dataSource)
    );
  }

  /**
   * @param {OGC} dataSource Data source.
   * @return {boolean} Whether this data source can be combined to the given
   *     other data source to fetch features in a single WMS request.
   * @override
   */
  combinableWithDataSourceForWMS(dataSource) {
    return (
      this.combinableForWMS &&
      dataSource.combinableForWMS &&
      this.supportsWMS &&
      dataSource.supportsWMS &&
      this.queryable &&
      dataSource.queryable &&
      this.wmsUrl === dataSource.wmsUrl &&
      this.haveTheSameActiveDimensions(dataSource)
    );
  }

  /**
   * Check if there's at least one OGC layer in range of a given resolution.
   * @param {number} res Resolution.
   * @param {boolean} queryableOnly Whether to additionally check if the
   *     OGC layer is queryable as well or not. Defaults to `false`.
   * @return {boolean} At least one OGC layer is in range.
   */
  isAnyOGCLayerInRange(res, queryableOnly = false) {
    return !!this.getInRangeWFSLayerNames(res, queryableOnly).length;
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
        if (!queryableOnly || (wmsLayer.queryable && wmsLayer.getData !== false)) {
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
   * @return {string[]} The WFS layer names that are in range.
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

        if (inRange && (!queryableOnly || (wfsLayer.queryable && wfsLayer.getData !== false))) {
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
   * @return {string[]} The WFS layer names.
   */
  getWFSLayerNames(queryableOnly = false) {
    const layerNames = [];

    if (this.wfsLayers) {
      for (const wfsLayer of this.wfsLayers) {
        if (!queryableOnly || (wfsLayer.queryable && wfsLayer.getData !== false)) {
          layerNames.push(wfsLayer.name);
        }
      }
    }

    return layerNames;
  }

  /**
   * Returns the filtrable WFS layer name.
   *
   * Although a data source may contain multiple WFS wfs layers, only
   * the first one is returned. We don't need to return more than one,
   * since in that case a group is used in the WMS GetMap query, and
   * each queryable layers will end up being used in WFS GetData
   * queries sent.
   *
   * @return {string} WFS layer name.
   */
  getFiltrableWFSLayerName() {
    if (!this.filtrable) {
      throw new Error('Missing filtrable');
    }
    const layerNames = this.getWFSLayerNames(true);
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
   * @param {OGC} dataSource Remote data source to
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

  /**
   * Compare active dimensions filters of two data sources. As Openlayers
   * WFS format does not allow constructing multiple typenames GetFeature
   * request with different filters we need to combine data sources depending
   * on active dimensions filters.
   * @param {!OGC} dataSource Remote data source to
   *     compare with this one.
   * @return {boolean} Whether the two data sources have the same active
   *     dimensions filters. If both have no dimensions, they are considered
   *     to be sharing the same dimensions filters.
   * @export
   * @override
   */
  haveTheSameActiveDimensionsFilters(dataSource) {
    const myConfig = this.dimensionsFiltersConfig || /** @type {DimensionsFiltersConfig} */ ({});
    const itsConfig = dataSource.dimensionsFiltersConfig || /** @type {DimensionsFiltersConfig} */ ({});

    /**
     * @param {string} key
     */
    const equals = (key) => {
      const myKeyConfig = myConfig[key];
      const itsKeyConfig = itsConfig[key];
      if (myKeyConfig === undefined || itsKeyConfig === undefined) {
        return false;
      }

      if (myKeyConfig.field != itsKeyConfig.field) {
        return false;
      }

      const myValue = myKeyConfig.value !== null ? myKeyConfig.value : this.dimensions[key];
      const itsValue = itsKeyConfig.value !== null ? itsKeyConfig.value : dataSource.dimensions[key];
      if (myValue != itsValue) {
        return false;
      }

      return true;
    };

    for (const key in this.dimensionsFiltersConfig) {
      if (!equals(key)) {
        return false;
      }
    }
    for (const key in dataSource.dimensionsFiltersConfig) {
      if (!equals(key)) {
        return false;
      }
    }
    return true;
  }

  // ===============================
  // === Private utility methods ===
  // ===============================

  /**
   * Collect the ogc attributes that are shared among the given
   * layers, i.e. only the attributes that are in all the given layers
   * are returned.
   *
   * Among the attributes, geometry columns are returned as
   * well. Therefore, if there are no attributes with a geometry name
   * returned, then the Filter tool have the possibilily to filter the
   * data source using spatial filters.
   *
   * @param {Array<string>} layerNames List of layer names
   * @return {?Object<string, import('gmf/themes.js').GmfOgcServerAttribute>}
   */
  getCommonOGCAttributes_(layerNames) {
    const allLayersAttributes = this.ogcAttributes_;

    // No need to do anything if there's no ogcAttributes set, or if
    // there are no layer names given
    if (!allLayersAttributes || !layerNames.length) {
      return null;
    }

    // Build a list of layer each represented by a list of their attributes
    const layersAttributes = [];
    for (const layerName of layerNames) {
      const layerAttributes = allLayersAttributes[layerName];
      if (layerAttributes) {
        layersAttributes.push(layerAttributes);
      }
    }

    // If there were no layer found, then no need to do anything else
    if (!layersAttributes.length) {
      return null;
    }

    // List of common attributes
    const attributes = /** @type {Object<string, import('gmf/themes.js').GmfOgcServerAttribute>} */ ({});

    // Collect the attributes that are in shared among all the layers
    const firstLayerAttributes = layersAttributes.shift();
    for (const firstLayerAttributeName in firstLayerAttributes) {
      const firstLayerAttribute = firstLayerAttributes[firstLayerAttributeName];
      let shouldPushAttribute = true;
      for (const layerAttributes of layersAttributes) {
        if (!layerAttributes[firstLayerAttributeName]) {
          shouldPushAttribute = false;
          break;
        }
      }
      if (shouldPushAttribute) {
        attributes[firstLayerAttributeName] = firstLayerAttribute;
      }
    }

    return attributes;
  }
}

/**
 * Guess the type of OGC service from a given url. Default returned value is WMS.
 * @param {string} url URL
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
  DATEPICKER: 'datepicker',
};

/**
 * Mode of the widget
 * @enum {string}
 * @hidden
 */
export const TimePropertyModeEnum = {
  RANGE: 'range',
  VALUE: 'value',
  DISABLED: 'disabled',
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
  SECOND: 'second',
};

export default OGC;
