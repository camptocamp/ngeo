/**
 * @module ngeo.format.FeatureHash
 */
import googAsserts from 'goog/asserts.js';
import ngeoFormatFeatureProperties from 'ngeo/format/FeatureProperties.js';
import ngeoFormatFeatureHashStyleType from 'ngeo/format/FeatureHashStyleType.js';
import ngeoUtils from 'ngeo/utils.js';
import * as olBase from 'ol/index.js';
import olFeature from 'ol/Feature.js';
import * as olColor from 'ol/color.js';
import * as olArray from 'ol/array.js';
import * as olFormatFeature from 'ol/format/Feature.js';
import olFormatTextFeature from 'ol/format/TextFeature.js';
import olGeomGeometryLayout from 'ol/geom/GeometryLayout.js';
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

/**
 * @classdesc
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
 * @constructor
 * @struct
 * @extends {ol.format.TextFeature}
 * @param {ngeox.format.FeatureHashOptions=} opt_options Options.
 */
const exports = function(opt_options) {

  olFormatTextFeature.call(this);

  const options = opt_options !== undefined ? opt_options : {};

  /**
   * @type {number}
   * @private
   */
  this.accuracy_ = options.accuracy !== undefined ?
    options.accuracy : exports.ACCURACY_;

  /**
   * @type {boolean}
   * @private
   */
  this.encodeStyles_ = options.encodeStyles !== undefined ?
    options.encodeStyles : true;

  /**
   * @type {function(ol.Feature):Object.<string, (string|number)>}
   * @private
   */
  this.propertiesFunction_ = options.properties !== undefined ?
    options.properties : exports.defaultPropertiesFunction_;

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
   * @type {Object.<string, string>}
   * @private
   */
  exports.LegacyProperties_ = (options.propertiesType !== undefined) &&  options.propertiesType;

};

olBase.inherits(exports, olFormatTextFeature);


/**
 * @type {Object.<ol.geom.GeometryType, ngeo.format.FeatureHashStyleType>}
 * @private
 */
exports.StyleTypes_ = {
  'LineString': ngeoFormatFeatureHashStyleType.LINE_STRING,
  'Point': ngeoFormatFeatureHashStyleType.POINT,
  'Polygon': ngeoFormatFeatureHashStyleType.POLYGON,
  'MultiLineString': ngeoFormatFeatureHashStyleType.LINE_STRING,
  'MultiPoint': ngeoFormatFeatureHashStyleType.POINT,
  'MultiPolygon': ngeoFormatFeatureHashStyleType.POLYGON
};

/**
 * @type {Object.<string, string>}
 * @private
 */
exports.LegacyProperties_ = {};


/**
 * @inheritDoc
 */
exports.prototype.readFeature;


/**
 * @inheritDoc
 */
exports.prototype.readFeatures;


/**
 * @inheritDoc
 */
exports.prototype.readGeometry;


/**
 * @inheritDoc
 */
exports.prototype.writeFeature;


/**
 * @inheritDoc
 */
exports.prototype.writeFeatures;


/**
 * @inheritDoc
 */
exports.prototype.writeGeometry;


/**
 * Characters used to encode the coordinates. The characters "~", "'", "("
 * and ")" are not part of this character set, and used as separators (for
 * example to separate the coordinates from the feature properties).
 * @const
 * @private
 */
exports.CHAR64_ =
    '.-_!*ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghjkmnpqrstuvwxyz';


/**
 * @const
 * @private
 */
exports.ACCURACY_ = 0.1;


/**
 * Get features's properties.
 * @param {ol.Feature} feature Feature.
 * @return {Object.<string, (string|number)>} The feature properties to
 * serialize.
 * @private
 */
exports.defaultPropertiesFunction_ = function(feature) {
  return feature.getProperties();
};


/**
 * Sign then encode a number.
 * @param {number} num Number.
 * @return {string} String.
 * @private
 */
exports.encodeSignedNumber_ = function(num) {
  let signedNum = num << 1;
  if (num < 0) {
    signedNum = ~(signedNum);
  }
  return exports.encodeNumber_(signedNum);
};


/**
 * Transform a number into a logical sequence of characters.
 * @param {number} num Number.
 * @return {string} String.
 * @private
 */
exports.encodeNumber_ = function(num) {
  let encodedNumber = '';
  while (num >= 0x20) {
    encodedNumber += exports.CHAR64_.charAt(
      0x20 | (num & 0x1f));
    num >>= 5;
  }
  encodedNumber += exports.CHAR64_.charAt(num);
  return encodedNumber;
};


