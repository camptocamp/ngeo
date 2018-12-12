/**
 * @module gmf.mobile.measure.module
 */
import * as angular from 'angular';
import gmfMobileMeasureAreaComponent from 'gmf/mobile/measure/areaComponent.js';
import gmfMobileMeasureLengthComponent from 'gmf/mobile/measure/lengthComponent.js';
import gmfMobileMeasurePointComponent from 'gmf/mobile/measure/pointComponent.js';

/**
 * @type {!angular.IModule}
 */
export default angular.module('gmfMobileMeasureModule', [
  gmfMobileMeasureAreaComponent.name,
  gmfMobileMeasureLengthComponent.name,
  gmfMobileMeasurePointComponent.name,
]);
