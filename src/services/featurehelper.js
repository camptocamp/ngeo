goog.provide('ngeo.FeatureHelper');

goog.require('ngeo');
/** @suppress {extraRequire} */
goog.require('ngeo.filters');
goog.require('ngeo.interaction.Measure');
goog.require('ngeo.interaction.MeasureAzimut');
goog.require('ngeo.Download');
goog.require('ol.Feature');
goog.require('ol.geom.LineString');
goog.require('ol.geom.MultiLineString');
goog.require('ol.geom.MultiPoint');
goog.require('ol.geom.Point');
goog.require('ol.geom.Polygon');
goog.require('ol.geom.MultiPolygon');
goog.require('ol.format.GPX');
goog.require('ol.format.KML');
goog.require('ol.style.Circle');
goog.require('ol.style.Fill');
goog.require('ol.style.RegularShape');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');
goog.require('ol.style.Text');


/**
 * Provides methods for features, such as:
 *  - style setting / getting
 *  - measurement
 *  - export
 *
 * @constructor
 * @struct
 * @param {!angular.$injector} $injector Main injector.
 * @param {!angular.$filter} $filter Angular filter.
 * @ngdoc service
 * @ngname ngeoFeatureHelper
 * @ngInject
 */
ngeo.FeatureHelper = function($injector, $filter) {

  /**
   * @type {!angular.$filter}
   * @private
   */
  this.$filter_ = $filter;

  /**
   * @type {number|undefined}
   * @private
   */
  this.decimals_ = undefined;
  if ($injector.has('ngeoMeasureDecimals')) {
    this.decimals_ = $injector.get('ngeoMeasureDecimals');
  }


  /**
   * @type {number|undefined}
   * @private
   */
  this.precision_ = undefined;
  if ($injector.has('ngeoMeasurePrecision')) {
    this.precision_ = $injector.get('ngeoMeasurePrecision');
  }

  /**
   * @type {!ngeox.number}
   */
  this.numberFormat_ = /** @type {ngeox.number} */ ($filter('number'));

  /**
   * @type {!ngeox.unitPrefix}
   */
  this.unitPrefixFormat_ = /** @type {ngeox.unitPrefix} */ ($filter('ngeoUnitPrefix'));

  /**
   * @type {!ngeox.numberCoordinates}
   */
  this.ngeoNumberCoordinates_ = /** @type {ngeox.numberCoordinates} */ ($filter('ngeoNumberCoordinates'));

  /**
   * Filter function to display point coordinates or null to don't use any filter.
   * @type {function(*):string|null}
   * @private
   */
  this.pointFilterFn_ = null;

  /**
   * Arguments to apply to the point filter function.
   * @type {Array.<*>}
   * @private
   */
  this.pointFilterArgs_ = [];

  if ($injector.has('ngeoPointfilter')) {
    const filterElements = $injector.get('ngeoPointfilter').split(':');
    const filterName = filterElements.shift();
    const filter = this.$filter_(filterName);
    goog.asserts.assertFunction(filter);
    this.pointFilterFn_ = filter;
    this.pointFilterArgs_ = filterElements;
  } else {
    this.pointFilterFn_ = null;
  }

  /**
   * @type {!ol.proj.Projection}
   * @private
   */
  this.projection_;

  /**
   * Download service.
   * @type {ngeo.Download}
   * @private
   */
  this.download_ = $injector.get('ngeoDownload');

};


/**
 * @param {!ol.proj.Projection} projection Projection.
 * @export
 */
ngeo.FeatureHelper.prototype.setProjection = function(projection) {
  this.projection_ = projection;
};


// === STYLE METHODS ===


/**
 * Set the style of a feature using its inner properties and depending on
 * its geometry type.
 * @param {!ol.Feature} feature Feature.
 * @param {boolean=} opt_select Whether the feature should be rendered as
 *     selected, which includes additional vertex and halo styles.
 * @export
 */
