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

/**
 * The options required to create a `DataSource`.
 *
 * The synchronization is made in the `ngeo.datasource.syncDataSourcesMap`
 * service.
 *
 *
 * @typedef {Object} DataSourceOptions
 * @property {import('ngeo/format/Attribute').Attribute[]} [attributes] The attributes of the data
 *    source.
 * @property {import('ngeo/datasource/OGC').DimensionsFiltersConfig} [dimensionsFiltersConfig]
 *    The dimensions filters configuration, which determines dimensions supported by this data source using
 *    filters and give the corresponding field and whether they should use a static value or the one defined
 *    in the dimensions.
 * @property {number} id The data source id.
 * @property {string} [identifierAttribute] The name of an attribute among the attributes of the data source.
 *    The value of that attribute, in records, can be used to identify each record individually.
 * @property {boolean} [inRange] A data source is considered 'in range' when it is synchronized to
 *    a map view and the resolution of that view is within the range of the `maxResolution` and
 *    `minResolution`. These 2 properties are required for the `inRange` property to be dynamic, otherwise its
 *    value is always `true` by default.
 * @property {number} [minResolution] Minimum resolution where the data source can be displayed or queried.
 * @property {number} [maxResolution] Maximum resolution where the data source can be displayed or queried.
 * @property {string} name A human-readable name for the data source.
 * @property {boolean} [visible=false] Whether the data source is visible or not, i.e.
 *    whether its is ON or OFF.
 */

/**
 * @private
 * @hidden
 */
class DataSource {
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
     * The synchronization is made in the `import('ngeo/datasource/DataSource').DataSources`
     * service.
     *
     * @type {boolean}
     */
    this.inRange = options.inRange !== false;

    /**
     * Whether the data source is visible or not, i.e. whether its is ON or OFF.
     * Defaults to `false`.
     *
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
     * @type {?import('ngeo/format/Attribute').Attribute[]}
     */
    this.attributes = options.attributes || null;

    /**
     * (Required) The data source id.
     *
     * @type {number}
     * @private
     */
    this.id_ = options.id;

    /**
     * The name of an attribute among the attributes of the data source.
     * The value of that attribute, in records, can be used to identify
     * each record individually.
     *
     * @type {string|undefined}
     * @private
     */
    this.identifierAttribute_ = options.identifierAttribute;

    /**
     * Maximum resolution where the data source can be displayed or queried.
     *
     * @type {number|undefined}
     * @private
     */
    this.maxResolution_ = options.maxResolution;

    /**
     * Minimum resolution where the data source can be displayed or queried.
     *
     * @type {number|undefined}
     * @private
     */
    this.minResolution_ = options.minResolution;

    /**
     * (Required) A human-readable name for the data source.
     *
     * @type {string}
     * @private
     */
    this.name_ = options.name;
  }

  // =======================================
  // === Static property getters/setters ===
  // =======================================

  /**
   * @returns {?import('ngeo/format/Attribute').Attribute[]} Attributes
   */
  getAttributes() {
    return this.attributes;
  }

  /**
   * @param {import('ngeo/format/Attribute').Attribute[]} attributes Attributes
   */
  setAttributes(attributes) {
    this.attributes = attributes;
  }

  /**
   * @returns {number} Id
   */
  get id() {
    return this.id_;
  }

  /**
   * @returns {string|undefined} Identifier attribute
   */
  get identifierAttribute() {
    return this.identifierAttribute_;
  }

  /**
   * @returns {number|undefined} Maximum resolution
   */
  get maxResolution() {
    return this.maxResolution_;
  }

  /**
   * @returns {number|undefined} Minimum resolution
   */
  get minResolution() {
    return this.minResolution_;
  }

  /**
   * @returns {string} Name
   */
  get name() {
    return this.name_;
  }

  // ===================================
  // === Calculated property getters ===
  // ===================================

  /**
   * Whether the data source is queryable or not.
   *
   * @returns {boolean} Whether the data source is queryable or not.
   */
  get queryable() {
    return false;
  }

  /**
   * @returns {boolean} Whether the data source supports a dynamic `inRange`
   *     property or not, i.e. whether it can be calculated.
   */
  get supportsDynamicInRange() {
    return this.maxResolution !== null || this.minResolution !== null;
  }
}

/**
 * @typedef {import('ol/Collection').default<DataSource>} DataSources
 */

export default DataSource;
