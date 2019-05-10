/**
 */
import angular from 'angular';
import gmfFiltersFilterselectorComponent from 'gmf/filters/filterselectorComponent.js';
import gmfFiltersSavedFilters from 'gmf/filters/SavedFilters.js';

/**
 * @type {angular.IModule}
 */
export default angular.module('gmfFiltersModule', [
  gmfFiltersFilterselectorComponent.name,
  gmfFiltersSavedFilters.name,
]);