ngeo.FeatureHelper.prototype.setStyle = function(feature, opt_select) {
  const styles = this.getStyle(feature);
  if (opt_select) {
    if (this.supportsVertex_(feature)) {
      styles.push(this.getVertexStyle());
    }
    styles.unshift(this.getHaloStyle_(feature));
  }
  feature.setStyle(styles);
};


/**
 * Create and return a style object from a given feature using its inner
 * properties and depending on its geometry type.
 * @param {!ol.Feature} feature Feature.
 * @return {!Array.<!ol.style.Style>} The style object.
 * @export
 */
ngeo.FeatureHelper.prototype.getStyle = function(feature) {
  const type = this.getType(feature);
  let style;

  switch (type) {
    case ngeo.GeometryType.LINE_STRING:
      style = this.getLineStringStyle_(feature);
      break;
    case ngeo.GeometryType.POINT:
      style = this.getPointStyle_(feature);
      break;
    case ngeo.GeometryType.CIRCLE:
    case ngeo.GeometryType.POLYGON:
    case ngeo.GeometryType.RECTANGLE:
      style = this.getPolygonStyle_(feature);
      break;
    case ngeo.GeometryType.TEXT:
      style = this.getTextStyle_(feature);
      break;
    default:
      break;
  }

  goog.asserts.assert(style, 'Style should be thruthy');

  let styles;
  if (style.constructor === Array) {
    styles = /** @type {!Array.<!ol.style.Style>}*/ (style);
  } else {
    styles = [style];
  }

  return styles;
};


/**
 * @param {!ol.Feature} feature Feature with linestring geometry.
 * @return {!Array.<!ol.style.Style>} Style.
 * @private
 */
ngeo.FeatureHelper.prototype.getLineStringStyle_ = function(feature) {
  const strokeWidth = this.getStrokeProperty(feature);
  const showLabel = this.getShowLabelProperty(feature);
  const showMeasure = this.getShowMeasureProperty(feature);
  const color = this.getRGBAColorProperty(feature);

  const styles = [new ol.style.Style({
    stroke: new ol.style.Stroke({
      color,
      width: strokeWidth
    })
  })];
  //Label Style
  const textLabelValues = [];
  if (showMeasure) {
    textLabelValues.push(this.getMeasure(feature));
  }
  if (showLabel) {
    textLabelValues.push(this.getNameProperty(feature));
  }
  if (showLabel ||  showMeasure) {
    // display both label using  \n
    const textLabelValue = textLabelValues.join('\n');
    styles.push(new ol.style.Style({
      text: this.createTextStyle_({
        text: textLabelValue
      })
    }));
  }
  return styles;
};


/**
 * @param {!ol.Feature} feature Feature with point geometry.
 * @return {!Array.<!ol.style.Style>} Style.
 * @private
 */
ngeo.FeatureHelper.prototype.getPointStyle_ = function(feature) {
  const size = this.getSizeProperty(feature);
  const color = this.getRGBAColorProperty(feature);
  const showLabel = this.getShowLabelProperty(feature);
  const showMeasure = this.getShowMeasureProperty(feature);
  const styles = [new ol.style.Style({
    image: new ol.style.Circle({
      radius: size,
      fill: new ol.style.Fill({
        color
      })
    })
  })];
  // Label Style
  const textLabelValues = [];
  if (showMeasure) {
    textLabelValues.push(this.getMeasure(feature));
  }
  if (showLabel) {
    textLabelValues.push(this.getNameProperty(feature));
  }
  if (showLabel ||  showMeasure) {
    // display both label using  \n
    const textLabelValue = textLabelValues.join('\n');
    const font_size = 10;
    // https://reeddesign.co.uk/test/points-pixels.html
    const point_to_px = 1.3;
    styles.push(new ol.style.Style({
      text: this.createTextStyle_({
        text: textLabelValue,
        size: font_size,
        offsetY: -(size + (font_size / 2) * textLabelValues.length * point_to_px + 4)
      })
    }));
  }
  return styles;
};


/**
 * Get an optional number feature attribute.
 *
 * @param {!ol.Feature} feature Feature.
 * @param {string} attrib The attribute name.
 * @return {number|undefined}, The attribute value
 */
