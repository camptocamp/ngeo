goog.provide('ngeo.format.FeatureHash');

goog.require('goog.asserts');
goog.require('ngeo.utils');
goog.require('ol.Feature');
goog.require('ol.color');
goog.require('ol.format.TextFeature');
goog.require('ol.geom.GeometryLayout');
goog.require('ol.geom.GeometryType');
goog.require('ol.geom.LineString');
goog.require('ol.geom.MultiLineString');
goog.require('ol.geom.MultiPoint');
goog.require('ol.geom.MultiPolygon');
goog.require('ol.geom.Point');
goog.require('ol.geom.Polygon');
goog.require('ol.style.Circle');
goog.require('ol.style.Fill');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');
goog.require('ol.style.Text');


/**
 * @enum {string}
 */
ngeo.format.FeatureHashStyleType = {
  LINE_STRING: 'LineString',
  POINT: 'Point',
  POLYGON: 'Polygon'
};


/**
 * @type {Object.<ol.geom.GeometryType, ngeo.format.FeatureHashStyleType>}
 * @private
 */
ngeo.format.FeatureHashStyleTypes_ = {};

ngeo.format.FeatureHashStyleTypes_[ol.geom.GeometryType.LINE_STRING] =
    ngeo.format.FeatureHashStyleType.LINE_STRING;
ngeo.format.FeatureHashStyleTypes_[ol.geom.GeometryType.POINT] =
    ngeo.format.FeatureHashStyleType.POINT;
ngeo.format.FeatureHashStyleTypes_[ol.geom.GeometryType.POLYGON] =
    ngeo.format.FeatureHashStyleType.POLYGON;
ngeo.format.FeatureHashStyleTypes_[ol.geom.GeometryType.MULTI_LINE_STRING] =
    ngeo.format.FeatureHashStyleType.LINE_STRING;
ngeo.format.FeatureHashStyleTypes_[ol.geom.GeometryType.MULTI_POINT] =
    ngeo.format.FeatureHashStyleType.POINT;
ngeo.format.FeatureHashStyleTypes_[ol.geom.GeometryType.MULTI_POLYGON] =
    ngeo.format.FeatureHashStyleType.POLYGON;


/**
 * @type {Object.<string, string>}
 * @private
 */
ngeo.format.FeatureHashLegacyProperties_ = {};


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
 * @export
 */
ngeo.format.FeatureHash = function(opt_options) {

  ol.format.TextFeature.call(this);

  const options = opt_options !== undefined ? opt_options : {};

  /**
   * @type {number}
   * @private
   */
  this.accuracy_ = options.accuracy !== undefined ?
    options.accuracy : ngeo.format.FeatureHash.ACCURACY_;

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
    options.properties : ngeo.format.FeatureHash.defaultPropertiesFunction_;

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
  ngeo.format.FeatureHashLegacyProperties_ = (options.propertiesType !== undefined) &&  options.propertiesType;

};
ol.inherits(ngeo.format.FeatureHash, ol.format.TextFeature);


/**
 * @inheritDoc
 * @export
 */
ngeo.format.FeatureHash.prototype.readFeature;


/**
 * @inheritDoc
 * @export
 */
ngeo.format.FeatureHash.prototype.readFeatures;


/**
 * @inheritDoc
 * @export
 */
ngeo.format.FeatureHash.prototype.readGeometry;


/**
 * @inheritDoc
 * @export
 */
ngeo.format.FeatureHash.prototype.writeFeature;


/**
 * @inheritDoc
 * @export
 */
ngeo.format.FeatureHash.prototype.writeFeatures;


/**
 * @inheritDoc
 * @export
 */
ngeo.format.FeatureHash.prototype.writeGeometry;


/**
 * Characters used to encode the coordinates. The characters "~", "'", "("
 * and ")" are not part of this character set, and used as separators (for
 * example to separate the coordinates from the feature properties).
 * @const
 * @private
 */
ngeo.format.FeatureHash.CHAR64_ =
    '.-_!*ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghjkmnpqrstuvwxyz';


