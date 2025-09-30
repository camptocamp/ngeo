// The MIT License (MIT)
//
// Copyright (c) 2018-2025 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import olLayerGroup from 'ol/layer/Group';

/**
 * @param {import('ol/layer/Base').default} layer A layer tree.
 * @param {!import('ol/layer/Group').default[]} ancestors The groups to which the layer belongs to.
 * @param {function(import('ol/layer/Base').default, import('ol/layer/Group').default[]): boolean} visitor
 *    A function which will return false if descend must stop.
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
 *
 * @param {string} url A URL to normalize
 * @returns {string} The normalized string.
 */
export function normalizeURL(url) {
  const matches = extractor.exec(url);
  if (!matches) {
    throw new Error('Could not normalize url ' + url);
  }
  return matches[1];
}
