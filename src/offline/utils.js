goog.module('ngeo.offline.utils');

goog.require('ol.layer.Group');


/**
 * @param {ol.layer.Base} layer A layer tree.
 * @param {!Array<ol.layer.Group>} ancestors The groups to which the layer belongs to.
 * @param {function(ol.layer.Base, Array<ol.layer.Group>): boolean} visitor A function which will return false if descend must stop.
 */
exports.traverseLayer = function(layer, ancestors, visitor) {
  const descend = visitor(layer, ancestors);
  if (descend && layer instanceof ol.layer.Group) {
    layer.getLayers().forEach((childLayer) => {
      exports.traverseLayer(childLayer, [...ancestors, layer], visitor);
    });
  }
};

const extractor = new RegExp('[^/]*//[^/]+/(.*)');
/**
 * Extract the part after the URL authority.
 * @param {string} url
 * @return {string}
 */
exports.normalizeURL = function(url) {
  const matches = url.match(extractor);
  return matches[1];
};
