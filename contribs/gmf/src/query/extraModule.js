/**
 * @module gmf.query.extraModule
 */
import gmfQueryGridComponent from 'gmf/query/gridComponent.js';
import gmfQueryWindowComponent from 'gmf/query/windowComponent.js';

import './grid.scss';
import './window.scss';

/**
 * @type {!angular.IModule}
 */
const exports = angular.module('gmfQueryExtraModule', [
  gmfQueryGridComponent.name,
  gmfQueryWindowComponent.name,
]);


export default exports;
