// TODO == Dynamic Properties ==
// TODO  - filterCondition (and, or, not)
// TODO  - filterRules (array of rules)
// TODO  - inRange (boolean)
//
// TODO == Static Properties ==
// TODO  - attributes
// TODO  - filterRuleDefinitions
// TODO  - group

goog.provide('ngeo.DataSource');


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
     * Whether the geometry from this data source can be copied to other data
     * sources or not. Defaults to `false`.
     * @type {boolean}
     * @private
     */
    this.copyable_ = options.copyable === true;

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
     * @type {?string}
     * @private
     */
    this.identifierAttribute_ = options.identifierAttribute || null;

    /**
     * Maximum resolution where the data source can be displayed or queried.
     * @type {?number}
     * @private
     */
    this.maxResolution_ = options.maxResolution !== undefined ?
      options.maxResolution : null;

    /**
     * Minimum resolution where the data source can be displayed or queried.
     * @type {?number}
     * @private
     */
    this.minResolution_ = options.minResolution !== undefined ?
      options.minResolution : null;

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
     * @type {!Array.<!ngeox.DataSourceLayer>|undefined}
     * @private
     */
    this.ogcLayers_ = options.ogcLayers;

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
    this.ogcType_ = options.ogcType;

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
     * The url to use for (WFS) requests.
     * @type {?string}
     * @private
     */
    this.wfsUrl_ = options.wfsUrl || null;

    /**
     * Whether the (WMS) images returned by this data source
     * should be single tiles or not.
     * @type {boolean}
     * @private
     */
    this.wmsIsSingleTile_ = options.wmsIsSingleTile === true;

    /**
     * The url to use for (WMS) requests.
     * @type {?string}
     * @private
     */
    this.wmsUrl_ = options.wmsUrl || null;

    /**
     * The layer name to use for the (WMTS) requests.
     * @type {?string}
     * @private
     */
    this.wmtsLayer_ = options.wmtsLayer || null;

    /**
     * The url to use for (WMTS) requests.
     * @type {?string}
     * @private
     */
    this.wmtsUrl_ = options.wmtsUrl || null;
  }

  // === Dynamic property getters/setters ===

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
   * @return {boolean} Copyable
   * @export
   */
  get copyable() {
    return this.copyable_;
  }

  /**
   * @return {number} Id
   * @export
   */
  get id() {
    return this.id_;
  }

  /**
   * @return {?string} Identifier attribute
   * @export
   */
  get identifierAttribute() {
    return this.identifierAttribute_;
  }

  /**
   * @return {?number} Maximum resolution
   * @export
   */
  get maxResolution() {
    return this.maxResolution_;
  }

  /**
   * @return {?number} Minimum resolution
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
   * @return {!Array.<!ngeox.DataSourceLayer>|undefined} OGC layers
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
   * @export
   * @return {?string} WFS url
   */
  get wfsUrl() {
    return this.wfsUrl_;
  }

  /**
   * @return {boolean} WMS is single tile
   * @export
   */
  get wmsIsSingleTile() {
    return this.wmsIsSingleTile_;
  }

  /**
   * @return {?string} WMS url
   * @export
   */
  get wmsUrl() {
    return this.wmsUrl_;
  }

  /**
   * @return {?string} WMTS layer
   * @export
   */
  get wmtsLayer() {
    return this.wmtsLayer_;
  }

  /**
   * @return {?string} WMTS url
   * @export
   */
  get wmtsUrl() {
    return this.wmtsUrl_;
  }

  // === Calculated property getters ===

  /**
   * Whether the data source is queryable or not. To be queryable, it requires
   * the support of WFS or WMS and at least one ogc layer to be querable.
   * @return {boolean} Whether the data source is queryable or not.
   * @export
   */
  get isQueryable() {
    let isQueryable = false;
    const supportsOGCQueries = this.supportsWMS || this.supportsWFS;
    if (supportsOGCQueries && this.ogcLayers) {
      for (const ogcLayer of this.ogcLayers) {
        if (ogcLayer.queryable === true) {
          isQueryable = true;
          break;
        }
      }
    }
    return isQueryable;
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
    return this.wfsUrl !== null;
  }

  /**
   * @return {boolean} Whether the data source supports making WMS requests
   *     or not.
   * @export
   */
  get supportsWMS() {
    return this.wmsUrl !== null;
  }

  /**
   * @return {boolean} Whether the data source supports making WTMS requests
   *     or not.
   * @export
   */
  get supportsWMTS() {
    return this.wmtsUrl !== null;
  }
};


/**
 * Available OGC server types.
 * @enum {string}
 */
ngeo.DataSource.OGCServerType = {
  GEOSERVER: 'geoserver',
  MAPSERVER: 'mapserver',
  QGIS: 'qgis'
};
