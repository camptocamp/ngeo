/**
 * @module ngeo.editing.extraModule
 */
import ngeoEditingExportfeaturesComponent from 'ngeo/editing/exportfeaturesComponent.js';

/**
 * @type {angular.Module}
 */
const exports = angular.module('ngeoEditingExtraModule', [
  ngeoEditingExportfeaturesComponent.name,
]);


export default exports;
