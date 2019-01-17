/**
 * @module import("ngeo/editing/extraModule.js").default
 */
import angular from 'angular';
import ngeoEditingExportfeaturesComponent from 'ngeo/editing/exportfeaturesComponent.js';

/**
 * @type {angular.IModule}
 */
export default angular.module('ngeoEditingExtraModule', [
  ngeoEditingExportfeaturesComponent.name,
]);
