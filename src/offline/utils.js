const exports = {};
import olLayerGroup from 'ol/layer/Group.js';

/**
 * @param {import("ol/layer/Base.js").default} layer A layer tree.
 * @param {!Array<import("ol/layer/Group.js").default>} ancestors The groups to which the layer belongs to.
 * @param {function(import("ol/layer/Base.js").default, Array<import("ol/layer/Group.js").default>): boolean}
 * visitor A function which will return false if descend must stop.
 */
exports.traverseLayer = function (layer, ancestors, visitor) {
  const descend = visitor(layer, ancestors);
  if (descend && layer instanceof olLayerGroup) {
    layer.getLayers().forEach((childLayer) => {
      exports.traverseLayer(childLayer, [...ancestors, layer], visitor);
    });
  }
};

const extractor = new RegExp('[^/]*//[^/]+/(.*)');
/**
 * Extract the part after the URL authority.
 * @param {string} url A URL to normalize
 * @return {string} The normalized string.
 */
exports.normalizeURL = function (url) {
  const matches = url.match(extractor);
  return matches[1];
};

export default exports;
