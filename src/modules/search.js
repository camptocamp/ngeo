/**
 * @module ngeo search
 */
goog.provide('ngeo.modules.search');

// Require the directive code
goog.require('ngeo.searchDirective');


/**
 * @type {!angular.Module}
 */
ngeo.modules.search = angular.module('ngeoSearch', []);

// Register the directive in the module
ngeo.modules.search.directive('ngeoSearch', ngeo.searchDirective);
