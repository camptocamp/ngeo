// The MIT License (MIT)
//
// Copyright (c) 2019-2021 Camptocamp SA
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

import Layer from 'ol/layer/Layer.js';
import {createCanvasContext2D} from 'ol/dom.js';
import {DEVICE_PIXEL_RATIO} from 'ol/has.js';

/**
 * @typedef {Object} Options
 * @property {number} [margin]
 * @property {number} [extentInMeters]
 */

/**
 * @extends {Layer<import("ol/source/Source.js").default>}
 */
export default class Mask extends Layer {
  /**
   * @param {import('ol/layer/Layer.js').Options} layerOptions
   * @param {Options} maskOptions
   */
  constructor(layerOptions = {}, maskOptions = {}) {
    super(layerOptions);

    /**
     * @private
     */
    this.context_ = createCanvasContext2D();

    this.context_.canvas.style.opacity = '0.5';
    this.context_.canvas.style.position = 'absolute';

    this.margin_ = maskOptions.margin || 100;
    this.extentInMeters_ = maskOptions.extentInMeters || 0;
  }

  /**
   * @param {import("ol/coordinate.js").Coordinate} center, a xy point.
   * @param {number} halfLength a half length of a square's side.
   * @return {import("ol/extent.js").Extent} an extent.
   */
  createExtent(center, halfLength) {
    const minx = center[0] - halfLength;
    const miny = center[1] - halfLength;
    const maxx = center[0] + halfLength;
    const maxy = center[1] + halfLength;
    return [minx, miny, maxx, maxy];
  }

  /**
   * @param {import("ol/PluggableMap").FrameState} frameState
   */
  render(frameState) {
    const context = this.context_;
    const cwidth = frameState.size[0];
    context.canvas.width = cwidth;
    const cheight = frameState.size[1];
    context.canvas.height = cheight;

    // background (clockwise)
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(cwidth, 0);
    context.lineTo(cwidth, cheight);
    context.lineTo(0, cheight);
    context.lineTo(0, 0);
    context.closePath();

    let extentLength = Math.min(cwidth, cheight) - this.margin_ * 2;
    if (this.extentInMeters_) {
      extentLength = (DEVICE_PIXEL_RATIO * this.extentInMeters_) / frameState.viewState.resolution;
    }

    // Draw the get data zone
    const extent = this.createExtent([cwidth / 2, cheight / 2], Math.ceil(extentLength / 2));

    context.moveTo(extent[0], extent[1]);
    context.lineTo(extent[0], extent[3]);
    context.lineTo(extent[2], extent[3]);
    context.lineTo(extent[2], extent[1]);
    context.lineTo(extent[0], extent[1]);
    context.closePath();

    // Fill the mask
    context.fillStyle = 'rgba(0, 5, 25, 0.5)';
    context.fill();

    return context.canvas;
  }
}
