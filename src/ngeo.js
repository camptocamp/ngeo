/**
 * @module ngeo
 */
goog.provide('ngeo');

// Required by olx
/** @suppress {extraRequire} */
goog.require('ol.format.IGC');
/** @suppress {extraRequire} */
goog.require('ol.Overlay');
/** @suppress {extraRequire} */
goog.require('ol.control.ScaleLine');
/** @suppress {extraRequire} */
goog.require('ol.source.WMTS');
/** @suppress {extraRequire} */
goog.require('ol.style.Icon');
/** @suppress {extraRequire} */
goog.require('ol.layer.VectorTile');
// Required by ol3
/** @suppress {extraRequire} */
goog.require('ol.Map');

goog.require('ngeo.search.searchModule');

/** @type {!angular.Module} */
ngeo.module = angular.module('ngeo', [
  ngeo.search.searchModule.module.name,
  'gettext', 'ui.date', 'floatThead'
]);


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
  MULTI_LINE_STRING: 'MultiLineString',
  /**
   * @type {string}
   * @export
   */
  MULTI_POINT: 'MultiPoint',
  /**
   * @type {string}
   * @export
   */
  MULTI_POLYGON: 'MultiPolygon',
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
