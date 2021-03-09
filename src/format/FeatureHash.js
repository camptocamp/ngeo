// The MIT License (MIT)
//
// Copyright (c) 2015-2021 Camptocamp SA
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

import ngeoFormatFeatureProperties from 'ngeo/format/FeatureProperties.js';
import ngeoFormatFeatureHashStyleType from 'ngeo/format/FeatureHashStyleType.js';
import {rgbArrayToHex} from 'ngeo/utils.js';
import {asArray as asColorArray} from 'ol/color.js';
import olFeature from 'ol/Feature.js';
import {transformGeometryWithOptions} from 'ol/format/Feature.js';
import olFormatTextFeature from 'ol/format/TextFeature.js';
import olGeomLineString from 'ol/geom/LineString.js';
import olGeomMultiLineString from 'ol/geom/MultiLineString.js';
import olGeomMultiPoint from 'ol/geom/MultiPoint.js';
import olGeomMultiPolygon from 'ol/geom/MultiPolygon.js';
import olGeomPoint from 'ol/geom/Point.js';
import olGeomPolygon from 'ol/geom/Polygon.js';
import olStyleCircle from 'ol/style/Circle.js';
import olStyleFill from 'ol/style/Fill.js';
import olStyleStroke from 'ol/style/Stroke.js';
import olStyleStyle from 'ol/style/Style.js';
import olStyleText from 'ol/style/Text.js';
import Geometry from 'ol/geom/Geometry.js';

/**
 * accuracy: The encoding and decoding accuracy. Optional. Default value is 1.
 *
 * @typedef {Object} FeatureHashOptions
 * @property {number} [accuracy] The encoding and decoding accuracy. Optional. Default value is 1.
 * @property {Object<string, function(olFeature<import("ol/geom/Geometry.js").default>): void>} [defaultValues] defaultValues.
 * @property {boolean} [encodeStyles=true] Encode styles. Optional.
 * @property {function(olFeature<import("ol/geom/Geometry.js").default>): Object<string, (string|number|undefined)>} [properties]
 *    A function that returns serializable properties for a feature. Optional. By default the feature
 *    properties (as returned by `feature.getProperties()`) are used. To be serializable the returned
 *    properties should be numbers or strings.
 * @property {boolean} [setStyle=treu] Determines whether the style defined for each feature is read and
 * converted into:
 *   A) an `ol.style.Style` object set in the feature, or
 *   B) an object with key:values that defines the style properties set in the feature and for the
 *      `ngeo.misc.FeatureHelper` to use to style the feature with.
 * @property {Object<string, string>} [propertiesType]
 */

/**
 * @type {Object<string, string>}
 * @private
 * @hidden
 */
let LegacyProperties_ = {};

/**
 * @const
 * @private
 * @hidden
 */
const DEFAULT_ACCURACY = 0.1;

/**
 * @type {Object<string, import("ngeo/format/FeatureHashStyleType.js").default>}
 * @private
 * @hidden
 */
const StyleTypes_ = {
  'LineString': ngeoFormatFeatureHashStyleType.LINE_STRING,
  'Point': ngeoFormatFeatureHashStyleType.POINT,
  'Polygon': ngeoFormatFeatureHashStyleType.POLYGON,
  'MultiLineString': ngeoFormatFeatureHashStyleType.LINE_STRING,
  'MultiPoint': ngeoFormatFeatureHashStyleType.POINT,
  'MultiPolygon': ngeoFormatFeatureHashStyleType.POLYGON,
};

/**
 * Characters used to encode the coordinates. The characters "~", "'", "("
 * and ")" are not part of this character set, and used as separators (for
 * example to separate the coordinates from the feature properties).
 * @const
 * @private
 * @hidden
 */
const CHAR64_ = '.-_!*ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghjkmnpqrstuvwxyz';

/**
 * @const
 * @private
 * @hidden
 * @type {Object<string, function(string):Geometry>}
 */
const GEOMETRY_READERS_ = {
  'P': readMultiPointGeometry_,
  'L': readMultiLineStringGeometry_,
  'A': readMultiPolygonGeometry_,
  'l': readLineStringGeometry_,
  'p': readPointGeometry_,
  'a': readPolygonGeometry_,
};

/**
 * @const
 * @private
 * @hidden
 * @type {Object<string, function(Geometry): ?string>}
 */
const GEOMETRY_WRITERS_ = {
  'MultiLineString': writeMultiLineStringGeometry_,
  'MultiPoint': writeMultiPointGeometry_,
  'MultiPolygon': writeMultiPolygonGeometry_,
  'LineString': writeLineStringGeometry_,
  'Point': writePointGeometry_,
  'Polygon': writePolygonGeometry_,
};

/**
 * Provide an OpenLayers format for encoding and decoding features for use
 * in permalinks.
 *
 * The code is based on Stéphane Brunner's URLCompressed format.
 *
 * TODOs:
 *
 * - The OpenLayers-URLCompressed format has options where the user
 *   can define attribute and style transformers. This is currently
 *   not supported by this format.
 * - The OpenLayers-URLCompressed format has a "simplify" option.
 *   This format does not have it.
 * - ol.style.Icon styles are not supported.
 * - Transformation of coordinates during encoding and decoding is
 *   not supported.
 *
 * @see https://github.com/sbrunner/OpenLayers-URLCompressed
 */
