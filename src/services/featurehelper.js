goog.provide('ngeo.FeatureHelper')

goog.require('ngeo');
goog.require('ngeo.interaction.Measure');
goog.require('ol.style.Circle');
goog.require('ol.style.Fill');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');
goog.require('ol.style.Text');


/**
 * Provides methods for features, such as:
 *  - style setting / getting
 *  - measurement
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
  this.decimals = null;

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
 * @export
 */
ngeo.FeatureHelper.prototype.setStyle = function(feature) {
  var style = this.getStyle(feature);
  feature.setStyle(style);
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
  var color = this.getColorProperty(feature);

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
  var color = this.getColorProperty(feature);

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
  var color = this.getColorProperty(feature);

  // fill color with opacity
  var rgbColor = ol.color.fromString(color);
  var rgbaColor = rgbColor.slice();
  rgbaColor[3] = opacity;
  var fillColor = ol.color.toString(rgbaColor);

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
  var color = this.getColorProperty(feature);

  return new ol.style.Style({
    text: this.createTextStyle_(label, size, angle, color)
  });
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
  var opacity = +(/** @type {string} */ (
      feature.get(ngeo.FeatureProperties.OPACITY)));
  goog.asserts.assertNumber(opacity);
  return opacity;
};


/**
 * @param {ol.Feature} feature Feature.
 * @return {boolean} Show measure.
 * @export
 */
ngeo.FeatureHelper.prototype.getShowMeasureProperty = function(feature) {
  var showMeasure = (/** @type {boolean} */ (
        feature.get(ngeo.FeatureProperties.SHOW_MEASURE)));
  if (showMeasure === undefined) {
    showMeasure = false;
  }
  goog.asserts.assertBoolean(showMeasure);
  return showMeasure;
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


// === OTHER UTILITY METHODS ===


/**
 * @param {string} text The text to display.
 * @param {number} size The size in `pt` of the text font.
 * @param {number=} opt_angle The angle in degrees of the text.
 * @param {string=} opt_color The color of the text
 * @return {ol.style.Text} Style.
 * @private
 */
ngeo.FeatureHelper.prototype.createTextStyle_ = function(text, size,
                                                        opt_angle, opt_color) {

  var angle = opt_angle !== undefined ? opt_angle : 0;
  var rotation = angle * Math.PI / 180;
  var font = ['normal', size + 'pt', 'Arial'].join(' ');
  var color = opt_color !== undefined ? opt_color : '#000000';

  return new ol.style.Text({
    font: font,
    text: text,
    fill: new ol.style.Fill({color: color}),
    stroke: new ol.style.Stroke({color: '#ffffff', width: 3}),
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
