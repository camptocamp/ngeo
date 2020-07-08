// The MIT License (MIT)
//
// Copyright (c) 2018-2020 Camptocamp SA
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

import {rgbArrayToHex} from 'ngeo/utils.js';
import {getUid as olUtilGetUid} from 'ol/util.js';
import olFormatGeoJSON from 'ol/format/GeoJSON.js';
import olStyleRegularShape from 'ol/style/RegularShape.js';
import {toDegrees} from 'ol/math.js';
import olStyleIcon from 'ol/style/Icon.js';
import olStyleCircle from 'ol/style/Circle.js';
import {asArray as asColorArray} from 'ol/color.js';

/**
 * @constructor
 * @private
 * @hidden
 */
function VectorEncoder() {
  /**
   * @type {import("ol/format/GeoJSON.js").default}
   */
  this.geojsonFormat = new olFormatGeoJSON();
}

/**
 * @enum {string}
 * @private
 * @hidden
 */
const PrintStyleType = {
  LINE_STRING: 'LineString',
  POINT: 'Point',
  POLYGON: 'Polygon',
};

/**
 * @type {Object<import("ol/geom/GeometryType.js").default, PrintStyleType>}
 * @private
 * @hidden
 */
const PRINT_STYLE_TYPES = {
  'LineString': PrintStyleType.LINE_STRING,
  'Point': PrintStyleType.POINT,
  'Polygon': PrintStyleType.POLYGON,
  'MultiLineString': PrintStyleType.LINE_STRING,
  'MultiPoint': PrintStyleType.POINT,
  'MultiPolygon': PrintStyleType.POLYGON,
};

/**
 * @param {Array<import('ngeo/print/mapfish-print-v3.js').MapFishPrintLayer>} arr Array.
 * @param {import("ol/layer/Vector.js").default} layer Layer.
 * @param {number} resolution Resolution.
 * @param {number} [goodnessOfFit] Goodness of fit.
 */
VectorEncoder.prototype.encodeVectorLayer = function (arr, layer, resolution, goodnessOfFit) {
  /**
   * @type {import("ol/source/Vector.js").default<import("ol/geom/Geometry.js").default>}
   */
  const source = layer.getSource();

  const features = source.getFeatures();

  /** @type {Array<import("geojson").Feature>} */
  const geojsonFeatures = [];
  /** @type {import('ngeo/print/mapfish-print-v3.js').MapFishPrintVectorStyle} */
  const mapfishStyleObject = {
    version: 2,
  };

  for (let i = 0, ii = features.length; i < ii; ++i) {
    const originalFeature = features[i];

    /**
     * @type {?import("ol/style/Style.js").default|Array<import("ol/style/Style.js").default>}
     */
    let styleData = null;
    const styleFunction = originalFeature.getStyleFunction() || layer.getStyleFunction();
    if (styleFunction !== undefined) {
      styleData = styleFunction.call(layer, originalFeature, resolution);
    }
    const origGeojsonFeature = this.geojsonFormat.writeFeatureObject(originalFeature);
    /**
     * @type {?Array<import("ol/style/Style.js").default>}
     */
    const styles = Array.isArray(styleData) ? styleData : styleData === null ? null : [styleData];

    if (styles !== null && styles.length > 0) {
      let isOriginalFeatureAdded = false;
      for (let j = 0, jj = styles.length; j < jj; ++j) {
        const style = styles[j];
        let geometry = /** @type {import("ol/geom/Geometry.js").default} */ (style.getGeometry());
        let geojsonFeature;
        if (!geometry) {
          geojsonFeature = origGeojsonFeature;
          geometry = /** @type {import("ol/geom/Geometry.js").default} */ (originalFeature.getGeometry());
          // no need to encode features with no geometry
          if (!geometry) {
            continue;
          }
          if (!isOriginalFeatureAdded) {
            geojsonFeatures.push(geojsonFeature);
            isOriginalFeatureAdded = true;
          }
        } else {
          const styledFeature = originalFeature.clone();
          styledFeature.setGeometry(geometry);
          geojsonFeature = this.geojsonFormat.writeFeatureObject(styledFeature);
          geometry = /** @type {import("ol/geom/Geometry.js").default} */ (styledFeature.getGeometry());
          geojsonFeatures.push(geojsonFeature);
        }

        const geometryType = geometry.getType();
        if (geojsonFeature.properties === null) {
          geojsonFeature.properties = {};
        }

        const featureStyleProp = `_ngeo_style_${j}`;
        const styleId = `${olUtilGetUid(style).toString()}-${geometryType}`;
        this.encodeVectorStyle(
          /** @type {Object<string, import('ngeo/print/mapfish-print-v3.js').MapFishPrintSymbolizers>} */ (
            /** @type {*} */ (mapfishStyleObject)
          ),
          geometryType,
          style,
          styleId,
          featureStyleProp,
          goodnessOfFit
        );
        geojsonFeature.properties[featureStyleProp] = styleId;
      }
    }
  }

  // MapFish Print fails if there are no style rules, even if there are no
  // features either. To work around this we just ignore the layer if the
  // array of GeoJSON features is empty.
  // See https://github.com/mapfish/mapfish-print/issues/279

  if (geojsonFeatures.length > 0) {
    const geojsonFeatureCollection = /** @type {import("geojson").FeatureCollection} */ ({
      type: 'FeatureCollection',
      features: geojsonFeatures,
    });
    const object = /** @type {import('ngeo/print/mapfish-print-v3.js').MapFishPrintVectorLayer} */ ({
      geoJson: geojsonFeatureCollection,
      opacity: layer.getOpacity(),
      style: mapfishStyleObject,
      type: 'geojson',
    });
    arr.push(object);
  }
};

