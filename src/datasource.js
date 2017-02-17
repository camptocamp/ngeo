// TODO == Dynamic Properties ==
// TODO  - filterCondition (and, or, not)
// TODO  - filterRules (array of rules)
//
// TODO == Static Properties ==
// TODO  - filterRuleDefinitions
// TODO  - group

goog.provide('ngeo.DataSource');

goog.require('ol.format.WFS');
goog.require('ol.format.WMSGetFeatureInfo');


ngeo.DataSource = class {

  /**
   * A `ngeo.DataSource` represents a single source of data, which can combine
   * different type of servers to display or fetch the data. It can serve
   * as a point of entry to get all the information about a single data
   * source.
   *
   * You can use the information in a data source to do all sorts of things:
   *  - create `ol.layer.Layer` objects using the WMS, WMTS or even WFS
   *    information
   *  - issue WMS/WFS queries
   *  - know whether the data is visible or not
   *  - apply filter rules on it
   *
   * @struct
   * @param {ngeox.DataSourceOptions} options Options.
   */
  constructor(options) {

    // === DYNAMIC properties (i.e. that can change / be watched ===

    /**
     * The dimensions that are currently active on the data source.
     * @type {?Object.<string, string>}
     * @private
     */
    this.activeDimensions_ = options.activeDimensions || null;

    /**
     * A data source is considered 'in range' when it is synchronized to
     * a map view and the resolution of that view is within the range of
     * the `maxResolution` and `minResolution`. These 2 properties are
     * required for the `inRange` property to be dynamic, otherwise its
     * value is always `true` by default.
     *
     * The synchronization is made in the `ngeo.syncDataSourcesMap` service.
     *
     * @type {boolean}
     * @private
     */
    this.inRange_ = options.inRange !== false;

    /**
     * Whether the data source is visible or not, i.e. whether its is ON or OFF.
     * Defaults to `false`.
     * @type {boolean}
     * @private
     */
    this.visible_ = options.visible === true;


    // === STATIC properties (i.e. that never change) ===

    /**
     * The attributes of the data source.
     * @type {?Array.<ngeox.Attribute>}
     * @private
     */
    this.attributes_ = options.attributes || null;

    /**
     * Whether the geometry from this data source can be copied to other data
     * sources or not. Defaults to `false`.
     * @type {boolean}
     * @private
     */
    this.copyable_ = options.copyable === true;

    /**
     * The dimensions this data source supports.
     * @type {?Object.<string, string>}
     * @private
     */
    this.dimensions_ = options.dimensions || null;

    /**
     * The name of the geometry attribute.
     * @type {string}
     * @private
     */
    this.geometryName_ = options.geometryName ||
      ngeo.DataSource.DEFAULT_GEOMETRY_NAME_;

    /**
     * (Required) The data source id.
     * @type {number}
     * @private
     */
    this.id_ = options.id;

    /**
     * The name of an attribute among the attributes of the data source.
     * The value of that attribute, in records, can be used to identify
     * each record individually.
     * @type {string|undefined}
     * @private
     */
    this.identifierAttribute_ = options.identifierAttribute;

    /**
     * Maximum resolution where the data source can be displayed or queried.
     * @type {number|undefined}
     * @private
     */
    this.maxResolution_ = options.maxResolution;

    /**
     * Minimum resolution where the data source can be displayed or queried.
     * @type {number|undefined}
     * @private
     */
    this.minResolution_ = options.minResolution;

    /**
     * (Required) A human-readable name for the data source.
     * @type {string}
     * @private
     */
    this.name_ = options.name;

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
     * @type {?Array.<!ngeox.DataSourceLayer>}
     * @private
     */
    this.ogcLayers_ = options.ogcLayers || null;

    /**
     * The type of OGC server making the requests.
     * @type {string}
     * @private
     */
    this.ogcServerType_ = options.ogcServerType ||
      ngeo.DataSource.OGCServerType.MAPSERVER;

    /**
     * The type data source. Can be: 'WMS' or 'WMTS'.
     * @type {string}
     * @private
     */
    this.ogcType_ = options.ogcType || ngeo.DataSource.OGCType.WMS;

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
    this.snappingTolerance_ = options.snappingTolerance !== undefined ?
      options.snappingTolerance : 10;

    /**
     * The feature namespace to use with WFS requests.
     * @type {string}
     * @private
     */
    this.wfsFeatureNS_ = options.wfsFeatureNS ||
      ngeo.DataSource.WFSFeatureNS.MAPSERVER;

    /**
     * The feature prefix to use with WFS requests.
     * @type {string}
     * @private
     */
    this.wfsFeaturePrefix_ = options.wfsFeaturePrefix ||
      ngeo.DataSource.WFSFeaturePrefix.FEATURE;

    /**
     * The OutputFormat to use with WFS requests.
     * @type {string}
     * @private
     */
    this.wfsOutputFormat_ = options.wfsOutputFormat ||
      ngeo.DataSource.WFSOutputFormat.GML3;

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
    this.wmsInfoFormat_ = options.wmsInfoFormat ||
      ngeo.DataSource.WMSInfoFormat.GML;

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
      wfsFormat = new ol.format.WFS({
        featureNS: this.wfsFeatureNS,
        featureType: layers
      });
    }

    /**
     * @type {?ol.format.WFS}
     * @private
     */
    this.wfsFormat_ = wfsFormat;

    let wmsFormat = null;
    if (this.supportsWMS && layers.length) {
      if (this.wmsInfoFormat === ngeo.DataSource.WMSInfoFormat.GML) {
        wmsFormat = new ol.format.WMSGetFeatureInfo({
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

  // === Dynamic property getters/setters ===

  /**
   * @return {?Object.<string, string>} Active dimensions
   * @export
   */
  get activeDimensions() {
    return this.activeDimensions_;
  }

  /**
   * @param {?Object.<string, string>} activeDimensions Active dimensions
   * @export
   */
  set activeDimensions(activeDimensions) {
    this.activeDimensions_ = activeDimensions;
  }

  /**
   * @return {boolean} In range
   * @export
   */
  get inRange() {
    return this.inRange_;
  }

  /**
   * @param {boolean} inRange In range
   * @export
   */
  set inRange(inRange) {
    this.inRange_ = inRange;
  }

  /**
   * @return {boolean} Visible
   * @export
   */
  get visible() {
    return this.visible_;
  }

  /**
   * @param {boolean} visible Visible
   * @export
   */
  set visible(visible) {
    this.visible_ = visible;
  }

  // === Static property getters/setters ===

  /**
   * @return {?Array.<ngeox.Attribute>} Attributes
   * @export
   */
  get attributes() {
    return this.attributes_;
  }

  /**
   * @param {?Array.<ngeox.Attribute>} attributes Attributes
   * @export
   */
  set attributes(attributes) {
    this.attributes_ = attributes;
  }

  /**
   * @return {boolean} Copyable
   * @export
   */
  get copyable() {
    return this.copyable_;
  }

  /**
   * @return {?Object.<string, string>} Dimensions
   * @export
   */
  get dimensions() {
    return this.dimensions_;
  }

  /**
   * @return {string} Geometry name
   * @export
   */
  get geometryName() {
    return this.geometryName_;
  }

  /**
   * @return {number} Id
   * @export
   */
  get id() {
    return this.id_;
  }

  /**
   * @return {string|undefined} Identifier attribute
   * @export
   */
  get identifierAttribute() {
    return this.identifierAttribute_;
  }

  /**
   * @return {number|undefined} Maximum resolution
   * @export
   */
  get maxResolution() {
    return this.maxResolution_;
  }

  /**
   * @return {number|undefined} Minimum resolution
   * @export
   */
  get minResolution() {
    return this.minResolution_;
  }

  /**
   * @return {string} Name
   * @export
   */
  get name() {
    return this.name_;
  }

  /**
   * @return {string} OGC image type
   * @export
   */
  get ogcImageType() {
    return this.ogcImageType_;
  }

  /**
   * @return {?Array.<!ngeox.DataSourceLayer>} OGC layers
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
   */
  get wmtsUrl() {
    return this.wmtsUrl_;
  }

  // === Calculated property getters ===

  /**
   * @return {boolean} Whether the data source can be combined to an other
   *     data source to fetch features in a single WFS request.
   * @export
   */
  get combinableForWFS() {
    return true; // TODO
  }

  /**
   * @return {boolean} Whether the data source can be combined to an other
   *     data source to fetch features in a single WMS request.
   * @export
   */
  get combinableForWMS() {
    return true; // TODO
  }

  /**
   * Whether the data source is queryable or not. To be queryable, it requires
   * the support of WFS or WMS and at least one ogc layer to be querable.
   * @return {boolean} Whether the data source is queryable or not.
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
   * @return {boolean} Whether the data source supports a dynamic `inRange`
   *     property or not, i.e. whether it can be calculated.
   * @export
   */
  get supportsDynamicInRange() {
    return this.maxResolution !== null || this.minResolution !== null;
  }

  /**
   * @return {boolean} Whether the data source supports making WFS requests
   *     or not.
   * @export
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

  // === Other public methods ===

  /**
   * @param {ngeo.DataSource} dataSource Data source.
   * @return {boolean} Whether this data source can be combined to the given
   *     other data source to fetch features in a single WFS request.
   * @export
   */
  combinableWithDataSourceForWFS(dataSource) {
    return this.combinableForWFS && dataSource.combinableForWFS &&
      this.supportsWFS && dataSource.supportsWFS &&
      this.queryable && dataSource.queryable &&
      this.wfsUrl === dataSource.wfsUrl;
  }

  /**
   * @param {ngeo.DataSource} dataSource Data source.
   * @return {boolean} Whether this data source can be combined to the given
   *     other data source to fetch features in a single WMS request.
   * @export
   */
  combinableWithDataSourceForWMS(dataSource) {
    return this.combinableForWMS && dataSource.combinableForWMS &&
      this.supportsWMS && dataSource.supportsWMS &&
      this.queryable && dataSource.queryable &&
      this.wmsUrl === dataSource.wmsUrl;
  }

  /**
   * Check if there's at least one OGC layer in range of a given resolution.
   * @param {number} res Resolution.
   * @param {boolean} queryableOnly Whether to additionnally check if the
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
   * @param {boolean} queryableOnly Whether to additionnally check if the
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
   * @param {boolean} queryableOnly Whether to additionnally check if the
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

};


/**
 * Default name of the geometry attribute.
 * @type {string}
 * @private
 */
ngeo.DataSource.DEFAULT_GEOMETRY_NAME_ = 'the_geom';


/**
 * Available OGC server types.
 * @enum {string}
 */
ngeo.DataSource.OGCServerType = {
  GEOSERVER: 'geoserver',
  MAPSERVER: 'mapserver',
  QGIS: 'qgis'
};


/**
 * Available OGC types.
 * @enum {string}
 */
ngeo.DataSource.OGCType = {
  WMS: 'WMS',
  WMTS: 'WMTS'
};


/**
 * Available Feature namespace for WFS requests.
 * @enum {string}
 */
ngeo.DataSource.WFSFeatureNS = {
  MAPSERVER: 'http://mapserver.gis.umn.edu/mapserver'
};


/**
 * Available Feature namespace for WFS requests.
 * @enum {string}
 */
ngeo.DataSource.WFSFeaturePrefix = {
  FEATURE: 'feature'
};


/**
 * Available OutputFormat for WFS requests.
 * @enum {string}
 */
ngeo.DataSource.WFSOutputFormat = {
  GML3: 'GML3'
};


/**
 * Available InfoFormat for WMS requests.
 * @enum {string}
 */
ngeo.DataSource.WMSInfoFormat = {
  GML: 'application/vnd.ogc.gml'
};