/**
 * For a type of geometry, transforms an array of {@link ol.style.Style} into
 * a logical sequence of characters and put the result into the given encoded
 * styles's array.
 * @param {Array.<ol.style.Style>} styles Styles.
 * @param {ol.geom.GeometryType} geometryType Geometry type.
 * @param {Array.<string>} encodedStyles Encoded styles array.
 * @private
 */
exports.encodeStyles_ = function(styles, geometryType, encodedStyles) {
  const styleType = exports.StyleTypes_[geometryType];
  googAsserts.assert(styleType !== undefined);
  for (let i = 0; i < styles.length; ++i) {
    const style = styles[i];
    const fillStyle = style.getFill();
    const imageStyle = style.getImage();
    const strokeStyle = style.getStroke();
    const textStyle = style.getText();
    if (styleType == ngeoFormatFeatureHashStyleType.POLYGON) {
      if (fillStyle !== null) {
        exports.encodeStylePolygon_(
          fillStyle, strokeStyle, encodedStyles);
      }
    } else if (styleType == ngeoFormatFeatureHashStyleType.LINE_STRING) {
      if (strokeStyle !== null) {
        exports.encodeStyleLine_(strokeStyle, encodedStyles);
      }
    } else if (styleType == ngeoFormatFeatureHashStyleType.POINT) {
      if (imageStyle !== null) {
        exports.encodeStylePoint_(imageStyle, encodedStyles);
      }
    }
    if (textStyle !== null) {
      exports.encodeStyleText_(textStyle, encodedStyles);
    }
  }
};


/**
 * Transform an {@link ol.style.Stroke} into a logical sequence of
 * characters and put the result into the given encoded styles's array.
 * @param {ol.style.Stroke} strokeStyle Stroke style.
 * @param {Array.<string>} encodedStyles Encoded styles array.
 * @private
 */
exports.encodeStyleLine_ = function(strokeStyle, encodedStyles) {
  exports.encodeStyleStroke_(strokeStyle, encodedStyles);
};


/**
 * Transform an {@link ol.style.Circle} into a logical sequence of
 * characters and put the result into the given encoded styles's array.
 * @param {ol.style.Image} imageStyle Image style.
 * @param {Array.<string>} encodedStyles Encoded styles array.
 * @private
 */
exports.encodeStylePoint_ = function(imageStyle, encodedStyles) {
  if (imageStyle instanceof olStyleCircle) {
    const radius = imageStyle.getRadius();
    if (encodedStyles.length > 0) {
      encodedStyles.push('\'');
    }
    encodedStyles.push(encodeURIComponent(`pointRadius*${radius}`));
    const fillStyle = imageStyle.getFill();
    if (fillStyle !== null) {
      exports.encodeStyleFill_(fillStyle, encodedStyles);
    }
    const strokeStyle = imageStyle.getStroke();
    if (strokeStyle !== null) {
      exports.encodeStyleStroke_(strokeStyle, encodedStyles);
    }
  }
};


/**
 * Transform an {@link ol.style.Fill} and an {@link ol.style.Stroke} into
 * a logical sequence of characters and put the result into the given
 * encoded styles's array.
 * @param {ol.style.Fill} fillStyle Fill style.
 * @param {ol.style.Stroke} strokeStyle Stroke style.
 * @param {Array.<string>} encodedStyles Encoded styles array.
 * @private
 */
exports.encodeStylePolygon_ = function(fillStyle, strokeStyle, encodedStyles) {
  exports.encodeStyleFill_(fillStyle, encodedStyles);
  if (strokeStyle !== null) {
    exports.encodeStyleStroke_(strokeStyle, encodedStyles);
  }
};


/**
 * Transform an {@link ol.style.Fill} and optionally its properties into
 * a logical sequence of characters and put the result into the given encoded
 * styles's array.
 * @param {ol.style.Fill} fillStyle Fill style.
 * @param {Array.<string>} encodedStyles Encoded styles array.
 * @param {string=} opt_propertyName Property name.
 * @private
 */
exports.encodeStyleFill_ = function(fillStyle, encodedStyles, opt_propertyName) {
  const propertyName = opt_propertyName !== undefined ?
    opt_propertyName : 'fillColor';
  const fillColor = fillStyle.getColor();
  if (fillColor !== null) {
    googAsserts.assert(Array.isArray(fillColor), 'only supporting fill colors');
    const fillColorRgba = olColor.asArray(fillColor);
    googAsserts.assert(Array.isArray(fillColorRgba), 'fill color must be an array');
    const fillColorHex = ngeoUtils.rgbArrayToHex(fillColorRgba);
    if (encodedStyles.length > 0) {
      encodedStyles.push('\'');
    }
    encodedStyles.push(
      encodeURIComponent(`${propertyName}*${fillColorHex}`));
  }
};


