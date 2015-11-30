/**
 * @module gmf
 */
goog.provide('gmf');

goog.require('ngeo');


/** @type {!angular.Module} */
var gmfModule = angular.module('gmf', [ngeoModule.name, 'gettext']);
