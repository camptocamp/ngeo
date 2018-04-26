/**
 * @module gmf.map.module
 */
import gmfMapComponent from 'gmf/map/component.js';
import gmfMapMousepositionComponent from 'gmf/map/mousepositionComponent.js';

/**
 * @type {!angular.Module}
 */
const exports = angular.module('gmfMapModule', [
  gmfMapComponent.name,
  gmfMapMousepositionComponent.name,
]);


export default exports;