/**
 * Transform an {@link ol.style.Stroke} into a logical sequence of
 * characters and put the result into the given encoded styles's array.
 * @param {ol.style.Stroke} strokeStyle Stroke style.
 * @param {Array.<string>} encodedStyles Encoded styles array.
 * @private
 */
exports.encodeStyleStroke_ = function(strokeStyle, encodedStyles) {
  const strokeColor = strokeStyle.getColor();
  if (strokeColor !== null) {
    googAsserts.assert(Array.isArray(strokeColor));
    const strokeColorRgba = olColor.asArray(strokeColor);
    googAsserts.assert(Array.isArray(strokeColorRgba), 'only supporting stroke colors');
    const strokeColorHex = ngeoUtils.rgbArrayToHex(strokeColorRgba);
    if (encodedStyles.length > 0) {
      encodedStyles.push('\'');
    }
    encodedStyles.push(encodeURIComponent(`strokeColor*${strokeColorHex}`));
  }
  const strokeWidth = strokeStyle.getWidth();
  if (strokeWidth !== undefined) {
    if (encodedStyles.length > 0) {
      encodedStyles.push('\'');
    }
    encodedStyles.push(encodeURIComponent(`strokeWidth*${strokeWidth}`));
  }
};


/**
 * Transform an {@link ol.style.Text} into a logical sequence of characters and
 * put the result into the given encoded styles's array.
 * @param {ol.style.Text} textStyle Text style.
 * @param {Array.<string>} encodedStyles Encoded styles array.
 * @private
 */
exports.encodeStyleText_ = function(textStyle, encodedStyles) {
  const fontStyle = textStyle.getFont();
  if (fontStyle !== undefined) {
    const font = fontStyle.split(' ');
    if (font.length >= 3) {
      if (encodedStyles.length > 0) {
        encodedStyles.push('\'');
      }
      encodedStyles.push(encodeURIComponent(`fontSize*${font[1]}`));
    }
  }
  const fillStyle = textStyle.getFill();
  if (fillStyle !== null) {
    exports.encodeStyleFill_(
      fillStyle, encodedStyles, 'fontColor');
  }
};


/**
 * Read a logical sequence of characters and return a corresponding
 * {@link ol.geom.LineString}.
 * @param {string} text Text.
 * @return {ol.geom.LineString} Line string.
 * @this {ngeo.format.FeatureHash}
 * @private
 */
exports.readLineStringGeometry_ = function(text) {
  googAsserts.assert(text.substring(0, 2) === 'l(');
  googAsserts.assert(text[text.length - 1] == ')');
  text = text.substring(2, text.length - 1);
  const flatCoordinates = this.decodeCoordinates_(text);
  const lineString = new olGeomLineString(null);
  lineString.setFlatCoordinates(olGeomGeometryLayout.XY, flatCoordinates);
  return lineString;
};


/**
 * Read a logical sequence of characters and return a corresponding
 * {@link ol.geom.MultiLineString}.
 * @param {string} text Text.
 * @return {ol.geom.MultiLineString} Line string.
 * @this {ngeo.format.FeatureHash}
 * @private
 */
exports.readMultiLineStringGeometry_ = function(text) {
  googAsserts.assert(text.substring(0, 2) === 'L(');
  googAsserts.assert(text[text.length - 1] == ')');
  text = text.substring(2, text.length - 1);
  let flatCoordinates = [];
  const ends = [];
  const lineStrings = text.split('\'');
  for (let i = 0, ii = lineStrings.length; i < ii; ++i) {
    flatCoordinates = this.decodeCoordinates_(lineStrings[i], flatCoordinates);
    ends[i] = flatCoordinates.length;
  }
  const multiLineString = new olGeomMultiLineString(null);
  multiLineString.setFlatCoordinates(
    olGeomGeometryLayout.XY, flatCoordinates, ends);
  return multiLineString;
};


/**
 * Read a logical sequence of characters and return a corresponding
 * {@link ol.geom.Point}.
 * @param {string} text Text.
 * @return {ol.geom.Point} Point.
 * @this {ngeo.format.FeatureHash}
 * @private
 */
