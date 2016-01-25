/**
 * @module gmf
 */
goog.provide('gmf');

goog.require('ngeo');


/** @type {!angular.Module} */
var gmfModule = angular.module('gmf', [ngeo.module.name, 'gettext']);


/**
 * The default template based URL, used as it by the template cache.
 * @type {string}
 */
gmf.baseTemplateUrl = 'gmf';
