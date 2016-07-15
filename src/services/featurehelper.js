goog.provide('ngeo.FeatureHelper');

goog.require('ngeo');
/** @suppress {extraRequire} */
goog.require('ngeo.filters');
goog.require('ngeo.interaction.Measure');
goog.require('ngeo.interaction.MeasureAzimut');
goog.require('ol.Feature');
goog.require('ol.geom.LineString');
goog.require('ol.geom.MultiPoint');
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
 * @param {ol.Map=} opt_map This is needed for the circle azimuth to be rendered
 *     in the corner. If ommitted, the azimuth will be displayed in the center.
 * @export
 */
ngeo.FeatureHelper.prototype.setStyle = function(feature, opt_select, opt_map) {
  var styles = this.getStyle(feature, opt_map);
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
 * @param {ol.Map=} opt_map This is needed for the circle azimuth to be rendered
 *     in the corner. If ommitted, the azimuth will be displayed in the center.
 * @return {Array.<ol.style.Style>} The style object.
 * @export
 */
ngeo.FeatureHelper.prototype.getStyle = function(feature, opt_map) {
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
      style = this.getPolygonStyle_(feature, opt_map);
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
    var measure = this.getMeasure(feature);
    options.text = this.createTextStyle_(measure, 10);
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
    var fontSize = 10;
    var measure = this.getMeasure(feature);
    options.text = this.createTextStyle_(
        measure,
        fontSize,
        undefined,
        undefined,
        undefined,
        undefined,
        -(size + fontSize / 2 + 4)
    );
  }

  return new ol.style.Style(options);
};


/**
 * @param {ol.Feature} feature Feature with polygon geometry.
 * @param {ol.Map=} opt_map This is needed for the circle azimuth to be rendered
 *     in the corner. If ommitted, the azimuth will be displayed in the center.
 * @return {Array.<ol.style.Style>} Style.
 * @private
 */
ngeo.FeatureHelper.prototype.getPolygonStyle_ = function(feature, opt_map) {

  var strokeWidth = this.getStrokeProperty(feature);
  var opacity = this.getOpacityProperty(feature);
  var color = this.getRGBAColorProperty(feature);
  var showMeasure = this.getShowMeasureProperty(feature);


  // fill color with opacity
  var fillColor = color.slice();
  fillColor[3] = opacity;

  var line = /** @type {ol.geom.LineString} */ (
    feature.get(ngeo.FeatureProperties.RADIUS_GEOM));
  var polygon = /** @type {ol.geom.Polygon} */ (feature.getGeometry());


  var polygonOptions = {
    geometry: polygon,
    fill: new ol.style.Fill({
      color: fillColor
    }),
    stroke: new ol.style.Stroke({
      color: color,
      width: strokeWidth
    })
  };
  var radiusOptions;
  if (showMeasure) {
    radiusOptions = {
      geometry: line,
      fill: new ol.style.Fill({
        color: fillColor
      }),
      stroke: new ol.style.Stroke({
        color: color,
        width: strokeWidth
      })
    };
  } else {
    radiusOptions = {
      geometry: line,
      fill: new ol.style.Fill({
        color: [0,0,0,0]
      }),
      stroke: new ol.style.Stroke({
        color: [0,0,0,0],
        width: 0
      })
    };

  }

  var extent = feature.getGeometry().getExtent();

  if (showMeasure) {
    // Polygon azimuth style:
    var lineGeometry = /** @type {ol.geom.LineString} */ (
      feature.get(ngeo.FeatureProperties.RADIUS_GEOM));

    // Which corner to display the azimuth at
    if (lineGeometry instanceof ol.geom.LineString) {
      var formattedAzimuth = ngeo.interaction.MeasureAzimut.getFormattedAzimuth(
          lineGeometry, this.projection_, this.decimals_, this.format_);
      var azimuth = parseInt(formattedAzimuth, 10);

      var offsetCoordinates = null;

      if (azimuth > 0 && azimuth <= 90) {
        offsetCoordinates = ol.extent.getTopRight(extent);
      } else if (azimuth > 90 && azimuth <= 180) {
        offsetCoordinates = ol.extent.getBottomRight(extent);
      } else if (azimuth > -180 && azimuth < -90) {
        offsetCoordinates = ol.extent.getBottomLeft(extent);
      } else {
        offsetCoordinates = ol.extent.getTopLeft(extent);
      }

      // Finding out the offset in pixels
      var offsetX, offsetY;
      if (opt_map) {
        var centerPixel = opt_map.getPixelFromCoordinate(ol.extent.getCenter(extent));
        var cornerPixel = opt_map.getPixelFromCoordinate(offsetCoordinates);

        offsetX = cornerPixel[0] - centerPixel[0];
        offsetY = cornerPixel[1] - centerPixel[1];
      }
      polygonOptions.text = this.createTextStyle_(
        formattedAzimuth,
        10,
        undefined,
        undefined,
        undefined,
        offsetX,
        offsetY);

      // Radius azimuth style:
      var length = ngeo.interaction.Measure.getFormattedLength(
        lineGeometry, this.projection_, this.decimals_, this.format_);

      radiusOptions.text = this.createTextStyle_(
        length,
        10);
    }
  }

  var polygonStyle = new ol.style.Style(polygonOptions);

  var lineStyle = new ol.style.Style(radiusOptions);

  return [lineStyle, polygonStyle];
};