exports.readPointGeometry_ = function(text) {
  googAsserts.assert(text.substring(0, 2) === 'p(');
  googAsserts.assert(text[text.length - 1] == ')');
  text = text.substring(2, text.length - 1);
  const flatCoordinates = this.decodeCoordinates_(text);
  googAsserts.assert(flatCoordinates.length === 2);
  const point = new olGeomPoint(null);
  point.setFlatCoordinates(olGeomGeometryLayout.XY, flatCoordinates);
  return point;
};


/**
 * Read a logical sequence of characters and return a corresponding
 * {@link ol.geom.MultiPoint}.
 * @param {string} text Text.
 * @return {ol.geom.MultiPoint} MultiPoint.
 * @this {ngeo.format.FeatureHash}
 * @private
 */
exports.readMultiPointGeometry_ = function(text) {
  googAsserts.assert(text.substring(0, 2) === 'P(');
  googAsserts.assert(text[text.length - 1] == ')');
  text = text.substring(2, text.length - 1);
  const flatCoordinates = this.decodeCoordinates_(text);
  const multiPoint = new olGeomMultiPoint(null);
  multiPoint.setFlatCoordinates(olGeomGeometryLayout.XY, flatCoordinates);
  return multiPoint;
};


/**
 * Read a logical sequence of characters and return a corresponding
 * {@link ol.geom.Polygon}.
 * @param {string} text Text.
 * @return {ol.geom.Polygon} Polygon.
 * @this {ngeo.format.FeatureHash}
 * @private
 */
exports.readPolygonGeometry_ = function(text) {
  googAsserts.assert(text.substring(0, 2) === 'a(');
  googAsserts.assert(text[text.length - 1] == ')');
  text = text.substring(2, text.length - 1);
  let flatCoordinates = [];
  const ends = [];
  const rings = text.split('\'');
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
  const polygon = new olGeomPolygon(null);
  polygon.setFlatCoordinates(olGeomGeometryLayout.XY, flatCoordinates, ends);
  return polygon;
};


/**
 * Read a logical sequence of characters and return a corresponding
 * {@link ol.geom.MultiPolygon}.
 * @param {string} text Text.
 * @return {ol.geom.MultiPolygon} MultiPolygon.
 * @this {ngeo.format.FeatureHash}
 * @private
 */
