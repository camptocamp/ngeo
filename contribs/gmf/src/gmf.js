/**
 * @module gmf
 */
goog.provide('gmf');

goog.require('ngeo');


/** @type {!angular.Module} */
var gmfModule = angular.module('gmf', [ngeoModule.name, 'gettext']);


/**
 * @type {string}
 * The default template based URL, used as it by the template cache.
 */
gmf.baseTemplateUrl = 'gmf';
