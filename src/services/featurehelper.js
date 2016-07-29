goog.provide('ngeo.FeatureHelper');

goog.require('ngeo');
/** @suppress {extraRequire} */
goog.require('ngeo.filters');
goog.require('ngeo.interaction.Measure');
goog.require('ngeo.interaction.MeasureAzimut');
goog.require('ol.Feature');
goog.require('ol.geom.LineString');
goog.require('ol.geom.MultiPoint');
goog.require('ol.geom.Point');
goog.require('ol.geom.Polygon');
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
 * @param {angular.$injector} $injector Main injector.
 * @param {angular.$filter} $filter Angular filter
 * @ngdoc service
 * @ngname ngeoFeatureHelper
 * @ngInject
 */
ngeo.FeatureHelper = function($injector, $filter) {

  /**
   * @type {angular.$filter}
   * @private
   */
  this.$filter_ = $filter;

  /**
   * @type {?number}
   * @private
   */
  this.decimals_ = null;

  if ($injector.has('ngeoMeasureDecimals')) {
    this.decimals_ = $injector.get('ngeoMeasureDecimals');
  }

  /**
   * @type {ngeox.unitPrefix}
   */
  this.format_ = $injector.get('$filter')('ngeoUnitPrefix');

  /**
   * Filter function to display point coordinates or null to don't use any
   * filter.
   * @type {function(*):string|null}
   * @private
   */
  this.pointFilterFn_ = null;

  /**
   * Arguments to apply to the the point filter function.
   * @type {Array.<*>}
   * @private
   */
  this.pointFilterArgs_ = [];

  if ($injector.has('ngeoPointfilter')) {
    var filterElements = $injector.get('ngeoPointfilter').split(':');
    var filterName = filterElements.shift();
    var filter = this.$filter_(filterName);
    goog.asserts.assertFunction(filter);
    this.pointFilterFn_ = filter;
    this.pointFilterArgs_ = filterElements;
  } else {
    this.pointFilterFn_ = null;
  }

  /**
   * @type {ol.proj.Projection}
   * @private
   */
  this.projection_;

};


/**
 * @param {ol.proj.Projection} projection Projection.
 * @export
 */
ngeo.FeatureHelper.prototype.setProjection = function(projection) {
  this.projection_ = projection;
};


// === STYLE METHODS ===


/**
 * Set the style of a feature using its inner properties and depending on
 * its geometry type.
 * @param {ol.Feature} feature Feature.
 * @param {boolean=} opt_select Whether the feature should be rendered as
 *     selected, which includes additional vertex and halo styles.
 * @export
 */
