goog.provide('gmf.raster.module');

goog.require('gmf.raster.component');
goog.require('gmf.raster.RasterService');


/**
 * @type {!angular.Module}
 */
gmf.raster.module = angular.module('gmfRasterModule', [
  gmf.raster.component.name,
  gmf.raster.RasterService.module.name,
]);
