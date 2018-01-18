/*
 * FIXME: a file needing splitting into:
 * - a "virtual" angular module root used to automatically register finely included ngeo dependencies;
 * - a JS namespace for constants and types;
 * - a list of requires (for olx, ol3) to please GCC (using hide_warnings_for GCC parameter might help here);
 * - a GCC entry point with requires on all parts of ngeo to produce the dist/ngeo.js file (badly broken).
 *
 * Also consider renaming the file, see https://github.com/google/closure-compiler/issues/2665.
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
/** @suppress {extraRequire} */
goog.require('ol.render.Feature');
/** @suppress {extraRequire} */
goog.require('ol.source.VectorTile');
/** @suppress {extraRequire} */
goog.require('ol.style.AtlasManager');
// webpack: import 'angular-gettext';
// webpack: import 'angular-ui-date';
// webpack: import 'floatthead';
// webpack: import 'angular-float-thead';


/** @type {!angular.Module} */
ngeo.module = angular.module('ngeo', [
  'gettext', 'ui.date', 'floatThead'
  // src/modules/* were added for producing the dist/ngeo.js file, which is badly broken.
  // removing them as they conflict with the "virtual" angular module root "vocation" of this file.
]);


/**
 * The default template base URL for modules, used as-is by the template cache.
 * @type {string}
 */
ngeo.baseModuleTemplateUrl = 'ngeo';


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
