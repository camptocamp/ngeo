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

import ngeoDatasourceOGC from 'ngeo/datasource/OGC.js';

/**
 * The options required to create a `gmf.datasource.OGC`.
 * @typedef {Object} OGCOptions
 * @property {import('gmf/themes.js').GmfLayer} gmfLayer A reference to the GMF layer node that was used to
 *    create the data source. It may contains additional information, such as metadata, about the data
 *    source.
 *
 * ===
 *
 * TODO - inherit typedef properly once TypeScript supports it
 * Extends (ngeo/datasource/OGC.js).OGCOptions
 * @property {import('ngeo/datasource/OGC.js').Dimensions} [activeDimensions] The dimensions that are
 *    currently active on the data source.
 * @property {boolean} [copyable] Whether the geometry from this data source can be copied to other data
 *  sources or not. Defaults to `false`.
 * @property {import('ngeo/datasource/OGC.js').Dimensions} [dimensions] A reference to the dimensions.
 * @property {import('ngeo/datasource/OGC.js').Dimensions} [dimensionsConfig] The dimensions configuration,
 *    which determines those supported by this data source and whether they should use a static value or
 *    the one defined in the dimensions.
 * @property {string} [filterCondition] The filter condition to apply to the filter rules (if any).
 *    Defaults to `ngeo.filter.Condition.AND`.
 * @property {import('ngeo/rule/Rule.js').default[]} [filterRules] A list of filter rules to apply
 *    to this data source using the filter condition.
 * @property {boolean} [filtrable] Whether the data source is filtrable or not.
 * @property {string} [ogcImageType] The type of images to fetch by queries by the (WMS) or (WMTS).
 * @property {import('ngeo/datasource/OGC.js').WMSLayer[]} [wmsLayers] A list of layer definitions that are used by WMS queries.
 *    These are **not** used by the (WMTS) queries (the wmtsLayers is used by WMTS queries).
 * @property {import('ngeo/datasource/OGC.js').WFSLayer[]} [wfsLayers] A list of layer definitions that
 *    are used by WFS queries.
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
 * @property {import('ngeo/datasource/OGC.js').TimeProperty} [timeProperty] The time property for the data
 *    source. Used to apply time filters.
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
 *
 * ===
 *
 * TODO - inherit typedef properly once TypeScript supports it
 * Extends (ngeo/datasource/OGC.js).DataSourceOptions
 * @property {Array<import('ngeo/format/Attribute.js').Attribute>} [attributes] (DataSourceOptions)
 * @property {import('ngeo/datasource/OGC.js').DimensionsFiltersConfig} [dimensionsFiltersConfig]
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
class GmfDatasourceOGC extends ngeoDatasourceOGC {
  /**
   * A `gmf.datasource.OGC` extends a `ngeo.datasource.OGC` and
   * adds some properties that are proper to GMF only.
   *
   * @param {OGCOptions} options Options.
   */
  constructor(options) {
    super(options);

    // === STATIC properties (i.e. that never change) ===

    /**
     * @type {import('gmf/themes.js').GmfLayer}
     * @private
     */
    this.gmfLayer_ = options.gmfLayer;
  }

  // === Static property getters/setters ===

  /**
   * @return {import('gmf/themes.js').GmfLayer} GMF layer
   */
  get gmfLayer() {
    return this.gmfLayer_;
  }
}

export default GmfDatasourceOGC;