/**
 * @param {Object<string, import('ngeo/print/mapfish-print-v3.js').MapFishPrintSymbolizers>} object MapFish style object.
 * @param {import("ol/geom/GeometryType.js").default} geometryType Type of the GeoJSON geometry
 * @param {import("ol/style/Style.js").default} style Style.
 * @param {string} styleId Style id.
 * @param {string} featureStyleProp Feature style property name.
 * @param {number=} [goodnessOfFit] Goodness of fit.
 */
VectorEncoder.prototype.encodeVectorStyle = function (
  object,
  geometryType,
  style,
  styleId,
  featureStyleProp,
  goodnessOfFit
) {
  if (!(geometryType in PRINT_STYLE_TYPES)) {
    // unsupported geometry type
    return;
  }
  const styleType = PRINT_STYLE_TYPES[geometryType];
  const key = `[${featureStyleProp} = '${styleId}']`;
  if (key in object) {
    // do nothing if we already have a style object for this CQL rule
    return;
  }
  /** @type {import('ngeo/print/mapfish-print-v3.js').MapFishPrintSymbolizers} */
  const styleObject = {
    symbolizers: [],
  };
  object[key] = styleObject;
  const fillStyle = style.getFill();
  const imageStyle = style.getImage();
  const strokeStyle = style.getStroke();
  const textStyle = style.getText();
  if (styleType === PrintStyleType.POLYGON) {
    if (fillStyle !== null) {
      this.encodeVectorStylePolygon(styleObject.symbolizers, fillStyle, strokeStyle);
    }
  } else if (styleType === PrintStyleType.LINE_STRING) {
    if (strokeStyle !== null) {
      this.encodeVectorStyleLine(styleObject.symbolizers, strokeStyle);
    }
  } else if (styleType === PrintStyleType.POINT) {
    if (imageStyle !== null) {
      this.encodeVectorStylePoint(styleObject.symbolizers, imageStyle);
    }
  }
  if (textStyle !== null) {
    this.encodeTextStyle(styleObject.symbolizers, textStyle, goodnessOfFit);
  }
};

/**
 * @param {import('ngeo/print/mapfish-print-v3.js').MapFishPrintSymbolizerPoint|import('ngeo/print/mapfish-print-v3.js').MapFishPrintSymbolizerPolygon} symbolizer
 *    MapFish Print symbolizer.
 * @param {import("ol/style/Fill.js").default} fillStyle Fill style.
 * @protected
 */
