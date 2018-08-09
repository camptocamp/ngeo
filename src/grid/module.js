/**
 * @module ngeo.grid.module
 */
import ngeoGridComponent from 'ngeo/grid/component.js';

/**
 * Also related to the grid but not included in the module:
 *  - ngeo.grid.Config (already required by ngeo.grid.component)
 *
 * @type {!angular.Module}
 */
const exports = angular.module('ngeoGridModule', [
  ngeoGridComponent.name
]);


export default exports;
