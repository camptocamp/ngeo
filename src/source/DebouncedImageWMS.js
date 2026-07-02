// The MIT License (MIT)
//
// Copyright (c) 2026 Camptocamp SA
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

import EventType from 'ol/events/EventType.js';
import {containsExtent} from 'ol/extent.js';
import {fromResolutionLike} from 'ol/resolution.js';
import {getRequestExtent} from 'ol/source/Image.js';
import olSourceImageWMS from 'ol/source/ImageWMS';
import {createLoader} from 'ol/source/wms.js';
import {decode} from 'ol/Image.js';
import ImageWrapper from 'ol/Image.js';
import ImageState from 'ol/ImageState.js';

/**
 * A WMS image source that delays loading when the view changes rapidly (e.g.
 * during animated zoom or pan). This reduces duplicate GetMap requests.
 *
 * Pass `debounceDelay` (in ms) in the source options to enable.
 *
 * @hidden
 */
export default class extends olSourceImageWMS {
  /**
   * @param {import('ol/source/ImageWMS').Options & {debounceDelay?: number}} options ImageWMS options.
   */
  constructor(options) {
    super(options);

    /**
     * @type {number}
     * @private
     */
    this.debounceDelay_ = options.debounceDelay || 100;

    /**
     * @type {?number}
     * @private
     */
    this.debounceTimer_ = null;

    /**
     * @type {?Object}
     * @private
     */
    this.pendingState_ = null;
  }

  /**
   * @param {import('ol/extent.js').Extent} extent Extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import('ol/proj/Projection.js').default} projection Projection.
   * @return {import('ol/Image.js').default} Single image.
   * @override
   */
  getImageInternal(extent, resolution, pixelRatio, projection) {
    if (!this.loader || this.loaderProjection_ !== projection) {
      this.loaderProjection_ = projection;
      this.loader = createLoader({
        crossOrigin: this.crossOrigin_,
        referrerPolicy: this.referrerPolicy_,
        params: this.params_,
        projection: projection,
        serverType: this.serverType_,
        hidpi: this.hidpi_,
        url: this.url_,
        ratio: this.ratio_,
        load: (image, src) => {
          this.image.setImage(image);
          this.imageLoadFunction_(this.image, src);
          return decode(image);
        },
      });
    }

    if (this.loader) {
      const requestExtent = getRequestExtent(extent, resolution, pixelRatio, 1);
      const requestResolution = this.findNearestResolution(resolution);
      if (
        this.image &&
        (this.static_ ||
          (this.wantedProjection_ === projection &&
            ((this.wantedExtent_ && containsExtent(this.wantedExtent_, requestExtent)) ||
              containsExtent(this.image.getExtent(), requestExtent)) &&
            ((this.wantedResolution_ && fromResolutionLike(this.wantedResolution_) === requestResolution) ||
              fromResolutionLike(this.image.getResolution()) === requestResolution)))
      ) {
        this.cancelDebounce_();
        return this.image;
      }

      if (this.image && !this.static_) {
        this.pendingState_ = {extent, resolution, pixelRatio, projection};
        this.startDebounce_();
        return this.image;
      }

      this.cancelPending_();
      return super.getImageInternal(extent, resolution, pixelRatio, projection);
    }

    return this.image;
  }

  /**
   * @override
   */
  changed() {
    if (this.sourceChangeOnly_) {
      this.sourceChangeOnly_ = false;
      this.revision_++;
      this.dispatchEvent(EventType.CHANGE);
      return;
    }
    super.changed();
  }

  /**
   * @private
   */
  startDebounce_() {
    if (this.debounceTimer_ !== null) {
      return;
    }
    this.debounceTimer_ = setTimeout(() => {
      this.debounceTimer_ = null;
      this.fireDebouncedLoad_();
    }, this.debounceDelay_);
  }

  /**
   * @private
   */
  cancelDebounce_() {
    if (this.debounceTimer_ !== null) {
      clearTimeout(this.debounceTimer_);
      this.debounceTimer_ = null;
    }
  }

  /**
   * @private
   */
  cancelPending_() {
    this.cancelDebounce_();
    this.pendingState_ = null;
  }

  /**
   * @private
   */
  fireDebouncedLoad_() {
    if (!this.pendingState_) {
      return;
    }
    const {extent, resolution, pixelRatio, projection} = this.pendingState_;
    this.pendingState_ = null;

    const requestExtent = getRequestExtent(extent, resolution, pixelRatio, 1);
    const requestResolution = this.findNearestResolution(resolution);

    this.wantedProjection_ = projection;
    this.wantedExtent_ = requestExtent;
    this.wantedResolution_ = requestResolution;
    this.image = new ImageWrapper(requestExtent, requestResolution, pixelRatio, this.loader);
    this.image.addEventListener(EventType.CHANGE, this.handleImageChange.bind(this));

    this.sourceChangeOnly_ = true;
    this.changed();

    if (this.image.getState() === ImageState.IDLE) {
      this.image.load();
    }
  }
}
