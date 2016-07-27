/**
 * @module ngeo
 */
goog.provide('ngeo');


/** @type {!angular.Module} */
ngeo.module = angular.module('ngeo', ['gettext', 'ui.date', 'floatThead']);


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
  ANGLE: 'a',
  /**
   * @type {string}
   * @export
   */
  COLOR: 'c',
  /**
   * @type {string}
   * @export
   */
  IS_CIRCLE: 'l',
  /**
   * @type {string}
   * @export
   */
  IS_RECTANGLE: 'r',
  /**
   * @type {string}
   * @export
   */
  IS_TEXT: 't',
  /**
   * @type {string}
   * @export
   */
  NAME: 'n',
  /**
   * @type {string}
   * @export
   */
  OPACITY: 'o',
  /**
   * @type {number}
   * @export
   */
  AZIMUT: 'z',
  /**
   * @type {string}
   * @export
   */
  SHOW_MEASURE: 'm',
  /**
   * @type {string}
   * @export
   */
  SIZE: 's',
  /**
   * @type {string}
   * @export
   */
  STROKE: 'k'
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