ngeo.FeatureHelper.prototype.optNumber = function(feature, attrib) {
  const value = feature.get(attrib);
  if (value !== undefined) {
    if (typeof value == 'string') {
      return +value;
    } else {
      return goog.asserts.assertNumber(value);
    }
  } else {
    return undefined;
  }
};


/**
 * Get a number feature attribute.
 *
 * @param {!ol.Feature} feature Feature.
 * @param {string} attrib The attribute name.
 * @return {number}, The attribute value
 */
ngeo.FeatureHelper.prototype.getNumber = function(feature, attrib) {
  const value = feature.get(attrib);
  if (typeof value == 'string') {
    return +value;
  } else {
    return goog.asserts.assertNumber(value);
  }
};


/**
 * @param {!ol.Feature} feature Feature with polygon geometry.
 * @return {!Array.<!ol.style.Style>} Style.
 * @private
 */
ngeo.FeatureHelper.prototype.getPolygonStyle_ = function(feature) {
  const strokeWidth = this.getStrokeProperty(feature);
  const opacity = this.getOpacityProperty(feature);
  const color = this.getRGBAColorProperty(feature);
  const showLabel = this.getShowLabelProperty(feature);
  const showMeasure = this.getShowMeasureProperty(feature);

  // fill color with opacity
  const fillColor = color.slice();
  fillColor[3] = opacity;

  const azimut = this.optNumber(feature, ngeo.FeatureProperties.AZIMUT);

  const styles = [new ol.style.Style({
    fill: new ol.style.Fill({
      color: fillColor
    }),
    stroke: new ol.style.Stroke({
      color,
      width: strokeWidth
    })
  })];
  if (showMeasure || showLabel) {
    if (azimut !== undefined) {
      // Radius style:
      const line = this.getRadiusLine(feature, azimut);
      const length = ngeo.interaction.Measure.getFormattedLength(
        line, this.projection_, this.precision_, this.unitPrefixFormat_);

      styles.push(new ol.style.Style({
        geometry: line,
        fill: new ol.style.Fill({
          color: fillColor
        }),
        stroke: new ol.style.Stroke({
          color,
          width: strokeWidth
        }),
        text: this.createTextStyle_({
          text: length,
          angle: ((azimut % 180) + 180) % 180 - 90
        })
      }));

      // Azimut style
      styles.push(new ol.style.Style({
        geometry: new ol.geom.Point(line.getLastCoordinate()),
        text: this.createTextStyle_({
          text: `${this.numberFormat_(azimut, this.decimals_)}°`,
          size: 10,
          offsetX: Math.cos((azimut - 90) * Math.PI / 180) * 20,
          offsetY: Math.sin((azimut - 90) * Math.PI / 180) * 20
        })
      }));
    } else {
      //Label Style
      const textLabelValues = [];
      if (showMeasure) {
        textLabelValues.push(this.getMeasure(feature));
      }
      if (showLabel) {
        textLabelValues.push(this.getNameProperty(feature));
      }
      if (showLabel ||  showMeasure) {
        // display both label using  \n
        const textLabelValue = textLabelValues.join('\n');
        styles.push(new ol.style.Style({
          text: this.createTextStyle_({
            text: textLabelValue,
            offsetY: -(8 / 2 + 4),
            exceedLength: true
          })
        }));
      }
    }
  }
  return styles;
};


/**
 * @param {!ol.Feature} feature Feature with point geometry, rendered as text.
 * @return {!ol.style.Style} Style.
 * @private
 */
ngeo.FeatureHelper.prototype.getTextStyle_ = function(feature) {

  return new ol.style.Style({
    text: this.createTextStyle_({
      text: this.getNameProperty(feature),
      size: this.getSizeProperty(feature),
      angle: this.getAngleProperty(feature),
      color: this.getRGBAColorProperty(feature),
      width: this.getStrokeProperty(feature)
    })
  });
};


/**
 * @param {!ol.Feature} feature Feature to create the editing styles with.
 * @return {!Array.<!ol.style.Style>} List of style.
 * @export
 */
