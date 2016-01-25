goog.provide('ngeo.format.FeatureHash');

goog.require('goog.asserts');
goog.require('goog.color');
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
 * @extends {ol.format.TextFeature}
 * @param {ngeox.format.FeatureHashOptions=} opt_options Options.
 */
ngeo.format.FeatureHash = function(opt_options) {
  goog.base(this);

  var options = goog.isDef(opt_options) ? opt_options : {};

  /**
   * @type {number}
   * @private
   */
  this.accuracy_ = goog.isDef(options.accuracy) ?
      options.accuracy : ngeo.format.FeatureHash.ACCURACY_;

  /**
   * @type {boolean}
   * @private
   */
  this.encodeStyles_ = goog.isDef(options.encodeStyles) ?
      options.encodeStyles : true;

  /**
   * @type {function(ol.Feature):Object.<string, (string|number)>}
   * @private
   */
  this.propertiesFunction_ = goog.isDef(options.properties) ?
      options.properties : ngeo.format.FeatureHash.defaultPropertiesFunction_;

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

};
goog.inherits(ngeo.format.FeatureHash, ol.format.TextFeature);


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
ngeo.format.FeatureHash.ACCURACY_ = 1;


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
  var signedNum = num << 1;
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
  var encodedNumber = '';
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
  var styleType = ngeo.format.FeatureHashStyleTypes_[geometryType];
  goog.asserts.assert(goog.isDef(styleType));
  for (var i = 0; i < styles.length; ++i) {
    var style = styles[i];
    var fillStyle = style.getFill();
    var imageStyle = style.getImage();
    var strokeStyle = style.getStroke();
    var textStyle = style.getText();
    if (styleType == ngeo.format.FeatureHashStyleType.POLYGON) {
      if (!goog.isNull(fillStyle)) {
        ngeo.format.FeatureHash.encodeStylePolygon_(
            fillStyle, strokeStyle, encodedStyles);
      }
    } else if (styleType == ngeo.format.FeatureHashStyleType.LINE_STRING) {
      if (!goog.isNull(strokeStyle)) {
        ngeo.format.FeatureHash.encodeStyleLine_(strokeStyle, encodedStyles);
      }
    } else if (styleType == ngeo.format.FeatureHashStyleType.POINT) {
      if (!goog.isNull(imageStyle)) {
        ngeo.format.FeatureHash.encodeStylePoint_(imageStyle, encodedStyles);
      }
    }
    if (!goog.isNull(textStyle)) {
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
    var radius = imageStyle.getRadius();
    if (encodedStyles.length > 0) {
      encodedStyles.push('\'');
    }
    encodedStyles.push(encodeURIComponent('pointRadius*' + radius));
    var fillStyle = imageStyle.getFill();
    if (!goog.isNull(fillStyle)) {
      ngeo.format.FeatureHash.encodeStyleFill_(fillStyle, encodedStyles);
    }
    var strokeStyle = imageStyle.getStroke();
    if (!goog.isNull(strokeStyle)) {
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
  if (!goog.isNull(strokeStyle)) {
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
  var propertyName = goog.isDef(opt_propertyName) ?
      opt_propertyName : 'fillColor';
  var fillColor = fillStyle.getColor();
  if (!goog.isNull(fillColor)) {
    var fillColorRgba = ol.color.asArray(fillColor);
    var fillColorHex = goog.color.rgbArrayToHex(fillColorRgba);
    if (encodedStyles.length > 0) {
      encodedStyles.push('\'');
    }
    encodedStyles.push(
        encodeURIComponent(propertyName + '*' + fillColorHex));
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
  var strokeColor = strokeStyle.getColor();
  if (!goog.isNull(strokeColor)) {
    var strokeColorRgba = ol.color.asArray(strokeColor);
    var strokeColorHex = goog.color.rgbArrayToHex(strokeColorRgba);
    if (encodedStyles.length > 0) {
      encodedStyles.push('\'');
    }
    encodedStyles.push(encodeURIComponent('strokeColor*' + strokeColorHex));
  }
  var strokeWidth = strokeStyle.getWidth();
  if (goog.isDef(strokeWidth)) {
    if (encodedStyles.length > 0) {
      encodedStyles.push('\'');
    }
    encodedStyles.push(encodeURIComponent('strokeWidth*' + strokeWidth));
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
  var fontStyle = textStyle.getFont();
  if (goog.isDef(fontStyle)) {
    var font = fontStyle.split(' ');
    if (font.length >= 3) {
      if (encodedStyles.length > 0) {
        encodedStyles.push('\'');
      }
      encodedStyles.push(encodeURIComponent('fontSize*' + font[1]));
    }
  }
  var fillStyle = textStyle.getFill();
  if (!goog.isNull(fillStyle)) {
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
  var flatCoordinates = this.decodeCoordinates_(text);
  var lineString = new ol.geom.LineString(null);
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
  var flatCoordinates = [];
  var ends = [];
  var lineStrings = text.split('\'');
  for (var i = 0, ii = lineStrings.length; i < ii; ++i) {
    flatCoordinates = this.decodeCoordinates_(lineStrings[i], flatCoordinates);
    ends[i] = flatCoordinates.length;
  }
  var multiLineString = new ol.geom.MultiLineString(null);
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
  var flatCoordinates = this.decodeCoordinates_(text);
  goog.asserts.assert(flatCoordinates.length === 2);
  var point = new ol.geom.Point(null);
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
  var flatCoordinates = this.decodeCoordinates_(text);
  var multiPoint = new ol.geom.MultiPoint(null);
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
  var flatCoordinates = [];
  var ends = [];
  var rings = text.split('\'');
  for (var i = 0, ii = rings.length; i < ii; ++i) {
    flatCoordinates = this.decodeCoordinates_(rings[i], flatCoordinates);
    var end = flatCoordinates.length;
    if (i === 0) {
      flatCoordinates[end++] = flatCoordinates[0];
      flatCoordinates[end++] = flatCoordinates[1];
    } else {
      flatCoordinates[end++] = flatCoordinates[ends[i - 1]];
      flatCoordinates[end++] = flatCoordinates[ends[i - 1] + 1];
    }
    ends[i] = end;
  }
  var polygon = new ol.geom.Polygon(null);
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
  var flatCoordinates = [];
  var endss = [];
  var polygons = text.split(')(');
  for (var i = 0, ii = polygons.length; i < ii; ++i) {
    var rings = polygons[i].split('\'');
    var ends = endss[i] = [];
    for (var j = 0, jj = rings.length; j < jj; ++j) {
      flatCoordinates = this.decodeCoordinates_(rings[j], flatCoordinates);
      var end = flatCoordinates.length;
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
  var multipolygon = new ol.geom.MultiPolygon(null);
  multipolygon.setFlatCoordinates(
      ol.geom.GeometryLayout.XY, flatCoordinates, endss);
  return multipolygon;
};


/**
 * Read a logical sequence of characters and apply the decoded style on the
 * given feature.
 * @param {string} text Text.
 * @param {ol.Feature} feature Feature.
 * @private
 */
ngeo.format.FeatureHash.setStyleInFeature_ = function(text, feature) {
  var fillColor, fontSize, fontColor, pointRadius, strokeColor, strokeWidth;
  var parts = text.split('\'');
  for (var i = 0; i < parts.length; ++i) {
    var part = decodeURIComponent(parts[i]);
    var keyVal = part.split('*');
    goog.asserts.assert(keyVal.length === 2);
    var key = keyVal[0];
    var val = keyVal[1];
    if (key === 'fillColor') {
      fillColor = val;
    } else if (key == 'fontSize') {
      fontSize = val;
    } else if (key == 'fontColor') {
      fontColor = val;
    } else if (key == 'pointRadius') {
      pointRadius = +val;
    } else if (key == 'strokeColor') {
      strokeColor = val;
    } else if (key == 'strokeWidth') {
      strokeWidth = +val;
    }
  }
  var fillStyle = null;
  if (goog.isDef(fillColor)) {
    fillStyle = new ol.style.Fill({
      color: fillColor
    });
  }
  var strokeStyle = null;
  if (goog.isDef(strokeColor) && goog.isDef(strokeWidth)) {
    strokeStyle = new ol.style.Stroke({
      color: strokeColor,
      width: strokeWidth
    });
  }
  var imageStyle = null;
  if (goog.isDef(pointRadius)) {
    imageStyle = new ol.style.Circle({
      radius: pointRadius,
      fill: fillStyle,
      stroke: strokeStyle
    });
    fillStyle = strokeStyle = null;
  }
  var textStyle = null;
  if (goog.isDef(fontSize) && goog.isDef(fontColor)) {
    textStyle = new ol.style.Text({
      font: fontSize + ' sans-serif',
      fill: new ol.style.Fill({
        color: fontColor
      })
    });
  }
  var style = new ol.style.Style({
    fill: fillStyle,
    image: imageStyle,
    stroke: strokeStyle,
    text: textStyle
  });
  feature.setStyle(style);
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
  var flatCoordinates = geometry.getFlatCoordinates();
  var stride = geometry.getStride();
  var end = flatCoordinates.length;
  return 'l(' + this.encodeCoordinates_(flatCoordinates, stride, 0, end) + ')';
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
  var ends = geometry.getEnds();
  var lineStringCount = ends.length;
  var flatCoordinates = geometry.getFlatCoordinates();
  var stride = geometry.getStride();
  var offset = 0;
  var textArray = ['L('];
  for (var i = 0; i < lineStringCount; ++i) {
    var end = ends[i];
    var text = this.encodeCoordinates_(flatCoordinates, stride, offset, end);
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
  var flatCoordinates = geometry.getFlatCoordinates();
  var stride = geometry.getStride();
  var end = flatCoordinates.length;
  return 'p(' + this.encodeCoordinates_(flatCoordinates, stride, 0, end) + ')';
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
  var flatCoordinates = geometry.getFlatCoordinates();
  var stride = geometry.getStride();
  var end = flatCoordinates.length;
  return 'P(' + this.encodeCoordinates_(flatCoordinates, stride, 0, end) + ')';
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
  var linearRingCount = ends.length;
  for (var i = 0; i < linearRingCount; ++i) {
    // skip the "closing" point
    var end = ends[i] - stride;
    var text = this.encodeCoordinates_(flatCoordinates, stride, offset, end);
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
  var flatCoordinates = geometry.getFlatCoordinates();
  var stride = geometry.getStride();
  var ends = geometry.getEnds();
  var offset = 0;
  var textArray = ['a('];
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
  var flatCoordinates = geometry.getFlatCoordinates();
  var stride = geometry.getStride();
  var endss = geometry.getEndss();
  var polygonCount = endss.length;
  var offset = 0;
  var textArray = ['A'];
  for (var i = 0; i < polygonCount; ++i) {
    var ends = endss[i];
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
  var len = text.length;
  var index = 0;
  var flatCoordinates = goog.isDef(opt_flatCoordinates) ?
      opt_flatCoordinates : [];
  var i = flatCoordinates.length;
  while (index < len) {
    var b;
    var shift = 0;
    var result = 0;
    do {
      b = ngeo.format.FeatureHash.CHAR64_.indexOf(text.charAt(index++));
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 32);
    var dx = ((result & 1) ? ~(result >> 1) : (result >> 1));
    this.prevX_ += dx;
    shift = 0;
    result = 0;
    do {
      b = ngeo.format.FeatureHash.CHAR64_.indexOf(text.charAt(index++));
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 32);
    var dy = ((result & 1) ? ~(result >> 1) : (result >> 1));
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
  var encodedCoordinates = '';
  for (var i = offset; i < end; i += stride) {
    var x = flatCoordinates[i];
    var y = flatCoordinates[i + 1];
    x = Math.floor(x / this.accuracy_);
    y = Math.floor(y / this.accuracy_);
    var dx = x - this.prevX_;
    var dy = y - this.prevY_;
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
 */
ngeo.format.FeatureHash.prototype.readFeatureFromText = function(text, opt_options) {
  goog.asserts.assert(text.length > 2);
  goog.asserts.assert(text[1] === '(');
  goog.asserts.assert(text[text.length - 1] === ')');
  var splitIndex = text.indexOf('~');
  var geometryText = splitIndex >= 0 ?
      text.substring(0, splitIndex) + ')' : text;
  var geometry = this.readGeometryFromText(geometryText, opt_options);
  var feature = new ol.Feature(geometry);
  if (splitIndex >= 0) {
    var attributesAndStylesText = text.substring(
        splitIndex + 1, text.length - 1);
    splitIndex = attributesAndStylesText.indexOf('~');
    var attributesText = splitIndex >= 0 ?
        attributesAndStylesText.substring(0, splitIndex) :
        attributesAndStylesText;
    var parts = attributesText.split('\'');
    for (var i = 0; i < parts.length; ++i) {
      var part = decodeURIComponent(parts[i]);
      var keyVal = part.split('*');
      goog.asserts.assert(keyVal.length === 2);
      feature.set(keyVal[0], keyVal[1]);
    }
    if (splitIndex >= 0) {
      var stylesText = attributesAndStylesText.substring(splitIndex + 1);
      ngeo.format.FeatureHash.setStyleInFeature_(stylesText, feature);
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
 */
ngeo.format.FeatureHash.prototype.readFeaturesFromText = function(text, opt_options) {
  goog.asserts.assert(text[0] === 'F');
  /** @type {Array.<ol.Feature>} */
  var features = [];
  text = text.substring(1);
  while (text.length > 0) {
    var index = text.indexOf(')');
    goog.asserts.assert(index >= 0);
    var feature = this.readFeatureFromText(
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
 */
ngeo.format.FeatureHash.prototype.readGeometryFromText = function(text, opt_options) {
  var geometryReader = ngeo.format.FeatureHash.GEOMETRY_READERS_[text[0]];
  goog.asserts.assert(goog.isDef(geometryReader));
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
 */
ngeo.format.FeatureHash.prototype.writeFeatureText = function(feature, opt_options) {
  var /** @type {Array.<string>} */ encodedParts = [];

  // encode geometry

  var encodedGeometry = '';
  var geometry = feature.getGeometry();
  if (goog.isDefAndNotNull(geometry)) {
    encodedGeometry = this.writeGeometryText(geometry, opt_options);
  }

  if (encodedGeometry.length > 0) {
    // remove the final bracket
    goog.asserts.assert(encodedGeometry[encodedGeometry.length - 1] === ')');
    encodedGeometry = encodedGeometry.substring(0, encodedGeometry.length - 1);
    encodedParts.push(encodedGeometry);
  }

  // encode properties

  var /** @type {Array.<string>} */ encodedProperties = [];
  goog.object.forEach(this.propertiesFunction_(feature), (
      /**
       * @param {*} value Value.
       * @param {string} key Key.
       */
      function(value, key) {
        if (key !== feature.getGeometryName()) {
          if (encodedProperties.length !== 0) {
            encodedProperties.push('\'');
          }
          var encoded = encodeURIComponent(
              key.replace(/[()'*]/g, '_') + '*' +
              value.toString().replace(/[()'*]/g, '_'));
          encodedProperties.push(encoded);
        }
      }));

  if (encodedProperties.length > 0) {
    encodedParts.push('~');
    Array.prototype.push.apply(encodedParts, encodedProperties);
  }

  // encode styles

  if (this.encodeStyles_) {
    var styleFunction = feature.getStyleFunction();
    if (goog.isDef(styleFunction)) {
      var styles = styleFunction.call(feature, 0);
      if (!goog.isNull(styles)) {
        var encodedStyles = [];
        styles = goog.isArray(styles) ? styles : [styles];
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
 */
ngeo.format.FeatureHash.prototype.writeFeaturesText = function(features, opt_options) {
  var textArray = [];
  if (features.length > 0) {
    textArray.push('F');
    for (var i = 0, ii = features.length; i < ii; ++i) {
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
 */
ngeo.format.FeatureHash.prototype.writeGeometryText = function(geometry, opt_options) {
  var geometryWriter = ngeo.format.FeatureHash.GEOMETRY_WRITERS_[
      geometry.getType()];
  goog.asserts.assert(goog.isDef(geometryWriter));
  var transformedGeometry = /** @type {ol.geom.Geometry} */
      (ol.format.Feature.transformWithOptions(geometry, true, opt_options));
  this.prevX_ = 0;
  this.prevY_ = 0;
  return geometryWriter.call(this, transformedGeometry);
};
