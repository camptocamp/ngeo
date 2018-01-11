/*
 * FIXME: a file needing splitting into:
 * - a "virtual" angular module root used to automatically register finely included ngeo dependencies;
 * - a JS namespace for constants and types;
 * - a list of requires (for olx, ol3) to please GCC (using hide_warnings_for GCC parameter might help here);
 * - a GCC entry point with requires on all parts of ngeo to produce the dist/ngeo.js file (badly broken).
 *
 * Also consider renaming the file, see https://github.com/google/closure-compiler/issues/2665.
 */

/**
 * @module ngeo
 */
goog.provide('ngeo');

// Required by olx
/** @suppress {extraRequire} */
goog.require('ol.format.IGC');
/** @suppress {extraRequire} */
goog.require('ol.source.Raster');
/** @suppress {extraRequire} */
goog.require('ol.VectorTile');
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
/** @suppress {extraRequire} */
goog.require('ol.source.Vector');


/** @type {!angular.Module} */
ngeo.module = angular.module('ngeo', [
  'gettext', 'ui.date', 'floatThead'
  // src/modules/* were added for producing the dist/ngeo.js file, which is badly broken.
  // removing them as they conflict with the "virtual" angular module root "vocation" of this file.
]);


/**
 * The default template base URL for directive partials, used as-is by the template cache.
 * @type {string}
 */
ngeo.baseTemplateUrl = 'ngeo';

/**
 * The default template base URL for modules, used as-is by the template cache.
 * @type {string}
 */
ngeo.baseModuleTemplateUrl = 'ngeomodule';


/**
 * @enum {string}
 * @export
 */
ngeo.AttributeType = {
  /**
   * @type {string}
   */
  BOOLEAN: 'boolean',
  /**
   * @type {string}
   */
  DATE: 'date',
  /**
   * @type {string}
   */
  DATETIME: 'datetime',
  /**
   * @type {string}
   */
  TIME: 'time',
  /**
   * @type {string}
   */
  GEOMETRY: 'geometry',
  /**
   * @type {string}
   */
  NUMBER: 'number',
  /**
   * @type {string}
   */
  SELECT: 'select',
  /**
   * @type {string}
   */
  TEXT: 'text'
};


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
  SHOW_LABEL: 'b',
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
ngeo.FilterCondition = {
  /**
   * @type {string}
   * @export
   */
  AND: '&&',
  /**
   * @type {string}
   * @export
   */
  NOT: '!',
  /**
   * @type {string}
   * @export
   */
  OR: '||'
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


/**
 * @enum {string}
 * @export
 */
ngeo.NumberType = {
  /**
   * @type {string}
   * @export
   */
  FLOAT: 'float',
  /**
   * @type {string}
   * @export
   */
  INTEGER: 'integer'
};