exports.readMultiPolygonGeometry_ = function(text) {
  googAsserts.assert(text.substring(0, 2) === 'A(');
  googAsserts.assert(text[text.length - 1] == ')');
  text = text.substring(2, text.length - 1);
  let flatCoordinates = [];
  const endss = [];
  const polygons = text.split(')(');
  for (let i = 0, ii = polygons.length; i < ii; ++i) {
    const rings = polygons[i].split('\'');
    const ends = endss[i] = [];
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
  const multipolygon = new olGeomMultiPolygon(null);
  multipolygon.setFlatCoordinates(
    olGeomGeometryLayout.XY, flatCoordinates, endss);
  return multipolygon;
};


/**
 * DEPRECATED - Use the `ngeo.misc.FeatureHelper` instead in combination with the
 * `setStyle: false` option.
 *
 * Read a logical sequence of characters and apply the decoded style on the
 * given feature.
 * @param {string} text Text.
 * @param {ol.Feature} feature Feature.
 * @private
 */
exports.setStyleInFeature_ = function(text, feature) {
  if (text == '') {
    return;
  }
  const properties = exports.getStyleProperties_(text, feature);
  const fillColor = properties['fillColor'];
  const fontSize = properties['fontSize'];
  const fontColor = properties['fontColor'];
  const pointRadius = properties['pointRadius'];
  const strokeColor = properties['strokeColor'];
  const strokeWidth = properties['strokeWidth'];

  let fillStyle = null;
  if (fillColor !== undefined) {
    fillStyle = new olStyleFill({
      color: /** @type {Array<number>|string} */ (fillColor)
    });
  }
  let strokeStyle = null;
  if (strokeColor !== undefined && strokeWidth !== undefined) {
    strokeStyle = new olStyleStroke({
      color: /** @type {Array<number>|string} */ (strokeColor),
      width: /** @type {number} */ (strokeWidth)
    });
  }
  let imageStyle = null;
  if (pointRadius !== undefined) {
    imageStyle = new olStyleCircle({
      radius: /** @type {number} */ (pointRadius),
      fill: fillStyle,
      stroke: strokeStyle
    });
    fillStyle = strokeStyle = null;
  }
  let textStyle = null;
  if (fontSize !== undefined && fontColor !== undefined) {
    textStyle = new olStyleText({
      font: `${fontSize} sans-serif`,
      fill: new olStyleFill({
        color: /** @type {Array<number>|string} */ (fontColor)
      })
    });
  }
  const style = new olStyleStyle({
    fill: fillStyle,
    image: imageStyle,
    stroke: strokeStyle,
    text: textStyle
  });
  feature.setStyle(style);
};


/**
 * Read a logical sequence of characters and apply the decoded result as
 * style properties for the feature. Legacy keys are converted to the new ones
 * for compatibility.
 * @param {string} text Text.
 * @param {ol.Feature} feature Feature.
 * @private
 */
exports.setStyleProperties_ = function(text, feature) {

  const properties = exports.getStyleProperties_(text, feature);
  const geometry = feature.getGeometry();

  // Deal with legacy properties
  if (geometry instanceof olGeomPoint) {
    if (properties['isLabel'] ||
        properties[ngeoFormatFeatureProperties.IS_TEXT]) {
      delete properties['strokeColor'];
      delete properties['fillColor'];
    } else {
      delete properties['fontColor'];
      delete properties['fontSize'];
    }
  } else {
    delete properties['fontColor'];

    if (geometry instanceof olGeomLineString) {
      delete properties['fillColor'];
      delete properties['fillOpacity'];
    }
  }

  // Convert font size from px to pt
  if (properties['fontSize']) {
    let fontSize = parseFloat(properties['fontSize']);
    if (properties['fontSize'].indexOf('px') !== -1) {
      fontSize = Math.round(fontSize / 1.333333);
    }
    properties['fontSize'] = fontSize;
  }

  // Convert legacy properties
  const clone = {};
  for (const key in properties) {
    const value = properties[key];
    if (exports.LegacyProperties_[key]) {
      clone[exports.LegacyProperties_[key]] = value;
    } else {
      clone[key] = value;
    }
  }

  feature.setProperties(clone);
};


/**
 * Cast values in the correct type depending on the property.
 * @param {string} key Key.
 * @param {string} value Value.
 * @return {number|boolean|string} The casted value corresponding to the key.
 * @private
 */
exports.castValue_ = function(key, value) {
  const numProperties = [
    ngeoFormatFeatureProperties.ANGLE,
    ngeoFormatFeatureProperties.OPACITY,
    ngeoFormatFeatureProperties.SIZE,
    ngeoFormatFeatureProperties.STROKE,
    'pointRadius',
    'strokeWidth'
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
    'showLabel'
  ];

  if (olArray.includes(numProperties, key)) {
    return +value;
  } else if (olArray.includes(boolProperties, key)) {
    return (value === 'true') ? true : false;
  } else {
    return value;
  }
};


/**
 * From a logical sequence of characters, create and return an object of
 * style properties for a feature. The values are cast in the correct type
 * depending on the property. Some properties are also deleted when they don't
 * match the geometry of the feature.
 * @param {string} text Text.
 * @param {ol.Feature} feature Feature.
 * @return {Object.<string, boolean|number|string>} The style properties for
 *     the feature.
 * @private
 */
exports.getStyleProperties_ = function(text, feature) {
  const parts = text.split('\'');
  const properties = {};

  for (let i = 0; i < parts.length; ++i) {
    const part = decodeURIComponent(parts[i]);
    const keyVal = part.split('*');
    googAsserts.assert(keyVal.length === 2);
    const key = keyVal[0];
    const val = keyVal[1];

    properties[key] = exports.castValue_(key, val);
  }

  return properties;
};


/**
 * Encode a {@link ol.geom.LineString} geometry into a logical sequence of
 * characters.
 * @param {ol.geom.Geometry} geometry Geometry.
 * @return {string} Encoded geometry.
 * @this {ngeo.format.FeatureHash}
 * @private
 */
exports.writeLineStringGeometry_ = function(geometry) {
  googAsserts.assertInstanceof(geometry, olGeomLineString);
  const flatCoordinates = geometry.getFlatCoordinates();
  const stride = geometry.getStride();
  const end = flatCoordinates.length;
  return `l(${this.encodeCoordinates_(flatCoordinates, stride, 0, end)})`;
};


/**
 * Encode a {@link ol.geom.MultiLineString} geometry into a logical sequence
 * of characters.
 * @param {ol.geom.Geometry} geometry Geometry.
 * @return {string} Encoded geometry.
 * @this {ngeo.format.FeatureHash}
 * @private
 */
exports.writeMultiLineStringGeometry_ = function(geometry) {
  googAsserts.assertInstanceof(geometry, olGeomMultiLineString);
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
      textArray.push('\'');
    }
    textArray.push(text);
    offset = end;
  }
  textArray.push(')');
  return textArray.join('');
};


