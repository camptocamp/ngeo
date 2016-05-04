goog.provide('ngeo.FeatureHelper');

goog.require('ngeo');
goog.require('ngeo.interaction.Measure');
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
 * @ngdoc service
 * @ngname ngeoFeatureHelper
 * @ngInject
 */
ngeo.FeatureHelper = function($injector) {

  /**
   * @type {?number}
   * @private
   */
  this.decimals_ = null;

  if ($injector.has('ngeoMeasureDecimals')) {
    this.decimals_ = $injector.get('ngeoMeasureDecimals');
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
  var styles = [this.getStyle(feature)];
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
 * @return {ol.style.Style} The style object.
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

  return style;
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
    var measure = this.getMeasure(feature);
    options.text = this.createTextStyle_(measure, 10);
  }

  return new ol.style.Style(options);
};


/**
 * @param {ol.Feature} feature Feature with polygon geometry.
 * @return {ol.style.Style} Style.
 * @private
 */
ngeo.FeatureHelper.prototype.getPolygonStyle_ = function(feature) {

  var strokeWidth = this.getStrokeProperty(feature);
  var opacity = this.getOpacityProperty(feature);
  var color = this.getRGBAColorProperty(feature);

  // fill color with opacity
  var fillColor = color.slice();
  fillColor[3] = opacity;

  var options = {
    fill: new ol.style.Fill({
      color: fillColor
    }),
    stroke: new ol.style.Stroke({
      color: color,
      width: strokeWidth
    })
  };

  var showMeasure = this.getShowMeasureProperty(feature);

  if (showMeasure) {
    var measure = this.getMeasure(feature);
    options.text = this.createTextStyle_(measure, 10);
  }

  return new ol.style.Style(options);
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
 * @return {ol.style.Text} Style.
 * @private
 */
ngeo.FeatureHelper.prototype.createTextStyle_ = function(text, size,
    opt_angle, opt_color, opt_width) {

  var angle = opt_angle !== undefined ? opt_angle : 0;
  var rotation = angle * Math.PI / 180;
  var font = ['normal', size + 'pt', 'Arial'].join(' ');
  var color = opt_color !== undefined ? opt_color : [0, 0, 0, 1];
  var width = opt_width !== undefined ? opt_width : 3;

  return new ol.style.Text({
    font: font,
    text: text,
    fill: new ol.style.Fill({color: color}),
    stroke: new ol.style.Stroke({color: [255, 255, 255, 1], width: width}),
    rotation: rotation
  });
};


/**
 * @param {ol.Feature} feature Feature.
 * @return {string} Measure.
 * @export
 */
ngeo.FeatureHelper.prototype.getMeasure = function(feature) {

  var geometry = feature.getGeometry();
  goog.asserts.assert(geometry, 'Geometry should be truthy');

  var measure = '';

  if (geometry instanceof ol.geom.Polygon) {
    measure = ngeo.interaction.Measure.getFormattedArea(
      geometry, this.projection_, this.decimals_);
  } else if (geometry instanceof ol.geom.LineString) {
    measure = ngeo.interaction.Measure.getFormattedLength(
      geometry, this.projection_, this.decimals_);
  } else if (geometry instanceof ol.geom.Point) {
    measure = ngeo.interaction.Measure.getFormattedPoint(
      geometry, this.projection_, this.decimals_);
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
