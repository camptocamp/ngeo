/**
 * @module ngeo
 */
goog.provide('ngeo');


/** @type {!angular.Module} */
ngeo.module = angular.module('ngeo', ['gettext']);


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
  CIRCLE: 'Circle',
  LINE_STRING: 'LineString',
  POINT: 'Point',
  POLYGON: 'Polygon',
  RECTANGLE: 'Rectangle',
  TEXT: 'Text'
};