ngeo.FeatureHelper.prototype.createEditingStyles = function(feature) {
  // (1) Style definition depends on geometry type
  const white = [255, 255, 255, 1];
  const blue = [0, 153, 255, 1];
  const width = 3;
  const styles = [];

  const geom = feature.getGeometry();
  console.assert(geom);
  const type = geom.getType();

  if (type === ol.geom.GeometryType.POINT) {
    styles.push(
      new ol.style.Style({
        image: new ol.style.Circle({
          radius: width * 2,
          fill: new ol.style.Fill({
            color: blue
          }),
          stroke: new ol.style.Stroke({
            color: white,
            width: width / 2
          })
        }),
        zIndex: Infinity
      })
    );
  } else {
    if (type === ol.geom.GeometryType.LINE_STRING) {
      styles.push(
        new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: white,
            width: width + 2
          })
        })
      );
      styles.push(
        new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: blue,
            width
          })
        })
      );
    } else {
      styles.push(
        new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: blue,
            width: width / 2
          }),
          fill: new ol.style.Fill({
            color: [255, 255, 255, 0.5]
          })
        })
      );
    }

    // (2) Anything else than 'Point' requires the vertex style as well
    styles.push(this.getVertexStyle(true));
  }

  return styles;
};


/**
 * Create and return a style object to be used for vertex.
 * @param {boolean=} opt_incGeomFunc Whether to include the geometry function
 *     or not. One wants to use the geometry function when you want to draw
 *     the vertex of features that don't have point geometries. One doesn't
 *     want to include the geometry function if you just want to have the
 *     style object itself to be used to draw features that have point
 *     geometries. Defaults to `true`.
 * @return {!ol.style.Style} Style.
 * @export
 */
ngeo.FeatureHelper.prototype.getVertexStyle = function(opt_incGeomFunc) {
  const incGeomFunc = opt_incGeomFunc !== undefined ? opt_incGeomFunc : true;

  const options = {
    image: new ol.style.RegularShape({
      radius: 6,
      points: 4,
      angle: Math.PI / 4,
      fill: new ol.style.Fill({
        color: [255, 255, 255, 0.5]
      }),
      stroke: new ol.style.Stroke({
        color: [0, 0, 0, 1]
      })
    })
  };

  if (incGeomFunc) {
    options.geometry = function(feature) {
      const geom = feature.getGeometry();

      if (geom.getType() == ol.geom.GeometryType.POINT) {
        return;
      }

      let innerMultiCoordinates;
      let multiCoordinates = [];
      let coordinates = [];
      let i, ii;
      if (geom instanceof ol.geom.LineString) {
        coordinates = geom.getCoordinates();
      } else if (geom instanceof ol.geom.MultiLineString) {
        multiCoordinates = geom.getCoordinates();
      } else if (geom instanceof ol.geom.Polygon) {
        coordinates = geom.getCoordinates()[0];
      } else if (geom instanceof ol.geom.MultiPolygon) {
        innerMultiCoordinates = geom.getCoordinates();
      }

      if (innerMultiCoordinates) {
        for (i = 0, ii = innerMultiCoordinates.length; i < ii; i++) {
          multiCoordinates = multiCoordinates.concat(innerMultiCoordinates[i]);
        }
      }
      for (i = 0, ii = multiCoordinates.length; i < ii; i++) {
        coordinates = coordinates.concat(multiCoordinates[i]);
      }

      if (coordinates.length) {
        return new ol.geom.MultiPoint(coordinates);
      } else {
        return geom;
      }
    };
  }

  return new ol.style.Style(options);
};


/**
 * @param {!ol.Feature} feature Feature.
 * @return {boolean} Whether the feature supports vertex or not.
 * @private
 */
ngeo.FeatureHelper.prototype.supportsVertex_ = function(feature) {
  const supported = [
    ngeo.GeometryType.LINE_STRING,
    ngeo.GeometryType.POLYGON,
    ngeo.GeometryType.RECTANGLE
  ];
  const type = this.getType(feature);
  return ol.array.includes(supported, type);
};


