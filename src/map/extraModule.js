/**
 * @module ngeo.map.extraModule
 */
import ngeoMapLayerHelper from 'ngeo/map/LayerHelper.js';

/**
 * @type {!angular.Module}
 */
const exports = angular.module('ngeoMapExtraModule', [
  ngeoMapLayerHelper.module.name,
]);


export default exports;
