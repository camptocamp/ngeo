/**
 * @module import("gmf/search/module.js").default
 */
import angular from 'angular';
import gmfSearchComponent from 'gmf/search/component.js';
import gmfSearchFulltextSearch from 'gmf/search/FulltextSearch.js';

import './search.scss';

/**
 * @type {!angular.IModule}
 */
export default angular.module('gmfSearchModule', [
  gmfSearchComponent.name,
  gmfSearchFulltextSearch.module.name
]);
