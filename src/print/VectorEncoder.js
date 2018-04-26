/**
 * @module ngeo.print.VectorEncoder
 */
import googAsserts from 'goog/asserts.js';
import ngeoUtils from 'ngeo/utils.js';
import * as olBase from 'ol/index.js';
import olFormatGeoJSON from 'ol/format/GeoJSON.js';
import olSourceVector from 'ol/source/Vector.js';
import olStyleRegularShape from 'ol/style/RegularShape.js';
import * as olMath from 'ol/math.js';
import olStyleIcon from 'ol/style/Icon.js';
import olStyleCircle from 'ol/style/Circle.js';
import * as olColor from 'ol/color.js';

/**
 * @constructor
 */
const exports = function() {
  /**
   * @type {ol.format.GeoJSON}
   */
  this.geojsonFormat = new olFormatGeoJSON();
};


/**
 * @enum {string}
 */
exports.PrintStyleType = {
  LINE_STRING: 'LineString',
  POINT: 'Point',
  POLYGON: 'Polygon'
};


/**
 * @type {Object.<ol.geom.GeometryType, ngeo.print.VectorEncoder.PrintStyleType>}
 * @private
 */
exports.PrintStyleTypes_ = {
  'LineString': exports.PrintStyleType.LINE_STRING,
  'Point': exports.PrintStyleType.POINT,
  'Polygon': exports.PrintStyleType.POLYGON,
  'MultiLineString': exports.PrintStyleType.LINE_STRING,
  'MultiPoint': exports.PrintStyleType.POINT,
  'MultiPolygon': exports.PrintStyleType.POLYGON
};


/**
 * @param {Array.<MapFishPrintLayer>} arr Array.
 * @param {ol.layer.Vector} layer Layer.
 * @param {number} resolution Resolution.
 */
exports.prototype.encodeVectorLayer = function(arr, layer, resolution) {
  const source = layer.getSource();
  googAsserts.assertInstanceof(source, olSourceVector);

  const features = source.getFeatures();

  const /** @type {Array.<GeoJSONFeature>} */ geojsonFeatures = [];
  const mapfishStyleObject = /** @type {MapFishPrintVectorStyle} */ ({
    version: 2
  });

  for (let i = 0, ii = features.length; i < ii; ++i) {
    const originalFeature = features[i];

    let styleData = null;
    let styleFunction = originalFeature.getStyleFunction();
    if (styleFunction !== undefined) {
      styleData = styleFunction.call(originalFeature, resolution);
    } else {
      styleFunction = layer.getStyleFunction();
      if (styleFunction !== undefined) {
        styleData = styleFunction.call(layer, originalFeature, resolution);
      }
    }
    const origGeojsonFeature = this.geojsonFormat.writeFeatureObject(originalFeature);
    /**
     * @type {Array<ol.style.Style>}
     */
    const styles = (styleData !== null && !Array.isArray(styleData)) ? [styleData] : styleData;
    googAsserts.assert(Array.isArray(styles));

    if (styles !== null && styles.length > 0) {
      let isOriginalFeatureAdded = false;
      for (let j = 0, jj = styles.length; j < jj; ++j) {
        const style = styles[j];
        const styleId = olBase.getUid(style).toString();
        let geometry = style.getGeometry();
        let geojsonFeature;
        if (!geometry) {
          geojsonFeature = origGeojsonFeature;
          geometry = originalFeature.getGeometry();
          // no need to encode features with no geometry
          if (!geometry) {
            continue;
          }
          if (!isOriginalFeatureAdded) {
            geojsonFeatures.push(geojsonFeature);
            isOriginalFeatureAdded = true;
          }
        } else {
          let styledFeature = originalFeature.clone();
          styledFeature.setGeometry(geometry);
          geojsonFeature = this.geojsonFormat.writeFeatureObject(styledFeature);
          geometry = styledFeature.getGeometry();
          styledFeature = null;
          geojsonFeatures.push(geojsonFeature);
        }

        const geometryType = geometry.getType();
        if (geojsonFeature.properties === null) {
          geojsonFeature.properties = {};
        }

        const featureStyleProp = `_ngeo_style_${j}`;
        this.encodeVectorStyle(mapfishStyleObject, geometryType, style, styleId, featureStyleProp);
        geojsonFeature.properties[featureStyleProp] = styleId;
      }
    }
  }

  // MapFish Print fails if there are no style rules, even if there are no
  // features either. To work around this we just ignore the layer if the
  // array of GeoJSON features is empty.
  // See https://github.com/mapfish/mapfish-print/issues/279

  if (geojsonFeatures.length > 0) {
    const geojsonFeatureCollection = /** @type {GeoJSONFeatureCollection} */ ({
      type: 'FeatureCollection',
      features: geojsonFeatures
    });
    const object = /** @type {MapFishPrintVectorLayer} */ ({
      geoJson: geojsonFeatureCollection,
      opacity: layer.getOpacity(),
      style: mapfishStyleObject,
      type: 'geojson'
    });
    arr.push(object);
  }
};


