/**
 * @module gmf.query.extraModule
 */
import gmfQueryGridComponent from 'gmf/query/gridComponent.js';
import gmfQueryWindowComponent from 'gmf/query/windowComponent.js';

/**
 * @type {!angular.Module}
 */
const exports = angular.module('gmfQueryExtraModule', [
  gmfQueryGridComponent.name,
  gmfQueryWindowComponent.name,
]);


export default exports;
