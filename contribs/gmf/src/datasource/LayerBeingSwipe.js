import angular from 'angular';


/**
 * @typedef {Object} LayerBeingSwipe
 * @property {import('ol/Map.js').default} map
 * @property {?import("ol/layer/Layer.js").default<import('ol/source/Source.js').default>
 * |import("ol/layer/Group.js").default} layer;
 * @property {number} swipeValue;
 */

/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('gmfLayerBeingSwipe', []);
module.value('gmfLayerBeingSwipe', {
  layer: null,
  swipeValue: null
});

export default module;
