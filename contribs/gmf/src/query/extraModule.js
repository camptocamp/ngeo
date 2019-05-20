import angular from 'angular';
import gmfQueryGridComponent from 'gmf/query/gridComponent.js';
import gmfQueryWindowComponent from 'gmf/query/windowComponent.js';

import './grid.scss';
import './window.scss';

/**
 * @type {angular.IModule}
 */
export default angular.module('gmfQueryExtraModule', [
  gmfQueryGridComponent.name,
  gmfQueryWindowComponent.name,
]);