/**
 * @param {!ol.Feature} feature Feature.
 * @return {!ol.style.Style} Style.
 * @private
 */
ngeo.FeatureHelper.prototype.getHaloStyle_ = function(feature) {
  const type = this.getType(feature);
  let style;
  const haloSize = 3;

  switch (type) {
    case ngeo.GeometryType.POINT:
      const size = this.getSizeProperty(feature);
      style = new ol.style.Style({
        image: new ol.style.Circle({
          radius: size + haloSize,
          fill: new ol.style.Fill({
            color: [255, 255, 255, 1]
          })
        })
      });
      break;
    case ngeo.GeometryType.LINE_STRING:
    case ngeo.GeometryType.CIRCLE:
    case ngeo.GeometryType.POLYGON:
    case ngeo.GeometryType.RECTANGLE:
      const strokeWidth = this.getStrokeProperty(feature);
      style = new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: [255, 255, 255, 1],
          width: strokeWidth + haloSize * 2
        })
      });
      break;
    case ngeo.GeometryType.TEXT:
      style = new ol.style.Style({
        text: this.createTextStyle_({
          text: this.getNameProperty(feature),
          size: this.getSizeProperty(feature),
          angle: this.getAngleProperty(feature),
          width: haloSize * 3
        })
      });
      break;
    default:
      break;
  }

  goog.asserts.assert(style, 'Style should be thruthy');

  return style;
};


// === PROPERTY GETTERS ===

/**
 * Delete the unwanted ol3 properties from the current feature then return the
 * properties.
 * Also delete the 'ngeo_feature_type_' from the ngeo query system.
 * @param {!ol.Feature} feature Feature.
 * @return {!Object.<string, *>} Filtered properties of the current feature.
 * @export
 */
ngeo.FeatureHelper.getFilteredFeatureValues = function(feature) {
  const properties = feature.getProperties();
  delete properties['boundedBy'];
  delete properties[feature.getGeometryName()];
  delete properties['ngeo_feature_type_'];
  return properties;
};

/**
 * @param {ol.Feature} feature Feature.
 * @return {number} Angle.
 * @export
 */
ngeo.FeatureHelper.prototype.getAngleProperty = function(feature) {
  const angle = +(/** @type {string} */ (
    feature.get(ngeo.FeatureProperties.ANGLE)));
  goog.asserts.assertNumber(angle);
  return angle;
};


/**
 * @param {!ol.Feature} feature Feature.
 * @return {string} Color.
 * @export
 */
ngeo.FeatureHelper.prototype.getColorProperty = function(feature) {

  const color = goog.asserts.assertString(feature.get(ngeo.FeatureProperties.COLOR));

  goog.asserts.assertString(color);

  return color;
};


/**
 * @param {!ol.Feature} feature Feature.
 * @return {!ol.Color} Color.
 * @export
 */
ngeo.FeatureHelper.prototype.getRGBAColorProperty = function(feature) {
  return ol.color.fromString(this.getColorProperty(feature));
};


/**
 * @param {!ol.Feature} feature Feature.
 * @return {string} Name.
 * @export
 */
ngeo.FeatureHelper.prototype.getNameProperty = function(feature) {
  const name = goog.asserts.assertString(feature.get(ngeo.FeatureProperties.NAME));
  goog.asserts.assertString(name);
  return name;
};


/**
 * @param {!ol.Feature} feature Feature.
 * @return {number} Opacity.
 * @export
 */
ngeo.FeatureHelper.prototype.getOpacityProperty = function(feature) {
  return this.getNumber(feature, ngeo.FeatureProperties.OPACITY);
};


/**
 * @param {!ol.Feature} feature Feature.
 * @return {boolean} Show measure.
 * @export
 */
ngeo.FeatureHelper.prototype.getShowMeasureProperty = function(feature) {
  let showMeasure = feature.get(ngeo.FeatureProperties.SHOW_MEASURE);
  if (showMeasure === undefined) {
    showMeasure = false;
  } else if (typeof showMeasure === 'string') {
    showMeasure = (showMeasure === 'true') ? true : false;
  }
  return goog.asserts.assertBoolean(showMeasure);
};

