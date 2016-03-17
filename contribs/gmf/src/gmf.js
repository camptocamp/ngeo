/**
 * @module gmf
 */
goog.provide('gmf');

goog.require('ngeo');


/** @type {!angular.Module} */
gmf.module = angular.module('gmf', [ngeo.module.name, 'gettext',
    'ngAnimate', 'ngTouch']);


/**
 * The default template based URL, used as it by the template cache.
 * @type {string}
 */
gmf.baseTemplateUrl = 'gmf';


/**
 * @const
 */
gmf.DATALAYERGROUP_NAME = 'data';
