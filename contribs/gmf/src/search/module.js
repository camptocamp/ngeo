/**
 * @module gmf search namespace
 */
goog.provide('gmf.search.module');

goog.require('gmf.search.component');
goog.require('gmf.search.FulltextSearch');


/**
 * @type {!angular.Module}
 */
gmf.search.module = angular.module('gmfSearchModule', [
  gmf.search.component.name,
  gmf.search.FulltextSearch.module.name
]);