/**
 * @param {!ol.Feature} feature Feature.
 * @return {boolean} Show feature label.
 * @export
 */
ngeo.FeatureHelper.prototype.getShowLabelProperty = function(feature) {
  let showLabel = feature.get(ngeo.FeatureProperties.SHOW_LABEL);
  if (showLabel === undefined) {
    showLabel = false;
  } else if (typeof showLabel === 'string') {
    showLabel = (showLabel === 'true') ? true : false;
  }
  return goog.asserts.assertBoolean(showLabel);
};

/**
 * @param {!ol.Feature} feature Feature.
 * @return {number} Size.
 * @export
 */
ngeo.FeatureHelper.prototype.getSizeProperty = function(feature) {
  return this.getNumber(feature, ngeo.FeatureProperties.SIZE);
};


/**
 * @param {!ol.Feature} feature Feature.
 * @return {number} Stroke.
 * @export
 */
ngeo.FeatureHelper.prototype.getStrokeProperty = function(feature) {
  return this.getNumber(feature, ngeo.FeatureProperties.STROKE);
};


// === EXPORT ===


/**
 * Export features in the given format. The projection of the exported features
 * is: `EPSG:4326`.
 * @param {!Array.<!ol.Feature>} features Array of vector features.
 * @param {string} formatType Format type to export the features.
 * @export
 */
ngeo.FeatureHelper.prototype.export = function(features, formatType) {
  switch (formatType) {
    case ngeo.FeatureHelper.FormatType.GPX:
      this.exportGPX(features);
      break;
    case ngeo.FeatureHelper.FormatType.KML:
      this.exportKML(features);
      break;
    default:
      break;
  }
};


/**
 * Export features in GPX and download the result to the browser. The
 * projection of the exported features is: `EPSG:4326`.
 * @param {!Array.<!ol.Feature>} features Array of vector features.
 * @export
 */
ngeo.FeatureHelper.prototype.exportGPX = function(features) {
  const format = new ol.format.GPX();
  const mimeType = 'application/gpx+xml';
  const fileName = 'export.gpx';
  this.export_(features, format, fileName, mimeType);
};


/**
 * Export features in KML and download the result to the browser. The
 * projection of the exported features is: `EPSG:4326`.
 * @param {!Array.<!ol.Feature>} features Array of vector features.
 * @export
 */
ngeo.FeatureHelper.prototype.exportKML = function(features) {
  const format = new ol.format.KML();
  const mimeType = 'application/vnd.google-earth.kml+xml';
  const fileName = 'export.kml';
  this.export_(features, format, fileName, mimeType);
};


/**
 * Export features using a given format to a specific filename and download
 * the result to the browser. The projection of the exported features is:
 * `EPSG:4326`.
 * @param {!Array.<!ol.Feature>} features Array of vector features.
 * @param {!ol.format.Feature} format Format
 * @param {string} fileName Name of the file.
 * @param {string=} opt_mimeType Mime type. Defaults to 'text/plain'.
 * @private
 */
ngeo.FeatureHelper.prototype.export_ = function(features, format, fileName, opt_mimeType) {
  const mimeType = opt_mimeType !== undefined ? opt_mimeType : 'text/plain';

  // clone the features to apply the original style to the clone
  // (the original may have select style active)
  const clones = [];
  let clone;
  features.forEach((feature) => {
    clone = new ol.Feature(feature.getProperties());
    this.setStyle(clone, false);
    clones.push(clone);
  });

  const writeOptions = this.projection_ ? {
    dataProjection: 'EPSG:4326',
    featureProjection: this.projection_
  } : {};

  const data = format.writeFeatures(clones, writeOptions);
  this.download_(
    data, fileName, `${mimeType};charset=utf-8`);
};


// === OTHER UTILITY METHODS ===


/**
 * @param {!ngeox.style.TextOptions} options Options.
 * @return {!ol.style.Text} Style.
 * @private
 */
