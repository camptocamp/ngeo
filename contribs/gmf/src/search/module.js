/**
 * @module gmf.search.module
 */
import gmfSearchComponent from 'gmf/search/component.js';
import gmfSearchFulltextSearch from 'gmf/search/FulltextSearch.js';

/**
 * @type {!angular.Module}
 */
const exports = angular.module('gmfSearchModule', [
  gmfSearchComponent.name,
  gmfSearchFulltextSearch.module.name
]);


export default exports;