class FeatureHash extends olFormatTextFeature {
  /**
   * @param {FeatureHashOptions=} opt_options Options.
   */
  constructor(opt_options) {
    super();

    /** @type {FeatureHashOptions} */
    const options = opt_options || {};

    /**
     * @type {number}
     * @private
     */
    this.accuracy_ = options.accuracy || DEFAULT_ACCURACY;

    /**
     * @type {boolean}
     * @private
     */
    this.encodeStyles_ = options.encodeStyles || true;

    /**
     * @type {function(olFeature<import("ol/geom/Geometry.js").default>):Object<string, (string|number|undefined)>}
     * @private
     */
    this.propertiesFunction_ = options.properties || defaultPropertiesFunction_;

    /**
     * @type {boolean}
     * @private
     */
    this.setStyle_ = options.setStyle !== undefined ? options.setStyle : true;

    /**
     * @type {number}
     * @private
     */
    this.prevX_ = 0;

    /**
     * @type {number}
     * @private
     */
    this.prevY_ = 0;

    /**
     * @type {Object<string, string>}
     * @private
     */
    LegacyProperties_ = options.propertiesType || {};

    /**
     * @type {Object<string, function(olFeature<import("ol/geom/Geometry.js").default>): void>}
     * @private
     */
    this.defaultValues_ = options.defaultValues || {};
  }

  /**
   * Read a logical sequence of characters and return (or complete then return)
   * an array of numbers. The coordinates are assumed to be in
   * two dimensions and in latitude, longitude order.
   * corresponding to a geometry's coordinates.
   * @param {string} text Text.
   * @param {number[]=} opt_flatCoordinates Flat coordinates array.
   * @return {number[]} Flat coordinates.
   */
  decodeCoordinates_(text, opt_flatCoordinates) {
    const len = text.length;
    let index = 0;
    const flatCoordinates = opt_flatCoordinates !== undefined ? opt_flatCoordinates : [];
    let i = flatCoordinates.length;
    while (index < len) {
      let b;
      let shift = 0;
      let result = 0;
      do {
        b = CHAR64_.indexOf(text.charAt(index++));
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 32);
      const dx = result & 1 ? ~(result >> 1) : result >> 1;
      this.prevX_ += dx;
      shift = 0;
      result = 0;
      do {
        b = CHAR64_.indexOf(text.charAt(index++));
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 32);
      const dy = result & 1 ? ~(result >> 1) : result >> 1;
      this.prevY_ += dy;
      flatCoordinates[i++] = this.prevX_ * this.accuracy_;
      flatCoordinates[i++] = this.prevY_ * this.accuracy_;
    }
    return flatCoordinates;
  }

  /**
   * Encode an array of number (corresponding to some coordinates) into a
   * logical sequence of characters. The coordinates are assumed to be in
   * two dimensions and in latitude, longitude order.
   * @param {number[]} flatCoordinates Flat coordinates.
   * @param {number} stride Stride.
   * @param {number} offset Offset.
   * @param {number} end End.
   * @return {string} String.
   * @hidden
   */
  encodeCoordinates_(flatCoordinates, stride, offset, end) {
    let encodedCoordinates = '';
    for (let i = offset; i < end; i += stride) {
      let x = flatCoordinates[i];
      let y = flatCoordinates[i + 1];
      x = Math.floor(x / this.accuracy_);
      y = Math.floor(y / this.accuracy_);
      const dx = x - this.prevX_;
      const dy = y - this.prevY_;
      this.prevX_ = x;
      this.prevY_ = y;
      encodedCoordinates += encodeSignedNumber_(dx) + encodeSignedNumber_(dy);
    }
    return encodedCoordinates;
  }

  /**
   * Read a feature from a logical sequence of characters.
   * @param {string} text Text.
   * @param {import('ol/format/Feature.js').ReadOptions=} opt_options Read options.
   * @return {olFeature<import("ol/geom/Geometry.js").default>} Feature.
   * @protected
   * @override
   */
  readFeatureFromText(text, opt_options) {
    console.assert(text.length > 2);
    console.assert(text[1] === '(');
    console.assert(text.endsWith(')'));
    let splitIndex = text.indexOf('~');
    const geometryText = splitIndex >= 0 ? `${text.substring(0, splitIndex)})` : text;
    const geometry = this.readGeometryFromText(geometryText, opt_options);
    const feature = new olFeature(geometry);
    if (splitIndex >= 0) {
      const attributesAndStylesText = text.substring(splitIndex + 1, text.length - 1);
      splitIndex = attributesAndStylesText.indexOf('~');
      const attributesText =
        splitIndex >= 0 ? attributesAndStylesText.substring(0, splitIndex) : attributesAndStylesText;
      if (attributesText != '') {
        const parts = attributesText.split("'");
        for (const encodedPart of parts) {
          const part = decodeURIComponent(encodedPart);
          const keyVal = part.split('*');
          console.assert(keyVal.length === 2);
          let key = keyVal[0];
          const value = keyVal[1];
          if (!this.setStyle_ && LegacyProperties_[key]) {
            key = LegacyProperties_[key];
          }
          feature.set(key, castValue_(key, value));
        }
      }
      if (splitIndex >= 0) {
        const stylesText = attributesAndStylesText.substring(splitIndex + 1);
        if (this.setStyle_) {
          setStyleInFeature_(stylesText, feature);
        } else {
          setStyleProperties_(stylesText, feature);
        }
      }
    }
    return feature;
  }