ngeo.FeatureHelper.prototype.createTextStyle_ = function(options) {
  if (options.angle) {
    const angle = options.angle !== undefined ? options.angle : 0;
    const rotation = angle * Math.PI / 180;
    options.rotation = rotation;
    delete options.angle;
  }

  options.font = ['normal', `${options.size || 10}pt`, 'Arial'].join(' ');

  if (options.color) {
    options.fill = new ol.style.Fill({color: options.color || [0, 0, 0, 1]});
    delete options.color;
  }

  options.stroke = new ol.style.Stroke({
    color: [255, 255, 255, 1],
    width: options.width || 3
  });
  delete options.width;

  return new ol.style.Text(options);
};


/**
 * Get the measure of the given feature as a string. For points, you can format
 * the result by setting a filter to apply on the coordinate with the function
 * {@link ngeo.FeatureHelper.prototype.setPointFilterFn}.
 * @param {!ol.Feature} feature Feature.
 * @return {string} Measure.
 * @export
 */
ngeo.FeatureHelper.prototype.getMeasure = function(feature) {

  const geometry = feature.getGeometry();
  goog.asserts.assert(geometry, 'Geometry should be truthy');

  let measure = '';

  if (geometry instanceof ol.geom.Polygon) {
    if (this.getType(feature) === ngeo.GeometryType.CIRCLE) {
      const azimut = this.optNumber(feature, ngeo.FeatureProperties.AZIMUT);
      goog.asserts.assertNumber(azimut);
      const line = this.getRadiusLine(feature, azimut);

      measure = ngeo.interaction.MeasureAzimut.getFormattedAzimutRadius(
        line, this.projection_, this.decimals_, this.precision_, this.unitPrefixFormat_, this.numberFormat_);
    } else {
      measure = ngeo.interaction.Measure.getFormattedArea(
        geometry, this.projection_, this.precision_, this.unitPrefixFormat_);
    }
  } else if (geometry instanceof ol.geom.LineString) {
    measure = ngeo.interaction.Measure.getFormattedLength(
      geometry, this.projection_, this.precision_, this.unitPrefixFormat_);
  } else if (geometry instanceof ol.geom.Point) {
    if (this.pointFilterFn_ === null) {
      measure = ngeo.interaction.Measure.getFormattedPoint(
        geometry, this.decimals_, this.ngeoNumberCoordinates_);
    } else {
      const coordinates = geometry.getCoordinates();
      const args = this.pointFilterArgs_.slice(0);
      args.unshift(coordinates);
      measure = this.pointFilterFn_(...args);
    }
  }

  return measure;
};


/**
 * Return the type of geometry of a feature using its geometry property and
 * some inner properties.
 * @param {!ol.Feature} feature Feature.
 * @return {string} The type of geometry.
 * @export
 */
ngeo.FeatureHelper.prototype.getType = function(feature) {
  const geometry = feature.getGeometry();
  goog.asserts.assert(geometry, 'Geometry should be thruthy');

  let type;

  if (geometry instanceof ol.geom.Point) {
    if (feature.get(ngeo.FeatureProperties.IS_TEXT)) {
      type = ngeo.GeometryType.TEXT;
    } else {
      type = ngeo.GeometryType.POINT;
    }
  } else if (geometry instanceof ol.geom.MultiPoint) {
    type = ngeo.GeometryType.MULTI_POINT;
  } else if (geometry instanceof ol.geom.Polygon) {
    if (feature.get(ngeo.FeatureProperties.IS_CIRCLE)) {
      type = ngeo.GeometryType.CIRCLE;
    } else if (feature.get(ngeo.FeatureProperties.IS_RECTANGLE)) {
      type = ngeo.GeometryType.RECTANGLE;
    } else {
      type = ngeo.GeometryType.POLYGON;
    }
  } else if (geometry instanceof ol.geom.MultiPolygon) {
    type = ngeo.GeometryType.MULTI_POLYGON;
  } else if (geometry instanceof ol.geom.LineString) {
    type = ngeo.GeometryType.LINE_STRING;
  } else if (geometry instanceof ol.geom.MultiLineString) {
    type = ngeo.GeometryType.MULTI_LINE_STRING;
  }

  goog.asserts.assert(type, 'Type should be thruthy');

  return type;
};


