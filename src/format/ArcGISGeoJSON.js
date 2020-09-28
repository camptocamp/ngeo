// The MIT License (MIT)
//
// Copyright (c) 2019-2020 Camptocamp SA
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

import {includes as olArrayIncludes} from 'ol/array.js';
import olFormatGeoJSON from 'ol/format/GeoJSON.js';

/**
 * @typedef {Object} Options
 * // Properties for ArcGISGeoJSON
 * @property {Array<string>} [layers] If set, only features of the given layers will be returned by the format when read.
 * // Properties from GeoJSON
 * @property {import("ol/proj.js").ProjectionLike} [dataProjection='EPSG:4326'] Default data projection.
 * @property {import("ol/proj.js").ProjectionLike} [featureProjection] Projection for features read or
 * written by the format.  Options passed to read or write methods will take precedence.
 * @property {string} [geometryName] Geometry name to use when creating features.
 * @property {boolean} [extractGeometryName=false] Certain GeoJSON providers include
 * the geometry_name field in the feature GeoJSON. If set to `true` the GeoJSON reader
 * will look for that field to set the geometry name. If both this field is set to `true`
 * and a `geometryName` is provided, the `geometryName` will take precedence.
 */

/**
 * @const
 * @type {string}
 */
const layerIdentifier = 'layerName';

class ArcGISGeoJSON extends olFormatGeoJSON {
  /**
   * @param {Options=} opt_options Options.
   */
  constructor(opt_options) {
    const options = opt_options ? opt_options : {};

    super(opt_options);

    /**
     * @private
     * @type {Array<string>}
     */
    this.layers_ = options.layers ? options.layers : null;
  }

  /**
   * @return {Array<string>} layers
   */
  getLayers() {
    return this.layers_;
  }

  /**
   * @param {Array<string>} layers Layers to parse.
   */
  setLayers(layers) {
    this.layers_ = layers;
  }

  /**
   * @param {import("geojson").GeoJSON} object Object.
   * @param {import("ol/format/Feature.js").ReadOptions=} opt_options Read options.
   * @protected
   * @return {Array<import('ol/Feature.js').default<import("ol/geom/Geometry.js").default>>} Features.
   * @override
   */
  readFeaturesFromObject(object, opt_options) {
    const geoJSONObject = /** @type {import("geojson").GeoJSON} */ (object);
    /** @type {Array<import('ol/Feature.js').default<import("ol/geom/Geometry.js").default>>} */
    const features = [];
    /** @type {import("geojson").Feature[]} */
    let geoJSONFeatures = null;
    if (geoJSONObject.type === 'FeatureCollection') {
      const geoJSONFeatureCollection = /** @type {import("geojson").FeatureCollection} */ (object);
      geoJSONFeatures = geoJSONFeatureCollection.features;
    } else {
      geoJSONFeatures = [/** @type {import("geojson").Feature} */ (object)];
    }
    for (let i = 0, ii = geoJSONFeatures.length; i < ii; ++i) {
      const feature = geoJSONFeatures[i];
      /** @type {string} */
      // @ts-ignore: Arcgis specific
      const layerName = feature[layerIdentifier];
      // Exclude feature if its layer name is not set among the layers
      if (this.layers_ && !olArrayIncludes(this.layers_, layerName)) {
        continue;
      }
      features.push(this.readFeatureFromObject(geoJSONFeatures[i], opt_options));
    }
    return features;
  }
}

export default ArcGISGeoJSON;