  /**
   * Read multiple features from a logical sequence of characters.
   * @param {string} text Text.
   * @param {import('ol/format/Feature.js').ReadOptions=} opt_options Read options.
   * @return {olFeature<import("ol/geom/Geometry.js").default>[]} Features.
   * @protected
   * @override
   */
  readFeaturesFromText(text, opt_options) {
    console.assert(text.startsWith('F'));
    this.prevX_ = 0;
    this.prevY_ = 0;
    /** @type {olFeature<import("ol/geom/Geometry.js").default>[]} */
    const features = [];
    text = text.substring(1);
    while (text.length > 0) {
      const index = text.indexOf(')');
      console.assert(index >= 0);
      const feature = this.readFeatureFromText(text.substring(0, index + 1), opt_options);
      features.push(feature);
      text = text.substring(index + 1);
    }

    // set default values
    features.forEach((feature) => {
      for (const key in this.defaultValues_) {
        const property = LegacyProperties_[key];
        if (feature.get(property) === undefined) {
          feature.set(property, this.defaultValues_[key].call(null, feature));
        }
      }
    });
    return features;
  }

  /**
   * Read a geometry from a logical sequence of characters.
   * @param {string} text Text.
   * @param {import('ol/format/Feature.js').ReadOptions=} opt_options Read options.
   * @return {Geometry} Geometry.
   * @protected
   * @override
   */
  readGeometryFromText(text, opt_options) {
    const geometryReader = GEOMETRY_READERS_[text[0]];
    console.assert(geometryReader !== undefined);
    return geometryReader.call(this, text);
  }

  /**
   * Encode a feature into a logical sequence of characters.
   * @param {olFeature<import("ol/geom/Geometry.js").default>} feature Feature.
   * @param {import('ol/format/Feature.js').ReadOptions=} opt_options Read options.
   * @return {string} Encoded feature.
   * @protected
   * @override
   */
  writeFeatureText(feature, opt_options) {
    const /** @type {string[]} */ encodedParts = [];

    // encode geometry

    let encodedGeometry = '';
    const geometry = feature.getGeometry();
    if (geometry) {
      encodedGeometry = this.writeGeometryText(geometry, opt_options);
    }

    if (encodedGeometry.length > 0) {
      // remove the final bracket
      console.assert(encodedGeometry.endsWith(')'));
      encodedGeometry = encodedGeometry.substring(0, encodedGeometry.length - 1);
      encodedParts.push(encodedGeometry);
    }

    // encode properties

    const /** @type {string[]} */ encodedProperties = [];
    const propFunction = this.propertiesFunction_(feature);
    for (const key in propFunction) {
      const value = propFunction[key];
      if (value !== undefined && value !== null && key !== feature.getGeometryName()) {
        if (encodedProperties.length !== 0) {
          encodedProperties.push("'");
        }
        const encoded = encodeURIComponent(
          `${key.replace(/[()'*]/g, '_')}*${value.toString().replace(/[()'*]/g, '_')}`
        );
        encodedProperties.push(encoded);
      }
    }

    if (encodedProperties.length > 0) {
      encodedParts.push('~');
      Array.prototype.push.apply(encodedParts, encodedProperties);
    }

    // encode styles

    if (this.encodeStyles_) {
      const styleFunction = feature.getStyleFunction();
      if (styleFunction !== undefined) {
        let styles = styleFunction(feature, 0);
        if (styles) {
          /** @type {string[]} */
          const encodedStyles = [];
          styles = Array.isArray(styles) ? styles : [styles];
          if (!geometry) {
            throw new Error('Missing geometry');
          }
          encodeStyles_(styles, geometry.getType(), encodedStyles);
          if (encodedStyles.length > 0) {
            encodedParts.push('~');
            Array.prototype.push.apply(encodedParts, encodedStyles);
          }
        }
      }
    }

    // append the closing bracket and return the encoded feature

    encodedParts.push(')');
    return encodedParts.join('');
  }

  /**
   * Encode an array of features into a logical sequence of characters.
   * @param {olFeature<import("ol/geom/Geometry.js").default>[]} features Feature.
   * @param {import('ol/format/Feature.js').ReadOptions=} opt_options Read options.
   * @return {string} Encoded features.
   * @protected
   * @override
   */
  writeFeaturesText(features, opt_options) {
    this.prevX_ = 0;
    this.prevY_ = 0;
    const textArray = [];
    if (features.length > 0) {
      textArray.push('F');
      for (let i = 0, ii = features.length; i < ii; ++i) {
        textArray.push(this.writeFeatureText(features[i], opt_options));
      }
    }
    return textArray.join('');
  }

