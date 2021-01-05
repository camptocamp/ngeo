// The MIT License (MIT)
//
// Copyright (c) 2018-2021 Camptocamp SA
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

import {createEditingStyle} from 'ol/style/Style.js';

/**
 * @typedef {Object} DrawEventItem
 * @property {import("ol/Feature.js").default} feature
 */

/**
 * @typedef {import("ngeo/CustomEvent.js").default<DrawEventItem>} DrawEvent
 */

/**
 * @return {import('ol/style/Style.js').StyleFunction} Styles.
 * @hidden
 */
export function getDefaultDrawStyleFunction() {
  const style = createEditingStyle();
  return function (feature, resolution) {
    const geometry = feature.getGeometry();
    if (geometry) {
      return style[geometry.getType()];
    }
  };
}

/**
 * @return {import('ol/style/Style.js').StyleFunction} Styles.
 * @hidden
 */
export function getDefaultModifyStyleFunction() {
  const style = createEditingStyle();
  return function (feature, resolution) {
    return style.Point;
  };
}
