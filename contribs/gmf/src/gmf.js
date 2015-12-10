/**
 * @module gmf
 */
goog.provide('gmf');

/**
 * This goog.require is needed because it provides ngeoModule.
 * @suppress {extraRequire}
 */
goog.require('ngeo');


/** @type {!angular.Module} */
var gmfModule = angular.module('gmf', [ngeoModule.name, 'gettext']);


/**
 * The default template based URL, used as it by the template cache.
 * @type {string}
 */
gmf.baseTemplateUrl = 'gmf';