  /**
   * Encode a geometry into a logical sequence of characters.
   * @param {Geometry} geometry Geometry.
   * @param {import('ol/format/Feature.js').ReadOptions=} opt_options Read options.
   * @return {string} Encoded geometry.
   * @protected
   * @override
   */
  writeGeometryText(geometry, opt_options) {
    const geometryWriter = GEOMETRY_WRITERS_[geometry.getType()];
    console.assert(geometryWriter !== undefined);
    const transformedGeometry = transformGeometryWithOptions(geometry, true, opt_options);
    if (!(transformedGeometry instanceof Geometry)) {
      throw new Error('Missing transformedGeometry');
    }
    const encGeom = geometryWriter.call(this, transformedGeometry);
    if (!encGeom) {
      throw new Error('Missing encodedGeometry');
    }
    return encGeom;
  }
}

export default FeatureHash;

/**
 * Get features's properties.
 * @param {olFeature<import("ol/geom/Geometry.js").default>} feature Feature.
 * @return {Object<string, (string|number|undefined)>} The feature properties to
 * serialize.
 * @private
 * @hidden
 */
function defaultPropertiesFunction_(feature) {
  return feature.getProperties();
}

/**
 * Sign then encode a number.
 * @param {number} num Number.
 * @return {string} String.
 * @private
 * @hidden
 */
function encodeSignedNumber_(num) {
  let signedNum = num << 1;
  if (num < 0) {
    signedNum = ~signedNum;
  }
  return encodeNumber_(signedNum);
}

/**
 * Transform a number into a logical sequence of characters.
 * @param {number} num Number.
 * @return {string} String.
 * @private
 * @hidden
 */
function encodeNumber_(num) {
  let encodedNumber = '';
  while (num >= 0x20) {
    encodedNumber += CHAR64_.charAt(0x20 | (num & 0x1f));
    num >>= 5;
  }
  encodedNumber += CHAR64_.charAt(num);
  return encodedNumber;
}

/**
 * For a type of geometry, transforms an array of {@link import("ol/style/Style.js").default} into
 * a logical sequence of characters and put the result into the given encoded
 * styles's array.
 * @param {import("ol/style/Style.js").default[]} styles Styles.
 * @param {string} geometryType Geometry type.
 * @param {string[]} encodedStyles Encoded styles array.
 * @private
 * @hidden
 */
function encodeStyles_(styles, geometryType, encodedStyles) {
  const styleType = StyleTypes_[geometryType];
  console.assert(styleType !== undefined);
  for (const style of styles) {
    const fillStyle = style.getFill();
    const imageStyle = style.getImage();
    const strokeStyle = style.getStroke();
    const textStyle = style.getText();
    if (styleType == ngeoFormatFeatureHashStyleType.POLYGON) {
      if (fillStyle !== null) {
        encodeStylePolygon_(fillStyle, strokeStyle, encodedStyles);
      }
    } else if (styleType == ngeoFormatFeatureHashStyleType.LINE_STRING) {
      if (strokeStyle !== null) {
        encodeStyleLine_(strokeStyle, encodedStyles);
      }
    } else if (styleType == ngeoFormatFeatureHashStyleType.POINT) {
      if (imageStyle !== null) {
        encodeStylePoint_(imageStyle, encodedStyles);
      }
    }
    if (textStyle !== null) {
      encodeStyleText_(textStyle, encodedStyles);
    }
  }
}

/**
 * Transform an {@link import("ol/style/Stroke.js").default} into a logical sequence of
 * characters and put the result into the given encoded styles's array.
 * @param {import("ol/style/Stroke.js").default} strokeStyle Stroke style.
 * @param {string[]} encodedStyles Encoded styles array.
 * @private
 * @hidden
 */
function encodeStyleLine_(strokeStyle, encodedStyles) {
  encodeStyleStroke_(strokeStyle, encodedStyles);
}

/**
 * Transform an {@link import("ol/style/Circle.js").default} into a logical sequence of
 * characters and put the result into the given encoded styles's array.
 * @param {import("ol/style/Image.js").default} imageStyle Image style.
 * @param {string[]} encodedStyles Encoded styles array.
 * @private
 * @hidden
 */
function encodeStylePoint_(imageStyle, encodedStyles) {
  if (imageStyle instanceof olStyleCircle) {
    const radius = imageStyle.getRadius();
    if (encodedStyles.length > 0) {
      encodedStyles.push("'");
    }
    encodedStyles.push(encodeURIComponent(`pointRadius*${radius}`));
    const fillStyle = imageStyle.getFill();
    if (fillStyle !== null) {
      encodeStyleFill_(fillStyle, encodedStyles);
    }
    const strokeStyle = imageStyle.getStroke();
    if (strokeStyle !== null) {
      encodeStyleStroke_(strokeStyle, encodedStyles);
    }
  }
}

/**
 * Transform an {@link import("ol/style/Fill.js").default} and an
 * {@link import("ol/style/Stroke.js").default} into a logical sequence of characters and put the result into
 * the given encoded styles's array.
 * @param {import("ol/style/Fill.js").default} fillStyle Fill style.
 * @param {import("ol/style/Stroke.js").default} strokeStyle Stroke style.
 * @param {string[]} encodedStyles Encoded styles array.
 * @private
 * @hidden
 */
