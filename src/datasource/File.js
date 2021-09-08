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

import ngeoDatasourceDataSource from 'ngeo/datasource/DataSource';
import olCollection from 'ol/Collection';
import olLayerVector from 'ol/layer/Vector';
import olSourceVector from 'ol/source/Vector';

/**
 * The options required to create a `File`.
 *
 * extends DataSourceOptions
 * @typedef {Object} FileOptions
 * @property {import('ol/Collection').default<import('ol/Feature').default<import('ol/geom/Geometry').default>>} [features]
 *    Collection of `import('ol/Feature').default<import('ol/geom/Geometry').default>` objects.
 * @property {import('ngeo/format/Attribute').Attribute[]} [attributes] (DataSourceOptions)
 * @property {import('ngeo/datasource/OGC').DimensionsFiltersConfig} [dimensionsFiltersConfig]
 *    (DataSourceOptions)
 * @property {number} id (DataSourceOptions)
 * @property {string} [identifierAttribute] (DataSourceOptions)
 * @property {boolean} [inRange] (DataSourceOptions)
 * @property {number} [minResolution] (DataSourceOptions)
 * @property {number} [maxResolution] (DataSourceOptions)
 * @property {string} name (DataSourceOptions)
 * @property {boolean} [visible=false] (DataSourceOptions)
 */

/**
 * @hidden
 */
export default class extends ngeoDatasourceDataSource {
  /**
   * A data source that contains vector features that were loaded from a file.
   *
   * @param {FileOptions} options Options.
   */
  constructor(options) {
    super(options);

    // === STATIC properties (i.e. that never change) ===

    /**
     * @type {import('ol/Collection').default<import('ol/Feature').default<import('ol/geom/Geometry').default>>}
     * @private
     */
    this.featuresCollection_ = options.features || new olCollection();

    /**
     * @type {import('ol/source/Vector').default<import('ol/geom/Geometry').default>}
     * @private
     */
    this.source_ = new olSourceVector({
      features: this.featuresCollection_,
      wrapX: false,
    });

    /**
     * @type {import('ol/layer/Vector').default<import('ol/source/Vector').default<import('ol/geom/Geometry').default>>}
     * @private
     */
    this.layer_ = new olLayerVector({
      source: this.source_,
    });
  }

  // ========================================
  // === Dynamic property getters/setters ===
  // ========================================

  /**
   * @return {import('ol/Feature').default<import('ol/geom/Geometry').default>[]} Features
   */
  get features() {
    return this.featuresCollection_.getArray();
  }

  // =======================================
  // === Static property getters/setters ===
  // =======================================

  /**
   * @return {import('ol/Collection').default<import('ol/Feature').default<import('ol/geom/Geometry').default>>} Features collection
   */
  get featuresCollection() {
    return this.featuresCollection_;
  }

  /**
   * @return {import('ol/layer/Vector').default<import('ol/source/Vector').default<import('ol/geom/Geometry').default>>} Vector layer.
   */
  get layer() {
    return this.layer_;
  }

  // ===================================
  // === Calculated property getters ===
  // ===================================

  /**
   * @return {import('ol/extent').Extent} Extent.
   */
  get extent() {
    return this.source_.getExtent();
  }
}
