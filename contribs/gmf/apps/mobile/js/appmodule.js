/**
 * @fileoverview This file provides the "app" namespace, which is the
 * application's main namespace. And it defines the application's Angular
 * module.
 */
goog.provide('app');

/**
 * This goog.require is needed because it provides gmfModule.
 * @suppress {extraRequire}
 */
goog.require('gmf');


/**
 * @type {!angular.Module}
 */
var appModule = angular.module('app', [gmfModule.name]);
