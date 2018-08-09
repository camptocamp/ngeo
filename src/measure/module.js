/**
 * @module ngeo.measure.module
 */
import ngeoMeasureArea from 'ngeo/measure/area.js';
import ngeoMeasureAzimut from 'ngeo/measure/azimut.js';
import ngeoMeasureLength from 'ngeo/measure/length.js';

/**
 * @type {!angular.Module}
 */
const exports = angular.module('ngeoMeasureModule', [
  ngeoMeasureArea.name,
  ngeoMeasureAzimut.name,
  ngeoMeasureLength.name
]);


export default exports;
