/**
 * @module gmf.raster.module
 */
import gmfRasterComponent from 'gmf/raster/component.js';
import gmfRasterRasterService from 'gmf/raster/RasterService.js';

/**
 * @type {!angular.Module}
 */
const exports = angular.module('gmfRasterModule', [
  gmfRasterComponent.name,
  gmfRasterRasterService.module.name,
]);


export default exports;
