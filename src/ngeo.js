/**
 * @module ngeo
 */
goog.provide('ngeo');


/** @type {!angular.Module} */
ngeo.module = angular.module('ngeo', []);


/**
 * The default template based URL, used as it by the template cache.
 * @type {string}
 */
ngeo.baseTemplateUrl = 'ngeo';


/**
 * @enum {string}
 */
ngeo.FeatureProperties = {
  ANGLE: 'angle',
  COLOR: 'color',
  IS_CIRCLE: 'isCircle',
  IS_RECTANGLE: 'isRectangle',
  IS_TEXT: 'isText',
  NAME: 'name',
  OPACITY: 'opacity',
  SHOW_MEASURE: 'showMeasure',
  SIZE: 'size',
  STROKE: 'stroke'
};


/**
 * @enum {string}
 */
ngeo.GeometryType = {
  CIRCLE: 'circle',
  LINESTRING: 'linestring',
  POINT: 'point',
  POLYGON: 'polygon',
  RECTANGLE: 'rectangle',
  TEXT: 'text'
};
