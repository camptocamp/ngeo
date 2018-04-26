/**
 * @module gmf.filters.module
 */
import gmfFiltersFilterselectorComponent from 'gmf/filters/filterselectorComponent.js';
import gmfFiltersSavedFilters from 'gmf/filters/SavedFilters.js';

/**
 * @type {!angular.Module}
 */
const exports = angular.module('gmfFiltersModule', [
  gmfFiltersFilterselectorComponent.name,
  gmfFiltersSavedFilters.module.name,
]);


export default exports;
