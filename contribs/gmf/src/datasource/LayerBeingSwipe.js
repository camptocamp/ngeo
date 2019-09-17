import angular from 'angular';


/**
 * @typedef {Object} LayerBeingSwipe
 * @property {import('ol/Map.js').default} map
 * @property {?import("ol/layer/Layer.js").default<import('ol/source/Source.js').default>
 * |import("ol/layer/Group.js").default} layer;
 */

/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('gmfLayerBeingSwipe', []);
module.value('gmfLayerBeingSwipe', {
  layer: null
});

export default module;