function encodeStylePolygon_(fillStyle, strokeStyle, encodedStyles) {
  encodeStyleFill_(fillStyle, encodedStyles);
  if (strokeStyle !== null) {
    encodeStyleStroke_(strokeStyle, encodedStyles);
  }
}

/**
 * Transform an {@link import("ol/style/Fill.js").default} and optionally its properties into
 * a logical sequence of characters and put the result into the given encoded
 * styles's array.
 * @param {import("ol/style/Fill.js").default} fillStyle Fill style.
 * @param {string[]} encodedStyles Encoded styles array.
 * @param {string=} [propertyName='fillColor'] Property name.
 * @private
 * @hidden
 */
function encodeStyleFill_(fillStyle, encodedStyles, propertyName = 'fillColor') {
  const fillColor = fillStyle.getColor();
  let fillColorHex;
  if (fillColor !== null) {
    if (Array.isArray(fillColor)) {
      fillColorHex = rgbArrayToHex(fillColor);
    } else if (typeof fillColor === 'string') {
      fillColorHex = rgbArrayToHex(asColorArray(fillColor));
    } else {
      throw new Error('Unsupported color');
    }
    if (encodedStyles.length > 0) {
      encodedStyles.push("'");
    }
    encodedStyles.push(encodeURIComponent(`${propertyName}*${fillColorHex}`));
  }
}

/**
 * Transform an {@link import("ol/style/Stroke.js").default} into a logical sequence of
 * characters and put the result into the given encoded styles's array.
 * @param {import("ol/style/Stroke.js").default} strokeStyle Stroke style.
 * @param {string[]} encodedStyles Encoded styles array.
 * @private
 * @hidden
 */
function encodeStyleStroke_(strokeStyle, encodedStyles) {
  const strokeColor = strokeStyle.getColor();
  if (strokeColor !== null) {
    if (Array.isArray(strokeColor)) {
      const strokeColorHex = rgbArrayToHex(strokeColor);
      if (encodedStyles.length > 0) {
        encodedStyles.push("'");
      }
      encodedStyles.push(encodeURIComponent(`strokeColor*${strokeColorHex}`));
    }
  }
  const strokeWidth = strokeStyle.getWidth();
  if (strokeWidth !== undefined) {
    if (encodedStyles.length > 0) {
      encodedStyles.push("'");
    }
    encodedStyles.push(encodeURIComponent(`strokeWidth*${strokeWidth}`));
  }
}

/**
 * Transform an {@link import("ol/style/Text.js").default} into a logical sequence of characters and
 * put the result into the given encoded styles's array.
 * @param {import("ol/style/Text.js").default} textStyle Text style.
 * @param {string[]} encodedStyles Encoded styles array.
 * @private
 * @hidden
 */
function encodeStyleText_(textStyle, encodedStyles) {
  const fontStyle = textStyle.getFont();
  if (fontStyle !== undefined) {
    const font = fontStyle.split(' ');
    if (font.length >= 3) {
      if (encodedStyles.length > 0) {
        encodedStyles.push("'");
      }
      encodedStyles.push(encodeURIComponent(`fontSize*${font[1]}`));
    }
  }
  const fillStyle = textStyle.getFill();
  if (fillStyle !== null) {
    encodeStyleFill_(fillStyle, encodedStyles, 'fontColor');
  }
}

/**
 * Read a logical sequence of characters and return a corresponding
 * {@link import("ol/geom/LineString.js").default}.
 * @param {string} text Text.
 * @return {import("ol/geom/LineString.js").default} Line string.
 * @private
 * @hidden
 * @this {FeatureHash}
 */
function readLineStringGeometry_(text) {
  console.assert(text.startsWith('l('));
  console.assert(text.endsWith(')'));
  text = text.substring(2, text.length - 1);
  const flatCoordinates = this.decodeCoordinates_(text);
  return new olGeomLineString(flatCoordinates, 'XY');
}

/**
 * Read a logical sequence of characters and return a corresponding
 * {@link import("ol/geom/MultiLineString.js").default}.
 * @param {string} text Text.
 * @return {import("ol/geom/MultiLineString.js").default} Line string.
 * @private
 * @hidden
 * @this {FeatureHash}
 */
function readMultiLineStringGeometry_(text) {
  console.assert(text.startsWith('L('));
  console.assert(text.endsWith(')'));
  text = text.substring(2, text.length - 1);
  /** @type {number[]} */
  let flatCoordinates = [];
  const ends = [];
  const lineStrings = text.split("'");
  for (let i = 0, ii = lineStrings.length; i < ii; ++i) {
    flatCoordinates = this.decodeCoordinates_(lineStrings[i], flatCoordinates);
    ends[i] = flatCoordinates.length;
  }
  return new olGeomMultiLineString(flatCoordinates, 'XY', ends);
}

/**
 * Read a logical sequence of characters and return a corresponding
 * {@link import("ol/geom/Point.js").default}.
 * @param {string} text Text.
 * @return {import("ol/geom/Point.js").default} Point.
 * @private
 * @hidden
 * @this {FeatureHash}
 */
