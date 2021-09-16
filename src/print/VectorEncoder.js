// The MIT License (MIT)
//
// Copyright (c) 2018-2021 Camptocamp SA
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

import {rgbArrayToHex} from 'ngeo/utils';
import {getUid as olUtilGetUid} from 'ol/util';
import olFormatGeoJSON from 'ol/format/GeoJSON';
import olStyleRegularShape from 'ol/style/RegularShape';
import {toDegrees} from 'ol/math';
import olFeature from 'ol/Feature';
import Style from 'ol/style/Style';
import olStyleIcon from 'ol/style/Icon';
import olStyleCircle from 'ol/style/Circle';
import {asArray as asColorArray} from 'ol/color';
import {dpi} from 'ngeo/utils';

/**
 * @class
 * @hidden
 */
function VectorEncoder() {
  /**
   * @type {import('ol/format/GeoJSON').default}
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
 * @type {Object<string, PrintStyleType>}
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
 * @type {string}
 */
const FEATURE_STYLE_PROP = '_ngeo_style';

/**
 * @param {import('ngeo/print/mapfish-print-v3').MapFishPrintLayer[]} mapFishPrintLayer Array.
 * @param {import('ol/layer/Vector').default<import('ol/source/Vector').default<import('ol/geom/Geometry').default>>} layer Layer.
 * @param {number} resolution Resolution.
 * @param {number} destinationPrintDpi The destination print DPI.
 * @param {number} [goodnessOfFit] Goodness of fit.
 */
VectorEncoder.prototype.encodeVectorLayer = function (
  mapFishPrintLayer,
  layer,
  resolution,
  destinationPrintDpi,
  goodnessOfFit
) {
  /**
   * @type {import('ol/source/Vector').default<import('ol/geom/Geometry').default>}
   */
  const source = layer.getSource();

  const features = source.getFeatures();

  /** @type {olFeature<import('ol/geom/Geometry').default>[]} */
  const featuresFromStyle = [];

  /** @type {import("geojson").Feature[]} */
  const geojsonFeatures = [];
  /** @type {import('ngeo/print/mapfish-print-v3').MapFishPrintVectorStyle} */
  const mapfishStyleObject = {
    version: 2,
  };

  /**
   * @param {olFeature<import('ol/geom/Geometry').default>} originalFeature
   */
  const parseFeature = (originalFeature) => {
    /**
     * @type {import('ol/style/Style').default|import('ol/style/Style').default[]|void}
     */
    let styleData = null;
    const styleFunction = originalFeature.getStyleFunction() || layer.getStyleFunction();
    if (styleFunction !== undefined) {
      styleData = styleFunction.call(layer, originalFeature, resolution);
    }

    if (!styleData) {
      return;
    }

    let styles = Array.isArray(styleData) ? styleData : [styleData];

    // Each style with a geometry is filtered out and will be converted
    // to a separated feature to be printed.at the correct location.
    styles = styles.filter((style) => {
      if (style.getGeometry()) {
        featuresFromStyle.push(this.newFeatureFromStyle_(style));
        return false;
      }
      return true;
    });

    if (styles.length === 0) {
      return;
    }

    const geometry = /** @type {import('ol/geom/Geometry').default} */ (originalFeature.getGeometry());
    if (!geometry) {
      return;
    }
    const geometryType = geometry.getType();

    const stylesValue = styles.map((style) => olUtilGetUid(style).toString());
    const styleValue = `${stylesValue.join(',')}-${geometryType}`;
    const styleKey = `[${FEATURE_STYLE_PROP} = '${styleValue}']`;

    const geojsonFeature = this.geojsonFormat.writeFeatureObject(originalFeature);
    if (geojsonFeature.properties === null) {
      geojsonFeature.properties = {};
    }
    geojsonFeature.properties[FEATURE_STYLE_PROP] = styleValue;
    geojsonFeatures.push(geojsonFeature);

    if (mapfishStyleObject[styleKey]) {
      return;
    }

    /** @type {import('ngeo/print/mapfish-print-v3').MapFishPrintSymbolizers} */
    const styleObject = {
      symbolizers: [],
    };
    mapfishStyleObject[styleKey] = styleObject;
    for (const style of styles) {
      const mapfishPrintStyles = this.encodeVectorStyle_(
        geometryType,
        resolution,
        style,
        destinationPrintDpi,
        goodnessOfFit
      );
      if (mapfishPrintStyles && mapfishPrintStyles.length > 0) {
        styleObject.symbolizers.push(...mapfishPrintStyles);
      }
    }
  };

  features.forEach((feature) => parseFeature(feature));
  featuresFromStyle.forEach((feature) => parseFeature(feature));

  // MapFish Print fails if there are no style rules, even if there are no
  // features either. To work around this we just ignore the layer if the
  // array of GeoJSON features is empty.
  // See https://github.com/mapfish/mapfish-print/issues/279

  if (geojsonFeatures.length > 0) {
    const geojsonFeatureCollection = /** @type {import("geojson").FeatureCollection} */ ({
      type: 'FeatureCollection',
      features: geojsonFeatures,
    });
    const object = /** @type {import('ngeo/print/mapfish-print-v3').MapFishPrintVectorLayer} */ ({
      geoJson: geojsonFeatureCollection,
      opacity: layer.getOpacity(),
      style: mapfishStyleObject,
      type: 'geojson',
    });
    mapFishPrintLayer.push(object);
  }
};

/**
 * Transforms a style with a geometry to a new feature.
 *
 * @param {import('ol/style/Style').default} style Style.
 * @returns {olFeature<import('ol/geom/Geometry').default>} A feature from the style.
 */
VectorEncoder.prototype.newFeatureFromStyle_ = function (style) {
  const feature = new olFeature({
    geometry: style.getGeometry(),
  });
  feature.setStyle(
    new Style({
      fill: style.getFill(),
      image: style.getImage(),
      stroke: style.getStroke(),
      text: style.getText(),
    })
  );
  return feature;
};

/**
 * @param {string} geometryType Type of the GeoJSON geometry
 * @param {number} resolution Resolution.
 * @param {import('ol/style/Style').default} style Style.
 * @param {number} destinationPrintDpi The destination print DPI.
 * @param {number} [goodnessOfFit] Goodness of fit.
 * @returns {import('ngeo/print/mapfish-print-v3').MapFishPrintSymbolizer[]} The styles
 */
VectorEncoder.prototype.encodeVectorStyle_ = function (
  geometryType,
  resolution,
  style,
  destinationPrintDpi,
  goodnessOfFit
) {
  if (!(geometryType in PRINT_STYLE_TYPES)) {
    // unsupported geometry type
    return null;
  }

  const symbolizers = [];

  const textStyle = style.getText();
  if (textStyle !== null) {
    const encodedStyle = this.encodeTextStyle_(textStyle, goodnessOfFit);
    if (encodedStyle !== undefined) {
      symbolizers.push(encodedStyle);
    }
  }

  const styleType = PRINT_STYLE_TYPES[geometryType];
  const fillStyle = style.getFill();
  const strokeStyle = style.getStroke();
  if (styleType === PrintStyleType.POLYGON) {
    if (fillStyle !== null) {
      symbolizers.push(this.encodeVectorStylePolygon_(fillStyle, strokeStyle));
    }
  } else if (styleType === PrintStyleType.LINE_STRING) {
    if (strokeStyle !== null) {
      symbolizers.push(this.encodeVectorStyleLine_(strokeStyle));
    }
  } else if (styleType === PrintStyleType.POINT) {
    const imageStyle = style.getImage();
    if (imageStyle !== null) {
      symbolizers.push(this.encodeVectorStyle_Point_(resolution, imageStyle, destinationPrintDpi));
    }
  }
  return symbolizers;
};

/**
 * @param {import('ngeo/print/mapfish-print-v3').MapFishPrintSymbolizerPoint|import('ngeo/print/mapfish-print-v3').MapFishPrintSymbolizerPolygon} symbolizer
 *    MapFish Print symbolizer.
 * @param {import('ol/style/Fill').default} fillStyle Fill style.
 */
VectorEncoder.prototype.encodeVectorStyleFill_ = function (symbolizer, fillStyle) {
  let fillColor = /** @type {import('ol/color').Color} */ (fillStyle.getColor());
  if (fillColor !== null) {
    console.assert(typeof fillColor === 'string' || Array.isArray(fillColor));
    fillColor = asColorArray(fillColor);
    console.assert(Array.isArray(fillColor), 'only supporting fill colors');
    symbolizer.fillColor = rgbArrayToHex(fillColor);
    symbolizer.fillOpacity = fillColor[3];
  }
};

/**
 * @param {import('ol/style/Stroke').default} strokeStyle Stroke style.
 * @returns {import('ngeo/print/mapfish-print-v3').MapFishPrintSymbolizer} The style
 */
VectorEncoder.prototype.encodeVectorStyleLine_ = function (strokeStyle) {
  const symbolizer = /** @type {import('ngeo/print/mapfish-print-v3').MapFishPrintSymbolizerLine} */ ({
    type: 'line',
  });
  this.encodeVectorStyleStroke_(symbolizer, strokeStyle);
  return symbolizer;
};

/**
 * @param {number} resolution Resolution.
 * @param {import('ol/style/Image').default} imageStyle Image style.
 * @param {number} destinationPrintDpi The destination print DPI.
 * @returns {import('ngeo/print/mapfish-print-v3').MapFishPrintSymbolizer} The style
 */
VectorEncoder.prototype.encodeVectorStyle_Point_ = function (resolution, imageStyle, destinationPrintDpi) {
  let symbolizer;
  if (imageStyle instanceof olStyleCircle) {
    symbolizer = /** @type {import('ngeo/print/mapfish-print-v3').MapFishPrintSymbolizerPoint} */ ({
      type: 'point',
    });
    symbolizer.pointRadius = imageStyle.getRadius();
    const fillStyle = imageStyle.getFill();
    if (fillStyle !== null) {
      this.encodeVectorStyleFill_(symbolizer, fillStyle);
    }
    const strokeStyle = imageStyle.getStroke();
    if (strokeStyle !== null) {
      this.encodeVectorStyleStroke_(symbolizer, strokeStyle);
    }
  } else if (imageStyle instanceof olStyleIcon) {
    const imgSrc = imageStyle.getSrc();
    if (!imgSrc) {
      throw new Error('Missing imgSrc');
    }
    const src = new URL(imgSrc, window.location.href).href;
    if (src !== undefined) {
      symbolizer = /** @type {import('ngeo/print/mapfish-print-v3').MapFishPrintSymbolizerPoint} */ ({
        type: 'point',
        externalGraphic: src,
      });
      const opacity = imageStyle.getOpacity();
      if (opacity !== null) {
        symbolizer.graphicOpacity = opacity;
      }
      const size = imageStyle.getSize();
      if (size !== null) {
        let scale = /** @type {number} */ (imageStyle.getScale());
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
    symbolizer = /** @type {import('ngeo/print/mapfish-print-v3').MapFishPrintSymbolizerPoint} */ ({
      type: 'point',
      externalGraphic: /** @type {HTMLCanvasElement} */ (
        imageStyle.getImage(destinationPrintDpi / dpi())
      ).toDataURL(),
    });

    const [height, width] = imageStyle.getSize();
    const scale = /** @type {number} */ (imageStyle.getScale());
    symbolizer.graphicHeight = height * scale;
    symbolizer.graphicWidth = width * scale;
  }
  return symbolizer;
};

/**
 * @param {import('ol/style/Fill').default} fillStyle Fill style.
 * @param {import('ol/style/Stroke').default} strokeStyle Stroke style.
 * @returns {import('ngeo/print/mapfish-print-v3').MapFishPrintSymbolizer} The style
 */
VectorEncoder.prototype.encodeVectorStylePolygon_ = function (fillStyle, strokeStyle) {
  const symbolizer = /** @type {import('ngeo/print/mapfish-print-v3').MapFishPrintSymbolizerPolygon} */ ({
    type: 'polygon',
  });
  this.encodeVectorStyleFill_(symbolizer, fillStyle);
  if (strokeStyle !== null) {
    this.encodeVectorStyleStroke_(symbolizer, strokeStyle);
  }
  return symbolizer;
};

/**
 * @param {import('ngeo/print/mapfish-print-v3').MapFishPrintSymbolizerPoint|import('ngeo/print/mapfish-print-v3').MapFishPrintSymbolizerLine|import('ngeo/print/mapfish-print-v3').MapFishPrintSymbolizerPolygon} symbolizer
 *      MapFish Print symbolizer.
 * @param {import('ol/style/Stroke').default} strokeStyle Stroke style.
 */
VectorEncoder.prototype.encodeVectorStyleStroke_ = function (symbolizer, strokeStyle) {
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
    /** @type {import('ngeo/print/mapfish-print-v3').MapFishPrintSymbolizerLine} */ (
      symbolizer
    ).strokeDashstyle = strokeDashstyle.join(' ');
  }
  const strokeWidth = strokeStyle.getWidth();
  if (strokeWidth !== undefined) {
    symbolizer.strokeWidth = strokeWidth;
  }
  const strokeLineCap = strokeStyle.getLineCap();
  if (strokeLineCap) {
    /** @type {import('ngeo/print/mapfish-print-v3').MapFishPrintSymbolizerLine} */ (
      symbolizer
    ).strokeLinecap = strokeLineCap;
  }
};

/**
 * @param {import('ol/style/Text').default} textStyle Text style.
 * @param {number} [goodnessOfFit] Goodness of fit.
 * @returns {import('ngeo/print/mapfish-print-v3').MapFishPrintSymbolizer} The style
 */
VectorEncoder.prototype.encodeTextStyle_ = function (textStyle, goodnessOfFit) {
  const symbolizer = /** @type {import('ngeo/print/mapfish-print-v3').MapFishPrintSymbolizerText} */ ({
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

    // Handle CanvasRenderingContext2D.font like OpenLayers text font. Example: '900 20px serif'.
    const fontStyle = textStyle.getFont();
    if (fontStyle !== undefined) {
      const font = fontStyle.split(' ');
      if (font.length >= 3) {
        symbolizer.fontWeight = font[0];
        symbolizer.fontSize = font[1];
        const fontFamily = font.splice(2).join(' ');
        // Remove simple quotes and double quotes for fonts with spaces like "Font Awesome".
        symbolizer.fontFamily = fontFamily.replace(/\'|\"/g, '');
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

    return symbolizer;
  }
};

export default VectorEncoder;
