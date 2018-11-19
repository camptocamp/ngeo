/**
 * @module gmf.raster.module
 */
import * as angular from 'angular';
import gmfRasterComponent from 'gmf/raster/component.js';
import gmfRasterRasterService from 'gmf/raster/RasterService.js';

/**
 * @type {!angular.IModule}
 */
const exports = angular.module('gmfRasterModule', [
  gmfRasterComponent.name,
  gmfRasterRasterService['module'].name,
]);


export default exports;