/**
 * @param {MapFishPrintVectorStyle} object MapFish style object.
 * @param {ol.geom.GeometryType} geometryType Type of the GeoJSON geometry
 * @param {ol.style.Style} style Style.
 * @param {string} styleId Style id.
 * @param {string} featureStyleProp Feature style property name.
 */
exports.prototype.encodeVectorStyle = function(object, geometryType, style, styleId, featureStyleProp) {
  if (!(geometryType in exports.PrintStyleTypes_)) {
    // unsupported geometry type
    return;
  }
  const styleType = exports.PrintStyleTypes_[geometryType];
  const key = `[${featureStyleProp} = '${styleId}']`;
  if (key in object) {
    // do nothing if we already have a style object for this CQL rule
    return;
  }
  const styleObject = /** @type {MapFishPrintSymbolizers} */ ({
    symbolizers: []
  });
  object[key] = styleObject;
  const fillStyle = style.getFill();
  const imageStyle = style.getImage();
  const strokeStyle = style.getStroke();
  const textStyle = style.getText();
  if (styleType === exports.PrintStyleType.POLYGON) {
    if (fillStyle !== null) {
      this.encodeVectorStylePolygon(
        styleObject.symbolizers, fillStyle, strokeStyle);
    }
  } else if (styleType === exports.PrintStyleType.LINE_STRING) {
    if (strokeStyle !== null) {
      this.encodeVectorStyleLine(styleObject.symbolizers, strokeStyle);
    }
  } else if (styleType === exports.PrintStyleType.POINT) {
    if (imageStyle !== null) {
      this.encodeVectorStylePoint(styleObject.symbolizers, imageStyle);
    }
  }
  if (textStyle !== null) {
    this.encodeTextStyle(styleObject.symbolizers, textStyle);
  }
};


/**
 * @param {MapFishPrintSymbolizerPoint|MapFishPrintSymbolizerPolygon} symbolizer MapFish Print symbolizer.
 * @param {!ol.style.Fill} fillStyle Fill style.
 * @protected
 */
exports.prototype.encodeVectorStyleFill = function(symbolizer, fillStyle) {
  let fillColor = fillStyle.getColor();
  if (fillColor !== null) {
    googAsserts.assert(typeof fillColor === 'string' || Array.isArray(fillColor));
    fillColor = olColor.asArray(fillColor);
    googAsserts.assert(Array.isArray(fillColor), 'only supporting fill colors');
    symbolizer.fillColor = ngeoUtils.rgbArrayToHex(fillColor);
    symbolizer.fillOpacity = fillColor[3];
  }
};


/**
 * @param {Array.<MapFishPrintSymbolizer>} symbolizers Array of MapFish Print
 *     symbolizers.
 * @param {!ol.style.Stroke} strokeStyle Stroke style.
 * @protected
 */
exports.prototype.encodeVectorStyleLine = function(symbolizers, strokeStyle) {
  const symbolizer = /** @type {MapFishPrintSymbolizerLine} */ ({
    type: 'line'
  });
  this.encodeVectorStyleStroke(symbolizer, strokeStyle);
  symbolizers.push(symbolizer);
};


/**
 * @param {Array.<MapFishPrintSymbolizer>} symbolizers Array of MapFish Print
 *     symbolizers.
 * @param {!ol.style.Image} imageStyle Image style.
 * @protected
 */
