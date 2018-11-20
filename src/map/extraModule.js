/**
 * @module ngeo.map.extraModule
 */
import ngeoMapLayerHelper from 'ngeo/map/LayerHelper.js';

/**
 * @type {!angular.IModule}
 */
const exports = angular.module('ngeoMapExtraModule', [
  ngeoMapLayerHelper.module.name,
]);


export default exports;
