/**
 * @module ngeo.editing.extraModule
 */
import ngeoEditingExportfeaturesComponent from 'ngeo/editing/exportfeaturesComponent.js';

/**
 * @type {angular.IModule}
 */
const exports = angular.module('ngeoEditingExtraModule', [
  ngeoEditingExportfeaturesComponent.name,
]);


export default exports;