exports.prototype.encodeVectorStylePoint = function(symbolizers, imageStyle) {
  let symbolizer;
  if (imageStyle instanceof olStyleCircle) {
    symbolizer = /** @type {MapFishPrintSymbolizerPoint} */ ({
      type: 'point'
    });
    symbolizer.pointRadius = imageStyle.getRadius();
    const fillStyle = imageStyle.getFill();
    if (fillStyle !== null) {
      this.encodeVectorStyleFill(symbolizer, fillStyle);
    }
    const strokeStyle = imageStyle.getStroke();
    if (strokeStyle !== null) {
      this.encodeVectorStyleStroke(symbolizer, strokeStyle);
    }
  } else if (imageStyle instanceof olStyleIcon) {
    const src = imageStyle.getSrc();
    if (src !== undefined) {
      symbolizer = /** @type {MapFishPrintSymbolizerPoint} */ ({
        type: 'point',
        externalGraphic: src
      });
      const opacity = imageStyle.getOpacity();
      if (opacity !== null) {
        symbolizer.graphicOpacity = opacity;
      }
      const size = imageStyle.getSize();
      if (size !== null) {
        let scale = imageStyle.getScale();
        if (isNaN(scale)) {
          scale = 1;
        }
        symbolizer.graphicWidth = size[0] * scale;
        symbolizer.graphicHeight = size[1] * scale;
      }
      let rotation = imageStyle.getRotation();
      if (isNaN(rotation)) {
        rotation = 0;
      }
      symbolizer.rotation = olMath.toDegrees(rotation);
    }
  } else if (imageStyle instanceof olStyleRegularShape) {
    /**
     * Mapfish Print does not support image defined with ol.style.RegularShape.
     * As a workaround, I try to map the image on a well-known image name.
     */
    const points = /** @type {ol.style.RegularShape} */ (imageStyle).getPoints();
    if (points !== null) {
      symbolizer = /** @type {MapFishPrintSymbolizerPoint} */ ({
        type: 'point'
      });
      if (points === 4) {
        symbolizer.graphicName = 'square';
      } else if (points === 3) {
        symbolizer.graphicName = 'triangle';
      } else if (points === 5) {
        symbolizer.graphicName = 'star';
      } else if (points === 8) {
        symbolizer.graphicName = 'cross';
      }
      const sizeShape = imageStyle.getSize();
      if (sizeShape !== null) {
        symbolizer.graphicWidth = sizeShape[0];
        symbolizer.graphicHeight = sizeShape[1];
      }
      const rotationShape = imageStyle.getRotation();
      if (!isNaN(rotationShape) && rotationShape !== 0) {
        symbolizer.rotation = olMath.toDegrees(rotationShape);
      }
      const opacityShape = imageStyle.getOpacity();
      if (opacityShape !== null) {
        symbolizer.graphicOpacity = opacityShape;
      }
      const strokeShape = imageStyle.getStroke();
      if (strokeShape !== null) {
        this.encodeVectorStyleStroke(symbolizer, strokeShape);
      }
      const fillShape = imageStyle.getFill();
      if (fillShape !== null) {
        this.encodeVectorStyleFill(symbolizer, fillShape);
      }
    }
  }
  if (symbolizer !== undefined) {
    symbolizers.push(symbolizer);
  }
};


/**
 * @param {Array.<MapFishPrintSymbolizer>} symbolizers Array of MapFish Print
 *     symbolizers.
 * @param {!ol.style.Fill} fillStyle Fill style.
 * @param {ol.style.Stroke} strokeStyle Stroke style.
 * @protected
 */
exports.prototype.encodeVectorStylePolygon = function(symbolizers, fillStyle, strokeStyle) {
  const symbolizer = /** @type {MapFishPrintSymbolizerPolygon} */ ({
    type: 'polygon'
  });
  this.encodeVectorStyleFill(symbolizer, fillStyle);
  if (strokeStyle !== null) {
    this.encodeVectorStyleStroke(symbolizer, strokeStyle);
  }
  symbolizers.push(symbolizer);
};


/**
 * @param {MapFishPrintSymbolizerPoint|MapFishPrintSymbolizerLine|MapFishPrintSymbolizerPolygon}
 *      symbolizer MapFish Print symbolizer.
 * @param {!ol.style.Stroke} strokeStyle Stroke style.
 * @protected
 */
