/**
 */
import angular from 'angular';
import ngeoMeasureArea from 'ngeo/measure/area.js';
import ngeoMeasureAzimut from 'ngeo/measure/azimut.js';
import ngeoMeasureLength from 'ngeo/measure/length.js';

/**
 * @type {!angular.IModule}
 */
export default angular.module('ngeoMeasureModule', [
  ngeoMeasureArea.name,
  ngeoMeasureAzimut.name,
  ngeoMeasureLength.name,
]);
