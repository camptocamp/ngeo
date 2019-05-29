import olLayerGroup from 'ol/layer/Group.js';


/**
 * @param {import("ol/layer/Base.js").default} layer A layer tree.
 * @param {!Array<import("ol/layer/Group.js").default>} ancestors The groups to which the layer belongs to.
 * @param {function(import("ol/layer/Base.js").default, Array<import("ol/layer/Group.js").default>): boolean}
 * visitor A function which will return false if descend must stop.
 */
export function traverseLayer(layer, ancestors, visitor) {
  const descend = visitor(layer, ancestors);
  if (descend && layer instanceof olLayerGroup) {
    layer.getLayers().forEach((childLayer) => {
      traverseLayer(childLayer, [...ancestors, layer], visitor);
    });
  }
}

const extractor = new RegExp('[^/]*//[^/]+/(.*)');

/**
 * Extract the part after the URL authority.
 * @param {string} url A URL to normalize
 * @return {string} The normalized string.
 */
export function normalizeURL(url) {
  const matches = url.match(extractor);
  if (!matches) {
    throw new Error('Could not normalize url ' + url);
  }
  return matches[1];
}