/**
 * This method first checks if a feature's extent intersects with the map view
 * extent. If it doesn't, then the view gets recentered with an animation to
 * the center of the feature.
 * @param {!ol.Feature} feature Feature.
 * @param {!ol.Map} map Map.
 * @param {number=} opt_panDuration Pan animation duration. Defaults to `250`.
 * @export
 */
ngeo.FeatureHelper.prototype.panMapToFeature = function(feature, map,
  opt_panDuration) {

  const panDuration = opt_panDuration !== undefined ? opt_panDuration : 250;
  const size = map.getSize();
  goog.asserts.assertArray(size);
  const view = map.getView();
  const extent = view.calculateExtent(size);
  const geometry = feature.getGeometry();

  if (!geometry.intersectsExtent(extent)) {
    const mapCenter = view.getCenter();
    goog.asserts.assertArray(mapCenter);

    let featureCenter;
    if (geometry instanceof ol.geom.LineString) {
      featureCenter = geometry.getCoordinateAt(0.5);
    } else if (geometry instanceof ol.geom.Polygon) {
      featureCenter = geometry.getInteriorPoint().getCoordinates();
    } else if (geometry instanceof ol.geom.Point) {
      featureCenter = geometry.getCoordinates();
    } else {
      featureCenter = ol.extent.getCenter(geometry.getExtent());
    }

    view.animate({
      center: mapCenter,
      duration: panDuration
    }, {
      center: featureCenter,
      duration: panDuration
    });
  }
};


/**
 * This method generates a line string geometry that represents the radius for
 * a given azimut. It expects the input geometry to be a circle.
 * @param {!ol.Feature} feature Feature.
 * @param {number} azimut Azimut in degrees.
 * @return {!ol.geom.LineString} The line geometry.
 */
ngeo.FeatureHelper.prototype.getRadiusLine = function(feature, azimut) {
  const geometry = feature.getGeometry();
  // Determine the radius for the circle
  const extent = geometry.getExtent();
  const radius = (extent[3] - extent[1]) / 2;

  const center = ol.extent.getCenter(geometry.getExtent());

  const x = Math.cos((azimut - 90) * Math.PI / 180) * radius;
  const y = -Math.sin((azimut - 90) * Math.PI / 180) * radius;
  const endPoint = [x + center[0], y + center[1]];
  return new ol.geom.LineString([center, endPoint]);
};


/**
 * Return the properties of a feature, with the exception of the geometry.
 * @param {!ol.Feature} feature Feature.
 * @return {!Object.<string, *>} Object.
 * @export
 */
ngeo.FeatureHelper.prototype.getNonSpatialProperties = function(feature) {
  const geometryName = feature.getGeometryName();
  const nonSpatialProperties = {};
  const properties = feature.getProperties();
  for (const key in properties) {
    if (key !== geometryName) {
      nonSpatialProperties[key] = properties[key];
    }
  }
  return nonSpatialProperties;
};


/**
 * Clear all properties of a feature, with the exception of the geometry.
 * @param {!ol.Feature} feature Feature.
 * @export
 */
ngeo.FeatureHelper.prototype.clearNonSpatialProperties = function(feature) {
  const geometryName = feature.getGeometryName();
  const properties = feature.getProperties();
  for (const key in properties) {
    if (key !== geometryName) {
      feature.set(key, undefined);
    }
  }
};


ngeo.module.service('ngeoFeatureHelper', ngeo.FeatureHelper);


// === FORMAT TYPES ===


/**
 * @enum {string}
 * @export
 */
ngeo.FeatureHelper.FormatType = {
  /**
   * @type {string}
   * @export
   */
  GPX: 'GPX',
  /**
   * @type {string}
   * @export
   */
  KML: 'KML'
};
