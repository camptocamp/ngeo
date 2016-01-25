/**
 * This file provides the "app" namespace, which is the
 * application's main namespace. And it defines the application's Angular
 * module.
 */
goog.provide('app');

goog.require('gmf');


/**
 * @type {!angular.Module}
 */
var appModule = angular.module('app', [gmf.module.name]);
