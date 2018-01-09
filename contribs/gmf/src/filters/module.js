goog.provide('gmf.filters.module');

goog.require('gmf.filters.filterselectorComponent');
goog.require('gmf.filters.SavedFilters');


/**
 * @type {!angular.Module}
 */
gmf.filters.module = angular.module('gmfFiltersModule', [
  gmf.filters.filterselectorComponent.name,
  gmf.filters.SavedFilters.module.name,
]);