/**
 * @param {ol.Feature} feature Feature with point geometry, rendered as text.
 * @return {ol.style.Style} Style.
 * @private
 */
ngeo.FeatureHelper.prototype.getTextStyle_ = function(feature) {

  var label = this.getNameProperty(feature);
  var size = this.getSizeProperty(feature);
  var angle = this.getAngleProperty(feature);
  var color = this.getRGBAColorProperty(feature);

  return new ol.style.Style({
    text: this.createTextStyle_(label, size, angle, color)
  });
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
  var size;

  switch (type) {
    case ngeo.GeometryType.POINT:
      size = this.getSizeProperty(feature);
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
      var label = this.getNameProperty(feature);
      size = this.getSizeProperty(feature);
      var angle = this.getAngleProperty(feature);
      var color = [255, 255, 255, 1];
      style = new ol.style.Style({
        text: this.createTextStyle_(label, size, angle, color, haloSize * 2)
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
 * @param {string} text The text to display.
 * @param {number} size The size in `pt` of the text font.
 * @param {number=} opt_angle The angle in degrees of the text.
 * @param {ol.Color=} opt_color The color of the text.
 * @param {number=} opt_width The width of the outline color.
 * @param {number=} opt_offsetX The offset in pixels.
 * @param {number=} opt_offsetY The offset in pixels.
 * @return {ol.style.Text} Style.
 * @private
 */
ngeo.FeatureHelper.prototype.createTextStyle_ = function(text, size,
    opt_angle, opt_color, opt_width, opt_offsetX, opt_offsetY) {

  var angle = opt_angle !== undefined ? opt_angle : 0;
  var rotation = angle * Math.PI / 180;
  var font = ['normal', size + 'pt', 'Arial'].join(' ');
  var color = opt_color !== undefined ? opt_color : [0, 0, 0, 1];
  var width = opt_width !== undefined ? opt_width : 3;
  var offsetX = opt_offsetX !== undefined ? opt_offsetX : 0;
  var offsetY = opt_offsetY !== undefined ? opt_offsetY : 0;

  return new ol.style.Text({
    font: font,
    text: text,
    fill: new ol.style.Fill({color: color}),
    stroke: new ol.style.Stroke({color: [255, 255, 255, 1], width: width}),
    rotation: rotation,
    offsetX: offsetX,
    offsetY: offsetY
  });
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

  if (geometry instanceof ol.geom.LineString) {
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
  } else if (geometry instanceof ol.geom.Polygon) {
    if (this.getType(feature) === ngeo.GeometryType.CIRCLE) {
      var radius = /** @type {ol.geom.LineString} */ (
        feature.get(ngeo.FeatureProperties.RADIUS_GEOM));

      // TODO: Load the radius from permalink
      if (!(radius instanceof ol.geom.Geometry)) {
        var extent = geometry.getExtent();
        var center = ol.extent.getCenter(geometry.getExtent());

        //make two points at center and at the edge
        var startPoint = [center[0], extent[1]];
        var endPoint = center;

        radius = new ol.geom.LineString([startPoint, endPoint]);
        feature.set(ngeo.FeatureProperties.RADIUS_GEOM, radius);
      }

      measure = ngeo.interaction.MeasureAzimut.getFormattedAzimuthRadius(
        radius, this.projection_, this.decimals_, this.format_);
    } else {
      measure = ngeo.interaction.Measure.getFormattedArea(
        geometry, this.projection_, this.decimals_, this.format_);
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