VectorEncoder.prototype.encodeVectorStyleFill = function (symbolizer, fillStyle) {
  let fillColor = /** @type {import('ol/color.js').Color} */ (fillStyle.getColor());
  if (fillColor !== null) {
    console.assert(typeof fillColor === 'string' || Array.isArray(fillColor));
    fillColor = asColorArray(fillColor);
    console.assert(Array.isArray(fillColor), 'only supporting fill colors');
    symbolizer.fillColor = rgbArrayToHex(fillColor);
    symbolizer.fillOpacity = fillColor[3];
  }
};

/**
 * @param {Array<import('ngeo/print/mapfish-print-v3.js').MapFishPrintSymbolizer>} symbolizers Array of
 *    MapFish Print symbolizers.
 * @param {import("ol/style/Stroke.js").default} strokeStyle Stroke style.
 * @protected
 */
VectorEncoder.prototype.encodeVectorStyleLine = function (symbolizers, strokeStyle) {
  const symbolizer = /** @type {import('ngeo/print/mapfish-print-v3.js').MapFishPrintSymbolizerLine} */ ({
    type: 'line',
  });
  this.encodeVectorStyleStroke(symbolizer, strokeStyle);
  symbolizers.push(symbolizer);
};

/**
 * @param {Array<import('ngeo/print/mapfish-print-v3.js').MapFishPrintSymbolizer>} symbolizers Array of
 *    MapFish Print symbolizers.
 * @param {import("ol/style/Image.js").default} imageStyle Image style.
 * @protected
 */