function readPointGeometry_(text) {
  console.assert(text.startsWith('p('));
  console.assert(text.endsWith(')'));
  text = text.substring(2, text.length - 1);
  const flatCoordinates = this.decodeCoordinates_(text);
  console.assert(flatCoordinates.length === 2);
  return new olGeomPoint(flatCoordinates, 'XY');
}

/**
 * Read a logical sequence of characters and return a corresponding
 * {@link import("ol/geom/MultiPoint.js").default}.
 * @param {string} text Text.
 * @return {import("ol/geom/MultiPoint.js").default} MultiPoint.
 * @private
 * @hidden
 * @this {FeatureHash}
 */
function readMultiPointGeometry_(text) {
  console.assert(text.startsWith('P('));
  console.assert(text.endsWith(')'));
  text = text.substring(2, text.length - 1);
  const flatCoordinates = this.decodeCoordinates_(text);
  return new olGeomMultiPoint(flatCoordinates, 'XY');
}

/**
 * Read a logical sequence of characters and return a corresponding
 * {@link import("ol/geom/Polygon.js").default}.
 * @param {string} text Text.
 * @return {import("ol/geom/Polygon.js").default} Polygon.
 * @private
 * @hidden
 * @this {FeatureHash}
 */
function readPolygonGeometry_(text) {
  console.assert(text.startsWith('a('));
  console.assert(text.endsWith(')'));
  text = text.substring(2, text.length - 1);
  /** @type {number[]} */
  let flatCoordinates = [];
  const ends = [];
  const rings = text.split("'");
  for (let i = 0, ii = rings.length; i < ii; ++i) {
    flatCoordinates = this.decodeCoordinates_(rings[i], flatCoordinates);
    let end = flatCoordinates.length;
    if (i === 0) {
      flatCoordinates[end++] = flatCoordinates[0];
      flatCoordinates[end++] = flatCoordinates[1];
    } else {
      flatCoordinates[end++] = flatCoordinates[ends[i - 1]];
      flatCoordinates[end++] = flatCoordinates[ends[i - 1] + 1];
    }
    ends[i] = end;
  }
  return new olGeomPolygon(flatCoordinates, 'XY', ends);
}

/**
 * Read a logical sequence of characters and return a corresponding
 * {@link import("ol/geom/MultiPolygon.js").default}.
 * @param {string} text Text.
 * @return {import("ol/geom/MultiPolygon.js").default} MultiPolygon.
 * @private
 * @hidden
 * @this {FeatureHash}
 */
function readMultiPolygonGeometry_(text) {
  console.assert(text.startsWith('A('));
  console.assert(text.endsWith(')'));
  text = text.substring(2, text.length - 1);
  /** @type {number[]} */
  let flatCoordinates = [];
  /** @type {number[][]} */
  const endss = [];
  const polygons = text.split(')(');
  for (let i = 0, ii = polygons.length; i < ii; ++i) {
    const rings = polygons[i].split("'");
    endss[i] = [];
    const ends = endss[i];
    for (let j = 0, jj = rings.length; j < jj; ++j) {
      flatCoordinates = this.decodeCoordinates_(rings[j], flatCoordinates);
      let end = flatCoordinates.length;
      if (j === 0) {
        flatCoordinates[end++] = flatCoordinates[0];
        flatCoordinates[end++] = flatCoordinates[1];
      } else {
        flatCoordinates[end++] = flatCoordinates[ends[j - 1]];
        flatCoordinates[end++] = flatCoordinates[ends[j - 1] + 1];
      }
      ends[j] = end;
    }
  }
  return new olGeomMultiPolygon(flatCoordinates, 'XY', endss);
}

/**
 * DEPRECATED - Use the `ngeo.misc.FeatureHelper` instead in combination with the
 * `setStyle: false` option.
 *
 * Read a logical sequence of characters and apply the decoded style on the
 * given feature.
 * @param {string} text Text.
 * @param {olFeature<import("ol/geom/Geometry.js").default>} feature Feature.
 * @private
 * @hidden
 */
function setStyleInFeature_(text, feature) {
  if (text == '') {
    return;
  }
  const properties = getStyleProperties_(text, feature);
  const fillColor = properties.fillColor;
  const fontSize = properties.fontSize;
  const fontColor = properties.fontColor;
  const pointRadius = properties.pointRadius;
  const strokeColor = properties.strokeColor;
  const strokeWidth = properties.strokeWidth;

  let fillStyle = null;
  if (fillColor !== undefined) {
    fillStyle = new olStyleFill({
      color: /** @type {number[]|string} */ (fillColor),
    });
  }
  let strokeStyle = null;
  if (strokeColor !== undefined && strokeWidth !== undefined) {
    if (typeof strokeWidth != 'number') {
      throw new Error('Missing strokeWidth');
    }
    strokeStyle = new olStyleStroke({
      color: /** @type {number[]|string} */ (strokeColor),
      width: strokeWidth,
    });
  }
  let imageStyle = null;
  if (pointRadius !== undefined) {
    if (typeof pointRadius != 'number') {
      throw new Error('Missing pointRadius');
    }
    /** @type {import('ol/style/Circle.js').Options} */
    const options = {
      radius: pointRadius,
    };
    if (fillStyle) {
      options.fill = fillStyle;
    }
    if (strokeStyle) {
      options.stroke = strokeStyle;
    }
    imageStyle = new olStyleCircle(options);
    fillStyle = null;
    strokeStyle = null;
  }
  let textStyle = null;
  if (fontSize !== undefined && fontColor !== undefined) {
    textStyle = new olStyleText({
      font: `${fontSize} sans-serif`,
      fill: new olStyleFill({
        color: /** @type {number[]|string} */ (fontColor),
      }),
    });
  }
  const options = {};
  if (fillStyle) {
    options.fill = fillStyle;
  }
  if (strokeStyle) {
    options.stroke = strokeStyle;
  }
  if (imageStyle) {
    options.image = imageStyle;
  }
  if (textStyle) {
    options.text = textStyle;
  }
  const style = new olStyleStyle(options);
  feature.setStyle(style);
}

