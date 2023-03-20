import angular from 'angular';
import gmfRasterComponent from 'gmf/raster/component.js';
import gmfRasterRasterService from 'gmf/raster/RasterService.js';

/**
 * @type {!angular.IModule}
 */
export default angular.module('gmfRasterModule', [gmfRasterComponent.name, gmfRasterRasterService.name]);
