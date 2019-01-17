/**
 * @module ngeo.datasource.DataSource
 */


/**
 * The options required to create a `DataSource`.
 *
 * attributes: The attributes of the data source.
 *
 * dimensionsFiltersConfig: The dimensions filters configuration, which determines dimensions supported
 * by this data source using filters and give the corresponding field and
 * whether they should use a static value or the one defined in the dimensions.
 *
 * id:(Required) The data source id.
 *
 * identifierAttribute: The name of an attribute among the attributes of the data source.
 * The value of that attribute, in records, can be used to identify each record individually.
 *
 * inRange: A data source is considered 'in range' when it is synchronized to
 * a map view and the resolution of that view is within the range of
 * the `maxResolution` and `minResolution`. These 2 properties are
 * required for the `inRange` property to be dynamic, otherwise its
 * value is always `true` by default.
 *
 * The synchronization is made in the `ngeo.datasource.syncDataSourcesMap`
 * service.
 *
 * minResolution: Minimum resolution where the data source can be displayed or queried.
 *
 * maxResolution: Maximum resolution where the data source can be displayed or queried.
 *
 * name: (Required) A human-readable name for the data source.
 *
 * visible: Whether the data source is visible or not, i.e. whether its is ON or OFF.
 * Defaults to `false`.
 *
 * @typedef {{
 *   attributes: (Array.<Attribute>|undefined),
 *   dimensionsFiltersConfig: (DimensionsFiltersConfig|undefined),
 *   id: (number),
 *   identifierAttribute: (string|undefined),
 *   inRange: (boolean|undefined),
 *   minResolution: (number|undefined),
 *   maxResolution: (number|undefined),
 *   name: (string),
 *   visible: (boolean|undefined)
 * }} DataSourceOptions
 */


/**
 * @typedef {{
 *   queryable: (boolean)
 * }} DataSource
 */


/**
 * @implements {DataSource}
 */
export default class {

  /**
   * A `ngeo.datasource.DataSource` represents a single source of data, which
   * can combine different type of servers to display or fetch the data. It can
   * serve as a point of entry to get all the information about a single data
   * source.
   *
   * You can use the information in a data source to do all sorts of things:
   *  - create `ol.layer.Layer` objects using the WMS, WMTS or even WFS
   *    information
   *  - issue WMS/WFS queries
   *  - know whether the data is visible or not
   *  - apply filter rules on it
   *
   * @param {DataSourceOptions} options Options.
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
     * The synchronization is made in the `ngeo.datasource.DataSources`
     * service.
     *
     * @type {boolean}
     */
    this.inRange = options.inRange !== false;

    /**
     * Whether the data source is visible or not, i.e. whether its is ON or OFF.
     * Defaults to `false`.
     * @type {boolean}
     */
    this.visible = options.visible === true;


    // === STATIC properties (i.e. that never change) ===

    /**
     * The attributes of the data source.
     *
     * Note: `attributes` is not using the conventionnal getter/setter due
     * to:  See: https://github.com/google/closure-compiler/issues/1089
     *
     * @type {?Array.<Attribute>}
     * @export
     */
    this.attributes = options.attributes || null;

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
  }

  // =======================================
  // === Static property getters/setters ===
  // =======================================

  /**
   * @return {?Array.<Attribute>} Attributes
   * @export
   */
  getAttributes() {
    return this.attributes;
  }

  /**
   * @param {?Array.<Attribute>} attributes Attributes
   * @export
   */
  setAttributes(attributes) {
    this.attributes = attributes;
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


  // ===================================
  // === Calculated property getters ===
  // ===================================

  /**
   * Whether the data source is queryable or not.
   * @return {boolean} Whether the data source is queryable or not.
   * @export
   */
  get queryable() {
    return false;
  }

  /**
   * @return {boolean} Whether the data source supports a dynamic `inRange`
   *     property or not, i.e. whether it can be calculated.
   * @export
   */
  get supportsDynamicInRange() {
    return this.maxResolution !== null || this.minResolution !== null;
  }
}