/**
 * Read a logical sequence of characters and apply the decoded result as
 * style properties for the feature. Legacy keys are converted to the new ones
 * for compatibility.
 * @param {string} text Text.
 * @param {olFeature<import("ol/geom/Geometry.js").default>} feature Feature.
 * @private
 * @hidden
 */
function setStyleProperties_(text, feature) {
  const properties = getStyleProperties_(text, feature);
  const geometry = feature.getGeometry();

  // Deal with legacy properties
  if (geometry instanceof olGeomPoint) {
    if (properties.isLabel || properties[ngeoFormatFeatureProperties.IS_TEXT]) {
      delete properties.strokeColor;
      delete properties.fillColor;
    } else {
      delete properties.fontColor;
      delete properties.fontSize;
    }
  } else {
    delete properties.fontColor;

    if (geometry instanceof olGeomLineString) {
      delete properties.fillColor;
      delete properties.fillOpacity;
    }
  }

  // Convert font size from px to pt
  if (properties.fontSize) {
    const fontSizeStr = properties.fontSize;
    if (typeof fontSizeStr !== 'string') {
      throw new Error('Wrong fontSizeStr type');
    }
    let fontSize = parseFloat(fontSizeStr);
    if (fontSizeStr.includes('px')) {
      fontSize = Math.round(fontSize / 1.333333);
    }
    properties.fontSize = fontSize;
  }

  // Convert legacy properties
  /** @type {Object<string, string|number|boolean|undefined>} */
  const clone = {};
  for (const key in properties) {
    const value = properties[key];
    if (LegacyProperties_[key]) {
      clone[LegacyProperties_[key]] = value;
    } else {
      clone[key] = value;
    }
  }

  feature.setProperties(clone);
}

/**
 * Cast values in the correct type depending on the property.
 * @param {string} key Key.
 * @param {string} value Value.
 * @return {number|boolean|string} The casted value corresponding to the key.
 * @private
 * @hidden
 * @hidden
 */
function castValue_(key, value) {
  const numProperties = [
    ngeoFormatFeatureProperties.ANGLE,
    ngeoFormatFeatureProperties.OPACITY,
    ngeoFormatFeatureProperties.SIZE,
    ngeoFormatFeatureProperties.STROKE,
    'pointRadius',
    'strokeWidth',
  ];
  const boolProperties = [
    ngeoFormatFeatureProperties.IS_CIRCLE,
    ngeoFormatFeatureProperties.IS_RECTANGLE,
    ngeoFormatFeatureProperties.IS_TEXT,
    ngeoFormatFeatureProperties.SHOW_MEASURE,
    ngeoFormatFeatureProperties.SHOW_LABEL,
    'isCircle',
    'isRectangle',
    'isLabel',
    'showMeasure',
    'showLabel',
  ];

  if (numProperties.includes(key)) {
    return +value;
  } else if (boolProperties.includes(key)) {
    return value === 'true' ? true : false;
  } else {
    return value;
  }
}

/**
 * From a logical sequence of characters, create and return an object of
 * style properties for a feature. The values are cast in the correct type
 * depending on the property. Some properties are also deleted when they don't
 * match the geometry of the feature.
 * @param {string} text Text.
 * @param {olFeature<import("ol/geom/Geometry.js").default>} feature Feature.
 * @return {Object<string, boolean|number|string|undefined>} The style properties for the feature.
 * @private
 * @hidden
 */
function getStyleProperties_(text, feature) {
  const parts = text.split("'");
  /** @type {Object<string, boolean|number|string>} */
  const properties = {};

  for (const encodedPart of parts) {
    const part = decodeURIComponent(encodedPart);
    const keyVal = part.split('*');
    console.assert(keyVal.length === 2);
    const key = keyVal[0];
    const val = keyVal[1];

    properties[key] = castValue_(key, val);
  }

  return properties;
}

/**
 * Encode a {@link import("ol/geom/LineString.js").default} geometry into a logical sequence of
 * characters.
 * @param {Geometry} geometry Geometry.
 * @return {?string} Encoded geometry.
 * @private
 * @hidden
 * @this {FeatureHash}
 */
