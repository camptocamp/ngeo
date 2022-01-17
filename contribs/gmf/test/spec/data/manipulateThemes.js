// The MIT License (MIT)
//
// Copyright (c) 2022-2022 Camptocamp SA
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

/* eslint max-len: 0 */

/**
 * Deactivate all layers in the theme.json
 * @param {Array<import('gmf/themes.js').GmfTheme>} themes
 */
export const uncheckAllNodes = (themes) => {
  themes.forEach((theme) => {
    const node = /** @type {import('gmf/themes.js').GmfGroup} */ (/** @type {any} */ (theme));
    uncheckNodeRecursively(node);
  })
};

/**
 * @param {import('gmf/themes.js').GmfGroup|import('gmf/themes.js').GmfLayer} node
 */
const uncheckNodeRecursively = (node) => {
  if (node.hasOwnProperty('children')) {
    const nodeGroup = /** @type {import('gmf/themes.js').GmfGroup} */ (node);
    nodeGroup.children.forEach(child => uncheckNodeRecursively(child))
  }
  const nodeLayer = /** @type {import('gmf/themes.js').GmfLayer} */ (node);
  if (nodeLayer.hasOwnProperty('metadata')) {
    nodeLayer.metadata.isChecked = false;
  }
};