ngeo.FeatureHelper.prototype.setStyle = function(feature, opt_select) {
  var styles = this.getStyle(feature);
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
 * @param {ol.Feature} feature Feature.
 * @return {Array.<ol.style.Style>} The style object.
 * @export
 */
ngeo.FeatureHelper.prototype.getStyle = function(feature) {
  var type = this.getType(feature);
  var style;

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

  var styles;
  if (style.constructor === Array) {
    styles = /** @type {Array.<ol.style.Style>}*/ (style);
  } else {
    styles = [style];
  }

  return styles;
};


/**
 * @param {ol.Feature} feature Feature with linestring geometry.
 * @return {ol.style.Style} Style.
 * @private
 */
ngeo.FeatureHelper.prototype.getLineStringStyle_ = function(feature) {

  var strokeWidth = this.getStrokeProperty(feature);
  var showMeasure = this.getShowMeasureProperty(feature);
  var color = this.getRGBAColorProperty(feature);

  var options = {
    stroke: new ol.style.Stroke({
      color: color,
      width: strokeWidth
    })
  };

  if (showMeasure) {
    options.text = this.createTextStyle_({
      text: this.getMeasure(feature)
    });
  }

  return new ol.style.Style(options);
};


/**
 * @param {ol.Feature} feature Feature with point geometry.
 * @return {ol.style.Style} Style.
 * @private
 */
ngeo.FeatureHelper.prototype.getPointStyle_ = function(feature) {

  var size = this.getSizeProperty(feature);
  var color = this.getRGBAColorProperty(feature);

  var options = {
    image: new ol.style.Circle({
      radius: size,
      fill: new ol.style.Fill({
        color: color
      })
    })
  };

  var showMeasure = this.getShowMeasureProperty(feature);

  if (showMeasure) {
    options.text = this.createTextStyle_({
      text: this.getMeasure(feature),
      offsetY: -(size + 10 / 2 + 4)
    });
  }

  return new ol.style.Style(options);
};


/**
 * @param {ol.Feature} feature Feature with polygon geometry.
 * @return {Array.<ol.style.Style>} Style.
 * @private
 */
ngeo.FeatureHelper.prototype.getPolygonStyle_ = function(feature) {

  var strokeWidth = this.getStrokeProperty(feature);
  var opacity = this.getOpacityProperty(feature);
  var color = this.getRGBAColorProperty(feature);
  var showMeasure = this.getShowMeasureProperty(feature);


  // fill color with opacity
  var fillColor = color.slice();
  fillColor[3] = opacity;

  var azimut = /** @type {number} */ (
    feature.get(ngeo.FeatureProperties.AZIMUT));

  var styles = [new ol.style.Style({
    fill: new ol.style.Fill({
      color: fillColor
    }),
    stroke: new ol.style.Stroke({
      color: color,
      width: strokeWidth
    })
  })];

  if (showMeasure) {
    if (azimut !== undefined) {
      // Radius style:
      var line = this.getRadiusLine(feature, azimut);
      var length = ngeo.interaction.Measure.getFormattedLength(
        line, this.projection_, this.decimals_, this.format_);

      styles.push(new ol.style.Style({
        geometry: line,
        fill: new ol.style.Fill({
          color: fillColor
        }),
        stroke: new ol.style.Stroke({
          color: color,
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
          text: azimut + '°',
          size: 10,
          offsetX: Math.cos((azimut - 90) * Math.PI / 180) * 20,
          offsetY: Math.sin((azimut - 90) * Math.PI / 180) * 20
        })
      }));
    } else {
      styles.push(new ol.style.Style({
        text: this.createTextStyle_({
          text: this.getMeasure(feature)
        })
      }));
    }
  }

  return styles;
};


/**
 * @param {ol.Feature} feature Feature with point geometry, rendered as text.
 * @return {ol.style.Style} Style.
 * @private
 */
ngeo.FeatureHelper.prototype.getTextStyle_ = function(feature) {

  return new ol.style.Style({
    text: this.createTextStyle_({
      text: this.getNameProperty(feature),
      size: this.getSizeProperty(feature),
      angle: this.getAngleProperty(feature),
      color: this.getRGBAColorProperty(feature)
    })
  });
};


ngeo.FeatureHelper.prototype.createEditingStyles = function(feature) {
  // (1) Style definition depends on geometry type
  var white = [255, 255, 255, 1];
  var blue = [0, 153, 255, 1];
  var width = 3;
  var styles = [];

  var geom = feature.getGeometry();
  console.assert(geom);
  var type = geom.getType();

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
            width: width
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
 * @return {ol.style.Style} Style.
 * @export
 */
ngeo.FeatureHelper.prototype.getVertexStyle = function(opt_incGeomFunc) {
  var incGeomFunc = opt_incGeomFunc !== undefined ? opt_incGeomFunc : true;

  var options = {
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
      var geom = feature.getGeometry();

      if (geom.getType() == ol.geom.GeometryType.POINT) {
        return;
      }

      var coordinates;
      if (geom instanceof ol.geom.LineString) {
        coordinates = feature.getGeometry().getCoordinates();
        return new ol.geom.MultiPoint(coordinates);
      } else if (geom instanceof ol.geom.Polygon) {
        coordinates = feature.getGeometry().getCoordinates()[0];
        return new ol.geom.MultiPoint(coordinates);
      } else {
        return feature.getGeometry();
      }
    };
  }

  return new ol.style.Style(options);
};


/**
 * @param {ol.Feature} feature Feature.
 * @return {boolean} Whether the feature supports vertex or not.
 * @private
 */
ngeo.FeatureHelper.prototype.supportsVertex_ = function(feature) {
  var supported = [
    ngeo.GeometryType.LINE_STRING,
    ngeo.GeometryType.POLYGON,
    ngeo.GeometryType.RECTANGLE
  ];
  var type = this.getType(feature);
  return ol.array.includes(supported, type);
};


/**
 * @param {ol.Feature} feature Feature.
 * @return {ol.style.Style} Style.
 * @private
 */
ngeo.FeatureHelper.prototype.getHaloStyle_ = function(feature) {
  var type = this.getType(feature);
  var style;
  var haloSize = 3;

  switch (type) {
    case ngeo.GeometryType.POINT:
      var size = this.getSizeProperty(feature);
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
      var strokeWidth = this.getStrokeProperty(feature);
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
 * @param {ol.Feature} feature Feature.
 * @return {!Object.<string, *>} Filtered properties of the current feature.
 * @export
 */
ngeo.FeatureHelper.prototype.getFilteredFeatureValues = function(feature) {
  var properties = feature.getProperties();
  delete properties['boundedBy'];
  delete properties[feature.getGeometryName()];
  return properties;
};

/**
 * @param {ol.Feature} feature Feature.
 * @return {number} Angle.
 * @export
 */
ngeo.FeatureHelper.prototype.getAngleProperty = function(feature) {
  var angle = +(/** @type {string} */ (
    feature.get(ngeo.FeatureProperties.ANGLE)));
  goog.asserts.assertNumber(angle);
  return angle;
};


/**
 * @param {ol.Feature} feature Feature.
 * @return {string} Color.
 * @export
 */
ngeo.FeatureHelper.prototype.getColorProperty = function(feature) {

  var color = /** @type {string} */ (feature.get(ngeo.FeatureProperties.COLOR));

  goog.asserts.assertString(color);

  return color;
};


/**
 * @param {ol.Feature} feature Feature.
 * @return {ol.Color} Color.
 * @export
 */
ngeo.FeatureHelper.prototype.getRGBAColorProperty = function(feature) {
  return ol.color.fromString(this.getColorProperty(feature));
};


/**
 * @param {ol.Feature} feature Feature.
 * @return {string} Name.
 * @export
 */
ngeo.FeatureHelper.prototype.getNameProperty = function(feature) {
  var name = /** @type {string} */ (feature.get(ngeo.FeatureProperties.NAME));
  goog.asserts.assertString(name);
  return name;
};


/**
 * @param {ol.Feature} feature Feature.
 * @return {number} Opacity.
 * @export
 */
ngeo.FeatureHelper.prototype.getOpacityProperty = function(feature) {
  var opacityStr = (/** @type {string} */ (
      feature.get(ngeo.FeatureProperties.OPACITY)));
  var opacity = opacityStr !== undefined ? +opacityStr : 1;
  goog.asserts.assertNumber(opacity);
  return opacity;
};


/**
 * @param {ol.Feature} feature Feature.
 * @return {boolean} Show measure.
 * @export
 */
ngeo.FeatureHelper.prototype.getShowMeasureProperty = function(feature) {
  var showMeasure = feature.get(ngeo.FeatureProperties.SHOW_MEASURE);
  if (showMeasure === undefined) {
    showMeasure = false;
  } else if (typeof showMeasure === 'string') {
    showMeasure = (showMeasure === 'true') ? true : false;
  }
  goog.asserts.assertBoolean(showMeasure);
  return /** @type {boolean} */ (showMeasure);
};


/**
 * @param {ol.Feature} feature Feature.
 * @return {number} Size.
 * @export
 */
ngeo.FeatureHelper.prototype.getSizeProperty = function(feature) {
  var size = +(/** @type {string} */ (feature.get(ngeo.FeatureProperties.SIZE)));
  goog.asserts.assertNumber(size);
  return size;
};


/**
 * @param {ol.Feature} feature Feature.
 * @return {number} Stroke.
 * @export
 */
ngeo.FeatureHelper.prototype.getStrokeProperty = function(feature) {
  var stroke = +(/** @type {string} */ (
      feature.get(ngeo.FeatureProperties.STROKE)));
  goog.asserts.assertNumber(stroke);
  return stroke;
};


// === EXPORT ===


/**
 * Export features in the given format. The projection of the exported features
 * is: `EPSG:4326`.
 * @param {Array.<ol.Feature>} features Array of vector features.
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
 * @param {Array.<ol.Feature>} features Array of vector features.
 * @export
 */
ngeo.FeatureHelper.prototype.exportGPX = function(features) {
  var format = new ol.format.GPX();
  var mimeType = 'application/gpx+xml';
  var fileName = 'export.gpx';
  this.export_(features, format, fileName, mimeType);
};


/**
 * Export features in KML and download the result to the browser. The
 * projection of the exported features is: `EPSG:4326`.
 * @param {Array.<ol.Feature>} features Array of vector features.
 * @export
 */
ngeo.FeatureHelper.prototype.exportKML = function(features) {
  var format = new ol.format.KML();
  var mimeType = 'application/vnd.google-earth.kml+xml';
  var fileName = 'export.kml';
  this.export_(features, format, fileName, mimeType);
};


/**
 * Export features using a given format to a specific filename and download
 * the result to the browser. The projection of the exported features is:
 * `EPSG:4326`.
 * @param {Array.<ol.Feature>} features Array of vector features.
 * @param {ol.format.Feature} format Format
 * @param {string} fileName Name of the file.
 * @param {string=} opt_mimeType Mime type. Defaults to 'text/plain'.
 * @private
 */
ngeo.FeatureHelper.prototype.export_ = function(features, format, fileName,
    opt_mimeType) {
  var mimeType = opt_mimeType !== undefined ? opt_mimeType : 'text/plain';

  // clone the features to apply the original style to the clone
  // (the original may have select style active)
  var clones = [];
  var clone;
  features.forEach(function(feature) {
    clone = new ol.Feature(feature.getProperties());
    this.setStyle(clone, false);
    clones.push(clone);
  }, this);

  var writeOptions = this.projection_ ? {
    dataProjection: 'EPSG:4326',
    featureProjection: this.projection_
  } : {};

  var data = format.writeFeatures(clones, writeOptions);

  $('<a />', {
    'download': fileName,
    'href': [
      'data:',
      mimeType,
      ';charset=utf-8,',
      encodeURIComponent(data)
    ].join(''),
    'mimeType': mimeType
  })[0].click();
};


// === OTHER UTILITY METHODS ===


/**
 * @param {ngeox.style.TextOptions} options Options.
 * @return {ol.style.Text} Style.
 * @private
 */
ngeo.FeatureHelper.prototype.createTextStyle_ = function(options) {
  if (options.angle) {
    var angle = options.angle !== undefined ? options.angle : 0;
    var rotation = angle * Math.PI / 180;
    options.rotation = rotation;
    delete options.angle;
  }

  options.font = ['normal', (options.size || 10) + 'pt', 'Arial'].join(' ');

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
 * @param {ol.Feature} feature Feature.
 * @return {string} Measure.
 * @export
 */
ngeo.FeatureHelper.prototype.getMeasure = function(feature) {

  var geometry = feature.getGeometry();
  goog.asserts.assert(geometry, 'Geometry should be truthy');

  var measure = '';

  if (geometry instanceof ol.geom.Polygon) {
    if (this.getType(feature) === ngeo.GeometryType.CIRCLE) {
      var azimut = /** @type {number} */ (
        feature.get(ngeo.FeatureProperties.AZIMUT));
      var line = this.getRadiusLine(feature, azimut);

      measure = ngeo.interaction.MeasureAzimut.getFormattedAzimutRadius(
        line, this.projection_, this.decimals_, this.format_);
    } else {
      measure = ngeo.interaction.Measure.getFormattedArea(
        geometry, this.projection_, this.decimals_, this.format_);
    }
  } else if (geometry instanceof ol.geom.LineString) {
    measure = ngeo.interaction.Measure.getFormattedLength(
      geometry, this.projection_, this.decimals_, this.format_);
  } else if (geometry instanceof ol.geom.Point) {
    if (this.pointFilterFn_ === null) {
      measure = ngeo.interaction.Measure.getFormattedPoint(
      geometry, this.projection_, this.decimals_);
    } else {
      var coordinates = geometry.getCoordinates();
      var args = this.pointFilterArgs_.slice(0);
      args.unshift(coordinates);
      measure = this.pointFilterFn_.apply(this, args);
    }
  }

  return measure;
};


/**
 * Return the type of geometry of a feature using its geometry property and
 * some inner properties.
 * @param {ol.Feature} feature Feature.
 * @return {string} The type of geometry.
 * @export
 */
ngeo.FeatureHelper.prototype.getType = function(feature) {
  var geometry = feature.getGeometry();
  goog.asserts.assert(geometry, 'Geometry should be thruthy');

  var type;

  if (geometry instanceof ol.geom.Point) {
    if (feature.get(ngeo.FeatureProperties.IS_TEXT)) {
      type = ngeo.GeometryType.TEXT;
    } else {
      type = ngeo.GeometryType.POINT;
    }
  } else if (geometry instanceof ol.geom.Polygon) {
    if (feature.get(ngeo.FeatureProperties.IS_CIRCLE)) {
      type = ngeo.GeometryType.CIRCLE;
    } else if (feature.get(ngeo.FeatureProperties.IS_RECTANGLE)) {
      type = ngeo.GeometryType.RECTANGLE;
    } else {
      type = ngeo.GeometryType.POLYGON;
    }
  } else if (geometry instanceof ol.geom.LineString) {
    type = ngeo.GeometryType.LINE_STRING;
  }

  goog.asserts.assert(type, 'Type should be thruthy');

  return type;
};


/**
 * This method first checks if a feature's extent intersects with the map view
 * extent. If it doesn't, then the view gets recentered with an animation to
 * the center of the feature.
 * @param {ol.Feature} feature Feature.
 * @param {ol.Map} map Map.
 * @param {number=} opt_panDuration Pan animation duration. Defaults to `250`.
 * @export
 */
ngeo.FeatureHelper.prototype.panMapToFeature = function(feature, map,
    opt_panDuration) {

  var panDuration = opt_panDuration !== undefined ? opt_panDuration : 250;
  var size = map.getSize();
  goog.asserts.assertArray(size);
  var view = map.getView();
  var extent = view.calculateExtent(size);
  var geometry = feature.getGeometry();

  if (!geometry.intersectsExtent(extent)) {
    var mapCenter = view.getCenter();
    goog.asserts.assertArray(mapCenter);

    map.beforeRender(ol.animation.pan({
      source: mapCenter,
      duration: panDuration
    }));

    var featureCenter;
    if (geometry instanceof ol.geom.LineString) {
      featureCenter = geometry.getCoordinateAt(0.5);
    } else if (geometry instanceof ol.geom.Polygon) {
      featureCenter = geometry.getInteriorPoint().getCoordinates();
    } else if (geometry instanceof ol.geom.Point) {
      featureCenter = geometry.getCoordinates();
    } else {
      featureCenter = ol.extent.getCenter(geometry.getExtent());
    }
    map.getView().setCenter(featureCenter);
  }
};


/**
 * This method generates a line string geometry that represents the radius for
 * a given azimut. It expects the input geometry to be a circle.
 * @param {ol.Feature} feature Feature.
 * @param {number} azimut Azimut in degrees.
 * @return {ol.geom.LineString} The line geometry.
 */
ngeo.FeatureHelper.prototype.getRadiusLine = function(feature, azimut) {
  var geometry = feature.getGeometry();
  // Determine the radius for the circle
  var extent = geometry.getExtent();
  var radius = (extent[3] - extent[1]) / 2;

  var center = ol.extent.getCenter(geometry.getExtent());

  var x = Math.cos((azimut - 90) * Math.PI / 180) * radius;
  var y = -Math.sin((azimut - 90) * Math.PI / 180) * radius;
  var endPoint = [x + center[0], y + center[1]];
  return new ol.geom.LineString([center, endPoint]);
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