VectorEncoder.prototype.encodeVectorStylePoint = function (symbolizers, imageStyle) {
  let symbolizer;
  if (imageStyle instanceof olStyleCircle) {
    symbolizer = /** @type {import('ngeo/print/mapfish-print-v3.js').MapFishPrintSymbolizerPoint} */ ({
      type: 'point',
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
    const imgSrc = imageStyle.getSrc();
    if (!imgSrc) {
      throw new Error('Missing imgSrc');
    }
    const src = new URL(imgSrc, window.location.href).href;
    if (src !== undefined) {
      symbolizer = /** @type {import('ngeo/print/mapfish-print-v3.js').MapFishPrintSymbolizerPoint} */ ({
        type: 'point',
        externalGraphic: src,
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
      symbolizer.rotation = toDegrees(rotation);
    }
  } else if (imageStyle instanceof olStyleRegularShape) {
    /**
     * The regular shapes cannot always be translated to mapfish print shapes; use an image instead.
     */
    symbolizer = /** @type {import('ngeo/print/mapfish-print-v3.js').MapFishPrintSymbolizerPoint} */ ({
      type: 'point',
      externalGraphic: imageStyle.getImage().toDataURL(),
    });

    const [height, width] = imageStyle.getSize();
    const scale = imageStyle.getScale();
    symbolizer.graphicHeight = height * scale;
    symbolizer.graphicWidth = width * scale;
  }
  if (symbolizer !== undefined) {
    symbolizers.push(symbolizer);
  }
};

/**
 * @param {Array<import('ngeo/print/mapfish-print-v3.js').MapFishPrintSymbolizer>} symbolizers Array of
 *    MapFish Print symbolizers.
 * @param {import("ol/style/Fill.js").default} fillStyle Fill style.
 * @param {import("ol/style/Stroke.js").default} strokeStyle Stroke style.
 * @protected
 */
VectorEncoder.prototype.encodeVectorStylePolygon = function (symbolizers, fillStyle, strokeStyle) {
  const symbolizer = /** @type {import('ngeo/print/mapfish-print-v3.js').MapFishPrintSymbolizerPolygon} */ ({
    type: 'polygon',
  });
  this.encodeVectorStyleFill(symbolizer, fillStyle);
  if (strokeStyle !== null) {
    this.encodeVectorStyleStroke(symbolizer, strokeStyle);
  }
  symbolizers.push(symbolizer);
};

/**
 * @param {import('ngeo/print/mapfish-print-v3.js').MapFishPrintSymbolizerPoint|import('ngeo/print/mapfish-print-v3.js').MapFishPrintSymbolizerLine|import('ngeo/print/mapfish-print-v3.js').MapFishPrintSymbolizerPolygon}
 *      symbolizer MapFish Print symbolizer.
 * @param {import("ol/style/Stroke.js").default} strokeStyle Stroke style.
 * @protected
 */
VectorEncoder.prototype.encodeVectorStyleStroke = function (symbolizer, strokeStyle) {
  const strokeColor = strokeStyle.getColor();
  if (strokeColor !== null) {
    if (!(typeof strokeColor === 'string' || Array.isArray(strokeColor))) {
      throw new Error('Wrong strokeColor type');
    }
    const strokeColorRgba = asColorArray(strokeColor);
    if (!Array.isArray(strokeColorRgba)) {
      throw new Error('Parsed StrokeColorRgba is not an array');
    }
    symbolizer.strokeColor = rgbArrayToHex(strokeColorRgba);
    symbolizer.strokeOpacity = strokeColorRgba[3];
  }
  const strokeDashstyle = strokeStyle.getLineDash();
  if (strokeDashstyle !== null) {
    /** @type {import('ngeo/print/mapfish-print-v3.js').MapFishPrintSymbolizerLine} */ (symbolizer).strokeDashstyle = strokeDashstyle.join(
      ' '
    );
  }
  const strokeWidth = strokeStyle.getWidth();
  if (strokeWidth !== undefined) {
    symbolizer.strokeWidth = strokeWidth;
  }
  const strokeLineCap = strokeStyle.getLineCap();
  if (strokeLineCap) {
    /** @type {import('ngeo/print/mapfish-print-v3.js').MapFishPrintSymbolizerLine} */ (symbolizer).strokeLinecap = strokeLineCap;
  }
};

/**
 * @param {Array<import('ngeo/print/mapfish-print-v3.js').MapFishPrintSymbolizer>} symbolizers Array of
 *    MapFish Print symbolizers.
 * @param {import("ol/style/Text.js").default} textStyle Text style.
 * @param {number=} [goodnessOfFit] Goodness of fit.
 * @protected
 */
VectorEncoder.prototype.encodeTextStyle = function (symbolizers, textStyle, goodnessOfFit) {
  const symbolizer = /** @type {import('ngeo/print/mapfish-print-v3.js').MapFishPrintSymbolizerText} */ ({
    type: 'Text',
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
      symbolizer.labelRotation = ((labelRotation * 180) / Math.PI).toString();
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
      if (!(typeof strokeColor === 'string' || Array.isArray(strokeColor))) {
        throw new Error('Wrong strokeColor type');
      }
      const strokeColorRgba = asColorArray(strokeColor);
      if (!Array.isArray(strokeColorRgba)) {
        throw new Error('Parsed strokeColorRgba is not an array');
      }
      symbolizer.haloColor = rgbArrayToHex(strokeColorRgba);
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
      if (!(typeof fillColor === 'string' || Array.isArray(fillColor))) {
        throw new Error('Wrong fillColor type');
      }
      const fillColorRgba = asColorArray(fillColor);
      if (!Array.isArray(fillColorRgba)) {
        throw new Error('Parsed fillColorRgba is not an array');
      }
      symbolizer.fontColor = rgbArrayToHex(fillColorRgba);
    }

    // Mapfish Print allows offset only if labelAlign is defined.
    if (symbolizer.labelAlign !== undefined) {
      symbolizer.labelXOffset = textStyle.getOffsetX();
      // Mapfish uses the opposite direction of OpenLayers for y axis, so the
      // minus sign is required for the y offset to be identical.
      symbolizer.labelYOffset = -textStyle.getOffsetY();
    }

    if (goodnessOfFit !== undefined) {
      symbolizer.goodnessOfFit = goodnessOfFit;
    }

    symbolizers.push(symbolizer);
  }
};

export default VectorEncoder;