/**
 * Encode a {@link ol.geom.Point} geometry into a logical sequence of
 * characters.
 * @param {ol.geom.Geometry} geometry Geometry.
 * @return {string} Encoded geometry.
 * @this {ngeo.format.FeatureHash}
 * @private
 */
exports.writePointGeometry_ = function(geometry) {
  googAsserts.assertInstanceof(geometry, olGeomPoint);
  const flatCoordinates = geometry.getFlatCoordinates();
  const stride = geometry.getStride();
  const end = flatCoordinates.length;
  return `p(${this.encodeCoordinates_(flatCoordinates, stride, 0, end)})`;
};


/**
 * Encode an {@link ol.geom.MultiPoint} geometry into a logical sequence
 * of characters.
 * @param {ol.geom.Geometry} geometry Geometry.
 * @return {string} Encoded geometry.
 * @this {ngeo.format.FeatureHash}
 * @private
 */
exports.writeMultiPointGeometry_ = function(geometry) {
  googAsserts.assertInstanceof(geometry, olGeomMultiPoint);
  const flatCoordinates = geometry.getFlatCoordinates();
  const stride = geometry.getStride();
  const end = flatCoordinates.length;
  return `P(${this.encodeCoordinates_(flatCoordinates, stride, 0, end)})`;
};


/**
 * Helper to encode an {@link ol.geom.Polygon} geometry.
 * @param {Array.<number>} flatCoordinates Flat coordinates.
 * @param {number} stride Stride.
 * @param {number} offset Offset.
 * @param {Array.<number>} ends Ends.
 * @param {Array.<string>} textArray Text array.
 * @return {number} The new offset.
 * @this {ngeo.format.FeatureHash}
 * @private
 */
exports.encodeRings_ = function(flatCoordinates, stride, offset, ends, textArray) {
  const linearRingCount = ends.length;
  for (let i = 0; i < linearRingCount; ++i) {
    // skip the "closing" point
    const end = ends[i] - stride;
    const text = this.encodeCoordinates_(flatCoordinates, stride, offset, end);
    if (i !== 0) {
      textArray.push('\'');
    }
    textArray.push(text);
    offset = ends[i];
  }
  return offset;
};


/**
 * Encode an {@link ol.geom.Polygon} geometry into a logical sequence
 * of characters.
 * @param {ol.geom.Geometry} geometry Geometry.
 * @return {string} Encoded geometry.
 * @this {ngeo.format.FeatureHash}
 * @private
 */
exports.writePolygonGeometry_ = function(geometry) {
  googAsserts.assertInstanceof(geometry, olGeomPolygon);
  const flatCoordinates = geometry.getFlatCoordinates();
  const stride = geometry.getStride();
  const ends = geometry.getEnds();
  const offset = 0;
  const textArray = ['a('];
  exports.encodeRings_.call(this,
    flatCoordinates, stride, offset, ends, textArray);
  textArray.push(')');
  return textArray.join('');
};


/**
 * Encode an {@link ol.geom.MultiPoligon} geometry into a logical sequence of
 * characters.
 * @param {ol.geom.Geometry} geometry Geometry.
 * @return {string} Encoded geometry.
 * @this {ngeo.format.FeatureHash}
 * @private
 */
exports.writeMultiPolygonGeometry_ = function(geometry) {
  googAsserts.assertInstanceof(geometry, olGeomMultiPolygon);
  const flatCoordinates = geometry.getFlatCoordinates();
  const stride = geometry.getStride();
  const endss = geometry.getEndss();
  const polygonCount = endss.length;
  let offset = 0;
  const textArray = ['A'];
  for (let i = 0; i < polygonCount; ++i) {
    const ends = endss[i];
    textArray.push('(');
    offset = exports.encodeRings_.call(this,
      flatCoordinates, stride, offset, ends, textArray);
    textArray.push(')');
  }
  return textArray.join('');
};


/**
 * @const
 * @private
 * @type {Object.<string, function(string):ol.geom.Geometry>}
 */
