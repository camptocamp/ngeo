/**
 * @module gmf.mobile.measure.module
 */
import gmfMobileMeasureLengthComponent from 'gmf/mobile/measure/lengthComponent.js';
import gmfMobileMeasurePointComponent from 'gmf/mobile/measure/pointComponent.js';

/**
 * @type {!angular.Module}
 */
const exports = angular.module('gmfMobileMeasureModule', [
  gmfMobileMeasureLengthComponent.name,
  gmfMobileMeasurePointComponent.name,
]);


export default exports;