exports.prototype.encodeVectorStyleStroke = function(symbolizer, strokeStyle) {
  const strokeColor = strokeStyle.getColor();
  if (strokeColor !== null) {
    googAsserts.assert(typeof strokeColor === 'string' || Array.isArray(strokeColor));
    const strokeColorRgba = olColor.asArray(strokeColor);
    googAsserts.assert(Array.isArray(strokeColorRgba), 'only supporting stroke colors');
    symbolizer.strokeColor = ngeoUtils.rgbArrayToHex(strokeColorRgba);
    symbolizer.strokeOpacity = strokeColorRgba[3];
  }
  const strokeDashstyle = strokeStyle.getLineDash();
  if (strokeDashstyle !== null) {
    symbolizer.strokeDashstyle = strokeDashstyle.join(' ');
  }
  const strokeWidth = strokeStyle.getWidth();
  if (strokeWidth !== undefined) {
    symbolizer.strokeWidth = strokeWidth;
  }
  const strokeLineCap = strokeStyle.getLineCap();
  if (strokeLineCap) {
    symbolizer.strokeLinecap = strokeStyle.getLineCap();
  }
};


/**
 * @param {Array.<MapFishPrintSymbolizerText>} symbolizers Array of MapFish Print
 *     symbolizers.
 * @param {!ol.style.Text} textStyle Text style.
 * @protected
 */
exports.prototype.encodeTextStyle = function(symbolizers, textStyle) {
  const symbolizer = /** @type {MapFishPrintSymbolizerText} */ ({
    type: 'Text'
  });
  const label = textStyle.getText();
  if (label !== undefined) {
    symbolizer.label = label;
    let xAlign = 'c';
    let yAlign = 'm';

    const olTextAlign = textStyle.getTextAlign();
    // 'left', 'right', 'center', 'end' or 'start'.
    if (olTextAlign === 'left' || olTextAlign === 'start') {
      xAlign = 'l';
    } else if (olTextAlign === 'right' || olTextAlign === 'end') {
      xAlign = 'r';
    }

    const olTextBaseline = textStyle.getTextBaseline();
    // 'bottom', 'top', 'middle', 'alphabetic', 'hanging' or 'ideographic'
    if (olTextBaseline === 'bottom') {
      yAlign = 'l';
    } else if (olTextBaseline === 'top') {
      yAlign = 't';
    }
    symbolizer.labelAlign = `${xAlign}${yAlign}`;

    const labelRotation = textStyle.getRotation();
    if (labelRotation !== undefined) {
      // Mapfish Print expects a string, not a number to rotate text
      symbolizer.labelRotation = (labelRotation * 180 / Math.PI).toString();
      // rotate around the vertical/horizontal center
      symbolizer.labelAlign = 'cm';
    }

    const fontStyle = textStyle.getFont();
    if (fontStyle !== undefined) {
      const font = fontStyle.split(' ');
      if (font.length >= 3) {
        symbolizer.fontWeight = font[0];
        symbolizer.fontSize = font[1];
        symbolizer.fontFamily = font.splice(2).join(' ');
      }
    }

    const strokeStyle = textStyle.getStroke();
    if (strokeStyle !== null) {
      const strokeColor = strokeStyle.getColor();
      googAsserts.assert(typeof strokeColor === 'string' || Array.isArray(strokeColor));
      const strokeColorRgba = olColor.asArray(strokeColor);
      googAsserts.assert(Array.isArray(strokeColorRgba), 'only supporting stroke colors');
      symbolizer.haloColor = ngeoUtils.rgbArrayToHex(strokeColorRgba);
      symbolizer.haloOpacity = strokeColorRgba[3];
      const width = strokeStyle.getWidth();
      if (width !== undefined) {
        // Width is a stroke, radius a radius, so divide by 2
        symbolizer.haloRadius = width / 2;
      }
    }

    const fillStyle = textStyle.getFill();
    if (fillStyle !== null) {
      const fillColor = fillStyle.getColor();
      googAsserts.assert(typeof fillColor === 'string' || Array.isArray(fillColor));
      const fillColorRgba = olColor.asArray(fillColor);
      googAsserts.assert(Array.isArray(fillColorRgba), 'only supporting fill colors');
      symbolizer.fontColor = ngeoUtils.rgbArrayToHex(fillColorRgba);
    }

    // Mapfish Print allows offset only if labelAlign is defined.
    if (symbolizer.labelAlign !== undefined) {
      symbolizer.labelXOffset = textStyle.getOffsetX();
      // Mapfish uses the opposite direction of OpenLayers for y axis, so the
      // minus sign is required for the y offset to be identical.
      symbolizer.labelYOffset = -textStyle.getOffsetY();
    }

    symbolizers.push(symbolizer);
  }
};


export default exports;
