/**
 * @module gmf.mobile.measure.module
 */
import * as angular from 'angular';
import gmfMobileMeasureLengthComponent from 'gmf/mobile/measure/lengthComponent.js';
import gmfMobileMeasurePointComponent from 'gmf/mobile/measure/pointComponent.js';

/**
 * @type {!angular.IModule}
 */
export default angular.module('gmfMobileMeasureModule', [
  gmfMobileMeasureLengthComponent.name,
  gmfMobileMeasurePointComponent.name,
]);