exports.GEOMETRY_READERS_ = {
  'P': exports.readMultiPointGeometry_,
  'L': exports.readMultiLineStringGeometry_,
  'A': exports.readMultiPolygonGeometry_,
  'l': exports.readLineStringGeometry_,
  'p': exports.readPointGeometry_,
  'a': exports.readPolygonGeometry_
};


/**
 * @const
 * @private
 * @type {Object.<string, function(ol.geom.Geometry):string>}
 */
exports.GEOMETRY_WRITERS_ = {
  'MultiLineString': exports.writeMultiLineStringGeometry_,
  'MultiPoint': exports.writeMultiPointGeometry_,
  'MultiPolygon': exports.writeMultiPolygonGeometry_,
  'LineString': exports.writeLineStringGeometry_,
  'Point': exports.writePointGeometry_,
  'Polygon': exports.writePolygonGeometry_
};


/**
 * Read a logical sequence of characters and return (or complet then return)
 * an array of numbers. The coordinates are assumed to be in
 * two dimensions and in latitude, longitude order.
 * corresponding to a geometry's coordinates.
 * @param {string} text Text.
 * @param {Array.<number>=} opt_flatCoordinates Flat coordinates array.
 * @return {Array.<number>} Flat coordinates.
 * @private
 */
exports.prototype.decodeCoordinates_ = function(text, opt_flatCoordinates) {
  const len = text.length;
  let index = 0;
  const flatCoordinates = opt_flatCoordinates !== undefined ?
    opt_flatCoordinates : [];
  let i = flatCoordinates.length;
  while (index < len) {
    let b;
    let shift = 0;
    let result = 0;
    do {
      b = exports.CHAR64_.indexOf(text.charAt(index++));
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 32);
    const dx = ((result & 1) ? ~(result >> 1) : (result >> 1));
    this.prevX_ += dx;
    shift = 0;
    result = 0;
    do {
      b = exports.CHAR64_.indexOf(text.charAt(index++));
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 32);
    const dy = ((result & 1) ? ~(result >> 1) : (result >> 1));
    this.prevY_ += dy;
    flatCoordinates[i++] = this.prevX_ * this.accuracy_;
    flatCoordinates[i++] = this.prevY_ * this.accuracy_;
  }
  return flatCoordinates;
};


/**
 * Encode an array of number (corresponding to some coordinates) into a
 * logical sequence of characters. The coordinates are assumed to be in
 * two dimensions and in latitude, longitude order.
 * @param {Array.<number>} flatCoordinates Flat coordinates.
 * @param {number} stride Stride.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @return {string} String.
 * @private
 */
exports.prototype.encodeCoordinates_ = function(flatCoordinates, stride, offset, end) {
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
    encodedCoordinates += exports.encodeSignedNumber_(dx) +
        exports.encodeSignedNumber_(dy);
  }
  return encodedCoordinates;
};


/**
 * Read a feature from a logical sequence of characters.
 * @param {string} text Text.
 * @param {olx.format.ReadOptions=} opt_options Read options.
 * @return {ol.Feature} Feature.
 * @protected
 * @override
 */
exports.prototype.readFeatureFromText = function(text, opt_options) {
  googAsserts.assert(text.length > 2);
  googAsserts.assert(text[1] === '(');
  googAsserts.assert(text[text.length - 1] === ')');
  let splitIndex = text.indexOf('~');
  const geometryText = splitIndex >= 0 ?
    `${text.substring(0, splitIndex)})` : text;
  const geometry = this.readGeometryFromText(geometryText, opt_options);
  const feature = new olFeature(geometry);
  if (splitIndex >= 0) {
    const attributesAndStylesText = text.substring(
      splitIndex + 1, text.length - 1);
    splitIndex = attributesAndStylesText.indexOf('~');
    const attributesText = splitIndex >= 0 ?
      attributesAndStylesText.substring(0, splitIndex) :
      attributesAndStylesText;
    if (attributesText != '') {
      const parts = attributesText.split('\'');
      for (let i = 0; i < parts.length; ++i) {
        const part = decodeURIComponent(parts[i]);
        const keyVal = part.split('*');
        googAsserts.assert(keyVal.length === 2);
        let key = keyVal[0];
        const value = keyVal[1];
        if (!this.setStyle_ && exports.LegacyProperties_[key]) {
          key = exports.LegacyProperties_[key];
        }
        feature.set(key, exports.castValue_(key, value));
      }
    }
    if (splitIndex >= 0) {
      const stylesText = attributesAndStylesText.substring(splitIndex + 1);
      if (this.setStyle_) {
        exports.setStyleInFeature_(stylesText, feature);
      } else {
        exports.setStyleProperties_(stylesText, feature);
      }
    }
  }
  return feature;
};