/**
 * @const
 * @private
 */
ngeo.format.FeatureHash.ACCURACY_ = 0.1;


/**
 * Get features's properties.
 * @param {ol.Feature} feature Feature.
 * @return {Object.<string, (string|number)>} The feature properties to
 * serialize.
 * @private
 */
ngeo.format.FeatureHash.defaultPropertiesFunction_ = function(feature) {
  return feature.getProperties();
};


/**
 * Sign then encode a number.
 * @param {number} num Number.
 * @return {string} String.
 * @private
 */
ngeo.format.FeatureHash.encodeSignedNumber_ = function(num) {
  let signedNum = num << 1;
  if (num < 0) {
    signedNum = ~(signedNum);
  }
  return ngeo.format.FeatureHash.encodeNumber_(signedNum);
};


/**
 * Transform a number into a logical sequence of characters.
 * @param {number} num Number.
 * @return {string} String.
 * @private
 */
ngeo.format.FeatureHash.encodeNumber_ = function(num) {
  let encodedNumber = '';
  while (num >= 0x20) {
    encodedNumber += ngeo.format.FeatureHash.CHAR64_.charAt(
      0x20 | (num & 0x1f));
    num >>= 5;
  }
  encodedNumber += ngeo.format.FeatureHash.CHAR64_.charAt(num);
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
ngeo.format.FeatureHash.encodeStyles_ = function(styles, geometryType, encodedStyles) {
  const styleType = ngeo.format.FeatureHashStyleTypes_[geometryType];
  goog.asserts.assert(styleType !== undefined);
  for (let i = 0; i < styles.length; ++i) {
    const style = styles[i];
    const fillStyle = style.getFill();
    const imageStyle = style.getImage();
    const strokeStyle = style.getStroke();
    const textStyle = style.getText();
    if (styleType == ngeo.format.FeatureHashStyleType.POLYGON) {
      if (fillStyle !== null) {
        ngeo.format.FeatureHash.encodeStylePolygon_(
          fillStyle, strokeStyle, encodedStyles);
      }
    } else if (styleType == ngeo.format.FeatureHashStyleType.LINE_STRING) {
      if (strokeStyle !== null) {
        ngeo.format.FeatureHash.encodeStyleLine_(strokeStyle, encodedStyles);
      }
    } else if (styleType == ngeo.format.FeatureHashStyleType.POINT) {
      if (imageStyle !== null) {
        ngeo.format.FeatureHash.encodeStylePoint_(imageStyle, encodedStyles);
      }
    }
    if (textStyle !== null) {
      ngeo.format.FeatureHash.encodeStyleText_(textStyle, encodedStyles);
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
ngeo.format.FeatureHash.encodeStyleLine_ = function(strokeStyle, encodedStyles) {
  ngeo.format.FeatureHash.encodeStyleStroke_(strokeStyle, encodedStyles);
};


/**
 * Transform an {@link ol.style.Circle} into a logical sequence of
 * characters and put the result into the given encoded styles's array.
 * @param {ol.style.Image} imageStyle Image style.
 * @param {Array.<string>} encodedStyles Encoded styles array.
 * @private
 */
ngeo.format.FeatureHash.encodeStylePoint_ = function(imageStyle, encodedStyles) {
  if (imageStyle instanceof ol.style.Circle) {
    const radius = imageStyle.getRadius();
    if (encodedStyles.length > 0) {
      encodedStyles.push('\'');
    }
    encodedStyles.push(encodeURIComponent(`pointRadius*${radius}`));
    const fillStyle = imageStyle.getFill();
    if (fillStyle !== null) {
      ngeo.format.FeatureHash.encodeStyleFill_(fillStyle, encodedStyles);
    }
    const strokeStyle = imageStyle.getStroke();
    if (strokeStyle !== null) {
      ngeo.format.FeatureHash.encodeStyleStroke_(strokeStyle, encodedStyles);
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
ngeo.format.FeatureHash.encodeStylePolygon_ = function(fillStyle, strokeStyle, encodedStyles) {
  ngeo.format.FeatureHash.encodeStyleFill_(fillStyle, encodedStyles);
  if (strokeStyle !== null) {
    ngeo.format.FeatureHash.encodeStyleStroke_(strokeStyle, encodedStyles);
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
ngeo.format.FeatureHash.encodeStyleFill_ = function(fillStyle, encodedStyles, opt_propertyName) {
  const propertyName = opt_propertyName !== undefined ?
    opt_propertyName : 'fillColor';
  const fillColor = fillStyle.getColor();
  if (fillColor !== null) {
    goog.asserts.assert(Array.isArray(fillColor), 'only supporting fill colors');
    const fillColorRgba = ol.color.asArray(fillColor);
    goog.asserts.assert(Array.isArray(fillColorRgba), 'fill color must be an array');
    const fillColorHex = ngeo.utils.rgbArrayToHex(fillColorRgba);
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
ngeo.format.FeatureHash.encodeStyleStroke_ = function(strokeStyle, encodedStyles) {
  const strokeColor = strokeStyle.getColor();
  if (strokeColor !== null) {
    goog.asserts.assert(Array.isArray(strokeColor));
    const strokeColorRgba = ol.color.asArray(strokeColor);
    goog.asserts.assert(Array.isArray(strokeColorRgba), 'only supporting stroke colors');
    const strokeColorHex = ngeo.utils.rgbArrayToHex(strokeColorRgba);
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
ngeo.format.FeatureHash.encodeStyleText_ = function(textStyle, encodedStyles) {
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
    ngeo.format.FeatureHash.encodeStyleFill_(
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
ngeo.format.FeatureHash.readLineStringGeometry_ = function(text) {
  goog.asserts.assert(text.substring(0, 2) === 'l(');
  goog.asserts.assert(text[text.length - 1] == ')');
  text = text.substring(2, text.length - 1);
  const flatCoordinates = this.decodeCoordinates_(text);
  const lineString = new ol.geom.LineString(null);
  lineString.setFlatCoordinates(ol.geom.GeometryLayout.XY, flatCoordinates);
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
ngeo.format.FeatureHash.readMultiLineStringGeometry_ = function(text) {
  goog.asserts.assert(text.substring(0, 2) === 'L(');
  goog.asserts.assert(text[text.length - 1] == ')');
  text = text.substring(2, text.length - 1);
  let flatCoordinates = [];
  const ends = [];
  const lineStrings = text.split('\'');
  for (let i = 0, ii = lineStrings.length; i < ii; ++i) {
    flatCoordinates = this.decodeCoordinates_(lineStrings[i], flatCoordinates);
    ends[i] = flatCoordinates.length;
  }
  const multiLineString = new ol.geom.MultiLineString(null);
  multiLineString.setFlatCoordinates(
    ol.geom.GeometryLayout.XY, flatCoordinates, ends);
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
ngeo.format.FeatureHash.readPointGeometry_ = function(text) {
  goog.asserts.assert(text.substring(0, 2) === 'p(');
  goog.asserts.assert(text[text.length - 1] == ')');
  text = text.substring(2, text.length - 1);
  const flatCoordinates = this.decodeCoordinates_(text);
  goog.asserts.assert(flatCoordinates.length === 2);
  const point = new ol.geom.Point(null);
  point.setFlatCoordinates(ol.geom.GeometryLayout.XY, flatCoordinates);
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
ngeo.format.FeatureHash.readMultiPointGeometry_ = function(text) {
  goog.asserts.assert(text.substring(0, 2) === 'P(');
  goog.asserts.assert(text[text.length - 1] == ')');
  text = text.substring(2, text.length - 1);
  const flatCoordinates = this.decodeCoordinates_(text);
  const multiPoint = new ol.geom.MultiPoint(null);
  multiPoint.setFlatCoordinates(ol.geom.GeometryLayout.XY, flatCoordinates);
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
ngeo.format.FeatureHash.readPolygonGeometry_ = function(text) {
  goog.asserts.assert(text.substring(0, 2) === 'a(');
  goog.asserts.assert(text[text.length - 1] == ')');
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
  const polygon = new ol.geom.Polygon(null);
  polygon.setFlatCoordinates(ol.geom.GeometryLayout.XY, flatCoordinates, ends);
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
ngeo.format.FeatureHash.readMultiPolygonGeometry_ = function(text) {
  goog.asserts.assert(text.substring(0, 2) === 'A(');
  goog.asserts.assert(text[text.length - 1] == ')');
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
  const multipolygon = new ol.geom.MultiPolygon(null);
  multipolygon.setFlatCoordinates(
    ol.geom.GeometryLayout.XY, flatCoordinates, endss);
  return multipolygon;
};


/**
 * DEPRECATED - Use the `ngeo.FeatureHelper` instead in combination with the
 * `setStyle: false` option.
 *
 * Read a logical sequence of characters and apply the decoded style on the
 * given feature.
 * @param {string} text Text.
 * @param {ol.Feature} feature Feature.
 * @private
 */
ngeo.format.FeatureHash.setStyleInFeature_ = function(text, feature) {
  if (text == '') {
    return;
  }
  const properties = ngeo.format.FeatureHash.getStyleProperties_(text, feature);
  const fillColor = properties['fillColor'];
  const fontSize = properties['fontSize'];
  const fontColor = properties['fontColor'];
  const pointRadius = properties['pointRadius'];
  const strokeColor = properties['strokeColor'];
  const strokeWidth = properties['strokeWidth'];

  let fillStyle = null;
  if (fillColor !== undefined) {
    fillStyle = new ol.style.Fill({
      color: /** @type {Array<number>|string} */ (fillColor)
    });
  }
  let strokeStyle = null;
  if (strokeColor !== undefined && strokeWidth !== undefined) {
    strokeStyle = new ol.style.Stroke({
      color: /** @type {Array<number>|string} */ (strokeColor),
      width: /** @type {number} */ (strokeWidth)
    });
  }
  let imageStyle = null;
  if (pointRadius !== undefined) {
    imageStyle = new ol.style.Circle({
      radius: /** @type {number} */ (pointRadius),
      fill: fillStyle,
      stroke: strokeStyle
    });
    fillStyle = strokeStyle = null;
  }
  let textStyle = null;
  if (fontSize !== undefined && fontColor !== undefined) {
    textStyle = new ol.style.Text({
      font: `${fontSize} sans-serif`,
      fill: new ol.style.Fill({
        color: /** @type {Array<number>|string} */ (fontColor)
      })
    });
  }
  const style = new ol.style.Style({
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
ngeo.format.FeatureHash.setStyleProperties_ = function(text, feature) {

  const properties = ngeo.format.FeatureHash.getStyleProperties_(text, feature);
  const geometry = feature.getGeometry();

  // Deal with legacy properties
  if (geometry instanceof ol.geom.Point) {
    if (properties['isLabel'] ||
        properties[ngeo.FeatureProperties.IS_TEXT]) {
      delete properties['strokeColor'];
      delete properties['fillColor'];
    } else {
      delete properties['fontColor'];
      delete properties['fontSize'];
    }
  } else {
    delete properties['fontColor'];

    if (geometry instanceof ol.geom.LineString) {
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
    if (ngeo.format.FeatureHashLegacyProperties_[key]) {
      clone[ngeo.format.FeatureHashLegacyProperties_[key]] = value;
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
ngeo.format.FeatureHash.castValue_ = function(key, value) {
  const numProperties = [
    ngeo.FeatureProperties.ANGLE,
    ngeo.FeatureProperties.OPACITY,
    ngeo.FeatureProperties.SIZE,
    ngeo.FeatureProperties.STROKE,
    'pointRadius',
    'strokeWidth'
  ];
  const boolProperties = [
    ngeo.FeatureProperties.IS_CIRCLE,
    ngeo.FeatureProperties.IS_RECTANGLE,
    ngeo.FeatureProperties.IS_TEXT,
    ngeo.FeatureProperties.SHOW_MEASURE,
    ngeo.FeatureProperties.SHOW_LABEL,
    'isCircle',
    'isRectangle',
    'isLabel',
    'showMeasure',
    'showLabel'
  ];

  if (ol.array.includes(numProperties, key)) {
    return +value;
  } else if (ol.array.includes(boolProperties, key)) {
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
ngeo.format.FeatureHash.getStyleProperties_ = function(text, feature) {
  const parts = text.split('\'');
  const properties = {};

  for (let i = 0; i < parts.length; ++i) {
    const part = decodeURIComponent(parts[i]);
    const keyVal = part.split('*');
    goog.asserts.assert(keyVal.length === 2);
    const key = keyVal[0];
    const val = keyVal[1];

    properties[key] = ngeo.format.FeatureHash.castValue_(key, val);
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
ngeo.format.FeatureHash.writeLineStringGeometry_ = function(geometry) {
  goog.asserts.assertInstanceof(geometry, ol.geom.LineString);
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
ngeo.format.FeatureHash.writeMultiLineStringGeometry_ = function(geometry) {
  goog.asserts.assertInstanceof(geometry, ol.geom.MultiLineString);
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
ngeo.format.FeatureHash.writePointGeometry_ = function(geometry) {
  goog.asserts.assertInstanceof(geometry, ol.geom.Point);
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
ngeo.format.FeatureHash.writeMultiPointGeometry_ = function(geometry) {
  goog.asserts.assertInstanceof(geometry, ol.geom.MultiPoint);
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
ngeo.format.FeatureHash.encodeRings_ = function(flatCoordinates, stride, offset, ends, textArray) {
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
ngeo.format.FeatureHash.writePolygonGeometry_ = function(geometry) {
  goog.asserts.assertInstanceof(geometry, ol.geom.Polygon);
  const flatCoordinates = geometry.getFlatCoordinates();
  const stride = geometry.getStride();
  const ends = geometry.getEnds();
  const offset = 0;
  const textArray = ['a('];
  ngeo.format.FeatureHash.encodeRings_.call(this,
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
ngeo.format.FeatureHash.writeMultiPolygonGeometry_ = function(geometry) {
  goog.asserts.assertInstanceof(geometry, ol.geom.MultiPolygon);
  const flatCoordinates = geometry.getFlatCoordinates();
  const stride = geometry.getStride();
  const endss = geometry.getEndss();
  const polygonCount = endss.length;
  let offset = 0;
  const textArray = ['A'];
  for (let i = 0; i < polygonCount; ++i) {
    const ends = endss[i];
    textArray.push('(');
    offset = ngeo.format.FeatureHash.encodeRings_.call(this,
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
ngeo.format.FeatureHash.GEOMETRY_READERS_ = {
  'P': ngeo.format.FeatureHash.readMultiPointGeometry_,
  'L': ngeo.format.FeatureHash.readMultiLineStringGeometry_,
  'A': ngeo.format.FeatureHash.readMultiPolygonGeometry_,
  'l': ngeo.format.FeatureHash.readLineStringGeometry_,
  'p': ngeo.format.FeatureHash.readPointGeometry_,
  'a': ngeo.format.FeatureHash.readPolygonGeometry_
};


/**
 * @const
 * @private
 * @type {Object.<string, function(ol.geom.Geometry):string>}
 */
ngeo.format.FeatureHash.GEOMETRY_WRITERS_ = {
  'MultiLineString': ngeo.format.FeatureHash.writeMultiLineStringGeometry_,
  'MultiPoint': ngeo.format.FeatureHash.writeMultiPointGeometry_,
  'MultiPolygon': ngeo.format.FeatureHash.writeMultiPolygonGeometry_,
  'LineString': ngeo.format.FeatureHash.writeLineStringGeometry_,
  'Point': ngeo.format.FeatureHash.writePointGeometry_,
  'Polygon': ngeo.format.FeatureHash.writePolygonGeometry_
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
ngeo.format.FeatureHash.prototype.decodeCoordinates_ = function(text, opt_flatCoordinates) {
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
      b = ngeo.format.FeatureHash.CHAR64_.indexOf(text.charAt(index++));
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 32);
    const dx = ((result & 1) ? ~(result >> 1) : (result >> 1));
    this.prevX_ += dx;
    shift = 0;
    result = 0;
    do {
      b = ngeo.format.FeatureHash.CHAR64_.indexOf(text.charAt(index++));
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
ngeo.format.FeatureHash.prototype.encodeCoordinates_ = function(flatCoordinates, stride, offset, end) {
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
    encodedCoordinates += ngeo.format.FeatureHash.encodeSignedNumber_(dx) +
        ngeo.format.FeatureHash.encodeSignedNumber_(dy);
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
ngeo.format.FeatureHash.prototype.readFeatureFromText = function(text, opt_options) {
  goog.asserts.assert(text.length > 2);
  goog.asserts.assert(text[1] === '(');
  goog.asserts.assert(text[text.length - 1] === ')');
  let splitIndex = text.indexOf('~');
  const geometryText = splitIndex >= 0 ?
    `${text.substring(0, splitIndex)})` : text;
  const geometry = this.readGeometryFromText(geometryText, opt_options);
  const feature = new ol.Feature(geometry);
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
        goog.asserts.assert(keyVal.length === 2);
        let key = keyVal[0];
        const value = keyVal[1];
        if (!this.setStyle_ && ngeo.format.FeatureHashLegacyProperties_[key]) {
          key = ngeo.format.FeatureHashLegacyProperties_[key];
        }
        feature.set(key, ngeo.format.FeatureHash.castValue_(key, value));
      }
    }
    if (splitIndex >= 0) {
      const stylesText = attributesAndStylesText.substring(splitIndex + 1);
      if (this.setStyle_) {
        ngeo.format.FeatureHash.setStyleInFeature_(stylesText, feature);
      } else {
        ngeo.format.FeatureHash.setStyleProperties_(stylesText, feature);
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
ngeo.format.FeatureHash.prototype.readFeaturesFromText = function(text, opt_options) {
  goog.asserts.assert(text[0] === 'F');
  /** @type {Array.<ol.Feature>} */
  const features = [];
  text = text.substring(1);
  while (text.length > 0) {
    const index = text.indexOf(')');
    goog.asserts.assert(index >= 0);
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
ngeo.format.FeatureHash.prototype.readGeometryFromText = function(text, opt_options) {
  const geometryReader = ngeo.format.FeatureHash.GEOMETRY_READERS_[text[0]];
  goog.asserts.assert(geometryReader !== undefined);
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
ngeo.format.FeatureHash.prototype.writeFeatureText = function(feature, opt_options) {
  const /** @type {Array.<string>} */ encodedParts = [];

  // encode geometry

  let encodedGeometry = '';
  const geometry = feature.getGeometry();
  if (geometry) {
    encodedGeometry = this.writeGeometryText(geometry, opt_options);
  }

  if (encodedGeometry.length > 0) {
    // remove the final bracket
    goog.asserts.assert(encodedGeometry[encodedGeometry.length - 1] === ')');
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
        ngeo.format.FeatureHash.encodeStyles_(
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
ngeo.format.FeatureHash.prototype.writeFeaturesText = function(features, opt_options) {
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
ngeo.format.FeatureHash.prototype.writeGeometryText = function(geometry, opt_options) {
  const geometryWriter = ngeo.format.FeatureHash.GEOMETRY_WRITERS_[
    geometry.getType()];
  goog.asserts.assert(geometryWriter !== undefined);
  const transformedGeometry = /** @type {ol.geom.Geometry} */
      (ol.format.Feature.transformWithOptions(geometry, true, opt_options));
  this.prevX_ = 0;
  this.prevY_ = 0;
  return geometryWriter.call(this, transformedGeometry);
};
