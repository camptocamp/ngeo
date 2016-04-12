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
 * @export
 */
ngeo.FeatureProperties = {
  /**
   * @type {string}
   * @export
   */
  ANGLE: 'angle',
  /**
   * @type {string}
   * @export
   */
  COLOR: 'color',
  /**
   * @type {string}
   * @export
   */
  IS_CIRCLE: 'isCircle',
  /**
   * @type {string}
   * @export
   */
  IS_RECTANGLE: 'isRectangle',
  /**
   * @type {string}
   * @export
   */
  IS_TEXT: 'isText',
  /**
   * @type {string}
   * @export
   */
  NAME: 'name',
  /**
   * @type {string}
   * @export
   */
  OPACITY: 'opacity',
  /**
   * @type {string}
   * @export
   */
  SHOW_MEASURE: 'showMeasure',
  /**
   * @type {string}
   * @export
   */
  SIZE: 'size',
  /**
   * @type {string}
   * @export
   */
  STROKE: 'stroke'
};


/**
 * @enum {string}
 * @export
 */
ngeo.GeometryType = {
  /**
   * @type {string}
   * @export
   */
  CIRCLE: 'Circle',
  /**
   * @type {string}
   * @export
   */
  LINE_STRING: 'LineString',
  /**
   * @type {string}
   * @export
   */
  POINT: 'Point',
  /**
   * @type {string}
   * @export
   */
  POLYGON: 'Polygon',
  /**
   * @type {string}
   * @export
   */
  RECTANGLE: 'Rectangle',
  /**
   * @type {string}
   * @export
   */
  TEXT: 'Text'
};