/**
 * Read multiple features from a logical sequence of characters.
 * @param {string} text Text.
 * @param {olx.format.ReadOptions=} opt_options Read options.
 * @return {Array.<ol.Feature>} Features.
 * @protected
 * @override
 */
exports.prototype.readFeaturesFromText = function(text, opt_options) {
  googAsserts.assert(text[0] === 'F');
  /** @type {Array.<ol.Feature>} */
  const features = [];
  text = text.substring(1);
  while (text.length > 0) {
    const index = text.indexOf(')');
    googAsserts.assert(index >= 0);
    const feature = this.readFeatureFromText(
      text.substring(0, index + 1), opt_options);
    features.push(feature);
    text = text.substring(index + 1);
  }
  return features;
};


/**
 * Read a geometry from a logical sequence of characters.
 * @param {string} text Text.
 * @param {olx.format.ReadOptions=} opt_options Read options.
 * @return {ol.geom.Geometry} Geometry.
 * @protected
 * @override
 */
exports.prototype.readGeometryFromText = function(text, opt_options) {
  const geometryReader = exports.GEOMETRY_READERS_[text[0]];
  googAsserts.assert(geometryReader !== undefined);
  this.prevX_ = 0;
  this.prevY_ = 0;
  return geometryReader.call(this, text);
};


/**
 * Encode a feature into a logical sequence of characters.
 * @param {ol.Feature} feature Feature.
 * @param {olx.format.ReadOptions=} opt_options Read options.
 * @return {string} Encoded feature.
 * @protected
 * @override
 */
exports.prototype.writeFeatureText = function(feature, opt_options) {
  const /** @type {Array.<string>} */ encodedParts = [];

  // encode geometry

  let encodedGeometry = '';
  const geometry = feature.getGeometry();
  if (geometry) {
    encodedGeometry = this.writeGeometryText(geometry, opt_options);
  }

  if (encodedGeometry.length > 0) {
    // remove the final bracket
    googAsserts.assert(encodedGeometry[encodedGeometry.length - 1] === ')');
    encodedGeometry = encodedGeometry.substring(0, encodedGeometry.length - 1);
    encodedParts.push(encodedGeometry);
  }

  // encode properties

  const /** @type {Array.<string>} */ encodedProperties = [];
  const propFunction = this.propertiesFunction_(feature);
  for (const key in propFunction) {
    const value = propFunction[key];
    if (value !== undefined && value !== null && key !== feature.getGeometryName()) {
      if (encodedProperties.length !== 0) {
        encodedProperties.push('\'');
      }
      const encoded = encodeURIComponent(
        `${key.replace(/[()'*]/g, '_')}*${
          value.toString().replace(/[()'*]/g, '_')}`);
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
      let styles = styleFunction.call(feature, 0);
      if (styles !== null) {
        const encodedStyles = [];
        styles = Array.isArray(styles) ? styles : [styles];
        exports.encodeStyles_(
          styles, geometry.getType(), encodedStyles);
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
};


/**
 * Encode an array of features into a logical sequence of characters.
 * @param {Array.<ol.Feature>} features Feature.
 * @param {olx.format.ReadOptions=} opt_options Read options.
 * @return {string} Encoded features.
 * @protected
 * @override
 */
exports.prototype.writeFeaturesText = function(features, opt_options) {
  const textArray = [];
  if (features.length > 0) {
    textArray.push('F');
    for (let i = 0, ii = features.length; i < ii; ++i) {
      textArray.push(this.writeFeatureText(features[i], opt_options));
    }
  }
  return textArray.join('');
};


/**
 * Encode a geometry into a logical sequence of characters.
 * @param {ol.geom.Geometry} geometry Geometry.
 * @param {olx.format.ReadOptions=} opt_options Read options.
 * @return {string} Encoded geometry.
 * @protected
 * @override
 */
exports.prototype.writeGeometryText = function(geometry, opt_options) {
  const geometryWriter = exports.GEOMETRY_WRITERS_[
    geometry.getType()];
  googAsserts.assert(geometryWriter !== undefined);
  const transformedGeometry = /** @type {ol.geom.Geometry} */
      (olFormatFeature.transformWithOptions(geometry, true, opt_options));
  this.prevX_ = 0;
  this.prevY_ = 0;
  return geometryWriter.call(this, transformedGeometry);
};


export default exports;