function writeLineStringGeometry_(geometry) {
  if (geometry instanceof olGeomLineString) {
    const flatCoordinates = geometry.getFlatCoordinates();
    const stride = geometry.getStride();
    const end = flatCoordinates.length;
    return `l(${this.encodeCoordinates_(flatCoordinates, stride, 0, end)})`;
  }
  return null;
}

/**
 * Encode a {@link import("ol/geom/MultiLineString.js").default} geometry into a logical sequence
 * of characters.
 * @param {Geometry} geometry Geometry.
 * @return {?string} Encoded geometry.
 * @private
 * @hidden
 * @this {FeatureHash}
 */
function writeMultiLineStringGeometry_(geometry) {
  if (geometry instanceof olGeomMultiLineString) {
    const ends = geometry.getEnds();
    const lineStringCount = ends.length;
    const flatCoordinates = geometry.getFlatCoordinates();
    const stride = geometry.getStride();
    let offset = 0;
    const textArray = ['L('];
    for (let i = 0; i < lineStringCount; ++i) {
      const end = ends[i];
      const text = this.encodeCoordinates_(flatCoordinates, stride, offset, end);
      if (i !== 0) {
        textArray.push("'");
      }
      textArray.push(text);
      offset = end;
    }
    textArray.push(')');
    return textArray.join('');
  }
  return null;
}

/**
 * Encode a {@link import("ol/geom/Point.js").default} geometry into a logical sequence of
 * characters.
 * @param {Geometry} geometry Geometry.
 * @return {?string} Encoded geometry.
 * @private
 * @hidden
 * @this {FeatureHash}
 */
function writePointGeometry_(geometry) {
  if (geometry instanceof olGeomPoint) {
    const flatCoordinates = geometry.getFlatCoordinates();
    const stride = geometry.getStride();
    const end = flatCoordinates.length;
    return `p(${this.encodeCoordinates_(flatCoordinates, stride, 0, end)})`;
  }
  return null;
}

/**
 * Encode an {@link import("ol/geom/MultiPoint.js").default} geometry into a logical sequence
 * of characters.
 * @param {Geometry} geometry Geometry.
 * @return {?string} Encoded geometry.
 * @private
 * @hidden
 * @this {FeatureHash}
 */
function writeMultiPointGeometry_(geometry) {
  if (geometry instanceof olGeomMultiPoint) {
    const flatCoordinates = geometry.getFlatCoordinates();
    const stride = geometry.getStride();
    const end = flatCoordinates.length;
    return `P(${this.encodeCoordinates_(flatCoordinates, stride, 0, end)})`;
  }
  return null;
}

/**
 * Helper to encode an {@link import("ol/geom/Polygon.js").default} geometry.
 * @param {number[]} flatCoordinates Flat coordinates.
 * @param {number} stride Stride.
 * @param {number} offset Offset.
 * @param {number[]} ends Ends.
 * @param {string[]} textArray Text array.
 * @return {number} The new offset.
 * @private
 * @hidden
 * @this {FeatureHash}
 */
function encodeRings_(flatCoordinates, stride, offset, ends, textArray) {
  const linearRingCount = ends.length;
  for (let i = 0; i < linearRingCount; ++i) {
    // skip the "closing" point
    const end = ends[i] - stride;
    const text = this.encodeCoordinates_(flatCoordinates, stride, offset, end);
    if (i !== 0) {
      textArray.push("'");
    }
    textArray.push(text);
    offset = ends[i];
  }
  return offset;
}

/**
 * Encode an {@link import("ol/geom/Polygon.js").default} geometry into a logical sequence
 * of characters.
 * @param {Geometry} geometry Geometry.
 * @return {?string} Encoded geometry.
 * @private
 * @hidden
 * @this {FeatureHash}
 */
function writePolygonGeometry_(geometry) {
  if (geometry instanceof olGeomPolygon) {
    const flatCoordinates = geometry.getFlatCoordinates();
    const stride = geometry.getStride();
    const ends = geometry.getEnds();
    const offset = 0;
    const textArray = ['a('];
    encodeRings_.call(this, flatCoordinates, stride, offset, ends, textArray);
    textArray.push(')');
    return textArray.join('');
  }
  return null;
}

/**
 * Encode an {@link import("ol/geom/MultiPoligon.js").default} geometry into a logical sequence of
 * characters.
 * @param {Geometry} geometry Geometry.
 * @return {string} Encoded geometry.
 * @private
 * @hidden
 * @this {FeatureHash}
 */
function writeMultiPolygonGeometry_(geometry) {
  if (geometry instanceof olGeomMultiPolygon) {
    const flatCoordinates = geometry.getFlatCoordinates();
    const stride = geometry.getStride();
    const endss = geometry.getEndss();
    const polygonCount = endss.length;
    let offset = 0;
    const textArray = ['A'];
    for (let i = 0; i < polygonCount; ++i) {
      const ends = endss[i];
      textArray.push('(');
      offset = encodeRings_.call(this, flatCoordinates, stride, offset, ends, textArray);
      textArray.push(')');
    }
    return textArray.join('');
  } else {
    throw new Error('Wrong geometry type');
  }
}
