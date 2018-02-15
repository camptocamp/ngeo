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

// Required by olx // nowebpack
/** @suppress {extraRequire} */ // nowebpack
goog.require('ol.format.IGC'); // nowebpack
/** @suppress {extraRequire} */ // nowebpack
goog.require('ol.source.Raster'); // nowebpack
/** @suppress {extraRequire} */ // nowebpack
goog.require('ol.VectorTile'); // nowebpack
/** @suppress {extraRequire} */ // nowebpack
goog.require('ol.Overlay'); // nowebpack
/** @suppress {extraRequire} */ // nowebpack
goog.require('ol.control.ScaleLine'); // nowebpack
/** @suppress {extraRequire} */ // nowebpack
goog.require('ol.source.WMTS'); // nowebpack
/** @suppress {extraRequire} */ // nowebpack
goog.require('ol.style.Icon'); // nowebpack
/** @suppress {extraRequire} */ // nowebpack
goog.require('ol.layer.VectorTile'); // nowebpack
// Required by ol3 // nowebpack
/** @suppress {extraRequire} */ // nowebpack
goog.require('ol.Map'); // nowebpack
/** @suppress {extraRequire} */ // nowebpack
goog.require('ol.source.Vector'); // nowebpack
/** @suppress {extraRequire} */ // nowebpack
goog.require('ol.render.Feature'); // nowebpack
/** @suppress {extraRequire} */ // nowebpack
goog.require('ol.source.VectorTile'); // nowebpack
/** @suppress {extraRequire} */ // nowebpack
goog.require('ol.style.AtlasManager'); // nowebpack

/**
 * The default template base URL for modules, used as-is by the template cache.
 * @type {string}
 */
ngeo.baseModuleTemplateUrl = 'ngeo';
